import type { FieldInfo } from '../types/collections';
import type { EelZapCodegenConfig, FileNameCasing, TypeNameCasing } from './config';
import { fieldUsesSdkType, mapFieldToTypeScript } from './type-mapper';
import { renderDocComment, renderHeader, renderNamedTypeExports } from './templates';

export interface EntitySchema {
  kind: 'collection' | 'document';
  key: string;
  name: string;
  fields: FieldInfo[];
}

export interface GeneratedSourceFile {
  path: string;
  content: string;
}

export type EmitterOptions = Pick<
  Required<EelZapCodegenConfig>,
  | 'addFieldComments'
  | 'generateIndex'
  | 'includeMeta'
  | 'includeSeo'
  | 'header'
  | 'fileNameCasing'
  | 'folderNameCasing'
  | 'typeNameCasing'
>;

const SDK_PACKAGE_NAME = '@8ux-co/eelzap-api-sdk-ts';

export function emitFiles(
  collections: EntitySchema[],
  documents: EntitySchema[],
  options: EmitterOptions,
): GeneratedSourceFile[] {
  const files: GeneratedSourceFile[] = [];

  for (const collection of collections) {
    files.push(emitEntityFile(collection, options));
  }

  for (const document of documents) {
    files.push(emitEntityFile(document, options));
  }

  if (options.generateIndex) {
    const collectionIndex = emitFolderIndex('collection', collections, options);
    if (collectionIndex) {
      files.push(collectionIndex);
    }

    const documentIndex = emitFolderIndex('document', documents, options);
    if (documentIndex) {
      files.push(documentIndex);
    }

    files.push(emitRootIndex(collections, documents, options));
  }

  return files;
}

export function emitEntityFile(entity: EntitySchema, options: EmitterOptions): GeneratedSourceFile {
  const folderName = toCase(
    entity.kind === 'collection' ? 'collections' : 'documents',
    options.folderNameCasing,
  );
  const fileName = `${toCase(entity.key, options.fileNameCasing)}.ts`;
  const path = `${folderName}/${fileName}`;
  const typeBaseName = toTypeName(entity.key, options.typeNameCasing);
  const contentTypeName = `${typeBaseName}Content`;
  const mainTypeName =
    entity.kind === 'collection' ? `${typeBaseName}Item` : `${typeBaseName}Document`;
  const auxTypeName = entity.kind === 'collection' ? `${typeBaseName}ListResponse` : undefined;

  const sdkImports = collectSdkImports(entity, options);
  const lines: string[] = [];

  lines.push(renderHeader(options.header).trimEnd());

  if (sdkImports.length > 0) {
    lines.push(
      `import type { ${sdkImports.join(', ')} } from ${JSON.stringify(SDK_PACKAGE_NAME)};`,
    );
  }

  lines.push('');
  lines.push(
    renderDocComment([
      `Content type for the "${entity.name}" ${entity.kind}.`,
      '',
      `${capitalize(entity.kind)} key: \`${entity.key}\``,
    ]),
  );
  lines.push(`export interface ${contentTypeName} {`);
  lines.push(...renderFieldLines(entity.fields, options));
  lines.push('}');
  lines.push('');
  lines.push(
    ...renderEntityAliases(entity.kind, contentTypeName, mainTypeName, auxTypeName, options),
  );

  return {
    path,
    content: `${lines.join('\n').trimEnd()}\n`,
  };
}

export function emitRootIndex(
  collections: EntitySchema[],
  documents: EntitySchema[],
  options: EmitterOptions,
): GeneratedSourceFile {
  const collectionFolder = toCase('collections', options.folderNameCasing);
  const documentFolder = toCase('documents', options.folderNameCasing);
  const lines = [renderHeader(options.header).trimEnd(), ''];

  if (collections.length > 0) {
    lines.push('// Collections');
    for (const collection of collections) {
      const types = getEntityExportNames(collection, options);
      const source = `./${collectionFolder}/${toCase(collection.key, options.fileNameCasing)}`;
      lines.push(renderNamedTypeExports(types, source));
    }
    lines.push('');
  }

  if (documents.length > 0) {
    lines.push('// Documents');
    for (const document of documents) {
      const types = getEntityExportNames(document, options);
      const source = `./${documentFolder}/${toCase(document.key, options.fileNameCasing)}`;
      lines.push(renderNamedTypeExports(types, source));
    }
  }

  return {
    path: 'index.ts',
    content: `${lines.join('\n').trimEnd()}\n`,
  };
}

function emitFolderIndex(
  kind: EntitySchema['kind'],
  entities: EntitySchema[],
  options: EmitterOptions,
): GeneratedSourceFile | null {
  if (entities.length === 0) {
    return null;
  }

  const folderName = toCase(
    kind === 'collection' ? 'collections' : 'documents',
    options.folderNameCasing,
  );
  const lines = [renderHeader(options.header).trimEnd(), ''];

  for (const entity of entities) {
    const source = `./${toCase(entity.key, options.fileNameCasing)}`;
    lines.push(renderNamedTypeExports(getEntityExportNames(entity, options), source));
  }

  return {
    path: `${folderName}/index.ts`,
    content: `${lines.join('\n').trimEnd()}\n`,
  };
}

function renderFieldLines(fields: FieldInfo[], options: EmitterOptions): string[] {
  if (fields.length === 0) {
    return ['  [key: string]: never;'];
  }

  const lines: string[] = [];

  for (const field of fields) {
    if (options.addFieldComments) {
      lines.push(`  /** ${buildFieldComment(field)} */`);
    }
    lines.push(`  ${JSON.stringify(field.key)}: ${mapFieldToTypeScript(field)};`);
    lines.push('');
  }

  lines.pop();
  return lines;
}

function renderEntityAliases(
  kind: EntitySchema['kind'],
  contentTypeName: string,
  mainTypeName: string,
  auxTypeName: string | undefined,
  options: EmitterOptions,
): string[] {
  if (kind === 'collection') {
    const lines = [
      `export type ${mainTypeName} = ${buildWrappedType(
        `ItemDetail<${contentTypeName}>`,
        'ItemMeta',
        options.includeMeta,
        'Seo',
        options.includeSeo,
      )};`,
    ];
    if (auxTypeName) {
      lines.push(
        `export type ${auxTypeName} = Omit<ItemListResponse<${contentTypeName}>, 'data'> & { data: ${mainTypeName}[] };`,
      );
    }
    return lines;
  }

  return [
    `export type ${mainTypeName} = ${buildWrappedType(
      `DocumentDetail<${contentTypeName}>`,
      'DocumentMeta',
      options.includeMeta,
      'Seo',
      options.includeSeo,
    )};`,
  ];
}

function buildWrappedType(
  baseType: string,
  metaTypeName: string,
  includeMeta: boolean,
  seoTypeName: string,
  includeSeo: boolean,
): string {
  const omittedKeys: string[] = [];
  const parts: string[] = [];

  if (!includeMeta) {
    omittedKeys.push('meta');
  } else {
    parts.push(`{ meta: ${metaTypeName}; }`);
  }

  if (!includeSeo) {
    omittedKeys.push('seo');
  } else {
    parts.push(`{ seo: ${seoTypeName} | null; }`);
  }

  const base =
    omittedKeys.length > 0
      ? `Omit<${baseType}, ${omittedKeys.map((key) => `'${key}'`).join(' | ')}>`
      : baseType;
  return parts.length > 0 ? `${base} & ${parts.join(' & ')}` : base;
}

function collectSdkImports(entity: EntitySchema, options: EmitterOptions): string[] {
  const imports = new Set<string>();
  const sdkImportsByFieldType = {
    MEDIA: 'MediaValue',
    CURRENCY: 'CurrencyValue',
    GALLERY: 'GalleryItemValue',
  } as const;

  for (const field of entity.fields) {
    if (!fieldUsesSdkType(field)) {
      continue;
    }

    imports.add(sdkImportsByFieldType[field.type]);
  }

  if (entity.kind === 'collection') {
    imports.add('ItemDetail');
    imports.add('ItemListResponse');
    if (options.includeMeta) {
      imports.add('ItemMeta');
    }
  } else {
    imports.add('DocumentDetail');
    if (options.includeMeta) {
      imports.add('DocumentMeta');
    }
  }

  if (options.includeSeo) {
    imports.add('Seo');
  }

  return [...imports].sort();
}

function buildFieldComment(field: FieldInfo): string {
  const parts = [field.label || humanizeKey(field.key), field.type];
  if (field.required) {
    parts.push('required');
  }
  if (field.isLocalized) {
    parts.push('localized');
  }
  return parts.join(' | ');
}

function getEntityExportNames(entity: EntitySchema, options: EmitterOptions): string[] {
  const typeBaseName = toTypeName(entity.key, options.typeNameCasing);
  const exports = [`${typeBaseName}Content`];
  if (entity.kind === 'collection') {
    exports.push(`${typeBaseName}Item`, `${typeBaseName}ListResponse`);
  } else {
    exports.push(`${typeBaseName}Document`);
  }
  return exports;
}

export function toCase(value: string, casing: FileNameCasing): string {
  const tokens = tokenize(value);
  if (tokens.length === 0) {
    return value;
  }

  if (casing === 'kebab') {
    return tokens.join('-');
  }

  if (casing === 'snake') {
    return tokens.join('_');
  }

  if (casing === 'camel') {
    return `${tokens[0]}${tokens.slice(1).map(capitalize).join('')}`;
  }

  return tokens.map(capitalize).join('');
}

export function toTypeName(value: string, casing: TypeNameCasing): string {
  const pascal = toCase(value, 'pascal');
  return casing === 'camel' ? `${pascal.charAt(0).toLowerCase()}${pascal.slice(1)}` : pascal;
}

function tokenize(value: string): string[] {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .split(/[^a-zA-Z0-9]+/)
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);
}

function humanizeKey(value: string): string {
  return tokenize(value).map(capitalize).join(' ');
}

function capitalize(value: string): string {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

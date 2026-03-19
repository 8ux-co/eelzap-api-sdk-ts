import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { createClient } from '../client';
import type { EelZapClient } from '../client';
import { EelZapError, EelZapNetworkError } from '../errors';
import type { CollectionSummary, FieldInfo } from '../types/collections';
import type { DocumentListEntry } from '../types/documents';
import {
  DEFAULT_CODEGEN_CONFIG,
  type EelZapCodegenConfig,
  type ResolvedCodegenConfig,
  resolveCodegenConfig,
} from './config';
import { emitFiles, type EntitySchema } from './emitter';

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface GenerateResult {
  files: GeneratedFile[];
  filesWritten: number;
  outputDir: string | null;
  collections: string[];
  documents: string[];
}

export async function generateTypes(config: EelZapCodegenConfig = {}): Promise<GenerateResult> {
  const resolved = resolveCodegenConfig(config, {}, process.env);
  const client =
    config.client ??
    createClient({
      apiKey: requireApiKey(resolved),
      baseUrl: resolved.baseUrl,
    });

  try {
    const [collections, documents] = await Promise.all([
      resolved.collections ? getCollections(client, resolved) : Promise.resolve([]),
      resolved.documents ? getDocuments(client, resolved) : Promise.resolve([]),
    ]);

    const files = emitFiles(collections, documents, resolved).map((file) => ({
      path: file.path,
      content: file.content,
    }));

    let filesWritten = 0;
    if (resolved.writeFiles) {
      const outputDir = resolve(resolved.outputDir);
      await mkdir(outputDir, { recursive: true });
      await Promise.all(
        files.map(async (file) => {
          const destination = resolve(outputDir, file.path);
          await mkdir(dirname(destination), { recursive: true });
          await writeFile(destination, file.content, 'utf8');
          filesWritten += 1;
        }),
      );
    }

    return {
      files,
      filesWritten,
      outputDir: resolved.writeFiles ? resolve(resolved.outputDir) : null,
      collections: collections.map((collection) => collection.key),
      documents: documents.map((document) => document.key),
    };
  } catch (error) {
    throw wrapCodegenError(error, resolved);
  }
}

export {
  DEFAULT_CODEGEN_CONFIG,
  resolveCodegenConfig,
  type EelZapCodegenConfig,
  type ResolvedCodegenConfig,
} from './config';

async function getCollections(
  client: EelZapClient,
  config: ResolvedCodegenConfig,
): Promise<EntitySchema[]> {
  const response = await client.collections.list();
  const filtered = filterEntities(
    response.data.map((collection) => ({ ...collection, fields: collection.fields ?? [] })),
    config.includeCollections,
    config.excludeCollections,
  );

  const detailedCollections = await Promise.all(
    filtered.map(async (collection) => {
      if (collection.fields.length > 0) {
        return collection;
      }
      return client.collections.get(collection.key);
    }),
  );

  return detailedCollections.map((collection) => toEntitySchema('collection', collection));
}

async function getDocuments(
  client: EelZapClient,
  config: ResolvedCodegenConfig,
): Promise<EntitySchema[]> {
  const response = await client.documents.list();
  const filtered = filterEntities(response.data, config.includeDocuments, config.excludeDocuments);

  return filtered.map((document) => toEntitySchema('document', document));
}

function toEntitySchema(
  kind: EntitySchema['kind'],
  entity: (Pick<CollectionSummary, 'key' | 'name'> & { fields?: FieldInfo[] }) | DocumentListEntry,
): EntitySchema {
  return {
    kind,
    key: entity.key,
    name: entity.name,
    fields: entity.fields ?? [],
  };
}

function filterEntities<T extends { key: string }>(
  entities: T[],
  includeKeys: string[],
  excludeKeys: string[],
): T[] {
  const includeSet = new Set(includeKeys);
  const excludeSet = new Set(excludeKeys);

  return entities.filter((entity) => {
    if (excludeSet.has(entity.key)) {
      return false;
    }

    if (includeSet.size > 0) {
      return includeSet.has(entity.key);
    }

    return true;
  });
}

function requireApiKey(config: ResolvedCodegenConfig): string {
  if (!config.apiKey || config.apiKey.trim().length === 0) {
    throw new Error('No API key found. Set EELZAP_API_KEY in .env or pass --api-key.');
  }

  return config.apiKey;
}

function wrapCodegenError(error: unknown, config: ResolvedCodegenConfig): Error {
  if (error instanceof Error && error.message.startsWith('No API key found.')) {
    return error;
  }

  if (error instanceof EelZapNetworkError) {
    return new Error(
      `Could not connect to CMS at ${config.baseUrl ?? DEFAULT_CODEGEN_CONFIG.baseUrl ?? 'https://api.eelzap.com'}. Check your connection and base URL.`,
    );
  }

  if (error instanceof EelZapError) {
    if (error.status === 401) {
      return new Error('Authentication failed. Check your API key.');
    }

    return error;
  }

  return error instanceof Error ? error : new Error('Unknown codegen error.');
}

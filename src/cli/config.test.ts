import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it } from 'vitest';

import { discoverConfigPath, loadConfig, loadConfigFile, resolveCodegenConfig } from './config';

const tempDirs: string[] = [];

async function makeTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), 'eelzap-config-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe('loadConfig', () => {
  it('loads json config files', async () => {
    const dir = await makeTempDir();
    await writeFile(
      join(dir, 'eelzap.config.json'),
      JSON.stringify({ outputDir: 'generated/types', includeMeta: false }),
      'utf8',
    );

    const result = await loadConfig(dir);

    expect(result.path).toBe(join(dir, 'eelzap.config.json'));
    expect(result.config).toMatchObject({
      outputDir: 'generated/types',
      includeMeta: false,
    });
  });

  it('loads typescript config files with satisfies and type-only imports', async () => {
    const dir = await makeTempDir();
    await writeFile(
      join(dir, 'eelzap.config.ts'),
      `import type { EelZapCodegenConfig } from '@8ux-co/eelzap-api-sdk-ts/codegen';

export default {
  outputDir: 'types/eel-zap',
  includeSeo: false,
} satisfies EelZapCodegenConfig;
`,
      'utf8',
    );

    const result = await loadConfig(dir);

    expect(result.config).toMatchObject({
      outputDir: 'types/eel-zap',
      includeSeo: false,
    });
  });

  it('loads javascript config files', async () => {
    const dir = await makeTempDir();
    await writeFile(
      join(dir, 'eelzap.config.js'),
      `export default { outputDir: 'js-types', includeMeta: false };`,
      'utf8',
    );

    const result = await loadConfig(dir);

    expect(result.config).toMatchObject({
      outputDir: 'js-types',
      includeMeta: false,
    });
  });

  it('returns null when no config file exists', async () => {
    const dir = await makeTempDir();

    expect(await discoverConfigPath(dir)).toBeNull();
    await expect(loadConfig(dir)).resolves.toMatchObject({
      config: {},
      path: null,
    });
  });

  it('surfaces json parse errors with the file path', async () => {
    const dir = await makeTempDir();
    const filePath = join(dir, 'eelzap.config.json');
    await writeFile(filePath, '{ invalid json', 'utf8');

    await expect(loadConfigFile(filePath)).rejects.toThrow(
      `Failed to parse config file ${filePath}:`,
    );
  });

  it('surfaces typescript parse errors with the file path', async () => {
    const dir = await makeTempDir();
    const filePath = join(dir, 'eelzap.config.ts');
    await writeFile(filePath, 'export default { outputDir: ; }', 'utf8');

    await expect(loadConfigFile(filePath)).rejects.toThrow(
      `Failed to parse config file ${filePath}:`,
    );
  });

  it('rejects unsupported config extensions', async () => {
    const dir = await makeTempDir();
    const filePath = join(dir, 'eelzap.config.yaml');
    await writeFile(filePath, 'outputDir: nope', 'utf8');

    await expect(loadConfigFile(filePath)).rejects.toThrow(
      `Unsupported config file extension for ${filePath}.`,
    );
  });
});

describe('resolveCodegenConfig', () => {
  it('gives cli flags precedence over env and config', () => {
    const resolved = resolveCodegenConfig(
      {
        outputDir: 'from-config',
        includeMeta: false,
      },
      {
        outputDir: 'from-flags',
        includeMeta: true,
        include: ['posts'],
      },
      {
        EELZAP_CODEGEN_OUTPUT_DIR: 'from-env',
        EELZAP_CODEGEN_INCLUDE_META: 'false',
      },
    );

    expect(resolved.outputDir).toBe('from-flags');
    expect(resolved.includeMeta).toBe(true);
    expect(resolved.includeCollections).toEqual(['posts']);
    expect(resolved.includeDocuments).toEqual(['posts']);
  });

  it('reads booleans and lists from the environment', () => {
    const resolved = resolveCodegenConfig(
      {},
      {},
      {
        EELZAP_CODEGEN_COLLECTIONS: 'false',
        EELZAP_CODEGEN_DOCUMENTS: 'true',
        EELZAP_CODEGEN_INCLUDE: 'posts, products',
        EELZAP_CODEGEN_EXCLUDE: 'drafts',
        EELZAP_CODEGEN_INCLUDE_SEO: 'false',
        EELZAP_CODEGEN_INCLUDE_META: 'false',
        EELZAP_CODEGEN_FILE_CASING: 'snake',
        EELZAP_CODEGEN_FOLDER_CASING: 'pascal',
        EELZAP_CODEGEN_TYPE_CASING: 'camel',
      },
    );

    expect(resolved.collections).toBe(false);
    expect(resolved.documents).toBe(true);
    expect(resolved.includeCollections).toEqual(['posts', 'products']);
    expect(resolved.excludeDocuments).toEqual(['drafts']);
    expect(resolved.includeSeo).toBe(false);
    expect(resolved.includeMeta).toBe(false);
    expect(resolved.fileNameCasing).toBe('snake');
    expect(resolved.folderNameCasing).toBe('pascal');
    expect(resolved.typeNameCasing).toBe('camel');
  });

  it('ignores invalid environment casing and boolean values', () => {
    const resolved = resolveCodegenConfig(
      {
        includeMeta: false,
      },
      {},
      {
        EELZAP_CODEGEN_INCLUDE_META: 'maybe',
        EELZAP_CODEGEN_FILE_CASING: 'weird',
        EELZAP_CODEGEN_FOLDER_CASING: 'odd',
        EELZAP_CODEGEN_TYPE_CASING: 'strange',
      },
    );

    expect(resolved.includeMeta).toBe(false);
    expect(resolved.fileNameCasing).toBe('kebab');
    expect(resolved.folderNameCasing).toBe('kebab');
    expect(resolved.typeNameCasing).toBe('pascal');
  });
});

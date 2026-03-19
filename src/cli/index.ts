import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';

import { checkbox, confirm, input, select } from '@inquirer/prompts';
import dotenv from 'dotenv';

import { createClient } from '../client';
import { generateTypes } from './codegen';
import {
  DEFAULT_CODEGEN_CONFIG,
  type CliFlags,
  type EelZapCodegenConfig,
  type FileNameCasing,
  type TypeNameCasing,
  loadConfig,
  resolveCodegenConfig,
} from './config';

export async function runCli(argv: string[] = process.argv.slice(2)): Promise<void> {
  const cwd = process.cwd();
  dotenv.config({ path: join(cwd, '.env') });

  const parsed = parseArgs(argv);
  if (parsed.help) {
    printHelp();
    return;
  }

  if (parsed.version) {
    await printVersion();
    return;
  }

  const { config: loadedConfig, path: configPath } = await loadConfig(cwd, parsed.configPath);
  const shouldPrompt = shouldEnterInteractiveMode(parsed, configPath);
  const config = shouldPrompt
    ? await buildInteractiveConfig(cwd, loadedConfig)
    : resolveCodegenConfig(loadedConfig, parsed, process.env);

  const result = await generateTypes({
    ...config,
    writeFiles: !parsed.dryRun,
  });

  if (parsed.dryRun) {
    const outputDir = config.outputDir ?? DEFAULT_CODEGEN_CONFIG.outputDir;
    console.log('[eelzap-codegen] Dry run - files that would be generated:\n');
    for (const file of result.files) {
      console.log(`--- ${outputDir}/${file.path} ---`);
      console.log(file.content);
    }
    console.log(
      `[eelzap-codegen] ${String(result.files.length)} file${result.files.length === 1 ? '' : 's'} would be written to ${outputDir}/`,
    );
    return;
  }

  const writtenOutputDir =
    result.outputDir ?? resolve(config.outputDir ?? DEFAULT_CODEGEN_CONFIG.outputDir);
  console.log(
    `[eelzap-codegen] Wrote ${String(result.filesWritten)} file${result.filesWritten === 1 ? '' : 's'} to ${writtenOutputDir}`,
  );

  if (shouldPrompt) {
    await saveInteractiveConfig(cwd, config);
  }
}

function parseArgs(argv: string[]): CliFlags {
  const flags: CliFlags = {};
  const args = argv[0] === 'generate' ? argv.slice(1) : argv;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (!arg) {
      continue;
    }

    if (arg === '--help') {
      flags.help = true;
      continue;
    }

    if (arg === '--version') {
      flags.version = true;
      continue;
    }

    if (arg === '--collections-only') {
      flags.collections = true;
      flags.documents = false;
      continue;
    }

    if (arg === '--documents-only') {
      flags.collections = false;
      flags.documents = true;
      continue;
    }

    if (arg === '--no-comments') {
      flags.addFieldComments = false;
      continue;
    }

    if (arg === '--no-seo') {
      flags.includeSeo = false;
      continue;
    }

    if (arg === '--no-meta') {
      flags.includeMeta = false;
      continue;
    }

    if (arg === '--no-index') {
      flags.generateIndex = false;
      continue;
    }

    if (arg === '--dry-run') {
      flags.dryRun = true;
      continue;
    }

    if (arg === '--verbose') {
      flags.verbose = true;
      continue;
    }

    if (
      arg === '--api-key' ||
      arg === '--base-url' ||
      arg === '--output-dir' ||
      arg === '--config'
    ) {
      const value = args[index + 1];
      if (!value || value.startsWith('--')) {
        throw new Error(`Missing value for ${arg}.`);
      }
      if (arg === '--api-key') {
        flags.apiKey = value;
      } else if (arg === '--base-url') {
        flags.baseUrl = value;
      } else if (arg === '--output-dir') {
        flags.outputDir = value;
      } else {
        flags.configPath = value;
      }
      index += 1;
      continue;
    }

    if (arg === '--include' || arg === '--exclude') {
      const values: string[] = [];
      let cursor = index + 1;
      while (cursor < args.length && !args[cursor]?.startsWith('--')) {
        values.push(args[cursor]);
        cursor += 1;
      }
      if (arg === '--include') {
        flags.include = values;
      } else {
        flags.exclude = values;
      }
      index = cursor - 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return flags;
}

async function buildInteractiveConfig(
  cwd: string,
  loadedConfig: EelZapCodegenConfig,
): Promise<EelZapCodegenConfig> {
  const apiKey =
    process.env.EELZAP_API_KEY ??
    (await input({
      message: 'EELZAP API key',
      validate: (value: string) => (value.trim().length > 0 ? true : 'API key is required.'),
    }));
  const baseUrl = await input({
    message: 'Base URL',
    default: process.env.EELZAP_BASE_URL ?? loadedConfig.baseUrl ?? 'https://api.eelzap.com',
  });
  const outputDir = await input({
    message: 'Output directory',
    default: loadedConfig.outputDir ?? DEFAULT_CODEGEN_CONFIG.outputDir,
  });
  const scope = await select({
    message: 'What should be generated?',
    choices: [
      { name: 'All collections and documents', value: 'all' },
      { name: 'Choose specific collections/documents', value: 'select' },
    ],
  });

  const client = createClient({ apiKey, baseUrl });
  const includeCollections: string[] = [];
  const includeDocuments: string[] = [];

  if (scope === 'select') {
    const [collectionsResponse, documentsResponse] = await Promise.all([
      client.collections.list(),
      client.documents.list(),
    ]);

    const chosenCollections = await checkbox({
      message: 'Collections to generate',
      choices: collectionsResponse.data.map((collection) => ({
        name: collection.name,
        value: collection.key,
      })),
    });
    const chosenDocuments = await checkbox({
      message: 'Documents to generate',
      choices: documentsResponse.data.map((document) => ({
        name: document.name,
        value: document.key,
      })),
    });
    includeCollections.push(...chosenCollections);
    includeDocuments.push(...chosenDocuments);
  }

  const fileNameCasingChoices: Array<{ name: string; value: FileNameCasing }> = [
    { name: 'kebab-case', value: 'kebab' },
    { name: 'camelCase', value: 'camel' },
    { name: 'PascalCase', value: 'pascal' },
    { name: 'snake_case', value: 'snake' },
  ];
  const typeNameCasingChoices: Array<{ name: string; value: TypeNameCasing }> = [
    { name: 'PascalCase', value: 'pascal' },
    { name: 'camelCase', value: 'camel' },
  ];

  const fileNameCasing = await select<FileNameCasing>({
    message: 'File name casing',
    default: loadedConfig.fileNameCasing ?? DEFAULT_CODEGEN_CONFIG.fileNameCasing,
    choices: fileNameCasingChoices,
  });
  const typeNameCasing = await select<TypeNameCasing>({
    message: 'Type name casing',
    default: loadedConfig.typeNameCasing ?? DEFAULT_CODEGEN_CONFIG.typeNameCasing,
    choices: typeNameCasingChoices,
  });
  const addFieldComments = await confirm({
    message: 'Add field comments?',
    default: loadedConfig.addFieldComments ?? DEFAULT_CODEGEN_CONFIG.addFieldComments,
  });
  const includeSeo = await confirm({
    message: 'Include SEO fields in generated item/document helper types?',
    default: loadedConfig.includeSeo ?? DEFAULT_CODEGEN_CONFIG.includeSeo,
  });
  const includeMeta = await confirm({
    message: 'Include meta fields in generated item/document helper types?',
    default: loadedConfig.includeMeta ?? DEFAULT_CODEGEN_CONFIG.includeMeta,
  });

  return {
    ...loadedConfig,
    apiKey,
    baseUrl,
    outputDir,
    collections: true,
    documents: true,
    includeCollections,
    includeDocuments,
    fileNameCasing,
    folderNameCasing: loadedConfig.folderNameCasing ?? DEFAULT_CODEGEN_CONFIG.folderNameCasing,
    typeNameCasing,
    addFieldComments,
    includeSeo,
    includeMeta,
    generateIndex: loadedConfig.generateIndex ?? DEFAULT_CODEGEN_CONFIG.generateIndex,
    header: loadedConfig.header ?? DEFAULT_CODEGEN_CONFIG.header,
  };
}

async function saveInteractiveConfig(cwd: string, config: EelZapCodegenConfig): Promise<void> {
  const configPath = resolve(cwd, 'eelzap.config.json');
  const payload = {
    outputDir: config.outputDir,
    fileNameCasing: config.fileNameCasing,
    folderNameCasing: config.folderNameCasing,
    typeNameCasing: config.typeNameCasing,
    collections: config.collections,
    documents: config.documents,
    addFieldComments: config.addFieldComments,
    generateIndex: config.generateIndex,
    includeSeo: config.includeSeo,
    includeMeta: config.includeMeta,
    includeCollections: config.includeCollections,
    includeDocuments: config.includeDocuments,
    excludeCollections: config.excludeCollections,
    excludeDocuments: config.excludeDocuments,
    ...(config.baseUrl ? { baseUrl: config.baseUrl } : {}),
  };

  await mkdir(dirname(configPath), { recursive: true });
  await writeFile(configPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8');
  console.log(`[eelzap-codegen] Saved config to ${configPath}`);
}

function shouldEnterInteractiveMode(flags: CliFlags, configPath: string | null): boolean {
  return !configPath && !hasExplicitOptions(flags);
}

function hasExplicitOptions(flags: CliFlags): boolean {
  return Object.entries(flags).some(([key, value]) => {
    if (key === 'help' || key === 'version') {
      return false;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== undefined;
  });
}

async function printVersion(): Promise<void> {
  const packageJsonPath = resolve(
    process.argv[1] ? dirname(process.argv[1]) : process.cwd(),
    '..',
    'package.json',
  );
  if (!existsSync(packageJsonPath)) {
    console.log('unknown');
    return;
  }

  const packageJson = JSON.parse(await readFile(packageJsonPath, 'utf8')) as {
    version?: string;
  };
  console.log(packageJson.version ?? 'unknown');
}

function printHelp(): void {
  console.log(`eelzap-codegen [generate] [options]

Options:
  --api-key <key>         API key (overrides config/env)
  --base-url <url>        Base URL (overrides config/env)
  --output-dir <path>     Output directory (default: types/eel-zap)
  --collections-only      Only generate collection types
  --documents-only        Only generate document types
  --include <keys...>     Only include these collection/document keys
  --exclude <keys...>     Exclude these collection/document keys
  --no-comments           Skip JSDoc comments
  --no-seo                Skip SEO types
  --no-meta               Skip meta types
  --no-index              Skip barrel index.ts
  --dry-run               Print generated types to stdout without writing files
  --verbose               Print detailed progress
  --config <path>         Path to config file
  --help                  Show help
  --version               Show version`);
}

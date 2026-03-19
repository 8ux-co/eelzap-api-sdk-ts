import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterEach, describe, expect, it, vi } from 'vitest';

import { EelZapError, EelZapNetworkError } from '../errors';
import { generateTypes } from './codegen';

const tempDirs: string[] = [];

async function makeTempDir(): Promise<string> {
  const dir = await mkdtemp(join(tmpdir(), 'eelzap-codegen-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })));
});

describe('generateTypes', () => {
  it('generates typed files from the provided client and writes them to disk', async () => {
    const outputDir = await makeTempDir();
    const client = {
      collections: {
        list: () =>
          Promise.resolve({
            data: [
              {
                key: 'blog-posts',
                name: 'Blog Posts',
                description: null,
                itemCount: 2,
                fields: [
                  {
                    key: 'title',
                    label: 'Title',
                    type: 'SHORT_TEXT',
                    required: true,
                    isLocalized: false,
                  },
                  {
                    key: 'hero_image',
                    label: 'Hero image',
                    type: 'MEDIA',
                    isLocalized: false,
                  },
                ],
              },
            ],
          }),
      },
      documents: {
        list: () =>
          Promise.resolve({
            data: [
              {
                key: 'homepage',
                name: 'Homepage',
                description: null,
                status: 'published',
                updatedAt: '2026-03-19T00:00:00.000Z',
                publishedAt: '2026-03-19T00:00:00.000Z',
                fields: [
                  {
                    key: 'hero_title',
                    label: 'Hero title',
                    type: 'SHORT_TEXT',
                    required: true,
                    isLocalized: false,
                  },
                ],
                sections: [],
              },
            ],
          }),
      },
    };

    const result = await generateTypes({
      client: client as never,
      outputDir,
      writeFiles: true,
    });

    expect(result.filesWritten).toBe(5);
    expect(result.collections).toEqual(['blog-posts']);
    expect(result.documents).toEqual(['homepage']);

    const rootIndex = await readFile(join(outputDir, 'index.ts'), 'utf8');
    const collectionFile = await readFile(join(outputDir, 'collections', 'blog-posts.ts'), 'utf8');
    expect(rootIndex).toContain('BlogPostsContent');
    expect(collectionFile).toContain('export interface BlogPostsContent');
  });

  it('throws a clear error when no api key or client is provided', async () => {
    await expect(generateTypes({})).rejects.toThrow(
      'No API key found. Set EELZAP_API_KEY in .env or pass --api-key.',
    );
  });

  it('filters entities and fetches collection details when fields are missing', async () => {
    const client = {
      collections: {
        list: () =>
          Promise.resolve({
            data: [
              {
                key: 'blog-posts',
                name: 'Blog Posts',
                description: null,
                itemCount: 1,
                fields: [],
              },
              {
                key: 'draft-posts',
                name: 'Draft Posts',
                description: null,
                itemCount: 1,
                fields: [],
              },
            ],
          }),
        get: (key: string) =>
          Promise.resolve({
            key,
            name: 'Blog Posts',
            description: null,
            itemCount: 1,
            fields: [
              {
                key: 'title',
                label: 'Title',
                type: 'SHORT_TEXT',
                required: true,
                isLocalized: false,
              },
            ],
            sections: [],
            sortableFields: [],
            filterableFields: [],
          }),
      },
      documents: {
        list: () =>
          Promise.resolve({
            data: [
              {
                key: 'homepage',
                name: 'Homepage',
                description: null,
                status: 'published',
                updatedAt: '',
                publishedAt: '',
                fields: [],
                sections: [],
              },
            ],
          }),
      },
    };

    const result = await generateTypes({
      client: client as never,
      includeCollections: ['blog-posts'],
      excludeDocuments: ['homepage'],
    });

    expect(result.collections).toEqual(['blog-posts']);
    expect(result.documents).toEqual([]);
    expect(result.files.some((file) => file.path === 'collections/blog-posts.ts')).toBe(true);
  });

  it('maps authentication and network failures to user-facing messages', async () => {
    const unauthorizedClient = {
      collections: {
        list: () => Promise.reject(new EelZapError('UNAUTHORIZED', 'nope', 401)),
      },
      documents: {
        list: () => Promise.resolve({ data: [] }),
      },
    };

    await expect(
      generateTypes({
        client: unauthorizedClient as never,
      }),
    ).rejects.toThrow('Authentication failed. Check your API key.');

    const networkClient = {
      collections: {
        list: () => Promise.reject(new EelZapNetworkError(new Error('offline'))),
      },
      documents: {
        list: () => Promise.resolve({ data: [] }),
      },
    };

    await expect(
      generateTypes({
        client: networkClient as never,
        baseUrl: 'https://custom.example.com',
      }),
    ).rejects.toThrow(
      'Could not connect to CMS at https://custom.example.com. Check your connection and base URL.',
    );
  });

  it('rethrows non-auth API errors and unknown thrown values', async () => {
    const apiErrorClient = {
      collections: {
        list: () => Promise.reject(new EelZapError('NOT_FOUND', 'Missing', 404)),
      },
      documents: {
        list: () => Promise.resolve({ data: [] }),
      },
    };

    await expect(
      generateTypes({
        client: apiErrorClient as never,
      }),
    ).rejects.toMatchObject({
      message: 'Missing',
      status: 404,
    });

    const unknownErrorClient = {
      collections: {
        list: () => Promise.reject(new Error('boom')),
      },
      documents: {
        list: () => Promise.resolve({ data: [] }),
      },
    };

    await expect(
      generateTypes({
        client: unknownErrorClient as never,
      }),
    ).rejects.toThrow('boom');
  });

  it('supports api-key based generation when collections and documents are disabled', async () => {
    vi.stubGlobal('fetch', vi.fn());

    const result = await generateTypes({
      apiKey: 'secret_test',
      collections: false,
      documents: false,
    });

    expect(result.files.map((file) => file.path)).toEqual(['index.ts']);
    expect(result.collections).toEqual([]);
    expect(result.documents).toEqual([]);
  });
});

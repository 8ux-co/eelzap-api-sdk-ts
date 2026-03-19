import { describe, expect, it } from 'vitest';

import type { FieldInfo } from '../types/collections';
import { emitEntityFile, emitFiles, toCase, toTypeName } from './emitter';

function createField(overrides: Partial<FieldInfo>): FieldInfo {
  return {
    key: 'title',
    label: 'Title',
    type: 'SHORT_TEXT',
    isLocalized: false,
    ...overrides,
  };
}

const options = {
  addFieldComments: true,
  generateIndex: true,
  includeMeta: true,
  includeSeo: true,
  header: '/* generated */',
  fileNameCasing: 'kebab' as const,
  folderNameCasing: 'kebab' as const,
  typeNameCasing: 'pascal' as const,
};

describe('emitEntityFile', () => {
  it('renders collection files with typed helpers', () => {
    const file = emitEntityFile(
      {
        kind: 'collection',
        key: 'blog-posts',
        name: 'Blog Posts',
        fields: [
          createField({ required: true }),
          createField({
            key: 'status',
            label: 'Status',
            type: 'ENUM',
            options: [
              { label: 'Draft', value: 'draft' },
              { label: 'Live', value: 'live' },
            ],
          }),
          createField({ key: 'hero_image', label: 'Hero image', type: 'MEDIA' }),
        ],
      },
      options,
    );

    expect(file.path).toBe('collections/blog-posts.ts');
    expect(file.content).toContain('export interface BlogPostsContent');
    expect(file.content).toContain('"status": "draft" | "live" | null;');
    expect(file.content).toContain('Hero image | MEDIA');
    expect(file.content).toContain(
      'export type BlogPostsItem = ItemDetail<BlogPostsContent> & { meta: ItemMeta; } & { seo: Seo | null; };',
    );
    expect(file.content).toContain(
      "export type BlogPostsListResponse = Omit<ItemListResponse<BlogPostsContent>, 'data'> & { data: BlogPostsItem[] };",
    );
  });

  it('omits helper properties when seo/meta are disabled', () => {
    const file = emitEntityFile(
      {
        kind: 'document',
        key: 'homepage',
        name: 'Homepage',
        fields: [createField({ key: 'hero_title', label: 'Hero title', required: true })],
      },
      {
        ...options,
        includeMeta: false,
        includeSeo: false,
      },
    );

    expect(file.content).toContain(
      "export type HomepageDocument = Omit<DocumentDetail<HomepageContent>, 'meta' | 'seo'>;",
    );
    expect(file.content).not.toContain('import type { DocumentMeta');
  });

  it('supports partial helper toggles', () => {
    const file = emitEntityFile(
      {
        kind: 'document',
        key: 'homepage',
        name: 'Homepage',
        fields: [createField({ key: 'hero_title', label: 'Hero title', required: true })],
      },
      {
        ...options,
        includeMeta: true,
        includeSeo: false,
      },
    );

    expect(file.content).toContain(
      "export type HomepageDocument = Omit<DocumentDetail<HomepageContent>, 'seo'> & { meta: DocumentMeta; };",
    );
  });
});

describe('emitFiles', () => {
  it('includes folder and root index files', () => {
    const files = emitFiles(
      [{ kind: 'collection', key: 'blog-posts', name: 'Blog Posts', fields: [] }],
      [{ kind: 'document', key: 'homepage', name: 'Homepage', fields: [] }],
      options,
    );

    expect(files.map((file) => file.path)).toEqual(
      expect.arrayContaining([
        'collections/blog-posts.ts',
        'collections/index.ts',
        'documents/homepage.ts',
        'documents/index.ts',
        'index.ts',
      ]),
    );
  });

  it('returns only entity files when index generation is disabled', () => {
    const files = emitFiles(
      [{ kind: 'collection', key: 'blog-posts', name: 'Blog Posts', fields: [] }],
      [],
      {
        ...options,
        generateIndex: false,
      },
    );

    expect(files.map((file) => file.path)).toEqual(['collections/blog-posts.ts']);
  });
});

describe('naming helpers', () => {
  it('supports the supported casings', () => {
    expect(toCase('blog-posts', 'camel')).toBe('blogPosts');
    expect(toCase('blog-posts', 'pascal')).toBe('BlogPosts');
    expect(toCase('blog-posts', 'snake')).toBe('blog_posts');
    expect(toTypeName('blog-posts', 'camel')).toBe('blogPosts');
  });
});

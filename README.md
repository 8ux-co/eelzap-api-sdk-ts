**@8ux-co/eelzap-api-sdk-ts**

***

# @8ux-co/eelzap-api-sdk-ts

[![npm version](https://img.shields.io/npm/v/%408ux-co%2Feelzap-api-sdk-ts)](https://www.npmjs.com/package/@8ux-co/eelzap-api-sdk-ts)
[![CI](https://img.shields.io/github/actions/workflow/status/8ux-co/eelzap-api-sdk-ts/ci.yml?branch=main&label=ci)](https://github.com/8ux-co/eelzap-api-sdk-ts/actions/workflows/ci.yml)
[![license](https://img.shields.io/npm/l/%408ux-co%2Feelzap-api-sdk-ts)](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/main/LICENSE)
[![Docs](https://img.shields.io/badge/docs-github%20pages-blue)](https://8ux-co.github.io/eelzap-api-sdk-ts/)

Official TypeScript client for the EelZap Content Delivery API.

## Installation

```bash
npm install @8ux-co/eelzap-api-sdk-ts
```

## Quick Start

```ts
import { createClient } from '@8ux-co/eelzap-api-sdk-ts';

const cms = createClient({
  apiKey: process.env.EELZAP_API_KEY!,
});

const { data: posts } = await cms.items.list('blog-posts', {
  pageSize: 10,
  sort: '-publishedAt',
  locale: 'en',
});
```

## Configuration

`createClient` accepts:

| Option | Type | Required | Default |
| --- | --- | --- | --- |
| `apiKey` | `string` | Yes | — |
| `baseUrl` | `string` | No | `https://api.eelzap.com` |
| `pathPrefix` | `string` | No | `/v1` |
| `locale` | `string` | No | Site default locale |
| `status` | `'published' \| 'draft' \| 'all'` | No | `published` |
| `fetch` | `typeof fetch` | No | Global `fetch` |
| `defaultHeaders` | `HeadersInit` | No | — |
| `timeout` | `number` | No | `30000` |

## Usage

### Collections

```ts
const collections = await cms.collections.list();
const blog = await cms.collections.get('blog-posts');
const created = await cms.collections.create({
  name: 'Blog Posts',
  key: 'blog-posts',
});
await cms.collections.fields.create('blog-posts', {
  key: 'title',
  name: 'Title',
  type: 'SHORT_TEXT',
});
```

### Items

```ts
const products = await cms.items.list('products', {
  page: 1,
  pageSize: 20,
  sort: '-price',
  fields: ['title', 'price', 'category'],
  filter: {
    category: 'electronics',
    price: { gte: 100, lt: 500 },
  },
});

const product = await cms.items.get('products', 'noise-cancelling-headphones', {
  locale: 'en',
});

await cms.items.create('products', {
  slug: 'noise-cancelling-headphones',
  values: {
    title: 'Noise Cancelling Headphones',
  },
});
await cms.items.publish('products', 'noise-cancelling-headphones');
```

### Query Builder

```ts
const result = await cms.items
  .collection('products')
  .locale('en')
  .filter('category', 'electronics')
  .filter('price', { gte: 100 })
  .sort('-price')
  .fields(['title', 'price'])
  .page(1)
  .pageSize(20)
  .get();
```

### Documents

```ts
const documents = await cms.documents.list({ locale: 'en' });
const homepage = await cms.documents.get('homepage', {
  locale: 'en',
  status: 'draft',
});

await cms.documents.update('homepage', {
  name: 'Homepage',
  key: 'homepage-v2',
  description: 'The main landing page',
});

await cms.documents.values.update('homepage', {
  hero_title: 'Welcome',
});
await cms.documents.seo.update('homepage', {
  metaTitle: 'Homepage',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Homepage',
  },
});
```

### Site

```ts
const site = await cms.site.get();
```

### Media

```ts
const media = await cms.media.upload({
  file: new Blob(['hello'], { type: 'text/plain' }),
  filename: 'hello.txt',
  contentType: 'text/plain',
  title: 'Greeting',
});

await cms.media.publish(media.id);
```

### Content Versioning

The SDK supports the full draft workflow — create drafts, update them, preview, and publish when ready.

```ts
// Create a draft from the current published version
const draft = await cms.itemVersions.createDraft('blog', 'hello-world', {
  note: 'Update hero image',
});

// Update the draft with new values
await cms.itemVersions.updateDraft('blog', 'hello-world', {
  values: { hero_image: 'new-image-id' },
  locale: 'en',
});

// Publish when ready
await cms.itemVersions.publishDraft('blog', 'hello-world');

// Or discard if not needed
await cms.itemVersions.discardDraft('blog', 'hello-world');

// List version history
const { versions } = await cms.itemVersions.list('blog', 'hello-world');

// Rollback to a previous version (creates a new draft)
await cms.itemVersions.rollback('blog', 'hello-world', versions[2].id);
```

Document versioning works the same way:

```ts
await cms.documentVersions.createDraft('homepage');
await cms.documentVersions.updateDraft('homepage', {
  values: { title: 'Welcome' },
});
await cms.documentVersions.publishDraft('homepage');
```

### Rich Text And Media Helpers

```ts
import {
  getMediaUrl,
  richTextToHtml,
  richTextToPlainText,
  type RichTextDocument,
} from '@8ux-co/eelzap-api-sdk-ts';

const description = item.content.description as RichTextDocument | null;

const html = richTextToHtml(description);
const excerpt = richTextToPlainText(description);
const imageUrl = getMediaUrl(item.content.heroImage);
```

## Next.js

```ts
// lib/cms.ts
import { createClient } from '@8ux-co/eelzap-api-sdk-ts';

export const cms = createClient({
  apiKey: process.env.EELZAP_API_KEY!,
  baseUrl: process.env.EELZAP_BASE_URL,
  pathPrefix: process.env.EELZAP_PATH_PREFIX,
});
```

```ts
// app/blog/page.tsx
import { cms } from '@/lib/cms';

export const revalidate = 60;

export default async function BlogPage() {
  const { data } = await cms.items.list('blog-posts', { pageSize: 10 });
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

## Codegen

The SDK ships with a schema-driven CLI that generates TypeScript types from your
live collections and documents.

### Install

```bash
npm install @8ux-co/eelzap-api-sdk-ts
```

### Quick usage

```bash
# Reads EELZAP_API_KEY from .env in the current project
npx eelzap-codegen

# Explicit command form
npx eelzap-codegen generate --api-key secret_abc123 --output-dir src/generated/cms

# Preview only
npx eelzap-codegen --dry-run
```

Generated output defaults to `types/eel-zap/`:

```text
types/eel-zap/
├── index.ts
├── collections/
│   ├── index.ts
│   └── blog-posts.ts
└── documents/
    ├── index.ts
    └── homepage.ts
```

### Config file

The CLI looks for one of:

- `eelzap.config.ts`
- `eelzap.config.js`
- `eelzap.config.mjs`
- `eelzap.config.json`
- `.eelzaprc.json`

```ts
// eelzap.config.ts
import type { EelZapCodegenConfig } from '@8ux-co/eelzap-api-sdk-ts/codegen';

export default {
  apiKey: process.env.EELZAP_API_KEY,
  baseUrl: process.env.EELZAP_BASE_URL,
  outputDir: 'types/eel-zap',
  collections: true,
  documents: true,
  includeCollections: ['blog-posts'],
  excludeDocuments: ['internal-notes'],
  fileNameCasing: 'kebab',
  folderNameCasing: 'kebab',
  typeNameCasing: 'pascal',
  addFieldComments: true,
  generateIndex: true,
  includeSeo: true,
  includeMeta: true,
  header: '/* Auto-generated by @8ux-co/eelzap-api-sdk-ts codegen - DO NOT EDIT */',
} satisfies EelZapCodegenConfig;
```

When you run the CLI without flags and without a config file, it enters
interactive mode, prompts for the missing values, and writes
`eelzap.config.json` for subsequent runs. The API key is kept in `.env`.

### Flags

```text
--api-key <key>         API key (overrides config/env)
--base-url <url>        Base URL (overrides config/env)
--output-dir <path>     Output directory (default: types/eel-zap)
--collections-only      Only generate collection types
--documents-only        Only generate document types
--include <keys...>     Only include these collection/document keys
--exclude <keys...>     Exclude these collection/document keys
--no-comments           Skip JSDoc comments
--no-seo                Skip SEO helper fields
--no-meta               Skip meta helper fields
--no-index              Skip barrel index.ts files
--dry-run               Print generated files without writing them
--verbose               Print detailed progress
--config <path>         Path to config file
```

### Generated type usage

```ts
import { createClient } from '@8ux-co/eelzap-api-sdk-ts';
import type { BlogPostsContent, HomepageDocument } from '@/types/eel-zap';

const cms = createClient({
  apiKey: process.env.EELZAP_API_KEY!,
});

const { data: posts } = await cms.items.list<BlogPostsContent>('blog-posts', {
  pageSize: 10,
});

const homepage = await cms.documents.get<HomepageDocument['content']>('homepage');

posts[0]?.content.title;
homepage.content.hero_title;
```

### Next.js workflow

```json
{
  "scripts": {
    "codegen": "eelzap-codegen generate",
    "dev": "npm run codegen && next dev",
    "build": "npm run codegen && next build"
  }
}
```

### Programmatic API

```ts
import { generateTypes } from '@8ux-co/eelzap-api-sdk-ts/codegen';

const result = await generateTypes({
  apiKey: process.env.EELZAP_API_KEY,
  outputDir: 'types/eel-zap',
  writeFiles: true,
});

console.log(result.filesWritten);
```

## Resilience & Caching

The SDK ships a `cachedFetch` helper and a `CacheAdapter` interface for
application-level content caching.

Two strategies are supported:

- `network-first` (default): always fetch fresh content, cache on success,
  fall back to the last cached value on failure.
- `cache-first`: return cached content immediately when present, only fetch
  when the cache misses.

This gives you two useful modes:

- resilience-first delivery with `network-first`
- speed-first delivery with `cache-first`

If no cached value exists and the fetch fails, the original error is
re-thrown so your app can handle it explicitly.

### Quick examples

```ts
import {
  createClient,
  cachedFetch,
  MemoryCacheAdapter,
} from '@8ux-co/eelzap-api-sdk-ts';

const cms = createClient({ apiKey: process.env.EELZAP_API_KEY! });
const cache = new MemoryCacheAdapter();

// Default strategy: network-first
const homepage = await cachedFetch(
  'homepage',
  () => cms.documents.get('homepage'),
  cache,
);

// Options overload: cache-first
const posts = await cachedFetch({
  key: 'blog:page-1',
  adapter: cache,
  strategy: 'cache-first',
  fetcher: () => cms.items.list('blog-posts', { pageSize: 10 }),
});
```

### `cachedFetch` behavior

#### `network-first`

1. Executes your `fetcher`
2. Stores the fresh result in the adapter
3. Returns the fresh result
4. If the fetch fails, returns the last cached value when available

#### `cache-first`

1. Checks the adapter first
2. Returns the cached value immediately on hit
3. On miss, executes your `fetcher`
4. Stores and returns the fresh result

### API shapes

```ts
// Backwards-compatible positional API
await cachedFetch('homepage', () => cms.documents.get('homepage'), cache);

// Options API
await cachedFetch({
  key: 'homepage',
  adapter: cache,
  strategy: 'cache-first',
  fetcher: () => cms.documents.get('homepage'),
});
```

### Custom cache adapters

`MemoryCacheAdapter` works for long-lived servers but data is lost on
restart. Implement the `CacheAdapter` interface to persist to any
backend:

```ts
import type { CacheAdapter } from '@8ux-co/eelzap-api-sdk-ts';

// Example: filesystem adapter (Node.js)
class FsCacheAdapter<T = unknown> implements CacheAdapter<T> {
  #dir: string;
  constructor(dir: string) { this.#dir = dir; }

  async get(key: string): Promise<T | undefined> {
    try {
      const raw = await fs.readFile(path.join(this.#dir, `${key}.json`), 'utf8');
      return JSON.parse(raw) as T;
    } catch { return undefined; }
  }

  async set(key: string, value: T): Promise<void> {
    await fs.mkdir(this.#dir, { recursive: true });
    await fs.writeFile(
      path.join(this.#dir, `${key}.json`),
      JSON.stringify(value),
    );
  }
}
```

Other backends that work well: Vercel KV, Cloudflare KV, Redis,
IndexedDB (for client-side apps), or your framework's built-in cache.

### Recommendations

| Scenario | Recommended adapter | Notes |
| --- | --- | --- |
| Long-running server (Express, Fastify) | `MemoryCacheAdapter` | Fast, no I/O; lost on restart |
| Serverless (Lambda, Vercel Functions) | File system or KV store | Memory is discarded between invocations |
| Edge (Cloudflare Workers) | KV or Durable Objects | Workers have no filesystem |
| Static builds (Astro, Gatsby) | Not needed | Content is fetched at build time |
| Client-side SPA | IndexedDB or localStorage adapter | Survives page reloads |

### Why not hardcoded fallbacks?

Hardcoded default strings go stale immediately and create a maintenance
burden. With `cachedFetch`, your site always serves real CMS content:

- **First deploy:** content is fetched fresh and cached.
- **CMS goes down:** last-known-good content is served seamlessly.
- **CMS recovers:** the cache is silently refreshed on the next request.
- **Content never fetched:** the error propagates — you decide how to
  handle it (error page, skeleton, etc.) rather than showing stale
  placeholder text.

## Webhooks

When your CMS site is configured with a webhook URL and secret, EelZap
can notify your application whenever content changes. This pairs well
with `cache-first`: serve cached content fast, then invalidate keys when
the CMS tells you something changed.

The SDK includes:

- `verifyWebhookSignature(payload, signature, secret)`
- webhook payload types: `WebhookPayload`, `WebhookChange`,
  `WebhookEventType`, `WebhookAction`

### Signature verification

EelZap signs webhook payloads with HMAC-SHA256 and sends the result in
the `X-EelZap-Signature` header:

```ts
import { verifyWebhookSignature } from '@8ux-co/eelzap-api-sdk-ts';

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get('x-eelzap-signature') ?? '';

  const isValid = await verifyWebhookSignature(
    payload,
    signature,
    process.env.EELZAP_WEBHOOK_SECRET!,
  );

  if (!isValid) {
    return new Response('Invalid signature', { status: 401 });
  }

  return new Response('ok');
}
```

### Webhook payload shape

```ts
interface WebhookPayload {
  event: 'content.changed';
  site: { id: string; key: string };
  changes: Array<{
    type: 'item' | 'document' | 'media';
    action: 'created' | 'updated' | 'deleted' | 'published' | 'unpublished';
    resourceKey: string;
    collectionKey?: string;
  }>;
  timestamp: string;
}
```

### Cache invalidation example

```ts
import {
  MemoryCacheAdapter,
  type WebhookPayload,
  verifyWebhookSignature,
} from '@8ux-co/eelzap-api-sdk-ts';

const cache = new MemoryCacheAdapter();

export async function POST(request: Request) {
  const payload = await request.text();
  const signature = request.headers.get('x-eelzap-signature') ?? '';

  const isValid = await verifyWebhookSignature(
    payload,
    signature,
    process.env.EELZAP_WEBHOOK_SECRET!,
  );

  if (!isValid) {
    return new Response('Invalid signature', { status: 401 });
  }

  const body = JSON.parse(payload) as WebhookPayload;

  for (const change of body.changes) {
    if (change.type === 'document') {
      cache.delete(change.resourceKey);
    }
  }

  return new Response('ok');
}
```

### Recommended pattern

1. Use `cachedFetch(..., cache)` with `network-first` when you want
   automatic stale fallback on outages.
2. Use `cachedFetch({ strategy: 'cache-first', ... })` when you want
   instant cached reads.
3. Configure a CMS webhook endpoint in your app.
4. Verify `X-EelZap-Signature` with `verifyWebhookSignature`.
5. Invalidate the affected cache keys from `body.changes`.

## Error Handling

```ts
import { isEelZapError } from '@8ux-co/eelzap-api-sdk-ts';

try {
  await cms.items.get('blog-posts', 'missing-post');
} catch (error) {
  if (isEelZapError(error)) {
    console.error(error.code, error.status, error.message);
  }
}
```

## TypeScript

Use generics when you know a content shape:

```ts
type BlogPost = {
  title: string;
  excerpt: string;
};

const post = await cms.items.get<BlogPost>('blog-posts', 'hello-world');
post.content.title;
```

## Security

- Keep secret keys on the server only.
- Use public keys for browser clients.
- Do not commit `.env`; this repo includes `.env.example` only.
- `EelZapClient#toString()` masks the API key for safer logging.

## API Reference

Generate docs locally with:

```bash
npm run docs
```

Live API docs:

<https://8ux-co.github.io/eelzap-api-sdk-ts/>

The published documentation is deployed from the `gh-pages` branch by CI.
That branch is generated output only:

- do not develop on `gh-pages`
- do not open pull requests from `gh-pages` into `main`
- expect `gh-pages` to diverge from `main`, because it contains built docs rather than source code

## Contributing

```bash
npm install
npm run lint
npm run typecheck
npm test
npm run build
```

## License

MIT

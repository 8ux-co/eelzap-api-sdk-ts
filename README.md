# @8ux-co/eelzap-api-sdk-ts

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
```

## Next.js

```ts
// lib/cms.ts
import { createClient } from '@8ux-co/eelzap-api-sdk-ts';

export const cms = createClient({
  apiKey: process.env.EELZAP_API_KEY!,
  baseUrl: process.env.EELZAP_BASE_URL,
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

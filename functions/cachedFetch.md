[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / cachedFetch

# Function: cachedFetch()

## Call Signature

> **cachedFetch**\<`T`\>(`key`, `fetcher`, `adapter`): `Promise`\<`T`\>

Defined in: [src/cache.ts:74](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/cache.ts#L74)

Executes `fetcher`, caches the result on success, and falls back to
the last cached value on failure. If no cached value exists, the
original error is re-thrown — there are no hardcoded fallbacks.

### Type Parameters

#### T

`T`

### Parameters

#### key

`string`

Stable cache key (e.g. `"homepage"`, `"blog-posts:page-1"`).

#### fetcher

() => `Promise`\<`T`\>

An async function that fetches fresh content from the CMS.

#### adapter

[`CacheAdapter`](../interfaces/CacheAdapter.md)\<`T`\>

Storage backend that persists last-known-good values.

### Returns

`Promise`\<`T`\>

The fresh result or the last successfully cached value.

### Example

```ts
const cache = new MemoryCacheAdapter();

const homepage = await cachedFetch(
  'homepage',
  () => cms.documents.get('homepage'),
  cache,
);
```

## Call Signature

> **cachedFetch**\<`T`\>(`options`): `Promise`\<`T`\>

Defined in: [src/cache.ts:79](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/cache.ts#L79)

Executes `fetcher`, caches the result on success, and falls back to
the last cached value on failure. If no cached value exists, the
original error is re-thrown — there are no hardcoded fallbacks.

### Type Parameters

#### T

`T`

### Parameters

#### options

[`CachedFetchOptions`](../interfaces/CachedFetchOptions.md)\<`T`\>

### Returns

`Promise`\<`T`\>

The fresh result or the last successfully cached value.

### Example

```ts
const cache = new MemoryCacheAdapter();

const homepage = await cachedFetch(
  'homepage',
  () => cms.documents.get('homepage'),
  cache,
);
```

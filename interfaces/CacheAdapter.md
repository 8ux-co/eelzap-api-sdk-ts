[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / CacheAdapter

# Interface: CacheAdapter\<T\>

Defined in: [src/cache.ts:8](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/cache.ts#L8)

Pluggable storage interface for last-known-good caching.

Implement this to persist content to any backend (KV, Redis,
filesystem, IndexedDB, etc.). The SDK ships a built-in
[MemoryCacheAdapter](../classes/MemoryCacheAdapter.md) for processes that stay alive.

## Type Parameters

### T

`T` = `unknown`

## Methods

### get()

> **get**(`key`): `T` \| `Promise`\<`T` \| `undefined`\> \| `undefined`

Defined in: [src/cache.ts:9](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/cache.ts#L9)

#### Parameters

##### key

`string`

#### Returns

`T` \| `Promise`\<`T` \| `undefined`\> \| `undefined`

***

### set()

> **set**(`key`, `value`): `void` \| `Promise`\<`void`\>

Defined in: [src/cache.ts:10](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/cache.ts#L10)

#### Parameters

##### key

`string`

##### value

`T`

#### Returns

`void` \| `Promise`\<`void`\>

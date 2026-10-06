[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / CachedFetchOptions

# Interface: CachedFetchOptions\<T\>

Defined in: [src/cache.ts:15](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/b3ce6a4200b34b1ce8043b5c04366219aacd3c44/src/cache.ts#L15)

## Type Parameters

### T

`T` = `unknown`

## Properties

### adapter

> **adapter**: [`CacheAdapter`](CacheAdapter.md)\<`T`\>

Defined in: [src/cache.ts:18](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/b3ce6a4200b34b1ce8043b5c04366219aacd3c44/src/cache.ts#L18)

***

### fetcher()

> **fetcher**: () => `Promise`\<`T`\>

Defined in: [src/cache.ts:17](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/b3ce6a4200b34b1ce8043b5c04366219aacd3c44/src/cache.ts#L17)

#### Returns

`Promise`\<`T`\>

***

### key

> **key**: `string`

Defined in: [src/cache.ts:16](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/b3ce6a4200b34b1ce8043b5c04366219aacd3c44/src/cache.ts#L16)

***

### strategy?

> `optional` **strategy**: [`CacheStrategy`](../type-aliases/CacheStrategy.md)

Defined in: [src/cache.ts:19](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/b3ce6a4200b34b1ce8043b5c04366219aacd3c44/src/cache.ts#L19)

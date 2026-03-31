[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / MemoryCacheAdapter

# Class: MemoryCacheAdapter

Defined in: [src/cache.ts:26](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/cache.ts#L26)

Simple in-memory adapter. Suitable for long-lived server processes
or development. Data is lost when the process restarts.

## Implements

- [`CacheAdapter`](../interfaces/CacheAdapter.md)

## Constructors

### Constructor

> **new MemoryCacheAdapter**(): `MemoryCacheAdapter`

#### Returns

`MemoryCacheAdapter`

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

Defined in: [src/cache.ts:38](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/cache.ts#L38)

Returns the number of cached entries.

##### Returns

`number`

## Methods

### clear()

> **clear**(): `void`

Defined in: [src/cache.ts:48](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/cache.ts#L48)

Removes all cached entries.

#### Returns

`void`

***

### delete()

> **delete**(`key`): `boolean`

Defined in: [src/cache.ts:43](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/cache.ts#L43)

Removes a specific key from the cache.

#### Parameters

##### key

`string`

#### Returns

`boolean`

***

### get()

> **get**(`key`): `unknown`

Defined in: [src/cache.ts:29](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/cache.ts#L29)

#### Parameters

##### key

`string`

#### Returns

`unknown`

#### Implementation of

[`CacheAdapter`](../interfaces/CacheAdapter.md).[`get`](../interfaces/CacheAdapter.md#get)

***

### set()

> **set**(`key`, `value`): `void`

Defined in: [src/cache.ts:33](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/cache.ts#L33)

#### Parameters

##### key

`string`

##### value

`unknown`

#### Returns

`void`

#### Implementation of

[`CacheAdapter`](../interfaces/CacheAdapter.md).[`set`](../interfaces/CacheAdapter.md#set)

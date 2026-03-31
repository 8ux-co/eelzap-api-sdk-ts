[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / ItemsResource

# Class: ItemsResource

Defined in: [src/resources/items.ts:21](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/items.ts#L21)

Read-only collection item endpoints.

## Properties

### seo

> `readonly` **seo**: [`ItemSeoResource`](ItemSeoResource.md)

Defined in: [src/resources/items.ts:22](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/items.ts#L22)

## Methods

### collection()

> **collection**(`collectionKey`): [`ItemQueryBuilder`](ItemQueryBuilder.md)

Defined in: [src/resources/items.ts:85](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/items.ts#L85)

Starts a lazy fluent query builder for a collection.

#### Parameters

##### collectionKey

`string`

#### Returns

[`ItemQueryBuilder`](ItemQueryBuilder.md)

***

### create()

> **create**\<`TContent`\>(`collectionKey`, `input`): `Promise`\<[`ItemDetail`](../interfaces/ItemDetail.md)\<`TContent`\>\>

Defined in: [src/resources/items.ts:92](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/items.ts#L92)

Creates an item in a collection.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Parameters

##### collectionKey

`string`

##### input

[`CreateItemInput`](../interfaces/CreateItemInput.md)

#### Returns

`Promise`\<[`ItemDetail`](../interfaces/ItemDetail.md)\<`TContent`\>\>

***

### delete()

> **delete**(`collectionKey`, `slug`, `options?`): `Promise`\<\{ `success`: `true`; \}\>

Defined in: [src/resources/items.ts:121](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/items.ts#L121)

Deletes an item by slug.

#### Parameters

##### collectionKey

`string`

##### slug

`string`

##### options?

[`DeleteOptions`](../interfaces/DeleteOptions.md)

#### Returns

`Promise`\<\{ `success`: `true`; \}\>

***

### get()

> **get**\<`TContent`\>(`collectionKey`, `slug`, `options?`): `Promise`\<[`ItemDetail`](../interfaces/ItemDetail.md)\<`TContent`\>\>

Defined in: [src/resources/items.ts:63](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/items.ts#L63)

Retrieves a single item by slug.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Parameters

##### collectionKey

`string`

##### slug

`string`

##### options?

[`CommonRequestOptions`](../interfaces/CommonRequestOptions.md)

#### Returns

`Promise`\<[`ItemDetail`](../interfaces/ItemDetail.md)\<`TContent`\>\>

***

### list()

> **list**\<`TContent`\>(`collectionKey`, `options?`): `Promise`\<[`ItemListResponse`](../interfaces/ItemListResponse.md)\<`TContent`\>\>

Defined in: [src/resources/items.ts:38](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/items.ts#L38)

Lists items in a collection.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Parameters

##### collectionKey

`string`

##### options?

[`ItemListOptions`](../interfaces/ItemListOptions.md)

#### Returns

`Promise`\<[`ItemListResponse`](../interfaces/ItemListResponse.md)\<`TContent`\>\>

***

### publish()

> **publish**\<`TContent`\>(`collectionKey`, `slug`): `Promise`\<[`ItemDetail`](../interfaces/ItemDetail.md)\<`TContent`\>\>

Defined in: [src/resources/items.ts:135](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/items.ts#L135)

Publishes an item by slug.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Parameters

##### collectionKey

`string`

##### slug

`string`

#### Returns

`Promise`\<[`ItemDetail`](../interfaces/ItemDetail.md)\<`TContent`\>\>

***

### unpublish()

> **unpublish**\<`TContent`\>(`collectionKey`, `slug`): `Promise`\<[`ItemDetail`](../interfaces/ItemDetail.md)\<`TContent`\>\>

Defined in: [src/resources/items.ts:148](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/items.ts#L148)

Unpublishes an item by slug.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Parameters

##### collectionKey

`string`

##### slug

`string`

#### Returns

`Promise`\<[`ItemDetail`](../interfaces/ItemDetail.md)\<`TContent`\>\>

***

### update()

> **update**\<`TContent`\>(`collectionKey`, `slug`, `input`): `Promise`\<[`ItemDetail`](../interfaces/ItemDetail.md)\<`TContent`\>\>

Defined in: [src/resources/items.ts:106](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/items.ts#L106)

Updates an item by slug.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Parameters

##### collectionKey

`string`

##### slug

`string`

##### input

[`UpdateItemInput`](../interfaces/UpdateItemInput.md)

#### Returns

`Promise`\<[`ItemDetail`](../interfaces/ItemDetail.md)\<`TContent`\>\>

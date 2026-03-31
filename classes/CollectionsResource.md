[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / CollectionsResource

# Class: CollectionsResource

Defined in: [src/resources/collections.ts:17](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collections.ts#L17)

Read-only collection endpoints.

## Properties

### fields

> `readonly` **fields**: [`CollectionFieldsResource`](CollectionFieldsResource.md)

Defined in: [src/resources/collections.ts:18](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collections.ts#L18)

***

### sections

> `readonly` **sections**: [`CollectionSectionsResource`](CollectionSectionsResource.md)

Defined in: [src/resources/collections.ts:19](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collections.ts#L19)

## Methods

### create()

> **create**(`input`): `Promise`\<[`CollectionDetail`](../interfaces/CollectionDetail.md)\>

Defined in: [src/resources/collections.ts:61](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collections.ts#L61)

Creates a collection.

#### Parameters

##### input

[`CreateCollectionInput`](../interfaces/CreateCollectionInput.md)

#### Returns

`Promise`\<[`CollectionDetail`](../interfaces/CollectionDetail.md)\>

***

### delete()

> **delete**(`collectionKey`, `options?`): `Promise`\<\{ `success`: `true`; \}\>

Defined in: [src/resources/collections.ts:83](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collections.ts#L83)

Deletes a collection.

#### Parameters

##### collectionKey

`string`

##### options?

[`DeleteOptions`](../interfaces/DeleteOptions.md)

#### Returns

`Promise`\<\{ `success`: `true`; \}\>

***

### get()

> **get**(`collectionKey`, `options?`): `Promise`\<[`CollectionDetail`](../interfaces/CollectionDetail.md)\>

Defined in: [src/resources/collections.ts:47](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collections.ts#L47)

Retrieves the schema for a single collection.

#### Parameters

##### collectionKey

`string`

##### options?

###### status?

[`DeliveryStatus`](../type-aliases/DeliveryStatus.md)

#### Returns

`Promise`\<[`CollectionDetail`](../interfaces/CollectionDetail.md)\>

***

### list()

> **list**(`options?`): `Promise`\<[`CollectionListResponse`](../interfaces/CollectionListResponse.md)\>

Defined in: [src/resources/collections.ts:36](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collections.ts#L36)

Lists all collections available to the current API key.

#### Parameters

##### options?

###### status?

[`DeliveryStatus`](../type-aliases/DeliveryStatus.md)

#### Returns

`Promise`\<[`CollectionListResponse`](../interfaces/CollectionListResponse.md)\>

***

### update()

> **update**(`collectionKey`, `input`): `Promise`\<[`CollectionDetail`](../interfaces/CollectionDetail.md)\>

Defined in: [src/resources/collections.ts:72](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collections.ts#L72)

Updates a collection.

#### Parameters

##### collectionKey

`string`

##### input

[`UpdateCollectionInput`](../interfaces/UpdateCollectionInput.md)

#### Returns

`Promise`\<[`CollectionDetail`](../interfaces/CollectionDetail.md)\>

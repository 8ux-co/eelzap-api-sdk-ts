[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / CollectionFieldsResource

# Class: CollectionFieldsResource

Defined in: [src/resources/collection-fields.ts:14](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-fields.ts#L14)

Collection field management endpoints.

## Methods

### create()

> **create**(`collectionKey`, `input`): `Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)\>

Defined in: [src/resources/collection-fields.ts:37](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-fields.ts#L37)

Creates a field in a collection.

#### Parameters

##### collectionKey

`string`

##### input

[`CreateFieldInput`](../interfaces/CreateFieldInput.md)

#### Returns

`Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)\>

***

### delete()

> **delete**(`collectionKey`, `fieldId`): `Promise`\<\{ `success`: `true`; \}\>

Defined in: [src/resources/collection-fields.ts:63](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-fields.ts#L63)

Deletes a field from a collection.

#### Parameters

##### collectionKey

`string`

##### fieldId

`string`

#### Returns

`Promise`\<\{ `success`: `true`; \}\>

***

### list()

> **list**(`collectionKey`): `Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)[]\>

Defined in: [src/resources/collection-fields.ts:27](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-fields.ts#L27)

Lists all fields in a collection.

#### Parameters

##### collectionKey

`string`

#### Returns

`Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)[]\>

***

### reorder()

> **reorder**(`collectionKey`, `fieldIds`): `Promise`\<\{ `success`: `true`; \}\>

Defined in: [src/resources/collection-fields.ts:72](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-fields.ts#L72)

Reorders collection fields.

#### Parameters

##### collectionKey

`string`

##### fieldIds

`string`[]

#### Returns

`Promise`\<\{ `success`: `true`; \}\>

***

### update()

> **update**(`collectionKey`, `fieldId`, `input`): `Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)\>

Defined in: [src/resources/collection-fields.ts:48](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-fields.ts#L48)

Updates a field in a collection.

#### Parameters

##### collectionKey

`string`

##### fieldId

`string`

##### input

[`UpdateFieldInput`](../interfaces/UpdateFieldInput.md)

#### Returns

`Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)\>

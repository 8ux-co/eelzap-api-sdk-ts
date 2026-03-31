[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / DocumentFieldsResource

# Class: DocumentFieldsResource

Defined in: [src/resources/document-fields.ts:14](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-fields.ts#L14)

Document field management endpoints.

## Methods

### create()

> **create**(`documentKey`, `input`): `Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)\>

Defined in: [src/resources/document-fields.ts:47](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-fields.ts#L47)

Creates a field in a document.

#### Parameters

##### documentKey

`string`

##### input

[`CreateFieldInput`](../interfaces/CreateFieldInput.md)

#### Returns

`Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)\>

***

### delete()

> **delete**(`documentKey`, `fieldId`): `Promise`\<\{ `success`: `true`; \}\>

Defined in: [src/resources/document-fields.ts:73](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-fields.ts#L73)

Deletes a field from a document.

#### Parameters

##### documentKey

`string`

##### fieldId

`string`

#### Returns

`Promise`\<\{ `success`: `true`; \}\>

***

### get()

> **get**(`documentKey`, `fieldId`): `Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)\>

Defined in: [src/resources/document-fields.ts:37](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-fields.ts#L37)

Gets a single field in a document.

#### Parameters

##### documentKey

`string`

##### fieldId

`string`

#### Returns

`Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)\>

***

### list()

> **list**(`documentKey`): `Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)[]\>

Defined in: [src/resources/document-fields.ts:27](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-fields.ts#L27)

Lists all fields in a document.

#### Parameters

##### documentKey

`string`

#### Returns

`Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)[]\>

***

### reorder()

> **reorder**(`documentKey`, `fieldIds`): `Promise`\<\{ `success`: `true`; \}\>

Defined in: [src/resources/document-fields.ts:82](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-fields.ts#L82)

Reorders document fields.

#### Parameters

##### documentKey

`string`

##### fieldIds

`string`[]

#### Returns

`Promise`\<\{ `success`: `true`; \}\>

***

### update()

> **update**(`documentKey`, `fieldId`, `input`): `Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)\>

Defined in: [src/resources/document-fields.ts:58](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-fields.ts#L58)

Updates a field in a document.

#### Parameters

##### documentKey

`string`

##### fieldId

`string`

##### input

[`UpdateFieldInput`](../interfaces/UpdateFieldInput.md)

#### Returns

`Promise`\<[`FieldInfo`](../interfaces/FieldInfo.md)\>

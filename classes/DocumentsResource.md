[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / DocumentsResource

# Class: DocumentsResource

Defined in: [src/resources/documents.ts:23](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L23)

Read-only document endpoints.

## Properties

### fields

> `readonly` **fields**: [`DocumentFieldsResource`](DocumentFieldsResource.md)

Defined in: [src/resources/documents.ts:24](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L24)

***

### sections

> `readonly` **sections**: [`DocumentSectionsResource`](DocumentSectionsResource.md)

Defined in: [src/resources/documents.ts:25](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L25)

***

### seo

> `readonly` **seo**: [`DocumentSeoResource`](DocumentSeoResource.md)

Defined in: [src/resources/documents.ts:27](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L27)

***

### values

> `readonly` **values**: [`DocumentValuesResource`](DocumentValuesResource.md)

Defined in: [src/resources/documents.ts:26](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L26)

## Methods

### create()

> **create**\<`TContent`\>(`input`): `Promise`\<[`DocumentDetail`](../interfaces/DocumentDetail.md)\<`TContent`\>\>

Defined in: [src/resources/documents.ts:78](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L78)

Creates a document.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Parameters

##### input

[`CreateDocumentInput`](../interfaces/CreateDocumentInput.md)

#### Returns

`Promise`\<[`DocumentDetail`](../interfaces/DocumentDetail.md)\<`TContent`\>\>

***

### delete()

> **delete**(`documentKey`, `options?`): `Promise`\<\{ `success`: `true`; \}\>

Defined in: [src/resources/documents.ts:105](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L105)

Deletes a document.

#### Parameters

##### documentKey

`string`

##### options?

[`DeleteOptions`](../interfaces/DeleteOptions.md)

#### Returns

`Promise`\<\{ `success`: `true`; \}\>

***

### get()

> **get**\<`TContent`\>(`documentKey`, `options?`): `Promise`\<[`DocumentDetail`](../interfaces/DocumentDetail.md)\<`TContent`\>\>

Defined in: [src/resources/documents.ts:60](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L60)

Retrieves a single document by key.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Parameters

##### documentKey

`string`

##### options?

[`CommonRequestOptions`](../interfaces/CommonRequestOptions.md)

#### Returns

`Promise`\<[`DocumentDetail`](../interfaces/DocumentDetail.md)\<`TContent`\>\>

***

### list()

> **list**(`options?`): `Promise`\<[`DocumentListResponse`](../interfaces/DocumentListResponse.md)\>

Defined in: [src/resources/documents.ts:46](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L46)

Lists all documents available to the current API key.

#### Parameters

##### options?

[`DocumentListOptions`](../type-aliases/DocumentListOptions.md)

#### Returns

`Promise`\<[`DocumentListResponse`](../interfaces/DocumentListResponse.md)\>

***

### publish()

> **publish**\<`TContent`\>(`documentKey`): `Promise`\<[`DocumentDetail`](../interfaces/DocumentDetail.md)\<`TContent`\>\>

Defined in: [src/resources/documents.ts:115](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L115)

Publishes a document.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Parameters

##### documentKey

`string`

#### Returns

`Promise`\<[`DocumentDetail`](../interfaces/DocumentDetail.md)\<`TContent`\>\>

***

### unpublish()

> **unpublish**\<`TContent`\>(`documentKey`): `Promise`\<[`DocumentDetail`](../interfaces/DocumentDetail.md)\<`TContent`\>\>

Defined in: [src/resources/documents.ts:127](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L127)

Unpublishes a document.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Parameters

##### documentKey

`string`

#### Returns

`Promise`\<[`DocumentDetail`](../interfaces/DocumentDetail.md)\<`TContent`\>\>

***

### update()

> **update**\<`TContent`\>(`documentKey`, `input`): `Promise`\<[`DocumentDetail`](../interfaces/DocumentDetail.md)\<`TContent`\>\>

Defined in: [src/resources/documents.ts:91](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/documents.ts#L91)

Updates a document.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Parameters

##### documentKey

`string`

##### input

[`UpdateDocumentInput`](../interfaces/UpdateDocumentInput.md)

#### Returns

`Promise`\<[`DocumentDetail`](../interfaces/DocumentDetail.md)\<`TContent`\>\>

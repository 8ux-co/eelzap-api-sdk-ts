[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / CollectionSectionsResource

# Class: CollectionSectionsResource

Defined in: [src/resources/collection-sections.ts:13](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-sections.ts#L13)

Collection section management endpoints.

## Methods

### create()

> **create**(`collectionKey`, `input`): `Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

Defined in: [src/resources/collection-sections.ts:46](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-sections.ts#L46)

Creates a section in a collection.

#### Parameters

##### collectionKey

`string`

##### input

[`CreateSectionInput`](../interfaces/CreateSectionInput.md)

#### Returns

`Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

***

### delete()

> **delete**(`collectionKey`, `sectionId`): `Promise`\<\{ `success`: `true`; \}\>

Defined in: [src/resources/collection-sections.ts:72](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-sections.ts#L72)

Deletes a section from a collection.

#### Parameters

##### collectionKey

`string`

##### sectionId

`string`

#### Returns

`Promise`\<\{ `success`: `true`; \}\>

***

### get()

> **get**(`collectionKey`, `sectionId`): `Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

Defined in: [src/resources/collection-sections.ts:36](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-sections.ts#L36)

Gets a single section from a collection.

#### Parameters

##### collectionKey

`string`

##### sectionId

`string`

#### Returns

`Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

***

### list()

> **list**(`collectionKey`): `Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)[]\>

Defined in: [src/resources/collection-sections.ts:26](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-sections.ts#L26)

Lists all sections in a collection.

#### Parameters

##### collectionKey

`string`

#### Returns

`Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)[]\>

***

### update()

> **update**(`collectionKey`, `sectionId`, `input`): `Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

Defined in: [src/resources/collection-sections.ts:57](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/collection-sections.ts#L57)

Updates a section in a collection.

#### Parameters

##### collectionKey

`string`

##### sectionId

`string`

##### input

[`UpdateSectionInput`](../interfaces/UpdateSectionInput.md)

#### Returns

`Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

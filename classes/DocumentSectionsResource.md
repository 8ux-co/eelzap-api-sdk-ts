[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / DocumentSectionsResource

# Class: DocumentSectionsResource

Defined in: [src/resources/document-sections.ts:9](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/b3ce6a4200b34b1ce8043b5c04366219aacd3c44/src/resources/document-sections.ts#L9)

Document section management endpoints.

## Methods

### create()

> **create**(`documentKey`, `input`): `Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

Defined in: [src/resources/document-sections.ts:42](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/b3ce6a4200b34b1ce8043b5c04366219aacd3c44/src/resources/document-sections.ts#L42)

Creates a section in a document.

#### Parameters

##### documentKey

`string`

##### input

[`CreateSectionInput`](../interfaces/CreateSectionInput.md)

#### Returns

`Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

***

### delete()

> **delete**(`documentKey`, `sectionId`): `Promise`\<\{ `success`: `true`; \}\>

Defined in: [src/resources/document-sections.ts:68](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/b3ce6a4200b34b1ce8043b5c04366219aacd3c44/src/resources/document-sections.ts#L68)

Deletes a section from a document.

#### Parameters

##### documentKey

`string`

##### sectionId

`string`

#### Returns

`Promise`\<\{ `success`: `true`; \}\>

***

### get()

> **get**(`documentKey`, `sectionId`): `Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

Defined in: [src/resources/document-sections.ts:32](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/b3ce6a4200b34b1ce8043b5c04366219aacd3c44/src/resources/document-sections.ts#L32)

Gets a single section from a document.

#### Parameters

##### documentKey

`string`

##### sectionId

`string`

#### Returns

`Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

***

### list()

> **list**(`documentKey`): `Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)[]\>

Defined in: [src/resources/document-sections.ts:22](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/b3ce6a4200b34b1ce8043b5c04366219aacd3c44/src/resources/document-sections.ts#L22)

Lists all sections in a document.

#### Parameters

##### documentKey

`string`

#### Returns

`Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)[]\>

***

### update()

> **update**(`documentKey`, `sectionId`, `input`): `Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

Defined in: [src/resources/document-sections.ts:53](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/b3ce6a4200b34b1ce8043b5c04366219aacd3c44/src/resources/document-sections.ts#L53)

Updates a section in a document.

#### Parameters

##### documentKey

`string`

##### sectionId

`string`

##### input

[`UpdateSectionInput`](../interfaces/UpdateSectionInput.md)

#### Returns

`Promise`\<[`SectionInfo`](../interfaces/SectionInfo.md)\>

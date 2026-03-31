[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / DocumentVersionsResource

# Class: DocumentVersionsResource

Defined in: [src/resources/document-versions.ts:14](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-versions.ts#L14)

Manages version history, drafts, and rollbacks for documents.

## Methods

### createDraft()

> **createDraft**(`documentKey`, `input?`): `Promise`\<[`VersionSummary`](../interfaces/VersionSummary.md)\>

Defined in: [src/resources/document-versions.ts:44](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-versions.ts#L44)

Creates a new draft version from the current published version.

#### Parameters

##### documentKey

`string`

##### input?

[`CreateDraftInput`](../interfaces/CreateDraftInput.md)

#### Returns

`Promise`\<[`VersionSummary`](../interfaces/VersionSummary.md)\>

***

### discardDraft()

> **discardDraft**(`documentKey`): `Promise`\<`void`\>

Defined in: [src/resources/document-versions.ts:66](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-versions.ts#L66)

Discards the current draft version.

#### Parameters

##### documentKey

`string`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`documentKey`, `versionId`): `Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

Defined in: [src/resources/document-versions.ts:34](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-versions.ts#L34)

Gets a specific version by ID.

#### Parameters

##### documentKey

`string`

##### versionId

`string`

#### Returns

`Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

***

### list()

> **list**(`documentKey`): `Promise`\<[`VersionListResponse`](../interfaces/VersionListResponse.md)\>

Defined in: [src/resources/document-versions.ts:25](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-versions.ts#L25)

Lists all versions for a document.

#### Parameters

##### documentKey

`string`

#### Returns

`Promise`\<[`VersionListResponse`](../interfaces/VersionListResponse.md)\>

***

### publishDraft()

> **publishDraft**(`documentKey`): `Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

Defined in: [src/resources/document-versions.ts:75](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-versions.ts#L75)

Publishes the current draft version.

#### Parameters

##### documentKey

`string`

#### Returns

`Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

***

### rollback()

> **rollback**(`documentKey`, `versionId`): `Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

Defined in: [src/resources/document-versions.ts:85](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-versions.ts#L85)

Creates a new draft from a historical version (non-destructive rollback).

#### Parameters

##### documentKey

`string`

##### versionId

`string`

#### Returns

`Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

***

### updateDraft()

> **updateDraft**(`documentKey`, `input`): `Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

Defined in: [src/resources/document-versions.ts:55](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-versions.ts#L55)

Updates the current draft version with new field values.

#### Parameters

##### documentKey

`string`

##### input

[`UpdateDocumentDraftInput`](../interfaces/UpdateDocumentDraftInput.md)

#### Returns

`Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

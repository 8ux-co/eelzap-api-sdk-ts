[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / ItemVersionsResource

# Class: ItemVersionsResource

Defined in: [src/resources/item-versions.ts:14](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/item-versions.ts#L14)

Manages version history, drafts, and rollbacks for collection items.

## Methods

### createDraft()

> **createDraft**(`collectionKey`, `slug`, `input?`): `Promise`\<[`VersionSummary`](../interfaces/VersionSummary.md)\>

Defined in: [src/resources/item-versions.ts:44](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/item-versions.ts#L44)

Creates a new draft version from the current published version.

#### Parameters

##### collectionKey

`string`

##### slug

`string`

##### input?

[`CreateDraftInput`](../interfaces/CreateDraftInput.md)

#### Returns

`Promise`\<[`VersionSummary`](../interfaces/VersionSummary.md)\>

***

### discardDraft()

> **discardDraft**(`collectionKey`, `slug`): `Promise`\<`void`\>

Defined in: [src/resources/item-versions.ts:74](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/item-versions.ts#L74)

Discards the current draft version.

#### Parameters

##### collectionKey

`string`

##### slug

`string`

#### Returns

`Promise`\<`void`\>

***

### get()

> **get**(`collectionKey`, `slug`, `versionId`): `Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

Defined in: [src/resources/item-versions.ts:34](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/item-versions.ts#L34)

Gets a specific version by ID.

#### Parameters

##### collectionKey

`string`

##### slug

`string`

##### versionId

`string`

#### Returns

`Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

***

### list()

> **list**(`collectionKey`, `slug`): `Promise`\<[`VersionListResponse`](../interfaces/VersionListResponse.md)\>

Defined in: [src/resources/item-versions.ts:25](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/item-versions.ts#L25)

Lists all versions for an item.

#### Parameters

##### collectionKey

`string`

##### slug

`string`

#### Returns

`Promise`\<[`VersionListResponse`](../interfaces/VersionListResponse.md)\>

***

### publishDraft()

> **publishDraft**(`collectionKey`, `slug`): `Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

Defined in: [src/resources/item-versions.ts:83](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/item-versions.ts#L83)

Publishes the current draft version.

#### Parameters

##### collectionKey

`string`

##### slug

`string`

#### Returns

`Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

***

### rollback()

> **rollback**(`collectionKey`, `slug`, `versionId`): `Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

Defined in: [src/resources/item-versions.ts:101](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/item-versions.ts#L101)

Creates a new draft from a historical version (non-destructive rollback).

#### Parameters

##### collectionKey

`string`

##### slug

`string`

##### versionId

`string`

#### Returns

`Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

***

### updateDraft()

> **updateDraft**(`collectionKey`, `slug`, `input`): `Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

Defined in: [src/resources/item-versions.ts:59](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/item-versions.ts#L59)

Updates the current draft version with new field values.

#### Parameters

##### collectionKey

`string`

##### slug

`string`

##### input

[`UpdateItemDraftInput`](../interfaces/UpdateItemDraftInput.md)

#### Returns

`Promise`\<[`VersionDetail`](../interfaces/VersionDetail.md)\>

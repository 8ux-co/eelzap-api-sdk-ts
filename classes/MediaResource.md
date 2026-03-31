[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / MediaResource

# Class: MediaResource

Defined in: [src/resources/media.ts:51](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/media.ts#L51)

Media management endpoints.

## Methods

### confirmUpload()

> **confirmUpload**(`input`): `Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

Defined in: [src/resources/media.ts:133](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/media.ts#L133)

Confirms a completed upload.

#### Parameters

##### input

[`ConfirmUploadInput`](../interfaces/ConfirmUploadInput.md)

#### Returns

`Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

***

### createUploadUrl()

> **createUploadUrl**(`input`): `Promise`\<[`UploadUrlResponse`](../interfaces/UploadUrlResponse.md)\>

Defined in: [src/resources/media.ts:126](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/media.ts#L126)

Requests a presigned upload URL.

#### Parameters

##### input

[`CreateUploadUrlInput`](../interfaces/CreateUploadUrlInput.md)

#### Returns

`Promise`\<[`UploadUrlResponse`](../interfaces/UploadUrlResponse.md)\>

***

### delete()

> **delete**(`id`): `Promise`\<\{ `success`: `true`; \}\>

Defined in: [src/resources/media.ts:99](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/media.ts#L99)

Deletes media.

#### Parameters

##### id

`string`

#### Returns

`Promise`\<\{ `success`: `true`; \}\>

***

### get()

> **get**(`id`): `Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

Defined in: [src/resources/media.ts:81](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/media.ts#L81)

Gets a single media item.

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

***

### list()

> **list**(`params?`): `Promise`\<[`MediaListResponse`](../interfaces/MediaListResponse.md)\>

Defined in: [src/resources/media.ts:64](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/media.ts#L64)

Lists media for the current site.

#### Parameters

##### params?

[`MediaListParams`](../interfaces/MediaListParams.md)

#### Returns

`Promise`\<[`MediaListResponse`](../interfaces/MediaListResponse.md)\>

***

### publish()

> **publish**(`id`): `Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

Defined in: [src/resources/media.ts:106](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/media.ts#L106)

Publishes media.

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

***

### unpublish()

> **unpublish**(`id`): `Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

Defined in: [src/resources/media.ts:116](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/media.ts#L116)

Unpublishes media.

#### Parameters

##### id

`string`

#### Returns

`Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

***

### update()

> **update**(`id`, `input`): `Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

Defined in: [src/resources/media.ts:88](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/media.ts#L88)

Updates media metadata.

#### Parameters

##### id

`string`

##### input

[`UpdateMediaInput`](../interfaces/UpdateMediaInput.md)

#### Returns

`Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

***

### upload()

> **upload**(`input`): `Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

Defined in: [src/resources/media.ts:144](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/media.ts#L144)

Uploads media using the public presigned URL flow.

#### Parameters

##### input

[`MediaUploadInput`](../interfaces/MediaUploadInput.md)

#### Returns

`Promise`\<[`MediaDetail`](../interfaces/MediaDetail.md)\>

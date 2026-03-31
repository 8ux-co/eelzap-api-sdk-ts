[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / ItemSeoResource

# Class: ItemSeoResource

Defined in: [src/resources/item-seo.ts:9](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/item-seo.ts#L9)

Item SEO management endpoints.

## Methods

### get()

> **get**(`collectionKey`, `slug`, `options?`): `Promise`\<[`ItemSeo`](../type-aliases/ItemSeo.md)\>

Defined in: [src/resources/item-seo.ts:22](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/item-seo.ts#L22)

Gets SEO metadata for an item.

#### Parameters

##### collectionKey

`string`

##### slug

`string`

##### options?

###### locale?

`string`

#### Returns

`Promise`\<[`ItemSeo`](../type-aliases/ItemSeo.md)\>

***

### update()

> **update**(`collectionKey`, `slug`, `input`): `Promise`\<[`ItemSeo`](../type-aliases/ItemSeo.md)\>

Defined in: [src/resources/item-seo.ts:37](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/item-seo.ts#L37)

Updates SEO metadata for an item.

#### Parameters

##### collectionKey

`string`

##### slug

`string`

##### input

[`SeoInput`](../interfaces/SeoInput.md)

#### Returns

`Promise`\<[`ItemSeo`](../type-aliases/ItemSeo.md)\>

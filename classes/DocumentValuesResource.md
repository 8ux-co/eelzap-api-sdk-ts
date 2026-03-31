[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / DocumentValuesResource

# Class: DocumentValuesResource

Defined in: [src/resources/document-values.ts:8](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-values.ts#L8)

Document value management endpoints.

## Methods

### get()

> **get**(`documentKey`): `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [src/resources/document-values.ts:21](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-values.ts#L21)

Gets all document values.

#### Parameters

##### documentKey

`string`

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

***

### update()

> **update**(`documentKey`, `values`, `options?`): `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [src/resources/document-values.ts:31](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/resources/document-values.ts#L31)

Updates document values by field key.

#### Parameters

##### documentKey

`string`

##### values

`Record`\<`string`, `unknown`\>

##### options?

###### locale?

`string`

#### Returns

`Promise`\<`Record`\<`string`, `unknown`\>\>

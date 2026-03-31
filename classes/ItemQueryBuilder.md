[**@8ux-co/eelzap-api-sdk-ts**](../README.md)

***

[@8ux-co/eelzap-api-sdk-ts](../globals.md) / ItemQueryBuilder

# Class: ItemQueryBuilder

Defined in: [src/query-builder.ts:9](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/query-builder.ts#L9)

Lazy fluent query builder for item list requests.

## Methods

### fields()

> **fields**(`fields`): `ItemQueryBuilder`

Defined in: [src/query-builder.ts:66](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/query-builder.ts#L66)

Selects a sparse set of content fields.

#### Parameters

##### fields

`string`[]

#### Returns

`ItemQueryBuilder`

***

### filter()

> **filter**(`field`, `value`): `ItemQueryBuilder`

Defined in: [src/query-builder.ts:47](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/query-builder.ts#L47)

Adds or replaces a field filter.

#### Parameters

##### field

`string`

##### value

[`FilterValue`](../type-aliases/FilterValue.md)

#### Returns

`ItemQueryBuilder`

***

### get()

> **get**\<`TContent`\>(): `Promise`\<[`ItemListResponse`](../interfaces/ItemListResponse.md)\<`TContent`\>\>

Defined in: [src/query-builder.ts:87](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/query-builder.ts#L87)

Executes the built request.

#### Type Parameters

##### TContent

`TContent` = `Record`\<`string`, `unknown`\>

#### Returns

`Promise`\<[`ItemListResponse`](../interfaces/ItemListResponse.md)\<`TContent`\>\>

***

### locale()

> **locale**(`locale`): `ItemQueryBuilder`

Defined in: [src/query-builder.ts:33](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/query-builder.ts#L33)

Overrides the request locale.

#### Parameters

##### locale

`string`

#### Returns

`ItemQueryBuilder`

***

### page()

> **page**(`page`): `ItemQueryBuilder`

Defined in: [src/query-builder.ts:73](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/query-builder.ts#L73)

Sets the current page.

#### Parameters

##### page

`number`

#### Returns

`ItemQueryBuilder`

***

### pageSize()

> **pageSize**(`pageSize`): `ItemQueryBuilder`

Defined in: [src/query-builder.ts:80](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/query-builder.ts#L80)

Sets the page size.

#### Parameters

##### pageSize

`number`

#### Returns

`ItemQueryBuilder`

***

### sort()

> **sort**(`sort`): `ItemQueryBuilder`

Defined in: [src/query-builder.ts:59](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/query-builder.ts#L59)

Sets the sort expression.

#### Parameters

##### sort

`string`

#### Returns

`ItemQueryBuilder`

***

### status()

> **status**(`status`): `ItemQueryBuilder`

Defined in: [src/query-builder.ts:40](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/query-builder.ts#L40)

Overrides the delivery status filter.

#### Parameters

##### status

`NonNullable`\<[`DeliveryStatus`](../type-aliases/DeliveryStatus.md) \| `undefined`\>

#### Returns

`ItemQueryBuilder`

***

### toJSON()

> **toJSON**(): [`ItemListOptions`](../interfaces/ItemListOptions.md)

Defined in: [src/query-builder.ts:95](https://github.com/8ux-co/eelzap-api-sdk-ts/blob/735d27d8f2bd0eda1ee73d9c44850ae2b65a601e/src/query-builder.ts#L95)

Returns the current request options as a plain object.

#### Returns

[`ItemListOptions`](../interfaces/ItemListOptions.md)

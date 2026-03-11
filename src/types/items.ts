import type { CommonRequestOptions, Pagination, QueryPrimitive, Seo, ItemMeta } from './common';
import type { CollectionSummary } from './collections';

/**
 * Operators supported by item filters.
 */
export interface FilterOperatorMap {
  eq?: QueryPrimitive;
  ne?: QueryPrimitive;
  gt?: QueryPrimitive;
  gte?: QueryPrimitive;
  lt?: QueryPrimitive;
  lte?: QueryPrimitive;
  in?: QueryPrimitive[] | string;
  contains?: string;
}

/**
 * Single filter value accepted by the SDK.
 */
export type FilterValue = QueryPrimitive | FilterOperatorMap;

/**
 * Item list filter object keyed by field name.
 */
export type ItemFilters = Record<string, FilterValue>;

/**
 * Options for the item list endpoint.
 */
export interface ItemListOptions extends CommonRequestOptions {
  page?: number;
  pageSize?: number;
  sort?: string;
  filter?: ItemFilters;
}

/**
 * Options for the item detail endpoint.
 */
export type ItemGetOptions = CommonRequestOptions;

/**
 * Single item payload.
 */
export interface ItemDetail<TContent = Record<string, unknown>> {
  slug: string;
  status: string;
  locale: string;
  localizedSlugs: Record<string, string>;
  meta: ItemMeta;
  content: TContent;
  seo: Seo | null;
  collection: { key: string; name: string };
}

/**
 * Item list response payload.
 */
export interface ItemListResponse<TContent = Record<string, unknown>> {
  data: ItemDetail<TContent>[];
  pagination: Pagination;
  collection: CollectionSummary;
}

import { HttpClient } from '../http';
import { ItemQueryBuilder } from '../query-builder';
import type { ClientDefaults } from '../types/common';
import type { ItemDetail, ItemGetOptions, ItemListOptions, ItemListResponse } from '../types/items';
import { mergeRequestOptions, serializeFilters, toArrayParam } from '../utils';

/**
 * Read-only collection item endpoints.
 */
export class ItemsResource {
  readonly #http: HttpClient;
  readonly #defaults: ClientDefaults;

  /**
   * @internal
   */
  constructor(http: HttpClient, defaults: ClientDefaults) {
    this.#http = http;
    this.#defaults = defaults;
  }

  /**
   * Lists items in a collection.
   */
  async list<TContent = Record<string, unknown>>(
    collectionKey: string,
    options?: ItemListOptions,
  ): Promise<ItemListResponse<TContent>> {
    const merged = mergeRequestOptions(this.#defaults, options);

    return this.#http.request<ItemListResponse<TContent>>(
      `api/v1/collections/${collectionKey}/items`,
      {
        params: {
          locale: merged.locale,
          status: merged.status,
          fields: toArrayParam(merged.fields),
          page: merged.page,
          pageSize: merged.pageSize,
          sort: merged.sort,
          ...serializeFilters(merged.filter),
        },
      },
    );
  }

  /**
   * Retrieves a single item by slug.
   */
  async get<TContent = Record<string, unknown>>(
    collectionKey: string,
    slug: string,
    options?: ItemGetOptions,
  ): Promise<ItemDetail<TContent>> {
    const merged = mergeRequestOptions(this.#defaults, options);

    return this.#http.request<ItemDetail<TContent>>(
      `api/v1/collections/${collectionKey}/items/${slug}`,
      {
        params: {
          locale: merged.locale,
          status: merged.status,
          fields: toArrayParam(merged.fields),
        },
      },
    );
  }

  /**
   * Starts a lazy fluent query builder for a collection.
   */
  collection(collectionKey: string): ItemQueryBuilder {
    return new ItemQueryBuilder(this.#http, this.#defaults, collectionKey);
  }
}

import type { CollectionDetail, CollectionListResponse } from '../types/collections';
import type { ClientDefaults, DeliveryStatus } from '../types/common';
import { HttpClient } from '../http';

/**
 * Read-only collection endpoints.
 */
export class CollectionsResource {
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
   * Lists all collections available to the current API key.
   */
  async list(options?: { status?: DeliveryStatus }): Promise<CollectionListResponse> {
    return this.#http.request<CollectionListResponse>('api/v1/collections', {
      params: {
        status: options?.status ?? this.#defaults.status,
      },
    });
  }

  /**
   * Retrieves the schema for a single collection.
   */
  async get(
    collectionKey: string,
    options?: { status?: DeliveryStatus },
  ): Promise<CollectionDetail> {
    return this.#http.request<CollectionDetail>(`api/v1/collections/${collectionKey}`, {
      params: {
        status: options?.status ?? this.#defaults.status,
      },
    });
  }
}

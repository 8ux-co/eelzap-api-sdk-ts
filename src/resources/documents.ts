import { HttpClient } from '../http';
import type { ClientDefaults } from '../types/common';
import type {
  DocumentDetail,
  DocumentGetOptions,
  DocumentListOptions,
  DocumentListResponse,
} from '../types/documents';
import { mergeRequestOptions, toArrayParam } from '../utils';

/**
 * Read-only document endpoints.
 */
export class DocumentsResource {
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
   * Lists all documents available to the current API key.
   */
  async list(options?: DocumentListOptions): Promise<DocumentListResponse> {
    const merged = mergeRequestOptions(this.#defaults, options);

    return this.#http.request<DocumentListResponse>('api/v1/documents', {
      params: {
        locale: merged.locale,
        status: merged.status,
      },
    });
  }

  /**
   * Retrieves a single document by key.
   */
  async get<TContent = Record<string, unknown>>(
    documentKey: string,
    options?: DocumentGetOptions,
  ): Promise<DocumentDetail<TContent>> {
    const merged = mergeRequestOptions(this.#defaults, options);

    return this.#http.request<DocumentDetail<TContent>>(`api/v1/documents/${documentKey}`, {
      params: {
        locale: merged.locale,
        status: merged.status,
        fields: toArrayParam(merged.fields),
      },
    });
  }
}

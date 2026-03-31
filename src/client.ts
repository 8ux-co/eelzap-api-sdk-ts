import { HttpClient } from './http';
import { CollectionsResource } from './resources/collections';
import { DocumentVersionsResource } from './resources/document-versions';
import { DocumentsResource } from './resources/documents';
import { ItemVersionsResource } from './resources/item-versions';
import { ItemsResource } from './resources/items';
import { MediaResource } from './resources/media';
import { SiteResource } from './resources/site';
import type { ClientDefaults, DeliveryStatus } from './types/common';
import { maskApiKey, normalizeBaseUrl } from './utils';

export interface ClientConfig {
  apiKey: string;
  baseUrl?: string;
  pathPrefix?: string;
  locale?: string;
  status?: DeliveryStatus;
  fetch?: typeof globalThis.fetch;
  defaultHeaders?: HeadersInit;
  timeout?: number;
}

/**
 * Main SDK client for the EelZap Content Delivery API.
 */
export class EelZapClient {
  readonly site: SiteResource;
  readonly collections: CollectionsResource;
  readonly items: ItemsResource;
  readonly documents: DocumentsResource;
  readonly media: MediaResource;
  readonly itemVersions: ItemVersionsResource;
  readonly documentVersions: DocumentVersionsResource;
  readonly #http: HttpClient;
  readonly #defaults: ClientDefaults;
  readonly #config: Required<Pick<ClientConfig, 'apiKey' | 'baseUrl' | 'pathPrefix' | 'timeout'>> &
    Pick<ClientConfig, 'defaultHeaders'>;

  constructor(config: ClientConfig) {
    if (!config.apiKey.trim()) {
      throw new TypeError('apiKey is required.');
    }

    const fetchImpl = config.fetch ?? globalThis.fetch;
    if (typeof fetchImpl !== 'function') {
      throw new TypeError('A fetch implementation is required.');
    }

    this.#defaults = {
      locale: config.locale,
      status: config.status,
    };

    this.#config = {
      apiKey: config.apiKey,
      baseUrl: normalizeBaseUrl(config.baseUrl ?? 'https://api.eelzap.com'),
      pathPrefix: config.pathPrefix ?? '/v1',
      defaultHeaders: config.defaultHeaders,
      timeout: config.timeout ?? 30_000,
    };

    this.#http = new HttpClient({
      apiKey: this.#config.apiKey,
      baseUrl: this.#config.baseUrl,
      pathPrefix: this.#config.pathPrefix,
      fetch: fetchImpl,
      defaultHeaders: this.#config.defaultHeaders,
      timeout: this.#config.timeout,
    });

    this.site = new SiteResource(this.#http);
    this.collections = new CollectionsResource(this.#http, this.#defaults);
    this.items = new ItemsResource(this.#http, this.#defaults);
    this.documents = new DocumentsResource(this.#http, this.#defaults);
    this.media = new MediaResource(this.#http);
    this.itemVersions = new ItemVersionsResource(this.#http);
    this.documentVersions = new DocumentVersionsResource(this.#http);
  }

  /**
   * Returns a masked string representation safe for logs.
   */
  toString(): string {
    return `EelZapClient(baseUrl=${this.#config.baseUrl}, pathPrefix=${this.#config.pathPrefix}, apiKey=${maskApiKey(this.#config.apiKey)})`;
  }
}

/**
 * Creates a configured EelZap Delivery SDK client.
 */
export function createClient(config: ClientConfig): EelZapClient {
  return new EelZapClient(config);
}

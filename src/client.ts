import { HttpClient } from './http';
import { CollectionsResource } from './resources/collections';
import { DocumentsResource } from './resources/documents';
import { ItemsResource } from './resources/items';
import type { ClientDefaults, DeliveryStatus } from './types/common';
import { maskApiKey, normalizeBaseUrl } from './utils';

export interface ClientConfig {
  apiKey: string;
  baseUrl?: string;
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
  readonly collections: CollectionsResource;
  readonly items: ItemsResource;
  readonly documents: DocumentsResource;
  readonly #http: HttpClient;
  readonly #defaults: ClientDefaults;
  readonly #config: Required<Pick<ClientConfig, 'apiKey' | 'baseUrl' | 'timeout'>> &
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
      defaultHeaders: config.defaultHeaders,
      timeout: config.timeout ?? 30_000,
    };

    this.#http = new HttpClient({
      apiKey: this.#config.apiKey,
      baseUrl: this.#config.baseUrl,
      fetch: fetchImpl,
      defaultHeaders: this.#config.defaultHeaders,
      timeout: this.#config.timeout,
    });

    this.collections = new CollectionsResource(this.#http, this.#defaults);
    this.items = new ItemsResource(this.#http, this.#defaults);
    this.documents = new DocumentsResource(this.#http, this.#defaults);
  }

  /**
   * Returns a masked string representation safe for logs.
   */
  toString(): string {
    return `EelZapClient(baseUrl=${this.#config.baseUrl}, apiKey=${maskApiKey(this.#config.apiKey)})`;
  }
}

/**
 * Creates a configured EelZap Delivery SDK client.
 */
export function createClient(config: ClientConfig): EelZapClient {
  return new EelZapClient(config);
}

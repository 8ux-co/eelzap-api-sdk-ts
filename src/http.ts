import { EelZapError, EelZapNetworkError } from './errors';
import { cleanParams } from './utils';
import type { ApiErrorPayload, QueryPrimitive } from './types/common';

export interface HttpClientConfig {
  apiKey: string;
  baseUrl: string;
  fetch: typeof globalThis.fetch;
  defaultHeaders?: HeadersInit;
  timeout: number;
}

export interface HttpRequestOptions {
  params?: Record<string, QueryPrimitive | undefined>;
}

/**
 * Minimal fetch-based HTTP client for the delivery API.
 *
 * @internal
 */
export class HttpClient {
  readonly #config: HttpClientConfig;

  constructor(config: HttpClientConfig) {
    this.#config = config;
  }

  async request<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    const url = new URL(path.replace(/^\//, ''), this.#config.baseUrl);
    for (const [key, value] of Object.entries(cleanParams(options?.params ?? {}))) {
      url.searchParams.set(key, value);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, this.#config.timeout);
    const headers = new Headers(this.#config.defaultHeaders);
    headers.set('Authorization', `Bearer ${this.#config.apiKey}`);
    headers.set('Content-Type', 'application/json');

    try {
      const response = await this.#config.fetch(url.toString(), {
        headers,
        signal: controller.signal,
      });

      if (response.status === 304) {
        return undefined as T;
      }

      if (!response.ok) {
        throw await this.toEelZapError(response);
      }

      return (await response.json()) as T;
    } catch (error) {
      if (error instanceof EelZapError) {
        throw error;
      }

      throw new EelZapNetworkError(
        error,
        error instanceof Error ? error.message : 'Network request failed.',
      );
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async toEelZapError(response: Response): Promise<EelZapError> {
    const contentType = response.headers.get('Content-Type') ?? '';

    if (contentType.includes('application/json')) {
      const payload = (await response.json()) as Partial<ApiErrorPayload>;
      const code = payload.error?.code ?? 'INTERNAL_ERROR';
      const message =
        payload.error?.message ?? `Request failed with status ${String(response.status)}.`;
      const status = payload.error?.status ?? response.status;
      return new EelZapError(code, message, status);
    }

    return new EelZapError(
      'INTERNAL_ERROR',
      `Request failed with status ${String(response.status)}.`,
      response.status,
    );
  }
}

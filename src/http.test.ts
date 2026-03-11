import { describe, expect, it, vi } from 'vitest';

import { EelZapNetworkError } from './errors';
import { HttpClient } from './http';

function createResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(body === null ? null : JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });
}

describe('HttpClient', () => {
  it('sends auth headers and query params', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(createResponse({ ok: true }));
    const client = new HttpClient({
      apiKey: 'cms_secret_1234',
      baseUrl: 'https://api.eelzap.com/',
      fetch: fetchMock,
      defaultHeaders: {
        'X-Test': '1',
      },
      timeout: 1_000,
    });

    await client.request('api/v1/collections', {
      params: {
        status: 'published',
        page: 2,
      },
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    const headers = Object.fromEntries(new Headers(init.headers).entries());
    expect(url).toBe('https://api.eelzap.com/api/v1/collections?status=published&page=2');
    expect(headers).toMatchObject({
      authorization: 'Bearer cms_secret_1234',
      'content-type': 'application/json',
      'x-test': '1',
    });
  });

  it('throws EelZapError for JSON API errors', async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(
      createResponse(
        {
          error: {
            code: 'NOT_FOUND',
            message: 'Missing.',
            status: 404,
          },
        },
        { status: 404 },
      ),
    );
    const client = new HttpClient({
      apiKey: 'cms_secret_1234',
      baseUrl: 'https://api.eelzap.com/',
      fetch: fetchMock,
      timeout: 1_000,
    });

    await expect(client.request('api/v1/documents/homepage')).rejects.toMatchObject({
      code: 'NOT_FOUND',
      message: 'Missing.',
      status: 404,
    });
  });

  it('wraps transport failures as network errors', async () => {
    const fetchMock = vi.fn().mockRejectedValueOnce(new Error('socket closed'));
    const client = new HttpClient({
      apiKey: 'cms_secret_1234',
      baseUrl: 'https://api.eelzap.com/',
      fetch: fetchMock,
      timeout: 1_000,
    });

    await expect(client.request('api/v1/collections')).rejects.toBeInstanceOf(EelZapNetworkError);
  });

  it('returns undefined for 304 responses and falls back for non-json errors', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(null, {
          status: 304,
        }),
      )
      .mockResolvedValueOnce(
        new Response('server error', {
          status: 500,
          headers: {
            'Content-Type': 'text/plain',
          },
        }),
      );
    const client = new HttpClient({
      apiKey: 'cms_secret_1234',
      baseUrl: 'https://api.eelzap.com/',
      fetch: fetchMock,
      timeout: 1_000,
    });

    await expect(client.request('api/v1/collections')).resolves.toBeUndefined();
    await expect(client.request('api/v1/collections')).rejects.toMatchObject({
      code: 'INTERNAL_ERROR',
      status: 500,
      message: 'Request failed with status 500.',
    });
  });

  it('supports requests without params and falls back when the json error payload is malformed', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(createResponse({ data: [] }))
      .mockResolvedValueOnce(
        createResponse(
          {},
          {
            status: 502,
          },
        ),
      );
    const client = new HttpClient({
      apiKey: 'cms_secret_1234',
      baseUrl: 'https://api.eelzap.com/',
      fetch: fetchMock,
      timeout: 1_000,
    });

    await expect(client.request('api/v1/collections')).resolves.toEqual({ data: [] });
    await expect(client.request('api/v1/collections')).rejects.toMatchObject({
      code: 'INTERNAL_ERROR',
      status: 502,
      message: 'Request failed with status 502.',
    });
  });

  it('aborts timed out requests', async () => {
    vi.useFakeTimers();

    const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          reject(new Error('aborted'));
        });
      });
    });
    const client = new HttpClient({
      apiKey: 'cms_secret_1234',
      baseUrl: 'https://api.eelzap.com/',
      fetch: fetchMock as typeof fetch,
      timeout: 50,
    });

    const request = client.request('api/v1/collections');
    const assertion = expect(request).rejects.toMatchObject({
      code: 'NETWORK_ERROR',
      status: 0,
      message: 'aborted',
    });
    await vi.advanceTimersByTimeAsync(50);
    await assertion;

    vi.useRealTimers();
  });

  it('handles non-error thrown values and missing content-type headers', async () => {
    const fetchMock = vi
      .fn()
      .mockImplementationOnce(
        () =>
          ({
            then(_resolve: unknown, reject: ((reason?: unknown) => void) | undefined) {
              reject?.();
            },
          }) as Promise<Response>,
      )
      .mockResolvedValueOnce(
        new Response(null, {
          status: 503,
        }),
      );
    const client = new HttpClient({
      apiKey: 'cms_secret_1234',
      baseUrl: 'https://api.eelzap.com/',
      fetch: fetchMock,
      timeout: 1_000,
    });

    await expect(client.request('api/v1/collections')).rejects.toMatchObject({
      code: 'NETWORK_ERROR',
      status: 0,
      message: 'Network request failed.',
    });
    await expect(client.request('api/v1/collections')).rejects.toMatchObject({
      code: 'INTERNAL_ERROR',
      status: 503,
      message: 'Request failed with status 503.',
    });
  });
});

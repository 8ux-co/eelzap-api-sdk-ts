import { describe, expect, it, vi } from 'vitest';

import { EelZapClient, createClient } from './client';

describe('EelZapClient', () => {
  it('creates a client through the factory', () => {
    const client = createClient({
      apiKey: 'cms_secret_12345678',
      fetch: vi.fn(),
    });

    expect(client).toBeInstanceOf(EelZapClient);
    expect(client.collections).toBeDefined();
    expect(client.items).toBeDefined();
    expect(client.documents).toBeDefined();
  });

  it('masks the API key in string output', () => {
    const client = new EelZapClient({
      apiKey: 'cms_secret_12345678',
      baseUrl: 'https://api.eelzap.com',
      fetch: vi.fn(),
    });

    expect(client.toString()).toContain('cms_...5678');
    expect(client.toString()).not.toContain('cms_secret_12345678');
  });

  it('requires an API key', () => {
    expect(
      () =>
        new EelZapClient({
          apiKey: '',
          fetch: vi.fn(),
        }),
    ).toThrow('apiKey is required.');
  });

  it('requires a fetch implementation when none is available globally', () => {
    const originalFetch = globalThis.fetch;
    vi.stubGlobal('fetch', undefined);

    try {
      expect(
        () =>
          new EelZapClient({
            apiKey: 'cms_secret_12345678',
          }),
      ).toThrow('A fetch implementation is required.');
    } finally {
      vi.stubGlobal('fetch', originalFetch);
    }
  });
});

import { describe, expect, it, vi } from 'vitest';

import * as sdk from './index';

describe('index exports', () => {
  it('re-exports the public api surface', () => {
    expect(sdk.createClient).toBeTypeOf('function');
    expect(sdk.EelZapClient).toBeTypeOf('function');
    expect(sdk.EelZapError).toBeTypeOf('function');
    expect(sdk.EelZapNetworkError).toBeTypeOf('function');
    expect(sdk.ItemQueryBuilder).toBeTypeOf('function');
    expect(sdk.CollectionsResource).toBeTypeOf('function');
    expect(sdk.ItemsResource).toBeTypeOf('function');
    expect(sdk.DocumentsResource).toBeTypeOf('function');
  });

  it('creates a client from the barrel export', () => {
    const client = sdk.createClient({
      apiKey: 'cms_secret_12345678',
      fetch: vi.fn(),
    });

    expect(client).toBeInstanceOf(sdk.EelZapClient);
  });
});

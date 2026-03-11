import { describe, expect, it, vi } from 'vitest';

import { CollectionsResource } from './collections';
import type { HttpClient } from '../http';

describe('CollectionsResource', () => {
  it('lists collections with merged defaults', async () => {
    const request = vi.fn().mockResolvedValue({ data: [] });
    const http = { request } as unknown as HttpClient;
    const resource = new CollectionsResource(http, { status: 'published' });

    await resource.list();

    expect(request).toHaveBeenCalledWith('api/v1/collections', {
      params: {
        status: 'published',
      },
    });
  });

  it('gets a single collection by key', async () => {
    const request = vi.fn().mockResolvedValue({ key: 'blog' });
    const http = { request } as unknown as HttpClient;
    const resource = new CollectionsResource(http, {});

    await resource.get('blog', { status: 'draft' });

    expect(request).toHaveBeenCalledWith('api/v1/collections/blog', {
      params: {
        status: 'draft',
      },
    });
  });

  it('accepts an explicit status override when listing collections', async () => {
    const request = vi.fn().mockResolvedValue({ data: [] });
    const http = { request } as unknown as HttpClient;
    const resource = new CollectionsResource(http, { status: 'published' });

    await resource.list({ status: 'draft' });

    expect(request).toHaveBeenCalledWith('api/v1/collections', {
      params: {
        status: 'draft',
      },
    });
  });

  it('passes through undefined status when no default or override is set', async () => {
    const request = vi.fn().mockResolvedValue({ key: 'blog' });
    const http = { request } as unknown as HttpClient;
    const resource = new CollectionsResource(http, {});

    await resource.get('blog');

    expect(request).toHaveBeenCalledWith('api/v1/collections/blog', {
      params: {
        status: undefined,
      },
    });
  });
});

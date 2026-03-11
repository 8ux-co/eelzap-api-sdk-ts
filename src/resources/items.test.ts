import { describe, expect, it, vi } from 'vitest';

import { ItemsResource } from './items';
import type { HttpClient } from '../http';

describe('ItemsResource', () => {
  it('serializes list params including filters and sparse fields', async () => {
    const request = vi.fn().mockResolvedValue({ data: [] });
    const http = { request } as unknown as HttpClient;
    const resource = new ItemsResource(http, { locale: 'en', status: 'published' });

    await resource.list('products', {
      page: 1,
      pageSize: 20,
      sort: '-price',
      fields: ['title', 'price'],
      filter: {
        category: 'electronics',
        price: { gte: 100, lt: 500 },
        featured: { eq: true },
      },
    });

    expect(request).toHaveBeenCalledWith('api/v1/collections/products/items', {
      params: {
        locale: 'en',
        status: 'published',
        fields: 'title,price',
        page: 1,
        pageSize: 20,
        sort: '-price',
        'filter[category]': 'electronics',
        'filter[price][gte]': '100',
        'filter[price][lt]': '500',
        'filter[featured][eq]': 'true',
      },
    });
  });

  it('gets a single item', async () => {
    const request = vi.fn().mockResolvedValue({ slug: 'hello-world' });
    const http = { request } as unknown as HttpClient;
    const resource = new ItemsResource(http, {});

    await resource.get('blog', 'hello-world', {
      locale: 'es',
      status: 'draft',
      fields: ['title'],
    });

    expect(request).toHaveBeenCalledWith('api/v1/collections/blog/items/hello-world', {
      params: {
        locale: 'es',
        status: 'draft',
        fields: 'title',
      },
    });
  });

  it('creates a fluent collection query builder', () => {
    const request = vi.fn();
    const http = { request } as unknown as HttpClient;
    const resource = new ItemsResource(http, { locale: 'en' });

    const query = resource.collection('products').page(3);

    expect(query.toJSON()).toEqual({ page: 3 });
  });
});

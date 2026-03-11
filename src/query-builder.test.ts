import { describe, expect, it, vi } from 'vitest';

import { ItemQueryBuilder } from './query-builder';
import type { HttpClient } from './http';

describe('ItemQueryBuilder', () => {
  it('is lazy until get is called', async () => {
    const request = vi.fn().mockResolvedValue({ data: [], pagination: {}, collection: {} });
    const http = { request } as unknown as HttpClient;

    const query = new ItemQueryBuilder(http, { locale: 'en' }, 'products')
      .filter('category', 'electronics')
      .sort('-price')
      .fields(['title'])
      .page(2)
      .pageSize(12);

    expect(request).not.toHaveBeenCalled();
    expect(query.toJSON()).toEqual({
      filter: { category: 'electronics' },
      sort: '-price',
      fields: ['title'],
      page: 2,
      pageSize: 12,
    });

    await query.get();

    expect(request).toHaveBeenCalledOnce();
  });

  it('supports locale and status chaining', () => {
    const http = { request: vi.fn() } as never;

    const query = new ItemQueryBuilder(http, {}, 'products').locale('es').status('draft');

    expect(query.toJSON()).toEqual({
      locale: 'es',
      status: 'draft',
    });
  });
});

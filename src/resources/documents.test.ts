import { describe, expect, it, vi } from 'vitest';

import { DocumentsResource } from './documents';
import type { HttpClient } from '../http';

describe('DocumentsResource', () => {
  it('lists documents with locale and status', async () => {
    const request = vi.fn().mockResolvedValue({ data: [] });
    const http = { request } as unknown as HttpClient;
    const resource = new DocumentsResource(http, { locale: 'en', status: 'published' });

    await resource.list();

    expect(request).toHaveBeenCalledWith('api/v1/documents', {
      params: {
        locale: 'en',
        status: 'published',
      },
    });
  });

  it('gets a single document with sparse fields', async () => {
    const request = vi.fn().mockResolvedValue({ key: 'homepage' });
    const http = { request } as unknown as HttpClient;
    const resource = new DocumentsResource(http, {});

    await resource.get('homepage', {
      locale: 'en',
      status: 'draft',
      fields: ['hero_title'],
    });

    expect(request).toHaveBeenCalledWith('api/v1/documents/homepage', {
      params: {
        locale: 'en',
        status: 'draft',
        fields: 'hero_title',
      },
    });
  });
});

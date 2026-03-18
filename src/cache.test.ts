import { describe, expect, it, vi } from 'vitest';

import { MemoryCacheAdapter, cachedFetch } from './cache';

describe('MemoryCacheAdapter', () => {
  it('returns undefined for unknown keys', () => {
    const adapter = new MemoryCacheAdapter();
    expect(adapter.get('missing')).toBeUndefined();
  });

  it('round-trips a value', () => {
    const adapter = new MemoryCacheAdapter();
    adapter.set('k', { title: 'Hello' });
    expect(adapter.get('k')).toEqual({ title: 'Hello' });
  });

  it('reports size', () => {
    const adapter = new MemoryCacheAdapter();
    expect(adapter.size).toBe(0);
    adapter.set('a', 1);
    adapter.set('b', 2);
    expect(adapter.size).toBe(2);
  });

  it('deletes a key', () => {
    const adapter = new MemoryCacheAdapter();
    adapter.set('a', 1);
    expect(adapter.delete('a')).toBe(true);
    expect(adapter.get('a')).toBeUndefined();
  });

  it('clears all entries', () => {
    const adapter = new MemoryCacheAdapter();
    adapter.set('a', 1);
    adapter.set('b', 2);
    adapter.clear();
    expect(adapter.size).toBe(0);
  });
});

describe('cachedFetch', () => {
  it('returns fresh data and caches it', async () => {
    const adapter = new MemoryCacheAdapter();
    const fetcher = vi.fn().mockResolvedValue({ title: 'Fresh' });

    const result = await cachedFetch('doc', fetcher, adapter);

    expect(result).toEqual({ title: 'Fresh' });
    expect(adapter.get('doc')).toEqual({ title: 'Fresh' });
  });

  it('returns cached data when fetcher fails', async () => {
    const adapter = new MemoryCacheAdapter();
    adapter.set('doc', { title: 'Cached' });

    const fetcher = vi.fn().mockRejectedValue(new Error('Network down'));

    const result = await cachedFetch('doc', fetcher, adapter);

    expect(result).toEqual({ title: 'Cached' });
  });

  it('throws when fetcher fails and cache is empty', async () => {
    const adapter = new MemoryCacheAdapter();
    const fetcher = vi.fn().mockRejectedValue(new Error('Network down'));

    await expect(cachedFetch('doc', fetcher, adapter)).rejects.toThrow('Network down');
  });

  it('updates the cache on every successful fetch', async () => {
    const adapter = new MemoryCacheAdapter();

    await cachedFetch('doc', () => Promise.resolve({ v: 1 }), adapter);
    await cachedFetch('doc', () => Promise.resolve({ v: 2 }), adapter);

    expect(adapter.get('doc')).toEqual({ v: 2 });
  });

  it('works with async cache adapters', async () => {
    const store = new Map<string, unknown>();
    const asyncAdapter = {
      get: (key: string) => Promise.resolve(store.get(key)),
      set: (key: string, value: unknown) => {
        store.set(key, value);
        return Promise.resolve();
      },
    };

    await cachedFetch('key', () => Promise.resolve('value'), asyncAdapter);
    const result = await cachedFetch('key', () => Promise.reject(new Error('fail')), asyncAdapter);

    expect(result).toBe('value');
  });
});

import { describe, expect, it } from 'vitest';

import { renderDocComment, renderHeader, renderNamedTypeExports } from './templates';

describe('templates', () => {
  it('renders headers and doc comments', () => {
    expect(renderHeader('/* generated */')).toBe('/* generated */\n');
    expect(renderDocComment(['Hello', '', 'World'])).toBe('/**\n * Hello\n * \n * World\n */');
  });

  it('returns empty output when there is nothing to render', () => {
    expect(renderDocComment([])).toBe('');
    expect(renderNamedTypeExports([], './empty')).toBe('');
  });

  it('renders named exports', () => {
    expect(renderNamedTypeExports(['Foo', 'Bar'], './types')).toBe(
      'export type { Foo, Bar } from "./types";',
    );
  });
});

import { describe, expect, it } from 'vitest';

import type { FieldInfo, FieldType } from '../types/collections';
import { mapFieldBaseType, mapFieldToTypeScript } from './type-mapper';

function createField(type: FieldType, overrides: Partial<FieldInfo> = {}): FieldInfo {
  return {
    key: 'field',
    label: 'Field',
    type,
    isLocalized: false,
    ...overrides,
  };
}

describe('mapFieldBaseType', () => {
  it.each([
    ['SHORT_TEXT', 'string'],
    ['LONG_TEXT', 'string'],
    ['RICH_TEXT', 'string'],
    ['NUMBER', 'number'],
    ['INTEGER', 'number'],
    ['BOOLEAN', 'boolean'],
    ['DATE', 'string'],
    ['DATETIME', 'string'],
    ['CURRENCY', 'CurrencyValue'],
    ['GALLERY', 'GalleryItemValue[]'],
    ['IMAGE', 'MediaValue'],
    ['VIDEO', 'MediaValue'],
    ['FILE', 'MediaValue'],
    ['URL', 'string'],
    ['EMAIL', 'string'],
  ] satisfies Array<[FieldType, string]>)('maps %s to %s', (type, expected) => {
    expect(mapFieldBaseType(createField(type))).toBe(expected);
  });

  it('builds narrowed EnumValue for enum fields with options', () => {
    expect(
      mapFieldBaseType(
        createField('ENUM', {
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
          ],
        }),
      ),
    ).toBe('EnumValue & { value: "draft" | "published" }');
  });

  it('falls back to EnumValue for enums without options', () => {
    expect(mapFieldBaseType(createField('ENUM'))).toBe('EnumValue');
  });

  it('falls back to unknown for unsupported field types', () => {
    expect(mapFieldBaseType(createField('UNSUPPORTED_TYPE' as FieldType))).toBe('unknown');
  });
});

describe('mapFieldToTypeScript', () => {
  it('adds null when the field is optional', () => {
    expect(mapFieldToTypeScript(createField('SHORT_TEXT'))).toBe('string | null');
  });

  it('keeps required fields non-nullable', () => {
    expect(mapFieldToTypeScript(createField('NUMBER', { required: true }))).toBe('number');
  });
});

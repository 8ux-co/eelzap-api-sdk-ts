import type { FieldInfo, FieldType } from '../types/collections';

export const FIELD_TYPE_MAP: Record<Exclude<FieldType, string & {}>, string> = {
  SHORT_TEXT: 'string',
  LONG_TEXT: 'string',
  RICH_TEXT: 'string',
  NUMBER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'string',
  DATETIME: 'string',
  ENUM: 'string',
  MEDIA: 'MediaValue',
  CURRENCY: 'CurrencyValue',
  COLOR: 'string',
  URL: 'string',
  GALLERY: 'GalleryItemValue[]',
};

export function mapFieldToTypeScript(field: FieldInfo): string {
  const baseType = mapFieldBaseType(field);
  return field.required === true ? baseType : `${baseType} | null`;
}

export function mapFieldBaseType(field: FieldInfo): string {
  if (field.type === 'ENUM') {
    return mapEnumFieldType(field);
  }

  if (field.type in FIELD_TYPE_MAP) {
    return FIELD_TYPE_MAP[field.type as keyof typeof FIELD_TYPE_MAP];
  }

  return 'unknown';
}

export function fieldUsesSdkType(field: FieldInfo): field is FieldInfo & {
  type: 'MEDIA' | 'CURRENCY' | 'GALLERY';
} {
  return field.type === 'MEDIA' || field.type === 'CURRENCY' || field.type === 'GALLERY';
}

export function mapEnumFieldType(field: Pick<FieldInfo, 'options'>): string {
  if (!field.options || field.options.length === 0) {
    return 'string';
  }

  return field.options.map((option) => JSON.stringify(option.value)).join(' | ');
}

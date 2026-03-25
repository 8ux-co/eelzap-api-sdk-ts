import type { FieldInfo, FieldType } from '../types/collections';

export const FIELD_TYPE_MAP: Record<FieldType, string> = {
  SHORT_TEXT: 'string',
  LONG_TEXT: 'string',
  RICH_TEXT: 'string',
  NUMBER: 'number',
  INTEGER: 'number',
  BOOLEAN: 'boolean',
  DATE: 'string',
  DATETIME: 'string',
  ENUM: 'EnumValue',
  CURRENCY: 'CurrencyValue',
  GALLERY: 'GalleryItemValue[]',
  IMAGE: 'MediaValue',
  VIDEO: 'MediaValue',
  FILE: 'MediaValue',
  URL: 'string',
  EMAIL: 'string',
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
  type: 'IMAGE' | 'VIDEO' | 'FILE' | 'CURRENCY' | 'GALLERY' | 'ENUM';
} {
  return (
    field.type === 'IMAGE' ||
    field.type === 'VIDEO' ||
    field.type === 'FILE' ||
    field.type === 'CURRENCY' ||
    field.type === 'GALLERY' ||
    field.type === 'ENUM'
  );
}

export function mapEnumFieldType(field: Pick<FieldInfo, 'options'>): string {
  if (!field.options || field.options.length === 0) {
    return 'EnumValue';
  }

  const valueUnion = field.options.map((option) => JSON.stringify(option.value)).join(' | ');
  return `EnumValue & { value: ${valueUnion} }`;
}

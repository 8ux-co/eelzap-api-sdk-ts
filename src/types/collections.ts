import type { EnumValue } from './common';

/**
 * Field types supported by the public management API.
 */
export type FieldType =
  | 'SHORT_TEXT'
  | 'LONG_TEXT'
  | 'RICH_TEXT'
  | 'NUMBER'
  | 'BOOLEAN'
  | 'DATE'
  | 'DATETIME'
  | 'ENUM'
  | 'MEDIA'
  | 'CURRENCY'
  | 'COLOR'
  | 'URL'
  | 'GALLERY'
  | (string & {});

/**
 * Enum option payload for field creation and updates.
 */
export interface FieldOptionInput {
  label: string;
  value: string;
  color?: string | null;
}

/**
 * Shared field constraints returned by the management API.
 */
export interface FieldConstraints {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  regex?: string;
  currencies?: string[];
  [key: string]: unknown;
}

/**
 * Collection field schema information.
 */
export interface FieldInfo {
  id?: string;
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  isLocalized: boolean;
  isSortable?: boolean;
  isFilterable?: boolean;
  isUnique?: boolean;
  description?: string | null;
  defaultValue?: string | null;
  sectionId?: string | null;
  galleryMinItems?: number | null;
  galleryMaxItems?: number | null;
  galleryAllowedTypes?: 'IMAGE' | 'VIDEO' | 'IMAGE,VIDEO' | null;
  constraints?: FieldConstraints | null;
  options?: EnumValue[];
}

/**
 * Collection section schema information.
 */
export interface SectionInfo {
  id?: string;
  key: string;
  name: string;
  description?: string | null;
  order: number;
  fields?: string[];
}

/**
 * Collection summary returned in collection lists and item responses.
 */
export interface CollectionSummary {
  key: string;
  name: string;
  description: string | null;
  itemCount: number;
  fields?: FieldInfo[];
  sections?: SectionInfo[];
}

/**
 * Full collection schema details.
 */
export interface CollectionDetail extends CollectionSummary {
  fields: FieldInfo[];
  sections: SectionInfo[];
  sortableFields: string[];
  filterableFields: string[];
}

/**
 * Response shape for the collections list endpoint.
 */
export interface CollectionListResponse {
  data: CollectionSummary[];
}

/**
 * Input for creating a collection.
 */
export interface CreateCollectionInput {
  name: string;
  key: string;
  description?: string;
}

/**
 * Input for updating a collection.
 */
export interface UpdateCollectionInput {
  name?: string;
  description?: string | null;
}

/**
 * Input for creating a collection field.
 */
export interface CreateFieldInput {
  key: string;
  label?: string;
  name?: string;
  type: FieldType;
  required?: boolean;
  isLocalized?: boolean;
  isUnique?: boolean;
  isFilterable?: boolean;
  isSortable?: boolean;
  galleryMinItems?: number | null;
  galleryMaxItems?: number | null;
  galleryAllowedTypes?: 'IMAGE' | 'VIDEO' | 'IMAGE,VIDEO' | null;
  description?: string | null;
  constraints?: FieldConstraints | null;
  defaultValue?: string | null;
  sectionId?: string | null;
  options?: FieldOptionInput[] | null;
}

/**
 * Input for updating a collection field.
 */
export interface UpdateFieldInput {
  label?: string;
  name?: string;
  required?: boolean;
  isLocalized?: boolean;
  isUnique?: boolean;
  isFilterable?: boolean;
  isSortable?: boolean;
  galleryMinItems?: number | null;
  galleryMaxItems?: number | null;
  galleryAllowedTypes?: 'IMAGE' | 'VIDEO' | 'IMAGE,VIDEO' | null;
  description?: string | null;
  constraints?: FieldConstraints | null;
  defaultValue?: string | null;
  sectionId?: string | null;
  options?: FieldOptionInput[] | null;
}

/**
 * Response payload for collection field list operations.
 */
export interface CollectionFieldListResponse {
  fields: FieldInfo[];
}

/**
 * Input for creating a collection section.
 */
export interface CreateSectionInput {
  name: string;
  description?: string | null;
}

/**
 * Input for updating a collection section.
 */
export interface UpdateSectionInput {
  name?: string;
  description?: string | null;
  order?: number;
}

/**
 * Response payload for collection section list operations.
 */
export interface CollectionSectionListResponse {
  sections: SectionInfo[];
}

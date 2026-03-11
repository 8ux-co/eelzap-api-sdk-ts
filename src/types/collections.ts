import type { EnumValue } from './common';

/**
 * Collection field schema information.
 */
export interface FieldInfo {
  key: string;
  label: string;
  type: string;
  required?: boolean;
  isLocalized: boolean;
  isSortable?: boolean;
  isFilterable?: boolean;
  constraints?: Record<string, unknown> | null;
  options?: EnumValue[];
}

/**
 * Collection section schema information.
 */
export interface SectionInfo {
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

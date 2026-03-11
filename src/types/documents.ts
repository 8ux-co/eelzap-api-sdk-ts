import type { CommonRequestOptions, DocumentMeta, Seo } from './common';
import type { FieldInfo, SectionInfo } from './collections';

/**
 * Document list entry returned by the list endpoint.
 */
export interface DocumentListEntry {
  key: string;
  name: string;
  description: string | null;
  status: string;
  updatedAt: string;
  publishedAt: string | null;
  fields: FieldInfo[];
  sections: SectionInfo[];
}

/**
 * Document detail payload.
 */
export interface DocumentDetail<TContent = Record<string, unknown>> {
  key: string;
  name: string;
  status: string;
  locale: string;
  meta: DocumentMeta;
  content: TContent;
  seo: Seo | null;
}

/**
 * Response shape for document lists.
 */
export interface DocumentListResponse {
  data: DocumentListEntry[];
}

/**
 * Options for listing documents.
 */
export type DocumentListOptions = Omit<CommonRequestOptions, 'fields'>;

/**
 * Options for retrieving a single document.
 */
export type DocumentGetOptions = CommonRequestOptions;

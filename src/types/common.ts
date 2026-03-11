/**
 * Supported delivery status filters.
 */
export type DeliveryStatus = 'published' | 'draft' | 'all';

/**
 * A primitive value accepted in query parameters.
 */
export type QueryPrimitive = string | number | boolean;

/**
 * Pagination metadata returned by list endpoints.
 */
export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * SEO metadata resolved for the current locale.
 */
export interface Seo {
  metaTitle: string | null;
  metaDescription: string | null;
  ogType: string | null;
  twitterCard: string;
  noIndex: boolean;
  noFollow: boolean;
  keywords: string | null;
  structuredData: Record<string, unknown> | null;
}

/**
 * Collection item timestamps.
 */
export interface ItemMeta {
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

/**
 * Document timestamps.
 */
export interface DocumentMeta {
  updatedAt: string;
  publishedAt: string | null;
}

/**
 * Section metadata embedded in sectioned content groups.
 */
export interface SectionMeta {
  name: string;
  key: string;
}

/**
 * Enum values returned by the API.
 */
export interface EnumValue {
  value: string;
  label: string;
}

/**
 * Currency values are returned in minor units.
 */
export interface CurrencyValue {
  amount: number;
  currency: string;
}

/**
 * Access mode for a media value.
 */
export type MediaAccess = 'public' | 'signed' | 'none';

/**
 * Media value returned by the delivery API.
 */
export interface MediaValue {
  id: string;
  filename: string;
  type: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  alt: string | null;
  title: string | null;
  description: string | null;
  status: string;
  mediaAccess: MediaAccess;
  url: string | null;
  signedUrl: string | null;
  signedUrlExpiresAt: string | null;
}

/**
 * Gallery entry values returned by the API.
 */
export interface GalleryItemValue {
  position: number;
  caption: string | null;
  description: string | null;
  media: MediaValue | null;
}

/**
 * Shared request options supported by most endpoints.
 */
export interface CommonRequestOptions {
  locale?: string;
  status?: DeliveryStatus;
  fields?: string[];
}

/**
 * JSON error payload returned by the delivery API.
 */
export interface ApiErrorPayload {
  error: {
    code: string;
    message: string;
    status: number;
  };
}

/**
 * Client-level defaults applied to every request unless overridden.
 */
export interface ClientDefaults {
  locale?: string;
  status?: DeliveryStatus;
}

export type VersionStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface VersionSummary {
  id: string;
  number: number;
  status: VersionStatus;
  note: string | null;
  restoredFromVersionNumber: number | null;
  createdAt: string;
  publishedAt: string | null;
}

export interface VersionDetail extends VersionSummary {
  values: Record<string, unknown>[];
  seo: Record<string, unknown>[];
  slugs?: Record<string, unknown>[];
  galleryItems?: Record<string, unknown>[];
}

export interface VersionListResponse {
  versions: VersionSummary[];
}

export interface CreateDraftInput {
  note?: string;
}

export interface UpdateItemDraftInput {
  slug?: string;
  locale?: string;
  values?: Record<string, unknown>;
}

export interface UpdateDocumentDraftInput {
  locale?: string;
  values?: Record<string, unknown>;
}

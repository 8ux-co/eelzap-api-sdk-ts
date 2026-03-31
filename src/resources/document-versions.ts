import { HttpClient } from '../http';
import { buildResourcePath } from '../paths';
import type {
  CreateDraftInput,
  UpdateDocumentDraftInput,
  VersionDetail,
  VersionListResponse,
  VersionSummary,
} from '../types/versions';

/**
 * Manages version history, drafts, and rollbacks for documents.
 */
export class DocumentVersionsResource {
  readonly #http: HttpClient;

  /** @internal */
  constructor(http: HttpClient) {
    this.#http = http;
  }

  /**
   * Lists all versions for a document.
   */
  async list(documentKey: string): Promise<VersionListResponse> {
    return this.#http.get<VersionListResponse>(
      buildResourcePath('documents', documentKey, 'versions'),
    );
  }

  /**
   * Gets a specific version by ID.
   */
  async get(documentKey: string, versionId: string): Promise<VersionDetail> {
    const response = await this.#http.get<{ version: VersionDetail }>(
      buildResourcePath('documents', documentKey, 'versions', versionId),
    );
    return response.version;
  }

  /**
   * Creates a new draft version from the current published version.
   */
  async createDraft(documentKey: string, input?: CreateDraftInput): Promise<VersionSummary> {
    const response = await this.#http.post<{ version: VersionSummary }>(
      buildResourcePath('documents', documentKey, 'versions'),
      input,
    );
    return response.version;
  }

  /**
   * Updates the current draft version with new field values.
   */
  async updateDraft(documentKey: string, input: UpdateDocumentDraftInput): Promise<VersionDetail> {
    const response = await this.#http.put<{ version: VersionDetail }>(
      buildResourcePath('documents', documentKey, 'versions', 'draft'),
      input,
    );
    return response.version;
  }

  /**
   * Discards the current draft version.
   */
  async discardDraft(documentKey: string): Promise<void> {
    await this.#http.delete<unknown>(
      buildResourcePath('documents', documentKey, 'versions', 'draft'),
    );
  }

  /**
   * Publishes the current draft version.
   */
  async publishDraft(documentKey: string): Promise<VersionDetail> {
    const response = await this.#http.post<{ version: VersionDetail }>(
      buildResourcePath('documents', documentKey, 'versions', 'draft', 'publish'),
    );
    return response.version;
  }

  /**
   * Creates a new draft from a historical version (non-destructive rollback).
   */
  async rollback(documentKey: string, versionId: string): Promise<VersionDetail> {
    const response = await this.#http.post<{ version: VersionDetail }>(
      buildResourcePath('documents', documentKey, 'versions', versionId, 'rollback'),
    );
    return response.version;
  }
}

import { HttpClient } from '../http';
import { buildResourcePath } from '../paths';
import type {
  CreateDraftInput,
  UpdateItemDraftInput,
  VersionDetail,
  VersionListResponse,
  VersionSummary,
} from '../types/versions';

/**
 * Manages version history, drafts, and rollbacks for collection items.
 */
export class ItemVersionsResource {
  readonly #http: HttpClient;

  /** @internal */
  constructor(http: HttpClient) {
    this.#http = http;
  }

  /**
   * Lists all versions for an item.
   */
  async list(collectionKey: string, slug: string): Promise<VersionListResponse> {
    return this.#http.get<VersionListResponse>(
      buildResourcePath('collections', collectionKey, 'items', slug, 'versions'),
    );
  }

  /**
   * Gets a specific version by ID.
   */
  async get(collectionKey: string, slug: string, versionId: string): Promise<VersionDetail> {
    const response = await this.#http.get<{ version: VersionDetail }>(
      buildResourcePath('collections', collectionKey, 'items', slug, 'versions', versionId),
    );
    return response.version;
  }

  /**
   * Creates a new draft version from the current published version.
   */
  async createDraft(
    collectionKey: string,
    slug: string,
    input?: CreateDraftInput,
  ): Promise<VersionSummary> {
    const response = await this.#http.post<{ version: VersionSummary }>(
      buildResourcePath('collections', collectionKey, 'items', slug, 'versions'),
      input,
    );
    return response.version;
  }

  /**
   * Updates the current draft version with new field values.
   */
  async updateDraft(
    collectionKey: string,
    slug: string,
    input: UpdateItemDraftInput,
  ): Promise<VersionDetail> {
    const response = await this.#http.put<{ version: VersionDetail }>(
      buildResourcePath('collections', collectionKey, 'items', slug, 'versions', 'draft'),
      input,
    );
    return response.version;
  }

  /**
   * Discards the current draft version.
   */
  async discardDraft(collectionKey: string, slug: string): Promise<void> {
    await this.#http.delete<unknown>(
      buildResourcePath('collections', collectionKey, 'items', slug, 'versions', 'draft'),
    );
  }

  /**
   * Publishes the current draft version.
   */
  async publishDraft(collectionKey: string, slug: string): Promise<VersionDetail> {
    const response = await this.#http.post<{ version: VersionDetail }>(
      buildResourcePath(
        'collections',
        collectionKey,
        'items',
        slug,
        'versions',
        'draft',
        'publish',
      ),
    );
    return response.version;
  }

  /**
   * Creates a new draft from a historical version (non-destructive rollback).
   */
  async rollback(collectionKey: string, slug: string, versionId: string): Promise<VersionDetail> {
    const response = await this.#http.post<{ version: VersionDetail }>(
      buildResourcePath(
        'collections',
        collectionKey,
        'items',
        slug,
        'versions',
        versionId,
        'rollback',
      ),
    );
    return response.version;
  }
}

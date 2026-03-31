# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.9.0] - 2026-03-30

### Added

- Added `ItemVersionsResource` with full version management: `list`, `get`, `createDraft`, `updateDraft`, `discardDraft`, `publishDraft`, and `rollback`.
- Added `DocumentVersionsResource` with the same version management methods for documents.
- Added `itemVersions` and `documentVersions` properties to `EelZapClient`.
- Added version types: `VersionSummary`, `VersionDetail`, `VersionListResponse`, `CreateDraftInput`, `UpdateItemDraftInput`, `UpdateDocumentDraftInput`, and `VersionStatus`.

## [0.8.1] - 2026-03-23

### Fixed

- Restored webhook signature verification support in Node runtimes when `globalThis.crypto` is not pre-populated by the host environment.
- Added fallback-path and malformed-signature test coverage for the webhook verification helper.

## [0.8.0] - 2026-03-23

### Added

- Added a new `cachedFetch` options overload with explicit `network-first` and `cache-first` strategies.
- Added `verifyWebhookSignature` for validating `X-EelZap-Signature` webhook headers with HMAC-SHA256.
- Added webhook payload and change event types for consumer integrations.

### Changed

- Updated the cache adapter typing to support strongly typed synchronous and asynchronous cache backends.
- Updated the README to document cache strategies, webhook verification, and cache invalidation workflows.

## [0.7.2] - 2026-03-21

### Changed

- Removed `null` from `SeoInput.locale` to align the SDK type with the API contract.

## [0.7.1] - 2026-03-21

### Added

- Added SEO enhancement types.

## [0.7.0] - 2026-03-19

### Changed

- Flattened Delivery API content responses.
- Fixed `FieldType` mappings.

## [0.6.0] - 2026-03-19

### Added

- Added the schema-driven code generation CLI.

## [0.5.1] - 2026-03-19

### Fixed

- Aligned the SEO structured data type with the Delivery API.

## [0.5.0] - 2026-03-18

### Added

- Added support for document key updates.
- Added multi-currency field constraint typing.
- Added structured data support in SEO SDK types.

## [0.4.0] - 2026-03-18

### Added

- Added resilient caching with `CacheAdapter`, `MemoryCacheAdapter`, and `cachedFetch`.

### Changed

- Replaced the old `cms_` API key prefix expectations with `secret_` and `public_`.

## [0.3.0] - 2026-03-16

### Added

- Migrated rich text field definitions and utilities.

## [0.2.2] - 2026-03-14

### Fixed

- Fixed the SDK trusted publishing workflow.

## [0.2.1] - 2026-03-14

### Changed

- Switched SDK releases to the trusted publisher workflow.

## [0.2.0] - 2026-03-14

### Added

- Added write operations for collections, items, documents, media, and site introspection.
- Added nested resource clients for fields, sections, document values, and SEO.
- Added configurable `pathPrefix` support for production rewrites and local Next.js development.

## [0.1.6] - 2026-03-12

### Added

- Added rich text and media helper utilities.

## [0.1.5] - 2026-03-11

### Changed

- Updated package, badge, and repository links after the repository transfer.

## [0.1.4] - 2026-03-11

### Added

- Published HTML docs for GitHub Pages.
- Added the live API docs URL to the README.
- Added npm, CI, and docs badges.

## [0.1.3] - 2026-03-11

### Added

- Added repository metadata for npm provenance.

### Changed

- Updated npm configuration for trusted publishing.

## [0.1.2] - 2026-03-11

### Changed

- Enabled npm trusted publishing in the release workflow.

## [0.1.1] - 2026-03-11

### Changed

- Renamed the package to the `@8ux-co` scope.

## [0.1.0] - 2026-03-11

### Added

- Initial standalone SDK implementation for the EelZap Content Delivery API.
- Initial GitHub Pages docs publishing setup.

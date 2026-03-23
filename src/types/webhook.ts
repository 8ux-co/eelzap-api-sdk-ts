export type WebhookEventType = 'item' | 'document' | 'media';
export type WebhookAction = 'created' | 'updated' | 'deleted' | 'published' | 'unpublished';

export interface WebhookChange {
  type: WebhookEventType;
  action: WebhookAction;
  resourceKey: string;
  collectionKey?: string;
}

export interface WebhookPayload {
  event: 'content.changed';
  site: { id: string; key: string };
  changes: WebhookChange[];
  timestamp: string;
}

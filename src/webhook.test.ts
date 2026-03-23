import { createHmac } from 'node:crypto';
import { describe, expect, it } from 'vitest';

import { verifyWebhookSignature } from './webhook';

describe('verifyWebhookSignature', () => {
  it('returns true for a valid signature', async () => {
    const payload = JSON.stringify({ event: 'content.changed' });
    const secret = 'super-secret';
    const signature = `sha256=${createHmac('sha256', secret).update(payload).digest('hex')}`;

    await expect(verifyWebhookSignature(payload, signature, secret)).resolves.toBe(true);
  });

  it('returns false for an invalid signature', async () => {
    await expect(
      verifyWebhookSignature('{"ok":true}', 'sha256=deadbeef', 'super-secret'),
    ).resolves.toBe(false);
  });

  it('returns false for malformed signature headers', async () => {
    await expect(
      verifyWebhookSignature('{"ok":true}', 'invalid-header', 'super-secret'),
    ).resolves.toBe(false);
  });

  it('returns false for malformed sha256 hex payloads', async () => {
    await expect(verifyWebhookSignature('{"ok":true}', 'sha256=abc', 'super-secret')).resolves.toBe(
      false,
    );
  });

  it('returns false when the secret is empty', async () => {
    await expect(verifyWebhookSignature('{"ok":true}', 'sha256=deadbeef', '')).resolves.toBe(false);
  });
});

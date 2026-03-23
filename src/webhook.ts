function hexToBytes(value: string): Uint8Array | null {
  if (value.length === 0 || value.length % 2 !== 0) {
    return null;
  }

  const bytes = new Uint8Array(value.length / 2);

  for (let index = 0; index < value.length; index += 2) {
    const pair = value.slice(index, index + 2);
    const parsed = Number.parseInt(pair, 16);

    if (Number.isNaN(parsed)) {
      return null;
    }

    bytes[index / 2] = parsed;
  }

  return bytes;
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

export async function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  if (!signature.startsWith('sha256=') || !secret) {
    return false;
  }

  const signatureBytes = hexToBytes(signature.slice('sha256='.length));
  if (!signatureBytes) {
    return false;
  }

  const encoder = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify'],
  );

  return globalThis.crypto.subtle.verify(
    'HMAC',
    key,
    toArrayBuffer(signatureBytes),
    toArrayBuffer(encoder.encode(payload)),
  );
}

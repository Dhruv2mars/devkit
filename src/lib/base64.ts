function toUtf8Bytes(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function fromUtf8Bytes(bytes: Uint8Array): string {
  return new TextDecoder().decode(bytes);
}

export function encodeBase64(input: string): string {
  // Unicode-safe base64 encode
  const bytes = toUtf8Bytes(input);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  // btoa expects binary string
  return btoa(binary);
}

export function decodeBase64(input: string): { ok: true; value: string } | { ok: false; error: string } {
  try {
    const binary = atob(input);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return { ok: true, value: fromUtf8Bytes(bytes) };
  } catch (err) {
    return { ok: false, error: (err as Error).message };
  }
}


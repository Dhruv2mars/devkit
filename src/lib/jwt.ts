export type DecodedPart = {
  ok: true;
  json: unknown;
} | { ok: false; error: string };

function b64urlToUtf8(input: string): string {
  // base64url -> base64
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(input.length / 4) * 4, "=");
  const bin = typeof atob !== "undefined" ? atob(b64) : Buffer.from(b64, "base64").toString("binary");
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  if (typeof TextDecoder !== "undefined") return new TextDecoder().decode(bytes);
  return Buffer.from(bytes).toString("utf8");
}

export function decodeJwtPart(part: string): DecodedPart {
  try {
    const json = JSON.parse(b64urlToUtf8(part));
    return { ok: true, json };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export function splitJwt(token: string): string[] | null {
  const parts = token.trim().split(".");
  if (parts.length < 2) return null;
  return parts;
}


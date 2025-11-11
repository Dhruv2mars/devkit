export function parseUrl(input: string): { ok: true; url: URL } | { ok: false; error: string } {
  try {
    const url = new URL(input);
    return { ok: true, url };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export function buildUrl(base: string, params: Record<string, string | null | undefined>) {
  const u = new URL(base);
  Object.entries(params).forEach(([k, v]) => {
    if (v == null || v === "") u.searchParams.delete(k);
    else u.searchParams.set(k, v);
  });
  return u.toString();
}


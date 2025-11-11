export type RGB = { r: number; g: number; b: number };

export function hexToRgb(hex: string): RGB | null {
  const normalized = hex.replace(/^#/, "").trim();
  if (!/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(normalized)) return null;
  const value = normalized.length === 3
    ? normalized.split("").map((c) => c + c).join("")
    : normalized;
  const num = parseInt(value, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

export function rgbToHex({ r, g, b }: RGB): string | null {
  const clamp = (n: number) => Math.min(255, Math.max(0, Math.round(n)));
  const rr = clamp(r).toString(16).padStart(2, "0");
  const gg = clamp(g).toString(16).padStart(2, "0");
  const bb = clamp(b).toString(16).padStart(2, "0");
  return `#${rr}${gg}${bb}`;
}


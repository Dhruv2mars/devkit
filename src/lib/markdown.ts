import { marked } from "marked";

export function markdownToHtml(md: string): string {
  // Keep options minimal for cross-version compatibility; sanitize at render time
  return marked.parse(md) as string;
}

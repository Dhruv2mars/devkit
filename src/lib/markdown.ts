import { marked } from "marked";

export function markdownToHtml(md: string): string {
  // Configure marked for basic safe rendering (we'll sanitize in the UI)
  return marked.parse(md, { mangle: false, headerIds: true }) as string;
}


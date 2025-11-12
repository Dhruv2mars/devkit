"use client";

import ToolCard from "@/components/ToolCard";
import { markdownToHtml } from "@/lib/markdown";
import { sanitize } from "isomorphic-dompurify";
import React from "react";

export default function MarkdownToolPage() {
  const [md, setMd] = React.useState<string>("# Hello DevKit\n\n- Markdown\n- Preview\n\n**Bold** and _italic_.");
  const html = React.useMemo(() => sanitize(markdownToHtml(md)), [md]);

  return (
    <ToolCard title="Markdown Renderer" description="Convert Markdown to sanitized HTML">
      <div className="grid gap-3 md:grid-cols-2">
        <label>
          Markdown
          <textarea rows={14} className="font-mono" value={md} onChange={(e) => setMd(e.target.value)} />
        </label>
        <div>
          <div className="text-sm font-medium text-gray-700">Preview</div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </ToolCard>
  );
}

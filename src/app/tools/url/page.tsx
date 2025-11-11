"use client";

import ToolCard from "@/components/ToolCard";
import { buildUrl, parseUrl } from "@/lib/url";
import React from "react";

export default function UrlToolPage() {
  const [raw, setRaw] = React.useState<string>("https://example.com/path?foo=1&bar=2");
  const [params, setParams] = React.useState<{ key: string; value: string }[]>([
    { key: "foo", value: "1" },
    { key: "bar", value: "2" },
  ]);
  const [error, setError] = React.useState<string | null>(null);

  const parsed = parseUrl(raw);
  const paramUI = (
    <div className="space-y-2">
      {params.map((p, i) => (
        <div className="grid grid-cols-2 gap-2" key={i}>
          <input placeholder="key" value={p.key} onChange={(e) => updateParam(i, { key: e.target.value })} />
          <input placeholder="value" value={p.value} onChange={(e) => updateParam(i, { value: e.target.value })} />
        </div>
      ))}
      <div className="flex gap-2">
        <button onClick={() => setParams((ps) => [...ps, { key: "", value: "" }])}>+ Add param</button>
        <button onClick={() => setParams([{ key: "", value: "" }])}>Reset</button>
      </div>
    </div>
  );

  function updateParam(index: number, patch: Partial<{ key: string; value: string }>) {
    setParams((ps) => ps.map((p, i) => (i === index ? { ...p, ...patch } : p)));
  }

  function rebuild() {
    const entries = Object.fromEntries(params.filter((p) => p.key.trim() !== "").map((p) => [p.key, p.value]));
    try {
      const u = buildUrl(parsed.ok ? parsed.url.toString() : raw, entries);
      setRaw(u);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  return (
    <ToolCard title="URL Utils" description="Parse and edit URL query params">
      <div className="grid gap-2">
        <label>
          URL
          <input value={raw} onChange={(e) => setRaw(e.target.value)} />
        </label>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-700">Params</div>
            {paramUI}
          </div>
          <div>
            <div className="text-sm font-medium text-gray-700">Parsed</div>
            {parsed.ok ? (
              <pre className="mt-1 rounded-md border border-gray-200 bg-gray-50 p-2 text-xs overflow-x-auto">
{JSON.stringify({
  protocol: parsed.url.protocol,
  host: parsed.url.host,
  pathname: parsed.url.pathname,
  search: parsed.url.search,
  hash: parsed.url.hash,
}, null, 2)}
              </pre>
            ) : (
              <div className="text-red-600">{parsed.error}</div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={rebuild}>Rebuild URL</button>
        </div>
        {error ? <div className="text-red-600">Error: {error}</div> : null}
      </div>
    </ToolCard>
  );
}


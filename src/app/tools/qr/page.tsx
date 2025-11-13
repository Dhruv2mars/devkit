"use client";

import ToolCard from "@/components/ToolCard";
import React from "react";

export default function QrToolPage() {
  const [text, setText] = React.useState("hello devkitlibrary");
  const [url, setUrl] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  function generate() {
    try {
      setError(null);
      const api = "https://api.qrserver.com/v1/create-qr-code/";
      const size = "240x240";
      const full = `${api}?size=${size}&data=${encodeURIComponent(text)}`;
      setUrl(full);
    } catch (e) {
      setError((e as Error).message);
    }
  }

  React.useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ToolCard title="QR Code" description="Generate QR code from text">
      <div className="grid gap-2 md:grid-cols-2">
        <label>
          Text
          <textarea className="font-mono" rows={6} value={text} onChange={(e) => setText(e.target.value)} />
        </label>
        <div className="flex items-center justify-center p-4 border border-gray-200 rounded">
          {url ? <img src={url} alt="QR" /> : <span className="text-gray-500">No QR yet</span>}
        </div>
        <div className="flex gap-2 md:col-span-2">
          <button onClick={generate}>Generate</button>
          {url && (
            <a className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm" href={url} target="_blank" rel="noreferrer">Open Image</a>
          )}
        </div>
        {error ? <div className="text-red-600">{error}</div> : null}
      </div>
    </ToolCard>
  );
}

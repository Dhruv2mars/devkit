"use client";

import { decodeBase64, encodeBase64 } from "@/lib/base64";
import ToolCard from "@/components/ToolCard";
import React from "react";

export default function Base64ToolPage() {
  const [plain, setPlain] = React.useState<string>("hello, 世界");
  const [b64, setB64] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  const onEncode = () => {
    setError(null);
    setB64(encodeBase64(plain));
  };

  const onDecode = () => {
    const res = decodeBase64(b64);
    if (res.ok) {
      setError(null);
      setPlain(res.value);
    } else {
      setError(res.error);
    }
  };

  return (
    <ToolCard title="Base64 Encoder/Decoder" description="Unicode-safe base64 conversions">
      <div style={{ display: 'grid', gap: 8 }}>
        <label>
          Plain
          <textarea value={plain} onChange={(e) => setPlain(e.target.value)} rows={6} style={{ width: '100%', fontFamily: 'monospace' }} />
        </label>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onEncode}>Encode →</button>
          <button onClick={onDecode}>← Decode</button>
        </div>
        {error ? <div style={{ color: 'crimson' }}>Error: {error}</div> : null}
        <label>
          Base64
          <textarea value={b64} onChange={(e) => setB64(e.target.value)} rows={6} style={{ width: '100%', fontFamily: 'monospace' }} />
        </label>
      </div>
    </ToolCard>
  );
}


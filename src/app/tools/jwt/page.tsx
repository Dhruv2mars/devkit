"use client";

import ToolCard from "@/components/ToolCard";
import { decodeJwtPart, splitJwt } from "@/lib/jwt";
import React from "react";

export default function JwtToolPage() {
  const [token, setToken] = React.useState("");
  const parts = splitJwt(token);
  const header = parts ? decodeJwtPart(parts[0]) : null;
  const payload = parts ? decodeJwtPart(parts[1]) : null;

  return (
    <ToolCard title="JWT Decoder" description="Decode JWT header and payload (no verify)">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="md:col-span-2">
          JWT
          <textarea className="font-mono" rows={5} value={token} onChange={(e) => setToken(e.target.value)} placeholder="eyJhbGciOi..." />
        </label>
        <div>
          <div className="text-sm font-medium text-gray-700">Header</div>
          <pre className="mt-1 rounded border border-gray-200 bg-gray-50 p-2 text-xs overflow-x-auto">
{header ? (header.ok ? JSON.stringify(header.json, null, 2) : `Error: ${header.error}`) : "—"}
          </pre>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700">Payload</div>
          <pre className="mt-1 rounded border border-gray-200 bg-gray-50 p-2 text-xs overflow-x-auto">
{payload ? (payload.ok ? JSON.stringify(payload.json, null, 2) : `Error: ${payload.error}`) : "—"}
          </pre>
        </div>
      </div>
    </ToolCard>
  );
}


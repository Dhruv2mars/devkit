"use client";

import ToolCard from "@/components/ToolCard";
import React from "react";

function genV4() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  // Fallback simple v4
  const rnd = (n = 16) => Array.from({ length: n }, () => Math.floor(Math.random() * 256));
  const b = rnd(16);
  b[6] = (b[6] & 0x0f) | 0x40; // version 4
  b[8] = (b[8] & 0x3f) | 0x80; // variant
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  const hex = b.map(toHex).join("");
  return `${hex.slice(0,8)}-${hex.slice(8,12)}-${hex.slice(12,16)}-${hex.slice(16,20)}-${hex.slice(20)}`;
}

function isUuid(str: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(str);
}

export default function UuidToolPage() {
  const [value, setValue] = React.useState("");
  const [valid, setValid] = React.useState<boolean | null>(null);

  return (
    <ToolCard title="UUID Tool" description="Generate and validate UUID v4">
      <div className="grid gap-2">
        <div className="flex gap-2">
          <button onClick={() => setValue(genV4())}>Generate v4</button>
          <button onClick={() => setValid(isUuid(value))}>Validate</button>
        </div>
        <label>
          UUID
          <input value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
        {valid !== null && (
          <div className={valid ? "text-green-600" : "text-red-600"}>{valid ? "Valid" : "Invalid"}</div>
        )}
      </div>
    </ToolCard>
  );
}


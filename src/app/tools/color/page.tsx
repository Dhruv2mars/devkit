"use client";

import ToolCard from "@/components/ToolCard";
import { hexToRgb, rgbToHex } from "@/lib/color";
import React from "react";

export default function ColorToolPage() {
  const [hex, setHex] = React.useState<string>("#ff00aa");
  const [rgb, setRgb] = React.useState<{ r: string; g: string; b: string }>({ r: "", g: "", b: "" });
  const [error, setError] = React.useState<string | null>(null);

  const onHexToRgb = () => {
    const val = hexToRgb(hex);
    if (!val) {
      setError("Invalid HEX");
      return;
    }
    setError(null);
    setRgb({ r: String(val.r), g: String(val.g), b: String(val.b) });
  };

  const onRgbToHex = () => {
    const r = Number(rgb.r), g = Number(rgb.g), b = Number(rgb.b);
    const val = rgbToHex({ r, g, b });
    if (!val) {
      setError("Invalid RGB");
      return;
    }
    setError(null);
    setHex(val);
  };

  return (
    <ToolCard title="Color Converter" description="HEX ↔ RGB">
      <div className="grid gap-2">
        <label>
          HEX
          <input value={hex} onChange={(e) => setHex(e.target.value)} />
        </label>
        <div className="flex gap-2">
          <button onClick={onHexToRgb}>HEX → RGB</button>
          <button onClick={onRgbToHex}>RGB → HEX</button>
        </div>
        {error ? <div className="text-red-600">Error: {error}</div> : null}
        <div className="grid grid-cols-3 gap-2">
          <label>
            R
            <input value={rgb.r} onChange={(e) => setRgb({ ...rgb, r: e.target.value })} />
          </label>
          <label>
            G
            <input value={rgb.g} onChange={(e) => setRgb({ ...rgb, g: e.target.value })} />
          </label>
          <label>
            B
            <input value={rgb.b} onChange={(e) => setRgb({ ...rgb, b: e.target.value })} />
          </label>
        </div>
        <div className="h-10 rounded-md border border-gray-200" style={{ background: hex }} />
      </div>
    </ToolCard>
  );
}

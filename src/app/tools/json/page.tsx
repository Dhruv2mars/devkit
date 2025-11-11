"use client";

import { minifyJson, prettyJson, safeParseJson } from "@/lib/json";
import ToolCard from "@/components/ToolCard";
import React from "react";

export default function JsonToolPage() {
  const [input, setInput] = React.useState<string>("{\n  \"hello\": \"world\"\n}");
  const [output, setOutput] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);

  const onPretty = () => {
    setError(null);
    try {
      setOutput(prettyJson(input));
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const onMinify = () => {
    setError(null);
    try {
      setOutput(minifyJson(input));
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  };

  const onValidate = () => {
    const res = safeParseJson(input);
    if (res.ok) {
      setError(null);
      setOutput("Valid JSON");
    } else {
      setError(res.error);
      setOutput("");
    }
  };

  return (
    <ToolCard title="JSON Formatter" description="Pretty/minify and validate JSON">
      <div className="grid gap-2">
        <label>
          Input
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="font-mono"
          />
        </label>
        <div className="flex gap-2">
          <button onClick={onPretty}>Pretty</button>
          <button onClick={onMinify}>Minify</button>
          <button onClick={onValidate}>Validate</button>
        </div>
        {error ? <div className="text-red-600">Error: {error}</div> : null}
        <label>
          Output
          <textarea value={output} readOnly rows={10} className="font-mono" />
        </label>
      </div>
    </ToolCard>
  );
}

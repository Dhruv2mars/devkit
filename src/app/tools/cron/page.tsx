"use client";

import ToolCard from "@/components/ToolCard";
import { humanize, nextRuns } from "@/lib/cron";
import React from "react";

export default function CronToolPage() {
  const [expr, setExpr] = React.useState<string>("*/5 * * * *");
  const [count, setCount] = React.useState<string>("5");

  const human = humanize(expr);
  const runs = nextRuns(expr, Number(count));

  return (
    <ToolCard title="Cron Helper" description="Humanize cron and preview next runs">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="grid gap-2">
          <label>
            Cron Expression
            <input value={expr} onChange={(e) => setExpr(e.target.value)} />
          </label>
          <label>
            Count
            <input value={count} onChange={(e) => setCount(e.target.value)} />
          </label>
          <div className="text-sm text-gray-600">{human ?? '—'}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700">Next Runs</div>
          {runs.ok ? (
            <ul className="mt-1 space-y-1 text-sm">
              {runs.runs.map((d, i) => (
                <li key={i} className="rounded border border-gray-200 p-2">{d.toString()}</li>
              ))}
            </ul>
          ) : (
            <div className="text-red-600">{runs.error}</div>
          )}
        </div>
      </div>
    </ToolCard>
  );
}


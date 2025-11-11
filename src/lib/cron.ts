import parser from 'cron-parser';

export function nextRuns(expr: string, count = 5): { ok: true; runs: Date[] } | { ok: false; error: string } {
  try {
    const interval = parser.parseExpression(expr);
    const runs: Date[] = [];
    for (let i = 0; i < count; i++) runs.push(interval.next().toDate());
    return { ok: true, runs };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

const NAMES: Record<number, string> = { 0: 'Sun', 1: 'Mon', 2: 'Tue', 3: 'Wed', 4: 'Thu', 5: 'Fri', 6: 'Sat' };

export function humanize(expr: string): string | null {
  // Minimal humanization for common forms: "* * * * *", "0 * * * *", "0 0 * * *", "0 0 * * 0" etc.
  const parts = expr.trim().split(/\s+/);
  if (parts.length < 5) return null;
  const [min, hour, dom, mon, dow] = parts;
  if (expr === '* * * * *') return 'Every minute';
  if (min === '0' && hour === '*' && dom === '*' && mon === '*' && dow === '*') return 'Every hour';
  if (min === '0' && hour === '0' && dom === '*' && mon === '*' && dow === '*') return 'Every day at 00:00';
  if (min === '0' && hour === '0' && dom === '1' && mon === '*' && dow === '*') return 'On the 1st of each month at 00:00';
  if (min === '0' && hour === '0' && dom === '*' && mon === '*' && /^[0-6]$/.test(dow)) return `Every ${NAMES[Number(dow)]} at 00:00`;
  return null;
}


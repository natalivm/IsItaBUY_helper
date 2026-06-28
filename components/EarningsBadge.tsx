import React from 'react';
import { CalendarCheck } from 'lucide-react';
import { TickerDefinition } from '../types';
import { cn } from '../utils';

interface Props {
  tickerDef: TickerDefinition;
  /** Visually de-emphasize when the parent row is dimmed (e.g. AVOID group). */
  dimmed?: boolean;
}

// Days between an ISO 'YYYY-MM-DD' date and now. Null if missing/unparseable.
function daysSince(iso?: string): number | null {
  if (!iso) return null;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return null;
  return Math.floor((Date.now() - t) / 86_400_000);
}

// Fundamentals reviewed within this window read as "fresh".
const FRESH_DAYS = 45;

/**
 * Quarterly-earnings badge for the stock list rows. Shows the latest
 * reported quarter the data reflects (`lastReportTag`), highlighted green
 * when the fundamentals were reviewed within the last ~45 days
 * (`dataReviewedOn`) and muted when the read is older. Returns null when
 * the stock has no `lastReportTag`.
 */
const EarningsBadge: React.FC<Props> = ({ tickerDef, dimmed }) => {
  const tag = tickerDef.lastReportTag;
  if (!tag) return null;

  const age = daysSince(tickerDef.dataReviewedOn);
  const fresh = age !== null && age <= FRESH_DAYS;
  const title = tickerDef.dataReviewedOn
    ? `Latest earnings reflected: ${tag} · reviewed ${tickerDef.dataReviewedOn}${fresh ? ' (fresh)' : ''}`
    : `Latest earnings reflected: ${tag}`;

  return (
    <span
      title={title}
      className={cn(
        'text-sm font-bold border rounded px-1.5 py-0.5 flex-shrink-0 inline-flex items-center gap-1',
        fresh
          ? 'text-emerald-300 border-emerald-600/70 bg-emerald-950/70'
          : 'text-slate-300 border-slate-700/70 bg-slate-900/60',
        dimmed && 'opacity-50'
      )}
    >
      <CalendarCheck className="w-3 h-3" />
      {tag}
    </span>
  );
};

export default EarningsBadge;

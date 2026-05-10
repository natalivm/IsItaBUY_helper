import React from 'react';
import { TickerDefinition } from '../types';
import { cn } from '../utils';

interface Props {
  tickerDef: TickerDefinition;
  /** Visually de-emphasize when the parent row is dimmed (e.g. AVOID group). */
  dimmed?: boolean;
}

/**
 * Compact Burry SBC overstatement badge for the stock list rows.
 * Shows the headline overstatement % colored by tier:
 * <15% Pristine (emerald), <30% Ok (lime), <70% Critical (amber), else Tragic (rose).
 * Returns null when the stock has no burry data.
 */
const BurryBadge: React.FC<Props> = ({ tickerDef, dimmed }) => {
  const b = tickerDef.burry;
  if (!b) return null;

  // Prefer the published / estimated full-SBC overstatement when available.
  // Fall back to naive SBC/NI for stocks without the override; treat GAAP loss as 100%.
  const pct = b.overstatementPct != null
    ? b.overstatementPct
    : b.gaapNi > 0
      ? Math.min(100, (b.sbc / b.gaapNi) * 100)
      : 100;

  const tier =
    pct < 15 ? { ring: 'border-emerald-500/40', fg: 'text-emerald-300', bg: 'bg-emerald-500/10' } :
    pct < 30 ? { ring: 'border-lime-500/40',    fg: 'text-lime-300',    bg: 'bg-lime-500/10' } :
    pct < 70 ? { ring: 'border-amber-500/40',   fg: 'text-amber-300',   bg: 'bg-amber-500/10' } :
               { ring: 'border-rose-500/40',    fg: 'text-rose-300',    bg: 'bg-rose-500/10' };

  return (
    <span
      title={`Burry SBC overstatement: ${pct.toFixed(0)}%${b.overstatementSource === 'burry-published' ? ' (Burry-published)' : ' (estimated)'}`}
      className={cn(
        'text-xs font-bold mono border rounded px-1.5 py-0.5 flex-shrink-0',
        tier.ring,
        tier.fg,
        tier.bg,
        dimmed && 'opacity-50'
      )}
    >
      B {Math.round(pct)}%
    </span>
  );
};

export default BurryBadge;

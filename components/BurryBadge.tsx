import React from 'react';
import { TickerDefinition } from '../types';
import { cn } from '../utils';
import { resolveOverstatementPct, tierFromOverstatement } from '../services/burryTier';

interface Props {
  tickerDef: TickerDefinition;
  /** Visually de-emphasize when the parent row is dimmed (e.g. AVOID group). */
  dimmed?: boolean;
}

/**
 * Compact Burry SBC overstatement badge for the stock list rows.
 * Shows the headline overstatement % colored by tier. Returns null when
 * the stock has no `burry` data.
 */
const BurryBadge: React.FC<Props> = ({ tickerDef, dimmed }) => {
  const b = tickerDef.burry;
  if (!b) return null;

  const pct = resolveOverstatementPct(b);
  const tier = tierFromOverstatement(pct);
  const sourceLabel = b.overstatementSource === 'burry-published'
    ? 'Burry-published'
    : b.overstatementSource === 'estimated'
      ? 'estimated'
      : 'derived from SBC/NI';

  return (
    <span
      title={`Burry SBC overstatement: ${pct.toFixed(0)}% (${sourceLabel})`}
      className={cn(
        'text-xs font-bold mono border rounded px-1.5 py-0.5 flex-shrink-0',
        tier.border,
        tier.color,
        tier.bg,
        dimmed && 'opacity-50'
      )}
    >
      B {Math.round(pct)}%
    </span>
  );
};

export default BurryBadge;

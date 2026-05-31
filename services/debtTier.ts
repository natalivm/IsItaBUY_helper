import { DebtData } from '../types';

/**
 * 3-step debt safety framework (display-only).
 *
 * Step 1: Net Debt ≤ 0  →  GREEN  (net cash, no further analysis needed)
 * Step 2: Net Debt / EBITDA ≤ 2.0  →  GREEN  (low leverage, safe for any business)
 * Step 3 (leverage > 2×): deep analysis
 *   ALL of (CapEx/OCF < 20%, Interest Coverage > 5.0, Altman Z > 3.0)  →  YELLOW
 *   Any condition fails  →  RED
 *   Insufficient data for Step 3  →  YELLOW with a caveat (assume best case)
 */

export type DebtTierKey = 'GREEN' | 'YELLOW' | 'RED';
export type DebtStep = 1 | 2 | 3;

export interface DebtTierTheme {
  key: DebtTierKey;
  label: string;
  color: string;
  bg: string;
  bgStrong: string;
  border: string;
  ring: string;
  blurb: string;
}

export interface DebtAnalysis {
  tier: DebtTierTheme;
  step: DebtStep;
  leverageRatio: number | null;
  /** Which Step-3 conditions were checked and their pass/fail status. */
  conditions: Array<{ label: string; value: string; passes: boolean | null }>;
  /** True when Step 3 was reached but one or more conditions had no data. */
  missingData: boolean;
}

const GREEN: DebtTierTheme = {
  key: 'GREEN',
  label: 'GREEN',
  color: 'text-emerald-400',
  bg: 'bg-emerald-600/10',
  bgStrong: 'bg-emerald-600/60',
  border: 'border-emerald-600/30',
  ring: 'ring-emerald-600/40',
  blurb: 'Financially invulnerable. Net cash position or leverage well within safe bounds.',
};

const YELLOW: DebtTierTheme = {
  key: 'YELLOW',
  label: 'YELLOW',
  color: 'text-yellow-300',
  bg: 'bg-yellow-500/10',
  bgStrong: 'bg-yellow-500/60',
  border: 'border-yellow-500/40',
  ring: 'ring-yellow-500/40',
  blurb: 'Debt is elevated but justified — asset-light model, strong interest coverage, and Altman Z in safe zone. Can invest, but monitor leverage trajectory.',
};

const RED: DebtTierTheme = {
  key: 'RED',
  label: 'RED',
  color: 'text-rose-400',
  bg: 'bg-rose-500/10',
  bgStrong: 'bg-rose-500/60',
  border: 'border-rose-500/40',
  ring: 'ring-rose-500/50',
  blurb: 'Dangerous debt level — high leverage with at least one structural weakness (asset-heavy, weak interest coverage, or Altman Z in risk zone). Default risk elevated.',
};

export function analyzeDebt(d: DebtData): DebtAnalysis {
  const leverageRatio = d.ebitda > 0 ? d.netDebt / d.ebitda : null;

  // Step 1
  if (d.netDebt <= 0) {
    return { tier: GREEN, step: 1, leverageRatio, conditions: [], missingData: false };
  }

  // Step 2
  if (leverageRatio !== null && leverageRatio <= 2.0) {
    return { tier: GREEN, step: 2, leverageRatio, conditions: [], missingData: false };
  }

  // Step 3 — deep analysis
  const conditions: DebtAnalysis['conditions'] = [
    {
      label: 'CapEx / OCF < 20% (Asset-Light)',
      value: d.capexToOcf != null ? `${(d.capexToOcf * 100).toFixed(1)}%` : '—',
      passes: d.capexToOcf != null ? d.capexToOcf < 0.20 : null,
    },
    {
      label: 'Interest Coverage > 5.0×',
      value: d.interestCoverage != null ? `${d.interestCoverage.toFixed(1)}×` : '—',
      passes: d.interestCoverage != null ? d.interestCoverage > 5.0 : null,
    },
    {
      label: 'Altman Z-Score > 3.0',
      value: d.altmanZ != null ? d.altmanZ.toFixed(2) : '—',
      passes: d.altmanZ != null ? d.altmanZ > 3.0 : null,
    },
  ];

  const missingData = conditions.some(c => c.passes === null);
  const anyFail = conditions.some(c => c.passes === false);

  return {
    tier: anyFail ? RED : YELLOW,
    step: 3,
    leverageRatio,
    conditions,
    missingData,
  };
}

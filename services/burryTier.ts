import { BurryData } from '../types';

/**
 * Shared Burry SBC-overstatement tier logic used by BurryBadge, BurryIndicator,
 * and InvestmentVerdict's Burry-Adjusted Read callout.
 *
 * Thresholds in % overstatement (must stay aligned across all 3 consumers):
 *   < 15  → Pristine (emerald)
 *   < 30  → Ok      (lime)
 *   < 70  → Critical (amber)
 *   ≥ 70  → Tragic   (rose, also returned for GAAP loss-makers)
 */
export type BurryTierKey = 'PRISTINE' | 'OK' | 'CRITICAL' | 'TRAGIC';

export interface BurryTierTheme {
  key: BurryTierKey;
  label: string;
  /** Tailwind text color for headline numbers, e.g. `text-emerald-300`. */
  color: string;
  /** Soft background (10% alpha). */
  bg: string;
  /** Stronger background variant (60% alpha) used for the indicator's top-line accent. */
  bgStrong: string;
  /** Border color. */
  border: string;
  /** Ring color (used by the tier badge in BurryIndicator). */
  ring: string;
  /** One-line blurb shown in the indicator panel. */
  blurb: string;
}

const PRISTINE: BurryTierTheme = {
  key: 'PRISTINE',
  label: 'PRISTINE',
  color: 'text-emerald-300',
  bg: 'bg-emerald-500/10',
  bgStrong: 'bg-emerald-500/60',
  border: 'border-emerald-500/30',
  ring: 'ring-emerald-500/40',
  blurb: 'SBC is a small share of GAAP profit and buybacks more than offset dilution. Burry-approved.',
};
const OK: BurryTierTheme = {
  key: 'OK',
  label: 'OK',
  color: 'text-lime-300',
  bg: 'bg-lime-500/10',
  bgStrong: 'bg-lime-500/60',
  border: 'border-lime-500/30',
  ring: 'ring-lime-500/40',
  blurb: 'Coefficient above the 0.70 threshold. SBC dilution exists but stays within manageable bounds.',
};
const CRITICAL: BurryTierTheme = {
  key: 'CRITICAL',
  label: 'CRITICAL',
  color: 'text-amber-300',
  bg: 'bg-amber-500/10',
  bgStrong: 'bg-amber-500/60',
  border: 'border-amber-500/40',
  ring: 'ring-amber-500/40',
  blurb: 'Coefficient below 0.70 — Burry flags this as a "real-earnings haircut" zone. Apply discount to multiples.',
};
const TRAGIC: BurryTierTheme = {
  key: 'TRAGIC',
  label: 'TRAGIC',
  color: 'text-rose-300',
  bg: 'bg-rose-500/10',
  bgStrong: 'bg-rose-500/60',
  border: 'border-rose-500/40',
  ring: 'ring-rose-500/50',
  blurb: 'Real owner economics are dramatically below GAAP — 30% or less of reported. Non-GAAP optics flatter the picture significantly; buybacks alone do not close the gap.',
};

/** Pick the tier theme from an overstatement %. Negative/non-finite values fall into TRAGIC. */
export function tierFromOverstatement(pct: number): BurryTierTheme {
  if (!Number.isFinite(pct) || pct >= 70) return TRAGIC;
  if (pct >= 30) return CRITICAL;
  if (pct >= 15) return OK;
  return PRISTINE;
}

/**
 * Resolve the effective overstatement % for a stock using its `burry` block.
 * Preference order:
 *   1. `overstatementPct` if explicitly set (Burry-published or estimated)
 *   2. Naive SBC/GAAP NI ratio when GAAP NI > 0
 *   3. 100% placeholder when GAAP NI ≤ 0 (framework breaks for loss-makers)
 */
export function resolveOverstatementPct(b: BurryData): number {
  if (b.overstatementPct != null) return b.overstatementPct;
  if (b.gaapNi > 0) return Math.min(100, (b.sbc / b.gaapNi) * 100);
  return 100;
}

/** Convenience: pick tier directly from a stock's burry block. */
export function pickTier(b: BurryData): BurryTierTheme {
  return tierFromOverstatement(resolveOverstatementPct(b));
}

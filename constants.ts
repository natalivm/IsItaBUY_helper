
import { ScenarioType, ScenarioConfig, TickerDefinition } from './types';
import { ALL_STOCKS } from './stocks';

// ── Rating Definitions (single source of truth) ──

export type RatingKey = 'STRONG BUY' | 'BUY' | 'HOLD' | 'OVERVALUED';

export const RATING_DEFS: Record<RatingKey, {
  verdictText: string;
  status: string;
  color: string;
  subtextColor: string;
  dot: string;
  glowDot: string;
  activeBorder: string;
  activeBg: string;
}> = {
  'STRONG BUY': {
    verdictText: 'YES',
    status: 'undervalued',
    color: 'text-green-600',
    subtextColor: 'text-green-600/70',
    dot: 'bg-green-600',
    glowDot: 'bg-green-600 shadow-[0_0_12px_rgba(22,163,74,0.8)]',
    activeBorder: 'border-green-600',
    activeBg: 'bg-green-600/10',
  },
  'BUY': {
    verdictText: 'YES',
    status: 'undervalued',
    color: 'text-emerald-600',
    subtextColor: 'text-emerald-600/70',
    dot: 'bg-emerald-600',
    glowDot: 'bg-emerald-600 shadow-[0_0_12px_rgba(5,150,105,0.8)]',
    activeBorder: 'border-emerald-600',
    activeBg: 'bg-emerald-600/10',
  },
  'HOLD': {
    verdictText: 'HOLD',
    status: 'fair price',
    color: 'text-blue-400',
    subtextColor: 'text-blue-500/70',
    dot: 'bg-blue-500',
    glowDot: 'bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)]',
    activeBorder: 'border-blue-500',
    activeBg: 'bg-blue-500/10',
  },
  'OVERVALUED': {
    verdictText: 'NO',
    status: 'overvalued',
    color: 'text-red-400',
    subtextColor: 'text-red-500/70',
    dot: 'bg-red-500',
    glowDot: 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]',
    activeBorder: 'border-red-500',
    activeBg: 'bg-red-500/10',
  },
};

// ── AI Impact Badge Styling ──

export const AI_IMPACT_BADGE: Record<string, string> = {
  TAILWIND: 'border-emerald-600 text-emerald-600 bg-emerald-600/10',
  DISRUPTION_RISK: 'border-amber-500 text-amber-400 bg-amber-500/10',
  NEUTRAL: 'border-amber-500 text-amber-400 bg-amber-500/10',
};

// ── Tag Filter Definitions (derived from RATING_DEFS) ──

export interface TagDef {
  tag: string;
  label: string;
  color: string;
  activeBorder: string;
  activeBg: string;
  dot: string;
}

export const TAG_DEFS: TagDef[] = [
  ...(['STRONG BUY', 'BUY', 'HOLD', 'OVERVALUED'] as RatingKey[]).map(key => {
    const r = RATING_DEFS[key];
    return { tag: key, label: key, color: r.color, activeBorder: r.activeBorder, activeBg: r.activeBg, dot: r.dot };
  }),
  { tag: 'TAILWIND', label: 'AI TAILWIND', color: 'text-emerald-600', activeBorder: 'border-emerald-600', activeBg: 'bg-emerald-600/10', dot: 'bg-emerald-600' },
  { tag: 'DISRUPTION_RISK', label: 'AI RISK', color: 'text-orange-400', activeBorder: 'border-orange-500', activeBg: 'bg-orange-500/10', dot: 'bg-orange-500' },
];

// ── Stock Groups ──

export type StockGroup = 'PRIME_GROWTH' | 'TURBO_GROWTH' | 'WATCH_LIST' | 'AVOID';

export const GROUP_ORDER: StockGroup[] = ['PRIME_GROWTH', 'TURBO_GROWTH', 'WATCH_LIST', 'AVOID'];

export const GROUP_META: Record<StockGroup, { label: string; accent: string; border: string; bg: string; desc: string }> = {
  PRIME_GROWTH: {
    label: 'PRIME GROWTH',
    accent: 'text-emerald-600',
    border: 'border-emerald-600/40',
    bg: 'bg-emerald-600/5',
    desc: 'Large Cap \u00b7 Strong Valuation \u00b7 High or Rising Momentum',
  },
  TURBO_GROWTH: {
    label: 'TURBO GROWTH',
    accent: 'text-fuchsia-400',
    border: 'border-fuchsia-500/40',
    bg: 'bg-fuchsia-500/5',
    desc: 'Growth Cap \u00b7 Compelling Value \u00b7 High or Rising RS',
  },
  WATCH_LIST: {
    label: 'WATCH LIST',
    accent: 'text-slate-400',
    border: 'border-slate-600/40',
    bg: 'bg-slate-500/5',
    desc: 'Monitoring \u00b7 Criteria Not Met',
  },
  AVOID: {
    label: 'AVOID',
    accent: 'text-red-400',
    border: 'border-red-500/40',
    bg: 'bg-red-500/5',
    desc: 'Overvalued \u00b7 Negative Base-Case Upside',
  },
};

// ── Scenario Weights ──

export const SCENARIO_WEIGHTS = { BEAR: 0.25, BASE: 0.50, BULL: 0.25 } as const;

export function weightedScenarioAverage(bear: number, base: number, bull: number): number {
  return bear * SCENARIO_WEIGHTS.BEAR + base * SCENARIO_WEIGHTS.BASE + bull * SCENARIO_WEIGHTS.BULL;
}

// ── Display Constants ──

export const SPLASH_DURATION_MS = 3000;

// ── Scenario Configuration ──

const SCENARIO_META: Record<ScenarioType, { label: string; color: string; bg: string }> = {
  [ScenarioType.BEAR]: { label: 'CONSERVATIVE', color: '#ef4444', bg: 'bg-red-500/10' },
  [ScenarioType.BASE]: { label: 'NEUTRAL',      color: '#3b82f6', bg: 'bg-blue-500/10' },
  [ScenarioType.BULL]: { label: 'AGGRESSIVE',   color: '#ff007f', bg: 'bg-pink-500/10' },
};

// ── Build TICKERS and CONFIGS from stock files ──

export const TICKERS: Record<string, TickerDefinition> = {};
export const CONFIGS: Record<string, Record<ScenarioType, ScenarioConfig>> = {};

Object.keys(ALL_STOCKS).forEach(tickerId => {
  const stock = ALL_STOCKS[tickerId];
  const s = stock.scenarios;

  TICKERS[tickerId] = {
    ...stock,
    basePrice: stock.currentPrice
  };

  CONFIGS[tickerId] = Object.fromEntries(
    Object.values(ScenarioType).map(type => [
      type,
      {
        ...SCENARIO_META[type],
        revGrowth: s.revGrowth[type],
        fcfMargin: s.fcfMargin[type],
        termGrowth: s.termGrowth[type],
        exitMultiple: s.exitMultiple[type],
        waccAdj: s.waccAdj?.[type],
        desc: s.desc[type],
        thesis: s.thesis?.[type],
        drivers: s.drivers[type],
        epsCagr: s.epsCagr?.[type],
        exitPE: s.exitPE?.[type],
        prob: s.prob?.[type],
      } satisfies ScenarioConfig,
    ])
  ) as Record<ScenarioType, ScenarioConfig>;
});

import { defineStock } from './defineStock';

export const VRT = defineStock({
  ticker: 'VRT',
  name: 'Vertiv Holdings Co',
  sector: 'Electrical Equipment / Data Center Power & Cooling',
  themeColor: '#0a9396',
  updatedOn: '06/28',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 305,
  fairPriceRange: '$300 - $500',
  shares0: 385,           // ~381M shares + dilution; mkt cap ~$118B
  rev25: 10200,           // FY2025 revenue $10.2B (+28% YoY)
  fcfMargin25: 0.12,
  taxRate: 0.20,
  cash: 1500,
  debt: 3000,
  beta: 1.6,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 6.35,          // FY2026E adjusted EPS guidance midpoint ($6.30-$6.40, raised at Q1 2026)
  rsRating: 96,           // Estimated — stock tripled over the past year, near highs
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',

  reasonsToBuy: [
    'Pure-play picks-and-shovels beneficiary of AI data-center buildout — power, thermal management, and liquid cooling all in demand',
    'Enormous and growing backlog gives multi-year revenue visibility as hyperscaler capex scales',
    'Operating margins expanding rapidly as volume leverage and pricing flow through, with management repeatedly raising guidance',
    'Liquid-cooling and high-density power leadership positions Vertiv at the center of the GPU thermal-management shift',
    'Analyst targets sit above the current price — the Street still sees upside despite the run',
  ],

  risksToBuy: [
    'Richly valued at a high earnings multiple — priced for sustained hypergrowth, so any deceleration re-rates hard',
    'Revenue is a derivative of hyperscaler AI capex; a spending pause or digestion phase would hit orders sharply',
    'Intensifying competition in cooling and power from Schneider, Eaton, and a wave of liquid-cooling specialists',
    'Supply-chain and component constraints could cap how fast the backlog converts to revenue',
    'High beta — the stock falls harder than the market in any AI-capex scare',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 300, targetMedian: 377, targetHigh: 500, numAnalysts: 26 },

  epsCagr: [12, 20, 28],
  exitPE: [22, 30, 40],
  prob: [25, 50, 25],

  revGrowth: [
    [0.18, 0.14, 0.10, 0.08, 0.06],   // Bear: AI capex digestion slows orders
    [0.32, 0.24, 0.18, 0.14, 0.11],   // Base: guided ~33% FY2026, decelerating
    [0.38, 0.30, 0.24, 0.20, 0.16],   // Bull: liquid-cooling super-cycle, backlog compounds
  ],
  fcfMargin: [
    [0.10, 0.11, 0.12, 0.12, 0.13],
    [0.12, 0.14, 0.15, 0.16, 0.17],
    [0.14, 0.16, 0.18, 0.19, 0.20],
  ],
  exitMultiple: [16, 22, 30],
  termGrowth: [0.02, 0.03, 0.035],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.18, 0.24, 0.30],
  bullMaOptVal: false,

  desc: [
    'AI data-center capex digests after a torrid build-out; hyperscalers pause orders and backlog conversion slows. Competition from Schneider and Eaton compresses pricing. ' +
      'EPS compounds ~12% from the FY2026E $6.35 base and the rich multiple re-rates toward ~22x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
    'Vertiv delivers on its raised FY2026 guidance (~33% revenue growth, ~$6.35 adjusted EPS) and decelerates gracefully as the backlog converts. Liquid cooling and high-density power scale with GPU deployments; margins keep expanding. ' +
      'EPS compounds ~20% from the $6.35 base while the multiple normalizes toward ~30x as growth matures. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A premier AI-infrastructure compounder — already priced for a lot, but the backlog backs it.',
    'Liquid-cooling becomes the default for GPU racks and Vertiv captures the thermal-management standard; backlog compounds faster than expected and operating leverage drives margins higher. ' +
      'EPS compounds ~28% from the $6.35 base and the market sustains a premium ~40x multiple. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: Vertiv is a leveraged play on hyperscaler AI capex — a derivative of a derivative. If GPU deployments enter a digestion phase, orders and backlog conversion slow fast. ' +
      'At a high-30s/40s earnings multiple, the stock prices in years of uninterrupted growth, so even a modest air-pocket triggers severe compression. High beta amplifies the drawdown. At {spot}, the margin of safety is thin.',
    'The operating story is excellent: AI data centers need power and cooling, Vertiv leads in both, the backlog gives multi-year visibility, margins are expanding, and guidance keeps rising. ' +
      'Unlike the richly-valued storage names, the consensus target sits above {spot}, so the Street still sees upside. The catch is valuation — you are paying a premium multiple for a cyclical-capex beneficiary. Verdict: BUY — own the AI-infrastructure leader, but size for the volatility.',
    'The bull case: liquid cooling becomes mandatory for next-gen GPU racks and Vertiv owns the thermal-and-power stack at hyperscale. The backlog compounds, operating leverage lifts margins, and the market keeps paying a premium for the clearest AI-infrastructure pure-play. ' +
      '{target} is achievable if the capex super-cycle runs for years. Probability 25% — requires AI spending to stay torrid without a digestion phase.',
  ],

  burry: {
    sbc: 150,
    gaapNi: 1330,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 40,
    overstatementSource: 'estimated',
    note: 'Estimated. SBC ~$150M vs FY25 GAAP NI ~$1.33B = ~11% naive, but the ~3x stock run over the past year amplifies the MTM owner-earnings cost into the Critical tier. Vertiv pays a small dividend and is not yet a meaningful net share reducer. Refresh with the 10-K SBC line.',
  },

  debtSafety: {
    netDebt: 1500,
    ebitda: 3400,
    fy: 'FY25',
    note: 'GREEN. Net debt ~$1.5B vs EBITDA ~$3.4B (FY26E op margin 23.3% on ~$13.75B) => leverage ~0.4x. Strong and growing cash generation; balance sheet is not the risk — AI-capex cyclicality is.',
  },
});

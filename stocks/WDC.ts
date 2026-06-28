import { defineStock } from './defineStock';

export const WDC = defineStock({
  ticker: 'WDC',
  name: 'Western Digital Corporation',
  sector: 'Data Storage / HDD & AI Infrastructure',
  themeColor: '#0073cf',
  updatedOn: '06/28',
  lastReportTag: 'Q3 FY26',
  dataReviewedOn: '2026-06-28',
  currentPrice: 603.96,   // Jun 26 2026; ATH $746 on Jun 18
  fairPriceRange: '$360 - $700',
  shares0: 345,
  rev25: 13000,           // HDD-only post-Sandisk spinoff; recent run-rate ~$13-14B (Q3 FY26 $3.34B, Q4 guide $3.65B)
  fcfMargin25: 0.18,
  taxRate: 0.15,
  cash: 2000,
  debt: 7000,
  beta: 1.9,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 13.00,         // FY2027E non-GAAP EPS est. — Q3 FY26 $2.72, Q4 FY26 guide $3.25 (run-rate ~$13); HDD up-cycle but cyclical
  rsRating: 92,           // Estimated — ran to an all-time high on the AI-storage wave
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD', // Pins HOLD like the HDD peer STX: AI-storage demand is real but the stock is richly valued at a cyclical-peak multiple and trades above the analyst target. Wait for a pullback.

  reasonsToBuy: [
    'AI data creation is driving a structural surge in demand for mass-capacity nearline HDD, where supply is tight',
    'HDD is a rational duopoly (with Seagate) — disciplined supply supports pricing and margins through the up-cycle',
    'Hyperscalers remain locked into HDD for cold/warm storage; flash cost-parity is many years away',
    'Post-Sandisk spinoff, Western Digital is a cleaner, focused HDD pure-play with improving margins',
    'Free cash flow is real and growing, and the company restored and raised its dividend',
  ],

  risksToBuy: [
    'Richly valued at a high multiple on cyclical-peak earnings — the analyst target sits below the current price',
    'HDD is deeply cyclical — any AI-capex digestion or oversupply triggers sharp pricing and margin reversals',
    'Stock ran to an all-time high then pulled back, leaving little margin of safety after the parabolic move',
    'NAND/flash cost-per-bit improvement could encroach on warm-storage use cases faster than expected',
    'High beta means outsized drawdowns in any risk-off or AI-spending scare',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 360, targetMedian: 554, targetHigh: 685, numAnalysts: 22 },

  epsCagr: [4, 10, 16],
  exitPE: [10, 14, 20],
  prob: [30, 45, 25],

  revGrowth: [
    [0.02, 0.02, 0.02, 0.02, 0.02],   // Bear: cycle rolls over, pricing pressure returns
    [0.10, 0.08, 0.06, 0.05, 0.04],   // Base: AI nearline demand sustains a moderate up-cycle
    [0.18, 0.14, 0.11, 0.09, 0.07],   // Bull: durable AI-storage super-cycle, tight supply holds pricing
  ],
  fcfMargin: [
    [0.12, 0.12, 0.13, 0.13, 0.14],
    [0.17, 0.18, 0.19, 0.20, 0.20],
    [0.20, 0.22, 0.23, 0.24, 0.25],
  ],
  exitMultiple: [8, 12, 16],
  termGrowth: [0.015, 0.02, 0.025],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.20, 0.26, 0.32],
  bullMaOptVal: false,

  desc: [
    'The HDD cycle rolls over — AI-capex digestion and supply additions return the industry to its boom-bust playbook. Pricing and margins compress, and the market reprices WDC as a cyclical at a trough multiple (~10x). ' +
      'EPS compounds only ~4% from the FY2027E $13.00 base. 5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30% — elevated given the parabolic run.',
    'AI nearline demand sustains a moderate, multi-year up-cycle and the HDD duopoly stays disciplined. EPS compounds ~10% from the $13.00 base, but the multiple normalizes from today\'s ~40x peak toward a mid-cycle ~14x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. The business is genuinely better, but at {spot} you are paying a peak multiple on peak earnings.',
    'AI data growth makes mass-capacity HDD a durable infrastructure line item; tight supply and HAMR-class density sustain pricing power for years. EPS compounds ~16% from the $13.00 base and the market awards a structurally higher ~20x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: HDD has always been cyclical — supply expands into strong demand, then pricing collapses. At ~40x peak earnings after a run to all-time highs, WDC prices in a permanent up-cycle. ' +
      'Any AI-capex pause or flash encroachment reverses pricing fast, and the multiple de-rates to single digits. High beta deepens the drawdown. At {spot}, the risk/reward is asymmetric to the downside.',
    'The AI-storage demand is real: exabytes of training and inference data need cheap mass storage, and HDD remains far cheaper than flash at scale. WDC is a focused, better-margin pure-play post-Sandisk in a disciplined duopoly. ' +
      'But the stock ran to an all-time high and now trades above the consensus target ($554) at a cyclical-peak multiple. Like Seagate, being right on the business does not mean being right on the entry. Verdict: HOLD — a pullback toward the low-$400s shifts the setup toward BUY.',
    'The bull case: AI makes mass-capacity HDD a perpetual hyperscaler capex line, tight supply and density leadership sustain pricing, and the market awards HDD a structurally higher multiple. ' +
      '{target} is achievable if the up-cycle proves durable. Probability 25% — requires both demand and supply discipline to hold for years, against HDD\'s cyclical history.',
  ],

  burry: {
    sbc: 300,
    gaapNi: 2500,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY26 run-rate',
    overstatementPct: 45,
    overstatementSource: 'estimated',
    note: 'Critical. SBC ~$300M vs core GAAP NI ~$2.5B = ~12% naive, but the run to an all-time high amplifies the MTM owner-earnings cost (mirrors the HDD peer STX at ~45%). Minimal buyback to offset. Refresh with reported FY26 figures.',
  },

  debtSafety: {
    netDebt: 5000,
    ebitda: 5000,
    capexToOcf: 0.18,
    interestCoverage: 8,
    altmanZ: 3.2,
    fy: 'FY26',
    note: 'GREEN. Net debt ~$5B vs EBITDA ~$5B => leverage ~1.0x, within the 2x threshold. Cash ~$2B vs gross debt ~$7B. Manageable at current cycle earnings; the real risk is HDD cyclicality, not leverage.',
  },
});

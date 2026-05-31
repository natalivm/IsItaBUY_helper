import { defineStock } from './defineStock';

export const LMT = defineStock({
  ticker: 'LMT',
  name: 'Lockheed Martin Corp.',
  sector: 'Aerospace & Defense',
  themeColor: '#4b8ef5',
  currentPrice: 534.20,
  updatedOn: '05/31',
  lastReportTag: 'Q1 2026',
  fairPriceRange: '$455 - $830',
  shares0: 228,
  rev25: 72600,
  fcfMargin25: 0.085,
  taxRate: 0.17,
  cash: 3000,
  debt: 18500,
  beta: 0.52,
  costDebt: 0.045,
  rsRating: 79,
  rsTrend: 'rising',
  ratingOverride: 'BUY',
  aiImpact: 'NEUTRAL',

  strategicNarrative:
    "Lockheed Martin is the dominant defense prime contractor — F-35, missile defense, classified aerospace, hypersonics, and strategic weapons systems. Despite clear geopolitical tailwinds (NATO budget expansion, Indo-Pacific buildup, Middle East), LMT underperformed higher-growth defense names as F-35 procurement timing created near-term FCF pressure and capital rotated into missile suppliers, drone companies, and AI-defense plays. " +
    "At $534, the setup is attractive: $6.2B FCF at 8.5% margin with ~17% base-case upside to ~$625 (in line with analyst consensus), and WACC of just 7.1% (beta 0.52) — one of the strongest structural discount-rate advantages in the defense sector. Unlike KRMN or speculative defense names, valuation is anchored in decades of entrenched government relationships and a backlog that stretches years forward. Pristine Burry profile (SBC 9% of NI, buybacks 5× SBC).",

  verdictNarrative:
    "Lockheed Martin currently looks materially more attractive on a risk-adjusted basis than many speculative defense names that have rallied over the past year. Unlike KRMN or ONDS, the valuation is supported by enormous existing cash flows, entrenched defense programs, and decades-long government relationships. The company also benefits from some of the strongest geopolitical tailwinds in the industrial sector — NATO spending acceleration, Indo-Pacific buildup, and sustained US missile defense investment. " +
    "The key difference vs. RTX is valuation. RTX already rerated significantly as commercial aerospace recovered, while LMT still trades at a relatively modest multiple despite improving defense spending visibility. Base-case target of ~$625 aligns with analyst consensus median ($610), with bull upside to ~$830 if NATO spending and hypersonics programs fully materialize. Low beta (0.52), Pristine SBC metrics, and a rising RS profile — LMT qualifies as a BUY under the framework. " +
    "For investors seeking defense exposure without paying venture-style growth multiples, LMT is one of the strongest risk-adjusted setups in the sector right now. Add on weakness; the low beta means drawdowns are shallower than most defense names.",

  modelType: 'EPS_PE',
  baseEps: 27.2,       // LTM FCF/share ($6.2B / 228M shares)
  epsCagr: [2, 5, 10],
  exitPE: [15, 18, 19],
  prob: [25, 50, 25],

  revGrowth: [
    [0.02, 0.02, 0.02, 0.02, 0.02],
    [0.05, 0.05, 0.05, 0.04, 0.04],
    [0.08, 0.08, 0.07, 0.07, 0.06],
  ],
  fcfMargin: [
    [0.08, 0.08, 0.08, 0.08, 0.08],
    [0.085, 0.09, 0.095, 0.10, 0.10],
    [0.09, 0.10, 0.11, 0.11, 0.12],
  ],
  exitMultiple: [10, 13, 16],
  termGrowth: [0.015, 0.025, 0.030],
  waccAdj: [0.008, 0, -0.008],
  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.13, 0.17, 0.22],
  bullMaOptVal: false,

  desc: [
    'F-35 procurement delays and Pentagon cost scrutiny slow LMT to 2% revenue CAGR. FCF margins stall at 8% as program timing headwinds persist. Multiple compresses to 15× as defense budget uncertainty clouds near-term visibility. Bear target ~$455.',
    'NATO spending and Indo-Pacific buildup sustain 5% revenue CAGR. Missile defense, hypersonics, and classified programs add durable growth vectors. FCF margins expand from 8.5% to 10% on operating leverage. Multiple holds at 18×. Base target ~$625 — in line with analyst consensus.',
    'Defense budget acceleration and prime contract consolidation drives 10% FCF CAGR. Hypersonics, next-gen interceptors, and multi-domain classified programs push FCF margins toward 12%. Multiple expands to 19×. Bull target ~$830.',
  ],

  analystConsensus: { rating: 'Moderate Buy', targetLow: 480, targetMedian: 610, targetHigh: 700, numAnalysts: 19 },

  burry: {
    sbc: 600,
    gaapNi: 6900,
    buyback: 3000,
    epsBasis: 'GAAP',
    fy: 'LTM',
    overstatementPct: 9,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC $600M is 8.7% of GAAP NI $6.9B. Buybacks ~5× SBC. One of the cleanest large-cap SBC profiles in the defense sector.',
  },

  debtSafety: {
    netDebt: 15500,
    ebitda: 9500,
    fy: 'LTM',
    note: 'Net leverage ~1.6× EBITDA — manageable for a defense prime with highly visible multi-year government contract cash flows.',
  },
});

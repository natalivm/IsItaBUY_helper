import { defineStock } from './defineStock';

export const AZO = defineStock({
  ticker: 'AZO',
  name: 'AutoZone',
  sector: 'Specialty Retail',
  themeColor: '#e74c3c',
  updatedOn: '07/24',
  lastReportTag: 'Q2 FY26',
  currentPrice: 2957.41,
  shares0: 16.6,
  rev25: 17500,
  fcfMargin25: 0.10,
  taxRate: 0.23,
  cash: 350,
  debt: 8500,
  beta: 0.80,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 144.9,
  rsRating: 16,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  reasonsToBuy: [
    'Mega-Hub density investment is a deliberate operating leverage setup — management guides EBIT acceleration in coming years',
    'Commercial segment gaining consistent market share with durable above-market growth rates',
    'Decades-long buyback program has retired the vast majority of shares outstanding, compounding per-share value structurally',
    'Auto parts demand is highly recession-resistant — older vehicle fleet and DIY maintenance insulate revenue in downturns',
    'Pricing power and inventory breadth create a distribution moat that newer entrants cannot quickly replicate',
  ],

  risksToBuy: [
    'Heavy capital expenditure in the current investment cycle is depressing near-term FCF and earnings visibility',
    'Same-store traffic declined recently, raising questions about whether the demand acceleration thesis will materialize',
    'Commercial mix shift toward professional installers compresses gross margin relative to the higher-margin DIY segment',
    'Significant structural debt load from systematic leveraged buybacks could become a constraint if rates stay elevated',
    'RS rating shows severe institutional distribution — the market is not yet rewarding the long-term thesis',
  ],

  epsCagr: [7, 12, 15],
  exitPE: [18, 22, 24],
  prob: [20, 45, 35],

  revGrowth: [
    [0.05, 0.04, 0.035, 0.03, 0.03],
    [0.08, 0.075, 0.07, 0.065, 0.06],
    [0.09, 0.085, 0.08, 0.075, 0.07],
  ],
  fcfMargin: [
    [0.07, 0.075, 0.08, 0.08, 0.08],
    [0.08, 0.09, 0.10, 0.11, 0.115],
    [0.09, 0.10, 0.115, 0.125, 0.13],
  ],
  exitMultiple: [12, 15, 18],
  desc: [
    'Investment cycle fails to generate expected returns. Over-expansion dilutes ROIC, commercial mix compresses margins structurally. ' +
      'Traffic declines persist, macro pressure stalls SSS. LIFO headwinds extend beyond FY26. EPS compounds at ~7%. P/E compresses to 18x — historical trough.',
    'FY26 investment phase completes on plan. Mega-Hub density drives operating leverage in FY27–28, EBIT accelerates as guided. ' +
      'Commercial continues gaining share at +9–10% pace. LIFO normalizes. Ex-LIFO EPS trajectory of 12% CAGR holds through the cycle. P/E stabilizes at 22x — historical median.',
    'Mega-Hub strategy beats expectations — store productivity ramps faster than modeled. Commercial accelerates to +12–15%, international gains traction. ' +
      'FY27 EBIT inflection becomes visible to the market; RS re-rates sharply. 15% EPS CAGR sustained. Market assigns 24x on proven execution. Target ~$7,000–7,500.',
  ],

  termGrowth: [0.015, 0.02, 0.025],
  bbRate: [0.03, 0.04, 0.05],
  ebitdaProxy: [0.20, 0.22, 0.24],
  bullMaOptVal: false,
  debtSafety: {
    netDebt: 8150,
    ebitda: 3500,
    capexToOcf: 0.18,
    interestCoverage: 6.5,
    altmanZ: 3.6,
    fy: 'FY25',
    note: 'Intentional leverage — AZO has systematically borrowed to fund buybacks for 25+ years, retiring 90%+ of shares outstanding. At 2.3× EBITDA with strong interest coverage and predictable auto-parts cash flows, this is a capital allocation strategy, not distress.',
  },
});

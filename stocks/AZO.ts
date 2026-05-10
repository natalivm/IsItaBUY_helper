import { defineStock } from './defineStock';

export const AZO = defineStock({
  ticker: 'AZO',
  name: 'AutoZone',
  sector: 'Specialty Retail',
  themeColor: '#e74c3c',
  updatedOn: '05/08',
  currentPrice: 3496.19,
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
  rsRating: 52,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "Q2 FY26 earnings reframe AZO: this is no longer just a mature cash machine — it's a structural compounder in an active investment phase. " +
    "Sales +8.1%, commercial +9.8%, with 10 of 12 quarter weeks tracking ~12% before a weather-driven dip. Management guided top-line and EBIT to accelerate in FY27–28 as Mega-Hub density pays off. " +
    "The $277M LIFO charge and $1.6B CapEx are FY26-specific — not structural margin degradation. Ex-LIFO EBIT grew +7.2%. " +
    "FY26 is the investment year; FY27–28 are the operating leverage years. " +
    "Key risks: over-investment diluting returns, commercial mix pressuring gross margin, Mexico weakness, traffic -3.6%. " +
    "RS Rating 28 — the market isn't buying the acceleration story yet. Either early accumulation zone or value trap; breakout not confirmed.",

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

  burry: {
    sbc: 50,
    gaapNi: 2500,
    buyback: 1600,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 8,
    overstatementSource: 'estimated',
    note: 'Pristine — quintessential Burry-approved capital allocator. Naive SBC/NI just 2% (estimated SBC ~$50M vs FY25 GAAP NI $2.5B). Tiny 16.6M-share float compressed by relentless multi-decade buyback ($1.6B FY25). SBC is structurally minimal for a capital-light auto parts retailer.',
  },
});

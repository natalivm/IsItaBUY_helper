import { defineStock } from './defineStock';

export const DASH = defineStock({
  ticker: 'DASH',
  name: 'DoorDash, Inc.',
  sector: 'Internet / Consumer Logistics',
  themeColor: '#ff3008',
  currentPrice: 156.8,
  updatedOn: '06/05',
  lastReportTag: 'Q1 2026',
  fairPriceRange: '$120 - $215',
  shares0: 430,
  rev25: 13700,
  fcfMargin25: 0.131,
  taxRate: 0.18,
  cash: 4400,
  debt: 2700,
  beta: 1.60,
  costDebt: 0.048,
  rsRating: 16,
  ratingOverride: 'BUY',
  aiImpact: 'TAILWIND',
  strategicNarrative: "DoorDash is an execution compounder — $13.7B revenue and $935M GAAP net income in FY2025. Q1 2026 (reported May 6): revenue $4.0B (+33% YoY), GOV $31.6B (+37%), EPS $0.42 (beat est. $0.37 by 13.5%), record MAUs and memberships. Revenue missed consensus by ~3% but EPS beat on operating leverage. Three EPS levers above consensus: NV unit economics positive 2H'26, ads at 2× advertisers / 3× spend, and tech stack consolidation (3→1). Thesis is execution-driven earnings growth, not P/E rerating.",


  verdictNarrative:
    'The fundamental growth story is real — Q1 2026 revenue +33%, GOV +37%, EPS beat of 13.5%, record MAUs and memberships. Analyst consensus is Strong Buy with a median target of $278 (+75% from $159). ' +
    'Two structural concerns temper the conviction. First, RS Rating of 16 is exceptionally weak — the stock has been a significant underperformer even as the business accelerates. Price momentum this weak often signals institutional distribution or macro headwinds that the income statement does not yet show. ' +
    'Second, the Burry flag is Tragic: SBC of $1.35B exceeds GAAP NI of ~$925M. Shareholders are funding growth through dilution. Until buybacks scale to meaningfully offset SBC, reported earnings overstate true per-share value. ' +
    'BUY with conditions. The entry price of $159 sits in the middle of the $120–$215 fair range, and the 23.8% base-case revenue CAGR supports meaningful upside. Add in tranches — do not chase strength. A sustained RS recovery above 50 would significantly increase conviction.',

  analystConsensus: { rating: 'Strong Buy', targetLow: 222, targetMedian: 278, targetHigh: 360, numAnalysts: 33 },
  revGrowth: [
    [0.14, 0.13, 0.13, 0.12, 0.12],
    [0.238, 0.238, 0.238, 0.238, 0.238],
    [0.25, 0.24, 0.23, 0.22, 0.20],
  ],
  fcfMargin: [
    [0.045, 0.055, 0.065, 0.075, 0.087],
    [0.055, 0.075, 0.095, 0.110, 0.125],
    [0.065, 0.085, 0.105, 0.125, 0.145],
  ],
  exitMultiple: [18, 25, 30],
  desc: [
    'Revenue growth slows to 12-14%, margin stalls ~12% EBIT. Multiple compresses to 20x. EPS ~$8.5.',
    'TIKR consensus: 23.8% revenue CAGR, margin ramp to ~20% EBIT by 2030. EPS ~$13.7 at 25x.',
    'All three levers fire: NV margin ≥8%, ads ≥6% of revenue, tech stack savings. EPS ≥$17.5.',
  ],

  termGrowth: [0.025, 0.035, 0.04],
  waccAdj: [0.015, 0, -0.01],
  bbRate: [0.005, 0.015, 0.01],
  ebitdaProxy: [0.15, 0.20, 0.25],
  bullMaOptVal: 180 * 430 * 0.05,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
    },
  ],

  debtSafety: {
    netDebt: -1700,
    ebitda: 2100,
    fy: 'FY25',
    note: 'Net cash — $4.4B cash vs $2.7B debt = $1.7B net cash. No leverage concern.',
  },

  burry: {
    sbc: 1350,
    gaapNi: 925,
    buyback: 400,
    epsBasis: 'GAAP',
    fy: 'FY25 / Q1 2026',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'SBC $1.35B (2026 guidance midpoint) exceeds LTM GAAP NI ~$925M (146% naive ratio) — reported earnings are effectively zero once stock compensation is treated as a real cash cost. MTM amplifier modest (~1.5×) but the ratio caps at 100%. Buybacks ($400M) are only 0.30× SBC — insufficient offset. Tragic tier: a Burry-framework investor sees no real earnings here.',
  },
});

import { defineStock } from './defineStock';

export const RBRK = defineStock({
  updatedOn: '04/03',
  ticker: 'RBRK',
  name: 'Rubrik',
  sector: 'Data Security',
  themeColor: '#22d3ee',
  currentPrice: 51.44,
  fairPriceRange: '$35 - $100',
  shares0: 201.0,
  rev25: 1281,
  fcfMargin25: 0.155,
  taxRate: 0.20,
  cash: 1600,
  debt: 1100,
  beta: 1.25,
  rsRating: 13,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Rubrik is a platform-shaped data security play — subscription ARR $1.35B (+34%), NRR >120%, record FCF, with security modules driving >40% NRR and Identity adding net-new CISO budget access. " +
    "Moat is in integrated execution: high switching costs (resilience + identity + telemetry), regulatory tailwind (DORA/NIS2/SEC disclosure), and cloud ARR at 87% of subscription (+53% YoY). " +
    "The problem: RS 10 signals zero institutional momentum, FY27 material-rights headwind creates headline slowdown risk, and at current price prob-weighted CAGR is ~14.5% nominal / ~11-12% risk-adjusted. " +
    "If ARR sustains >20% and market pays >25x FCF, this is a cyber resilience compounder. If NRR normalizes and FY27 GAAP noise triggers a sell-off, there's -30-50% path risk to ~$27. " +
    "Best entry likely after a compression event — bet on execution + structural cyber trend, not current momentum.",

  // Revenue growth: starts elevated (ARR +34% momentum) then decelerates
  // Bear CAGR ~12%, Base ~18%, Bull ~24%

  analystConsensus: { rating: 'Strong Buy', targetLow: 97, targetMedian: 107, targetHigh: 130, numAnalysts: 18 },
  revGrowth: [
    [0.16, 0.14, 0.12, 0.10, 0.08],      // Bear: NRR normalizes, net new ARR disappoints
    [0.24, 0.21, 0.18, 0.15, 0.12],      // Base: ARR decelerates to low-20s then teens
    [0.30, 0.27, 0.24, 0.21, 0.18],      // Bull: ARR sustains 25-30% then 20%+
  ],

  // FCF margin progression: currently ~15.5%, operating leverage drives expansion
  // Non-GAAP gross margin already 83%, ARR contribution margin improved ~1400bps YoY
  fcfMargin: [
    [0.13, 0.13, 0.14, 0.14, 0.15],      // Bear: margin stalls at current levels
    [0.155, 0.17, 0.19, 0.20, 0.22],      // Base: steady expansion to 22%
    [0.16, 0.19, 0.22, 0.25, 0.28],      // Bull: best-in-class scaling to 28%
  ],

  // EBITDA exit multiples for quality security SaaS
  exitMultiple: [15, 22, 30],

  ebitdaProxy: [0.18, 0.26, 0.35],

  desc: [
    'NRR normalizes faster than expected; FY27 material-rights headwind triggers multiple compression; net new ARR lumpy and below consensus.',
    'ARR decelerates to low-20s; NRR slides to ~112–115%; FY27 GAAP slowdown pressures multiple despite healthy underlying subscription business.',
    'Subscription ARR sustains 25–30% growth; NRR holds >118%; Identity + security modules expand TAM into CISO/IAM budgets; FCF margin scales to best-in-class.',
  ],

  thesis: [
    'Growth halving + multiple compression can deliver -30–50% downside even without business breakdown. FY27 accounting noise amplifies the sell-off.',
    'Solid 8–12% stock CAGR — good business that may "tread water" as GAAP reported revenue creates headline risk the market punishes.',
    'Platform expansion (Identity net-new buyers, security modules >40% NRR) drives 15%+ CAGR even without multiple expansion. FCF inflection is the catalyst.',
  ],

  prob: [25, 45, 30],
  bbRate: [0.005, 0.01, 0.015],
  bullMaOptVal: true,
});

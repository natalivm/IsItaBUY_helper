import { defineStock } from './defineStock';

export const RBRK = defineStock({
  updatedOn: '06/11',
  ticker: 'RBRK',
  name: 'Rubrik',
  sector: 'Data Security',
  themeColor: '#22d3ee',
  currentPrice: 71.45,
  fairPriceRange: '$35 - $100',
  shares0: 201.0,
  rev25: 1281,
  fcfMargin25: 0.155,
  taxRate: 0.20,
  cash: 1600,
  debt: 1100,
  beta: 1.25,
  rsRating: 10,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Subscription ARR and high net revenue retention demonstrate a sticky, compounding recurring revenue base',
    'Security modules driving outsized NRR expansion into CISO budgets that are structurally growing year over year',
    'Regulatory tailwinds from DORA, NIS2, and SEC disclosure rules create a durable demand floor for cyber resilience',
    'Cloud ARR growing rapidly and now representing the vast majority of subscription revenue',
  ],

  risksToBuy: [
    'RS deeply negative with zero institutional momentum — the market is not yet sponsoring this story',
    'FY27 material-rights accounting headwind creates real headline revenue slowdown risk that could trigger a sell-off',
    'Adjusted FCF after SBC is actually negative — the cash flow positive headline is entirely accounting-driven',
    'SBC as a share of revenue is among the highest in our entire coverage universe, creating severe dilution',
    'Bear case downside is substantial even without a fundamental business breakdown — multiple compression alone does damage',
  ],

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

  burry: {
    sbc: 329,
    gaapNi: -350,
    buyback: 6,
    epsBasis: 'NON_GAAP',
    fy: 'FY26 LTM',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'Tragic — TIKR LTM shows RBRK is the rare stock where ADJUSTED FCF AFTER SBC IS ACTUALLY NEGATIVE: reported FCF $253M − SBC $329M = -$76M. SBC = 130% of reported FCF; the "cash flow positive" headline is fully accounting-driven (SBC addback). 25% of revenue is SBC — the highest in our verified coverage (tied with ZS at 24.6%). FY25 GAAP loss of -$1.1B was distorted by IPO compensation accounting (one-time spike), but underlying business remains GAAP-loss at -$350M LTM. Buybacks negligible at $6M (covers 2% of SBC). Diluted shares 60M (FY24) → 196M (LTM) = +225% (mostly IPO effects). Recent post-IPO dilution +27% in one year. 100% placeholder for loss-maker; would still register as deeply Tragic on any non-loss-maker scale. Worse profile than CRWD ($1B FCF before SBC adjustment becomes ~$200M after) because RBRK\'s baseline FCF doesn\'t even cover SBC.',
  },
});

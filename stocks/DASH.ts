import { defineStock } from './defineStock';

export const DASH = defineStock({
  ticker: 'DASH',
  name: 'DoorDash, Inc.',
  sector: 'Internet / Consumer Logistics',
  themeColor: '#ff3008',
  currentPrice: 196.5,
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  fairPriceRange: '$172 - $350',  // stockanalysis.com analyst target range, Oct 5 2026
  shares0: 430,
  rev25: 13700,        // FY2025; FY26E consensus $17.8B (+30%, incl. Deliveroo), FY27E $21.5B (+21%)
  fcfMargin25: 0.131,
  taxRate: 0.18,
  cash: 4400,          // FY25-era — NOT refreshed after the Deliveroo acquisition
  debt: 2700,          // FY25-era — NOT refreshed
  beta: 1.60,
  costDebt: 0.048,
  rsRating: 52,         // IBD RS per user, 10/10/2026 (was 24)
  rsTrend: 'rising',
  ratingOverride: 'BUY',  // Caps at BUY (kept at Q2 2026): the model reads BUY (~11% base CAGR) today, but a price dip would push it over the soft STRONG BUY line; SBC still exceeds GAAP NI (Tragic Burry tier) and GAAP profit fell 30% y/y, so BUY rather than STRONG BUY.
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 5, 2026) — first data review since Q1
  // ─────────────────────────────────────────────────────────────────────────
  // Orders 970M (+27%); Marketplace GOV $33.1B (+36%, incl. Deliveroo).
  // Adj. EBITDA $914M (+40%; 2.8% of GOV) vs $770-870M guide — better unit
  // economics + Deliveroo contribution. GAAP NI to common $200M (-30% y/y).
  // Q3 GUIDE: GOV $33.0-34.0B, adj. EBITDA $950M-1.1B. Q4 take rate to dip
  // on higher Dasher costs. FY26 SBC $1.2-1.3B, D&A $1.1-1.2B. Street: Buy
  // (45), PT $172-350 (median $260); FY26E EPS $5.87 / rev $17.8B, FY27E
  // $8.25 / $21.5B.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Dominant US delivery platform with record MAUs and memberships driving compounding network effects',
    'International expansion into new verticals offers a long growth runway beyond food delivery',
    'Ads business scaling rapidly with both advertiser count and spend growing at multiples of revenue',
    'New Verticals unit economics turning positive, adding a profitable growth leg beyond restaurant orders',
    'Tech stack consolidation from three platforms to one drives structural operating leverage ahead',
  ],

  risksToBuy: [
    'SBC dramatically exceeds GAAP net income, meaning reported profits substantially overstate true owner earnings',
    'GAAP profit fell sharply year over year even as volumes surged, and take rates face pressure from higher courier costs',
    'Grocery and convenience delivery is intensely competitive with well-funded rivals including Instacart and Uber Eats',
    'Integrating the Deliveroo acquisition adds execution risk across new European markets',
    'Thin delivery economics leave little margin buffer in a consumer spending slowdown or labor cost spike',
  ],

  verdictNarrative:
    'The fundamental growth story is real — Q2 2026 orders +27%, GOV +36% (incl. Deliveroo), adjusted EBITDA +40% and above guidance. Analyst consensus is Buy with a median target of $260 vs ~$197 today. ' +
    'Two structural concerns temper the conviction. First, momentum has only partly recovered (RS 52, up from the teens) and GAAP profit fell 30% y/y as the company invests and absorbs Deliveroo. ' +
    'Second, the Burry flag is Tragic: SBC of $1.35B exceeds GAAP NI of ~$925M. Shareholders are funding growth through dilution. Until buybacks scale to meaningfully offset SBC, reported earnings overstate true per-share value. ' +
    'BUY with conditions. At ~$197 the stock sits below the $260 median target and the base case supports meaningful upside. RS has now recovered above 50, as previously required for higher conviction — add in tranches, sized for the SBC drag.',

  analystConsensus: { rating: 'Buy', targetLow: 172, targetMedian: 260, targetHigh: 350, numAnalysts: 45 },  // stockanalysis.com, Oct 5 2026
  revGrowth: [
    [0.27, 0.12, 0.12, 0.11, 0.10],   // Bear: FY26 ~locked (incl. Deliveroo); competition + consumer slowdown after
    [0.30, 0.21, 0.18, 0.16, 0.14],   // Base: FY26/FY27 ≈ consensus $17.8B / $21.5B, then decelerating
    [0.31, 0.23, 0.22, 0.21, 0.19],   // Bull (+1%/yr revPrem): ads + new verticals + international scale
  ],
  fcfMargin: [
    [0.045, 0.055, 0.065, 0.075, 0.087],
    [0.055, 0.075, 0.095, 0.110, 0.125],
    [0.065, 0.085, 0.105, 0.125, 0.145],
  ],
  exitMultiple: [18, 25, 30],
  desc: [
    'Revenue growth slows to ~11-12% after the Deliveroo step-up, margin stalls ~12% EBIT, multiple compresses. 5yr target {target} ({cagr} annualized).',
    'Consensus path: revenue +30% in 2026 (incl. Deliveroo) and ~21% in 2027, then mid-teens; margin ramps toward ~20% EBIT by 2030. 5yr target {target} ({cagr} annualized).',
    'All three levers fire: new-vertical margins ≥8%, ads ≥6% of revenue, tech-stack savings. 5yr target {target} ({cagr} annualized).',
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
    sbc: 1250,          // FY26 SBC guide $1.2-1.3B (Q2 2026)
    gaapNi: 925,
    buyback: 400,
    epsBasis: 'GAAP',
    fy: 'FY25 / Q1 2026',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'SBC $1.35B (2026 guidance midpoint) exceeds LTM GAAP NI ~$925M (146% naive ratio) — reported earnings are effectively zero once stock compensation is treated as a real cash cost. MTM amplifier modest (~1.5×) but the ratio caps at 100%. Buybacks ($400M) are only 0.30× SBC — insufficient offset. Tragic tier: a Burry-framework investor sees no real earnings here.',
  },
});

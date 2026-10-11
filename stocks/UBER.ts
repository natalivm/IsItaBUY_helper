import { defineStock } from './defineStock';

export const UBER = defineStock({
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  ticker: 'UBER',
  name: 'Uber Technologies',
  sector: 'Mobility & Delivery Platform',
  themeColor: '#22c55e',
  currentPrice: 71.51,
  fairPriceRange: '$70 - $150',  // stockanalysis.com analyst target range (Oct 7 2026)
  shares0: 2040,           // 2.04B (stockanalysis, Oct 2026) — buybacks continue
  rev25: 52020,            // FY2025 actual $52.0B; revGrowth[0] = FY26 (consensus $57.9B, +11% — business-model changes cut ~8pts vs GB growth), FY27E $66.8B (+15%)
  fcfMargin25: 0.19,       // FY2025 FCF $9.8B / $52.0B rev = 18.8% (TTM Q2 2026 FCF $10.1B)
  taxRate: 0.21,
  cash: 9990,              // Jun 2026: cash + ST investments (net debt $4.74B per stockanalysis)
  debt: 14730,
  beta: 1.35,
  costDebt: 0.065,
  rsRating: 22,            // NOT refreshed — awaiting user RS (10/11/2026)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 5, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Gross bookings $58.0B (+24%, +22% cc), trips 3.9B (+18%), revenue $14.2B
  // (+12%; business-model changes cut ~8pts), adj. EBITDA $2.8B (+33%),
  // non-GAAP EPS $0.81 (+35%), FCF $2.8B — TTM FCF >$10B for the first time.
  // Q3 GUIDE: GB $58.25-60.25B (+18-22% cc), EPS $0.84-0.88, adj. EBITDA
  // $2.86-2.96B — slightly below consensus. Street: Buy (50), PT $70-150
  // (median $100.50); FY26E rev $57.9B / EPS $3.36, FY27E $66.8B / $4.42.
  // Stock $71.51 (~14× TTM FCF), down ~28% over 52 weeks on AV fears.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Uber One\'s loyalty ecosystem drives member spend multiples above non-members with rising retention',
    'Insurance savings are flowing through to lower prices and already accelerating trip growth in key markets',
    'AV partnerships make Uber the aggregator beneficiary of autonomous vehicles rather than their victim',
    'Suburban and sparse-market expansion adds a fast-growing second engine beyond the mature urban core',
    'Free cash flow now exceeds ten billion a year, and the yield at current prices is exceptional for a platform still growing bookings above twenty percent',
  ],

  risksToBuy: [
    'Reported revenue is growing much slower than bookings, and near-term guidance has started to land below expectations',
    'AV players like Waymo could bypass the aggregator model with direct consumer apps at scale',
    'Personal AI agents could abstract away the Uber app through direct API integrations with rivals',
    'UK tax-law-style regulatory changes could structurally suppress revenue growth vs gross bookings globally',
    'Elevated AI and headcount spend could compress margins during any revenue growth deceleration',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 70, targetMedian: 100.5, targetHigh: 150, numAnalysts: 50 },  // stockanalysis.com (Oct 7 2026)

  revGrowth: [
    [0.10, 0.07, 0.06, 0.05, 0.05],   // Bear: AV disruption + competition limits growth
    [0.11, 0.14, 0.12, 0.10, 0.09],   // Base: FY26 ≈ $57.9B consensus, FY27 slight haircut vs +15%, insurance tailwind
    [0.12, 0.17, 0.15, 0.13, 0.12],   // Bull: Uber One + hotels + AV leverage + suburban
  ],

  fcfMargin: [
    [0.15, 0.14, 0.14, 0.13, 0.13],   // Bear: competition + tech spend erode margins
    0.18,                               // Base: stable at FY2025 level; insurance savings offset AI spend
    [0.20, 0.22, 0.24, 0.25, 0.26],   // Bull: insurance + operating leverage + AV near-zero marginal cost
  ],

  exitMultiple: [11, 15, 17],

  desc: [
    'AV disruption materializes: Waymo and Tesla Robotaxi capture a meaningful share of trips in top cities by 2028, and personal AI agents abstract away app usage, eroding retention. ' +
      'Revenue growth decelerates to mid-single digits; FCF margins compress as Uber invests to defend position. Market reprices at 11× EBITDA. 5-yr target {target} ({cagr} annualized).',
    'The Q2 2026 trajectory sustains: bookings grow ~20% with trips +18%, insurance savings keep driving U.S. mobility elasticity, and Uber One deepens cross-platform frequency. ' +
      'AV adds trips rather than cannibalizing them. Revenue compounds at ~11% annually; FCF margin holds near ~18%. 5-yr target {target} ({cagr} annualized).',
    'Insurance savings, suburban expansion and hotels/travel create durable new growth legs; Uber One becomes the default membership for on-demand services. ' +
      'The AV partner network delivers high-utilization trips at structurally better margins, and FCF margins expand to the mid-20s. 5-yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Bear mechanics: AV tech improves faster than expected; Waymo price cuts draw price-sensitive segments and Tesla Robotaxi scales in key markets, eroding Uber\'s driver-supply economics. ' +
      'Personal AI agents integrate directly with rivals\' booking APIs. Regulatory changes keep suppressing revenue vs gross bookings, and AI spend compresses margins during a slowdown. Multiple contracts to ~11x EBITDA.',
    'Q2 2026 shows the base case executing: bookings +24%, trips +18%, adj. EBITDA +33%, non-GAAP EPS +35%, and TTM FCF above $10B for the first time. ' +
      'Uber One creates a structural retention moat, and AV has been additive in every Waymo-active market so far. At ~14x FCF the stock is cheap for a 20%+ bookings-growth platform — the debate is purely about AV disruption.',
    'Bull case is an operating-leverage story with three accelerants: insurance pass-through driving trip elasticity, Uber One network effects extending into planned travel, and a multi-partner AV platform with near-zero driver cost. ' +
      'FCF margins expand into the mid-20s without needing multiple expansion.',
  ],

  termGrowth: [0.015, 0.025, 0.030],
  bbRate: [0.010, 0.015, 0.025],
  ebitdaProxy: [0.17, 0.24, 0.32],
  bullMaOptVal: false,

  burry: {
    sbc: 1300,
    gaapNi: 5100,         // Normalized FY2025 NI ex. $5B one-time Netherlands DTA release
    buyback: 3000,        // FY2025 gross buybacks est. ~$3B (Q1 FY26 alone was a record $3B)
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 40,
    overstatementSource: 'estimated',
    note: 'FY2025 GAAP NI was $10.1B but includes $5.0B one-time DTA release (Netherlands); normalized NI ~$5.1B used here. SBC/normalized NI = 25.5%. 3-yr return ~2.0× ($36→$70) → MTM 2.0× amplifier → 51%. Buyback offset: $3B buyback / $1.3B SBC = 2.3× → -13% → net ~38%, rounded to 40%. Critical tier but buyback program nearly offsets SBC dilution — effective real dilution is manageable.',
  },

  debtSafety: {
    netDebt: 4740,         // Jun 2026 (stockanalysis): gross debt $14.7B − cash/investments ~$10.0B
    ebitda: 10800,         // TTM adj. EBITDA (~$2.8B/qtr run-rate; GAAP TTM EBITDA $7.5B)
    fy: 'TTM Q2 2026',
    note: 'GREEN (~0.4× adj. EBITDA, ~0.6× GAAP). Debt rose with buybacks, but a >$10B FCF platform is effectively unlevered.',
  },
});

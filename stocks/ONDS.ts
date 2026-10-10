import { defineStock } from './defineStock';

export const ONDS = defineStock({
  ticker: 'ONDS',
  name: 'Ondas Inc.',
  sector: 'Defense Drones / Autonomous Systems',
  themeColor: '#6366f1',
  currentPrice: 6.73,
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  fairPriceRange: '$13 - $25',  // stockanalysis.com analyst target range, Oct 5 2026
  shares0: 570.5,      // 570.55M shares (stockanalysis, Oct 10 2026) — up from 496M after equity raises / acquisitions
  rev25: 50.7,         // FY2025; FY26 guide $525-550M (~10× via DZYNE/Cyberhawk + organic), FY27E consensus ~$1.01B
  fcfMargin25: -0.20,
  taxRate: 0.21,
  cash: 1380,          // Oct 2026 (stockanalysis): ~$1.38B after equity raises
  debt: 41,
  beta: 2.56,
  costDebt: 0.065,
  rsRating: 8,          // IBD RS per user, 10/10/2026 (was 62)
  rsTrend: 'falling',
  ratingOverride: 'HOLD',  // Pins HOLD: speculative, pre-profit roll-up (adj. EBITDA loss still widening in Q2 2026) where the DCF is highly sensitive to margin assumptions — HOLD avoids both extremes.
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 13, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record revenue $83.8M (vs $50.1M Q1, $6.3M y/y; organic +85%). ~$175M of
  // bookings in Q2 + ~$105M more into early August. Backlog ~$613M (~$757M
  // pro forma for DZYNE + Cyberhawk). FY26 GUIDE RAISED to $525-550M; Q3
  // $140-155M. Adj. EBITDA loss widened to $50.6M — mgmt calls Q2 the peak
  // loss and targets operating-platform adj. EBITDA profitability by Q4
  // 2026. Stock dipped on higher opex. Street: Strong Buy (10), PT $13-25
  // (median $18.50); FY26E rev $537M / EPS -$0.21, FY27E $1.01B / -$0.02.
  // Market cap ~$3.8B at $6.73, EV ~$2.5B (net cash ~$1.34B). (No split —
  // the price/target gap is real.)
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Positioned at the intersection of three converging defense megatrends: drones, counter-UAS, and AI-enabled ISR',
    'American Robotics subsidiary provides a real operational platform for autonomous military and industrial deployment',
    'Revenue scaled roughly tenfold in a year through acquisitions and organic growth, with a large and growing backlog',
    'A large net-cash balance sheet funds the path to profitability and further acquisitions without new borrowing',
  ],

  risksToBuy: [
    'Losses widened as the company scaled, and profitability targets are still ahead rather than demonstrated',
    'Repeated share issuances and GAAP losses create structural dilution risk with no buyback offset',
    'Contract cadence is lumpy and unpredictable — a single dry quarter can trigger severe re-rating',
    'Defense budget pressure or a shift in procurement priorities could indefinitely delay material contract wins',
    'Bear case reflects a realistic re-rating toward fundamentals that would erase the vast majority of market cap',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 13, targetMedian: 18.5, targetHigh: 25, numAnalysts: 10 },  // stockanalysis.com, Oct 5 2026

  revGrowth: [
    [9.30, 0.40, 0.20, 0.15, 0.12],   // Bear: FY26 ~$520M; acquired growth fades, contract cadence slows
    [9.60, 0.85, 0.35, 0.25, 0.20],   // Base: FY26 ≈ $537M guide/consensus, FY27 ~$990M, decelerating
    [9.80, 1.10, 0.50, 0.35, 0.25],   // Bull: major DoD / allied counter-UAS programs scale
  ],
  fcfMargin: [
    [-0.15, -0.05, 0.02, 0.05, 0.08], // Bear: integration costs persist, profitability slips
    [-0.10,  0.02, 0.08, 0.12, 0.15], // Base: adj. EBITDA breakeven late FY26, FCF builds with scale
    [-0.05,  0.08, 0.14, 0.18, 0.22], // Bull: operating leverage on a $1B+ revenue base
  ],
  exitMultiple: [8, 14, 22],
  desc: [
    'The FY26 step-up is mostly acquired; organic contract cadence slows and integration costs keep FCF negative longer. Market re-rates toward fundamentals. 5yr target {target} ({cagr} annualized).',
    'FY26 lands near the raised ~$537M guide and FY27 approaches ~$1B on backlog conversion; adj. EBITDA turns positive and FCF margins build toward mid-teens. 5yr target {target} ({cagr} annualized) — high execution requirements.',
    'Ondas emerges as a dominant autonomous defense platform. DoD and allied Tier-1 contracts surge; revenue more than doubles again in FY27 and FCF margins reach 20%+ at scale. 5yr target {target} ({cagr} annualized).',
  ],

  bbRate: [0, 0, 0],

  burry: {
    sbc: 15,
    gaapNi: -40,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 80,
    overstatementSource: 'estimated',
    note: 'High SBC relative to $50.7M revenue; GAAP-loss company with repeated share dilution — structural investor risk. Burry-adjusted target ~$3.38.',
  },

  debtSafety: {
    netDebt: -1339,        // Oct 2026: ~$41M debt − ~$1.38B cash
    ebitda: -120,          // FY26E adj. EBITDA loss (Q2 -$50.6M peak; breakeven targeted Q4) — approximate
    fy: 'FY26E',
    note: 'Net cash ~$1.34B after equity raises; earlier: net cash ~$250M; pre-profitability defense-drone expansion. Step 1 GREEN (net cash position).',
  },
});

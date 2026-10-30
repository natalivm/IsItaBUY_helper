import { defineStock } from './defineStock';

export const RBRK = defineStock({
  updatedOn: '10/30',
  ticker: 'RBRK',
  name: 'Rubrik',
  sector: 'Data Security',
  themeColor: '#22d3ee',
  currentPrice: 133.63,
  lastReportTag: 'Q2 FY27',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$110 - $139',  // stockanalysis.com analyst target range (Oct 7 2026)
  shares0: 207.3,      // 207.30M (stockanalysis, Oct 2026)
  rev25: 1320,         // FY26A (Jan 2026) $1.32B — base year; revGrowth[0] = FY27 (guide $1,685-1,693M, +28%), FY28E $2.05B (+21%)
  fcfMargin25: 0.155,
  taxRate: 0.20,
  cash: 1750,
  debt: 1150,
  beta: 1.25,
  rsRating: 97,        // IBD RS per user, 10/11/2026 (was 45)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 FY27 UPDATE (Aug 27, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Subscription ARR $1.66B (+33%; net new +35%), Cloud ARR $1.48B (+39%),
  // revenue $427.3M (+38%), FCF $65.7M (15%). Beat all guided metrics and
  // RAISED FY27: revenue $1,685-1,693M, subscription ARR $1,880-1,885M, FCF
  // $323-333M (~19%), non-GAAP EPS positive (Q3 $0.07-0.09). Still GAAP
  // loss-making (TTM NI −$254M; SBC-heavy). Street: Strong Buy (28, no
  // Holds), PT $110-139 (median $120 — BELOW spot); FY27E rev $1.69B / EPS
  // $0.50, FY28E $2.05B / $0.77. Stock $125.14 (~15× FY27E sales), up ~49%
  // over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────


  // Revenue growth: starts elevated (ARR +34% momentum) then decelerates
  // Bear CAGR ~12%, Base ~18%, Bull ~24%

  analystConsensus: { rating: 'Strong Buy', targetLow: 110, targetMedian: 120, targetHigh: 139, numAnalysts: 28 },  // stockanalysis.com (Oct 7 2026)
  revGrowth: [
    [0.27, 0.14, 0.12, 0.10, 0.08],      // Bear: FY27 locked by guide; NRR normalizes, net new ARR disappoints
    [0.28, 0.21, 0.18, 0.15, 0.12],      // Base: FY27 ≈ $1.69B guide, FY28 ≈ $2.05B consensus, then teens
    [0.29, 0.26, 0.24, 0.21, 0.18],      // Bull: ARR sustains mid-20s then 20%+
  ],

  // FCF margin progression: currently ~15.5%, operating leverage drives expansion
  // Non-GAAP gross margin already 83%, ARR contribution margin improved ~1400bps YoY
  fcfMargin: [
    [0.18, 0.15, 0.15, 0.15, 0.16],      // Bear: margin stalls after FY27
    [0.19, 0.20, 0.21, 0.22, 0.23],      // Base: FY27 guide ~19%, steady expansion
    [0.20, 0.22, 0.25, 0.27, 0.29],      // Bull: best-in-class scaling
  ],

  // EBITDA exit multiples for quality security SaaS
  exitMultiple: [15, 22, 30],

  ebitdaProxy: [0.18, 0.26, 0.35],

  desc: [
    'NRR normalizes faster than expected after FY27; net new ARR turns lumpy and below consensus, FCF margin stalls in the mid-teens, and the multiple compresses toward 15x EBITDA. 5yr target {target} ({cagr} annualized).',
    'FY27 lands at the raised ~$1.69B guide, then ARR decelerates to the low-20s and teens; NRR slides gradually and FCF margin expands into the low-20s. Healthy subscription business, but SBC keeps GAAP profits elusive. 5yr target {target} ({cagr} annualized).',
    'Subscription ARR sustains mid-20s growth; NRR holds high; Identity + security modules expand TAM into CISO/IAM budgets and FCF margin scales to best-in-class. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Growth halving plus multiple compression can deliver heavy downside even without a business breakdown — the stock already trades above the average analyst target.',
    'A good business priced for it: ARR compounds and FCF margins widen, but SBC dilution and a premium sales multiple leave the stock to tread water.',
    'Platform expansion (Identity net-new buyers, security modules) keeps ARR growth high for longer; FCF inflection net of SBC is the catalyst for a further re-rating.',
  ],

  prob: [25, 45, 30],
  bbRate: [0.005, 0.01, 0.015],
  bullMaOptVal: true,

  debtSafety: {
    netDebt: -600,         // Jul 2026 (stockanalysis): ~$1.75B cash − ~$1.15B debt
    ebitda: -260,          // TTM GAAP EBITDA (SBC-driven loss); FY27E FCF ~$328M positive
    fy: 'TTM Q2 FY27',
    note: 'Net cash ~$0.6B. Step 1 GREEN — GAAP EBITDA is negative only because of heavy SBC; cash flow is positive.',
  },

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

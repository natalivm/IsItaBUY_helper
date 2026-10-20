import { defineStock } from './defineStock';

export const DUOL = defineStock({
  ticker: 'DUOL',
  name: 'Duolingo',
  sector: 'EdTech · Language Learning · AI Platform',
  themeColor: '#58cc02',
  currentPrice: 139.58,
  updatedOn: '10/20',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$80 - $210',  // stockanalysis.com analyst target range (Oct 2026)
  shares0: 46.79,
  rev25: 1040,         // FY2025A; revGrowth[0] = FY26 (guide +15-18%; consensus $1.21B), FY27E $1.37B (+13%)
  fcfMargin25: 0.35,
  taxRate: 0.15,
  cash: 1310,
  debt: 86,
  beta: 0.85,
  costDebt: 0,
  modelType: 'EPS_PE',
  baseEps: 3.40,       // FY26E GAAP-equivalent recurring EPS (~$320M adj. EBITDA less ~$150M SBC, D&A, tax ≈ $3.30-3.40). Street non-GAAP FY26E $6.61 adds back SBC; FY25 GAAP $11.77 was inflated by a one-time tax benefit.
  rsRating: 69,        // IBD RS per user, 10/11/2026 (was 33)
  rsTrend: 'rising',
  aiImpact: 'DISRUPTION_RISK',
  // Q2 2026 UPDATE (Aug 5, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // DAUs +23% (accelerating 2pts q/q), revenue $298.5M (+18%), bookings
  // $289.1M (+8%, +6% cc), adj. EBITDA ~$77M (~26%). FY26 guide HELD:
  // bookings +10-12%, revenue +15-18%; adj. EBITDA margin raised to 26.5%;
  // FCF >$375M. Q3 guide: bookings ~$307M (+9%), revenue ~$302M (+11%).
  // Stock fell ~11% on the cautious bookings outlook. Street: Hold (24; 16
  // Hold), PT $80-210 (median $137.50 — BELOW spot); FY26E rev $1.21B,
  // FY27E $1.37B. Stock $149.92, down ~57% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Dominant language-learning network with tens of millions of daily active users and deep habit-forming engagement loops',
    'Zero-debt balance sheet with substantial cash reserves provides a durable runway for the growth reinvestment phase',
    'AI-first product suite — Max tier, Video Call, and rapid content generation — positions DUOL as a beneficiary rather than a victim of AI',
    'Daily active user growth re-accelerated after the friction-removal reset, suggesting the strategy is working on engagement',
    'Deliberate friction-removal strategy is a rare case of management sacrificing near-term profits to compound the long-term user base',
  ],

  risksToBuy: [
    'Management is deliberately compressing margins to reinvest, so near-term earnings momentum is intentionally soft',
    'Bookings growth has slowed to high single digits, well below user growth, so monetization is lagging the engagement gains',
    'AI-native tutors from large tech platforms represent a genuine substitution threat for casual language learners',
    'The binary DAU growth bet either justifies the reinvestment or leaves shareholders with slow growth and depressed margins',
    'Reported net income is materially inflated by a one-time tax benefit, obscuring the true earnings baseline',
  ],

  epsCagr: [5, 15, 25],
  exitPE: [12, 22, 30],
  prob: [35, 40, 25],

  analystConsensus: { rating: 'Hold', targetLow: 80, targetMedian: 137.5, targetHigh: 210, numAnalysts: 24 },  // stockanalysis.com (Oct 2026)
  revGrowth: [
    [0.15, 0.08, 0.05, 0.04, 0.02],   // Bear: bookings slowdown flows into revenue; AI tutors substitute
    [0.16, 0.14, 0.15, 0.14, 0.12],   // Base: FY26 ≈ $1.21B, FY27 ≈ consensus, DAU gains monetize from FY28
    [0.17, 0.20, 0.22, 0.20, 0.18],   // Bull: 100M DAUs, ARPU recovers, new subjects scale
  ],
  fcfMargin: [
    [0.22, 0.20, 0.18, 0.16, 0.14],
    [0.22, 0.26, 0.30, 0.33, 0.35],
    [0.24, 0.28, 0.33, 0.37, 0.40],
  ],
  exitMultiple: [8, 18, 25],
  desc: [
    'Strategic reset fails: reinvestment does not reignite DAU growth and the 100M DAU target slips well beyond 2028. ' +
      'AI-native tutors from ChatGPT, Apple, and Meta accelerate substitution of casual learners. ' +
      'Bookings growth keeps sliding and revenue growth stalls at mid-single digits. ' +
      'Margins stay compressed with no payoff, and the stock re-rates to 12x on deteriorating earnings power. 5yr target {target} ({cagr} annualized).',
    'The deliberate 2026 slowdown proves temporary: DAU growth already re-accelerated to 23% in Q2, and bookings follow in 2027-2028 as conversion improves on the larger base. ' +
      'Earnings compound at 15% annually from the recurring ~$3.40 GAAP base and the stock settles at 22x. 5yr target {target} ({cagr} annualized).',
    'Duolingo hits 100M DAUs ahead of schedule, unlocking a massive monetization base as ARPU recovers post-friction-removal. ' +
      'Subject expansion into math, test prep, and corporate training adds premium revenue streams, while Max tier and Video Call prove AI is a tailwind not a threat. ' +
      'Platform re-rating as a dominant AI-native education company drives 30x earnings multiples and 25% EPS compounding. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.01, 0.025, 0.035],
  waccAdj: [0.015, 0, -0.01],
  ebitdaProxy: [0.10, 0.25, 0.35],
  bullMaOptVal: 91.63 * 46.23 * 0.10,

  driverOverrides: [
    {
      bbRate: 0.005,
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.01, 0.01],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
      bbRate: 0.015,
    },
    {
      revPrem: [0.03, 0.03, 0.03, 0.03, 0.03],
      fcfUplift: [0.015, 0.02, 0.02, 0.025, 0.025],
      bbRate: 0.02,
    },
  ],

  debtSafety: {
    netDebt: -1230,        // Jun 2026 (stockanalysis): ~$1.31B cash − ~$0.09B debt
    ebitda: 320,           // FY26E adj. EBITDA (26.5% margin guide)
    fy: 'FY26E',
    note: 'Net cash ~$1.2B, essentially debt-free. Step 1 GREEN.',
  },

  burry: {
    sbc: 137,
    gaapNi: 120,
    buyback: 42,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 45,
    overstatementSource: 'estimated',
    note: 'Critical (downgraded from original Tragic 75% estimate after TIKR refresh). FY25 actuals: SBC $137M (just 12.8% of revenue — much lower than my $300M estimate; in NOW/PLTR territory rather than DDOG/ZS), buybacks $42M (covers 31% of SBC — partial offset). FCF margin 37.9% is genuinely elite — cash generation is real, not just SBC addback (SBC = 32.6% of CFO vs DDOG 70%, ZS 66%). The dilution story is post-IPO normalization: 23M (FY21) → 48M shares (LTM) = +107% but mostly from IPO + 2022 follow-ons. Post-IPO from FY22→LTM = +22.7% / +7.1%/yr (still elevated). GAAP just turned profitable (operating margin 14.8% LTM). Elite consumer-subscription economics + improving capital allocation = reclassified out of broken-SaaS cohort.',
  },
});

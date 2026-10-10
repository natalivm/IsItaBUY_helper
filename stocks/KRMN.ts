import { defineStock } from './defineStock';

export const KRMN = defineStock({
  ticker: 'KRMN',
  name: 'Karman Holdings Inc.',
  sector: 'Aerospace, Defense, Hypersonics & Space Systems',
  themeColor: '#0d9488',
  currentPrice: 32.59,
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  fairPriceRange: '$63 - $100',  // stockanalysis.com analyst target range, Oct 8 2026
  shares0: 132.5,
  rev25: 471.5,        // FY2025; FY26 guide $730-745M (+56%), FY27E consensus $949M (+28%)
  fcfMargin25: 0.08,
  taxRate: 0.21,
  cash: 180,
  debt: 400,
  beta: 1.27,
  costDebt: 0.060,
  rsRating: 14,         // NOT refreshed — awaiting user RS (10/10/2026)
  rsTrend: 'falling',
  ratingOverride: 'HOLD',  // Kept at Q2 2026: fundamentals are strong (rev +58%, record $1.3B backlog, guide raised) and the model screens BUY, but the stock kept sliding ($48 → $33) on space-launch concerns with RS in the teens — HOLD until price action stabilizes. Revisit with a fresh RS.
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $182.1M (+58%, +24% organic). Record net income $14.0M (+106%),
  // EPS $0.11 (vs $0.05). Record adj. EBITDA $54.6M (+55%). Record backlog
  // $1.3B (+65% vs FY25 YE) on ~$500M of bookings. FY26 GUIDE RAISED:
  // revenue $730-745M, adj. EBITDA $215-222.5M. Yet the stock slid ~$48
  // (Jul 31) → $32.59; commentary flags softness in space-launch revenue
  // masked by the defense backlog. Street: Strong Buy (12), PT $63-100
  // (median $80); FY26E EPS $0.59 / rev $741M, FY27E $0.95 / $949M. ~55×
  // FY26E / ~34× FY27E. (No split — the stock simply fell.)
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Sits at the intersection of three structurally-funded defense themes: hypersonic propulsion, missile systems, and space launch',
    'Revenue growing at exceptional rates with management raising guidance alongside the beat, not cutting it',
    'Record backlog and bookings give multi-year revenue visibility while the stock trades far below analyst targets',
    'Defense contracts provide long-duration revenue visibility that typical growth companies cannot offer investors',
    'Defense programs in hypersonics and missiles are growing fast enough to offset softness elsewhere in the portfolio',
  ],

  risksToBuy: [
    'Concentration in a small number of large defense programs makes revenue highly sensitive to individual contract delays',
    'No buybacks and ongoing dilution from SBC means shareholders bear the cost of growth without capital return offset',
    'IPO-stage stock with limited public track record raises execution uncertainty in a complex defense manufacturing backlog',
    'DoD budget cycle dependency means any sequestration or continuing resolution could abruptly slow program funding',
    'Space-launch revenue appears to be softening, a weakness the strong defense backlog can mask in headline numbers',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 63, targetMedian: 80, targetHigh: 100, numAnalysts: 12 },  // stockanalysis.com, Oct 8 2026

  revGrowth: [
    [0.54, 0.12, 0.10, 0.08, 0.07],   // Bear: FY26 ~locked at guide; program delays + space-launch weakness after
    [0.565, 0.28, 0.20, 0.15, 0.12],  // Base: FY26 ≈ $741M guide/consensus, FY27 ≈ $949M, decelerating
    [0.58, 0.40, 0.30, 0.25, 0.20],   // Bull: hypersonic prime wins + launch recovery
  ],
  fcfMargin: [
    [0.08, 0.09, 0.10, 0.10, 0.10],
    [0.10, 0.12, 0.14, 0.15, 0.16],
    [0.12, 0.15, 0.18, 0.20, 0.22],
  ],
  exitMultiple: [10, 16, 22],

  modelType: 'EPS_PE',
  baseEps: 0.59,        // FY2026E EPS — stockanalysis consensus (Oct 8 2026; FY27E $0.95, +61%). Q2 EPS $0.11. Prior $0.72 overstated the base.
  epsCagr: [18, 24, 35],   // Base 26→24: FY27E +61% then decelerating
  exitPE: [20, 32, 40],    // Was [25, 40, 48] — 40× is rich for defense; 32× still a growth premium
  prob: [25, 50, 25],

  desc: [
    'Defense budget pressure, program delays and space-launch softness slow growth to 7–12% per year. Re-rating toward normal defense multiples (~20×). 5yr target {target} ({cagr} annualized).',
    'Hypersonics and missile production ramp as contracted: FY26 revenue ~$741M (+56%), FY27 ~$949M, decelerating to ~12% by FY30. EPS compounds ~24% from $0.59 at a ~32× exit. 5yr target {target} ({cagr} annualized).',
    'Karman becomes a Tier-1 defense systems supplier. Hypersonic prime contracts land, launch volume recovers and accelerates, FCF margins reach ~22%. 5yr target {target} ({cagr} annualized).',
  ],

  bbRate: [0, 0, 0],

  burry: {
    sbc: 30,
    gaapNi: 95,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 27,
    overstatementSource: 'estimated',
    note: 'New IPO with short MTM history; SBC ~6% of revenue vs. $90M+ normalized GAAP NI — manageable dilution, OK tier.',
  },

  debtSafety: {
    netDebt: 220,
    ebitda: 175,
    fy: 'FY25',
    note: 'Net leverage ~1.3× EBITDA; elevated from IPO/acquisition activity but well within manageable range for a defense manufacturer.',
  },
});

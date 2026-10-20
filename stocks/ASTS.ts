import { defineStock } from './defineStock';

export const ASTS = defineStock({
  ticker: 'ASTS',
  name: 'AST SpaceMobile',
  sector: 'Space Technology',
  themeColor: '#38bdf8',
  currentPrice: 41.13,
  updatedOn: '10/20',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$42.50 - $108',  // stockanalysis.com analyst target range (Oct 2026)
  shares0: 389.2,       // all classes (stockanalysis, Oct 2026)
  rev25: 71,            // FY2025A $70.9M; revGrowth[0] = FY26 (guide $150-200M reaffirmed; consensus $169M), FY27E $608M
  fcfMargin25: -0.10,
  taxRate: 0.15,
  cash: 2290,           // Jun 2026 (stockanalysis)
  debt: 2990,           // convertible notes
  beta: 1.46,
  costDebt: 0.03,
  rsRating: 3,         // IBD RS per user, 10/11/2026 (was 73)
  rsTrend: 'falling',
  ratingOverride: 'HOLD',  // Pins HOLD: speculative pre-revenue satellite name with falling RS — keep at HOLD regardless of model drift (model reads STRONG BUY on a 2029-30 ramp it cannot yet underwrite).
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 10, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $31.5M (more than doubled q/q; below ~$35M consensus) from
  // gateway deliveries + US government milestones; net loss $231M. FY26
  // revenue guide $150-200M REAFFIRMED (Q4-weighted). BlueBirds 11-13
  // launched Aug 5 → 13 in orbit; 14-16 nearly ready; target ~45 by early
  // 2027; consumer beta later in 2026. Backlog ~$1.3B. Street: Hold (13),
  // PT $42.50-108 (median $79); FY26E rev $169M / EPS −$2.03, FY27E $608M /
  // −$1.29. Stock $50.97 (fell 10.5% on Oct 9), down ~37% over 52 weeks.
  // Net debt ~$0.7B (TTM FCF −$1.6B).
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Only company building space-based broadband for unmodified standard smartphones — the technical moat is years wide.',
    'Nearly sixty MNO partners covering billions of subscribers globally provides enormous distribution without building retail infrastructure.',
    'Custom ASIC chip delivers a generational performance leap over FPGA satellites, dramatically improving unit economics at scale.',
    'Government and defense contracts through prime contractors add a high-value recurring revenue stream beyond consumer mobile.',
    'A contracted backlog of over a billion dollars and nearly fifty gateways in progress give the service launch real commercial footing.',
  ],

  risksToBuy: [
    'Revenue is still negligible for a company carrying a large market cap — execution must convert the guide each remaining quarter.',
    'Satellite launch anomalies (BB7 loss) demonstrate irreversible single-point failures with no insurance on constellation assets.',
    'Extreme share dilution history and ongoing capital intensity mean per-share returns depend on revenue scaling faster than the float.',
    'Revenue keeps landing below expectations and is back-end loaded, while cash burn has pushed the balance sheet into net debt.',
    'Even in the base case, sustained profitability is years away and requires flawless execution across launches, ground integration, and partner ramp.',
  ],

  analystConsensus: { rating: 'Hold', targetLow: 42.5, targetMedian: 79, targetHigh: 108, numAnalysts: 13 },  // stockanalysis.com (Oct 2026)
  revGrowth: [
    [1.15, 1.80, 1.40, 0.70, 0.45],   // Bear: FY26 ~$150M low end; deployment slips
    [1.40, 2.60, 1.60, 0.90, 0.50],   // Base: FY26 ≈ $170M, FY27 ≈ $610M consensus, then ramp
    [1.70, 3.80, 2.00, 1.15, 0.60],   // Bull: FY26 top of guide, faster MNO + government ramp
  ],
  fcfMargin: [
    [-2.50, -0.40, 0.05, 0.20, 0.28],
    [-5.00, -0.88, 0.07, 0.39, 0.49],
    [-3.80, -0.50, 0.15, 0.45, 0.52],
  ],
  exitMultiple: [12, 18, 25],
  desc: [
    'Deployment slips well past the ~45-satellite target, launch cadence misses and the service launch is delayed. Revenue reaches only ~$150M in 2026 and the ramp stalls; capex stays elevated and dilution accelerates from additional capital raises. 5yr target {target} ({cagr} annualized).',
    'Roughly on-plan deployment (~45 BlueBirds by early 2027), commercial beta launches with MNO partners and continuous coverage follows. Revenue ramps from ~$170M (2026) to ~$600M (2027) and multiple billions by 2030 as service revenue dominates the mix; the ~$1.3B backlog provides near-term visibility. 5yr target {target} ({cagr} annualized).',
    'Accelerated deployment, government/DoD contracts scale (Golden Dome, SDA) and spectrum monetization goes live. Revenue tops ~$800M in 2027 and accelerates from there; EBITDA margins at scale exceed 80% and the market re-rates ASTS as a dual-use infrastructure monopoly. 5yr target {target} ({cagr} annualized).',
  ],

  burry: {
    sbc: 47.49,
    gaapNi: -341.94,
    buyback: 23.02,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'GAAP loss company — SBC overstatement framework inapplicable; rated Tragic by default. Real risk is constellation capex ($1.06B) and 395% 5-year share dilution, not SBC.',
  },

  bbRate: [0, 0, 0],
  ebitdaProxy: [0.35, 0.55, 0.65],
  bullMaOptVal: 73.65 * 370 * 0.07,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
    },
  ],

  debtSafety: {
    netDebt: 705,          // Jun 2026 (stockanalysis): ~$2.99B convertible debt − ~$2.29B cash
    ebitda: -406,          // TTM EBITDA (pre-revenue constellation build)
    capexToOcf: 1.0,       // capex (~$1B+/yr) far exceeds OCF (negative) — capped at 100% for display
    fy: 'TTM Q2 2026',
    note: 'RED by construction: net debt with negative EBITDA. The debt is low-coupon converts and liquidity is still ~$2.3B, but continued funding (equity or debt) is required until service revenue scales.',
  },
});

import { defineStock } from './defineStock';

export const ASTS = defineStock({
  ticker: 'ASTS',
  name: 'AST SpaceMobile',
  sector: 'Space Technology',
  themeColor: '#38bdf8',
  currentPrice: 28.58,
  updatedOn: '11/17',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-17',
  fairPriceRange: '$39 - $108',  // stockanalysis.com analyst target range (Nov 10 2026)
  shares0: 390.0,       // all classes at Sep 30 2026 (Q3 release): 300.6M Class A + 11.2M B + 78.2M C
  rev25: 71,            // FY2025A $70.9M; revGrowth[0] = FY26 (guide $150-200M reaffirmed at Q3; consensus $166M), FY27E $586M
  fcfMargin25: -0.10,
  taxRate: 0.15,
  cash: 3233,           // Sep 30 2026 (Q3 release): cash, cash equivalents and restricted cash
  debt: 4092,           // Sep 30 2026: long-term debt, net $4,084M + current portion $9M (was 2990; $2.2B of debt raised in 9M 2026)
  beta: 1.46,
  costDebt: 0.03,
  rsRating: 3,         // IBD RS per user, 10/11/2026 (was 73)
  rsTrend: 'falling',
  ratingOverride: 'HOLD',  // Pins HOLD: speculative pre-revenue satellite name with falling RS — keep at HOLD regardless of model drift (model reads STRONG BUY on a 2029-30 ramp it cannot yet underwrite).
  aiImpact: 'TAILWIND',
  // Q3 2026 UPDATE (Nov 9, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $42.3M (+187% y/y; $31.5M in Q2) from gateway deliveries + US
  // government milestones — below consensus again. Net loss to common $132.4M
  // / -$0.44 (est. -$0.40). Opex $211.0M; adjusted opex $133.6M ($119.1M in
  // Q2). Q3 capex $310M (below the $350-425M guide on launch-payment timing);
  // Q4 capex guide $400-500M, adj. opex $130-140M. FY26 revenue guide
  // $150-200M REAFFIRMED "with upside based on recent contract signatures"
  // — which leaves Q4 carrying most of the year. SCHEDULE SLIPPED: ~45
  // BlueBirds in orbit now "by middle 2027" (was early 2027). BB 11-13 in
  // operation; 14-16 at the Cape awaiting a SpaceX date; 17-19 on Blue Origin
  // early Q1 2027; 20-25 in Q1 2027. Launch agreements for 100+ satellites
  // (2027-28). ~$100M Space Force SB-AMTI contract; ~$1.0B Japanese (J-LEO)
  // non-dilutive funding agreement (not yet received). Cash $3.2B vs debt
  // $4.1B. Street: Hold (13), PT $39-108, median cut to $51.85 (from $79);
  // FY26E rev $166M / EPS -$1.87, FY27E $586M / -$1.56.
  // Sources: SEC 8-K ex. 99.1 (0001193125-26-453758); stockanalysis.com.
  // ─────────────────────────────────────────────────────────────────────────

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


  analystConsensus: { rating: 'Hold', targetLow: 39, targetMedian: 51.85, targetHigh: 108, numAnalysts: 13 },  // stockanalysis.com (Nov 10 2026; median was 79)
  revGrowth: [
    [1.15, 1.80, 1.40, 0.70, 0.45],   // Bear: FY26 ~$150M low end; deployment slips
    [1.34, 2.53, 1.60, 0.90, 0.50],   // Base: FY26 ≈ $166M, FY27 ≈ $586M consensus (Nov 2026; was $170M / $610M), then ramp
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
    'Deployment holds the revised plan (~45 BlueBirds by mid-2027), commercial beta launches with MNO partners and continuous coverage follows. Revenue ramps from ~$165M (2026) to ~$590M (2027) and multiple billions by 2030 as service revenue dominates the mix; the ~$1.3B backlog provides near-term visibility. 5yr target {target} ({cagr} annualized).',
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
    netDebt: 859,          // Sep 30 2026 (Q3 release): $4.09B debt − $3.23B cash incl. restricted
    ebitda: -406,          // TTM Q2 2026 EBITDA (pre-revenue constellation build) — not refreshed at Q3; negative either way
    capexToOcf: 1.0,       // capex (~$1B+/yr) far exceeds OCF (negative) — capped at 100% for display
    fy: 'Q3 2026',
    note: 'RED by construction: net debt with negative EBITDA. The debt is largely low-coupon converts and liquidity is ~$3.2B, but continued funding (equity or debt) is required until service revenue scales.',
  },
});

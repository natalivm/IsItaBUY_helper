import { defineStock } from './defineStock';

export const RKLB = defineStock({
  ticker: 'RKLB',
  name: 'Rocket Lab USA, Inc.',
  sector: 'Space Launch / Defense Space Infrastructure',
  themeColor: '#a855f7',
  updatedOn: '10/16',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  currentPrice: 50.84,
  fairPriceRange: '$64 - $150',  // stockanalysis.com analyst target range (Oct 2026)
  shares0: 598.5,         // 598.46M (stockanalysis, Oct 2026) — up from 534M via ATM equity sales
  rev25: 602,             // FY2025 actual revenue; revGrowth[0] = FY26 (consensus $961M, +60%), FY27E $1.36B (+41%)
  fcfMargin25: -0.10,     // FY25; TTM Q2 2026 FCF −$371M (−48% of revenue) as Neutron spend peaks
  taxRate: 0.21,
  cash: 2300,             // Jun 2026 (stockanalysis) — after equity raises
  debt: 134,
  beta: 1.95,
  costDebt: 0.05,
  // ratingOverride 'HOLD' removed 10/11/2026: it split the difference between a deeply overvalued DCF and extreme RS momentum; RS has collapsed (98 → 25), so the model's OVERVALUED stands.

  rsRating: 25,           // IBD RS per user, 10/11/2026 (was 98)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 10, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue ~$234M (+62%, beat; Space Systems $189.5M, Launch $44.6M),
  // record backlog ~$2.36B (+137%), non-GAAP GM 41.5%; EPS missed; FCF
  // −$110M. Q3 GUIDE: revenue $250-265M (above consensus), non-GAAP GM
  // 35-37% (satellite mix). Neutron not yet flown — CEO says the year-end
  // window "is starting to slip away". Street: Buy (22), PT $64-150 (median
  // $107); FY26E rev $961M / EPS −$0.05, FY27E $1.36B / $0.06. Stock $68.21
  // (~42× FY26E sales); ~$2.25B net cash after ATM raises.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Only publicly traded pure-play covering launch, satellites, and defense space infrastructure under one roof',
    'Backlog growing rapidly with defense contracts providing durable, high-switching-cost revenue visibility',
    'Neutron medium-lift vehicle would multiply addressable market by an order of magnitude if successfully fielded',
    'A multi-billion net cash pile from equity raises fully funds Neutron and acquisitions without debt',
    'Anduril hypersonics deal and Space Force programs anchor the company in the fastest-growing defense segment',
  ],

  risksToBuy: [
    'Valuation implies a SpaceX-level outcome — base-case DCF offers only modest upside from current levels',
    'Neutron development carries substantial execution, cost overrun, and timeline risk for a capital-intensive vehicle',
    'SBC on a GAAP-loss company plus a large equity distribution program create persistent dilution for shareholders',
    'Bear case is severe: a single Neutron setback could reprice the stock dramatically from current extended levels',
    'Neutron\'s first flight keeps slipping, and cash burn remains heavy until it flies and scales',
  ],

  verdictNarrative:
    "Rocket Lab is executing on everything except the one thing the valuation most depends on: revenue grew 62% in Q2, the backlog more than doubled to ~$2.4B, and Q3 guidance came in well above expectations — but Neutron has still not flown and the year-end window is slipping. " +
    "At roughly 40× this year's sales with negative free cash flow, the stock prices in Neutron success plus years of hypergrowth; the DCF cannot justify today's price without it. A ~$2.25B net cash pile removes financing risk, but equity issuance keeps diluting holders. " +
    "OVERVALUED — the business thesis is intact, but momentum has broken down (RS 98 → 25) and without it nothing supports a price the cash flows cannot justify. Upgrade trigger: a successful Neutron first flight plus sustained gross-margin expansion.",

  analystConsensus: { rating: 'Buy', targetLow: 64, targetMedian: 107, targetHigh: 150, numAnalysts: 22 },  // stockanalysis.com (Oct 2026)

  revGrowth: [
    [0.55, 0.25, 0.22, 0.18, 0.15],  // Bear: FY26 near low end; Neutron delays, launch competition
    [0.60, 0.40, 0.33, 0.25, 0.20],  // Base: FY26 ≈ $961M consensus, FY27 ≈ $1.35B; Neutron flies 2027
    [0.66, 0.60, 0.45, 0.35, 0.25],  // Bull: Neutron operational, SpaceX-alternative thesis confirmed
  ],

  fcfMargin: [
    [-0.35, -0.15, -0.05, 0.03, 0.07], // Bear: prolonged burn, margins slow to develop
    [-0.30, -0.05,  0.05, 0.10, 0.15], // Base: FY26 heavy Neutron burn, FCF positive by year 3
    [-0.25,  0.03,  0.12, 0.18, 0.22], // Bull: rapid FCF inflection as Neutron scales
  ],

  exitMultiple: [10, 18, 28],
  termGrowth: [0.015, 0.025, 0.030],

  ebitdaProxy: [0.40, 0.55, 0.70],
  bbRate: [0, 0, 0],
  bullMaOptVal: false,

  desc: [
    'Neutron faces repeated delays and cost overruns, and Electron share erodes as SpaceX rideshare captures more small-sat demand. Revenue growth decelerates toward ~15% by year 5, FCF barely breaks even and dilution continues. The market re-rates from infrastructure premium to launch commodity. 5yr target {target} ({cagr} annualized).',
    'Neutron flies in 2027 and ramps; defense and commercial backlog compounds and Space Systems keeps scaling. FCF turns positive in year 3 and reaches ~15% margin by year 5 on ~$2.5B+ revenue. Even so, the DCF cannot support today\'s premium. 5yr target {target} ({cagr} annualized).',
    'Neutron becomes operational and wins major launch contracts from DoD, NASA and commercial operators; the satellite and defense businesses scale with Golden Dome-era budgets. Revenue approaches ~$4B+ by year 5 at a 22% FCF margin and RKLB is re-rated as a space infrastructure platform. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'At ~40× sales, a single Neutron execution miss re-rates the stock dramatically. RKLB competes with well-funded incumbents (SpaceX) in both small and medium launch. SBC on a GAAP-loss company plus ongoing ATM equity sales create persistent dilution, and a high WACC penalizes the distant FCF inflection.',
    'Defense exposure (Space Force, SDA, Anduril hypersonics) provides durable revenue with high switching costs. A record ~$2.4B backlog supports near-term visibility, Q2 revenue grew 62% and Q3 guidance beat. Neutron has the potential to multiply TAM and FCF per launch.',
    'If Neutron succeeds, RKLB becomes the only public pure-play on launch + satellites + defense space infrastructure. Space Force budgets and the Golden Dome backdrop support the SpaceX-analog thesis: one company owning the stack from launch to payload to orbit.',
  ],

  burry: {
    sbc: 135,
    gaapNi: -120,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 65,
    overstatementSource: 'estimated',
    note: 'Critical tier: SBC $120–150M on a GAAP-loss company with zero buybacks. Recent filings introduced a potential $3B equity distribution program. Stock rose several-fold in 2025 — MTM amplifier is extreme. GAAP framework technically mandates Tragic (NI < 0), but unlike pure pre-revenue names, RKLB has real (~$1B FY26E) revenue and a visible FCF inflection path.',
  },

  debtSafety: {
    netDebt: -2170,        // Jun 2026 (stockanalysis): ~$2.30B cash − ~$0.13B debt
    ebitda: -150,          // TTM EBITDA (negative while scaling); moot given net cash
    fy: 'TTM Q2 2026',
    note: 'GREEN by net cash. ~$2.2B net cash (after ATM equity raises) funds operating losses and Neutron capex. No solvency risk; dilution is the cost.',
  },
});

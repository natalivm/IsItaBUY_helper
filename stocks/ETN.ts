import { defineStock } from './defineStock';

export const ETN = defineStock({
  ticker: 'ETN',
  name: 'Eaton Corporation plc',
  sector: 'Electrical Equipment / Electrification & Data Center Power',
  themeColor: '#0072ce',
  currentPrice: 429.65,
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$333 - $534',  // stockanalysis.com analyst target range (Oct 2026)
  shares0: 388.4,
  rev25: 27448,        // FY2025A; revGrowth[0] = FY26 (organic +11-13% raised + Boyd; consensus $32.9B, +20%), FY27E $36.8B (+12%)
  fcfMargin25: 0.13,
  taxRate: 0.17,
  cash: 695,           // Jun 2026 (stockanalysis)
  debt: 21330,         // up sharply with the Boyd Thermal acquisition
  beta: 1.16,
  costDebt: 0.045,
  rsRating: 73,        // NOT refreshed — awaiting user RS (10/11/2026)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',  // Floors ETN at HOLD: base DCF reads below spot on a high-multiple electrical name, but OVERVALUED overstates a quality compounder. Matches the TAILWIND-boosted model today.
  // Q2 2026 UPDATE (Jul 31, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Sales ~$8.5B (+21%; organic +14%, acquisitions +7%), segment margin
  // 23.1%, adj. EPS $3.15 (beat $3.08) — all above the high end of guide.
  // Electrical Americas organic +18% with data-center revenue ~+65%;
  // book-to-bill 1.2 (Americas 1.3); rolling orders +41% Americas / +33%
  // Global. FY26 GUIDE RAISED: organic +11-13%, adj. EPS $13.40-13.60;
  // Q3 $3.46-3.56. Mobility to be separated via Reverse Morris Trust (close
  // ~Q1 2027); Boyd revenue outlook raised to $1.8B. Street: Buy (28), PT
  // $333-534 (median $490); FY26E rev $32.9B / EPS $13.58, FY27E $36.8B /
  // $16.25. Stock $429.65 (~32× FY26E, ~26× FY27E).
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Three simultaneous secular megatrends — AI data center power, grid modernization, and broad electrification — underpin multi-year demand visibility',
    'Data center orders growing at an extraordinary rate confirms Eaton\'s positioning at the critical power infrastructure layer',
    'Best-in-class EBITDA margins and strong buyback program demonstrate the operational quality of a mature industrial compounder',
    'The announced Mobility separation concentrates the portfolio on high-growth electrification and data center power businesses',
    'Boyd Thermal acquisition deepens the liquid-cooling stack, expanding content per data center rack as AI density rises',
  ],

  risksToBuy: [
    'Valuation already reflects a full premium at roughly thirty times forward earnings with limited margin of safety',
    'Debt roughly doubled to fund the Boyd acquisition, so leverage is now meaningfully higher than the historical norm',
    'AI data center capex digestion could cause a sharp order deceleration after the current hyper-investment cycle peaks',
    'Industrial business lines face cyclical headwinds if global manufacturing activity slows materially from current levels',
    'Integrating a large thermal acquisition while separating Mobility adds execution complexity at a peak-demand moment',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 333, targetMedian: 490, targetHigh: 534, numAnalysts: 28 },  // stockanalysis.com (Oct 2026)
  revGrowth: [
    [0.16, 0.04, 0.03, 0.03, 0.03],   // Bear: FY26 incl. Boyd, then data-center digestion + industrial down-cycle
    [0.19, 0.11, 0.08, 0.07, 0.06],   // Base: FY26 ≈ $32.7B, FY27 ≈ consensus, then HSD
    [0.21, 0.14, 0.11, 0.10, 0.09],   // Bull: AI power demand proves durable
  ],
  fcfMargin: [
    [0.13, 0.13, 0.14, 0.14, 0.14],
    [0.13, 0.14, 0.15, 0.15, 0.16],
    [0.14, 0.15, 0.16, 0.17, 0.18],
  ],
  exitMultiple: [14, 17, 20],
  desc: [
    'Data center capex digestion and an industrial down-cycle slow organic growth to low-single digits after FY26. Margin expansion stalls as mix and pricing normalize. With the stock at ~32× forward earnings, multiple compression toward 14× EBITDA dominates returns — the premium unwinds even as the business stays healthy. 5yr target {target} ({cagr} annualized).',
    'Electrification + AI data center power + reshoring sustain high-single-digit organic growth as the record backlog converts; Boyd adds liquid-cooling content. FCF margin expands toward 16% on operating leverage. A still-premium 17× EBITDA holds for a quality compounder. 5yr target {target} ({cagr} annualized).',
    'AI data center power demand proves structural and durable, grid/utility capex accelerates, and Eaton captures share with content gains per rack. Revenue compounds low-teens, FCF margin pushes toward 18%, and the market keeps paying 20× EBITDA for the cleanest electrification pure-play. 5yr target {target} ({cagr} annualized).',
  ],
  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.22, 0.24, 0.26],
  burry: {
    sbc: 155,
    gaapNi: 4087,
    buyback: 1900,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 10,
    overstatementSource: 'estimated',
    note: 'Low SBC for a large-cap industrial — naive SBC/NI only ~4% on FY25 GAAP NI of $4,087M (SBC ~$155M est.; total disclosed only in 10-K notes). FY25 buybacks of $1.9B (10-K, $7.6B left on a $9.0B authorization) dwarf dilution. Pristine tier — owner profit closely tracks GAAP.',
  },
  debtSafety: {
    netDebt: 20635,        // Jun 2026 (stockanalysis): ~$21.3B debt − ~$0.7B cash, post-Boyd
    ebitda: 7700,          // FY26E EBITDA approx. (~$32.9B × ~23.5%); TTM $6.64B
    capexToOcf: 0.15,      // approximate
    interestCoverage: 8,   // approximate (EBIT ~$6.5B / interest ~$0.8B)
    altmanZ: 3.8,          // approximate — large market cap vs liabilities
    fy: 'FY26E',
    note: 'Net debt/EBITDA ~2.7× after the debt-funded Boyd deal (was ~1.5×) → step 3; asset-light, well-covered interest and a strong Z-score → YELLOW. Step-3 inputs are estimates; leverage should fall quickly on FCF.',
  },
});

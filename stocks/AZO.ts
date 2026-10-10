import { defineStock } from './defineStock';

export const AZO = defineStock({
  ticker: 'AZO',
  name: 'AutoZone',
  sector: 'Specialty Retail',
  themeColor: '#e74c3c',
  updatedOn: '10/09',
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-10',
  currentPrice: 2939.85,
  fairPriceRange: '$3,000 - $4,800',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 16.6,
  rev25: 20340,        // FY26A (Aug 2026) $20.3B (+7.4%) — base year; revGrowth[0] = FY27 (consensus $21.84B, FY28E $23.40B)
  fcfMargin25: 0.10,
  taxRate: 0.23,
  cash: 350,
  debt: 8500,
  beta: 0.80,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 170.78,     // FY27E (Aug 2027) EPS — stockanalysis consensus (Oct 9 2026; FY28E $192.37). FY26A $152.55 (Q4 $56.05, helped ~145bps of GM by tariff refunds + 105bps LIFO). Prior $144.9 was an FY26 estimate.
  rsRating: 16,         // NOT refreshed — awaiting user RS (10/10/2026)
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  // Q4 FY26 UPDATE (Sep 22, 2026) — first data review since Q2
  // ─────────────────────────────────────────────────────────────────────────
  // EPS $56.05 (+15%; vs ~$54.3-54.5 consensus) but flattered by tariff
  // refunds (~145bps of gross margin) and a 105bps non-cash LIFO benefit.
  // Net sales $6.6B (+5.6%) missed ~$6.71B. Same-store sales +1.5% cc
  // (domestic +1.6%, international +1.3% cc); weak first 8 weeks, stronger
  // last 8. FY26: sales $20.3B (+7.4%), EPS $152.55. Q4 buyback $698M.
  // Street: Strong Buy (27), PT $3,000-4,800 (median $3,648); FY27E EPS
  // $170.78 / rev $21.84B, FY28E $192.37 / $23.40B. Stock $2,940 — ~17×
  // FY27E, below the low PT (historical median ~22×).
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Mega-Hub density investment is a deliberate operating leverage setup — management guides EBIT acceleration in coming years',
    'Commercial segment gaining consistent market share with durable above-market growth rates',
    'Decades-long buyback program has retired the vast majority of shares outstanding, compounding per-share value structurally',
    'Auto parts demand is highly recession-resistant — older vehicle fleet and DIY maintenance insulate revenue in downturns',
    'Pricing power and inventory breadth create a distribution moat that newer entrants cannot quickly replicate',
  ],

  risksToBuy: [
    'Heavy capital expenditure in the current investment cycle is depressing near-term FCF and earnings visibility',
    'Same-store traffic declined recently, raising questions about whether the demand acceleration thesis will materialize',
    'Commercial mix shift toward professional installers compresses gross margin relative to the higher-margin DIY segment',
    'Significant structural debt load from systematic leveraged buybacks could become a constraint if rates stay elevated',
    'RS rating shows severe institutional distribution — the market is not yet rewarding the long-term thesis',
  ],

  epsCagr: [4, 12, 15],   // Bear 7→4: the old bear (7% at 18x) still returned ~5%/yr
  exitPE: [14, 20, 23],   // Q4 FY26: trimmed from [18, 22, 24] — the stock now trades ~17× FY27E, so the base no longer assumes a full re-rate to the 22× historical median

  analystConsensus: { rating: 'Strong Buy', targetLow: 3000, targetMedian: 3648, targetHigh: 4800, numAnalysts: 27 },  // stockanalysis.com, Oct 9 2026
  prob: [20, 45, 35],

  revGrowth: [
    [0.05, 0.04, 0.035, 0.03, 0.03],   // Bear: traffic stays weak, commercial share gains slow
    [0.074, 0.071, 0.065, 0.06, 0.06], // Base: FY27/FY28 ≈ consensus $21.8B / $23.4B
    [0.085, 0.08, 0.075, 0.07, 0.07],  // Bull: Mega-Hub productivity + commercial acceleration
  ],
  fcfMargin: [
    [0.07, 0.075, 0.08, 0.08, 0.08],
    [0.08, 0.09, 0.10, 0.11, 0.115],
    [0.09, 0.10, 0.115, 0.125, 0.13],
  ],
  exitMultiple: [12, 15, 18],
  desc: [
    'Investment cycle fails to generate expected returns. Over-expansion dilutes ROIC, commercial mix compresses margins structurally. ' +
      'Traffic declines persist, macro pressure stalls SSS. Tariff-refund and LIFO tailwinds reverse. EPS compounds at only ~4% from the $170.78 FY27E base; P/E compresses to ~14x. 5yr target {target} ({cagr} annualized).',
    'FY26 investment phase completes on plan. Mega-Hub density drives operating leverage in FY27–28, EBIT accelerates as guided. ' +
      'Commercial continues gaining share at +9–10% pace. LIFO normalizes. EPS compounds ~12% from $170.78. P/E recovers modestly from ~17x to ~20x (below the ~22x historical median). 5yr target {target} ({cagr} annualized).',
    'Mega-Hub strategy beats expectations — store productivity ramps faster than modeled. Commercial accelerates to +12–15%, international gains traction. ' +
      'FY27 EBIT inflection becomes visible to the market; RS re-rates sharply. 15% EPS CAGR sustained. Market assigns ~23x on proven execution. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.015, 0.02, 0.025],
  bbRate: [0.03, 0.04, 0.05],
  ebitdaProxy: [0.20, 0.22, 0.24],
  bullMaOptVal: false,
  debtSafety: {
    netDebt: 8150,
    ebitda: 3500,
    capexToOcf: 0.18,
    interestCoverage: 6.5,
    altmanZ: 3.6,
    fy: 'FY25',
    note: 'Intentional leverage — AZO has systematically borrowed to fund buybacks for 25+ years, retiring 90%+ of shares outstanding. At 2.3× EBITDA with strong interest coverage and predictable auto-parts cash flows, this is a capital allocation strategy, not distress.',
  },
});

import { defineStock } from './defineStock';

export const ASML = defineStock({
  ticker: 'ASML',
  name: 'ASML Holding',
  sector: 'Semiconductor Equipment · EUV Lithography',
  themeColor: '#0064d2',
  updatedOn: '10/09',
  currentPrice: 1780.34,
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$868 - $2,902',  // stockanalysis.com analyst target range (Oct 9 2026)
  shares0: 384.1,
  rev25: 37900,        // FY2025A €32.7B × ~1.16 USD/EUR; revGrowth[0] = FY26 (guide €43-45B raised at Q2; consensus €42.9B), FY27E €54.7B
  fcfMargin25: 0.30,
  taxRate: 0.15,
  cash: 8650,          // stockanalysis (Oct 2026), USD
  debt: 2260,
  beta: 1.15,
  costDebt: 0.025,
  rsRating: 94,         // IBD RS per user, 10/11/2026 (was 94)
  rsTrend: 'flat',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 15, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Net sales €9.3B (above guide on Installed Base Mgmt €2.8B; systems
  // €6.6B), GM 54.0%, net income €2.9B. FY26 GUIDE RAISED to €43-45B, GM
  // 54-56% (~+35% y/y). Q3 guide €11.0-12.0B, GM 55-57%. Demand driven by AI
  // accelerators and DRAM pricing (EUV layer count rising). Street: Strong
  // Buy (37 of 42 Buy/Strong Buy), PT $868-2,902 (median $2,158); FY26E rev
  // €42.9B / EPS €38.47, FY27E €54.7B / €52.20. Stock $1,780 (~32× FY26E,
  // ~29× FY27E in USD). Q3 2026 reports mid-October.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Sole supplier of EUV lithography globally — no credible competitor exists, making this a structural monopoly for decades.',
    'High-NA transition deepens the moat as the most advanced nodes below two nanometers require next-generation ASML machines.',
    'Massive installed base generates a growing, high-margin service and upgrade revenue stream largely independent of new-tool cycles.',
    'AI accelerator and DRAM demand pushed the full-year outlook sharply higher, well ahead of the long-term plan trajectory.',
    'Multi-billion euro buyback program consistently reduces share count, compounding per-share earnings growth on top of revenue gains.',
  ],

  risksToBuy: [
    'At a premium forward multiple, even a modest cycle pause or TSMC capex delay translates directly into painful downside.',
    'After a huge step-up year, the setup assumes chipmaker and memory capex stays elevated — any digestion phase hits orders hard.',
    'Export restrictions on China sales could remove a significant revenue chunk with little warning or offsetting volume.',
    'High-NA ramp depends on Intel qualification proceeding on schedule — delays would defer a key multi-year growth driver.',
    'The stock has rallied hard over the past year, so the valuation already discounts much of the memory and AI upcycle.',
  ],

  prob: [30, 40, 30],

  analystConsensus: { rating: 'Strong Buy', targetLow: 868, targetMedian: 2158, targetHigh: 2902, numAnalysts: 42 },  // stockanalysis.com (Oct 9 2026)
  // CALIBRATION (Oct 11 2026): scenarios aligned to the InvestAnswers 2030
  // price targets (framework dated Jul 27 2026) — bear $2,000 / expected
  // $3,000 / bull $4,200. Model now: ~$2,000 / ~$3,000 / ~$4,200.
  revGrowth: [
    [0.33, 0.18, 0.08, 0.08, 0.07],   // Bear: FY26 ≈ guide, FY27 short of consensus, then a shallow capex digestion (no outright decline)
    [0.34, 0.26, 0.14, 0.12, 0.10],   // Base: FY26 ≈ €43.5B, FY27 ≈ €54.7B consensus, then High-NA keeps growth double-digit
    [0.36, 0.28, 0.16, 0.13, 0.11],   // Bull: AI + DRAM EUV intensity sustain a multi-year supercycle
  ],
  fcfMargin: [
    [0.28, 0.29, 0.30, 0.30, 0.31],
    [0.29, 0.30, 0.31, 0.31, 0.32],
    [0.31, 0.33, 0.34, 0.35, 0.36],
  ],
  exitMultiple: [29, 31, 31],
  desc: [
    'After the FY26 step-up, FY27 falls short of consensus and TSMC, Samsung and memory makers slow orders; growth settles in the high single digits. ' +
      'Margins hold near the mid-50s gross margin range, but the multiple drifts down from today\'s premium. 5yr target {target} ({cagr} annualized).',
    'FY26 lands near the raised €43-45B guide and FY27 grows ~25% on AI accelerator and DRAM EUV demand, then growth settles in the low double digits. ' +
      'High-NA ramps on schedule and the installed base keeps compounding; buybacks add to per-share growth. 5yr target {target} ({cagr} annualized).',
    'An AI capex supercycle drives sustained advanced-logic and DRAM buildout, High-NA becomes standard at 2nm and below, and EUV layer counts keep rising. ' +
      'Revenue compounds well past the long-term plan and margins expand toward the high-50s. 5yr target {target} ({cagr} annualized).',
  ],

  ebitdaProxy: [0.45, 0.48, 0.55],
  bbRate: [0.01, 0.02, 0.025],
  debtSafety: {
    netDebt: -6390,        // Oct 2026: ~$2.26B debt − ~$8.65B cash (stockanalysis)
    ebitda: 15380,         // TTM EBITDA (stockanalysis)
    fy: 'TTM Q2 2026',
    note: 'Net cash ~$6.4B. EUV monopoly generates strong cash flows; balance sheet is conservatively managed.',
  },
});

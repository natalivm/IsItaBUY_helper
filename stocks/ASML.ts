import { defineStock } from './defineStock';

export const ASML = defineStock({
  ticker: 'ASML',
  name: 'ASML Holding',
  sector: 'Semiconductor Equipment · EUV Lithography',
  themeColor: '#0064d2',
  updatedOn: '10/29',
  currentPrice: 1662.85,
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


  prob: [30, 40, 30],

  analystConsensus: { rating: 'Strong Buy', targetLow: 868, targetMedian: 2158, targetHigh: 2902, numAnalysts: 42 },  // stockanalysis.com (Oct 9 2026)
  revGrowth: [
    [0.28, 0.02, -0.05, 0.04, 0.04],  // Bear: FY26 at low end of guide, then a memory/logic capex digestion
    [0.33, 0.22, 0.10, 0.09, 0.08],   // Base: FY26 ≈ €43.5B, FY27 ~€53B (haircut vs €54.7B consensus), then normal cycle
    [0.36, 0.28, 0.16, 0.13, 0.11],   // Bull: AI + DRAM EUV intensity sustain a multi-year supercycle
  ],
  fcfMargin: [
    [0.24, 0.22, 0.22, 0.24, 0.24],
    [0.29, 0.30, 0.31, 0.31, 0.32],
    [0.31, 0.33, 0.34, 0.35, 0.36],
  ],
  exitMultiple: [20, 25, 30],
  desc: [
    'After the FY26 step-up, TSMC, Samsung and memory makers pause and orders fall; revenue drifts lower into FY28 before recovering. ' +
      'Margins slip back toward the low-50s gross margin range and the multiple compresses toward its historical floor. 5yr target {target} ({cagr} annualized).',
    'FY26 lands near the raised €43-45B guide and FY27 grows ~20%+ on AI accelerator and DRAM EUV demand, then growth normalizes to high single digits. ' +
      'High-NA ramps on schedule and the installed base keeps compounding; buybacks add to per-share growth. 5yr target {target} ({cagr} annualized).',
    'An AI capex supercycle drives sustained advanced-logic and DRAM buildout, High-NA becomes standard at 2nm and below, and EUV layer counts keep rising. ' +
      'Revenue compounds well past the long-term plan and margins expand toward the high-50s. 5yr target {target} ({cagr} annualized).',
  ],

  ebitdaProxy: [0.35, 0.45, 0.55],
  bbRate: [0.01, 0.02, 0.025],
  debtSafety: {
    netDebt: -6390,        // Oct 2026: ~$2.26B debt − ~$8.65B cash (stockanalysis)
    ebitda: 15380,         // TTM EBITDA (stockanalysis)
    fy: 'TTM Q2 2026',
    note: 'Net cash ~$6.4B. EUV monopoly generates strong cash flows; balance sheet is conservatively managed.',
  },
});

import { defineStock } from './defineStock';

export const KLAC = defineStock({
  ticker: 'KLAC',
  name: 'KLA Corporation',
  sector: 'Semiconductor Equipment · Process Control & Inspection',
  themeColor: '#00539b',
  currentPrice: 174.46,
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$175 - $325',  // stockanalysis.com analyst target range (Oct 6 2026)
  shares0: 1310,             // ~1,310M shares post 10:1 split (Jun 11 2026)
  rev25: 13580,              // FY26A (Jun 2026) $13.58B — base year; revGrowth[0] = FY27 (consensus $18.1B, +34%), FY28E $21.5B
  fcfMargin25: 0.28,         // TTM FCF $3.77B / rev $13.58B
  taxRate: 0.12,
  cash: 4900,
  debt: 6150,
  beta: 1.25,
  costDebt: 0.035,
  modelType: 'EPS_PE',
  baseEps: 5.44,             // FY27E (Jun 2027) non-GAAP EPS consensus (FY26A $3.76 non-GAAP / $3.66 GAAP; FY28E $6.74 +24%). Q1 FY27 guide $1.16 ± 0.10.
  rsRating: 88,              // IBD RS per user, 10/11/2026 (was 94)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q4 FY26 UPDATE (Jul 28, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record revenue $3.66B (+15% y/y; beat $3.6B), non-GAAP EPS $1.05 (beat
  // $1.00). FY26: revenue $13.58B, GAAP EPS $3.66. 10-for-1 split done Jun
  // 11 2026 (all figures split-adjusted). Q1 FY27 GUIDE: revenue $4.0B ±
  // $0.2B, non-GAAP EPS $1.16 ± 0.10, GM 62.5%. CY26 WFE outlook raised to
  // the low-$150B range; mgmt expects momentum to accelerate in 2H26 and
  // continue through 2027. Street: Buy (30), PT $175-325 (median $228.50);
  // FY27E rev $18.1B / EPS $5.44, FY28E $21.5B / $6.74. Stock $195.57 (~36×
  // FY27E, ~29× FY28E), up ~84% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Monopolistic process control position means yield management is the last thing fabs cut in any downturn',
    'Data and analytics network effect creates switching costs that go far beyond hardware replacement costs alone',
    'Process control intensity is structurally rising with HBM, advanced packaging, and EUV layers at leading-edge nodes',
    'Service business growing at the high end of its long-term target, adding recurring revenue that smooths cycle volatility',
    'EPS outgrows revenue via operating leverage and buybacks, compounding shareholder returns above the already-strong revenue CAGR',
  ],

  risksToBuy: [
    'Elevated forward multiple means even a normal mid-cycle pause delivers significant multiple compression and double-digit losses',
    'China exposure in the mid-to-high twenties of revenue is a material risk if export restrictions tighten further',
    'Sold-out capacity and a sharply rising wafer-fab-equipment outlook are classic peak-cycle signals that often precede demand disappointments',
    'The stock has nearly doubled in a year, so the valuation already assumes the 2026-27 upcycle plays out in full',
    'Bull case requires both the AI supercycle to extend and the premium multiple to hold — a dual dependency that rarely persists',
  ],

  epsCagr: [6, 13, 20],      // From the FY27E $5.44 base (re-based Oct 2026): base = FY28 +24% surge then a normal semicap cycle
  exitPE: [20, 27, 35],      // From ~36× FY27E today; KLAC's 10-yr norm is low-to-mid 20s
  prob: [25, 55, 20],

  analystConsensus: { rating: 'Buy', targetLow: 175, targetMedian: 228.5, targetHigh: 325, numAnalysts: 30 },  // stockanalysis.com (Oct 6 2026)
  revGrowth: [
    [0.25, 0.00, -0.06, 0.04, 0.04],  // bear: FY27 below consensus, then a WFE digestion
    [0.32, 0.15, 0.07, 0.08, 0.08],   // base: FY27 ≈ $17.9B, FY28 ~$20.6B (haircut vs $21.5B), then normal cycle
    [0.35, 0.20, 0.13, 0.12, 0.10],   // bull: AI/HBM/advanced packaging supercycle extends
  ],
  fcfMargin: [
    [0.30, 0.30, 0.31, 0.31, 0.32],  // bear: margin pressure from cycle downturn
    [0.34, 0.35, 0.37, 0.38, 0.39],  // base: operating leverage drives expansion
    [0.36, 0.38, 0.40, 0.42, 0.44],  // bull: full leverage + services attach rate
  ],
  exitMultiple: [16, 22, 28],
  desc: [
    'Semicap cycle rolls over after the FY27 surge: AI capex moderates, memory and logic customers digest capacity, and China restrictions tighten. ' +
      'EPS compounds only ~6% from the FY27E $5.44 base and the multiple compresses to ~20x, the low end of its historical range. 5yr target {target} ({cagr} annualized).',
    'FY27 lands near the ~$18B consensus as WFE climbs into the low-$150B range, FY28 grows mid-teens, then a normal cycle. ' +
      'HBM, advanced packaging and leading-edge nodes keep raising process-control intensity; services compound steadily. ' +
      'EPS compounds ~13% from $5.44; P/E settles at 27x. 5yr target {target} ({cagr} annualized).',
    'AI supercycle extends through 2028-2029: EUV layers, HBM and advanced packaging drive disproportionate inspection demand and share gains. ' +
      'Margins expand, buybacks accelerate EPS, and EPS compounds ~20%. Premium 35x multiple holds. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'The main risk is cycle, not competition. Semicap equipment follows classic 2-3 year capex cycles, and a sold-out backlog with a sharply raised WFE outlook is a classic peak-cycle signal. ' +
      'China remains a large share of revenue and export rules can tighten without warning. From a mid-30s forward multiple, even a normal mid-cycle pause produces meaningful multiple compression.',
    "KLAC's process control franchise is real — yield management is the last thing fabs cut. The data/analytics/uptime network effect creates switching costs beyond hardware. " +
      'Process-control intensity rises on leading-edge logic, HBM and advanced packaging. EPS outgrows revenue via operating leverage and buybacks, but the market already prices much of the trajectory.',
    'AI capex extends beyond 2028: HBM intensity, advanced packaging and 2nm-and-below nodes create new inspection TAM, and share gains continue in reticle, e-beam and packaging. ' +
      "Key requirements: the cycle doesn't break AND the premium multiple holds.",
  ],

  ebitdaProxy: [0.40, 0.47, 0.55],
  bbRate: [0.01, 0.02, 0.025],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
    },
  ],

  updatedOn: '10/15',

  debtSafety: {
    netDebt: 1250,         // Oct 2026: ~$6.15B debt − ~$4.90B cash (stockanalysis)
    ebitda: 6050,          // TTM EBITDA
    fy: 'FY26',
    note: 'GREEN (~0.2×). Modest net debt against strong, high-margin cash flow.',
  },
});

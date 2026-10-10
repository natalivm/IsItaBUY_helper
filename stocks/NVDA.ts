import { defineStock } from './defineStock';

export const NVDA = defineStock({
  ticker: 'NVDA',
  name: 'NVIDIA Corporation',
  sector: 'Semiconductors / AI Infrastructure',
  themeColor: '#76b900',
  currentPrice: 229.28,
  fairPriceRange: '$180 - $515',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 24400,
  rev25: 215900,       // FY26A (Jan 2026); FY27E consensus $411.7B (+91%), FY28E $692.2B (+68%; CFO reportedly guided ~70%)
  fcfMargin25: 0.41,
  taxRate: 0.17,
  cash: 60600,
  debt: 10800,
  beta: 1.65,
  costDebt: 0.035,
  rsRating: 96,         // IBD RS per user, 10/10/2026 (was 76)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'De facto monopoly on AI training infrastructure with every major hyperscaler locked into the Blackwell platform',
    'Data center networking growing faster than compute — a second structural growth engine emerging',
    'Vera Rubin architecture extends the upgrade cycle well beyond current-generation GPU demand',
    'Inference, sovereign AI, and enterprise adoption broadening the buyer base beyond hyperscalers',
    'Massive net cash position and accelerating capital return via buybacks and dividend growth',
  ],

  risksToBuy: [
    'China revenue permanently zeroed out by export controls, removing a previously meaningful growth segment',
    'Hyperscaler AI capex cycle could plateau or reverse, triggering abrupt demand digestion',
    'Custom silicon from Google, Amazon, and Microsoft could displace Blackwell at the margin over time',
    'Valuation already prices in a multi-year supercycle — any deceleration compresses the multiple sharply',
    'Cyclicality risk: the market re-rates NVDA as a chip company, not a software-moat compounder, on any miss',
  ],

  updatedOn: '10/09',
  lastReportTag: 'Q2 FY27',
  dataReviewedOn: '2026-10-10',

  // Q2 FY27 UPDATE (Aug 26, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $96.2B (+106% y/y, +18% q/q) vs ~$92.1B consensus. Data Center
  // $89.0B (+117%): hyperscalers ~$48.7B, AI cloud/industrial/enterprise
  // ~$40.3B. GM 75.0%. Non-GAAP EPS $2.22 (vs ~$2.09), GAAP $2.46. Q3 GUIDE:
  // revenue $108.0B ±2%, GM ~74%, no China data-center compute assumed. CFO
  // reportedly pointed to ~70% FY28 revenue growth (single source). Vera
  // Rubin in full production (CoreWeave, Google Cloud, Azure, OCI, Nebius).
  // Street: Strong Buy (62), PT $180-515 (median $315); FY27E EPS $9.31 /
  // rev $411.7B, FY28E $15.91 / $692.2B. Stock $229 — ~25× FY27E, ~14× FY28E.
  // ─────────────────────────────────────────────────────────────────────────
  analystConsensus: { rating: 'Strong Buy', targetLow: 180, targetMedian: 315, targetHigh: 515, numAnalysts: 62 },  // stockanalysis.com, Oct 9 2026
  revGrowth: [
    [0.85, 0.05, -0.05, 0.02, 0.01],  // Bear: FY27 ~locked (H1 + Q3 guide); AI capex digests from FY28
    [0.88, 0.48, 0.15, 0.10, 0.08],   // Base (+2%/yr revPrem): FY27 ≈ consensus $411B, FY28 +50% (haircut vs +68%), then normalizes
    [0.88, 0.65, 0.24, 0.18, 0.13],   // Bull (+2-3%/yr revPrem): FY28 at/above consensus, Rubin super-cycle
  ],
  fcfMargin: [
    [0.42, 0.38, 0.34, 0.32, 0.30],
    [0.50, 0.49, 0.48, 0.47, 0.46],
    [0.54, 0.53, 0.52, 0.52, 0.52],
  ],
  exitMultiple: [16, 24, 30],
  desc: [
    'FY27 delivers (~$410B), but hyperscaler AI capex digests from FY28, sovereign/enterprise AI fails to compensate, and the market re-rates NVDA as cyclical at ~16× EBITDA. 5yr target {target} ({cagr} annualized).',
    'FY27 lands near the ~$411B consensus (Q3 guided to $108B ex-China) and FY28 grows ~50% on the Vera Rubin ramp; FCF margin holds near 50%, then growth normalizes. P/E compresses through earnings growth. 5yr target {target} ({cagr} annualized).',
    'Rubin super-cycle in H2 FY27 accelerates content/GW expansion, sovereign AI + inference wave broadens TAM beyond hyperscalers, agentic AI / RL drive new CPU (Grace) growth, networking becomes second growth engine — FCF far exceeds $200B by FY28. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.01, 0.02, 0.025],
  ebitdaProxy: [0.55, 0.62, 0.66],
  bullMaOptVal: 187 * 24400 * 0.04,

  driverOverrides: [
    {},
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.01, 0.01, 0.01],
    },
    {
      revPrem: [0.03, 0.03, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
    },
  ],

  burry: {
    sbc: 6386,
    gaapNi: 120067,
    buyback: 48035,
    epsBasis: 'GAAP',
    fy: 'FY26',
    overstatementPct: 29,
    overstatementSource: 'burry-published',
    note: 'Elevated per Burry — real owner profit ~71% of GAAP. FY26 actuals (TIKR): SBC $6,386M, GAAP NI $120,067M, buybacks $48,035M (+18% YoY from $40,638M FY25). Naive SBC/NI is only 5.3%, but with NVDA stock 6.7× since 2022 grants, the true MTM economic cost is ~$43B/yr — buybacks ($48B) more than cover it on a cash basis, but Burry still recognizes the SBC adjustment because the dilution is real regardless of how the buybacks are spent. Calibrated 4y-MTM formula reproduces 30.5% from these inputs, within 1.5pp of Burry\'s 29%.',
  },
  debtSafety: {
    netDebt: -49800,
    ebitda: 90000,
    fy: 'FY26',
    note: 'Massive net cash position ($60.6B cash vs $10.8B debt). Zero leverage concern.',
  },
});

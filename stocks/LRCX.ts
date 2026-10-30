import { defineStock } from './defineStock';

export const LRCX = defineStock({
  updatedOn: '10/30',
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-11',
  ticker: 'LRCX',
  name: 'Lam Research Corporation',
  sector: 'Semiconductor Equipment · Etch & Deposition',
  themeColor: '#005baa',
  currentPrice: 254.39,
  fairPriceRange: '$290 - $500',  // stockanalysis.com analyst target range (Oct 8 2026)
  shares0: 1250,           // ~1.25B shares (stockanalysis, Oct 2026); post 10:1 split (Oct 2024)
  rev25: 23230,            // FY26A (Jun 2026) $23.23B — base year; revGrowth[0] = FY27 (consensus $34.8B, +50%), FY28E $41.3B
  fcfMargin25: 0.21,       // TTM FCF $4.89B / rev $23.23B
  taxRate: 0.12,
  cash: 5580,             // Jun 2026 (stockanalysis)
  debt: 4120,
  beta: 1.35,
  costDebt: 0.035,
  modelType: 'EPS_PE',
  baseEps: 9.47,           // FY27E (Jun 2027) non-GAAP EPS consensus (range $8.44-10.82; FY26A $5.82, FY28E $11.76 +24%)
  rsRating: 92,            // IBD RS per user, 10/11/2026 (was 96)
  rsTrend: 'flat',
  aiImpact: 'TAILWIND',
  // Q4 FY26 UPDATE (Jul 29, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // June-qtr revenue $6.72B (+15% q/q, above guide midpoint), non-GAAP GM
  // 52.0%, op margin 38.4%, EPS $1.82; NAND revenue doubled q/q. FY26:
  // revenue $23.23B (+26%), EPS $5.82 (+41%). Sep-qtr guide ~$8.1B revenue;
  // CY26 WFE raised to the low-$150B range. Street: Strong Buy (35), PT
  // $290-500 (median $385); FY27E rev $34.8B (+50%) / EPS $9.47 (+63%),
  // FY28E $41.3B / $11.76. Stock $318.84 (~34× FY27E), up ~124% in 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────


  epsCagr: [4, 12, 19],    // From the FY27E $9.47 base (re-based Oct 2026) — FY27 is a +63% surge year, so base = FY28 +20%ish then a normal cycle
  exitPE: [18, 26, 34],    // From ~34× FY27E; Lam's historical range is high-teens to mid-20s
  prob: [20, 45, 35],

  analystConsensus: { rating: 'Strong Buy', targetLow: 290, targetMedian: 385, targetHigh: 500, numAnalysts: 35 },  // stockanalysis.com (Oct 8 2026)
  revGrowth: [
    [0.40, -0.05, -0.10, 0.05, 0.05],  // bear: FY27 below consensus, then NAND/DRAM digestion and China drag
    [0.47, 0.15, 0.03, 0.07, 0.07],    // base: FY27 ~$34.1B (haircut vs $34.8B), FY28 ~$39B, then a normal cycle
    [0.52, 0.22, 0.12, 0.10, 0.10],    // bull: NAND greenfield + HBM + GAA extend the upcycle
  ],
  fcfMargin: [
    [0.25, 0.25, 0.26, 0.27, 0.27],  // bear: mix headwinds persist, margin pressure from less rich product mix
    [0.28, 0.29, 0.30, 0.31, 0.32],  // base: margins recover post-mix normalization, operating leverage
    [0.30, 0.32, 0.33, 0.34, 0.35],  // bull: volume leverage + CSBG attach + advanced packaging premium
  ],
  exitMultiple: [14, 20, 26],
  desc: [
    'The memory-led surge proves a peak: after FY27, NAND and DRAM customers digest capacity, China spending fades and revenue falls for two years. ' +
      'EPS compounds only ~4% from the FY27E $9.47 base and the multiple reverts to ~18x, a historical trough. 5yr target {target} ({cagr} annualized).',
    'FY27 lands near the ~$34B consensus on NAND upgrades and AI-driven WFE, FY28 grows mid-teens, then the cycle normalizes. ' +
      'Services keep compounding and buybacks continue. EPS compounds ~12% from $9.47; P/E settles at 26x. 5yr target {target} ({cagr} annualized).',
    'AI supercycle extends through 2028-2029: NAND greenfield, HBM stacking, GAA at 2nm and below and advanced packaging all need more etch and deposition steps. ' +
      'Share gains continue and EPS compounds ~19%; premium 34x multiple holds. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Bear mechanics: WFE cycles historically run 2-3 strong years before digestion, and FY27 is shaping up as a record, memory-led surge. ' +
      'NAND revenue doubling in a quarter is spectacular but historically volatile; China and the rest of Asia dominate the revenue mix, so a policy shock or memory pause hits hard. ' +
      'Multiple sensitivity dominates — a normal WFE pause plus mean reversion in the P/E is enough for a large drawdown.',
    'Base case: Lam is the prime beneficiary of NAND upgrades, HBM and GAA etch intensity, with a large installed base (services) that cushions downturns. ' +
      'Margins are at record levels and buybacks add steadily to EPS. The problem: the market already prices a big part of this trajectory at a mid-30s forward multiple.',
    'Bull case requires the AI/memory capex supercycle to extend beyond 2028 and Lam to keep gaining share in a much larger WFE market. ' +
      'Key enablers: NAND greenfield, HBM stacking (deposition-heavy), backside power and 3D-IC packaging, plus higher services monetization.',
  ],


  termGrowth: [0.015, 0.025, 0.03],
  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.30, 0.38, 0.44],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.005, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
    },
  ],

  debtSafety: {
    netDebt: -1460,        // Jun 2026: ~$4.12B debt − ~$5.58B cash (stockanalysis)
    ebitda: 8640,          // TTM EBITDA
    fy: 'FY26',
    note: 'Net cash ~$1.5B. Step 1 GREEN — heavy buybacks keep the cushion modest, but leverage is negligible.',
  },

  burry: {
    sbc: 343,
    gaapNi: 5358,
    buyback: 3422,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 49,
    overstatementSource: 'burry-published',
    note: 'Critical per Burry — real owner profit ~51% of GAAP. FY25 actuals (TIKR): SBC $343M, GAAP NI $5,358M, buybacks $3,422M. Naive lens looks heroic (buybacks 13× SBC, 5y diluted share count down 12.9%), but the post-split stock has appreciated ~10× since most awards were granted — so the GAAP charge captures only ~10% of true economic SBC cost at MTM. Burry: "buybacks aren\'t returning capital — they\'re laundering SBC at 10× cost."',
  },
});

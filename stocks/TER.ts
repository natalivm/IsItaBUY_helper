import { defineStock } from './defineStock';

export const TER = defineStock({
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  ticker: 'TER',
  name: 'Teradyne, Inc.',
  sector: 'Semiconductor Equipment · Test & Automation',
  themeColor: '#f59e0b',
  currentPrice: 402.68,
  fairPriceRange: '$350 - $550',  // stockanalysis.com analyst target range (Sep 12 2026)
  shares0: 157,
  rev25: 3190,         // FY2025; FY26E consensus ~$5.1B (+60%)
  fcfMargin25: 0.141,
  taxRate: 0.20,
  cash: 900,           // stale — not refreshed
  debt: 100,           // stale — not refreshed
  beta: 1.84,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 9.09,       // FY26E non-GAAP EPS — stockanalysis consensus (Sep 12 2026; range $8.82-9.35). Q2 $2.47; Q3 guide $1.85-2.15 (sequential dip). Prior $6.43 predated the AI-test surge.
  rsRating: 99,         // NOT refreshed — awaiting user RS (10/10/2026)
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 28, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Second straight record quarter, above the top of guidance. Revenue
  // $1,329M (+104% y/y; Q1 $1,282M); Semi Test $1,122M, Product Test $107M,
  // Robotics $100M; record Memory revenue (DRAM + NAND final-test
  // resurgence). Non-GAAP EPS $2.47 (GAAP $2.38), earnings +300%. Q3 GUIDE:
  // revenue $1.20-1.30B, non-GAAP EPS $1.85-2.15 — a sequential dip after two
  // record quarters. CEO: robust AI demand; rising WFE sets up growth in
  // 2027+. Street: Buy (17), PT $350-550 (median $450); FY26E EPS $9.09 / rev
  // ~$5.1B. Stock $402.68 (~44× FY26E). (No split — PTs were stale.)
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'AI chips require far more testing per die, structurally raising the value of each tester sold',
    'HBM memory test is a dominant share position and grows as stack height and complexity increase',
    'Multiple overlapping AI demand waves — accelerators, memory, optics, edge — elongate the cycle',
    'GPU qualification in 2026 opens a large addressable market currently owned by a single rival',
    'Operating leverage is strong as the fixed-cost base absorbs revenue growth at expanding margins',
  ],

  risksToBuy: [
    'CEO explicitly flagged a post-boom digestion period following the current growth phase',
    'ATE spending tracks the growth rate of chip revenue, not the level — any deceleration hits hard',
    'VIP compute revenue is dangerously concentrated in only two hyperscaler ASIC programs',
    'GPU market penetration is a multi-year ramp against an entrenched and dominant competitor',
    'Stock trades at a demanding multiple during the earnings-expansion phase of a semicap mini-cycle',
  ],

  epsCagr: [2, 9, 14],
  exitPE: [18, 22, 28],
  prob: [20, 50, 30],

  analystConsensus: { rating: 'Buy', targetLow: 350, targetMedian: 450, targetHigh: 550, numAnalysts: 17 },  // stockanalysis.com (Sep 12 2026)
  revGrowth: [
    [0.58, -0.10, -0.05, 0.03, 0.03], // Bear: FY26 ~locked (~$5.0B); the CEO-flagged digestion hits FY27
    [0.60, 0.10, 0.08, 0.05, 0.05],   // Base: FY26 ≈ consensus ~$5.1B, then semicap-cycle normalization
    [0.62, 0.20, 0.15, 0.12, 0.10],   // Bull: GPU test share + HBM + CPO waves extend the cycle
  ],
  fcfMargin: [
    [0.12, 0.11, 0.10, 0.09, 0.10],
    [0.14, 0.16, 0.18, 0.19, 0.20],
    [0.16, 0.19, 0.22, 0.24, 0.25],
  ],
  exitMultiple: [12, 18, 24],
  desc: [
    'CEO-confirmed "4-quarter boom → digestion" plays out. 1H26 strong then ATE spending drops as AI chip revenue growth rate decelerates ' +
      '(ATE demand = derivative of growth rate, not revenue level). VIP compute concentration (only 2 ASIC programs at scale) means one socket delay collapses revenue. ' +
      'GPU penetration stalls at low single digits vs Advantest. EPS barely grows from the $9.09 FY26E base and P/E compresses to 18x. 5yr target {target} ({cagr} annualized).',
    'AI waves (accelerators → HBM → co-packaged optics → edge AI) elongate cycle beyond single 4-quarter boom. Digestion periods shorter and shallower. ' +
      'ATE TAM reaches $10-12B (below mgmt $12-14B target). TER revenue ~$5B. HBM test TAM rises structurally (8→12-high stacks, HBM3→HBM4E). ' +
      'GPU qualification succeeds. EPS compounds ~9% from the $9.09 FY26E (AI-boom) base; P/E compresses from ~44x to 22x. 5yr target {target} ({cagr} annualized).',
    'Full mgmt target model validates: ATE TAM $12-14B, TER ~$6B revenue, EPS $9.5-11, op margin 30-34%. Multiple AI waves sustain demand. ' +
      'GPU share reaches 30% (3-year ramp from qualification). HBM >50% share compounds as stacks grow. Networking test benefits from 3 main players. ' +
      'EPS compounds ~14% at a 28x exit. 5yr target {target} ({cagr} annualized) — even the bull case struggles to beat the current price meaningfully.',
  ],
  thesis: [
    'CEO himself said: "4-quarter boom then digestion." ATE growth = derivative of chip revenue growth rate — when AI growth slows, ATE drops sharply ' +
      'even if AI revenue still grows. VIP compute = only 2 hyperscaler ASIC programs at scale (extreme concentration). ' +
      'GPU opportunity is 3+ year penetration story against Advantest dominance (currently near-zero share). ' +
      'Forward P/E ~44x on FY26E in the "earnings expansion phase" of the semicap cycle — with Q3 already guided down sequentially — is a classic setup for a post-peak correction.',
    'AI raised test intensity structurally: HBM + AI accelerators + networking chips = expensive/complex/high-power → more testers per wafer. ' +
      'Multiple waves (accelerators → memory → co-packaged optics → edge AI) make this longer than mobile boom. ' +
      'HBM test TAM structurally rising (>50% share, stack complexity increasing). GPU qualification in 2026 opens $2B+ addressable market. ' +
      'Operating leverage strong (EBIT 22%→30%+). Cycle elongated but digestion still inevitable.',
    'AI supercycle extends 5+ years with overlapping waves. GPU share ramp hits 30% by 2029 (from near-zero). ' +
      'HBM4/4E + 12-high stacks double memory test TAM. Co-packaged optics creates new test category. ' +
      'Edge AI devices (wave 4) provide demand floor when data center wave matures. ' +
      'Mgmt\'s old $6B revenue / $9.5-11 EPS target model is already being reached in FY26 — the bull case needs a new, higher plateau. Even so, from {spot} the return is only {cagr} annualized.',
  ],

  bbRate: [0.005, 0.015, 0.02],
  ebitdaProxy: [0.15, 0.25, 0.35],

  driverOverrides: [
    {},
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
    },
    {
      revPrem: [0.01, 0.015, 0.015, 0.01, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.015, 0.02],
    },
  ],

  debtSafety: {
    netDebt: -800,         // stale balance-sheet figures (cash $900M vs debt $100M) — net cash
    ebitda: 1600,          // FY26E: ~$5.1B × ~31% — approximate
    fy: 'FY26E',
    note: 'GREEN by Step 1 — net cash, negligible debt. The risk is semicap cyclicality, not leverage.',
  },
});

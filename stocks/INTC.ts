import { defineStock } from './defineStock';

export const INTC = defineStock({
  ticker: 'INTC',
  name: 'Intel Corporation',
  sector: 'Semiconductors / CPU & Foundry',
  themeColor: '#0071c5',
  updatedOn: '10/09',
  lastReportTag: 'Q2 FY26',
  dataReviewedOn: '2026-10-10',
  currentPrice: 104.7,
  fairPriceRange: '$80 - $200',  // stockanalysis.com analyst target range, Oct 6 2026
  shares0: 5104,          // ~5.10B diluted shares (Q2 FY26)
  rev25: 52500,           // FY2025 revenue ~$52.5B; FY26E consensus $63.1B (+20%), FY27E $72.4B (+15%)
  fcfMargin25: -0.02,     // FCF negative — massive foundry CapEx cycle
  taxRate: 0.10,
  cash: 29700,          // Jun 27 2026: $12.9B cash + $16.9B ST investments
  debt: 50500,          // Jun 27 2026: $2.0B ST + $48.5B LT
  beta: 1.5,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 1.52,          // FY2026E non-GAAP EPS — stockanalysis consensus (Oct 6 2026; FY27E $2.08, +37%). Q1 $0.29 + Q2 $0.42 (vs $0.20 guide) + Q3 guide $0.38. Prior $0.90 was the Q1-era estimate.
  rsRating: 76,          // IBD RS per user, 10/10/2026 (was 99)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',

  // Q2 FY26 UPDATE (Jul 23, 2026) — first data review since Q1
  // ─────────────────────────────────────────────────────────────────────────
  // Strongest growth in 15+ years. Revenue $16.1B (+25%): client (CCPG) $8.9B
  // (+13%), DCAI $6.3B (+59%), Foundry $5.8B (+31%, op loss narrowed to
  // ~$2.1B from ~$3.2B). Non-GAAP GM 41.8% (GAAP 40.4% vs 27.5%). Non-GAAP
  // EPS $0.42 vs $0.20 guide. GAAP loss $(11.0)B / $(2.16) — almost entirely
  // a non-cash $12.5B mark-to-market loss on CHIPS-Act escrowed shares for
  // the Dept. of Commerce (restructuring only $170M). OCF $7.0B; gross capex
  // $2.65B; adj. FCF $(8.4)B on a $(12.2)B partner contribution swing. Cash
  // $29.7B vs debt $50.5B. 18A: Xeon 6+ launched, 18A-P risk production on
  // schedule, Panther Lake subset in HVM on High-NA EUV. €5B Intel 3 capacity
  // expansion. No Apple update. Q3 GUIDE: revenue $15.8-16.8B, non-GAAP GM
  // 42%, EPS $0.38. Street: Buy (49), PT $80-200 (median $115); FY26E EPS
  // $1.52 / rev $63.1B, FY27E $2.08 / $72.4B. ~69× FY26E.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Government-backed foundry thesis — US took a strategic equity stake, with NVIDIA and SoftBank adding strategic investments',
    'Potential Apple deal to manufacture chips in US fabs — transformational revenue if it reaches scale',
    'Data-center revenue growing faster than in over a decade on AI server demand, with earnings accelerating off a low base',
    '18A process milestones are landing on schedule, with new server and PC chips already shipping on the node',
    'Respected turnaround CEO (Lip-Bu Tan) executing a credible restructuring',
  ],

  risksToBuy: [
    'Entire thesis hinges on the foundry reaching scale and breakeven years out — and the 18A node has a history of delays',
    'Apple deal is still preliminary, with no confirmed start date or volume; it could be scoped down or fall through',
    'Foundry loses billions a year at the operating line and free cash flow is negative, straining financial flexibility',
    'GAAP results remain deeply negative and volatile, driven by CHIPS-Act share mark-to-market swings and foundry losses',
    'Stock has re-rated sharply on narrative — valuation prices in near-perfect execution, leaving little margin of safety as ARM pressures client/data-center share',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 80, targetMedian: 115, targetHigh: 200, numAnalysts: 49 },  // stockanalysis.com, Oct 6 2026

  epsCagr: [10, 25, 35],   // Bull 45→35 at Q2 FY26: the base EPS rose from $0.90 to $1.52, so 45% off the new base would imply ~$9.8 FY31 EPS
  exitPE: [12, 18, 25],
  prob: [20, 55, 25],

  revGrowth: [
    [0.16, 0.02, 0.03, 0.03, 0.03],   // Bear: FY26 ~locked (H1 + Q3 guide); then products stagnate, foundry marginal wins
    [0.20, 0.15, 0.10, 0.08, 0.07],   // Base: FY26/FY27 ≈ consensus $63.1B / $72.4B, foundry ramps slowly
    [0.22, 0.20, 0.22, 0.20, 0.16],   // Bull: Apple/external foundry volume from 2028
  ],

  fcfMargin: [
    [-0.02, 0.00, 0.01, 0.02, 0.02],  // Bear: CapEx stays heavy, breakeven not achieved
    [0.01, 0.03, 0.05, 0.07, 0.08],   // Base: CapEx normalizes, FCF turns positive by 2028
    [0.04, 0.07, 0.11, 0.14, 0.16],   // Bull: foundry scale drives margin expansion
  ],

  exitMultiple: [7, 12, 18],

  desc: [
    'Foundry fails to win meaningful commercial customers — Apple deal is delayed, scoped down, or falls through. Products face increasing ARM competition in client computing and AMD pressure in data center. ' +
      'Intel Foundry CapEx ($15-18B/yr) continues without commensurate revenue growth; non-GAAP EPS compounds at only ~10% annually from the FY26 base. ' +
      'Market reprices Intel as a challenged legacy chipmaker at 12× FY31E non-GAAP EPS ~$2.45. 5-yr target: {target} ({return} from current), roughly {cagr} annualized. ' +
      'Probability: 20% — requires the Apple deal to materially disappoint AND the government narrative to lose market credibility.',
    'Foundry achieves modest but real scale: Apple preliminary agreement enters limited production by 2028-2029, Google Cloud adds volume, but breakeven pushed to 2030. ' +
      'Products segment stabilizes — Xeon holds data center position, AI PC provides modest tailwind, ARM attrition is gradual rather than sudden. ' +
      'Restructuring savings + volume leverage compound non-GAAP EPS at ~25% from the $1.52 FY26E base, reaching ~$4.65 by FY31. P/E compresses as turnaround premium fades. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Intel executes the roadmap; the stock simply priced in too much, too fast.',
    'Apple deal enters full production by 2028: iPhone A-series and Mac M-series manufactured at Intel US fabs, adding $18-25B in high-margin foundry revenue annually. ' +
      'Google Cloud and NVIDIA training chips follow, creating a credible US-based TSMC alternative with government contracts as anchor. ' +
      'Foundry reaches breakeven by 2028, profitability 2029+. Non-GAAP EPS compounds at ~35% from the $1.52 FY26E base to ~$6.80 by FY31; market awards 25× on confirmed foundry leadership. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized — modest given the execution risk required over 5 years. ' +
      'Probability: 25% — requires both perfect execution AND the Apple deal to materialize at full volume.',
  ],

  thesis: [
    'Bear mechanics: foundry contracts require 2-3 year qualification cycles; Apple deal has no confirmed start date or volume. ' +
      'Intel 18A process node delays have historically slipped 6-12 months — each slip extends the foundry loss period. ' +
      'ARM-based PCs (Apple Silicon, Qualcomm Snapdragon) already command 15%+ of the thin-and-light market; if ARM reaches 25-30%, Intel client margins compress materially. ' +
      'The $40B+ gross debt load and negative FCF constrain financial flexibility if the turnaround extends beyond 2030. ' +
      'At {spot}, even base-case execution delivers double-digit annualized losses — the bear case is catastrophic. The margin of safety is entirely narrative-dependent.',
    'Post Q2 FY26 the recovery is undeniable: revenue +25% (best in 15+ years), DCAI +59%, non-GAAP EPS more than double the guide, 18A milestones on schedule. ' +
      'CHIPS Act backing + NVIDIA/SoftBank equity investments means Intel has the financial runway to execute the 2028 foundry roadmap. ' +
      'Lip-Bu Tan (CEO since 2024) is one of Silicon Valley\'s most respected operators — he rebuilt Cadence; his restructuring credibility is the key intangible. ' +
      'The base case delivers real EPS growth (~25% CAGR) but the stock already prices it and more — the probability-weighted target sits well below {spot}, implying the market is pricing partial-bull execution at base-case probability. ' +
      'Verdict: business is on the right track; entry price is not.',
    'The bull case requires two simultaneous wins: Apple production volume (not just a pilot) AND foundry margin expansion above zero. ' +
      'Apple historically captures 50-60% of TSMC\'s top revenue tier. If Intel gets even half that volume at 20% foundry margins, that\'s $8-12B in annual foundry profit by 2030. ' +
      'Combined with products at $3-4B non-GAAP, EPS of $5-7 by FY31 is achievable; at 25x P/E → $125-175 stock. ' +
      'The risk: TSMC has a 5-year lead in process technology, yields, and customer trust. Intel 18A at 1.8nm must prove yield economics at Apple-scale volumes — never done before. ' +
      'Probability 25% — a genuine strategic optionality worth owning, but not at {spot} where you are already paying for most of the bull case.',
  ],

  termGrowth: [0.015, 0.020, 0.025],
  bbRate: [0.002, 0.005, 0.010],
  ebitdaProxy: [0.10, 0.18, 0.28],
  bullMaOptVal: false,

  burry: {
    sbc: 3500,
    gaapNi: -300,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'GAAP-loss year (NI $(0.3)B) — Burry framework inapplicable. Employee SBC ~$3.5B vs non-GAAP NI $1.9B = ~184% naive ratio; even at 1× MTM amplifier (stock near multi-year lows in FY24-25), real owner earnings are deeply negative. The dramatic 2026 re-rating amplifies future MTM cost substantially.',
  },

  debtSafety: {
    netDebt: 20800,        // Jun 27 2026: $50.5B debt − $29.7B cash & ST investments
    ebitda: 18000,         // approx. FY26E: non-GAAP op income + D&A ~$14B
    fy: 'FY26E',
    note: 'Net debt ~$20.8B at Q2 FY26 (~1.2× EBITDA, GREEN). Earlier: net debt ~$22B (gross debt $44B − cash $22B). EBITDA est. ~$15B (OCF $9.7B + D&A ~$14B approx). Leverage ~1.5× GREEN. Negative FCF from foundry CapEx is the real risk — not leverage ratio.',
  },
});

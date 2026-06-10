import { defineStock } from './defineStock';

export const INTC = defineStock({
  ticker: 'INTC',
  name: 'Intel Corporation',
  sector: 'Semiconductors / CPU & Foundry',
  themeColor: '#0071c5',
  updatedOn: '06/10',
  lastReportTag: 'Q1 FY26',
  currentPrice: 107.04,
  fairPriceRange: '$20 - $145',
  shares0: 5080,          // ~5.08B diluted shares (Q1 FY26)
  rev25: 52500,           // FY2025 revenue ~$52.5B
  fcfMargin25: -0.02,     // FCF negative — massive foundry CapEx cycle
  taxRate: 0.10,
  cash: 24000,
  debt: 44000,
  beta: 1.5,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 0.90,          // FY2026E non-GAAP EPS estimate (Q1 $0.29 + Q2 guide $0.20 + H2 ~$0.41)
  rsRating: 99,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',

  reasonsToBuy: [
    'Government-backed foundry thesis — US took a strategic equity stake, with NVIDIA and SoftBank adding strategic investments',
    'Potential Apple deal to manufacture chips in US fabs — transformational revenue if it reaches scale',
    'Data-center CPU recovery underway on AI server demand, with earnings accelerating off a low base',
    'Best-in-class relative strength and heavy institutional accumulation — momentum is firmly behind the stock',
    'Respected turnaround CEO (Lip-Bu Tan) executing a credible restructuring',
  ],

  risksToBuy: [
    'Entire thesis hinges on the foundry reaching scale and breakeven years out — and the 18A node has a history of delays',
    'Apple deal is still preliminary, with no confirmed start date or volume; it could be scoped down or fall through',
    'Foundry loses billions a year at the operating line and free cash flow is negative, straining financial flexibility',
    'Weak underlying fundamentals: negative margins and ROE, flat multi-year sales, and GAAP losses',
    'Stock has re-rated sharply on narrative — valuation prices in near-perfect execution, leaving little margin of safety as ARM pressures client/data-center share',
  ],

  analystConsensus: { rating: 'Hold', targetLow: 20, targetMedian: 88, targetHigh: 150, numAnalysts: 48 },

  epsCagr: [10, 25, 45],
  exitPE: [12, 18, 25],
  prob: [20, 55, 25],

  revGrowth: [
    [0.02, 0.02, 0.03, 0.03, 0.03],   // Bear: products stagnate, foundry marginal wins
    [0.07, 0.09, 0.11, 0.10, 0.08],   // Base: products stabilize, foundry ramps slowly
    [0.10, 0.18, 0.25, 0.22, 0.18],   // Bull: Apple deal adds massive foundry revenue from 2028
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
      'Market reprices Intel as a challenged legacy chipmaker at 12× FY31E non-GAAP EPS ~$1.45. 5-yr target: {target} ({return} from current), roughly {cagr} annualized. ' +
      'Probability: 20% — requires the Apple deal to materially disappoint AND the government narrative to lose market credibility.',
    'Foundry achieves modest but real scale: Apple preliminary agreement enters limited production by 2028-2029, Google Cloud adds volume, but breakeven pushed to 2030. ' +
      'Products segment stabilizes — Xeon holds data center position, AI PC provides modest tailwind, ARM attrition is gradual rather than sudden. ' +
      'Restructuring savings + volume leverage compound non-GAAP EPS at ~25% from the FY26 base, reaching ~$2.75 by FY31. P/E compresses as turnaround premium fades. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Intel executes the roadmap; the stock simply priced in too much, too fast.',
    'Apple deal enters full production by 2028: iPhone A-series and Mac M-series manufactured at Intel US fabs, adding $18-25B in high-margin foundry revenue annually. ' +
      'Google Cloud and NVIDIA training chips follow, creating a credible US-based TSMC alternative with government contracts as anchor. ' +
      'Foundry reaches breakeven by 2028, profitability 2029+. Non-GAAP EPS compounds at ~45% from FY26 base to ~$5.77 by FY31; market awards 25× on confirmed foundry leadership. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized — modest given the execution risk required over 5 years. ' +
      'Probability: 25% — requires both perfect execution AND the Apple deal to materialize at full volume.',
  ],

  thesis: [
    'Bear mechanics: foundry contracts require 2-3 year qualification cycles; Apple deal has no confirmed start date or volume. ' +
      'Intel 18A process node delays have historically slipped 6-12 months — each slip extends the foundry loss period. ' +
      'ARM-based PCs (Apple Silicon, Qualcomm Snapdragon) already command 15%+ of the thin-and-light market; if ARM reaches 25-30%, Intel client margins compress materially. ' +
      'The $40B+ gross debt load and negative FCF constrain financial flexibility if the turnaround extends beyond 2030. ' +
      'At {spot}, even base-case execution delivers double-digit annualized losses — the bear case is catastrophic. The margin of safety is entirely narrative-dependent.',
    'Post Q1 FY26 update, the recovery trajectory is real: DC CPU +22%, 10 consecutive quarters of EPS acceleration, Q2 guide above consensus. ' +
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
    netDebt: 22000,
    ebitda: 15000,
    fy: 'FY25',
    note: 'Net debt ~$22B (gross debt $44B − cash $22B). EBITDA est. ~$15B (OCF $9.7B + D&A ~$14B approx). Leverage ~1.5× GREEN. Negative FCF from foundry CapEx is the real risk — not leverage ratio.',
  },
});

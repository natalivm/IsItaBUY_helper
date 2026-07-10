import { defineStock } from './defineStock';

export const LLY = defineStock({
  ticker: 'LLY',
  name: 'Eli Lilly and Company',
  sector: 'Pharmaceuticals / GLP-1',
  themeColor: '#e01933',
  updatedOn: '07/10',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 1188.58,
  fairPriceRange: '$750 - $1800',
  shares0: 947,
  rev25: 65200,
  fcfMargin25: 0.137,
  taxRate: 0.14,
  cash: 3200,
  debt: 30000,
  beta: 0.8,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 36.25,        // FY2026E non-GAAP EPS — guide RAISED to $35.50-$37 at Q1 2026 (was using stale ~FY2025 $24.21). Q1 2026 non-GAAP EPS $8.55, rev +56%; FY26 rev guide $82-85B (+28%).
  rsRating: 76,
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  reasonsToBuy: [
    'GLP-1 platform is a metabolic disease franchise comparable in scale and durability to NVDA in AI or ASML in lithography',
    'Tiered therapy stack from oral mass-market to high-efficacy injections maximizes patient lifetime value across every segment',
    'Foundayo (oral orforglipron) now FDA-approved and launching — a hyperscalable pill opening the needle-free mass market (~3/4 of starts are new-to-class)',
    'Retatrutide triple-agonist now has positive Phase III data (up to ~30% weight loss; strong T2D) — a likely third obesity drug launching 2027, expanding the franchise rather than just cannibalizing it',
    'Manufacturing moat (~$50B committed) and LillyDirect channel create structural barriers that pipeline-only competitors cannot quickly replicate',
  ],

  risksToBuy: [
    'Priced for near-perfect execution — even modest deceleration in GLP-1 penetration triggers significant multiple compression',
    'Novo Nordisk, Amgen, and Pfizer are all aggressively developing competing GLP-1 and oral obesity therapies',
    'Retatrutide triple-agonist Phase III could disappoint on side-effect profile, removing the highest-value pipeline asset',
    'Payer and employer pushback on GLP-1 reimbursement at scale could suppress volume growth well below TAM estimates',
    'Post-2030 patent cliff on tirzepatide creates a revenue overhang that weighs on long-duration valuation assumptions',
  ],

  // Base 12% lands the 5y terminal EPS on Street consensus 2030E (~$63.8 vs prior 18%→$82.9, +30% over Street). Bear/bull bracket the decelerating consensus path (2027 +23% → 2030 +11%).
  epsCagr: [8, 12, 16],
  // Trimmed from [22,28,35]: mega-cap pharma facing the post-2030 tirzepatide patent cliff de-rates ahead of it. Base 22x = premium-pharma norm (AZO 22x, AMZN 27x); GLP-1 peer NVO sits at 15x. 28x bull = today's multiple holding.
  exitPE: [18, 22, 28],
  prob: [20, 45, 35],

  analystConsensus: { rating: 'Strong Buy', targetLow: 700, targetMedian: 1230, targetHigh: 1500, numAnalysts: 30 },

  revGrowth: [
    [0.20, 0.12, 0.08, 0.06, 0.04],
    [0.25, 0.18, 0.14, 0.10, 0.08],
    [0.28, 0.22, 0.18, 0.14, 0.10],
  ],
  fcfMargin: [
    [0.12, 0.12, 0.13, 0.13, 0.14],
    [0.14, 0.16, 0.18, 0.20, 0.22],
    [0.16, 0.19, 0.22, 0.24, 0.26],
  ],
  exitMultiple: [14, 18, 22],
  desc: [
    'Price erosion stronger than expected, oral GLP-1 launch underwhelms, market growth decelerates. EPS compounds at ~8% as competition from Novo Nordisk, Amgen, and Pfizer intensifies. P/E compresses to 18x toward historical norms. Patent cliff concerns post-2030 weigh on sentiment.',
    'Strong structural growth continues — GLP-1 market expands to $100B+, Zepbound/Mounjaro maintain leadership, orforglipron adds oral optionality. EPS grows ~12%, in line with Street consensus, as revenue scales and EBIT margin expands to high-40s. Moderate P/E compression to 22x reflects maturing growth phase.',
    'GLP-1 market reaches $250B+ as penetration rises to 15–20% of addressable population. Orforglipron at $149–399 drives mass-market oral adoption, retatrutide (24–29% weight loss) captures $60–80B severe obesity segment as pharma alternative to bariatric surgery. Tiered therapy stack covers full patient spectrum. Two-stage model (inject → oral maintenance) maximizes patient LTV. LLY at 35–40% share = $90–120B GLP-1 revenue alone. EPS compounds at ~16%, premium 28x multiple holds on metabolic disease platform leadership.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.40, 0.45, 0.50],
  debtSafety: {
    netDebt: 26800,
    ebitda: 24000,
    fy: 'FY25',
    note: 'GLP-1 revenue surge pushes EBITDA well past leverage — ratio barely above 1×. Debt largely from manufacturing buildout to meet Mounjaro/Zepbound demand. Deleveraging rapidly as GLP-1 cash flows compound.',
  },
});

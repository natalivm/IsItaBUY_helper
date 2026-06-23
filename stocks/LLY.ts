import { defineStock } from './defineStock';

export const LLY = defineStock({
  ticker: 'LLY',
  name: 'Eli Lilly and Company',
  sector: 'Pharmaceuticals / GLP-1',
  themeColor: '#e01933',
  updatedOn: '06/23',
  lastReportTag: 'Q4 2025',
  currentPrice: 1107.08,
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
  baseEps: 24.21,
  rsRating: 76,
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  reasonsToBuy: [
    'GLP-1 platform is a metabolic disease franchise comparable in scale and durability to NVDA in AI or ASML in lithography',
    'Tiered therapy stack from oral mass-market to high-efficacy injections maximizes patient lifetime value across every segment',
    'Orforglipron oral approval expands the total addressable market to the billions of patients who reject injectable therapy',
    'Retatrutide triple-agonist targets severe obesity where payer willingness-to-pay is highest and competition is thinnest',
    'Manufacturing moat and Lilly Direct channel create structural barriers that pipeline-only competitors cannot quickly replicate',
  ],

  risksToBuy: [
    'Priced for near-perfect execution — even modest deceleration in GLP-1 penetration triggers significant multiple compression',
    'Novo Nordisk, Amgen, and Pfizer are all aggressively developing competing GLP-1 and oral obesity therapies',
    'Retatrutide triple-agonist Phase III could disappoint on side-effect profile, removing the highest-value pipeline asset',
    'Payer and employer pushback on GLP-1 reimbursement at scale could suppress volume growth well below TAM estimates',
    'Post-2030 patent cliff on tirzepatide creates a revenue overhang that weighs on long-duration valuation assumptions',
  ],

  epsCagr: [12, 18, 22],
  exitPE: [22, 28, 35],
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
    'Price erosion stronger than expected, oral GLP-1 launch underwhelms, market growth decelerates. EPS compounds at ~12% as competition from Novo Nordisk, Amgen, and Pfizer intensifies. P/E compresses to 22x toward historical norms. Patent cliff concerns post-2030 weigh on sentiment.',
    'Strong structural growth continues — GLP-1 market expands to $100B+, Zepbound/Mounjaro maintain leadership, orforglipron adds oral optionality. EPS grows ~18% as revenue scales and EBIT margin expands to high-40s. Moderate P/E compression to 28x reflects maturing growth phase.',
    'GLP-1 market reaches $250B+ as penetration rises to 15–20% of addressable population. Orforglipron at $149–399 drives mass-market oral adoption, retatrutide (24–29% weight loss) captures $60–80B severe obesity segment as pharma alternative to bariatric surgery. Tiered therapy stack covers full patient spectrum. Two-stage model (inject → oral maintenance) maximizes patient LTV. LLY at 35–40% share = $90–120B GLP-1 revenue alone. EPS compounds at ~22%, premium 35x multiple holds on metabolic disease platform leadership.',
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

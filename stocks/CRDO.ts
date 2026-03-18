import { defineStock } from './defineStock';

export const CRDO = defineStock({
  ticker: 'CRDO',
  name: 'Credo Technology Group Holding',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#d4af37',
  updatedOn: '07/03',
  currentPrice: 105,
  fairPriceRange: '$91 - $322',
  shares0: 197,
  rev25: 437,
  fcfMargin25: 0.35,
  taxRate: 0.08,
  cash: 1300,
  debt: 22,
  beta: 2.58,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 3.12,
  rsRating: 85,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Credo delivered a blowout Q3 FY26 — $407M revenue (+52% QoQ, +200% YoY), 68.6% gross margin, $209M non-GAAP net income. " +
    "FY26 tracks to ~$1.3B (3x YoY), FY27 guided 50%+ growth to ~$2B. ZeroFlap Optics pulled forward 6 months to Q1 FY27, already shipping production units. " +
    "The thesis is intact: AECs are de facto standard for intra-rack connectivity, 5th hyperscaler added, and 3 new multi-billion TAM expansions (ZeroFlap Optics, ALCs, OmniConnect) layer in FY27-28. " +
    "At $109 the prob-weighted 5yr return still crosses the 15% CAGR hurdle. " +
    "Risks: top-3 customer concentration remains 88%, Q4 GM guided down to 64-66%, " +
    "and FY27 sequential growth decelerates to mid-single digits. High beta (2.58) means sharp drawdowns in risk-off. " +
    "RS has recovered from 33 to 85 — momentum rebuilding, but position sizing still warrants caution.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 72, targetMedian: 193, targetHigh: 260, numAnalysts: 16 },
  revGrowth: [
    [1.80, 0.25, 0.15, 0.10, 0.08],
    [2.00, 0.50, 0.25, 0.18, 0.15],
    [2.10, 0.60, 0.35, 0.25, 0.20],
  ],
  fcfMargin: [
    [0.20, 0.19, 0.18, 0.17, 0.17],
    [0.30, 0.30, 0.28, 0.27, 0.26],
    [0.35, 0.36, 0.37, 0.38, 0.38],
  ],
  exitMultiple: [12, 16, 19],
  desc: [
    'AI capex cools sharply after the current demand surge. Top-3 customers (88% of Q3 revenue) pause or slow orders, ' +
      'and the AEC market matures faster than expected as CPO gains traction. ZeroFlap Optics and ALC ramps disappoint. ' +
      'Gross margins compress to the low 60s. The binding visibility delays the pain but does not prevent it. ' +
      'Earnings growth slows to 10% and the stock delivers negative returns from current levels.',
    'The core AEC and IC business grows steadily as AI infrastructure buildout continues. FY27 delivers 50%+ revenue growth as guided, ' +
      'but growth decelerates more quickly in FY28-29 as the initial hyperscaler deployment wave matures. ZeroFlap Optics contributes meaningfully ' +
      'but ALC and OmniConnect ramp slower than hoped. Gross margins normalize to the 63-65% range as management guided. ' +
      'Customer diversification improves but top-3 concentration remains above 70%. Earnings compound at ~20% annually.',
    'AEC longevity holds as copper remains the reliability and power-efficiency winner through the 200G-per-lane transition. ' +
      'ZeroFlap Optics ramps strongly in FY27 with 4+ customers, proving reliability-first optical is a new category. ' +
      'ALCs bridge the gap to mid-reach optical in FY28, and OmniConnect Weaver unlocks $1,000+ content per GPU in the inference market. ' +
      'The Chimera acquisition accelerates protocol IP across UALink, ESUN, and Ethernet. ' +
      'AI infrastructure spending proves to be a decade-long megatrend. Earnings compound at 28% annually.',
  ],

  epsCagr: [10, 20, 28],
  exitPE: [18, 25, 30],
  prob: [15, 45, 40],

  bbRate: [0, 0, 0],
  ebitdaProxy: [0.15, 0.25, 0.38],
});

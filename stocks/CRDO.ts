import { defineStock } from './defineStock';

export const CRDO = defineStock({
  ticker: 'CRDO',
  name: 'Credo Technology Group Holding',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#d4af37',
  updatedOn: '07/15',
  lastReportTag: 'Q3 FY26',
  currentPrice: 226.74,
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
  reasonsToBuy: [
    'AEC chips are the de facto standard for intra-rack connectivity, giving Credo an entrenched position as AI clusters scale',
    'DustPhotonics acquisition vertically integrates the silicon photonics PIC layer, expanding addressable revenue per deployment',
    'ZeroFlap Optics pulled forward into production validates a new reliability-first optical category with multiple hyperscaler customers',
    'Best-in-class gross margins at scale signal genuine semiconductor IP differentiation rather than commodity assembly value',
    'Four distinct product expansions — ALCs, OmniConnect, ZeroFlap, SiPho PICs — stagger future growth vectors into the next decade',
  ],

  risksToBuy: [
    'Top-three customers represent the vast majority of revenue — a single hyperscaler pause would be severely damaging',
    'Earnout-based DustPhotonics deal creates meaningful dilution risk if silicon photonics integration hits design-win milestones',
    'SBC as a share of revenue is structurally high, and true owner cash flow is a fraction of the headline FCF figure',
    'Extreme beta means the stock experiences sharp drawdowns in any risk-off or AI-spending-doubt environment',
    'FY27 is back-half loaded — near-term sequential growth is modest, leaving little cushion if early quarters disappoint',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 72, targetMedian: 193, targetHigh: 260, numAnalysts: 16 },
  revGrowth: [
    [1.80, 0.45, 0.20, 0.12, 0.10],
    [2.00, 0.75, 0.35, 0.22, 0.18],
    [2.10, 0.90, 0.45, 0.30, 0.22],
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
    'The core AEC and IC business grows steadily as AI infrastructure buildout continues. FY27 delivers 75%+ revenue growth as guided post-Dust, ' +
      'with combined optical >$500M, but growth decelerates more quickly in FY28-29 as the initial hyperscaler deployment wave matures. ZeroFlap Optics contributes meaningfully ' +
      'but ALC, OmniConnect, and stand-alone SiPho PICs ramp slower than hoped. Gross margins normalize to the 63-65% range as Dust integration creates short-term cost noise. ' +
      'Customer diversification improves but top-3 concentration remains above 70%. Earnings compound at ~20% annually.',
    'AEC longevity holds as copper remains the reliability and power-efficiency winner through the 200G-per-lane transition. ' +
      'ZeroFlap Optics ramps strongly in FY27 with 4+ customers, proving reliability-first optical is a new category, and the DustPhotonics PIC integration drives margin uplift through vertical integration. ' +
      'Stand-alone SiPho PIC business compounds against a $6B-by-2030 TAM with hyperscaler design wins and a 3.2T roadmap. ' +
      'ALCs bridge the gap to mid-reach optical in FY28, and OmniConnect Weaver unlocks $1,000+ content per GPU in the inference market. ' +
      'The Chimera acquisition accelerates protocol IP across UALink, ESUN, and Ethernet, while Dust positions Credo for CPO/NPO scale-up alongside the micro-LED bet. ' +
      'AI infrastructure spending proves to be a decade-long megatrend. Earnings compound at 28% annually.',
  ],

  epsCagr: [10, 20, 28],
  exitPE: [18, 25, 30],
  prob: [15, 45, 40],

  bbRate: [0, 0, 0],
  ebitdaProxy: [0.15, 0.25, 0.38],

  burry: {
    sbc: 161,
    gaapNi: 250,
    buyback: 16,
    epsBasis: 'NON_GAAP',
    fy: 'FY25 LTM',
    overstatementPct: 80,
    overstatementSource: 'estimated',
    note: 'Tragic — TIKR LTM actuals: SBC $161M (15.1% of revenue), buybacks just $16M (covers 10% of SBC). Operating leverage just inflected dramatically: -19% margin FY24 → +30% LTM. GAAP NI ~$250M LTM (improving fast). The catch: diluted shares 155M (FY24) → 186M (LTM) = +20% in ONE year, on top of post-IPO baseline of 88M (FY22). SBC = 47% of CFO, 57% of FCF — half of reported FCF is SBC addback (true owner FCF ~11.5% margin vs headline 26.6%). 4y MTM extreme (~13-15× since IPO) breaks the formula. The 80% estimate places CRDO between PLTR (70%, more mature buyback) and the deeply broken cohort. CRDO\'s operational excellence (68% gross margin, 30% operating margin, 107% revenue CAGR) is genuine; the question is whether SBC will normalize as growth matures, or remain structurally elevated. Watch FY27 share count trajectory.',
  },
});

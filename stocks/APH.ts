import { defineStock } from './defineStock';

export const APH = defineStock({
  ticker: 'APH',
  name: 'Amphenol Corp',
  sector: 'Electronic Components · Interconnect',
  themeColor: '#38bdf8',
  updatedOn: '04/25',
  currentPrice: 149.71,
  fairPriceRange: '$77 - $290',
  shares0: 1278,
  rev25: 23100,
  fcfMargin25: 0.19,
  taxRate: 0.255,
  cash: 4000,
  debt: 18700,
  beta: 1.25,
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 3.34,
  rsRating: 89,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Amphenol is the premium connector play for AI infrastructure — IT Datacom now 36% of revenue, Q4 book-to-bill 1.31x, FY25 adj EPS +77%. " +
    "CCS acquisition extends the platform with ~$4.1B revenue. Quality anchors are real (diversified end-markets, 52% dividend raise, RS 89). " +
    "The problem: at ~40x trailing P/E, a compression to historical 22x means ~45% haircut — premium justified only if AI-driven growth sustains 15%+ CAGR. " +
    "Pay-up-for-quality entry, not an asymmetric one.",

  epsCagr: [1, 10, 18],
  exitPE: [22, 30, 38],
  prob: [25, 50, 25],


  analystConsensus: { rating: 'Strong Buy', targetLow: 135, targetMedian: 173, targetHigh: 210, numAnalysts: 12 },
  revGrowth: [
    [0.21, 0.03, 0.03, 0.03, 0.03],
    [0.27, 0.08, 0.08, 0.08, 0.08],
    [0.34, 0.14, 0.14, 0.14, 0.14],
  ],
  fcfMargin: [
    [0.17, 0.16, 0.15, 0.15, 0.14],
    [0.18, 0.17, 0.17, 0.17, 0.17],
    [0.18, 0.19, 0.19, 0.19, 0.20],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'The AI cycle fades while automotive and industrial end-markets remain weak, compressing margins from 26% down to around 22%. ' +
      'Earnings growth stalls at roughly 1% annually and the multiple compresses to 22x, its historical trough. ' +
      'At current entry price, this scenario results in meaningful negative returns.',
    'AI datacom demand sustains, margins hold steady near 26%, and the CCS acquisition integrates on schedule. ' +
      'Earnings grow at roughly 10% annually with a moderate re-rating to 30x. ' +
      'A solid execution path, though returns from current valuation remain modest at under 2% annualized.',
    'The AI supercycle extends with an additional defense tailwind, pushing margins toward 28.5%. ' +
      'Earnings compound at roughly 18% annually and the market sustains a 38x premium for compounder status. ' +
      'This is the path to approximately 14-15% annualized returns from current levels.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.15, 0.22, 0.28],
});

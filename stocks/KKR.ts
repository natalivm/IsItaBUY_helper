import { defineStock } from './defineStock';

export const KKR = defineStock({
  updatedOn: '04/10',
  ticker: 'KKR',
  name: 'KKR & Co. Inc.',
  sector: 'Alternative Asset Mgmt',
  themeColor: '#7c3aed',
  currentPrice: 90.34,
  fairPriceRange: '$100 - $186',
  shares0: 897,
  rev25: 7650,
  fcfMargin25: 0.85,
  taxRate: 0.21,
  cash: 46100,
  debt: 55100,
  beta: 1.55,
  costDebt: 0.052,
  baseEps: 6.74,
  modelType: 'EPS_PE',
  rsRating: 10,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "KKR is the instrument for playing private capital recovery — DE path $6.74 -> $8.16 -> $9.88 (~21% CAGR through 2028), with insurance accrued income as the hidden catalyst for 2027-28. " +
    "At ~15x 2026E DE, the stock is adequately valued: prob-weighted IRR ~12-13%, with stress test (0% growth post-2028, 15x) still yielding 8.8%. " +
    "The problem: RS 16 signals no institutional momentum, carry is deeply cyclical, and post-2028 execution is the key unknown — this is not a lifetime compounder. " +
    "If exit markets normalize and insurance/private wealth channels accelerate, IRR reaches 18%+. If carry stays depressed, it's 7% dead money with a soft moat. " +
    "30-35% probability of 15%+ CAGR — a cycle bet on capital markets recovery, not a structural compounder.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 112, targetMedian: 153, targetHigh: 187, numAnalysts: 15 },
  revGrowth: [
    [0.06, 0.04, 0.02, 0.00, 0.00],
    [0.15, 0.12, 0.10, 0.09, 0.08],
    [0.22, 0.18, 0.15, 0.12, 0.10],
  ],
  fcfMargin: [
    [0.70, 0.68, 0.65, 0.63, 0.60],
    [0.83, 0.83, 0.84, 0.84, 0.85],
    [0.86, 0.87, 0.88, 0.89, 0.90],
  ],
  exitMultiple: [10, 14, 18],
  desc: [
    'Distributable earnings growth slows to about 6% per year after 2028. Exit markets stay weak and carried interest remains depressed. ' +
      'Returns come in around 6-7% annualized from current entry including dividends. Not catastrophic given the strong balance sheet and no bankruptcy risk, ' +
      'but significantly below cost of capital. The downside is bounded but upside is capped. A dead money scenario.',
    'The capital markets cycle normalizes with AUM growth resuming, moderate exits returning, and carried interest partially recovering. ' +
      'Distributable earnings grow from $6.74 toward $12+ per share by 2030. Management fees grow 22-24% with high fee-related earnings margins, ' +
      'and insurance accrued income emerges as a catalyst for 2027-2028. Returns come in around 13-14% annualized from current entry. ' +
      'Solid but just under the 15% threshold. No heroic assumptions required — just normalization of capital markets.',
    'A full cycle recovery combines with structural fee growth. Insurance integration and private wealth distribution channels accelerate beyond expectations. ' +
      'Distributable earnings grow at 16%+ annually post-2028, reaching over $13 per share by 2030. ' +
      'Returns reach roughly 18% annualized from current entry. Requires sustained AUM growth, exit market normalization, ' +
      'carry recovery, and insurance accrued income materializing — ambitious but supported by management visibility.',
  ],

  epsCagr: [10, 13, 15],
  exitPE: [12, 15, 17],
  prob: [25, 45, 30],

  bbRate: [0.005, 0.01, 0.02],
  ebitdaProxy: [0.10, 0.18, 0.30],
});

import { defineStock } from './defineStock';

export const KKR = defineStock({
  updatedOn: '06/23',
  ticker: 'KKR',
  name: 'KKR & Co. Inc.',
  sector: 'Alternative Asset Mgmt',
  themeColor: '#7c3aed',
  currentPrice: 93.5,
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
  rsRating: 36,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Distributable earnings trajectory is visible and growing as fee-related earnings compound with AUM growth',
    'Insurance integration via Global Atlantic provides a durable, recurring accrued income stream independent of carry cycles',
    'Private wealth and retail channel expansion opens a massive new source of capital inflows beyond institutional allocators',
    'Capital markets cycle recovery would unlock carried interest that is currently depressed, creating significant earnings upside',
    'Analyst consensus is firmly Strong Buy with targets well above current price, reflecting broad underappreciation',
  ],

  risksToBuy: [
    'Carry is deeply cyclical — if exit markets stay weak, distributable earnings flatten and the thesis becomes dead money',
    'Low relative strength signals that institutional momentum has completely abandoned the stock near-term',
    'Post-2028 earnings trajectory is highly uncertain and depends on sustained capital markets normalization',
    'Soft moat relative to peers like Blackstone and Apollo means AUM growth could disappoint in a crowded fundraising market',
    'Insurance operations at Global Atlantic add balance-sheet complexity that makes earnings quality harder to assess',
  ],

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
  debtSafety: {
    netDebt: 9000,
    ebitda: 4000,
    capexToOcf: 0.02,
    fy: 'FY25',
    note: 'Framework partially N/A for alternative asset managers — the $46.1B cash and $55.1B debt are largely tied to Global Atlantic insurance operations (policyholder float). Fee-related earnings from the asset management business are highly cash-generative with minimal leverage risk. Real safety metric is balance sheet AUM coverage, not Net Debt/EBITDA.',
  },
});

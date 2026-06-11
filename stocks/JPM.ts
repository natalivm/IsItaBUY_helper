import { defineStock } from './defineStock';

export const JPM = defineStock({
  updatedOn: '06/11',
  ticker: 'JPM',
  name: 'JPMorgan Chase & Co.',
  sector: 'Diversified Banking',
  themeColor: '#065f46',
  currentPrice: 313.49,
  fairPriceRange: '$250 - $555',
  shares0: 2674,
  rev25: 182400,
  fcfMargin25: 0.30,
  taxRate: 0.21,
  cash: 30000,
  debt: 400000,
  beta: 1.10,
  costDebt: 0.045,
  baseEps: 21.9,
  modelType: 'EPS_PE',
  rsRating: 51,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  reasonsToBuy: [
    'Best-in-class banking franchise with a structurally larger markets wallet post-COVID and a dominant payments network',
    'Through-cycle ROTCE consistency provides reliable EPS compounding regardless of short-term rate environment',
    'Private credit expansion and AI-driven cost reduction support margin defense in a competitive lending environment',
    'Dividends plus buybacks provide a durable total-return floor even in a scenario with no multiple expansion',
    'Capital markets recovery (M&A boom, IPO cycle) is a meaningful upside catalyst if deal activity re-accelerates',
  ],

  risksToBuy: [
    'Bank earnings are inherently cyclical — a credit-cycle turn or rate decline compresses both revenue and multiple simultaneously',
    'Through-cycle ROTCE cap structurally limits EPS CAGR, making it very difficult to clear a meaningful return hurdle',
    'Dimon himself has flagged elevated macro anxiety and high asset prices as risks to the current earnings environment',
    'AI delivers cost savings but management explicitly cannot charge clients for it, so margins improve modestly at best',
    'Late-cycle private credit stress could spread beyond the segment, creating incremental credit losses across the portfolio',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 220, targetMedian: 300, targetHigh: 380, numAnalysts: 20 },
  revGrowth: [
    [0.03, 0.02, 0.02, 0.01, 0.01],
    [0.05, 0.05, 0.04, 0.04, 0.03],
    [0.08, 0.07, 0.06, 0.05, 0.05],
  ],
  fcfMargin: [
    [0.25, 0.24, 0.23, 0.22, 0.21],
    [0.30, 0.30, 0.30, 0.30, 0.30],
    [0.32, 0.33, 0.33, 0.34, 0.34],
  ],
  exitMultiple: [8, 11, 14],
  desc: [
    'Rates fall, credit cycle turns (private credit stress spreads broader), markets revenue declines. ' +
      'Through-cycle ROTCE drops below 17%. EPS CAGR ~3%, EPS 2031 ~$25, exit P/E 10x. Target ~$250. Return ~-3% CAGR. ' +
      'Dimon warning materialized: high asset prices + late-cycle stress compress earnings and multiple simultaneously.',
    'Through-cycle ROTCE holds at ~17% as confirmed by CFO. EPS CAGR ~8% from mid-single-digit revenue growth, ' +
      'stable ~30% margins, buyback boost ~3%. Markets wallet structurally larger but M&A/IPO cycles normalize, not boom. ' +
      'AI delivers margin support (~40% cost reduction in select ops) but no revenue uplift. ' +
      'EPS 2031 ~$32, exit P/E 13x. Target ~$416. Total return ~10-11% (7.5% price + dividends). Solid but below 15%.',
    'Simultaneous M&A boom + IPO cycle + elevated volatility + private credit expansion + aggressive buybacks. ' +
      'Sponsor exit pipeline ($40-50B organic capital deployment) fully activates. Markets revenue stays structurally elevated. ' +
      'EPS CAGR ~11%, EPS 2031 ~$37, exit P/E 15x. Target ~$555. Return ~14% CAGR. ' +
      'Requires sustained macro tailwinds — cycle peak scenario, not new normal.',
  ],

  epsCagr: [3, 8, 11],
  exitPE: [10, 13, 15],
  prob: [20, 55, 25],

  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.35, 0.46, 0.50],
  debtSafety: {
    netDebt: 370000,
    ebitda: 65000,
    capexToOcf: 0.03,
    fy: 'FY25',
    note: 'Standard Net Debt/EBITDA framework does not apply to banks — JPM funds ~$3.9T in assets via deposits and wholesale funding, which is operational leverage by design, not financial distress. Real safety metric is CET1 capital ratio (~15.4%), well above the 11.5% regulatory minimum. Panel shown for context only.',
  },
});

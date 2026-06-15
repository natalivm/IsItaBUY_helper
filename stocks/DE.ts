import { defineStock } from './defineStock';

export const DE = defineStock({
  ticker: 'DE',
  name: 'Deere & Company',
  sector: 'Machinery',
  themeColor: '#10b981',
  currentPrice: 575.47,
  updatedOn: '06/15',
  fairPriceRange: '$370 - $775',
  shares0: 270.0,
  rev25: 38900,
  fcfMargin25: 0.155,
  taxRate: 0.22,
  cash: 5200,
  debt: 65953,
  beta: 0.78,
  costDebt: 0.0497,
  rsRating: 85,
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Number-one global agricultural equipment brand with deep dealer network and high switching costs',
    'Precision agriculture technology and autonomous equipment create a durable, tech-driven moat',
    'Strong institutional momentum confirmed by high RS Rating entering a potential agro-cycle recovery',
    'John Deere Financial provides a recurring revenue stream with resilient, captive equipment buyers',
  ],

  risksToBuy: [
    'Earnings are declining cycle-on-cycle, making today\'s valuation expensive relative to near-term power',
    'Farm commodity prices and credit conditions are key external drivers entirely outside management control',
    'Massive equipment financing debt amplifies downside risk when the agro cycle turns negative',
    'EBIT margins sit well below prior cycle peaks, limiting near-term earnings recovery speed',
    'Precision ag software monetization is still early and unproven at scale against cheaper competitors',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 458, targetMedian: 575, targetHigh: 793, numAnalysts: 18 },
  revGrowth: [
    [0.03, 0.04, 0.04, 0.03, 0.03],
    [0.06, 0.09, 0.08, 0.07, 0.07],
    [0.08, 0.11, 0.10, 0.09, 0.09],
  ],
  fcfMargin: [
    [0.12, 0.11, 0.10, 0.10, 0.10],
    [0.155, 0.15, 0.15, 0.15, 0.15],
    [0.16, 0.17, 0.18, 0.18, 0.18],
  ],
  exitMultiple: [12, 16, 17.5],
  desc: [
    'Agro downcycle with commodity price weakness, P/E compression to historical lows (~18x), and margin squeeze.',
    'Moderate agro recovery with consensus revenue growth (~7-9% CAGR), stable FCF margins near 15%.',
    'Strong agro supercycle return with precision ag monetization driving margin expansion and P/E re-rating.',
  ],

  bbRate: [0.005, 0.015, 0.02],
  ebitdaProxy: [0.15, 0.22, 0.28],
  debtSafety: {
    netDebt: 60753,
    ebitda: 8500,
    capexToOcf: 0.27,
    interestCoverage: 3.4,
    altmanZ: 2.5,
    fy: 'FY25',
    note: '~$45B of gross debt sits in John Deere Financial (equipment financing arm), inflating the ratio vs pure machinery operations. Even adjusted, equipment-only leverage is elevated in a down-cycle. High leverage on a commodity-cycle business amplifies downside risk.',
  },
});

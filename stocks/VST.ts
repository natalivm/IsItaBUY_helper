import { defineStock } from './defineStock';

export const VST = defineStock({
  ticker: 'VST',
  name: 'Vistra Corp',
  sector: 'Utilities / Power',
  themeColor: '#facc15',
  currentPrice: 167.77,
  fairPriceRange: '$180 - $460',
  shares0: 339.0,
  rev25: 19600,
  fcfMargin25: 0.157,
  taxRate: 0.21,
  cash: 620,
  debt: 17500,
  beta: 1.43,
  costDebt: 0.056,
  modelType: 'EPS_PE',
  baseEps: 10.0,
  rsRating: 26,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  updatedOn: '06/25',
  lastReportTag: 'Q1 2026',
  reasonsToBuy: [
    'Signed long-term Meta and Amazon nuclear PPAs lock in contracted cash flows at premium prices',
    'Cogentrix gas acquisition adds scale and was priced well below comparable asset transactions',
    'Fitch investment-grade upgrade unlocks better financing terms and signals improving balance-sheet quality',
    'Vistra\'s nuclear and gas fleet is well-positioned for AI data center electricity demand over the next decade',
    'Aggressive buyback program at historically low average cost is compounding per-share value rapidly',
  ],

  risksToBuy: [
    'About half of earnings remain exposed to merchant power prices with no contracted floor',
    'Cogentrix integration execution risk on a large multi-gigawatt gas portfolio at elevated leverage',
    'ERCOT forward prices softened on mild weather — commodity exposure can reprice the stock sharply',
    'High structural debt load typical of capital-intensive power generation requires sustained EBITDA growth',
    'Data center load growth impact on markets may not be material for years, delaying the re-rating',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 97, targetMedian: 230, targetHigh: 293, numAnalysts: 10 },
  revGrowth: [
    [0.08, 0.06, 0.05, 0.04, 0.04],
    [0.17, 0.12, 0.09, 0.07, 0.06],
    [0.17, 0.15, 0.12, 0.10, 0.09],
  ],
  fcfMargin: [
    [0.14, 0.14, 0.14, 0.13, 0.13],
    [0.16, 0.17, 0.18, 0.19, 0.20],
    [0.17, 0.19, 0.21, 0.23, 0.24],
  ],
  exitMultiple: [10, 13, 16],
  bbRate: [0.015, 0.022, 0.03],

  epsCagr: [5, 12, 18],
  exitPE: [14, 17, 20],
  prob: [15, 45, 40],

  desc: [
    'Power prices crash and Cogentrix integration disappoints. Contracted nuclear PPAs provide a floor, but ~50% merchant exposure bleeds earnings. ' +
      'Earnings grow at only 5% annually with multiple compressing to 14x. Returns come in flat-to-negative from current entry.',
    'Power prices normalize in a stable range. Cogentrix closes on schedule with mid-single-digit AFCF accretion. ' +
      'Meta and Amazon PPAs ramp as planned, pushing ~50% of EBITDA into contracted/stable sources. Earnings compound at 12% with 17x exit on improved visibility. ' +
      'Buybacks at ~$1B/yr continue to be a core per-share driver. Returns come in around 12–14% annualized — approaching but not exceeding the 15% threshold.',
    'Tight power markets amplify contracted earnings through 2027–28 data center ramp. All remaining PPAs (Beaver Valley, Comanche Peak uprate) get signed. ' +
      'Cogentrix delivers high-single-digit accretion. Cash deployed to buybacks drives AFCF/share toward $22–25 by 2030 as guided. ' +
      'Market re-rates to 20x on contracted earnings quality. This is the $400+ path, and it now looks achievable given signed deal flow.',
  ],

  bullMaOptVal: 158.00 * 339.0 * 0.07,
  debtSafety: {
    netDebt: 16880,
    ebitda: 5000,
    capexToOcf: 0.42,
    interestCoverage: 3.5,
    altmanZ: 2.1,
    fy: 'FY25',
    note: 'High leverage is structural for power generation — capital-intensive assets (nuclear, gas) are debt-financed against long-term contracted cash flows. CapEx/OCF fails the asset-light test by design. Monitor whether contracted PPA coverage remains sufficient to service debt through the data center ramp.',
  },
});

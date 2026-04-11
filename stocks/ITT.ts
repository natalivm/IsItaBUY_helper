import { defineStock } from './defineStock';

export const ITT = defineStock({
  ticker: 'ITT',
  name: 'ITT Inc.',
  sector: 'Diversified Industrials',
  themeColor: '#3b82f6',
  currentPrice: 216.9,
  updatedOn: '04/10',
  fairPriceRange: '$170 - $250',
  shares0: 86,
  rev25: 3940,
  fcfMargin25: 0.141,
  taxRate: 0.21,
  cash: 450,
  debt: 3800,
  beta: 1.35,
  costDebt: 0.045,
  rsRating: 83,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Strategically transformative SPX FLOW acquisition positions ITT as a global top-3 flow solutions provider. Strong exposure to energy transition (cryogenic pumps) and industrial AI (predictive maintenance). High margin aftermarket mix (43%) provides structural downside protection and margin upside.",


  analystConsensus: { rating: 'Buy', targetLow: 215, targetMedian: 228, targetHigh: 245, numAnalysts: 9 },
  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.1207, 0.141, 0.1633],
  exitMultiple: [12, 16, 19],
  desc: [
    'SPX FLOW integration encounters margin dilution and cross-sell synergies fall short. Industrial cycle turns down, volume growth stalls at mid-single digits. ' +
      '$3.8B acquisition debt limits capital flexibility while FCF margins compress to ~12%. Market re-rates to 12x as a leveraged industrial with uncertain payback.',
    'SPX FLOW accretion materializes — cross-sell synergies and 43% aftermarket mix sustain mid-to-high single-digit organic growth. Energy transition demand (cryogenic pumps for LNG/hydrogen) provides secular tailwind. ' +
      'FCF margins hold at ~14% as integration completes. P/E settles at 16x for a quality industrial compounder with global top-3 flow solutions positioning.',
    'Full SPX FLOW synergy capture accelerates revenue to low-teens growth. Energy transition + industrial AI (predictive maintenance) expand addressable market beyond legacy flow. ' +
      'Aftermarket mix drives FCF margins toward ~16%. De-leveraging restores capital return capacity. Market re-rates to 19x as a global flow solutions platform with secular tailwinds.',
  ],

  bullMaOptVal: 186 * 86 * 0.07,
});

import { defineStock } from './defineStock';

export const RVLV = defineStock({
  ticker: 'RVLV',
  name: 'Revolve Group, Inc.',
  sector: 'Consumer Discretionary · Fashion E-Commerce',
  themeColor: '#c2185b',
  currentPrice: 23,
  fairPriceRange: '$18 - $52',
  shares0: 74,
  rev25: 1230,
  fcfMargin25: 0.034,
  taxRate: 0.28,
  beta: 1.60,
  modelType: 'EPS_PE',
  baseEps: 0.86,
  rsRating: 47,
  rsTrend: 'flat',
  aiImpact: 'NEUTRAL',
  ratingOverride: 'HOLD',
  strategicNarrative:
    "RVLV is a Gen Z fashion e-commerce platform with an influencer-driven discovery model and strong brand identity — but a weak moat. " +
    "Low switching costs, fast-shifting trends, and no recurring revenue make this a cyclical discretionary story, not a compounder. " +
    "Revenue growing at 8-9% CAGR; EPS growth (31% CAGR from low base) is driven entirely by margin recovery (EBIT 2%→6%→potential 8-10%), not financial engineering or revenue acceleration. " +
    "At 24x fwd P/E for 8% revenue growth, this is not a screaming bargain. RS 47 signals no institutional momentum. " +
    "To generate 15%+ CAGR from $23, you need either strong margin expansion (EBIT 9-10%) OR a lower entry below $18-19. " +
    "Base case delivers ~6-7% annual return — adequate for a cyclical retailer, not compelling. This is a pure execution bet on inventory discipline.",

  updatedOn: '04/03',

  epsCagr: [7, 14, 20],
  exitPE: [15, 18, 22],
  prob: [25, 50, 25],

  revGrowth: [
    [0.05, 0.05, 0.05, 0.04, 0.04], // Bear: growth halves, competition + trend misses
    [0.09, 0.09, 0.08, 0.08, 0.07], // Base: 8-9% CAGR, steady execution
    [0.12, 0.12, 0.11, 0.11, 0.10], // Bull: market share gains + international expansion
  ],

  fcfMargin: [
    [0.030, 0.030, 0.028, 0.026, 0.025], // Bear: margin pressure returns on discounting
    [0.040, 0.055, 0.065, 0.075, 0.080], // Base: margin recovery toward 7-8%
    [0.055, 0.070, 0.085, 0.095, 0.105], // Bull: operating leverage expands FCF to 10%+
  ],

  exitMultiple: [8, 12, 16],

  desc: [
    'Revenue slows to 4-5% as macro pressure hits the Gen Z consumer and trend misses amplify inventory markdowns. ' +
      'EBIT margin retreats to 5-6% on discounting. EPS reaches ~$1.20 by 2030 at bear-case CAGR. ' +
      'P/E compresses to 15x as the market re-rates to value. 5yr price ~$18, roughly -4% to 0% annual return.',
    'Revenue compounds at 8-9% with EBIT margin expanding from 6% toward 8% through inventory discipline and operating leverage. ' +
      'EPS reaches ~$1.75 by 2030. P/E compresses naturally from 24x to 18x through earnings growth. ' +
      '5yr price ~$31, ~6-7% CAGR.',
    'Influencer ecosystem + international expansion (FWRD + RVLV globally) drives 10-12% revenue growth. ' +
      'EBIT margin reaches 9-10% — proving the model can scale. EPS reaches ~$2.36 by 2030. ' +
      'Market maintains premium at 22x P/E. 5yr price ~$52, ~17-18% CAGR.',
  ],

  thesis: [
    'Inventory errors + trend misses amplify the downturn. Fashion cycles shift faster than RVLV can adapt — ' +
      'Gen Z gravitates to TikTok Shop, Shein, and resale platforms. Gross margins compress 200-300bps. ' +
      'At 15x compressed P/E on $1.20 EPS, price drops to ~$18. Capital-light model offers limited downside protection.',
    'Execution story at a fair price. Influencer flywheel + curated assortment maintains brand relevance with Gen Z and Millennials. ' +
      'Operating leverage from 8-9% revenue growth gradually expands EBIT margins. No financial engineering — ' +
      'returns are purely operational. Fair but not compelling asymmetry at current price.',
    'International expansion unlocks new TAM. EBIT margin expands to 9-10% as fixed costs leverage. ' +
      'Influencer-to-discovery-to-purchase flywheel strengthens with AI personalization. ' +
      'Requires consistent execution AND macro tailwind simultaneously — probability ~25%.',
  ],

  termGrowth: [0.015, 0.02, 0.025],
  bbRate: [0, 0.005, 0.01],
  ebitdaProxy: [0.07, 0.11, 0.14],
  bullMaOptVal: false,
});

import { defineStock } from './defineStock';

export const PINS = defineStock({
  updatedOn: '05/14',
  ticker: 'PINS',
  name: 'Pinterest',
  sector: 'Social Commerce',
  themeColor: '#e60023',
  currentPrice: 19.03,
  fairPriceRange: '$15 - $32',
  shares0: 676.0,
  rev25: 4222,
  fcfMargin25: 0.297,
  taxRate: 0.21,
  cash: 2500,
  debt: 0,
  beta: 1.58,
  rsRating: 10,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "Existential uncertainty. RS 10 signals that the market views GenAI search as a serious threat to Pinterest's discovery moat. Despite fundamental improvements, the technicals suggest big money is looking elsewhere for AI winners. ",


  analystConsensus: { rating: 'Buy', targetLow: 15, targetMedian: 28, targetHigh: 50, numAnalysts: 26 },
  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.25245, 0.297, 0.34155],
  exitMultiple: [12, 16, 19],
  desc: [
    'GenAI-powered search (Google SGE, Perplexity) erodes Pinterest\'s visual discovery moat — users bypass visual search for LLM-generated recommendations. Advertiser ROAS deteriorates as engagement declines. ' +
      'Revenue growth falls to mid-single digits. FCF margins compress to ~25% on defensive R&D spend. Multiple compresses to 12x as market prices in structural decline.',
    'Pinterest defends its visual discovery niche alongside GenAI search — advertisers value high-intent shopping signals that LLMs can\'t replicate. Revenue grows at high-single to low-double digits. ' +
      'FCF margins expand to ~30% on ad tech maturation. Multiple settles at 16x reflecting an uncertainty discount. Zero debt and $2.5B cash provide optionality.',
    'Pinterest integrates GenAI into its discovery platform, enhancing personalization and advertiser targeting. Social commerce conversions accelerate as the platform becomes the default visual shopping layer. ' +
      'Revenue sustains low-teens growth. FCF margins expand to ~34% on operating leverage. Market re-rates to 19x as a GenAI-enhanced commerce platform.',
  ],

  bullMaOptVal: 15.42 * 676.0 * 0.07,
});

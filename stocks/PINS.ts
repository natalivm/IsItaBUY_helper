import { defineStock } from './defineStock';

export const PINS = defineStock({
  updatedOn: '06/09',
  ticker: 'PINS',
  name: 'Pinterest',
  sector: 'Social Commerce',
  themeColor: '#e60023',
  currentPrice: 21.92,
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
  reasonsToBuy: [
    'High-intent visual shopping signals are difficult for LLMs to replicate, sustaining advertiser value proposition',
    'Zero debt and substantial cash provide optionality for buybacks, M&A, or AI-platform investment',
    'Monthly active user growth in international markets remains a meaningful untapped monetization opportunity',
    'If GenAI integration enhances personalization, Pinterest could accelerate its social commerce conversion rates',
  ],

  risksToBuy: [
    'Deeply negative relative strength signals institutional money actively rotating out — the market is voting against the thesis',
    'GenAI-powered search directly threatens the visual discovery moat that anchors Pinterest\'s advertising model',
    'Revenue growth in a disruption scenario could deteriorate to low single digits with multiple compression to follow',
    'The platform has struggled to fully convert discovery intent into measurable direct-response advertiser ROI',
    'AI disruption risk is flagged as severe — the bear case is structural decline, not a temporary cyclical setback',
  ],

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

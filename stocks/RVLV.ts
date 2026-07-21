import { defineStock } from './defineStock';

export const RVLV = defineStock({
  ticker: 'RVLV',
  name: 'Revolve Group, Inc.',
  sector: 'Consumer Discretionary · Fashion E-Commerce',
  themeColor: '#c2185b',
  currentPrice: 25.37,
  fairPriceRange: '$14 - $49',
  shares0: 73,
  rev25: 1230,
  fcfMargin25: 0.037,
  taxRate: 0.25,
  cash: 303,
  debt: 0,
  beta: 1.60,
  modelType: 'EPS_PE',
  baseEps: 0.83,
  rsRating: 24,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Q1 2026 revenue acceleration validated by the strongest quarterly beat in years',
    'Zero-debt balance sheet with substantial net-cash cushion provides rare downside protection',
    'Owned brand penetration still in early innings with room to more than double mix share',
    'FWRD positioned to capture luxury market abandoned by Farfetch bankruptcy at a global scale',
    'AI-powered personalization and agentic shopping experience driving measurable incremental revenue',
  ],

  risksToBuy: [
    'Elevated marketing investment may fail to convert — brand launches could disappoint after heavy spend',
    'Gen Z loyalty to TikTok Shop, Shein, and resale platforms poses a secular demand threat',
    'Tariff exposure on sourced inventory could reverse recent gross margin progress',
    'Stock sold off sharply from post-earnings highs, signaling institutional skepticism of the acceleration',
    'Physical retail expansion is unproven at scale and adds execution risk to an already crowded strategy',
  ],

  updatedOn: '07/21',
  lastReportTag: 'Q1 2026',

  epsCagr: [5, 14, 22],
  exitPE: [13, 18, 22],
  prob: [20, 50, 30],

  revGrowth: [
    [0.06, 0.06, 0.05, 0.05, 0.05], // Bear: tariffs/macro bite, trend misses, growth halves
    [0.14, 0.12, 0.11, 0.10, 0.09], // Base: Q1 momentum sustains, decelerates to 9-10% as base grows
    [0.18, 0.16, 0.15, 0.14, 0.13], // Bull: all levers fire — owned brands, FWRD, China, physical
  ],

  fcfMargin: [
    [0.032, 0.030, 0.028, 0.025, 0.022], // Bear: marketing spend doesn't pay off, margins erode
    [0.042, 0.058, 0.068, 0.076, 0.082], // Base: margin recovery continues toward 7-8%
    [0.060, 0.078, 0.092, 0.102, 0.112], // Bull: owned brand mix + AI efficiency → 10%+ FCF
  ],

  exitMultiple: [8, 12, 16],

  desc: [
    'Marketing investment fails to drive incremental demand. Trend misses amplify inventory markdowns, reversing the Q4 markdown algorithm gains. ' +
      'Beauty/men\'s expansion proves dilutive to unit economics, not accretive. EPS stagnates at ~$1.06 in 5 years (5% CAGR from low base). ' +
      'P/E compresses to 13x as growth disappoints. 5yr price ~$14, -10% to -12% annual return from current price.',
    'Q1 2026 momentum (+16%) moderates to 10-12% but sustains. Owned brand penetration reaches 26-28% by 2030, driving margin expansion. ' +
      'FWRD personal shopping program continues ~100% growth trajectory. China owned brand initiative scales. ' +
      'EPS compounds at 14% CAGR to reach ~$1.60 by 2030. P/E settles at 18x. 5yr price ~$29, ~4% CAGR.',
    'Owned brands hit 30%+ penetration on back of the "most impactful launches ever." FWRD emerges as dominant luxury multi-brand platform post-Farfetch. ' +
      'China + Middle East scale to 30%+ of international revenue. Physical retail proves economics work, accelerating national rollout. ' +
      'EPS compounds at 22% CAGR to ~$2.23 by 2030. Market re-rates to 22x. 5yr price ~$49, ~15% CAGR.',
  ],

  thesis: [
    'Marketing spend doesn\'t convert. 2026 was the peak investment year with no payoff — \'most impactful launches ever\' disappoints. ' +
      'Tariffs continue to bite gross margin despite mitigation. Gen Z preference shift to TikTok Shop, Shein, or resale platforms. ' +
      'At 13x P/E on $1.06 EPS: ~$14. The sell-off from $31.68 post-earnings back to $24 within 1 week suggests the market already has doubts.',
    'Beat-and-raise Q4 validates the multi-lever thesis. Revenue acceleration from 8% (FY2025) → 10% (Q4 2025) → 16% (Q1 2026 tracker). ' +
      '$303M cash + zero debt gives $4+ in per-share cushion and optionality for buybacks or M&A. ' +
      'Analyst consensus converging on $30-$40 targets. Base case implies ~20% upside from $24. Probability ~50%.',
    'AI-powered shopping experience becomes a competitive moat. Agentic AI chat + personalization drives materially higher conversion. ' +
      'Owned brand launches resonate with Gen Z, owned mix approaches 35%. Physical retail scales to 15-20 stores nationally. ' +
      'FWRD captures the multi-billion-dollar luxury market share left behind by Farfetch\'s bankruptcy. All of this simultaneously. Probability ~30%.',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 28, targetMedian: 35, targetHigh: 40, numAnalysts: 8 },

  termGrowth: [0.015, 0.02, 0.025],
  bbRate: [0, 0.005, 0.01],
  ebitdaProxy: [0.07, 0.11, 0.15],
  bullMaOptVal: false,
});

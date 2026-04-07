import { defineStock } from './defineStock';

export const RVLV = defineStock({
  ticker: 'RVLV',
  name: 'Revolve Group, Inc.',
  sector: 'Consumer Discretionary · Fashion E-Commerce',
  themeColor: '#c2185b',
  currentPrice: 23.45,
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
  rsRating: 58,
  rsTrend: 'falling',
  aiImpact: 'POSITIVE',
  strategicNarrative:
    "Q4 2025 blowout: +10% revenue, +58% net income, +63% EPS beat vs consensus, EBITDA +44%. Early Q1 2026 tracking +16% YoY — acceleration is real. " +
    "FCF surged 157% to $46M; cash reached $303M with zero debt ($4+/share net cash). The story has upgraded from 'margin recovery' to 'multi-lever growth.' " +
    "Five compounding drivers: owned brands scaling toward 35%+ penetration (currently 20%), FWRD gaining share after Farfetch bankruptcy, China accelerating at ~2x international average, " +
    "physical retail expanding (Aspen + The Grove, more planned for 2026), and AI monetization — 'several million in annualized revenue gains' with agentic AI in development. " +
    "2026 marketing spend intentionally stepped up (+125bps) to fuel 'most impactful owned brand launches ever' — near-term EPS headwind but long-term brand investment. " +
    "At $24 with $4+/share cash and analysts targeting $28-$40 post-earnings, risk/reward has shifted materially from HOLD territory. " +
    "Main risk: stock ran to $31.68 post-earnings then sold off — market not fully buying the acceleration yet. RS 47 with price below 50-day MA reflects that skepticism.",

  updatedOn: '04/06',

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

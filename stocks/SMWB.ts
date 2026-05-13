import { defineStock } from './defineStock';

export const SMWB = defineStock({
  updatedOn: '05/12',
  ticker: 'SMWB',
  name: 'Similarweb Ltd.',
  sector: 'Web Analytics',
  themeColor: '#3b82f6',
  currentPrice: 3.12,
  fairPriceRange: '$4.5 - $21',
  shares0: 83.5,
  rev25: 286.5,
  fcfMargin25: 0.08,
  taxRate: 0.15,
  cash: 65.5,
  debt: 0,
  beta: 1.62,
  costDebt: 0.0,
  rsRating: 3,
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "Terminal technical weakness. RS 3 signals total institutional abandonment. The existential threat to web traffic measurement in an LLM-first world is a heavy anchor. Avoid at all costs despite the low P/S ratio. ",


  analystConsensus: { rating: 'Hold', targetLow: 4, targetMedian: 8, targetHigh: 10, numAnalysts: 11 },
  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.068, 0.08, 0.092],
  exitMultiple: [12, 16, 19],
  desc: [
    'LLM-first browsing (ChatGPT, Perplexity) fundamentally undermines web traffic measurement — the core data asset loses relevance as user behavior shifts away from traditional URLs. ' +
      'Enterprise churn accelerates. Revenue growth stalls at mid-single digits. Thin ~6.8% FCF margins leave no room for reinvestment. Multiple compresses to 12x on terminal decline narrative. RS 3 confirms total institutional abandonment.',
    'Web analytics remains relevant for enterprise SEO and competitive intelligence despite LLM disruption. Similarweb pivots toward AI-augmented insights as a complementary data layer. ' +
      'Revenue grows at high-single to low-double digits. FCF margins inch to ~8% but remain thin. Valued at 16x as a small-cap data vendor with niche utility but no structural moat.',
    'Enterprise demand for competitive intelligence proves resilient — LLM traffic data becomes a new premium product line. Revenue sustains low-teens growth on successful pivot. ' +
      'FCF margins expand to ~9%. Market re-rates to 19x. Even in bull case, thin margins and small scale cap the absolute upside.',
  ],

  bullMaOptVal: 3.98 * 83.5 * 0.07,
});

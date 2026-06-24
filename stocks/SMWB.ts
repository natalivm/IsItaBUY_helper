import { defineStock } from './defineStock';

export const SMWB = defineStock({
  updatedOn: '06/24',
  lastReportTag: 'Q1 2026',
  ticker: 'SMWB',
  name: 'Similarweb Ltd.',
  sector: 'Web Analytics',
  themeColor: '#3b82f6',
  currentPrice: 5.16,
  fairPriceRange: '$4.5 - $21',
  shares0: 83.5,
  rev25: 286.5,
  fcfMargin25: 0.08,
  taxRate: 0.15,
  cash: 65.5,
  debt: 0,
  beta: 1.62,
  costDebt: 0.0,
  rsRating: 38,
  rsTrend: 'rising',
  ratingOverride: 'HOLD',  // Model STRONG BUY (~+86%) but a small-cap with AI-disruption risk and weak RS; external consensus is Hold. HOLD.
  aiImpact: 'DISRUPTION_RISK',
  reasonsToBuy: [
    'First non-GAAP operating profit marks a genuine inflection after years of losses, validating the path to profitability',
    'Clean balance sheet with meaningful cash and zero debt provides runway even if growth disappoints',
    'Enterprise cohort at large-customer tier showing positive net revenue retention, signaling improving stickiness',
    'Multiyear contract mix has risen sharply, locking in revenue and reducing near-term churn exposure',
    'Institutional accumulation and improving industry group rank signal early-stage demand recovery',
  ],

  risksToBuy: [
    'LLM-first browsing structurally threatens URL-based web traffic measurement — the company\'s core data asset',
    'Overall NRR below one hundred percent means the existing base is still shrinking in aggregate spend',
    'CEO transition injects leadership uncertainty at a critical moment in the profitability pivot',
    'Thin FCF margins leave little room for reinvestment, limiting the ability to compete or pivot quickly',
    'Speculative-grade stock with small scale — any macro or competitive setback could threaten the entire thesis',
  ],

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

  debtSafety: {
    netDebt: -65,
    ebitda: 25,
    fy: 'LTM',
    note: 'Net cash ~$65M, no financial debt. IBD D/E 148% reflects lease/deferred obligations, not funded debt. Balance sheet is clean for a small-cap SaaS.',
  },
});

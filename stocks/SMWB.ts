import { defineStock } from './defineStock';

export const SMWB = defineStock({
  updatedOn: '06/03',
  lastReportTag: 'Q1 2026',
  ticker: 'SMWB',
  name: 'Similarweb Ltd.',
  sector: 'Web Analytics',
  themeColor: '#3b82f6',
  currentPrice: 4.31,
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
  ratingOverride: 'HOLD',
  aiImpact: 'DISRUPTION_RISK',
  strategicNarrative: "Q1 2026 (May 13): revenue $73.9M (+10% YoY, top of guidance), first non-GAAP operating profit ($2.4M, 3% margin) vs. a loss a year ago — 10th consecutive quarter of positive normalized FCF ($6.6M). NRR stabilized at 98% overall and 103% for $100K+ ARR customers; 64% of ARR now on multiyear contracts (up from 52%). FY2026 guidance: $307–315M revenue (+10%), non-GAAP operating profit $17–19M. CEO transition expected by mid-2027 adds management uncertainty. RS recovered from 3 → 38 with Acc/Dist A+ and Industry Group Rank 22/142. The LLM disruption risk remains structural — if AI-native search continues to erode URL-based traffic measurement, the core data asset degrades. But the path to GAAP profitability is real, the balance sheet is clean ($65M cash, no debt), and the enterprise customer base is stabilizing. Watch for RS above 50 and NRR inflection above 100% before adding size.",


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

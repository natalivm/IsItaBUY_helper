import { defineStock } from './defineStock';

export const SMWB = defineStock({
  updatedOn: '10/14',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  ticker: 'SMWB',
  name: 'Similarweb Ltd.',
  sector: 'Web Analytics',
  themeColor: '#3b82f6',
  currentPrice: 8.3,
  fairPriceRange: '$9 - $12',  // stockanalysis.com analyst target range (Sep 25 2026)
  shares0: 88.25,      // 88.25M (stockanalysis, Oct 2026)
  rev25: 282.6,        // FY2025A $282.6M (was 286.5); revGrowth[0] = FY26 (guide $314-318M raised, +12%), FY27E $351M (+11%)
  fcfMargin25: 0.05,   // TTM FCF $14.9M / $295.6M (normalized FCF higher)
  taxRate: 0.15,
  cash: 73.9,
  debt: 45.7,          // stockanalysis total debt (largely leases)
  beta: 1.62,
  costDebt: 0.0,
  rsRating: 86,        // IBD RS per user, 10/11/2026 (was 38)
  rsTrend: 'rising',
  ratingOverride: 'HOLD',  // Model STRONG BUY/BUY on thin-margin FCF compounding, but a sub-$1B small-cap with structural AI-disruption risk to its core data asset; Street PT only ~$9-12. RS has turned strong (38 → 86, Oct 2026), but the business-model risk, not momentum, drives the HOLD.
  // Q2 2026 UPDATE (Aug 12, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $77.2M (+9%), non-GAAP op profit $6.5M (8%), FIRST positive GAAP
  // operating profit ($0.7M), normalized FCF $8.7M (11th straight positive
  // quarter). FY26 GUIDE RAISED: revenue $314-318M, non-GAAP op profit
  // $24-26M. Q3: $80.5-82.5M / $7.5-9.5M. Street: Buy (8), PT $9-12 (median
  // $11); FY26E $316.5M / EPS $0.21, FY27E $351.3M / $0.31.
  // ─────────────────────────────────────────────────────────────────────────
  aiImpact: 'DISRUPTION_RISK',
  reasonsToBuy: [
    'First positive GAAP operating profit marks a genuine inflection after years of losses, validating the path to profitability',
    'Clean balance sheet with net cash and no funded debt provides runway even if growth disappoints',
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

  analystConsensus: { rating: 'Buy', targetLow: 9, targetMedian: 11, targetHigh: 12, numAnalysts: 8 },  // stockanalysis.com (Sep 25 2026)
  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.068, 0.08, 0.092],
  exitMultiple: [12, 16, 19],
  desc: [
    'LLM-first browsing (ChatGPT, Perplexity) fundamentally undermines web traffic measurement — the core data asset loses relevance as user behavior shifts away from traditional URLs. ' +
      'Enterprise churn accelerates. Revenue growth stalls at mid-single digits. Thin ~6.8% FCF margins leave no room for reinvestment. Multiple compresses to 12x on terminal decline narrative. 5yr target {target} ({cagr} annualized).',
    'Web analytics remains relevant for enterprise SEO and competitive intelligence despite LLM disruption. Similarweb pivots toward AI-augmented insights as a complementary data layer. ' +
      'Revenue grows at high-single to low-double digits. FCF margins inch to ~8% but remain thin. Valued at 16x as a small-cap data vendor with niche utility but no structural moat. 5yr target {target} ({cagr} annualized).',
    'Enterprise demand for competitive intelligence proves resilient — LLM traffic data becomes a new premium product line. Revenue sustains low-teens growth on successful pivot. ' +
      'FCF margins expand to ~9%. Market re-rates to 19x. Even in bull case, thin margins and small scale cap the absolute upside. 5yr target {target} ({cagr} annualized).',
  ],

  bullMaOptVal: 3.98 * 83.5 * 0.07,

  debtSafety: {
    netDebt: -28,          // Jun 2026 (stockanalysis): ~$73.9M cash − ~$45.7M debt (mostly leases)
    ebitda: 28,            // FY26E non-GAAP op profit ~$25M + D&A (GAAP TTM EBITDA ~−$6M)
    fy: 'FY26E',
    note: 'Net cash ~$28M including lease debt; no funded borrowings. Balance sheet is clean for a small-cap SaaS.',
  },
});

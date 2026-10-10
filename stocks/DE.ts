import { defineStock } from './defineStock';

export const DE = defineStock({
  ticker: 'DE',
  name: 'Deere & Company',
  sector: 'Machinery',
  themeColor: '#10b981',
  currentPrice: 620.93,
  updatedOn: '10/09',
  lastReportTag: 'Q3 FY26',
  dataReviewedOn: '2026-10-10',
  fairPriceRange: '$500 - $813',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 270.0,
  rev25: 38900,         // FY2025; FY26E consensus $41.1B (+6%), FY27E $44.6B (+9%)
  fcfMargin25: 0.155,
  taxRate: 0.22,
  cash: 5200,
  debt: 65953,          // incl. ~$45B+ John Deere Financial debt funding receivables (operational) — why the model is EPS_PE, not DCF
  beta: 0.78,
  costDebt: 0.0497,
  rsRating: 64,         // IBD RS per user, 10/10/2026 (was 53)
  rsTrend: 'rising',
  // Switched DCF → EPS_PE at the Q3 FY26 review (decision tree rule 2: debt is operational). The DCF netted
  // ~$60B of captive-finance debt against equipment-business cash flows, producing a meaningless ~$49 bear case.
  modelType: 'EPS_PE',
  baseEps: 18.10,       // FY26E (Oct 2026) EPS — stockanalysis consensus (FY27E $22.77, +26% as the cycle turns). FY26 net income guide raised to $4.75-5.00B (≈$17.6-18.5/sh). Q3 EPS $5.10 (vs $4.75), 9M $14.06.
  epsCagr: [3, 12, 16],  // Base: FY27 cycle rebound (+26% consensus) then high-single digits ≈ 12% from the FY26 trough
  exitPE: [14, 20, 24],  // Mid-cycle-ish multiples on FY31 earnings
  prob: [25, 50, 25],

  // Q3 FY26 UPDATE (Aug 20, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Net income $1.379B ($5.10/sh, vs $4.75), beat ($4.79 consensus). Revenue
  // $12.6B (+5%). Tariff recoveries $110M in Q3 ($382M 9M). FY26 net income
  // guide raised to $4.75-5.00B. Mgmt still sees 2026 as the BOTTOM of the
  // ag equipment cycle. Street: Buy (25), PT $500-813 (median $728); FY26E
  // EPS $18.10 / rev $41.1B, FY27E $22.77 / $44.6B. ~34× trough FY26E,
  // ~27× FY27E.
  // ─────────────────────────────────────────────────────────────────────────
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Number-one global agricultural equipment brand with deep dealer network and high switching costs',
    'Precision agriculture technology and autonomous equipment create a durable, tech-driven moat',
    'Management sees this year as the bottom of the ag equipment cycle, with earnings expected to rebound sharply next year',
    'John Deere Financial provides a recurring revenue stream with resilient, captive equipment buyers',
  ],

  risksToBuy: [
    'Earnings are declining cycle-on-cycle, making today\'s valuation expensive relative to near-term power',
    'Farm commodity prices and credit conditions are key external drivers entirely outside management control',
    'Massive equipment financing debt amplifies downside risk when the agro cycle turns negative',
    'EBIT margins sit well below prior cycle peaks, limiting near-term earnings recovery speed',
    'Precision ag software monetization is still early and unproven at scale against cheaper competitors',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 500, targetMedian: 728, targetHigh: 813.18, numAnalysts: 25 },  // stockanalysis.com, Oct 9 2026
  revGrowth: [
    [0.05, 0.02, 0.03, 0.03, 0.03],   // Bear: FY26 ~locked; recovery stalls
    [0.057, 0.085, 0.08, 0.07, 0.07], // Base: FY26/FY27 ≈ consensus $41.1B / $44.6B
    [0.06, 0.11, 0.10, 0.09, 0.09],   // Bull: agro upcycle + precision-ag monetization
  ],
  fcfMargin: [
    [0.12, 0.11, 0.10, 0.10, 0.10],
    [0.155, 0.15, 0.15, 0.15, 0.15],
    [0.16, 0.17, 0.18, 0.18, 0.18],
  ],
  exitMultiple: [12, 16, 17.5],
  desc: [
    'The 2026 trough extends: commodity price weakness and farm-credit stress delay the rebound. EPS compounds only ~3% from the $18.10 FY26E base and the multiple compresses from ~34x trough to ~14x. 5yr target {target} ({cagr} annualized).',
    '2026 marks the cycle bottom as management expects: FY27 EPS rebounds ~26% (consensus ~$22.8), then compounds high-single digits; EPS ~12% CAGR from $18.10 with the multiple normalizing to ~20x. 5yr target {target} ({cagr} annualized) — the recovery is largely priced.',
    'Strong agro supercycle return with precision ag / autonomy monetization driving margin expansion; EPS ~16% CAGR at a ~24x exit. 5yr target {target} ({cagr} annualized).',
  ],

  bbRate: [0.005, 0.015, 0.02],
  ebitdaProxy: [0.15, 0.22, 0.28],
  debtSafety: {
    netDebt: 60753,
    ebitda: 8500,
    capexToOcf: 0.27,
    interestCoverage: 3.4,
    altmanZ: 2.5,
    fy: 'FY25',
    note: '~$45B of gross debt sits in John Deere Financial (equipment financing arm), inflating the ratio vs pure machinery operations. Even adjusted, equipment-only leverage is elevated in a down-cycle. High leverage on a commodity-cycle business amplifies downside risk.',
  },
});

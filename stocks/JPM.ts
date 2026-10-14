import { defineStock } from './defineStock';

export const JPM = defineStock({
  updatedOn: '10/14',
  ticker: 'JPM',
  name: 'JPMorgan Chase & Co.',
  sector: 'Diversified Banking',
  themeColor: '#065f46',
  currentPrice: 335.28,
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$305 - $420',  // stockanalysis.com analyst target range (Oct 8 2026)
  shares0: 2674,
  rev25: 182450,       // FY2025A; revGrowth[0] = FY26 (consensus $208.5B, +14% incl. Visa/equity gains), FY27E $214.5B
  fcfMargin25: 0.30,
  taxRate: 0.21,
  cash: 30000,
  debt: 400000,
  beta: 1.10,
  costDebt: 0.045,
  baseEps: 22.6,       // FY26E EPS ex-significant items: consensus $24.13 less ~$1.56 Q2 Visa/equity-investment gains. FY27E $25.12 (+11% on this base). Prior: $21.9.
  modelType: 'EPS_PE',
  rsRating: 86,        // IBD RS per user, 10/11/2026 (was 59)
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  // Q2 2026 UPDATE (Jul 14, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Reported net income $21.2B / EPS $7.70 incl. a $4.6B Visa-share gain and
  // $1.0B equity-investment gains; ex-items $16.9B / $6.14, ROTCE 23%.
  // Revenue $57.3B (+28% reported), NII $25.5B (+10%). FY26 NII guide
  // raised; adj. expense outlook up ~$2.5B to ~$107.5B. Dividend raised to
  // $1.65/qtr. CET1 14.1%. Street: Buy (25; 12 Hold), PT $305-420 (median
  // $371); FY26E EPS $24.13 (incl. gains), FY27E $25.12. Stock $332.99
  // (~14.7× underlying FY26E). Q3 2026 reports ~Oct 14.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Best-in-class banking franchise with a structurally larger markets wallet post-COVID and a dominant payments network',
    'Through-cycle ROTCE consistency provides reliable EPS compounding regardless of short-term rate environment',
    'Private credit expansion and AI-driven cost reduction support margin defense in a competitive lending environment',
    'Dividends plus buybacks provide a durable total-return floor even in a scenario with no multiple expansion',
    'Capital markets recovery (M&A boom, IPO cycle) is a meaningful upside catalyst if deal activity re-accelerates',
  ],

  risksToBuy: [
    'Bank earnings are inherently cyclical — a credit-cycle turn or rate decline compresses both revenue and multiple simultaneously',
    'Through-cycle ROTCE cap structurally limits EPS CAGR, making it very difficult to clear a meaningful return hurdle',
    'Dimon himself has flagged elevated macro anxiety and high asset prices as risks to the current earnings environment',
    'AI delivers cost savings but management explicitly cannot charge clients for it, so margins improve modestly at best',
    'Late-cycle private credit stress could spread beyond the segment, creating incremental credit losses across the portfolio',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 305, targetMedian: 371, targetHigh: 420, numAnalysts: 25 },  // stockanalysis.com (Oct 8 2026)
  revGrowth: [
    [0.10, 0.00, 0.01, 0.01, 0.01],   // FY26 inflated by one-time gains in all scenarios
    [0.12, 0.03, 0.04, 0.04, 0.03],
    [0.14, 0.05, 0.06, 0.05, 0.05],
  ],
  fcfMargin: [
    [0.25, 0.24, 0.23, 0.22, 0.21],
    [0.30, 0.30, 0.30, 0.30, 0.30],
    [0.32, 0.33, 0.33, 0.34, 0.34],
  ],
  exitMultiple: [8, 11, 14],
  desc: [
    'Rates fall, the credit cycle turns (private credit stress spreads broader) and markets revenue declines. Through-cycle ROTCE drops below 17%. ' +
      'EPS compounds only ~3% from the underlying FY26E $22.60 and the P/E settles at 10x — Dimon\'s warning on high asset prices and late-cycle stress materializes. 5yr target {target} ({cagr} annualized), before dividends.',
    'Through-cycle ROTCE holds near 17-20%. EPS compounds ~8% on mid-single-digit revenue growth, stable margins and a ~3% buyback boost; markets wallet stays structurally larger but M&A/IPO cycles normalize. ' +
      'AI delivers cost support but no revenue uplift. Exit P/E 13x. 5yr target {target} ({cagr} annualized), plus a ~2% dividend yield.',
    'Simultaneous M&A boom, IPO cycle, elevated volatility, private credit expansion and aggressive buybacks; markets revenue stays structurally elevated. ' +
      'EPS compounds ~11% and the P/E holds 15x. 5yr target {target} ({cagr} annualized). Requires sustained macro tailwinds — a cycle-peak scenario, not a new normal.',
  ],

  epsCagr: [3, 8, 11],
  exitPE: [10, 13, 15],
  prob: [20, 55, 25],

  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.35, 0.46, 0.50],
  debtSafety: {
    netDebt: 370000,
    ebitda: 65000,
    capexToOcf: 0.03,
    fy: 'FY25',
    note: 'Standard Net Debt/EBITDA framework does not apply to banks — JPM funds ~$4T in assets via deposits and wholesale funding, which is operational leverage by design, not financial distress. Real safety metric is CET1 capital ratio (14.1% at Q2 2026), well above the regulatory minimum. Panel shown for context only.',
  },
});

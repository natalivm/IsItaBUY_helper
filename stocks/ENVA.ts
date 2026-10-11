import { defineStock } from './defineStock';

export const ENVA = defineStock({
  ticker: 'ENVA',
  name: 'Enova International',
  sector: 'FinTech / Lending',
  themeColor: '#3b82f6',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  currentPrice: 178.07,
  fairPriceRange: '$215 - $285',  // stockanalysis.com analyst target range (Oct 7 2026)
  shares0: 24.7,         // Q1 2026: ~110K shares repurchased; was 24.8M
  rev25: 3200,           // FY2025 net revenue ~$3.2B (Q4'25: $839M × annualized); Q1 2026 was record $875M
  fcfMargin25: 0.110,   // ~11% net margin (adj EPS $11.52 / rev $3.2B)
  taxRate: 0.22,
  cash: 436,             // Q1 2026 end: $436M cash and marketable securities ($1.1B total liquidity)
  debt: 3950,
  beta: 1.49,
  costDebt: 0.082,      // Q1 2026 cost of funds 8.2% (down from 8.3% Q4 2025)
  modelType: 'EPS_PE',
  baseEps: 17.27,       // FY26E adj. EPS consensus (Oct 7 2026; range $16.99-17.47; FY27E $20.96 +21%). Q2 adj. EPS $4.31 (+33%). Prior $11.52 (stale FY25-era figure). EPS_PE because DCF is distorted by securitization funding debt.
  rsRating: 91,         // NOT refreshed — awaiting user RS (10/11/2026)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 23, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Originations $2.3B (+27%), revenue +22%, record loans & receivables $5.5B
  // (+28%), diluted EPS $4.00 (+40%), adj. EPS $4.31 (+33%), adj. EBITDA
  // $256M (+26%). Net charge-off ratio down to 7.3%; net revenue margin 61%.
  // FY26 outlook raised. Grasshopper Bank deal still pending regulatory
  // approval ("constructive dialogue", closing targeted later in 2026).
  // Street: Strong Buy (6), PT $215-285 (median $220.50); FY26E rev $3.86B /
  // EPS $17.27, FY27E $4.54B / $20.96. Stock $178.07 (~10.3× FY26E).
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Structural mix shift toward small-business lending dramatically improves credit quality and reduces the cyclicality of the portfolio',
    'Grasshopper Bank acquisition, once closed, could re-rate ENVA from a subprime lender to a fintech bank with deposit funding',
    'Management guidance for robust earnings growth is backed by record originations and a rapidly expanding loan portfolio',
    'At current forward earnings, valuation remains undemanding for a platform delivering accelerating earnings growth',
    'Declining cost of funds and rising SMB mix are compounding tailwinds that reinforce each other as the portfolio scales',
  ],

  risksToBuy: [
    'A consumer recession or unemployment shock could spike charge-off rates well above historical norms, freezing origination growth',
    'High absolute debt load amplifies downside risk — the leverage that fuels growth in an expansion works sharply in reverse',
    'Grasshopper Bank regulatory approval is uncertain in timing, and any delay removes the key re-rating catalyst',
    'Small analyst coverage universe with a low trading float means institutional liquidity is limited in a stress scenario',
    'Consumer and SMB lending is acutely exposed to interest rate policy, which is entirely outside management control',
  ],

  // ── Scenarios ──

  epsCagr: [6, 15, 22],   // From the FY26E $17.27 base (re-based Oct 2026; was [8,18,25] off $11.52)
  exitPE: [7, 10, 13],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 215, targetMedian: 220.5, targetHigh: 285, numAnalysts: 6 },  // stockanalysis.com (Oct 7 2026)
  revGrowth: [
    [0.08, 0.06, 0.05, 0.04, 0.03],     // BEAR: recession + charge-off spike
    [0.20, 0.17, 0.13, 0.10, 0.08],     // BASE: FY26 ≈ $3.86B consensus (+21%), FY27 ≈ $4.5B
    [0.25, 0.22, 0.18, 0.14, 0.10],     // BULL: Grasshopper charter + SMB scaling
  ],
  fcfMargin: [
    [0.075, 0.075, 0.08, 0.08, 0.08],       // BEAR: charge-offs spike → margin compression
    [0.110, 0.112, 0.115, 0.115, 0.115],    // BASE: stable ~11% net margin
    [0.115, 0.120, 0.125, 0.130, 0.130],    // BULL: Grasshopper deposit funding lowers CoF
  ],
  termGrowth: [0.02, 0.03, 0.035],
  exitMultiple: [7, 10, 13],
  waccAdj: [0.015, 0, -0.005],
  bbRate: [0.003, 0.015, 0.025],
  ebitdaProxy: [0.12, 0.22, 0.35],
  bullMaOptVal: 136 * 24.8 * 0.05,   // Grasshopper optionality premium ~5% of mkt cap

  desc: [
    'A recession and unemployment shock push charge-offs sharply higher, freezing origination volumes and compressing the multiple. Grasshopper is delayed or blocked, and the leverage that fueled growth works in reverse. EPS compounds only ~6% from the FY26E $17.27 base at a 7x trough P/E. 5yr target {target} ({cagr} annualized).',
    'Management delivers on the raised FY26 outlook (~$17.27 adj. EPS) and FY27 grows ~20%; Grasshopper closes and SMB mix keeps improving credit quality while cost of funds declines and buybacks add to per-share growth. EPS compounds ~15% at a 10x exit. 5yr target {target} ({cagr} annualized).',
    'Grasshopper Bank delivers meaningful EPS accretion and the national bank charter triggers a re-rating from subprime lender to fintech bank; deposit funding materially lowers cost of funds. EPS compounds ~22% at 13x. 5yr target {target} ({cagr} annualized).',
  ],

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.015, 0.02, 0.025, 0.025, 0.025],
      fcfUplift: [0.005, 0.01, 0.015, 0.015, 0.015],
    },
  ],

  debtSafety: {
    netDebt: 1730,
    ebitda: 830,
    fy: 'Q1 2026',
    note: 'Framework partially N/A for consumer lenders — $3.79B of the $4.83B total debt is funding debt (loans to customers), not corporate leverage. True corporate debt is $1.73B at 8.82% avg rate. Net interest margin model makes traditional Debt/EBITDA misleading; real safety metric is equity-to-managed-receivables ratio (~24%) and liquidity ($1.1B available).',
  },
});

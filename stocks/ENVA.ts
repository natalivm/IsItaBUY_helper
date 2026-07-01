import { defineStock } from './defineStock';

export const ENVA = defineStock({
  ticker: 'ENVA',
  name: 'Enova International',
  sector: 'FinTech / Lending',
  themeColor: '#3b82f6',
  updatedOn: '07/01',
  lastReportTag: 'Q1 2026',
  currentPrice: 242.18,
  fairPriceRange: '$160 - $250',
  shares0: 24.7,         // Q1 2026: ~110K shares repurchased; was 24.8M
  rev25: 3200,           // FY2025 net revenue ~$3.2B (Q4'25: $839M × annualized); Q1 2026 was record $875M
  fcfMargin25: 0.110,   // ~11% net margin (adj EPS $11.52 / rev $3.2B)
  taxRate: 0.22,
  cash: 436,             // Q1 2026 end: $436M cash and marketable securities ($1.1B total liquidity)
  debt: 3950,
  beta: 1.49,
  costDebt: 0.082,      // Q1 2026 cost of funds 8.2% (down from 8.3% Q4 2025)
  modelType: 'EPS_PE',
  baseEps: 11.52,       // FY2025 adj EPS; DCF distorted by $3.95B securitization debt treated as corporate leverage
  rsRating: 91,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
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

  epsCagr: [8, 18, 25],
  exitPE: [7, 10, 14],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 165, targetMedian: 188, targetHigh: 210, numAnalysts: 6 },
  revGrowth: [
    [0.08, 0.06, 0.05, 0.04, 0.03],     // BEAR: recession + charge-off spike
    [0.20, 0.16, 0.13, 0.10, 0.08],     // BASE: mgmt guided ~20% rev growth FY2026
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
    'A recession and unemployment shock push consumer charge-offs above 20%, freezing origination volumes and compressing the valuation multiple. Regulatory delays on Grasshopper extend the timeline, and the leverage that fueled growth starts working in reverse.',
    'Management delivers on the FY2026 guidance: at least 25% adj EPS growth from the $11.52 FY2025 base, revenue up ~20%. Grasshopper closes in 2H 2026 with synergies ramping. SMB mix shift continues improving credit quality, cost of funds declines from 8.2%, and buybacks add to per-share earnings growth. Q1 2026 trajectory ($3.87, +30% YoY) sets the pace.',
    'Grasshopper Bank fully delivers >25% EPS accretion; the national bank charter triggers a P/E re-rating from subprime lender to fintech bank. SMB portfolio scales from its record $3.7B Q1 2026 base with deposit funding materially lowering cost of funds. Earnings accelerate from the $14.40+ FY2026 floor toward $22+ per share.',
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

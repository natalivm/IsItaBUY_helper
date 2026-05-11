import { defineStock } from './defineStock';

export const ENVA = defineStock({
  ticker: 'ENVA',
  name: 'Enova International',
  sector: 'FinTech / Lending',
  themeColor: '#3b82f6',
  updatedOn: '05/11',
  lastReportTag: 'Q1 2026',
  currentPrice: 168.9,
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
  rsRating: 89,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Q1 2026 record quarter: adj EPS $3.87 (+30% YoY), originations +33% to $2.3B, portfolio $5.3B (+28%), SMB now 70% at 4.6% NCO vs 14.3% consumer — best consolidated NCO since 2023. " +
    "Management raised FY2026 guidance to at least 25% adj EPS growth and ~20% revenue growth. Cost of funds down to 8.2%; $1.1B liquidity. " +
    "Grasshopper Bank on track for 2H 2026 close with >25% EPS accretion once synergies are fully realized. " +
    "At ~11x FY2026 forward P/E (guided ≥$14.40), still undemanding for a platform delivering 30%+ earnings growth with structural quality mix shift to SMB. " +
    "If Grasshopper closes and deposit funding materializes, this re-rates from subprime lender to fintech bank. Recession is the key bear risk — though consumer and SMB demand remained resilient despite Iran war energy price spike.",

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
});

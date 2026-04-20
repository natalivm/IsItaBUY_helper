import { defineStock } from './defineStock';

export const ENVA = defineStock({
  ticker: 'ENVA',
  name: 'Enova International',
  sector: 'FinTech / Lending',
  themeColor: '#3b82f6',
  updatedOn: '04/20',
  currentPrice: 165.23,
  fairPriceRange: '$160 - $250',
  shares0: 24.8,
  rev25: 3200,           // FY2025 net revenue ~$3.2B (Q4'25: $839M × annualized); was stale at 1830
  fcfMargin25: 0.110,   // ~11% net margin (adj EPS $11.52 / rev $3.2B); was stale at 0.098
  taxRate: 0.22,
  cash: 200,
  debt: 3950,
  beta: 1.49,
  costDebt: 0.083,      // Q4'25 cost of funds 8.3% (down from 8.6% prior quarter); was stale at 0.072
  modelType: 'EPS_PE',
  baseEps: 11.52,       // FY2025 adj EPS; DCF distorted by $3.95B securitization debt treated as corporate leverage
  rsRating: 74,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Enova is at an inflection point — the Grasshopper Bank deal ($125-$220M synergies, >25% EPS accretion, closing 2H 2026) transforms it from non-bank lender to bank holding company with national charter and deposit funding. " +
    "Execution is strong: adj EPS +33% YoY, originations +32%, portfolio at $4.9B record, SMB now 68% at 4.6% NCO vs 16% consumer — quality mix shift intact. " +
    "At ~9x forward P/E, the market is not pricing Grasshopper optionality or the structural credit quality improvement. " +
    "If charter + deposit funding materialize, this re-rates from subprime lender to fintech bank. If recession hits first, charge-offs spike and the leverage works against you.",

  // ── Scenarios ──

  epsCagr: [8, 15, 22],
  exitPE: [7, 10, 14],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 165, targetMedian: 188, targetHigh: 210, numAnalysts: 6 },
  revGrowth: [
    [0.08, 0.06, 0.05, 0.04, 0.03],     // BEAR: recession + charge-off spike
    [0.15, 0.13, 0.12, 0.10, 0.08],     // BASE: ~15% rev growth (mgmt guide)
    [0.20, 0.18, 0.15, 0.12, 0.10],     // BULL: Grasshopper charter + SMB scaling
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
    'A recession and unemployment shock push consumer charge-offs above 20%, freezing origination volumes and compressing the valuation multiple. Regulatory overhang from CFPB adds further pressure, and the leverage that fueled growth starts working in reverse.',
    'Management delivers on the 20%+ EPS growth guide. The Grasshopper Bank acquisition closes in the second half of 2026 with synergies beginning to ramp. The SMB mix shift continues improving credit quality, cost of funds declines, and share buybacks add to per-share earnings growth.',
    'Grasshopper Bank fully delivers $125-220M in synergies, the national bank charter triggers a P/E re-rating from subprime lender to fintech bank. A new banking-as-a-service revenue layer emerges, and the SMB portfolio reaches record levels. Earnings accelerate from $15.50 toward $22+ per share.',
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

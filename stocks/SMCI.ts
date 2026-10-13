import { defineStock } from './defineStock';

export const SMCI = defineStock({
  updatedOn: '10/13',
  ticker: 'SMCI',
  name: 'Super Micro Computer, Inc.',
  sector: 'AI Infrastructure / Servers',
  themeColor: '#eab308',
  currentPrice: 39.07,
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$15 - $60',  // stockanalysis.com analyst target range (Oct 2026)
  shares0: 657,        // 656.97M (stockanalysis, Oct 2026)
  rev25: 39060,        // FY26A (Jun 2026) $39.1B (+78%) — base year; revGrowth[0] = FY27 (guide $65-72B; consensus $67.1B), FY28E $78.8B
  fcfMargin25: -0.18,  // TTM FCF −$6.97B — working-capital build for the backlog
  taxRate: 0.20,
  cash: 7540,
  debt: 9260,
  beta: 2.0,
  costDebt: 0.055,
  // Switched DCF_ADVANCED → EPS_PE at the Oct 2026 review: FCF is structurally
  // thin (and negative during the ramp on inventory/receivables), so the
  // decision tree's thin-FCF / working-capital rule applies — like CLS/FLEX.
  modelType: 'EPS_PE',
  baseEps: 4.34,       // FY27E (Jun 2027) non-GAAP EPS consensus (range $3.50-5.13; FY26A $3.63, FY28E $5.33). Q1 FY27 guide $1.01-1.10.
  rsRating: 97,        // IBD RS per user, 10/11/2026 (was 19)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q4 FY26 UPDATE (Aug 11, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Q4 net sales ~$11.1B (~2× y/y) but near the low end of the $11.0-12.5B
  // guide (customer power/cooling/networking readiness delays); non-GAAP GM
  // 17.6% (from 10.1% in Q3), non-GAAP EPS $1.70 vs $0.92 expected. FY26
  // revenue $39.1B (+78%), EPS $3.63 (+76%). FY27 GUIDE: revenue $65-72B;
  // Q1 $14.5-15.5B / EPS $1.01-1.10. >$60B of new orders, record backlog.
  // TTM FCF −$7.0B (working capital); net debt ~$1.7B. Street: Hold (18),
  // PT $15-60 (median $43); FY27E rev $67.1B / EPS $4.34, FY28E $78.8B /
  // $5.33. Stock $41.85 (~9.6× FY27E), down ~29% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Direct beneficiary of the AI infrastructure buildout with hypergrowth revenue driven by GPU server demand',
    'Liquid-cooled and direct-liquid-cooling leadership gives SMCI a real engineering edge in high-density GPU clusters',
    'Faster time-to-market on new GPU platforms than larger competitors due to modular server architecture',
    'DCBBS building-block platform positions SMCI to diversify beyond current concentrated client exposure',
    'Record order intake and backlog point to revenue growing dramatically again this year at a single-digit earnings multiple',
  ],

  risksToBuy: [
    'Dangerously high single-client concentration creates existential revenue risk if that relationship shifts',
    'Gross margins at structurally thin levels leave virtually no cushion for pricing pressure or cost surprises',
    'Hypergrowth is consuming billions of cash in inventory and receivables, pushing the balance sheet into net debt',
    'Accounting irregularities and auditor history create a persistent governance discount in institutional sentiment',
    'AI capex cycle deceleration would simultaneously hit revenue growth and compress a low-quality hardware multiple',
  ],

  epsCagr: [0, 8, 15],      // From the FY27E $4.34 base
  exitPE: [7, 10, 14],       // ~9.6× FY27E today; low-quality hardware multiple with a governance discount
  prob: [30, 45, 25],

  analystConsensus: { rating: 'Hold', targetLow: 15, targetMedian: 43, targetHigh: 60, numAnalysts: 18 },  // stockanalysis.com (Oct 2026)
  revGrowth: [
    [0.55, 0.00, -0.05, 0.03, 0.03],  // Bear: FY27 below the guide (deployment delays), then AI server digestion
    [0.68, 0.15, 0.08, 0.06, 0.05],   // Base: FY27 ≈ $65.6B (low half of guide), FY28 ~$75B, then fade
    [0.80, 0.22, 0.12, 0.10, 0.08],   // Bull: guide high end, DCBBS + liquid cooling share gains
  ],
  fcfMargin: [
    [-0.03, 0.020, 0.025, 0.030, 0.030],
    [-0.01, 0.030, 0.035, 0.040, 0.040],
    [ 0.01, 0.035, 0.045, 0.050, 0.055],
  ],
  exitMultiple: [9, 13, 17],
  desc: [
    'Deployment delays and price competition from Dell, HPE and ODM-direct programs squeeze margins back toward the low teens; the FY27 ramp falls short and earnings stall at the FY27E $4.34 level. ' +
      'Valued as low-quality hardware at ~7x. 5yr target {target} ({cagr} annualized).',
    'FY27 lands in the lower half of the $65-72B guide, then growth fades. Gross margin holds mid-teens; EPS compounds ~8% from $4.34 and the multiple stays ~10x on governance and concentration discounts. 5yr target {target} ({cagr} annualized).',
    'Backlog converts at the high end, DCBBS and direct-liquid-cooling drive share gains and client diversification, and margins hold up. EPS compounds ~15% and the multiple re-rates to ~14x. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  waccAdj: [0.015, 0, -0.005],
  bbRate: [0.005, 0.01, 0.02],
  ebitdaProxy: [0.045, 0.06, 0.075],
  bullMaOptVal: false,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
    },
  ],

  debtSafety: {
    netDebt: 1720,         // Jun 2026: ~$9.26B debt − ~$7.54B cash (stockanalysis)
    ebitda: 2820,          // TTM EBITDA
    fy: 'FY26',
    note: 'GREEN (~0.6×), but trending the wrong way: the backlog ramp is funded with debt and converts while FCF is deeply negative.',
  },
});

import { defineStock } from './defineStock';

export const KKR = defineStock({
  updatedOn: '10/14',
  ticker: 'KKR',
  name: 'KKR & Co. Inc.',
  sector: 'Alternative Asset Mgmt',
  themeColor: '#7c3aed',
  currentPrice: 85.6,
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$97 - $166',  // stockanalysis.com analyst target range (Oct 8 2026)
  shares0: 897,
  rev25: 7650,
  fcfMargin25: 0.85,
  taxRate: 0.21,
  cash: 46100,
  debt: 55100,
  beta: 1.55,
  costDebt: 0.052,
  baseEps: 6.32,       // FY26E adjusted net income per share — stockanalysis consensus (Oct 8 2026; FY25A $4.87, FY27E $7.41 +17%). Q2 ANI $1.63/sh (record). Prior $6.74 was too high for FY26.
  modelType: 'EPS_PE',
  rsRating: 59,        // IBD RS per user, 10/11/2026 (was 36)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 30, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record quarter: ANI $1.5B / $1.63 per adj. share (+38-40%), FRE $1.21B /
  // $1.32 per share (+34%; 70% FRE margin, 10th straight quarter >65%), TOE
  // $1.68/sh (+29%). AUM $796B (+16%), fee-paying AUM $638B (+15%); $34B
  // raised in Q2 ($305B since start of 2024). Street: Buy (23), PT $97-166
  // (median $120); FY26E ANI $6.32, FY27E $7.41. Stock $90.95 (~14×
  // FY26E ANI).
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Fee-related earnings are compounding at a record pace with best-in-class margins as assets under management keep growing',
    'Insurance integration via Global Atlantic provides a durable, recurring accrued income stream independent of carry cycles',
    'Private wealth and retail channel expansion opens a massive new source of capital inflows beyond institutional allocators',
    'Capital markets cycle recovery would unlock carried interest that is currently depressed, creating significant earnings upside',
    'Record earnings while the stock trades at a historically low multiple of adjusted earnings, reflecting broad underappreciation',
  ],

  risksToBuy: [
    'Carry is deeply cyclical — if exit markets stay weak, distributable earnings flatten and the thesis becomes dead money',
    'The stock trades at a discount because markets doubt the durability of carry and fundraising through a weaker exit cycle',
    'Post-2028 earnings trajectory is highly uncertain and depends on sustained capital markets normalization',
    'Soft moat relative to peers like Blackstone and Apollo means AUM growth could disappoint in a crowded fundraising market',
    'Insurance operations at Global Atlantic add balance-sheet complexity that makes earnings quality harder to assess',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 97, targetMedian: 120, targetHigh: 166, numAnalysts: 23 },  // stockanalysis.com (Oct 8 2026)
  revGrowth: [
    [0.06, 0.04, 0.02, 0.00, 0.00],
    [0.15, 0.12, 0.10, 0.09, 0.08],
    [0.22, 0.18, 0.15, 0.12, 0.10],
  ],
  fcfMargin: [
    [0.70, 0.68, 0.65, 0.63, 0.60],
    [0.83, 0.83, 0.84, 0.84, 0.85],
    [0.86, 0.87, 0.88, 0.89, 0.90],
  ],
  exitMultiple: [10, 14, 18],
  desc: [
    'Exit markets stay weak and carried interest remains depressed; fundraising slows in a crowded market. Fee growth slows and carry dries up, so adjusted earnings grow only ~4% a year and the multiple compresses to 10x. ' +
      'Not catastrophic given the strong franchise, but well below cost of capital. 5yr target {target} ({cagr} annualized), before dividends.',
    'The capital markets cycle normalizes: AUM keeps growing mid-teens, exits return and carry partially recovers, while insurance (Global Atlantic) accrued income grows. ' +
      'ANI compounds ~13% from the FY26E $6.32 base and the stock re-rates to 15x. No heroic assumptions — just normalization. 5yr target {target} ({cagr} annualized).',
    'A full cycle recovery combines with structural fee growth; private wealth distribution and insurance integration accelerate beyond expectations. ' +
      'ANI compounds ~15% and the market pays 17x. 5yr target {target} ({cagr} annualized).',
  ],

  epsCagr: [4, 13, 15],   // Bear 10→4 (10/11/2026): the old bear (10% at 12×) still returned ~6%/yr — not a bear case
  exitPE: [10, 15, 17],   // Bear 12→10
  prob: [25, 45, 30],

  bbRate: [0.005, 0.01, 0.02],
  ebitdaProxy: [0.10, 0.18, 0.30],
  debtSafety: {
    netDebt: 9000,
    ebitda: 4000,
    capexToOcf: 0.02,
    fy: 'FY25',
    note: 'Framework partially N/A for alternative asset managers — the $46.1B cash and $55.1B debt are largely tied to Global Atlantic insurance operations (policyholder float). Fee-related earnings from the asset management business are highly cash-generative with minimal leverage risk. Real safety metric is balance sheet AUM coverage, not Net Debt/EBITDA.',
  },
});

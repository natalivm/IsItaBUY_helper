import { defineStock } from './defineStock';

export const KKR = defineStock({
  updatedOn: '11/17',
  ticker: 'KKR',
  name: 'KKR & Co. Inc.',
  sector: 'Alternative Asset Mgmt',
  themeColor: '#7c3aed',
  currentPrice: 95.47,
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-17',
  fairPriceRange: '$103 - $156',  // stockanalysis.com analyst target range (Nov 2026)
  shares0: 897,
  rev25: 7650,
  fcfMargin25: 0.85,
  taxRate: 0.21,
  cash: 46100,
  debt: 55100,
  beta: 1.55,
  costDebt: 0.052,
  baseEps: 6.32,       // FY26E adjusted net income per share EXCLUDING the one-time USI gain — HELD at Q3 2026. Consensus FY26E is now $8.39 (stockanalysis, Nov 2026), but that includes the >$2.00/sh of ANI KKR expects from the USI Insurance sale in Q4; $8.39 less ~$2.0-2.1 ≈ $6.3, i.e. the underlying number is unchanged. 9M ANI $4.80/sh, LTM $5.92. Do not roll the USI gain into a base that compounds for five years.
  modelType: 'EPS_PE',
  rsRating: 59,        // IBD RS per user, 10/11/2026 (was 36)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q3 2026 UPDATE (Nov 9, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Records again: ANI $1.65B / $1.78 per adj. share (+26% per share; beat
  // ~$1.59), FRE $1.32B / $1.42 per share (+24%; LTM FRE margin 70%), TOE
  // $1.88/sh (+21%). 9M ANI $4.80/sh; LTM $5.92. AUM $804B and fee-paying AUM
  // $648B — both +11% y/y, a slowdown from +16% / +15% in Q2. $25B raised in
  // Q3 ($116B LTM), $20B invested, record $146B dry powder. USI Insurance
  // Services sale (announced Aug 31) expected to close in Q4 and add ~$2.0B
  // of ANI (>$2.00/sh) to Q4 results — one-time, kept out of baseEps.
  // Buybacks $906M YTD through Nov 4 (9.9M shares at ~$91.65); authorization
  // topped up by $500M. Asset-management segment: cash + investments $14.3B
  // vs $9.3B debt at par. Street: Buy (24), PT $103-156 (median $122); FY26E
  // ANI $8.39 incl. USI.
  // Sources: SEC 8-K Q3'26 earnings release (0001404912-26-000030);
  // stockanalysis.com.
  // ─────────────────────────────────────────────────────────────────────────

  // Q2 2026 UPDATE (Jul 30, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record quarter: ANI $1.5B / $1.63 per adj. share (+38-40%), FRE $1.21B /
  // $1.32 per share (+34%; 70% FRE margin, 10th straight quarter >65%), TOE
  // $1.68/sh (+29%). AUM $796B (+16%), fee-paying AUM $638B (+15%); $34B
  // raised in Q2 ($305B since start of 2024). Street: Buy (23), PT $97-166
  // (median $120); FY26E ANI $6.32, FY27E $7.41. Stock $90.95 (~14×
  // FY26E ANI).
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Buy', targetLow: 103, targetMedian: 122, targetHigh: 156, numAnalysts: 24 },  // stockanalysis.com (Nov 2026)
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
    'The capital markets cycle normalizes: AUM growth picks back up from the ~11% pace of Q3 2026 toward the mid-teens, exits return and carry partially recovers, while insurance (Global Atlantic) accrued income grows. ' +
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

import { defineStock } from './defineStock';

export const ANET = defineStock({
  ticker: 'ANET',
  name: 'Arista Networks',
  sector: 'Cloud Networking',
  themeColor: '#6366f1',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 216.74,
  fairPriceRange: '$190 - $289',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 1276,       // Q2 2026 diluted
  rev25: 9006,         // FY2025; FY26E consensus $12.68B (+41%; mgmt ~$12.6B), FY27E $16.34B (+29%)
  fcfMargin25: 0.47,
  taxRate: 0.215,
  cash: 13343,         // Jun 30 2026: $2.29B cash + $11.05B marketable securities
  debt: 0,
  beta: 1.10,
  costDebt: 0.045,
  rsRating: 99,         // IBD RS per user, 10/10/2026 (was 83)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 4, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // First $3B+ quarter. Revenue $3,036M (+37.7% y/y, +12.1% q/q). Non-GAAP
  // GM 63.4%, op margin 49.9%; non-GAAP EPS $1.02, GAAP $0.95. SBC $120M.
  // H1 OCF $2.78B. Cash + securities $13.3B, no debt; no buybacks in H1.
  // Deferred revenue $6.87B; inventory $2.54B. Q3 GUIDE: revenue ~$3.3B,
  // non-GAAP op margin 48-49%, EPS $1.06-1.08. Mgmt: FY26 ~$12.6B (~+40%);
  // visibility ~2 quarters, guidance supply-gated; supply tightness and
  // component inflation expected to last until 2028. Street: Strong Buy
  // (32), PT $190-289 (median $248); FY26E EPS $4.12 / rev $12.68B, FY27E
  // $5.22 / $16.34B. ~53× FY26E / ~42× FY27E.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'EOS network operating system creates deep hyperscaler lock-in — switching costs compound with every incremental deployment.',
    'AI fabric revenue more than doubling with supply, not demand, as the binding multi-year constraint.',
    'Scale-across platform (7800R) opens a third growth leg beyond scale-out, expanding the addressable opportunity.',
    'Fortress balance sheet — zero debt and a large cash pile fund R&D and supply commitments with room for buybacks.',
    'ESUN and next-generation optics position Arista for the scale-up cluster opportunity beginning in 2027.',
  ],

  risksToBuy: [
    'Valuation already reflects sustained premium growth — any AI capex deceleration would compress the multiple sharply.',
    'Heavy concentration in two hyperscaler customers means a single spending pause can hit revenue disproportionately.',
    'Near-term gross margin pressure from memory and wafer costs could persist longer than the market expects.',
    'Campus and enterprise networking expansion is still unproven at scale and faces entrenched Cisco competition.',
    'The law of large numbers bites quickly — sustaining above-market growth becomes harder as the revenue base compounds.',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 190, targetMedian: 248, targetHigh: 289, numAnalysts: 32 },  // stockanalysis.com, Oct 9 2026
  revGrowth: [
    [0.38, 0.10, 0.095, 0.09, 0.085],  // Bear: FY26 ~locked near $12.4B; AI networking spend normalizes from FY27
    [0.40, 0.27, 0.18, 0.17, 0.16],    // Base (+0.5%/yr revPrem): FY26 ≈ consensus $12.68B, FY27 ≈ $16.3B consensus, then mid/high-teens
    [0.41, 0.31, 0.24, 0.21, 0.20],    // Bull (+1-1.5%/yr revPrem): scale-up/ESUN + new 10% customers
  ],
  fcfMargin: [
    [0.46, 0.455, 0.45, 0.445, 0.44],
    [0.46, 0.4625, 0.465, 0.4675, 0.47],
    [0.46, 0.465, 0.47, 0.475, 0.48],
  ],
  exitMultiple: [18, 28, 32],
  desc: [
    'AI capex cycle peaks in 2026 and hyperscaler networking spend normalizes. FY26 lands near ~$12.4B (H1 + Q3 guide lock most of it) but supply-chain de-commits and memory/wafer cost inflation cap upside; growth decelerates from 25% to high-single digits by FY30 as the law of large numbers bites. ' +
      'Component cost pressures squeeze FCF margins from 46% toward 44% as Arista absorbs pricing rather than passing it through. Market re-rates from ~53x to 18x EBITDA-equivalent as growth premium evaporates — Arista treated as a mature networking vendor. 5yr target {target} ({cagr} annualized).',
    'AI networking demand stays production-scale — FY26 ~$12.6B revenue (~+40% YoY, raised through the year) with AI fabrics more than doubling and 100+ customers in 800G; FY27 grows high-20s. Growth decelerates naturally to mid-to-high teens as campus ($1.25B target) and EOS platform stickiness ' +
      'sustain above-market expansion; scale-across via 7800R adds a third leg. FCF margins hold at ~47% on CloudVision software mix shift, offsetting supply-chain margin pressure. P/E compresses from ~53x to 28x through earnings growth. Zero-debt fortress with $13.3B cash. 5yr target {target} ({cagr} annualized).',
    'AI supercycle extends into 2028+ — 1.6T ethernet and XPO optics (100+ vendor endorsements) ramp in 2027, ESUN unlocks scale-up rack opportunities (5–7 designs in active engineering with Ken/Hugh teams). ' +
      'Scale-across becomes the dominant differentiated workload as power-constrained sites force distribution; 1–2 new 10%+ customers emerge beyond Microsoft/Meta. Revenue sustains 20%+ growth on diverse-accelerator (AMD MI, TPU) traction and neocloud/sovereign wins. CloudVision software scales FCF margins to 48%. Market maintains premium 32x on structural AI infrastructure compounder. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.02, 0.03, 0.035],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.48, 0.50, 0.52],

  driverOverrides: [
    {},
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
    },
    {
      revPrem: [0.01, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.01, 0.01, 0.01],
    },
  ],
  debtSafety: {
    netDebt: -13343,
    ebitda: 6300,          // FY26E: non-GAAP op margin ~49% × $12.68B + D&A — approximate
    fy: 'FY26E',
    note: 'Zero debt, $13.3B cash & securities (Jun 30 2026). One of the cleanest balance sheets in networking. Net cash exceeds annual EBITDA nearly 3×.',
  },
});

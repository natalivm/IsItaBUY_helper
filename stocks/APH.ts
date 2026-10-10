import { defineStock } from './defineStock';

export const APH = defineStock({
  ticker: 'APH',
  name: 'Amphenol Corp',
  sector: 'Electronic Components · Interconnect',
  themeColor: '#38bdf8',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 87.24,
  fairPriceRange: '$85 - $116',  // stockanalysis.com analyst target range, Oct 8 2026
  shares0: 1278,
  rev25: 23095,        // FY2025 revenue $23.1B (was mis-set to $31B); FY26E consensus $35.6B (+54%), FY27E $42.6B (+20%)
  fcfMargin25: 0.19,   // FY25 FCF $4.38B
  taxRate: 0.27,
  cash: 5419,           // Jun 30 2026
  debt: 18811,         // Jun 30 2026 (CommScope fiber acquisition debt)
  beta: 1.25,
  costDebt: 0.055,
  modelType: 'EPS_PE',
  baseEps: 2.68,       // FY2026E adjusted EPS — stockanalysis consensus (Oct 8 2026; range $2.61-2.84; FY27E $3.33, +24%). Q2 adj. EPS $1.35 (+67%, incl. ~$80M IEEPA tariff recovery); Q3 guide $1.40-1.42. Prior value $4.40 was wrong (FY25 EPS was ~$1.67 GAAP).
  rsRating: 98,         // IBD RS per user, 10/10/2026 (was 80)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 29, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record quarter, above the top of guidance. Sales $8.8B (+55% USD, +30%
  // organic). Orders $10.7B, book-to-bill 1.23. Adj. EPS $1.35 (+67%; incl.
  // ~$80M net IEEPA tariff recovery). Q3 GUIDE: sales $9.3-9.4B (+50-52%),
  // adj. EPS $1.40-1.42 (+51-53%), no further tariff recoveries assumed.
  // Balance sheet (Jun 30): cash $5.4B vs debt $18.8B (net ~$13.4B, post-
  // CommScope). FY25 actuals: revenue $23.1B, NI $4.27B, FCF $4.38B. Street:
  // Strong Buy (19), PT $85-116 (median $100); FY26E EPS $2.68 / rev $35.6B,
  // FY27E $3.33 / $42.6B. ~33× FY26E / ~26× FY27E. NOTE: earlier file inputs
  // (baseEps $4.40, rev $31B, PTs $135-210) were inconsistent with the
  // share price and have been corrected — the prior STRONG BUY was an
  // artifact of that error.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Broadest high-speed copper, power, and optics connector suite in the industry after the CommScope acquisition.',
    'AI infrastructure tailwind is driving record organic growth in IT Datacom, now the dominant revenue segment.',
    'Defense electronics exposure adds a durable second growth driver uncorrelated with the tech capex cycle.',
    'Decentralized acquisition model has compounded shareholder value across decades with disciplined bolt-on M&A.',
    'Book-to-bill above one with all end markets positive signals revenue momentum well into the next several quarters.',
  ],

  risksToBuy: [
    'IT Datacom concentration means an AI capex pause would hit revenue and earnings disproportionately hard.',
    'CommScope integration is still maturing and margins remain dilutive until the combination fully absorbs.',
    'Elevated debt load from acquisitions reduces financial flexibility if the cycle softens unexpectedly.',
    'Premium connector hardware faces commoditization risk as hyperscalers develop custom in-house interconnect solutions.',
    'Multiple has de-rated from peak but remains demanding relative to trough earnings power in a downcycle.',
  ],

  epsCagr: [3, 13, 22],
  exitPE: [22, 30, 38],
  prob: [25, 50, 25],


  analystConsensus: { rating: 'Strong Buy', targetLow: 85, targetMedian: 100, targetHigh: 116, numAnalysts: 19 },  // stockanalysis.com, Oct 8 2026
  revGrowth: [
    [0.50, 0.04, 0.03, 0.03, 0.03],   // Bear: FY26 ~locked (H1 + Q3 guide, incl. CommScope); AI capex pause from 2027
    [0.54, 0.20, 0.09, 0.08, 0.07],   // Base: FY26 ≈ consensus $35.6B, FY27 ≈ $42.6B, then high-single digits
    [0.56, 0.25, 0.15, 0.13, 0.10],   // Bull: AI supercycle extends
  ],
  fcfMargin: [
    [0.17, 0.16, 0.15, 0.15, 0.14],
    [0.18, 0.17, 0.17, 0.17, 0.17],
    [0.18, 0.19, 0.19, 0.19, 0.20],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'AI capex softens meaningfully in 2027, exposing the 41% IT Datacom concentration and CommScope\'s still-dilutive margin profile. ' +
      'Earnings growth decelerates to low single digits as the multiple compresses from 28x to the historical 22x trough. ' +
      'EPS compounds only ~3% from the $2.68 FY26E base. 5yr target {target} ({cagr} annualized).',
    'AI infrastructure build-out sustains at a moderate pace; CommScope integrates on schedule and approaches company-average margins by 2028. ' +
      'Defense provides a durable second tailwind. Earnings compound at ~13% annually from the $2.68 base; a slight de-rating from ~33x to 30x. 5yr target {target} ({cagr} annualized).',
    'The AI supercycle extends well into the decade with continued 20%+ IT Datacom organic growth. ' +
      'CommScope\'s fiber business sees a pull-forward from next-generation data center architectures and building connectivity demand. ' +
      'Earnings compound at ~22% and the market sustains a 38x premium compounder valuation. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.15, 0.22, 0.28],
  debtSafety: {
    netDebt: 13392,        // Jun 30 2026: $18.8B debt − $5.4B cash
    ebitda: 10800,         // FY26E: adj. op margin ~27% × $35.6B + D&A — approximate
    fy: 'FY26E',
    note: 'Managed leverage from acquisition-driven growth (CommScope fiber assets). ~1.2× FY26E EBITDA, well within safe bounds. Amphenol consistently generates 19%+ FCF margins to deleverage quickly after each deal.',
  },
});

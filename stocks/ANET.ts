import { defineStock } from './defineStock';

export const ANET = defineStock({
  ticker: 'ANET',
  name: 'Arista Networks',
  sector: 'Cloud Networking',
  themeColor: '#6366f1',
  updatedOn: '07/24',
  lastReportTag: 'Q1 2026',
  currentPrice: 173.99,
  fairPriceRange: '$145',
  shares0: 1270,
  rev25: 9006,
  fcfMargin25: 0.47,
  taxRate: 0.215,
  cash: 12350,
  debt: 0,
  beta: 1.10,
  costDebt: 0.045,
  rsRating: 83,
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'EOS network operating system creates deep hyperscaler lock-in — switching costs compound with every incremental deployment.',
    'AI fabric revenue more than doubling with supply, not demand, as the binding multi-year constraint.',
    'Scale-across platform (7800R) opens a third growth leg beyond scale-out, expanding the addressable opportunity.',
    'Fortress balance sheet — zero debt and billions in cash fund buybacks and R&D without any dilution risk.',
    'ESUN and next-generation optics position Arista for the scale-up cluster opportunity beginning in 2027.',
  ],

  risksToBuy: [
    'Valuation already reflects sustained premium growth — any AI capex deceleration would compress the multiple sharply.',
    'Heavy concentration in two hyperscaler customers means a single spending pause can hit revenue disproportionately.',
    'Near-term gross margin pressure from memory and wafer costs could persist longer than the market expects.',
    'Campus and enterprise networking expansion is still unproven at scale and faces entrenched Cisco competition.',
    'The law of large numbers bites quickly — sustaining above-market growth becomes harder as the revenue base compounds.',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 140, targetMedian: 174, targetHigh: 200, numAnalysts: 15 },
  revGrowth: [
    [0.25, 0.10, 0.095, 0.09, 0.085],
    [0.277, 0.20, 0.18, 0.17, 0.16],
    [0.30, 0.24, 0.22, 0.21, 0.20],
  ],
  fcfMargin: [
    [0.46, 0.455, 0.45, 0.445, 0.44],
    [0.46, 0.4625, 0.465, 0.4675, 0.47],
    [0.46, 0.465, 0.47, 0.475, 0.48],
  ],
  exitMultiple: [18, 28, 32],
  desc: [
    'AI capex cycle peaks in 2026 and hyperscaler networking spend normalizes. FY26 lands at the guided $11.5B but supply-chain de-commits and memory/wafer cost inflation cap upside; growth decelerates from 25% to high-single digits by FY30 as the law of large numbers bites. ' +
      'Component cost pressures squeeze FCF margins from 46% toward 44% as Arista absorbs pricing rather than passing it through. Market re-rates from ~49x to 18x as growth premium evaporates — Arista treated as a mature networking vendor.',
    'AI networking demand stays production-scale — FY26 $11.5B revenue (+27.7% YoY) hits guide with AI fabrics at $3.5B (more than doubling) and 100+ customers in 800G. Growth decelerates naturally to mid-to-high teens as campus ($1.25B target) and EOS platform stickiness ' +
      'sustain above-market expansion; scale-across via 7800R adds a third leg. FCF margins hold at ~47% on CloudVision software mix shift, offsetting supply-chain margin pressure. P/E compresses from ~49x to 28x through earnings growth. Zero-debt fortress with $12.35B cash funds buybacks ($818M still authorized).',
    'AI supercycle extends into 2028+ — 1.6T ethernet and XPO optics (100+ vendor endorsements) ramp in 2027, ESUN unlocks scale-up rack opportunities (5–7 designs in active engineering with Ken/Hugh teams). ' +
      'Scale-across becomes the dominant differentiated workload as power-constrained sites force distribution; 1–2 new 10%+ customers emerge beyond Microsoft/Meta. Revenue sustains 20%+ growth on diverse-accelerator (AMD MI, TPU) traction and neocloud/sovereign wins. CloudVision software scales FCF margins to 48%. Market maintains premium 32x on structural AI infrastructure compounder.',
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
    netDebt: -12350,
    ebitda: 4200,
    fy: 'FY25',
    note: 'Zero debt, $12.35B cash. One of the cleanest balance sheets in networking. Net cash exceeds annual EBITDA nearly 3×.',
  },
});

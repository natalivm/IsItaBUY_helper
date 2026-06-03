import { defineStock } from './defineStock';

export const AVGO = defineStock({
  ticker: 'AVGO',
  name: 'Broadcom Inc.',
  sector: 'Semiconductors / Enterprise Software',
  themeColor: '#7c4dff',
  updatedOn: '06/03',
  lastReportTag: 'Q2 FY26',
  currentPrice: 481.57,
  fairPriceRange: '$330 - $540',
  shares0: 4700,
  rev25: 102000,
  fcfMargin25: 0.49,
  taxRate: 0.12,
  cash: 9500,
  debt: 69000,
  beta: 0.80,
  costDebt: 0.035,
  rsRating: 90,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Q2 FY26 ($22.2B revenue, +48% YoY; AI semiconductor $10.8B, +143% YoY) and Q3 FY26 guidance ($29.4B, +84% YoY; AI semiconductor $16B, +200%+ YoY) define a pace of revenue expansion without precedent in semiconductor history at this scale. " +
    "FY25 closed at $63.9B; FY26 is now tracking ~$102B (Q1 $19.3B + Q2 $22.2B + Q3 $29.4B guided + Q4 est ~$31B) — a ~60% revenue expansion in a single fiscal year driven by AI ASIC production ramps at Alphabet, Meta, and one undisclosed hyperscaler. " +
    "Q2 EBITDA $15.2B (69% margin) and FCF $10.3B (46% margin) at $22B quarterly revenue are monopoly-tier economics in a hardware/software hybrid. Non-GAAP EPS $2.44 beat $2.40 estimate. " +
    "VMware acquisition debt (~$69B at close) is deleveraging at ~$10B FCF/quarter — net debt est. ~$41B; Net Debt/EBITDA now ~0.67× vs 5×+ at deal close. One of the fastest debt paydowns in mega-cap history. " +
    "The three AI ASIC customers are now in volume production; Q3's $16B guidance means this is not a trial ramp — it is infrastructure at scale. The debate is no longer 'will this happen' but 'how many new hyperscaler wins are in the pipeline.' " +
    "Bear: an AI capex reversal (2022 Nvidia scenario at 4× the scale) collapses growth from 48%+ to sub-10% while the multiple compresses from 35× to 15× FCF simultaneously. " +
    "Analyst consensus targets (median $454, high $525) are stale and expected to be significantly revised post-Q2. AH trading ~$495 (+2.8%). Model updated to ~$102B FY26 revenue base; run build to confirm updated fair value range.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 335, targetMedian: 454, targetHigh: 525, numAnalysts: 30 },
  revGrowth: [
    [0.10, 0.07, 0.05, 0.04, 0.03],  // Bear: AI capex reversal; growth collapses from 48%+ at $102B base
    [0.20, 0.15, 0.12, 0.09, 0.07],  // Base: AI moderates, VMware stable, three-ASIC-customer base
    [0.28, 0.22, 0.17, 0.13, 0.10],  // Bull: new hyperscaler ASIC wins, AI supercycle extends
  ],
  fcfMargin: [
    [0.42, 0.42, 0.41, 0.41, 0.40],
    [0.49, 0.51, 0.52, 0.53, 0.54],
    [0.55, 0.57, 0.58, 0.59, 0.60],
  ],
  exitMultiple: [16, 23, 26],
  desc: [
    'AI capex cycle reverses as hyperscaler ROI disappoints — Alphabet and Meta reduce ASIC orders. Revenue growth collapses from 48%+ to sub-10% off the $102B FY26 base. ' +
      'Multiple compresses from 35× → 15× FCF simultaneously with topline deceleration — the 2022 Nvidia scenario at 4× the scale. VMware churn accelerates as enterprise IT budgets tighten.',
    'AI capex moderates to a sustainable pace; revenue grows 15-20% from the $102B FY26 base through FY31. VMware recurring revenue stabilizes margins at 50%+ FCF. ' +
      'Current three ASIC hyperscaler customers sustain volume production. P/E naturally compresses from ~35× toward 22-25× through earnings growth — returns are fundamental, not multiple expansion.',
    'A 4th+ hyperscaler (sovereign AI, Apple, or new US tech giant) awards volume ASIC production, expanding TAM well beyond current backlog. VMware cross-selling exceeds targets. ' +
      'Revenue sustains 25-28% CAGR from $102B FY26 base. FCF margin reaches 58-60%. Broadcom becomes the dominant AI infrastructure platform at $3T+ market cap.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.005, 0.018, 0.025],
  ebitdaProxy: [0.50, 0.62, 0.68],
  bullMaOptVal: 335 * 4700 * 0.05,

  driverOverrides: [
    {},
    {
      revPrem: [0.015, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.01, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.015],
    },
  ],
  debtSafety: {
    netDebt: 41000,
    ebitda: 61000,
    fy: 'Q2 FY26',
    note: 'VMware acquisition debt deleveraging at ~$10B FCF/quarter. Net debt est. ~$41B after H1 FY26 repayments; EBITDA annualized from Q2 actuals ($15.2B × 4 = $60.9B). Net Debt/EBITDA now ~0.67× — collapsed from 5×+ at deal close. One of the fastest mega-cap debt paydowns on record.',
  },
});

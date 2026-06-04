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
    "Q2 FY26: revenue $22.2B (+48% YoY, beat $22.1B est), EBITDA $15.2B at 68.71% margin (+205bps YoY — expanding, not compressing despite AI mix shift), EBIT 67.28% (+201bps YoY), non-GAAP EPS $2.44 (beat $2.40), GAAP EPS $1.91 (beat $1.73 by 10.7%). " +
    "One flag: FCF $10.26B missed $11.39B estimate by 9.9% despite lower capex ($231M vs $245M est) — CFO shortfall likely reflects working capital build ahead of H2 ramp. Q1 FY26 FCF was $8.01B (41.5% margin); Q2 at 46.3% is sequentially improving. " +
    "The conference call detail is far more bullish than headlines: FY26 AI semiconductor total $56B (+180% from FY25), implying Q4 AI alone ~$20.8B (nearly 2× Q3's $16B). Bookings >$30B vs current shipments = order visibility into FY28. " +
    "Customer contracts are binding commitments, not projections: Google (multi-generation TPU + networking); Anthropic (5GW next-gen TPU starting 2027); Meta (3GW through 2028, initial 1GW order received); OpenAI (1.3GW committed for FY27, production late 2026). " +
    "Networking ~40% of Q2 AI revenue — industry's only 100Tb Ethernet switch for over a year, 200Tb launched this quarter. Durable moat within AI infrastructure, not a rounding error. " +
    "FY27: AI semiconductor >$100B (+80% from $56B FY26), ~10GW compute shipping (back-half loaded), 'a lot more GW' flagged for FY28. Total FY27 revenue likely ~$148B ($100B AI + ~$48B non-AI/software). " +
    "Post-call selloff (-5–14% AH, ~$415–454) triggered by: Q3 AI guide $16B vs $17.2B expected (quarterly split, not trajectory miss), and '$100B+ FY27 AI' maintained rather than raised. Both appear to be market overreaction. " +
    "At $415–454 AH, base case model (committed order book, 45% Year 1 growth) likely shows the stock as BUY. Analyst consensus (median $454, high $525) stale — significant upward revision expected.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 335, targetMedian: 454, targetHigh: 525, numAnalysts: 30 },
  revGrowth: [
    [0.12, 0.07, 0.05, 0.04, 0.03],  // Bear: hyperscaler cancellation/delay; capex reversal
    [0.45, 0.22, 0.15, 0.10, 0.08],  // Base: committed order book delivers ($100B+ FY27 AI)
    [0.55, 0.28, 0.18, 0.13, 0.10],  // Bull: new wins + FY28 acceleration beyond 10GW
  ],
  fcfMargin: [
    [0.40, 0.40, 0.40, 0.40, 0.40],  // Bear: AI mix + margin pressure; FCF stalls
    [0.47, 0.49, 0.51, 0.52, 0.53],  // Base: improves as debt retires; Q2 actual 46.3%
    [0.53, 0.55, 0.57, 0.58, 0.60],  // Bull: scale + debt paydown drives expansion
  ],
  exitMultiple: [16, 23, 26],
  desc: [
    'A hyperscaler (Google, Meta, Anthropic, or OpenAI) cancels or materially delays committed ASIC orders — the reverse of the signed agreements. Revenue growth from the $102B FY26 base collapses below 12%. ' +
      'Multiple compresses from 35× → 15× FCF simultaneously — the 2022 Nvidia scenario at 4× the scale. FCF margin stalls at 40% as AI mix shift erodes gross margin without the volume to compensate.',
    'Committed contracts execute: $100B+ AI semiconductor in FY27 (+80% from $56B FY26), ~10GW compute shipped. Total revenue ~$148B FY27. EBITDA margins hold at 65%+ (as Q2 demonstrated: 68.71% despite AI mix). ' +
      'FCF improves gradually to 53% as VMware debt retires. Natural P/E compression from 35× toward 22-25× through earnings growth drives returns — execution, not multiple expansion.',
    'Beyond the committed 10GW FY27, Broadcom wins additional sovereign AI or next hyperscaler ASIC volumes for FY28 (the "a lot more GW" management signaled). New 200-terabit networking switch gains outside AI clusters. ' +
      'Revenue sustains 25-28% CAGR beyond $102B FY26 base. EBITDA margins reach 70%+ as software/networking mix improves. FCF reaches 58-60%. $3T+ market cap is the base in this scenario.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.005, 0.018, 0.025],
  ebitdaProxy: [0.55, 0.65, 0.70],
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

import { defineStock } from './defineStock';

export const AVGO = defineStock({
  ticker: 'AVGO',
  name: 'Broadcom Inc.',
  sector: 'Semiconductors / Enterprise Software',
  themeColor: '#7c4dff',
  updatedOn: '10/09',
  lastReportTag: 'Q3 FY26',
  dataReviewedOn: '2026-10-10',
  currentPrice: 361.54,
  fairPriceRange: '$216 - $715',  // stockanalysis.com analyst target range, Oct 2 2026
  shares0: 4937,        // Q3 FY26 non-GAAP diluted
  rev25: 105970,       // FY26E (Oct) consensus $105.97B — base year; revGrowth[0] = FY27 (consensus $173.9B, +64%)
  fcfMargin25: 0.47,   // Q3 FY26 FCF $13.7B = 46% of revenue
  taxRate: 0.12,
  cash: 23975,         // Aug 2 2026
  debt: 59419,         // Aug 2 2026: $2.25B ST + $57.2B LT
  beta: 0.80,
  costDebt: 0.035,
  rsRating: 86,         // IBD RS per user, 10/10/2026 (was 74)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q3 FY26 UPDATE (Sep 2026) — first data review since Q1 FY26
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $29.6B (+86%): semis $20.8B (+127%), infrastructure software
  // $8.75B (+29%). AI semis $16.7B (+221% y/y, +54% q/q); XPUs >3.5x y/y, 73%
  // of AI revenue. Non-GAAP GM ~75%, op margin ~68%; non-GAAP EPS $3.32, GAAP
  // $2.68. FCF $13.7B (46%). SBC $2.0B. Cash $24.0B vs debt $59.4B (net
  // ~$35B). Dividend $0.65/qtr ($3.1B); no Q3 buyback. Q4 GUIDE: revenue
  // ~$34.8B (+93%), AI semis ~$21.7B (+236%), non-GAAP op margin ~66%; Meta
  // MTIA production shipments in Q4. Street: Strong Buy (50), PT $216-715
  // (median $535); FY26E EPS $11.66 / rev $106B, FY27E $19.39 / $174B. Stock
  // $361.54 — ~31× FY26E / ~19× FY27E, well below the median target.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Binding multi-year contracts with Google, Meta, Anthropic, and OpenAI underpin AI semiconductor revenue visibility into FY28',
    'Industry\'s only high-capacity Ethernet switch for AI clusters — durable networking moat within hyperscaler infrastructure',
    'AI semiconductor revenue growing rapidly as hyperscaler compute buildout accelerates well beyond current run rate',
    'VMware integration driving software-defined recurring revenue, transforming the business mix toward higher-margin streams',
    'EBITDA margins expanding despite AI mix shift, demonstrating pricing power and operational discipline at scale',
  ],

  risksToBuy: [
    'Single-quarter billings shortfalls can trigger outsized selloffs given elevated valuation expectations',
    'Heavy VMware acquisition debt requires sustained FCF execution to deleverage on schedule',
    'Hyperscaler capex reversal or ASIC order cancellation would collapse the AI revenue trajectory',
    'Customer concentration — a handful of hyperscalers represent the vast majority of AI semiconductor demand',
    'Any slowdown in AI infrastructure spending would expose the stock\'s premium multiple to sharp compression',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 215.88, targetMedian: 535, targetHigh: 715, numAnalysts: 50 },  // stockanalysis.com, Oct 2 2026
  revGrowth: [
    [0.25, 0.03, 0.03, 0.03, 0.03],  // Bear: Q4 run-rate (~$139B annualized) holds, then hyperscaler delays/capex reversal flatten growth
    [0.55, 0.22, 0.15, 0.10, 0.08],  // Base (+1.5%/yr revPrem): FY27 ~$166B (haircut vs +64% consensus), then normalizes
    [0.65, 0.28, 0.18, 0.13, 0.10],  // Bull (+2%/yr revPrem): FY27 at/above consensus + FY28 acceleration beyond 10GW
  ],
  fcfMargin: [
    [0.40, 0.40, 0.40, 0.40, 0.40],  // Bear: AI mix + margin pressure; FCF stalls
    [0.47, 0.49, 0.51, 0.52, 0.53],  // Base: improves as debt retires; Q2 actual 46.3%
    [0.53, 0.55, 0.57, 0.58, 0.60],  // Bull: scale + debt paydown drives expansion
  ],
  exitMultiple: [16, 23, 26],
  desc: [
    'A hyperscaler (Google, Meta, Anthropic, or OpenAI) cancels or materially delays committed ASIC orders — the reverse of the signed agreements. FY27 growth stalls near the Q4 FY26 run-rate (~+25%), then goes flat. ' +
      'Multiple compresses toward ~16× EBITDA simultaneously — the 2022 Nvidia scenario at 4× the scale. FCF margin stalls at 40% as AI mix shift erodes gross margin without the volume to compensate. 5yr target {target} ({cagr} annualized).',
    'Committed contracts execute: AI semis compound off a ~$22B Q4 FY26 run-rate, ~10GW compute shipped. Total revenue ~$166B FY27 (vs $174B consensus). Operating margins hold ~66-68% despite AI mix (Q3 FY26: ~68%). ' +
      'FCF improves gradually to 53% as VMware debt retires. P/E compresses from ~31× FY26E through earnings growth — execution, not multiple expansion. 5yr target {target} ({cagr} annualized).',
    'Beyond the committed 10GW FY27, Broadcom wins additional sovereign AI or next hyperscaler ASIC volumes for FY28 (the "a lot more GW" management signaled). New 200-terabit networking switch gains outside AI clusters. ' +
      'Revenue sustains a 25%+ CAGR beyond the ~$106B FY26 base. EBITDA margins reach 70%+ as software/networking mix improves. FCF reaches 58-60%. 5yr target {target} ({cagr} annualized).',
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
    netDebt: 35444,        // Aug 2 2026: $59.4B debt − $24.0B cash
    ebitda: 84000,         // Q3 FY26 non-GAAP op income $20.1B + D&A, annualized — approximate
    fy: 'Q3 FY26',
    note: 'Net debt ~$35B at Q3 FY26 vs annualized EBITDA ~$84B → ~0.4×. FCF ~$13.7B/quarter. Earlier (Q2 FY26): net debt est. ~$41B, EBITDA annualized $60.9B, ~0.67× — collapsed from 5×+ at deal close. One of the fastest mega-cap debt paydowns on record.',
  },
});

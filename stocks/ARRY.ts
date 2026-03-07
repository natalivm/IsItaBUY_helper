import { defineStock } from './defineStock';

export const ARRY = defineStock({
  updatedOn: '07/03',
  ticker: 'ARRY',
  name: 'Array Technologies',
  sector: 'Solar / Industrial Equipment',
  themeColor: '#f59e0b',
  currentPrice: 6.80,
  fairPriceRange: '$4 - $19',
  shares0: 153,
  rev25: 920,
  fcfMargin25: 0.127,
  taxRate: 0.22,
  cash: 120,
  debt: 750,
  beta: 1.90,
  costDebt: 0.065,
  rsRating: 24,
  aiImpact: 'NEUTRAL',
  ratingOverride: 'HOLD',
  strategicNarrative: "Cyclical growth (Type B) solar tracker business — industrial equipment dependent on solar capex cycle, rates, and subsidies. High competition (Nextracker, FTC Solar, Chinese makers), near-zero switching costs → weak moat. Margin recovery story: gross margin 9.7% (2021) → 34% (2024), EBIT margin -24% (2024) → ~10% (2026E). EPS growth driven ~50% by margin recovery, ~50% by revenue expansion — not structural. Revenue CAGR ~8%, EPS CAGR ~6%, FCF CAGR ~3-4%. Revenue growth decelerating: 13% (2026) → 8% (2027) → 6% (2028) → 1% (2029). RS 24 = heavy institutional selling, weak momentum. Forward P/E ~9.6x, EV/EBITDA ~9x look cheap but typical for cyclically cheap industrials. FCF yield ~5% vs 10-12% needed for 15% CAGR — requires ~2x FCF growth which is optimistic given ~3-4% FCF CAGR. Probability-weighted expected CAGR ~8%. Probability of 15%+: ~35-40%. Better as a cycle trade than a long-term compounder.",

  analystConsensus: { rating: 'Hold', targetLow: 6, targetMedian: 10, targetHigh: 16, numAnalysts: 10 },
  revGrowth: [
    [0.04, 0.02, 0.01, 0.00, -0.02],
    [0.13, 0.08, 0.06, 0.04, 0.03],
    [0.18, 0.14, 0.10, 0.08, 0.06],
  ],
  fcfMargin: [
    [0.08, 0.07, 0.06, 0.06, 0.05],
    [0.12, 0.13, 0.14, 0.14, 0.15],
    [0.14, 0.15, 0.16, 0.17, 0.18],
  ],
  exitMultiple: [7, 9, 11],
  ebitdaProxy: [0.06, 0.10, 0.13],
  desc: [
    'Solar capex cycle stalls, margins compress back to mid-single digits, P/E collapses to 7-8x. EPS 2030 ~$0.50, target ~$4. Prob ~30%.',
    'Slow recovery normalization — EPS ~$1.10, P/E ~10x. Revenue grows ~8% CAGR with margin stabilization. Target ~$11. Prob ~45%.',
    'Full solar capex upcycle + IRA tailwinds + market share gains. EPS ~$1.60, P/E ~12x. Target ~$19. Prob ~25%.',
  ],

  termGrowth: [0.010, 0.020, 0.025],
  waccAdj: [0.015, 0.005, -0.005],

  bullMaOptVal: 6.80 * 153 * 0.07,

  driverOverrides: [
    {
      bbRate: 0.003,
    },
    {
      bbRate: 0.01,
    },
    {
      bbRate: 0.02,
    },
  ],
});

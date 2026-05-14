import { defineStock } from './defineStock';

export const FLEX = defineStock({
  ticker: 'FLEX',
  name: 'Flex Ltd.',
  sector: 'Electronics Manufacturing Services (EMS)',
  themeColor: '#0072CE',
  currentPrice: 143.6,
  updatedOn: '05/14',
  fairPriceRange: '$45 - $128',
  shares0: 356,
  rev25: 25800,
  fcfMargin25: 0.04,
  taxRate: 0.21,
  cash: 2250,
  debt: 3000,
  beta: 1.24,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 2.65,
  rsRating: 91,
  rsTrend: 'flat',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Flex is a top-5 global EMS player riding AI server and EV content tailwinds, but the underlying story is more complex than headline EPS suggests. " +
    "FY2025 EPS of $2.65 grew at ~24% CAGR from $1.43, yet revenue declined from $30.3B to $25.8B — ~80% of EPS growth came from margin expansion and aggressive buybacks, not organic business growth. " +
    "This is a fragile construction, though Q3 FY26 shows adjusted operating margin at 6.5% (record) — management cites power mix and industrial improvement with further expansion expected. " +
    "FY26 guidance raised to $27.2-27.5B revenue and $3.21-3.27 EPS. Embedded power (800V DC) has very few competitors — a potential narrow moat. " +
    "RS Rating 86 looks strong on the surface, but 3-month RS of 38 signals broken momentum — institutional accumulation has stalled. " +
    "The thesis depends on cyclical recovery (inventory restocking + AI server buildout) rather than durable competitive advantage. " +
    "Stress-test: in recession, P/E compression to 11-12x yields $29-32 — a potential -55% drawdown. " +
    "Verdict: HOLD. Quantitative base case shows >30% upside but quality of earnings is questionable, momentum is broken, and downside risk in a cyclical reversal is severe. " +
    "Wait for 3-month RS to recover above 60 and revenue reacceleration before upgrading.",

  epsCagr: [6, 13, 17],
  exitPE: [13, 18, 22],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Strong Buy', targetLow: 73, targetMedian: 77, targetHigh: 85, numAnalysts: 7 },

  revGrowth: [
    [0.02, 0.01, 0.01, 0.01, 0.01],
    [0.06, 0.04, 0.03, 0.02, 0.02],
    [0.08, 0.06, 0.05, 0.04, 0.03],
  ],
  fcfMargin: [
    [0.030, 0.030, 0.035, 0.035, 0.035],
    [0.040, 0.045, 0.045, 0.050, 0.050],
    [0.045, 0.050, 0.055, 0.060, 0.060],
  ],
  exitMultiple: [10, 13, 16],
  desc: [
    'Cyclical downturn persists, revenue stays flat. EPS growth slows to ~6% as margin expansion exhausts. P/E compresses to 13x as market reprices EMS at historical trough multiples.',
    'Moderate revenue recovery to ~$30B by FY2030. Buybacks continue at current pace. Earnings compound at ~13% on margin stability and share count reduction. P/E holds at 18x.',
    'AI server buildout + EV content ramp drive revenue recovery to $32B+. Margin expansion continues beyond 6.5% on embedded power leadership and high-mix shift. Premium 22x multiple reflects structural AI supply chain positioning.',
  ],

  termGrowth: [0.015, 0.02, 0.025],
  bbRate: [0.01, 0.025, 0.035],
  ebitdaProxy: [0.07, 0.09, 0.11],
});

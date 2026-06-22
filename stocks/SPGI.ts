import { defineStock } from './defineStock';

export const SPGI = defineStock({
  updatedOn: '06/22',
  ticker: 'SPGI',
  name: 'S&P Global',
  sector: 'Financial Data',
  themeColor: '#c5a44e',
  currentPrice: 407.39,
  fairPriceRange: '$250 - $800',
  shares0: 298.8,
  rev25: 15340,
  fcfMargin25: 0.357,
  taxRate: 0.22,
  cash: 1700,
  debt: 11400,
  beta: 0.9,
  costDebt: 0.05,
  rsRating: 21,
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Ratings and index businesses are regulatory-embedded monopolies — issuers and fund managers have no credible alternative',
    'CapIQ and Platts are workflow systems-of-record that AI models augment rather than replace, deepening rather than disrupting the moat',
    'AI-driven efficiency program targeting meaningful cost reduction creates a structural margin uplift not yet priced in',
    'Over half a century of consecutive dividend increases reflects the earnings durability of a near-monopoly data franchise',
    'Passive investing growth structurally benefits the index business as trillions in AUM track S&P-branded benchmarks',
  ],

  risksToBuy: [
    'Credit cycle slowdown sharply reduces debt issuance volume, which directly compresses the ratings segment revenue',
    'Antitrust and regulatory scrutiny on index monopoly power could constrain pricing or force structural changes',
    'IHS Markit integration leverage creates a balance sheet overhang in a higher-rate environment',
    'Weak institutional price momentum signals the market already fully values the quality, leaving little near-term catalyst',
    'Mobility spin and AI margin benefits are years from full impact — current valuation leaves no margin of safety',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 480, targetMedian: 623, targetHigh: 698, numAnalysts: 26 },
  revGrowth: [
    [0.04, 0.04, 0.04, 0.04, 0.04],
    [0.075, 0.08, 0.08, 0.08, 0.07],
    [0.10, 0.10, 0.09, 0.09, 0.08],
  ],
  fcfMargin: [
    [0.32, 0.31, 0.31, 0.30, 0.30],
    [0.35, 0.35, 0.36, 0.36, 0.37],
    [0.37, 0.38, 0.39, 0.40, 0.41],
  ],
  exitMultiple: [15, 19, 21],
  ebitdaProxy: [0.48, 0.52, 0.55],
  desc: [
    'Credit cycle downturn + issuance slump: EPS CAGR ~6-7%, EPS 2030 ~$26-28, exit P/E 18x. Target ~$470-500. CAGR ~2-4%.',
    'Disciplined structural growth per guidance: revenue +6-8%, EPS CAGR ~11%, EPS 2030 ~$33-35, exit P/E 22x. Target ~$730-770. CAGR ~11-12%.',
    'AI margin uplift + index tailwinds + Mobility spin catalyst: EPS CAGR ~14-15%, EPS 2030 ~$37-40, exit P/E 25x. Target ~$950-1000. CAGR ~16-18%.',
  ],

  bullMaOptVal: 417 * 298.8 * 0.07,
  debtSafety: {
    netDebt: 9700,
    ebitda: 7500,
    fy: 'FY25',
    note: 'Modest leverage on a near-monopoly ratings + data business with 35%+ FCF margins. Debt largely from the IHS Markit merger. 1.3× is well within safe bounds and deleveraging on autopilot.',
  },
});

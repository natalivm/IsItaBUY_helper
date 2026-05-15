import { defineStock } from './defineStock';

export const ARRY = defineStock({
  updatedOn: '05/15',
  ticker: 'ARRY',
  name: 'Array Technologies',
  sector: 'Solar / Industrial Equipment',
  themeColor: '#f59e0b',
  currentPrice: 8.97,
  fairPriceRange: '$4 - $18',
  shares0: 153,
  rev25: 1280,
  fcfMargin25: 0.063,
  taxRate: 0.22,
  cash: 120,
  debt: 750,
  beta: 1.90,
  costDebt: 0.065,
  rsRating: 58,
  aiImpact: 'NEUTRAL',
  strategicNarrative: "Cyclical growth (Type B) solar tracker — post-earnings update. 2025 actual: revenue ~$1.28B (+40% YoY), tracker volume +35%, record order book $2.2B (book-to-bill 2x), 95% domestic backlog, >50% Tier 1 customers. APA already EBITDA-accretive. 2026 guide: revenue $1.4–1.5B, adj. EBITDA $200–230M, adj. EPS $0.65–0.75. What improved: backlog quality, Tier 1 mix, share gains, APA/SG&A leverage, software/services recurring layer. What stayed weak: gross margin ceiling (mgmt admits pricing competition), FCF conversion weak ($80M on $188M EBITDA, 2026 'similar to 2025'), international selective due to price war risk. Moat weak-to-medium: DuraTrack tech, terrain-following, wind-stow, integrated foundation+tracker, but mgmt itself admits pricing pressure. Growth driver split: revenue expansion > margin expansion (SG&A leverage from ~15% to ~10%) > financial engineering (minimal buybacks). Not a compounder — execution + cycle story with better visibility post-call. Prob-weighted expected CAGR ~9.4% at current price. Fair entry for 15% CAGR: ~$5.3–5.7. Probability of 15%+: ~40–45%. RS 24 = market not yet buying recovery narrative — watchlist / tactical position, not high-conviction leader. ",

  analystConsensus: { rating: 'Hold', targetLow: 6, targetMedian: 10, targetHigh: 16, numAnalysts: 10 },
  revGrowth: [
    [0.05, 0.03, 0.01, 0.00, -0.02],
    [0.10, 0.08, 0.06, 0.04, 0.03],
    [0.15, 0.12, 0.10, 0.08, 0.06],
  ],
  fcfMargin: [
    [0.05, 0.05, 0.04, 0.04, 0.04],
    [0.06, 0.07, 0.08, 0.09, 0.10],
    [0.08, 0.10, 0.12, 0.13, 0.14],
  ],
  exitMultiple: [7, 9.5, 12],
  ebitdaProxy: [0.08, 0.13, 0.16],
  desc: [
    'Solar cycle weakens, pricing pressure eats SG&A leverage, FCF stays weak, international fails. EPS 2030 ~$0.55, exit P/E 7x. Target ~$3.85. Prob ~25%.',
    'Backlog converts normally, gross margin flat, FCF conversion mediocre, growth normalizes. EPS ~$1.10, exit P/E 9.5x. Target ~$10.45. Prob ~50%.',
    'Share gains hold, APA synergies deliver, software/services grow, EBITDA margin mid-teens. EPS ~$1.50, exit P/E 12x. Target ~$18. Prob ~25%.',
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

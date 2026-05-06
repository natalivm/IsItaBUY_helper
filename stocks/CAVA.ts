import { defineStock } from './defineStock';

export const CAVA = defineStock({
  updatedOn: '05/06',
  ticker: 'CAVA',
  name: 'CAVA Group, Inc.',
  sector: 'Restaurants · Fast-Casual · Mediterranean',
  themeColor: '#c8553d',
  currentPrice: 89.51,
  fairPriceRange: '$25 - $128',
  shares0: 118,
  rev25: 1080,
  fcfMargin25: 0.024,
  taxRate: 0.27,
  cash: 393,
  debt: 0,
  beta: 1.50,
  costDebt: 0,
  modelType: 'EPS_PE',
  baseEps: 0.54,
  rsRating: 87,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  ratingOverride: 'OVERVALUED',
  strategicNarrative:
    "Downgraded to OVERVALUED after Q4 FY2025 showed weakening same-store economics: SSS decelerated to just +0.5% (full year +4%), " +
    "RLP margin compressed to 21.4% with food costs +50bps (tariffs) and other opex +60bps (delivery mix, KDS costs). " +
    "FCF dropped to $26M from $53M prior year on heavy capex. Tax rate jumping from 10% to 25-30% in FY2026 will hit EPS hard. " +
    "Management guiding conservative 3-5% SSS and cutting NRO productivity assumption to 90% (from 100%+). " +
    "Salmon launch adds ~100bps RLP margin headwind. At ~125x fwd P/E, the stock still prices in near-flawless execution " +
    "while same-store momentum is fading and margins are under pressure from reinvestment. OVERVALUED until valuation resets meaningfully.",

  epsCagr: [13, 27, 37],
  exitPE: [25, 35, 50],
  prob: [30, 40, 30],


  analystConsensus: { rating: 'Buy', targetLow: 51, targetMedian: 77, targetHigh: 120, numAnalysts: 15 },
  revGrowth: [
    [0.18, 0.12, 0.10, 0.08, 0.06],
    [0.22, 0.18, 0.15, 0.12, 0.10],
    [0.25, 0.22, 0.20, 0.18, 0.16],
  ],
  fcfMargin: [
    [0.025, 0.025, 0.03, 0.03, 0.03],
    [0.027, 0.035, 0.045, 0.055, 0.07],
    [0.03, 0.045, 0.06, 0.08, 0.10],
  ],
  exitMultiple: [15, 25, 35],
  desc: [
    'Q4 SSS deceleration (+0.5%) proves to be the start of a negative trend as macro pressures intensify and the younger 25-35 demo pulls back. ' +
      'Salmon launch fails to drive incremental traffic and adds margin drag without the offsetting volume. NRO productivity drops below 90% as new markets underperform. ' +
      'Tax rate normalization to ~27% crushes EPS growth — diluted EPS barely grows despite top-line expansion. ' +
      'With earnings growing at roughly 13% and the multiple compressing to 25x, the stock reprices sharply lower. ' +
      'The AGM and field leadership investments add G&A without near-term payback. A good business at the wrong price.',
    'Unit expansion continues at 74-76/yr, driving ~22% revenue growth. SSS stabilizes in the 3-5% guided range on menu innovation (salmon, pita chips) and loyalty tiers. ' +
      'RLP margins recover toward 23.7-24.2% as guided, though salmon adds ~100bps headwind offset by penny profit neutrality. ' +
      'NRO productivity holds near 90%. AUVs trend above $2.9M. Tax rate normalizes to 27% but EPS still grows ~27% on operating leverage. ' +
      'At ~125x fwd P/E, most of that growth is already priced in. Business executes well but valuation acts as a ceiling.',
    'Salmon launch drives meaningful traffic inflection, SSS accelerates above 5%. Catering channel launches successfully in 2027, adding a new revenue stream. ' +
      'Unit growth accelerates toward 100+/yr as the 1,000-restaurant target by 2032 comes into view. Margins reach 10%+ EBIT as the model scales. ' +
      'Brand awareness rises from 62% toward 80%+ with national marketing unlocked by restaurant density. ' +
      'The market re-rates CAVA as a proven restaurant compounder, pushing the multiple to 50x. ' +
      'This requires near-perfect execution AND macro normalization — low probability given current trajectory.',
  ],
  thesis: [
    'Valuation + weakening fundamentals double hit. Q4 SSS decelerated to +0.5% while RLP margin compressed to 21.4%. ' +
      'Tax rate normalization from 10% to 25-30% will hammer EPS growth even if operations execute. ' +
      'FCF already halved to $26M on heavy capex — the "growth" story consumes cash, not generates it. ' +
      'Management cutting NRO productivity assumption to 90% signals lower confidence. Salmon adds margin headwind. ' +
      'If P/E returns to 25x with $0.70 FY26 EPS: $17.50 (approx. -75%). Probability of -25–40% outcome = ~30%.',
    'Business fundamentals still intact: 439 restaurants, $393M cash, zero debt, NRO AUVs >$3M, 2-year SSS stack accelerating to 21.7%. ' +
      'But 12–18mo math doesn\'t work at current valuation: EPS growth gets crushed by tax normalization, salmon margin drag, and AGM investment. ' +
      'Guided 3-5% SSS is modest — not enough to justify ~125x fwd P/E. Q1 tracking above guidance but macro uncertainty is real. ' +
      'Watch: SSS traffic (not just check), RLP margin trajectory, NRO productivity vs 90% assumption, catering test results. ' +
      'Probability of 0–10% outcome = ~40%. Weak asymmetry.',
    'Salmon + catering + loyalty tiers drive SSS above 5%, unit growth sustains at 75+/yr, margins expand on leverage. ' +
      'Brand awareness at 62% has massive runway to 80%+. New Midwest markets (Cincinnati, St. Louis, Columbus, Minneapolis) succeed. ' +
      'Doug Thompson elevates operations, AGM program builds durable talent pipeline, throughput improves without compromising hospitality. ' +
      'But requires: macro normalization + salmon success + catering launch + no multiple compression — all simultaneously. ' +
      'Probability of +25–35% 12–18mo outcome = ~30%. At current valuation, even the bull case barely justifies the price.',
  ],

  termGrowth: [0.015, 0.025, 0.03],
  waccAdj: [0.015, 0, -0.01],
  bbRate: [0, 0.002, 0.005],
  ebitdaProxy: [0.06, 0.10, 0.14],
  bullMaOptVal: false,

  driverOverrides: [
    {
      bbRate: 0,
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
      bbRate: 0.002,
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
      bbRate: 0.005,
    },
  ],
});

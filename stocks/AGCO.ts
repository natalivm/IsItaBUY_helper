import { defineStock } from './defineStock';

export const AGCO = defineStock({
  ticker: 'AGCO',
  name: 'AGCO Corp',
  sector: 'Agriculture',
  themeColor: '#00d4aa',
  updatedOn: '06/15',
  lastReportTag: 'Q1 2026',
  currentPrice: 112.54,
  fairPriceRange: '$54 - $225',
  shares0: 72.4,
  rev25: 10080,
  fcfMargin25: 0.073,
  taxRate: 0.23,
  cash: 884,
  debt: 2800,
  beta: 1.16,
  costDebt: 0.06,
  rsRating: 82,
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',  // Narrative + analyst consensus (Hold) say flat/timing-bet; DCF base ~$142 vs $117 = +21% cumulative but only ~4% CAGR over 5y → documented "model BUY but sub-15% CAGR" mismatch. Q1 2026 reaffirms the HOLD thesis (confirming quarter, not a cycle inflection).
  // Q1 2026 CALL UPDATE (May 5, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Net sales ~$2.3B (+14% reported, +5% constant-currency). Op income
  // $80.7M (+60% YoY), reported margin 3.4% (+100bps); ADJ op margin 4.6%
  // (+50bps). Adj EPS $0.94 — more than doubled YoY (helped by a low 24% Q1
  // tax rate; FY ETR still guided 31-33%). Beat Street by ~$0.50. Regional
  // split is the story: EME net sales +9% cc, op margin >16% (income
  // +$104M YoY) — the profit engine; North America +9% cc sales but op
  // income -$27M YoY, BELOW breakeven (tariffs + factory underabsorption);
  // Latin America -30% cc, op income -$47M, below breakeven; APA +20%+ cc.
  // Parts ~$447M (-6% ex-FX). Dealer inventory: Europe ~4mo (target),
  // LatAm 4mo (from 5, target 3), NA ~7mo (target 6) — destocking on track.
  // CAPITAL: sold 49% of AGCO Finance US/Canada JVs to Rabobank for ~$190M;
  // +$350M buyback in Q2 (on $1B auth, $300M prior); dividend +3.4% to
  // $0.30/qtr ($1.20 annualized). FY26 GUIDE revised: net sales $10.5-10.7B,
  // adj EPS ~$6 (prior $5.50-6.00 mid $5.75 → modest raise), adj op margin
  // held 7.5-8%, FCF conv 75-100%. Bridge: +$0.50 Q1 beat, +$0.15 buyback,
  // +$0.20 cost savings; -$0.25 tariffs, -$0.20 softer LatAm/E.Europe,
  // -$0.20 freight → ~$6. Tariff cost now ~$135M (+$90M YoY, +$25M vs prior;
  // no IEEPA refund assumed). Restructuring savings raised to $60-70M
  // (run-rate >$200M). Industry ~86% of mid-cycle; NA large ag ~-15%, W.Eu
  // up modestly, Brazil/LatAm lowered (flat → modestly down). Mgmt: still
  // "around the trough", fleet age at peak, expects 2027+ migration to
  // mid-cycle. Net: structurally resilient (margin guide held through a
  // bigger tariff hit) but the cycle turn is still a 2027+ timing bet —
  // thesis confirmed, not inflected.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Global ag equipment cycle is near trough with fleet age at a multi-year peak, setting up a recovery tailwind.',
    'European operations are a genuine profit engine running well above mid-cycle margins in a downturn.',
    'Precision ag platform (PTx Trimble JV) adds a software and recurring-revenue layer to a historically lumpy business.',
    'Restructuring program delivering hundreds of millions in annualized savings, raising the structural margin floor.',
    'Increased capital returns — buybacks and dividend growth — provide downside support at the trough.',
  ],

  risksToBuy: [
    'Cycle recovery is a timing bet: North America and Latin America remain below breakeven, and 2027+ is not guaranteed.',
    'Tariff exposure is real and growing, with no IEEPA refund assumed and LatAm demand still deteriorating.',
    'Dealer inventories remain elevated in key regions, capping near-term order momentum.',
    'Analyst consensus and DCF base case both point to flat multi-year returns from current price.',
    'Single-digit CAGR in the base scenario makes this a cyclical trade, not a compounder worth holding through cycles.',
  ],

  analystConsensus: { rating: 'Hold', targetLow: 93, targetMedian: 123, targetHigh: 138, numAnalysts: 12 },
  revGrowth: [
    [-0.02, -0.01, 0.01, 0.02, 0.02],
    [-0.01, 0.00, 0.01, 0.02, 0.03],
    [0.02, 0.04, 0.06, 0.07, 0.06],
  ],
  fcfMargin: [
    [0.055, 0.06, 0.065, 0.065, 0.07],
    [0.063, 0.07, 0.075, 0.08, 0.085],
    [0.068, 0.08, 0.09, 0.095, 0.10],
  ],
  exitMultiple: [7, 8, 8],
  desc: [
    'Cycle stalls, NA + LatAm stay loss-making on tariffs and weak Brazil demand — EPS stuck $6–7, P/E compresses to 9x. Bear target $54–63.',
    'Slow cycle normalization off a ~$6 2026 trough — EPS ~$10, P/E ~14x. Base case is flat (~4% CAGR) over 5 years at current price.',
    'Full ag upcycle + PTx scaling to $2B — EPS ~$15, share gains + buybacks re-rate to ~$225.',
  ],

  termGrowth: [0.010, 0.025, 0.020],
  ebitdaProxy: [0.075, 0.10, 0.10],
  bullMaOptVal: 123.88 * 72.4 * 0.07,

  driverOverrides: [
    {
      bbRate: 0.005,
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
      bbRate: 0.015,
    },
    {
      revPrem: [0.01, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
      bbRate: 0.03,
    },
  ],
});

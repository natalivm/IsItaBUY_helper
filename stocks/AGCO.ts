import { defineStock } from './defineStock';

export const AGCO = defineStock({
  ticker: 'AGCO',
  name: 'AGCO Corp',
  sector: 'Agriculture',
  themeColor: '#00d4aa',
  updatedOn: '05/14',
  lastReportTag: 'Q1 2026',
  currentPrice: 117.34,
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
  strategicNarrative: "Higher-quality cyclical, not a compounder. Q1 2026 confirmed the thesis: adj EPS $0.94 (>2x YoY, partly a low 24% Q1 tax rate) beat by ~$0.50, EME op margin >16% carrying the company while North America and Latin America both ran below breakeven on tariffs and weak Brazil demand. FY26 adj EPS guide nudged to ~$6 (from ~$5.75 mid) — but the raise is buyback + Q1 timing offsetting a bigger ~$135M tariff hit, softer LatAm and higher freight, not a cycle inflection. Structural floor genuinely higher than 2016 (~7.7% vs 3–4% op margin; adj op-margin guide held 7.5–8% through the larger tariff drag), with restructuring run-rate now >$200M and increased capital returns ($190M JV-stake sale, +$350M buyback, dividend +3.4%). DCF base ~$142 (~4% CAGR over 5y) and analyst consensus Hold both say flat. RS 82 reflects cycle-turn momentum. Core bet: 2025/26 is the trough and 2027–2029 normalises. 15% CAGR probability ~35% — a timing bet, not a structural compounder.",


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

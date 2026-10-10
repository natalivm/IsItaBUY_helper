import { defineStock } from './defineStock';

export const AGCO = defineStock({
  ticker: 'AGCO',
  name: 'AGCO Corp',
  sector: 'Agriculture',
  themeColor: '#00d4aa',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 103.28,
  fairPriceRange: '$98 - $151',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 71.2,       // Q2 2026 diluted (after a $345M buyback in Q2)
  rev25: 10080,        // FY2025; FY26 guide $10.1-10.2B (cut at Q2), FY27E consensus $10.72B
  fcfMargin25: 0.073,
  taxRate: 0.23,
  cash: 573,           // Jun 30 2026 (seasonal working-capital low point; $862M at YE25)
  debt: 2727,          // Jun 30 2026: $547M current + $2,180M long-term
  beta: 1.16,
  costDebt: 0.06,
  rsRating: 44,         // IBD RS per user, 10/10/2026 (was 40)
  rsTrend: 'flat',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',  // Q2 2026: model screens BUY/STRONG BUY on a recovery-weighted DCF, but the narrative is a timing bet that just got pushed out — FY26 EPS guide CUT to $5.50-5.75 (from ~$6), NA and LatAm still loss-making, H1 FCF negative. Hold until the cycle turn shows up in orders. (Q1 2026 had reaffirmed the HOLD thesis as a confirming quarter, not an inflection.)
  // Q2 2026 UPDATE (Jul 30, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Guide cut. Net sales $2.61B (-1.0%, -3.7% cc). By region: EME $1.73B
  // (-4.7% cc), op margin 15.0% (still the profit engine); North America
  // $472M (+19.8% cc) but op margin -5.2%; Latin America $271M (-25% cc),
  // op margin -8.0%; APA $135M (-6.4% cc), 7.7%. Adj. op margin 6.6% (vs
  // 8.3%); adj. EPS $1.43 (vs $1.35), GAAP $1.08. H1: sales +0.5% cc, adj.
  // EPS $2.37, adj. op margin 5.6%, FCF ≈ -$347M (seasonal, but weak).
  // Buyback $345M in Q2; dividend $0.30/qtr. Cash $573M vs debt $2.73B.
  // H1 industry retail: NA tractors -9%/combines -7%; Brazil tractors -11%/
  // combines -39%; W. Europe tractors +3%/combines -3%.
  // FY26 OUTLOOK CUT: net sales $10.1-10.2B (from $10.5-10.7B), adj. op
  // margin ~7.5% (from 7.5-8%), adj. EPS $5.50-5.75 (from ~$6) — "weaker-
  // than-expected industry conditions, currency, more cautious outlook". NA
  // pressure continues through 2026, Brazil constrained, W. Europe flat.
  // Street: Buy (16), PT $98-151 (median $123); FY26E EPS $5.61, FY27E $7.45.
  // Stock ~$103 (round-tripped ~$121 Sep high). Net: trough is lasting
  // longer; recovery still a 2027+ bet — HOLD reinforced.
  // ─────────────────────────────────────────────────────────────────────────

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
    'Full-year outlook was cut mid-year as Brazil and North America weakened further — the trough keeps extending.',
    'Dealer inventories remain elevated in key regions, capping near-term order momentum.',
    'Free cash flow ran negative in the first half, limiting room for buybacks if the downturn persists.',
    'Single-digit CAGR in the base scenario makes this a cyclical trade, not a compounder worth holding through cycles.',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 98, targetMedian: 123, targetHigh: 151, numAnalysts: 16 },  // stockanalysis.com, Oct 9 2026
  revGrowth: [
    [-0.01, -0.02, 0.01, 0.02, 0.02],   // Bear: FY26 at low end of cut guide; 2027 recovery fails
    [-0.01, 0.04, 0.02, 0.02, 0.03],    // Base (+1%/yr revPrem): FY26 ≈ $10.15B guide mid, FY27 ≈ consensus $10.7B
    [0.00, 0.05, 0.06, 0.07, 0.06],     // Bull: 2027+ upcycle
  ],
  fcfMargin: [
    [0.055, 0.06, 0.065, 0.065, 0.07],
    [0.063, 0.07, 0.075, 0.08, 0.085],
    [0.068, 0.08, 0.09, 0.095, 0.10],
  ],
  exitMultiple: [7, 8, 8],
  desc: [
    'Cycle stalls, NA + LatAm stay loss-making on tariffs and weak Brazil demand — EPS stuck around the ~$5.60 2026 level, multiple compresses. Bear 5yr target {target} ({cagr} annualized).',
    'Slow cycle normalization off a ~$5.60 2026 trough (guide cut at Q2) — EPS ~$10 by the end of the decade as NA and LatAm return to profit. Base 5yr target {target} ({cagr} annualized) — the model leans on a recovery the company keeps pushing out.',
    'Full ag upcycle + PTx scaling to $2B — EPS ~$15, share gains + buybacks. Bull 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.010, 0.025, 0.020],
  ebitdaProxy: [0.075, 0.10, 0.10],

  debtSafety: {
    netDebt: 1940,         // approx. FY25 year-end (cash $862M vs ~$2.8B debt); June 2026 seasonal peak ~$2.15B
    ebitda: 1070,          // approx. FY26E: adj. op income (~7.5% × $10.15B ≈ $0.76B) + D&A (~$0.3B)
    fy: 'FY25/FY26E',
    note: 'GREEN but borderline (~1.8× at year-end, ~2.0× at the June working-capital peak). Step-3 checks would likely fail (CapEx/OCF ~30%), so any further EBITDA erosion tips it toward RED. Partly offset by the Rabobank sale of 49% of the AGCO Finance US/Canada JVs (~$190M). Figures approximate.',
  },
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

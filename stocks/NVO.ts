import { defineStock } from './defineStock';

// All figures in USD on an ADR basis (1 NVO ADR = 1 ordinary B share).
// Novo Nordisk reports in DKK; DKK financials converted at ~6.40 DKK/USD.
export const NVO = defineStock({
  ticker: 'NVO',
  name: 'Novo Nordisk A/S',
  sector: 'Pharmaceuticals / GLP-1 & Obesity',
  themeColor: '#001f5b',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 38.64,    // NVO ADR (~60% off the 2024 peak)
  fairPriceRange: '$40 - $62',  // stockanalysis.com analyst target range, Oct 7 2026
  shares0: 4470,          // ~4.47B shares (mkt cap $214.9B / $48.07)
  rev25: 48300,           // FY2025 revenue DKK 309,064M ≈ $48.3B (+6.4% YoY — sharp decel from +25%)
  fcfMargin25: 0.19,      // FY2025 FCF margin ~19% (DKK 58,962M FCF) — depressed by heavy capacity capex
  taxRate: 0.20,          // FY2025 effective tax ~19.6%
  cash: 6900,            // Jun 30 2026: ~DKK 45bn cash & marketable securities ≈ $6.9B @ 6.51
  debt: 21500,          // Jun 30 2026: ~DKK 140bn borrowings ≈ $21.5B (Catalent acquisition + capacity build)
  beta: 0.7,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 3.32,        // FY2026E USD EPS per ADR — stockanalysis consensus DKK 21.56 @ ~6.5 DKK/USD (FY27E DKK 21.94, only +2% as US MFN list-price cuts hit Jan 2027). H1 2026 adj. EPS DKK 12.81. 2026 adj sales/OP guided 0% to −6% CER (raised from −4% to −12% at Q2). FY2025 was ~$3.60 (DKK 23.03).
  rsRating: 54,         // IBD RS per user, 10/10/2026 (was 50 in Jun 2026)
  rsTrend: 'flat',      // Basing after a ~60% drawdown; recently above the 50-day but multi-year trend was down
  aiImpact: 'NEUTRAL',
  ratingOverride: 'HOLD',  // Model screens BUY (~11.5% CAGR) only because exit P/E 15x re-rates today's ~11.6x; narrative verdict is HOLD — EPS flat into 2027 (US Wegovy/Ozempic list price cut ~50%/~35% from Jan 2027), ziltivekimab ZEUS failed, Street consensus Hold with mean PT ~$46. Revisit when earnings growth resumes.

  // Q2 2026 UPDATE (Aug 5, 2026) — figures DKK
  // ─────────────────────────────────────────────────────────────────────────
  // Underlying stabilization, headline noise. Q2 reported sales DKK 78.5bn
  // (+2% DKK, +3% CER); adjusted sales +7% CER; adjusted op profit DKK 33.4bn
  // (+11% CER). H1 adjusted sales +2% CER, adj. op profit +2% CER (H1
  // reported figures inflated by a DKK 26.8bn US 340B provision reversal in
  // Q1). Q2 reported op profit -19% on DKK 6.3bn pipeline impairments (4.0bn
  // monlunabant). Q2 EPS DKK 4.75 (adj. 6.18); H1 adj. EPS 12.81. Wegovy
  // injection Q2 19.5bn (+1%); Wegovy PILL Q2 3.2bn (H1 5.5bn) — >5M scripts,
  // ~265K/week, #1 in branded US obesity new-patient starts; Wegovy HD (7.2mg)
  // rolling out. Ozempic Q2 31.4bn (+5% CER) — back to growth. H1 FCF 55.3bn.
  // Borrowings ~140bn vs cash ~45bn (net ~95bn ≈ $14.6B). Buyback: 15bn 2026
  // programme (7.5bn spent by Aug 3). Interim dividend DKK 3.75.
  // OUTLOOK RAISED: 2026 adj. sales & adj. op profit 0% to -6% CER (from -4%
  // to -12%), FCF 45-55bn (from 36-46bn), capex ~55bn. NEGATIVES: from Jan 1
  // 2027 US list price of Wegovy & Ozempic cut to $675 (~50% / ~35%) under
  // MFN — hits 2027 cash flow; ZEUS (ziltivekimab CVOT) MISSED its primary
  // endpoint (more impairment likely Q3); CagriSema non-inferior to
  // tirzepatide on weight but not HbA1c in REIMAGINE 4, high-dose REDEFINE
  // readout H1 2028. Street: Hold, PT $40-62 (mean $46); FY27E EPS ~flat.
  // Net: 2026 trough is shallower than feared, but 2027 is a reset year too.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Wegovy pill is the best GLP-1 launch ever — millions of prescriptions in months and still accelerating despite competition, as the only oral peptide for obesity',
    'Oral pill shows superior weight loss and tolerability vs the rival oral, plus cardioprotection, driving a Wegovy halo across the franchise',
    'Pipeline depth — CagriSema US decision, oral amycretin/zenagamtide and higher-dose Wegovy, plus rare-disease wins in sickle cell and hemophilia',
    'Trades at a multi-year-low valuation after a steep de-rating — much of the bad news already looks priced in',
    'Best-in-class margins and prodigious cash generation funding a large, growing dividend off a strong balance sheet',
  ],

  risksToBuy: [
    'Earnings guided flat-to-down in 2026, then steep US list-price cuts for Wegovy and Ozempic under the MFN deal from 2027',
    'Eli Lilly has seized obesity momentum with higher-efficacy tirzepatide and a strong oral pipeline; Ozempic is losing diabetes share',
    'Semaglutide patent expiry (international markets now, US around 2032) is a structural revenue cliff on the horizon',
    'Compounded/generic semaglutide and US reimbursement pressure (incl. reduced Medicaid obesity coverage) threaten volumes and pricing',
    'Pipeline setbacks — the ziltivekimab heart-outcomes trial failed and CagriSema trails tirzepatide on glucose control',
  ],

  analystConsensus: { rating: 'Hold', targetLow: 39.78, targetMedian: 44.63, targetHigh: 61.84, numAnalysts: 14 },  // stockanalysis.com, Oct 7 2026

  epsCagr: [0, 6, 12],   // Q2 2026: all trimmed 2pts — FY27E EPS ~flat (+2%) as the Jan 2027 MFN list-price cut lands, so the recovery starts a year later
  exitPE: [11, 15, 20],
  prob: [30, 45, 25],

  revGrowth: [
    [-0.06, -0.06, -0.02, 0.01, 0.02],   // Bear: 2026 at bottom of the 0 to -6% guide; 2027 MFN list-price cut + patent expiry + Lilly erode the franchise
    [-0.03, 0.01, 0.05, 0.06, 0.06],     // Base: 2026 ≈ consensus (DKK ~301bn), 2027 flat on MFN reset, then oral/pipeline recovery
    [-0.01, 0.04, 0.10, 0.11, 0.09],     // Bull: oral obesity volume outruns the 2027 price reset, share defended
  ],
  fcfMargin: [
    [0.18, 0.19, 0.20, 0.22, 0.24],       // Bear: pricing pressure + elevated capex
    [0.20, 0.24, 0.28, 0.30, 0.32],       // Base: capex normalizes, margins recover
    [0.22, 0.28, 0.32, 0.35, 0.37],       // Bull: operating leverage on reaccelerating revenue
  ],
  exitMultiple: [11, 15, 19],
  termGrowth: [0.015, 0.02, 0.025],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.40, 0.45, 0.50],
  bullMaOptVal: false,

  desc: [
    'EPS keeps sliding as US "Most Favoured Nations" pricing, international semaglutide patent expiry, and Lilly competition erode the franchise; oral Wegovy underwhelms. ' +
      'EPS is flat from the FY2026E $3.32 base and the market values NVO as an ex-growth pharma at ~11x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30%.',
    '2026-27 is the earnings trough (2026 guide raised to 0% to -6%, then the Jan 2027 US list-price cut). The record Wegovy-pill launch and pipeline (CagriSema, amycretin) then modestly reaccelerate growth as capacity capex normalizes and margins recover, while MFN pricing and Ozempic share loss cap the pace. ' +
      'EPS compounds ~6% from the $3.32 base while the multiple normalizes toward ~15x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A cheap, dominant franchise — but the recovery is gradual and the patent cliff caps the multiple.',
    'The blockbuster oral Wegovy pill (millions of scripts, accelerating, ~60% NBRx share) plus CagriSema, amycretin/zenagamtide and Wegovy HD reignite double-digit growth, NVO defends share against Lilly, and the obesity TAM expands faster than expected. ' +
      'EPS compounds ~12% from the $3.32 base and the market re-rates toward ~20x off a washed-out base. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: the GLP-1 franchise faces a triple squeeze — US MFN drug pricing, semaglutide patent expiry (international now, US ~2032), and Lilly\'s higher-efficacy tirzepatide taking share. ' +
      '2026 earnings are flat-to-down and the 2027 MFN list-price cut is locked in. If oral Wegovy and the pipeline disappoint, NVO becomes a melting ice cube. ' +
      'At {spot} it screens cheap, but a value trap with eroding earnings has no floor on the multiple.',
    'After a ~60% drawdown from its 2024 highs, NVO trades at a multi-year-low multiple with 2026-27 as the earnings trough. The franchise is still dominant, FCF is prodigious, the balance sheet is strong, and the record oral-Wegovy launch plus a deep pipeline offer a credible path back to growth. ' +
      'But earnings are flat into 2027 as the MFN list-price cut lands, ziltivekimab failed, the US patent cliff (~2032) caps the upside, Lilly has the momentum in injectables, and relative strength is weak. The risk/reward is balanced — a cheap, high-quality franchise where the recovery is real but gradual. ' +
      'Verdict: HOLD — own the recovery optionality, but earnings have to stop falling first.',
    'The bull case: obesity is one of the largest TAMs in pharma and still under-penetrated. If oral Wegovy, amycretin, and CagriSema reignite growth and NVO defends share, the depressed multiple re-rates sharply off a low base — meaningful upside from {spot}. ' +
      'The risks are Lilly\'s lead and the patent cliff. Probability 25% — real optionality at a washed-out valuation, with execution and pricing as the swing factors.',
  ],

  burry: {
    sbc: 224,
    gaapNi: 16005,
    buyback: 217,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 5,
    overstatementSource: 'estimated',
    note: 'Pristine. FY25 stock-based comp only ~$224M (DKK 1,435M) vs ~$16B GAAP NI = ~1.4% naive — European comp culture keeps SBC minimal. The stock is DOWN ~60% from 2024 highs, so the MTM amplifier works the other way (grants are not deep-in-the-money). Owner earnings ≈ GAAP earnings. NVO buys back stock and pays a large dividend (~50% payout), though FY25 repurchases were trimmed to fund capex/Catalent. Figures converted from DKK; pct estimated.',
  },

  debtSafety: {
    netDebt: 14600,        // Jun 30 2026: ~DKK 140bn borrowings − ~45bn cash & securities ≈ DKK 95bn @ 6.51
    ebitda: 24000,
    fy: 'Q2 2026',
    note: 'GREEN. Net debt ~$14.6B at Jun 30 2026 (DKK ~95bn — up from ~$5B at FY25 as dividends, buybacks and ~DKK 55bn capex outrun FCF) vs EBITDA ~$24B => leverage ~0.6x. IBD shows Debt/Equity ~0%. Backed by prodigious cash generation; the only near-term FCF drag is elevated capacity capex, which is now being reduced. Figures converted from DKK.',
  },
});

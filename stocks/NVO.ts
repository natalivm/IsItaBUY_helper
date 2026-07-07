import { defineStock } from './defineStock';

// All figures in USD on an ADR basis (1 NVO ADR = 1 ordinary B share).
// Novo Nordisk reports in DKK; DKK financials converted at ~6.40 DKK/USD.
export const NVO = defineStock({
  ticker: 'NVO',
  name: 'Novo Nordisk A/S',
  sector: 'Pharmaceuticals / GLP-1 & Obesity',
  themeColor: '#001f5b',
  updatedOn: '07/07',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 49.64,    // NVO ADR, Jun 26 2026 close (down ~33% from 52-wk high, ~60% off 2024 peak)
  fairPriceRange: '$45 - $120',
  shares0: 4470,          // ~4.47B shares (mkt cap $214.9B / $48.07)
  rev25: 48300,           // FY2025 revenue DKK 309,064M ≈ $48.3B (+6.4% YoY — sharp decel from +25%)
  fcfMargin25: 0.19,      // FY2025 FCF margin ~19% (DKK 58,962M FCF) — depressed by heavy capacity capex
  taxRate: 0.20,          // FY2025 effective tax ~19.6%
  cash: 15000,           // ~$15B cash & securities
  debt: 20000,          // ~$20B gross debt (rose for the $11.7B Catalent manufacturing acquisition); net debt modest
  beta: 0.7,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 3.30,        // FY2026E USD EPS per ADR — FY2025 was ~$3.60 (DKK 23.03); IBD consensus −8.82% for 2026 => ~$3.30. Earnings DECLINE year (2026 adj sales/OP guided −4% to −12% CER, raised 1pt at Q1).
  rsRating: 50,         // IBD Relative Strength Rating (Jun 2026) — weak; composite 78, EPS rating 77
  rsTrend: 'flat',      // Basing after a ~60% drawdown; recently above the 50-day but multi-year trend was down
  aiImpact: 'NEUTRAL',

  reasonsToBuy: [
    'Wegovy pill is the best GLP-1 launch ever — millions of prescriptions in months and still accelerating despite competition, as the only oral peptide for obesity',
    'Oral pill shows superior weight loss and tolerability vs the rival oral, plus cardioprotection, driving a Wegovy halo across the franchise',
    'Deep, near-term pipeline — CagriSema (US approval expected this year), oral amycretin/zenagamtide, Ziltivekimab CV outcomes, plus rare-disease wins in sickle cell and hemophilia',
    'Trades at a multi-year-low valuation after a steep de-rating — much of the bad news already looks priced in',
    'Best-in-class margins and prodigious cash generation funding a large, growing dividend off a strong balance sheet',
  ],

  risksToBuy: [
    'Earnings are guided to DECLINE in 2026 (adj sales/operating profit −4% to −12%) on US "Most Favoured Nations" pricing, lower realized prices, and competition',
    'Eli Lilly has seized obesity momentum with higher-efficacy tirzepatide and a strong oral pipeline; Ozempic is losing diabetes share',
    'Semaglutide patent expiry (international markets now, US around 2032) is a structural revenue cliff on the horizon',
    'Compounded/generic semaglutide and US reimbursement pressure (incl. reduced Medicaid obesity coverage) threaten volumes and pricing',
    'Recovery hinges on oral/pipeline scaling faster than core erosion — and weak relative strength shows the market is still skeptical',
  ],

  analystConsensus: { rating: 'Hold', targetLow: 40, targetMedian: 62, targetHigh: 130, numAnalysts: 24 },

  epsCagr: [2, 8, 14],
  exitPE: [11, 15, 20],
  prob: [30, 45, 25],

  revGrowth: [
    [-0.10, -0.04, -0.01, 0.01, 0.02],   // Bear: MFN + patent expiry + Lilly erode the franchise
    [-0.08, 0.02, 0.05, 0.06, 0.06],     // Base: 2026 trough, gradual recovery as oral/pipeline scale
    [-0.05, 0.05, 0.10, 0.11, 0.09],     // Bull: oral obesity reignites growth, share defended
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
      'EPS compounds only ~2% from the FY2026E $3.30 base and the market values NVO as an ex-growth pharma at ~11x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30%.',
    '2026 marks the earnings trough. The record Wegovy-pill launch and pipeline (CagriSema, amycretin) stabilize and then modestly reaccelerate growth as capacity capex normalizes and margins recover, while MFN pricing and Ozempic share loss cap the pace. ' +
      'EPS compounds ~8% from the $3.30 base while the multiple normalizes toward ~15x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. A cheap, dominant franchise — but the recovery is gradual and the patent cliff caps the multiple.',
    'The blockbuster oral Wegovy pill (millions of scripts, accelerating, ~60% NBRx share) plus CagriSema, amycretin/zenagamtide, and Ziltivekimab reignite double-digit growth, NVO defends share against Lilly, and the obesity TAM expands faster than expected. ' +
      'EPS compounds ~14% from the $3.30 base and the market re-rates toward ~20x off a washed-out base. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: the GLP-1 franchise faces a triple squeeze — US MFN drug pricing, semaglutide patent expiry (international now, US ~2032), and Lilly\'s higher-efficacy tirzepatide taking share. ' +
      '2026 earnings already decline. If oral Wegovy and the pipeline disappoint, NVO becomes a melting ice cube. ' +
      'At {spot} it screens cheap, but a value trap with eroding earnings has no floor on the multiple.',
    'After a ~60% drawdown from its 2024 highs, NVO trades at a multi-year-low multiple with 2026 as the earnings trough. The franchise is still dominant, FCF is prodigious, the balance sheet is strong, and the record oral-Wegovy launch plus a deep pipeline offer a credible path back to growth. ' +
      'But adjusted earnings still decline this year, MFN pricing and the US patent cliff (~2032) cap the upside, Lilly has the momentum in injectables, and relative strength is weak. The risk/reward is balanced — a cheap, high-quality franchise where the recovery is real but gradual. ' +
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
    netDebt: 5000,
    ebitda: 24000,
    fy: 'FY25',
    note: 'GREEN. Net debt ~$5B (gross debt ~$20B rose for the $11.7B Catalent manufacturing acquisition, offset by ~$15B cash) vs EBITDA ~$24B => leverage ~0.2x. IBD shows Debt/Equity ~0%. Backed by prodigious cash generation; the only near-term FCF drag is elevated capacity capex, which is now being reduced. Figures converted from DKK.',
  },
});

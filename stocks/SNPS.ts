import { defineStock } from './defineStock';

export const SNPS = defineStock({
  ticker: 'SNPS',
  name: 'Synopsys',
  sector: 'EDA Software / Chip Design',
  themeColor: '#7b2cbf',
  currentPrice: 509.99,
  fairPriceRange: '$415 - $700',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 192,
  rev25: 7054,         // FY2025; FY26 guide midpoint $9.715B (+38% incl. Ansys), FY27E consensus $11.03B (+13.5%)
  fcfMargin25: 0.30,
  taxRate: 0.18,
  cash: 14000,
  debt: 16000,
  beta: 1.30,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 15.07,      // FY26E (Oct 2026) non-GAAP EPS = guide midpoint (raised at Q3; consensus $15.14, FY27E $18.58 +23%). Q3 $3.91. Prior: $15.50.
  rsRating: 38,         // NOT refreshed — awaiting user RS (10/10/2026)
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',  // Kept at Q3 FY26 pending a fresh RS read: model screens BUY (~10% base CAGR) but RS was weak/falling. Revisit when RS is updated — if momentum has turned, this override should go.
  updatedOn: '10/09',
  lastReportTag: 'Q3 FY26',
  dataReviewedOn: '2026-10-10',

  // Q3 FY26 UPDATE (Aug 26, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $2.477B (vs $1.740B; Ansys now consolidated), above the top of
  // guidance. Non-GAAP EPS $3.91, GAAP $2.84. Strong Ansys quarter. FY26
  // guide raised: revenue ~$9.715B, non-GAAP EPS ~$15.07, non-GAAP op margin
  // ~41.5%, cash flow raised; double-digit EDA growth expected. Street:
  // Strong Buy (25), PT $415-700 (median $580); FY26E EPS $15.14 / rev
  // $9.72B, FY27E $18.58 / $11.03B. Stock $510 (~34× FY26E / ~27× FY27E).
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Dominant EDA market share means every advanced AI chip — NVIDIA, AMD, custom hyperscaler silicon — requires Synopsys tools',
    'Ansys acquisition creates a full silicon-to-system simulation platform no competitor can match at scale',
    'Record backlog provides multi-year revenue visibility unusual for a software company of this size',
    'AI-chip design intensity compounds demand: each new architecture generation requires more verification and IP attach',
    'Capital-light model with high gross margins and strong FCF generation regardless of the semiconductor cycle',
  ],

  risksToBuy: [
    'Cadence is competing aggressively on AI-design wins and gaining share in advanced-node verification',
    'Ansys integration friction could delay synergies and create cultural and technical drag on the combined platform',
    'China revenue exposure creates a geopolitical tail risk that could be cut with little warning by export controls',
    'Valuation prices in flawless execution — even modest EDA cycle deceleration triggers painful multiple compression',
    'SBC elevated at a meaningful share of revenue with buybacks covering only a fraction of new issuance',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 414.77, targetMedian: 580, targetHigh: 700, numAnalysts: 25 },  // stockanalysis.com, Oct 9 2026

  revGrowth: [
    [0.36, 0.06, 0.06, 0.05, 0.05],   // Bear: FY26 ~locked (Ansys step-up); EDA demand cools after
    [0.38, 0.13, 0.11, 0.10, 0.09],   // Base: FY26 ≈ $9.715B guide, FY27 ≈ consensus $11.0B
    [0.39, 0.17, 0.15, 0.13, 0.11],   // Bull: AI design intensity + Ansys cross-sell
  ],
  fcfMargin: [
    [0.28, 0.28, 0.28, 0.28, 0.28],
    [0.30, 0.31, 0.32, 0.33, 0.33],
    [0.32, 0.34, 0.36, 0.37, 0.38],
  ],
  exitMultiple: [16, 22, 28],

  desc: [
    'AI-chip design demand cools as hyperscaler custom-silicon programs consolidate. Cadence wins meaningful share in advanced-node verification. China export controls tighten further, costing ~5% of revenue. ' +
      'Ansys integration delivers half the synergy guidance. EPS compounds at ~9% from the $15.07 FY26E base. Multiple compresses ~34× → 20× as the market reprices SNPS as a mature software cyclical. 5yr target {target} ({cagr} annualized).',
    'AI design momentum sustains through 2027 then normalizes. Synopsys holds 50%+ EDA share and IP attach grows with custom silicon. Ansys integration delivers per plan: $0.6B synergy run-rate by FY28. ' +
      'EPS compounds at ~15% (FY27E +23%, then low-to-mid teens). Multiple compresses ~34× → 27× through earnings growth. 5yr target {target} ({cagr} annualized).',
    'Synopsys becomes the indispensable AI-chip design platform — every hyperscaler ASIC, every advanced node, every multiphysics workflow runs through SNPS+Ansys. EDA + IP + simulation = full-stack moat. ' +
      'AI design + automotive + photonics drive revenue +15-18%. EPS compounds at ~22%. Multiple holds a premium ~35× on structural AI position. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'EDA cycle peaks 2025-26 as initial AI-chip design wave matures. Hyperscalers consolidate custom-silicon programs — fewer designs, lower IP attach. ' +
      'Cadence wins share at the advanced node and in verification. China export controls + Russia-style geopolitical risk constrain ~10% of revenue. ' +
      'Ansys integration friction (cultural + technical) delays synergies; multiphysics cross-sell underwhelms. ' +
      'At ~34× FY26E, even modest growth deceleration triggers severe multiple compression. 31% Burry overstatement amplifies the real-vs-reported earnings gap.',
    'AI-chip design TAM expands structurally: every hyperscaler runs custom silicon, every advanced node requires more verification, every multiphysics workflow needs simulation. ' +
      'Synopsys captures 50%+ of EDA TAM with growing IP attach (USB, PCIe, HBM, AI accelerator IP). Ansys integration delivers $0.6B+ synergies by FY28. ' +
      'Backlog $11.4B provides multi-year revenue visibility. Capital-light business with high gross margins (~80%) supports continued operating leverage. ' +
      'EPS compounds at mid-teens, but the market already prices this — entry at ~34× P/E means returns mostly come from EPS growth offsetting multiple compression.',
    'Full AI super-cycle: AGI infrastructure buildout drives a decade of advanced-node design intensity. Synopsys + Ansys becomes the silicon-to-system standard, with no real challenger at scale. ' +
      'IP attach (HBM, PCIe, USB, custom AI cores) compounds with each new chip generation. Automotive, defense, photonics, biotech all add new design TAM. ' +
      'Margins expand to 38% on operating leverage. EPS compounds 22%. Multiple holds 30× as the market accepts SNPS as the pure-play AI-design infrastructure platform.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.005, 0.010, 0.015],
  ebitdaProxy: [0.34, 0.40, 0.45],
  bullMaOptVal: false,

  epsCagr: [9, 15, 22],
  exitPE: [20, 27, 35],
  prob: [20, 50, 30],

  burry: {
    sbc: 893,
    gaapNi: 1336,
    buyback: 306,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 31,
    overstatementSource: 'burry-published',
    note: 'Critical per Burry — 31% overstatement. TIKR FY25 actuals: SBC $893M (12.1% of revenue — elevated for an EDA company), buybacks just $306M (covers only 34% of SBC). Ansys acquisition closed in 2025 pushed diluted shares from 156M (FY24) → 174M (LTM) = +12% in one year, plus added $16.7B to acquisition spend. Our 4y-MTM formula overshoots (48% vs Burry\'s 31%) because the 1.72× MTM multiplier sits in the unreliable <4× zone where simple formula misses Burry\'s buyback-credit and other adjustments. Trust Burry\'s 31% as the anchor; SNPS\'s post-Ansys profile is structurally different from when his data was likely captured.',
  },
  debtSafety: {
    netDebt: 2000,
    ebitda: 2600,
    fy: 'FY25',
    note: 'Despite $16B gross debt from the Ansys acquisition, $14B in cash (raised via equity + debt financing) keeps net leverage at just 0.77× EBITDA. Asset-light EDA model generates strong FCF to deleverage rapidly.',
  },
});

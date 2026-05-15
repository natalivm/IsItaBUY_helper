import { defineStock } from './defineStock';

export const SNPS = defineStock({
  ticker: 'SNPS',
  name: 'Synopsys',
  sector: 'EDA Software / Chip Design',
  themeColor: '#7b2cbf',
  currentPrice: 502.42,
  fairPriceRange: '$420 - $720',
  shares0: 192,
  rev25: 7054,
  fcfMargin25: 0.30,
  taxRate: 0.18,
  cash: 14000,
  debt: 16000,
  beta: 1.30,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 15.50,
  rsRating: 38,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  updatedOn: '05/15',

  strategicNarrative:
    "Synopsys is the dominant EDA + IP supplier (TCAD, simulation, verification, libraries) — FY25 (ended Oct 2025) revenue $7.054B (+15% YoY), GAAP EPS $8.07, non-GAAP EPS $12.91, record $11.4B backlog. " +
    "AI-chip design demand is structural: every NVDA Rubin, AMD MI450, Trainium-3, Maia, TPUv6, and custom ASIC requires Synopsys EDA + IP. Ansys acquisition (closed 2024) adds multiphysics simulation = full 'silicon-to-system' platform. " +
    "But: at $516 / 40× FY26 non-GAAP EPS, the stock prices flawless execution. RS 38 reflects 2026 underperformance amid concerns about (1) Cadence competitive pressure on AI-design wins, (2) Ansys integration friction, (3) export-control risk on China revenue (~10% of total). " +
    "Capital allocation: ~$170M LTM buybacks per share (~$0.9 × 192M shares) — modest, mostly offsetting SBC dilution rather than retiring float. No dividend. " +
    "Bull (~30%): AI super-cycle extends, Ansys synergies deliver, EPS CAGR 22% → $620+. Base (~50%): EDA cycle steady, EPS CAGR 15%, multiple compresses 40× → 27× → $480. Bear (~20%): China + Cadence pressure, EPS CAGR 9%, multiple to 20× → $370. " +
    "Burry indicator flags 31% overstatement (Critical, Burry-published). Quality franchise but full price; wait for $400 entry where margin of safety improves.",

  analystConsensus: { rating: 'Buy', targetLow: 470, targetMedian: 620, targetHigh: 750, numAnalysts: 22 },

  revGrowth: [
    [0.10, 0.08, 0.07, 0.06, 0.05],
    [0.14, 0.13, 0.11, 0.10, 0.09],
    [0.18, 0.17, 0.15, 0.13, 0.11],
  ],
  fcfMargin: [
    [0.28, 0.28, 0.28, 0.28, 0.28],
    [0.30, 0.31, 0.32, 0.33, 0.33],
    [0.32, 0.34, 0.36, 0.37, 0.38],
  ],
  exitMultiple: [16, 22, 28],

  desc: [
    'AI-chip design demand cools as hyperscaler custom-silicon programs consolidate. Cadence wins meaningful share in advanced-node verification. China export controls tighten further, costing ~5% of revenue. ' +
      'Ansys integration delivers half the synergy guidance. EPS compounds at ~9%. Multiple compresses 40× → 20× as market reprices SNPS as a mature software cyclical. 5yr target ~$370, ~-7% annualized.',
    'AI design momentum sustains through 2027 then normalizes. Synopsys holds 50%+ EDA share and IP attach grows with custom silicon. Ansys integration delivers per plan: $0.6B synergy run-rate by FY28. ' +
      'EPS compounds at ~15%. Multiple compresses 40× → 27× through earnings growth. 5yr target ~$480, ~-1% annualized — fair value with no margin of safety at current entry.',
    'Synopsys becomes the indispensable AI-chip design platform — every hyperscaler ASIC, every advanced node, every multiphysics workflow runs through SNPS+Ansys. EDA + IP + simulation = full-stack moat. ' +
      'AI design + automotive + photonics drive revenue +15-18%. EPS compounds at ~22%. Multiple holds premium 30× on structural AI position. 5yr target ~$620+, ~4% annualized.',
  ],

  thesis: [
    'EDA cycle peaks 2025-26 as initial AI-chip design wave matures. Hyperscalers consolidate custom-silicon programs — fewer designs, lower IP attach. ' +
      'Cadence wins share at the advanced node and in verification. China export controls + Russia-style geopolitical risk constrain ~10% of revenue. ' +
      'Ansys integration friction (cultural + technical) delays synergies; multiphysics cross-sell underwhelms. ' +
      'At 40× forward, even modest growth deceleration triggers severe multiple compression. 31% Burry overstatement amplifies the real-vs-reported earnings gap.',
    'AI-chip design TAM expands structurally: every hyperscaler runs custom silicon, every advanced node requires more verification, every multiphysics workflow needs simulation. ' +
      'Synopsys captures 50%+ of EDA TAM with growing IP attach (USB, PCIe, HBM, AI accelerator IP). Ansys integration delivers $0.6B+ synergies by FY28. ' +
      'Backlog $11.4B provides multi-year revenue visibility. Capital-light business with high gross margins (~80%) supports continued operating leverage. ' +
      'EPS compounds at mid-teens, but the market already prices this — entry at 40× P/E means returns mostly come from EPS growth offsetting multiple compression.',
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
});

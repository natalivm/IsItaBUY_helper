import { defineStock } from './defineStock';

export const LRCX = defineStock({
  updatedOn: '04/27',
  ticker: 'LRCX',
  name: 'Lam Research Corporation',
  sector: 'Semiconductor Equipment · Etch & Deposition',
  themeColor: '#005baa',
  currentPrice: 245.71,
  fairPriceRange: '$165 - $485',
  shares0: 1260,           // ~1.26B diluted shares post 10:1 split (Oct 2024); market cap ~$298B
  rev25: 18400,            // FY25 revenue ~$18.4B
  fcfMargin25: 0.29,       // FCF ~$5.4B / rev ~$18.4B ≈ 29%
  taxRate: 0.12,
  cash: 5700,
  debt: 5000,
  beta: 1.35,
  costDebt: 0.035,
  modelType: 'EPS_PE',
  baseEps: 5.32,           // FY26E forward EPS (TIKR consensus)
  rsRating: 97,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Lam Research is the dominant etch & deposition equipment supplier, with SAM share at mid-30% of WFE and targeting high-30% — " +
    "structural content gains (GAA, backside power, advanced packaging, high-performance materials) mean etch/dep intensity rises with each new node. " +
    "CSBG installed base >100,000 chambers with Equipment Intelligence + Dextro (autonomous fab) provides a sticky, recurring-like revenue component growing faster than the installed base. " +
    "FY25 record margins: GM ~49.9%, OPM ~34.1%. WFE 2026 guided ~$135B (+23% YoY), advanced packaging business +40% in 2026. " +
    "Buybacks aggressive: 85% of FCF returned, ~39M shares repurchased in FY25 at avg ~$104, contributing 2-4% annually to EPS CAGR. " +
    "The tension: at ~44x forward P/E, the stock prices in a multi-year AI supercycle with no margin of safety for WFE normalization. " +
    "Historical P/E range is 15-35x — multiple compression to 25-30x alone erases 3-5 years of EPS growth. " +
    "Probability of 15%+ CAGR from current levels: ~40-50% (upgraded post earnings call due to strong WFE guide, share gains, and CSBG stickiness). " +
    "This is a quality cyclical growth business with real structural tailwinds, but not a cheap compounder — " +
    "you're betting on sustained AI capex, no major WFE digestion cycle, and the market maintaining a premium multiple.",

  epsCagr: [9, 15, 19],
  exitPE: [20, 28, 38],
  prob: [20, 45, 35],

  analystConsensus: { rating: 'Buy', targetLow: 200, targetMedian: 280, targetHigh: 350, numAnalysts: 25 },
  revGrowth: [
    [0.08, 0.05, 0.04, 0.05, 0.06],  // bear: WFE cycle breaks early, NAND/DRAM digestion, China mix drag
    [0.18, 0.15, 0.12, 0.10, 0.10],  // base: strong CY26-27 (WFE $135B), normalization after
    [0.23, 0.20, 0.18, 0.15, 0.14],  // bull: AI supercycle extends, packaging +40%, share gains to high-30%
  ],
  fcfMargin: [
    [0.25, 0.25, 0.26, 0.27, 0.27],  // bear: mix headwinds persist, margin pressure from less rich product mix
    [0.28, 0.29, 0.30, 0.31, 0.32],  // base: margins recover post-mix normalization, operating leverage
    [0.30, 0.32, 0.33, 0.34, 0.35],  // bull: volume leverage + CSBG attach + advanced packaging premium
  ],
  exitMultiple: [14, 20, 26],
  desc: [
    'WFE cycle breaks ahead of schedule — memory capex normalizes after the upgrade wave, cleanroom constraints delay greenfield builds, and China WFE flattens reducing mix quality. ' +
      'GM pressure from "less rich" product mix persists through 2027. EPS grows at only 9% CAGR from the FY26 base as cycle visibility shrinks. ' +
      'Multiple reverts to historical lows at 20x as the market re-prices Lam as a mid-cycle cyclical. ' +
      'Stress-test: at P/E 22 even with EPS ~$11, price ≈ $242 — essentially flat from here over 5 years. ' +
      'At P/E 18 (deep bear), target ≈ $148 — roughly -9% annualized loss from $236.',
    'A normal semiconductor cycle plays out with AI-driven WFE growth sustaining through 2027 before normalizing. ' +
      'WFE 2026 at ~$135B as guided, SAM share expands toward high-30%. CSBG grows faster than installed base providing revenue stability. ' +
      'EPS compounds at 15% CAGR (14-16% operational + 2-3% buyback boost). Aggressive buybacks continue at 85% of FCF. ' +
      'However, P/E compresses from 44x to 28x as cycle matures — EPS growth is real but multiple compression offsets returns. ' +
      'Target: $5.32 × 1.15^5 ≈ $10.7 at 28x ≈ $300. Annualized return ~5%. Solid business, full price.',
    'AI supercycle extends through 2028-2029: HBM buildout, advanced NAND greenfield (post-2027), GAA transitions at 2nm and below, ' +
      'and advanced packaging (+40% in 2026, accelerating) all require disproportionately more etch and deposition steps per wafer. ' +
      'SAM share reaches high-30% of WFE. CSBG + Equipment Intelligence + Dextro create genuine recurring revenue. ' +
      'EPS compounds at 19% CAGR with buybacks contributing 3-4% annually. Market maintains premium multiple at 38x given structural growth visibility. ' +
      'Target: $5.32 × 1.19^5 ≈ $12.7 at 38x ≈ $482. Annualized return ~15%. The only path that clears the 15% hurdle.',
  ],

  thesis: [
    'Bear mechanics: WFE cycles historically run 2-3 strong years before digestion — we are already in year 2 of the upcycle. ' +
      'Management explicitly flags 2H-weighted WFE, cleanroom constraints, and mix-dependent margins — classic late-cycle signals. ' +
      'NAND recovery is "upgrades before greenfield" with greenfield pushed to 2027-28 — if those slip, a WFE air pocket opens. ' +
      'China WFE "flattish YoY" means mix deterioration as China share falls but volatility remains. ' +
      'Multiple sensitivity dominates: at P/E 18 (historical trough), even base EPS of ~$10.7 → price $193 (-18%). ' +
      'No macro shock required — a normal WFE pause + multiple mean reversion is sufficient for -20% to -30% drawdown.',
    'Post-earnings, the base case has stronger support: WFE +23% to $135B, share gains (+1pp YoY), advanced packaging +40%. ' +
      'CSBG with >100K installed chambers and growing faster than base provides genuine revenue stability through cycles. ' +
      'Buybacks at 85% FCF return provide 2-3% annual EPS tailwind. FY25 records (GM 49.9%, OPM 34.1%) show peak-level execution. ' +
      'The problem: the market already prices this trajectory. Forward P/E at 44x implies near-perfect execution for 3+ years. ' +
      'If EPS hits $10.7 in 5 years (15% CAGR) but P/E normalizes to 28x, you get ~5% annualized — functional dead money. ' +
      'For 10%+ CAGR in the base case, you need entry closer to $190-200.',
    'Bull case requires the AI capex supercycle to extend and Lam to capture outsize share of the WFE expansion. ' +
      'Key enablers: GAA etch intensity at 2nm, HBM stacking (deposition-heavy), NAND greenfield wave in 2027-28, CoWoS/3D-IC packaging. ' +
      'Equipment Intelligence + Dextro (autonomous fab) could meaningfully increase CSBG monetization, adding recurring revenue. ' +
      'At 19% EPS CAGR with 38x exit: $12.7 × 38 ≈ $482, delivering ~15% annualized — right at the hurdle. ' +
      'For 18%+ CAGR, you need either faster EPS growth (20%+) or P/E to hold above 40x — both require a historically unusual cycle extension. ' +
      'Post-earnings probability: ~35% — upgraded from ~25% due to strong guide and structural content growth story.',
  ],

  termGrowth: [0.015, 0.025, 0.03],
  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.30, 0.38, 0.44],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.005, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
    },
  ],
});

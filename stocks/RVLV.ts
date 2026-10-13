import { defineStock } from './defineStock';

export const RVLV = defineStock({
  ticker: 'RVLV',
  name: 'Revolve Group, Inc.',
  sector: 'Consumer Discretionary · Fashion E-Commerce',
  themeColor: '#c2185b',
  currentPrice: 21.66,
  fairPriceRange: '$24 - $37',  // stockanalysis.com analyst target range (Oct 6 2026)
  shares0: 71.1,       // 71.09M (stockanalysis, Oct 2026)
  rev25: 1230,         // FY2025A; revGrowth[0] = FY26 (consensus $1.39B, +13%), FY27E $1.51B (+9%)
  fcfMargin25: 0.037,
  taxRate: 0.25,
  cash: 311.6,
  debt: 30.9,          // leases; no funded debt
  beta: 1.60,
  modelType: 'EPS_PE',
  baseEps: 0.85,       // FY26E underlying EPS: consensus $0.91 less ~$0.06 one-time IEEPA tariff refund (Q2). FY27E $1.14. Prior: $0.83.
  rsRating: 70,        // IBD RS per user, 10/11/2026 (was 24)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Sales growth has held in the low-to-high teens through mid-2026, with July accelerating further',
    'Debt-free balance sheet with a substantial net-cash cushion provides rare downside protection',
    'Owned brand penetration still in early innings with room to more than double mix share',
    'FWRD positioned to capture luxury market abandoned by Farfetch bankruptcy at a global scale',
    'AI-powered personalization and agentic shopping experience driving measurable incremental revenue',
  ],

  risksToBuy: [
    'Elevated marketing investment may fail to convert — brand launches could disappoint after heavy spend',
    'Gen Z loyalty to TikTok Shop, Shein, and resale platforms poses a secular demand threat',
    'Tariff exposure on sourced inventory could reverse recent gross margin progress',
    'Marketing and overhead guidance keeps rising, so sales gains are not yet translating into much higher earnings',
    'Physical retail expansion is unproven at scale and adds execution risk to an already crowded strategy',
  ],

  updatedOn: '10/13',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  // Q2 2026 UPDATE (Aug 4, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Net sales $347.4M (+12%), GM 56.6% (+254bp, of which ~162bp one-time
  // IEEPA tariff refunds), diluted EPS $0.26 (vs $0.14; refunds +$0.06),
  // adj. EBITDA $26.8M (+17%, 7.7%). July sales +~18%. FY26 GM guide held at
  // 53.5-54.0% (no further refunds assumed); marketing raised to 15.8-16.0%
  // of sales, G&A to $170-172M. Street: Buy (15), PT $24-37 (median $30);
  // FY26E rev $1.39B / EPS $0.91, FY27E $1.51B / $1.14. Stock $21.69 (~25×
  // underlying FY26E, ~19× FY27E); net cash ~$4/share.
  // ─────────────────────────────────────────────────────────────────────────

  epsCagr: [5, 14, 22],   // From the underlying FY26E $0.85 base (FY27E $1.14 = +34%, so base front-loads then fades)
  exitPE: [13, 18, 22],
  prob: [20, 50, 30],

  revGrowth: [
    [0.11, 0.05, 0.05, 0.04, 0.04], // Bear: FY26 near consensus, then tariffs/macro bite and trend misses
    [0.13, 0.10, 0.10, 0.09, 0.09], // Base: FY26 ≈ $1.39B, FY27 ≈ consensus, then high-single digits
    [0.15, 0.15, 0.14, 0.13, 0.12], // Bull: all levers fire — owned brands, FWRD, China, physical
  ],

  fcfMargin: [
    [0.032, 0.030, 0.028, 0.025, 0.022], // Bear: marketing spend doesn't pay off, margins erode
    [0.042, 0.058, 0.068, 0.076, 0.082], // Base: margin recovery continues toward 7-8%
    [0.060, 0.078, 0.092, 0.102, 0.112], // Bull: owned brand mix + AI efficiency → 10%+ FCF
  ],

  exitMultiple: [8, 12, 16],

  desc: [
    'Marketing investment fails to drive incremental demand; trend misses amplify inventory markdowns and tariffs return as a gross-margin headwind. ' +
      'EPS compounds only ~5% from the underlying FY26E $0.85 base and the P/E compresses to 13x as growth disappoints. 5yr target {target} ({cagr} annualized).',
    'Low-teens growth in 2026 moderates to high-single digits but sustains. Owned-brand penetration rises and drives margin expansion; FWRD keeps growing in luxury. ' +
      'EPS compounds ~14% from $0.85 (front-loaded by the FY27 rebound) and the P/E settles at 18x. 5yr target {target} ({cagr} annualized).',
    'Owned brands hit 30%+ penetration, FWRD becomes the dominant luxury multi-brand platform post-Farfetch, and international plus physical retail scale. ' +
      'EPS compounds ~22% and the market re-rates to 22x. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Marketing spend doesn\'t convert and Gen Z shifts further to TikTok Shop, Shein and resale. Tariffs bite gross margin again once the one-time refunds are gone. ' +
      'The stock has round-tripped from its post-earnings highs, suggesting the market already doubts the acceleration.',
    'Sales growth held in the teens through mid-2026 and July accelerated to ~18%. Net cash of ~$4 per share gives downside protection and buyback optionality. ' +
      'The question is operating leverage: rising marketing and G&A guidance means EPS growth lags revenue until 2027.',
    'AI-powered personalization and agentic shopping become a conversion moat, owned-brand launches resonate, physical retail scales and FWRD captures luxury share left by Farfetch — all at once.',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 24, targetMedian: 30, targetHigh: 37, numAnalysts: 15 },  // stockanalysis.com (Oct 6 2026)

  termGrowth: [0.015, 0.02, 0.025],
  bbRate: [0, 0.005, 0.01],
  ebitdaProxy: [0.07, 0.11, 0.15],
  bullMaOptVal: false,

  debtSafety: {
    netDebt: -281,         // Jun 2026 (stockanalysis): ~$311.6M cash − ~$30.9M lease debt
    ebitda: 87,            // TTM EBITDA
    fy: 'TTM Q2 2026',
    note: 'Net cash ~$281M (~$4/share), no funded debt. Step 1 GREEN.',
  },
});

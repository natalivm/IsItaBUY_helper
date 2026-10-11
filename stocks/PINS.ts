import { defineStock } from './defineStock';

export const PINS = defineStock({
  updatedOn: '10/09',
  ticker: 'PINS',
  name: 'Pinterest',
  sector: 'Social Commerce',
  themeColor: '#e60023',
  currentPrice: 21.4,
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$22 - $42',  // stockanalysis.com analyst target range (Aug 20 2026)
  shares0: 566.3,      // 566.31M (stockanalysis, Oct 2026) — down from ~676M after heavy repurchases
  rev25: 4222,         // FY2025A; revGrowth[0] = FY26 (consensus $4.91B, +16%), FY27E $5.55B (+13%)
  fcfMargin25: 0.297,
  taxRate: 0.21,
  cash: 1270,          // stockanalysis (Oct 2026)
  debt: 1200,          // new borrowings alongside the buyback (was debt-free)
  beta: 1.58,
  rsRating: 78,        // IBD RS per user, 10/11/2026 (was 33)
  rsTrend: 'rising',
  aiImpact: 'DISRUPTION_RISK',
  // Q2 2026 UPDATE (Aug 4, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $1.18B (+18%, +17% cc; beat), MAU 640M (+11%, record), adj.
  // EBITDA $311M (26%), FCF $270M; GAAP net loss $47M. Q3 GUIDE: revenue
  // $1.19-1.21B (+13-15%), adj. EBITDA $335-355M (above consensus). FY26
  // adj. EBITDA margin outlook raised to ~30%. Stock fell anyway. Street:
  // Buy (38; 19 Hold), PT $22-42 (median $29); FY26E rev $4.91B / EPS $2.02,
  // FY27E $5.55B / $2.40. Stock $21.40 (~10.6× FY26E, ~9.5× TTM FCF), down
  // ~33% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'High-intent visual shopping signals are difficult for LLMs to replicate, sustaining advertiser value proposition',
    'Aggressive buybacks have cut the share count sharply, and the stock trades at a high free-cash-flow yield',
    'Revenue growth actually accelerated into the high teens with record users, contradicting the structural-decline narrative',
    'Monthly active user growth in international markets remains a meaningful untapped monetization opportunity',
    'If GenAI integration enhances personalization, Pinterest could accelerate its social commerce conversion rates',
  ],

  risksToBuy: [
    'Guidance points to slower growth in the back half, and the market keeps de-rating the stock despite beats',
    'GenAI-powered search directly threatens the visual discovery moat that anchors Pinterest\'s advertising model',
    'Revenue growth in a disruption scenario could deteriorate to low single digits with multiple compression to follow',
    'The platform has struggled to fully convert discovery intent into measurable direct-response advertiser ROI',
    'AI disruption risk is flagged as severe — the bear case is structural decline, not a temporary cyclical setback',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 22, targetMedian: 29, targetHigh: 42.36, numAnalysts: 38 },  // stockanalysis.com (Aug 20 2026)
  revGrowth: [
    [0.14, 0.06, 0.05, 0.04, 0.04],   // Bear: FY26 near guide, then GenAI search erodes discovery
    [0.16, 0.12, 0.10, 0.09, 0.08],   // Base: FY26 ≈ $4.91B consensus, FY27 ≈ $5.5B
    [0.17, 0.15, 0.14, 0.13, 0.12],   // Bull: GenAI-enhanced shopping layer sustains low-teens growth
  ],
  // Recalibrated 10/11/2026 (targets too high): reported FCF (~30% margin) adds back ~9% of revenue in stock-based pay,
  // so the DCF now uses SBC-adjusted FCF, and ebitdaProxy is set explicitly (it was on the generic default).
  // Was fcfMargin [0.25, 0.30, 0.34] → base $62-71, ~1.7× the highest analyst target, with a bear that still made ~11%/yr.
  fcfMargin: [
    [0.18, 0.16, 0.15, 0.14, 0.14],   // Bear: defensive R&D spend as GenAI search erodes engagement
    [0.21, 0.21, 0.22, 0.22, 0.23],   // Base: ~30% reported FCF less ~9% SBC, modest leverage
    [0.22, 0.24, 0.26, 0.27, 0.28],   // Bull: operating leverage on a GenAI-enhanced commerce platform
  ],
  exitMultiple: [8, 12, 15],         // Was [12, 16, 19]: EV/EBITDA (after SBC) is ~11× today, so the base no longer assumes a re-rating
  ebitdaProxy: [0.17, 0.22, 0.27],    // EBITDA after SBC (adj. EBITDA ~30% less ~9% SBC)
  desc: [
    'GenAI-powered search (Google SGE, Perplexity) erodes Pinterest\'s visual discovery moat — users bypass visual search for LLM-generated recommendations. Advertiser ROAS deteriorates as engagement declines. ' +
      'Revenue growth falls to mid-single digits. FCF margins after stock-based pay compress to ~14% on defensive R&D spend. Multiple compresses to 8x EBITDA as market prices in structural decline. 5yr target {target} ({cagr} annualized).',
    'Pinterest defends its visual discovery niche alongside GenAI search — advertisers value high-intent shopping signals that LLMs can\'t replicate. Revenue grows at high-single to low-double digits. ' +
      'FCF margins after stock-based pay hold in the low 20s on ad tech maturation, with buybacks offsetting dilution. Multiple stays near the current ~12x EBITDA, reflecting an uncertainty discount. 5yr target {target} ({cagr} annualized).',
    'Pinterest integrates GenAI into its discovery platform, enhancing personalization and advertiser targeting. Social commerce conversions accelerate as the platform becomes the default visual shopping layer. ' +
      'Revenue sustains low-teens growth. FCF margins after stock-based pay expand toward ~28% on operating leverage. Market re-rates to 15x EBITDA as a GenAI-enhanced commerce platform. 5yr target {target} ({cagr} annualized).',
  ],

  bullMaOptVal: 15.42 * 676.0 * 0.07,

  debtSafety: {
    netDebt: -78,          // Jun 2026 (stockanalysis): ~$1.27B cash − ~$1.20B debt
    ebitda: 1400,          // FY26E adj. EBITDA (~30% × ~$4.9B); GAAP TTM EBITDA only ~$0.3B (SBC-heavy)
    fy: 'FY26E',
    note: 'Roughly net-neutral after debt-funded buybacks. Step 1 GREEN — but no longer the cash-rich, debt-free balance sheet of 2025.',
  },
});

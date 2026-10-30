import { defineStock } from './defineStock';

export const SPOT = defineStock({
  updatedOn: '10/30',
  ticker: 'SPOT',
  name: 'Spotify Technology S.A.',
  sector: 'Interactive Media / Audio',
  themeColor: '#C5A572',
  currentPrice: 557.24,
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$409 - $701',  // stockanalysis.com analyst target range (Oct 8 2026)
  shares0: 205.6,
  rev25: 19940,        // FY2025A €17.19B × ~1.16 USD/EUR (was entered in EUR against a USD price); revGrowth[0] = FY26 (consensus €19.5B, +14%), FY27E €22.3B (+14%)
  fcfMargin25: 0.167,
  taxRate: 0.17,
  cash: 7980,          // stockanalysis (Oct 2026), USD
  debt: 532,           // exchangeable notes largely retired
  beta: 1.35,
  costDebt: 0.042,
  rsRating: 94,        // IBD RS per user, 10/11/2026 (was 16)
  rsTrend: 'rising',
  aiImpact: 'DISRUPTION_RISK',
  // Q2 2026 UPDATE (Aug 4, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Premium subs 300M (+9%), MAU 777M (+12%). Revenue ~€4.8B (+15%, accel.
  // from 14%); premium +16% (ARPU +7%), ads +3%. Record GM 33.4%, op income
  // €655M (13.7%, beat €630M guide). FCF €797M; TTM FCF €3.3B. Q3 GUIDE:
  // MAU 788M (below ~793M consensus), subs 305M, revenue €5.0B, op income
  // €670M, GM 32.9% — stock fell. 2030 targets reaffirmed: GM 35-40%, op
  // margin >20%, 1B subscribers. Street: Buy (40), PT $409-701 (median
  // $593); FY26E rev €19.5B / EPS €12.23, FY27E €22.3B / €15.37. Stock
  // $529.14 (~29× TTM EPS), down ~22% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Buy', targetLow: 409, targetMedian: 593, targetHigh: 701, numAnalysts: 40 },  // stockanalysis.com (Oct 8 2026)
  revGrowth: [
    [0.12, 0.09, 0.08, 0.07, 0.07],   // Bear: ads stall, subscriber growth slows, price hikes hit churn
    [0.14, 0.13, 0.12, 0.10, 0.10],   // Base: FY26 ≈ €19.5B consensus, FY27 slight haircut vs +14%
    [0.15, 0.16, 0.15, 0.13, 0.13],   // Bull: audiobooks/video + ads re-accelerate, 1B-sub path
  ],
  fcfMargin: [
    [0.16, 0.17, 0.17, 0.19, 0.20],
    [0.183, 0.197, 0.206, 0.227, 0.233],
    [0.20, 0.22, 0.23, 0.25, 0.26],
  ],
  exitMultiple: [20, 25, 30],
  desc: [
    'Ads growth stalls, user growth slows and label costs cap gross margin; FCF margins plateau at ~20% and the market values Spotify as a mature media streamer at ~20x. 5yr target {target} ({cagr} annualized).',
    'Consensus path holds: revenue grows low-teens on price increases and subscriber growth, gross margin climbs toward the 35-40% 2030 target and FCF margin expands to ~23%; valued as a quality compounder at 25x. 5yr target {target} ({cagr} annualized).',
    'Premium platform with runway — personalization, audiobooks and video plus pricing power push toward 1B subscribers and mid-20s FCF margins at 30x. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  ebitdaProxy: [0.17, 0.25, 0.38],
  bullMaOptVal: 496 * 206 * 0.07,

  debtSafety: {
    netDebt: -7450,        // Jun 2026 (stockanalysis): ~$8.0B cash − ~$0.5B debt
    ebitda: 3070,          // TTM EBITDA
    fy: 'TTM Q2 2026',
    note: 'Net cash ~$7.5B. Step 1 GREEN — asset-light, cash-generative platform.',
  },
});

import { defineStock } from './defineStock';

export const ARRY = defineStock({
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  ticker: 'ARRY',
  name: 'Array Technologies',
  sector: 'Solar / Industrial Equipment',
  themeColor: '#f59e0b',
  currentPrice: 3.68,
  fairPriceRange: '$4 - $13',  // stockanalysis.com analyst target range (Sep 30 2026)
  shares0: 156,        // Q2 2026 diluted 155.7M
  rev25: 1280,         // FY2025; FY26 guide $1.4-1.5B (consensus $1.43B), FY27E $1.62B
  fcfMargin25: 0.063,
  taxRate: 0.22,
  cash: 307,           // Jun 30 2026
  debt: 1164,          // Jun 30 2026: $658M debt + $506M Series A perpetual preferred (liquidation pref., senior to common — treated as debt; previously ignored)
  beta: 1.90,
  costDebt: 0.065,
  rsRating: 3,          // IBD RS per user, 10/10/2026 (was 58) — ~-30% since July
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  ratingOverride: 'HOLD',  // Q2 2026: model screens STRONG BUY (~5× EPS, base DCF ~$16) but the bear case wipes out the common entirely once the $506M preferred + $658M debt are counted — a binary bet on solar policy (OBBBA credit changes) with a stockholders' deficit and RS 3. Speculative: HOLD until policy clarity or momentum returns.
  // Q2 2026 UPDATE (Aug 5, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $342M (-6% y/y, +53% q/q incl. APA Solar); adj. GM 30.8%; adj.
  // EBITDA $63M; adj. EPS $0.24 (GAAP $0.05). FCF $114M (YTD $77M). Record
  // $2.5B orderbook (+37%), TTM book-to-bill 1.5x. Cash $307M vs $658M debt
  // PLUS $506M Series A perpetual preferred (liquidation preference) →
  // stockholders' deficit $(202)M. FY26 GUIDE: revenue $1.4-1.5B (unch.),
  // adj. GM 27-28% (H2 margins step down after one-time H1 benefits), adj.
  // EBITDA $210-230M (low end raised), adj. EPS $0.68-0.75. Q3 revenue
  // $310-330M. AWM acquisition closing Q3. Risks flagged: tariffs/domestic
  // content, OBBBA energy-credit changes, permitting delays pushing revenue
  // into 2027. Street: Buy (24), PT $4-13 (median $7.50); FY26E EPS $0.74,
  // FY27E $0.92. Stock $3.68 (~5× FY26E EPS, RS 3) — the market is pricing
  // policy risk + the preferred/debt stack ahead of common equity.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Record order backlog with high Tier 1 customer concentration provides multi-quarter revenue visibility from a strong position.',
    'Domestic manufacturing orientation insulates ARRY from tariff and supply-chain risk hitting overseas competitors.',
    'DuraTrack terrain-following technology and integrated foundation-plus-tracker offer a differentiated product for complex sites.',
    'Emerging software and services layer adds a recurring revenue stream that could improve FCF conversion over time.',
    'Solar build-out secular tailwind driven by data center power demand creates a multi-year industry growth backdrop.',
  ],

  risksToBuy: [
    'Management openly admits pricing competition caps gross margin expansion — the moat is weak relative to the growth multiple.',
    'FCF conversion is chronically weak relative to reported EBITDA, limiting real cash returns to shareholders.',
    'Debt plus a large perpetual preferred rank ahead of common holders, leaving thin equity value if the solar cycle turns.',
    'International expansion is being avoided precisely because of price-war risk, capping the long-term addressable market.',
    'RS reflects the market\'s skepticism — this is a watchlist name, not a high-conviction leader with institutional sponsorship.',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 4, targetMedian: 7.5, targetHigh: 13, numAnalysts: 24 },  // stockanalysis.com (Sep 30 2026)
  revGrowth: [
    [0.10, -0.05, -0.05, 0.00, -0.02],  // Bear: FY26 at low end ($1.4B); policy/credit changes cut 2027-28 demand
    [0.13, 0.12, 0.06, 0.04, 0.03],     // Base: FY26 ≈ $1.43B consensus, FY27 ≈ $1.62B, then normalizes
    [0.16, 0.15, 0.10, 0.08, 0.06],     // Bull: orderbook converts fast, AWM/APA synergies
  ],
  fcfMargin: [
    [0.05, 0.05, 0.04, 0.04, 0.04],
    [0.06, 0.07, 0.08, 0.09, 0.10],
    [0.08, 0.10, 0.12, 0.13, 0.14],
  ],
  exitMultiple: [7, 9.5, 12],
  ebitdaProxy: [0.08, 0.13, 0.16],

  debtSafety: {
    netDebt: 351,          // Jun 30 2026: $658M debt − $307M cash (excludes the $506M preferred)
    ebitda: 220,           // FY26 adj. EBITDA guide midpoint ($210-230M)
    capexToOcf: 0.15,      // approx.
    interestCoverage: 3,   // approx. — not verified
    altmanZ: 1.5,          // approx. — stockholders' deficit makes Z weak
    fy: 'FY26E',
    note: 'Net debt ~1.6× EBITDA looks GREEN on its own, but add the $506M perpetual preferred and the senior claims reach ~3.9× EBITDA with a stockholders\' deficit. Step-3 fields approximate.',
  },
  desc: [
    'Solar cycle weakens on policy/credit changes, pricing pressure eats margins, FCF stays weak; the debt + preferred stack absorbs most enterprise value. 5yr target {target} ({cagr} annualized). Prob ~25%.',
    'Record $2.5B orderbook converts normally, gross margin settles ~28%, FCF conversion mediocre, growth normalizes. 5yr target {target} ({cagr} annualized). Prob ~50%.',
    'Share gains hold, APA/AWM synergies deliver, software/services grow, EBITDA margin mid-teens. 5yr target {target} ({cagr} annualized). Prob ~25%.',
  ],

  termGrowth: [0.010, 0.020, 0.025],
  waccAdj: [0.015, 0.005, -0.005],

  bullMaOptVal: 6.80 * 153 * 0.07,

  driverOverrides: [
    {
      bbRate: 0.003,
    },
    {
      bbRate: 0.01,
    },
    {
      bbRate: 0.02,
    },
  ],
});

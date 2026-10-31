import { defineStock } from './defineStock';

export const ITT = defineStock({
  ticker: 'ITT',
  name: 'ITT Inc.',
  sector: 'Diversified Industrials',
  themeColor: '#3b82f6',
  currentPrice: 198.5,
  updatedOn: '10/31',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$175 - $285',  // stockanalysis.com analyst target range (Sep 30 2026)
  shares0: 89.4,       // stockanalysis (Oct 2026) — up after shares issued for SPX FLOW
  rev25: 3940,         // FY2025A; revGrowth[0] = FY26 (SPX FLOW + organic +5-8%; consensus $5.52B, +40%), FY27E $6.02B (+9%)
  fcfMargin25: 0.141,
  taxRate: 0.21,
  cash: 591,           // Jun 2026 (stockanalysis)
  debt: 3830,
  beta: 1.35,
  costDebt: 0.045,
  rsRating: 89,        // IBD RS per user, 10/11/2026 (was 83)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Aug 6, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue ~$1.5B (+51%; organic +13%), orders +53% (organic +13%), book-
  // to-bill 1.1x; Flow organic +21%. Adj. EPS $2.08 (+18%, beat ~$1.93);
  // GAAP $0.95 on deal costs. Adj. op margin 20.0%. FY26 GUIDE RAISED: adj.
  // EPS $8.12-8.32, organic growth +5-8%, adj. op margin ~20.5%, FCF ~$565M.
  // SPX FLOW synergies ahead of plan; leverage ~2.5x after $124M paydown.
  // Street: Strong Buy (14), PT $175-285 (median $265); FY26E rev $5.52B /
  // EPS $8.26, FY27E $6.02B / $9.61. Stock $201.37 (~24× FY26E).
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Strong Buy', targetLow: 175, targetMedian: 265, targetHigh: 285, numAnalysts: 14 },  // stockanalysis.com (Sep 30 2026)
  revGrowth: [
    [0.37, 0.04, 0.04, 0.03, 0.03],   // Bear: FY26 incl. SPX FLOW, then industrial cycle turns
    [0.40, 0.09, 0.08, 0.07, 0.06],   // Base: FY26 ≈ $5.52B (SPX FLOW consolidated), FY27 ≈ consensus
    [0.42, 0.12, 0.11, 0.10, 0.09],   // Bull: synergies + energy transition + share gains
  ],
  fcfMargin: [
    [0.09, 0.10, 0.10, 0.11, 0.11],       // Bear: integration friction
    [0.105, 0.12, 0.13, 0.135, 0.14],     // Base: FY26 ~10% (~$565M incl. one-time deal costs), then normalizes
    [0.11, 0.13, 0.145, 0.155, 0.165],    // Bull: aftermarket mix + synergies
  ],
  ebitdaProxy: [0.20, 0.23, 0.25],        // Adj. op margin ~20.5% (FY26 guide) + D&A
  exitMultiple: [12, 16, 19],
  desc: [
    'SPX FLOW integration encounters margin dilution and cross-sell synergies fall short. Industrial cycle turns down, volume growth stalls at mid-single digits. ' +
      'Acquisition debt limits capital flexibility while FCF margins stall near ~11%. Market re-rates to 12x EBITDA as a leveraged industrial with uncertain payback. 5yr target {target} ({cagr} annualized).',
    'SPX FLOW accretion materializes — cross-sell synergies and 43% aftermarket mix sustain mid-to-high single-digit organic growth. Energy transition demand (cryogenic pumps for LNG/hydrogen) provides secular tailwind. ' +
      'FCF margins climb back toward ~14% as integration completes and deal costs roll off; valued at 16x EBITDA as a quality industrial compounder with global top-3 flow positioning. 5yr target {target} ({cagr} annualized).',
    'Full SPX FLOW synergy capture accelerates revenue to low-teens growth. Energy transition + industrial AI (predictive maintenance) expand addressable market beyond legacy flow. ' +
      'Aftermarket mix drives FCF margins toward ~16%. De-leveraging restores capital return capacity. Market re-rates to 19x EBITDA as a global flow solutions platform with secular tailwinds. 5yr target {target} ({cagr} annualized).',
  ],

  bullMaOptVal: 186 * 86 * 0.07,

  debtSafety: {
    netDebt: 3240,         // Jun 2026 (stockanalysis): ~$3.83B debt − ~$0.59B cash
    ebitda: 1270,          // FY26E adj. EBITDA approx. (~23% × $5.52B); mgmt cites ~2.5× leverage
    capexToOcf: 0.15,      // approximate
    interestCoverage: 6,   // approximate
    altmanZ: 3.2,          // approximate
    fy: 'FY26E',
    note: '~2.5× EBITDA after the SPX FLOW deal (mgmt figure) → step 3; asset-light with adequate coverage → YELLOW on estimated inputs. Deleveraging is under way ($124M repaid in Q2).',
  },
});

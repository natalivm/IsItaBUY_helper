import { defineStock } from './defineStock';

export const RTX = defineStock({
  ticker: 'RTX',
  name: 'RTX Corporation',
  sector: 'Aerospace & Defense',
  themeColor: '#003087',
  currentPrice: 199.4,
  fairPriceRange: '$200 - $250',  // stockanalysis.com analyst target range (Oct 2026)
  shares0: 1350,
  rev25: 88600,        // FY2025A (was 90,400); revGrowth[0] = FY26 (guide $95-96B raised; consensus $96.2B, +8.5%), FY27E $103.4B (+7.5%)
  fcfMargin25: 0.08,
  taxRate: 0.18,
  cash: 8310,
  debt: 38860,
  beta: 0.30,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 7.25,       // FY26E adj. EPS consensus (guide $7.10-7.25 raised at Q2; FY27E $7.87 +8.5%). Prior $5.41 was stale.
  rsRating: 59,        // IBD RS per user, 10/11/2026 (was 43)
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  // ratingOverride 'BUY' removed Oct 2026: it was a cap that "matched the model"; re-based to FY26E EPS (~26× today) the model reads HOLD, consistent with the "capital-preservation compounder" narrative.
  updatedOn: '10/30',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  // Q2 2026 UPDATE (Jul 23, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Sales $24.7B (+14%, +16% organic), adj. EPS $1.89 (+21%), GAAP $1.57,
  // FCF $2.9B. Backlog $289B (+22%; $170B commercial / $119B defense). FY26
  // GUIDE RAISED: sales $95-96B (organic +8-9%), adj. EPS $7.10-7.25, FCF
  // $8.50-8.75B. Selling Blue Canyon Technologies for $620M. Street: Buy
  // (24), PT $200-250 (median $237); FY26E rev $96.2B / EPS $7.25, FY27E
  // $103.4B / $7.87. Stock $185.97 (~25.7× FY26E).
  // ─────────────────────────────────────────────────────────────────────────



  analystConsensus: { rating: 'Buy', targetLow: 200, targetMedian: 237, targetHigh: 250, numAnalysts: 24 },  // stockanalysis.com (Oct 2026)

  revGrowth: [
    [0.08, 0.03, 0.02, 0.02, 0.02],  // Bear: FY26 locked by guide; defense budget headwinds, GTF drag, commercial softness
    [0.085, 0.075, 0.06, 0.05, 0.05], // Base: FY26 ≈ $96.2B, FY27 ≈ consensus, steady normalization
    [0.09, 0.09, 0.08, 0.07, 0.06],  // Bull: defense supercycle + full aftermarket recovery + Collins strength
  ],

  fcfMargin: [
    [0.08, 0.08, 0.08, 0.08, 0.08],          // Bear: FCF margin pinned flat, no recovery
    [0.085, 0.09, 0.095, 0.10, 0.10],         // Base: gradual margin expansion as GTF headwind fades
    [0.09, 0.10, 0.11, 0.115, 0.12],          // Bull: full aftermarket recovery + defense mix uplift
  ],

  exitMultiple: [10, 13, 16],
  termGrowth: [0.015, 0.025, 0.030],
  bbRate: [0.008, 0.015, 0.022],
  ebitdaProxy: [0.14, 0.18, 0.24],
  bullMaOptVal: false,

  epsCagr: [6, 10, 13],   // From the FY26E $7.25 base (re-based Oct 2026; was [8,12,15] off $5.41)
  exitPE: [17, 22, 26],
  prob: [25, 50, 25],

  desc: [
    'Defense budget sequestration returns, Pratt & Whitney GTF inspections exceed guided scope, and a recession hits high-margin commercial aftermarket. EPS grows only ~6% from the FY26E $7.25 base and the market de-rates to 17x. 5yr target {target} ({cagr} annualized).',
    'Defense spending keeps rising (NATO, Middle East, Ukraine replenishment) and GTF inspections complete on schedule, turning a multi-year headwind into aftermarket recovery; the record $289B backlog converts steadily. EPS compounds ~10% and the multiple settles at 22x. 5yr target {target} ({cagr} annualized).',
    'A defense super-cycle plus full aftermarket recovery: GTF resolution unlocks Pratt & Whitney margins sooner than guided and Collins gains content on next-gen platforms. EPS compounds ~13% and the market pays a 26x premium for franchise durability. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Bear mechanics: US fiscal pressure creates sequestration risk that markets habitually underestimate; GTF inspection scope creep extends charges and the timeline; ~45% of revenue is commercial-aerospace linked, making RTX more cyclical than its defense pedigree suggests. Merger-era debt (~3× EBITDA) amplifies equity downside on any miss.',
    'Structural defense is the anchor: multi-year missile and munitions programs (Patriot, AMRAAM, Stinger, SM-6) with a $119B defense backlog. Commercial backlog of $170B plus GTF recovery drives aftermarket growth. Organic growth was raised to 8-9% for 2026 and FCF is heading toward ~$8.5B+. The catch: at ~26x FY26E, the market already prices much of this.',
    'Bull mechanics: geopolitical necessity, European rearmament and Indo-Pacific deterrence converge; munitions replenishment drives a decade of backlog; the aging global fleet drives accelerating maintenance demand from every new engine delivered today.',
  ],

  burry: {
    sbc: 600,
    gaapNi: 7300,
    buyback: 2200,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 8,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC $600M vs. GAAP NI $7.3B = 8% naive ratio. Defense contractor compensation is structurally cleaner than software peers. Annual buybacks ~$2.2B (from $10B+ cumulative since merger) = 3.7× SBC, providing meaningful offset. Low stock appreciation (beta 0.30) further suppresses MTM amplification.',
  },

  debtSafety: {
    netDebt: 30550,        // Jun 2026 (stockanalysis): ~$38.9B debt − ~$8.3B cash
    ebitda: 15900,         // TTM EBITDA (stockanalysis)
    capexToOcf: 0.19,
    interestCoverage: 5.2,
    fy: 'TTM Q2 2026',
    note: 'Net Debt ~$30.6B / TTM EBITDA ~$15.9B ≈ 1.9× (FY25 basis was ~3.1×) — elevated from the 2020 Raytheon-UTC merger but falling. Step-3 checks: CapEx/OCF ~19% (passes), interest coverage ~5.2× (passes). Altman Z omitted — distorted by $57B merger-era goodwill/intangibles; classic Z-score overstates risk for post-merger defense conglomerates with investment-grade credit. Leverage is declining and FCF trajectory is improving.',
  },
});

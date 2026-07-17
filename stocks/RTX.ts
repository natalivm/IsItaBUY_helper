import { defineStock } from './defineStock';

export const RTX = defineStock({
  ticker: 'RTX',
  name: 'RTX Corporation',
  sector: 'Aerospace & Defense',
  themeColor: '#003087',
  currentPrice: 193.51,
  fairPriceRange: '$145 - $315',
  shares0: 1350,
  rev25: 90400,
  fcfMargin25: 0.08,
  taxRate: 0.18,
  cash: 6800,
  debt: 38900,
  beta: 0.30,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 5.41,
  rsRating: 43,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  ratingOverride: 'BUY',  // Caps RTX at BUY: prevents the model flipping to STRONG BUY on spot dips — a steady defense compounder, consensus Buy. (Matches model today.)
  updatedOn: '07/17',
  lastReportTag: 'Q1 2026',

  reasonsToBuy: [
    'Patriot, AMRAAM, and Stinger systems are in the critical procurement path of accelerating NATO and allied defense budgets',
    'Pratt & Whitney GTF inspection program completing in FY26-27 converts a multi-year headwind into a meaningful aftermarket recovery tailwind',
    'Pristine SBC structure and growing buyback program make RTX one of the cleanest capital return stories among large-cap industrials',
    'Commercial aerospace aftermarket generates recurring high-margin revenue that compounds with every new engine delivered globally',
    'Ultra-low beta and contracted backlog anchor the downside in ways that high-multiple growth stocks simply cannot match',
  ],

  risksToBuy: [
    'GTF inspection scope could exceed guided estimates, extending the margin headwind and delaying the FCF inflection',
    'Elevated merger debt limits financial flexibility and amplifies equity downside if earnings disappoint',
    'Commercial aerospace is a hidden cyclical risk — nearly half of revenue is linked to flight hour volumes that contract in a recession',
    'Defense budget sequestration or US fiscal austerity could pressure Raytheon\'s procurement pipeline in a political gridlock scenario',
    'Base-case CAGR is modest — this is a capital-preservation compounder, not a high-return vehicle for aggressive growth mandates',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 160, targetMedian: 215, targetHigh: 242, numAnalysts: 24 },

  revGrowth: [
    [0.03, 0.03, 0.02, 0.02, 0.02],  // Bear: defense budget headwinds, GTF drag extends, commercial softness
    [0.06, 0.06, 0.05, 0.05, 0.04],  // Base: steady defense + aftermarket recovery normalizes
    [0.09, 0.08, 0.08, 0.07, 0.06],  // Bull: defense supercycle + full aftermarket recovery + Collins strength
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

  epsCagr: [8, 12, 15],
  exitPE: [18, 24, 28],
  prob: [25, 50, 25],

  desc: [
    'Defense budget sequestration returns (US debt ceiling standoff or political gridlock cuts procurement). Pratt & Whitney GTF inspections exceed guided scope and cost, compressing margins further. Commercial aerospace faces recession-driven travel shock, reducing high-margin aftermarket revenue. EPS grows at only 8% annually from this base; market de-rates to 18× as growth visibility shrinks and leverage discount widens. 5yr target ~$145, roughly -4% annualized.',
    'Defense spending continues its secular upward trajectory (NATO 2% GDP commitments, Middle East demand, Ukraine replenishment). GTF inspections complete on the guided timeline, converting the $6B headwind into a multi-year aftermarket recovery tailwind. Collins Aerospace compound at 6–7% per year on fleet renewal. EPS grows at 12% annually; market maintains 24× on the visible cash flow compounding story. 5yr target ~$228, roughly +5% annualized from $179.66.',
    'Defense super-cycle intensifies as NATO over-achieves 2% targets and US procurement accelerates. GTF resolution unlocks Pratt & Whitney\'s full margin potential sooner than guided; aftermarket pricing power strengthens as the aging global fleet drives accelerating maintenance demand. Collins Aerospace penetrates next-gen platforms (A320neo, 787 upgrades, F-35 sustainment). EPS compounds at 15% annually; market re-rates to 28× premium on franchise durability. 5yr target ~$315, roughly +12% annualized.',
  ],

  thesis: [
    'Bear mechanics: US defense budgets face structural fiscal pressure — the deficit trajectory creates political pressure for procurement sequestration that markets habitually underestimate. GTF inspection scope creep: the $6B Pratt & Whitney charge estimate assumed specific fleet data; if actual engine failures exceed estimates, charges grow and the timeline extends through FY28. Commercial aerospace is the hidden cyclical: ~45% of revenue is commercial aerospace-linked (Pratt & Whitney commercial, Collins commercial), making RTX more cyclical than its defense pedigree suggests. The balance sheet carries $38.9B of merger debt; at 3.1× EBITDA, any earnings miss triggers credit spread widening that amplifies equity downside. Stock beta = 0.30 means RTX won\'t crash in a bear market — but it won\'t recover fast either.',
    'Structural defense is the anchor: NATO members are contractually committed to 2% GDP spend; US procurement is locked into multi-year platforms (Patriots, AMRAAMs, F-35 sustainment, GBSD). The Raytheon Missiles & Defense segment alone represents multi-decade backlog. GTF headwind is timing, not structural: the inspection program is fully funded ($6B+), execution is underway, and completion unlocks $1–2B/yr in deferred aftermarket revenue. FCF growing from $7.2B now to $10B+ by FY2030 as margins normalize. The balance sheet is deleveraging — investment-grade credit at 3.1× is manageable on defense contract visibility. RS Rating 84 rising reflects institutional sponsorship without the overcrowding risk of AI-momentum names.',
    'Bull mechanics: the defense super-cycle is the most durable in decades — geopolitical necessity + European rearmament + Middle East procurement + Indo-Pacific deterrence all converge simultaneously. AMRAAM and Patriot consumption in Ukraine drives a decade of backlog replacement. Pratt & Whitney GTF resolution creates a "synthetic earnings recovery" that doesn\'t require new business — just execution of existing contracts. Commercial aerospace fleet renewal (7,000+ aircraft on order globally) creates a 20-year aftermarket stream from every new engine delivered today. At $315 (+12% annualized), RTX would trade at approximately 28× normalized EPS — premium but justified by franchise quality and visible 10-year EPS compounding. The asymmetric setup: downside ($145 bear) is -19%, upside ($315 bull) is +75%; expected value clearly positive.',
  ],

  burry: {
    sbc: 600,
    gaapNi: 7300,
    buyback: 2200,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 8,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC $600M vs. GAAP NI $7.3B = 8% naive ratio. Defense contractor compensation is structurally cleaner than software peers. Annual buybacks ~$2.2B (from $10B+ cumulative since merger) = 3.7× SBC, providing meaningful offset. Low stock appreciation (beta 0.30) further suppresses MTM amplification. Burry-adjusted target ~$211.',
  },

  debtSafety: {
    netDebt: 32100,
    ebitda: 10500,
    capexToOcf: 0.19,
    interestCoverage: 5.2,
    fy: 'FY25',
    note: 'Net Debt $32.1B / EBITDA ~$10.5B = 3.06× — elevated from the 2020 Raytheon-UTC merger. Step-3 checks: CapEx/OCF ~19% (passes), interest coverage ~5.2× (passes). Altman Z omitted — distorted by $57B merger-era goodwill/intangibles; classic Z-score overstates risk for post-merger defense conglomerates with investment-grade credit. Leverage is declining and FCF trajectory is improving.',
  },
});

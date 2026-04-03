import { defineStock } from './defineStock';

export const VST = defineStock({
  ticker: 'VST',
  name: 'Vistra Corp',
  sector: 'Utilities / Power',
  themeColor: '#facc15',
  currentPrice: 157,
  fairPriceRange: '$179 - $402',
  shares0: 339.0,
  rev25: 19600,
  fcfMargin25: 0.157,
  taxRate: 0.21,
  cash: 620,
  debt: 17500,
  beta: 1.43,
  costDebt: 0.056,
  modelType: 'EPS_PE',
  baseEps: 10.0,
  rsRating: 38,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  ratingOverride: 'BUY',
  updatedOn: '07/03',
  strategicNarrative: "Q4 2025 record year: $5.912B adj EBITDA ($4.29B gen + $1.62B retail), $3.592B adj FCF — both above guidance midpoints. 2026E confirmed at $6.8–7.6B EBITDA. Step-change in contracted revenue: 3.8 GW nuclear PPAs signed (Amazon 20yr/1,200MW Comanche Peak; Meta 20yr/2,609MW PJM operating + uprates). ~50% of adj EBITDA from contracted/retail stable sources by 2027. Cogentrix (5,500MW modern gas, ~$730/kW net of tax) adds mid-single-digit AFCF/share accretion in 2027. Management projects >$12.5 AFCF/share 2026 → ~$16 (Cogentrix + Meta operating PPAs + $5B buybacks) → $22–25 long-term as all remaining cash deployed through 2030.\n\nStructural shift underway: from pure merchant power to hybrid contracted + merchant. $10B+ cash through 2027; $3B+ available for allocation after growth and returns. Target net debt/EBITDA ~2.3x by 2027. Buybacks accelerated Jan–Feb on price weakness; $1.8B authorization remaining.\n\nRisk: ~50% earnings still market-price dependent; Cogentrix integration; nuclear uprate capex majority post-2028; stock hit $90 in 2025 before recovering. Data center load impact on markets not meaningful until late 2027/early 2028. At $171, trading at ~14x 2026 AFCF guidance — contracted earnings derisk and buyback support the floor. Verdict: BUY — improved earnings quality and signed long-term contracts make prior HOLD too conservative.",


  analystConsensus: { rating: 'Buy', targetLow: 97, targetMedian: 230, targetHigh: 293, numAnalysts: 10 },
  revGrowth: [
    [0.08, 0.06, 0.05, 0.04, 0.04],
    [0.17, 0.12, 0.09, 0.07, 0.06],
    [0.17, 0.15, 0.12, 0.10, 0.09],
  ],
  fcfMargin: [
    [0.14, 0.14, 0.14, 0.13, 0.13],
    [0.16, 0.17, 0.18, 0.19, 0.20],
    [0.17, 0.19, 0.21, 0.23, 0.24],
  ],
  exitMultiple: [10, 13, 16],
  bbRate: [0.015, 0.022, 0.03],

  epsCagr: [5, 12, 18],
  exitPE: [14, 17, 20],
  prob: [15, 45, 40],

  desc: [
    'Power prices crash and Cogentrix integration disappoints. Contracted nuclear PPAs provide a floor, but ~50% merchant exposure bleeds earnings. ' +
      'Earnings grow at only 5% annually with multiple compressing to 14x. Returns come in flat-to-negative from current entry.',
    'Power prices normalize in a stable range. Cogentrix closes on schedule with mid-single-digit AFCF accretion. ' +
      'Meta and Amazon PPAs ramp as planned, pushing ~50% of EBITDA into contracted/stable sources. Earnings compound at 12% with 17x exit on improved visibility. ' +
      'Buybacks at ~$1B/yr continue to be a core per-share driver. Returns come in around 12–14% annualized — approaching but not exceeding the 15% threshold.',
    'Tight power markets amplify contracted earnings through 2027–28 data center ramp. All remaining PPAs (Beaver Valley, Comanche Peak uprate) get signed. ' +
      'Cogentrix delivers high-single-digit accretion. Cash deployed to buybacks drives AFCF/share toward $22–25 by 2030 as guided. ' +
      'Market re-rates to 20x on contracted earnings quality. This is the $400+ path, and it now looks achievable given signed deal flow.',
  ],

  bullMaOptVal: 158.00 * 339.0 * 0.07,
});

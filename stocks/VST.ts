import { defineStock } from './defineStock';

export const VST = defineStock({
  ticker: 'VST',
  name: 'Vistra Corp',
  sector: 'Utilities / Power',
  themeColor: '#facc15',
  currentPrice: 141.9,
  fairPriceRange: '$180 - $460',
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
  updatedOn: '05/14',
  lastReportTag: 'Q1 2026',
  strategicNarrative: "Q1 2026 print: record Q1 adj EBITDA of $1.494B (+20% YoY, +85% vs Q1 24) — $1.426B generation + $68M retail. 2026 guidance ($6.8–7.6B EBITDA) and 2027 midpoint reaffirmed, and neither includes Cogentrix or the Meta PPA uplift. Generation team executed flawlessly through Winter Storm Fern (gas fleet 97% commercial availability, nuclear 100%); Martin Lake Unit 1 back online late Q1.\n\nDeal flow accelerating: 5,500 MW Cogentrix gas portfolio acquisition tracking to close 2H 26; long-term Meta PPAs at PJM nuclear sites (~2,600 MW) signed. Customer engagement remains 'as high as we've ever seen' per Jim Burke — diverging from CEG's PJM-pause commentary. Bilateral discussions continue in parallel with PJM rulemaking; ~3.2 GW of nuclear at Beaver Valley + Comanche Peak still available for long-term contracts. 4,500 MW of organic development in flight (renewables, coal-to-gas conversions, Permian gas, PJM nuclear uprates with Meta), majority online by 2028. Uprate optionality: >200 MW Comanche Peak + ~300 MW at PJM gas sites.\n\nCapital allocation firing: $525M buybacks in first 4 months of 26 + $75M dividend = ~$600M returned YTD. $1.475B authorization remaining; 169M shares retired since Nov 21 at ~$37 avg. Fitch upgrade to IG (joining S&P) triggered fallaway provisions, releasing liens on senior secured debt. $10B+ cash through 27 → ~$3B to equity, ~$4B to growth (Cogentrix, Permian, PJM nuclear uprate, Oak Hill 2), ~$3B unallocated. Mid-teens levered return threshold maintained.\n\nLoad-growth thesis intact: ERCOT 5–6% annual through 2030, PJM 2–3% — Vistra's view is below ISO forecasts but realistic about physical pace. Risk: ~50% of earnings still market-price dependent; Cogentrix integration; ERCOT forwards softened on mild Q1 weather; data center load impact on markets not meaningful until late 27/early 28. Verdict: BUY — improved earnings quality, signed long-term contracts, accelerated capital returns, and IG balance sheet justify premium framework.",


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

import { defineStock } from './defineStock';

export const UBER = defineStock({
  updatedOn: '06/24',
  lastReportTag: 'Q1 FY26',
  ticker: 'UBER',
  name: 'Uber Technologies',
  sector: 'Mobility & Delivery Platform',
  themeColor: '#22c55e',
  currentPrice: 73.85,
  fairPriceRange: '$45 - $200',
  shares0: 2080,           // ~2.08B diluted shares post Q1 FY26 $3B buyback
  rev25: 52000,            // FY2025 actual revenue $52.0B (+18% YoY)
  fcfMargin25: 0.19,       // FY2025 FCF $9.8B / $52.0B rev = 18.8%
  taxRate: 0.21,
  cash: 7100,              // ~$7.6B end FY2025 less net Q1 FY26 cash usage
  debt: 9500,
  beta: 1.35,
  costDebt: 0.065,
  rsRating: 22,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',

  reasonsToBuy: [
    'Uber One\'s loyalty ecosystem drives member spend multiples above non-members with rising retention',
    'Insurance savings are flowing through to lower prices and already accelerating trip growth in key markets',
    'AV partnerships make Uber the aggregator beneficiary of autonomous vehicles rather than their victim',
    'Suburban and sparse-market expansion adds a fast-growing second engine beyond the mature urban core',
    'FCF yield at current prices is exceptional for a platform compounding gross bookings at twenty-plus percent',
  ],

  risksToBuy: [
    'RS rating in the low twenties signals aggressive institutional distribution that must reverse first',
    'AV players like Waymo could bypass the aggregator model with direct consumer apps at scale',
    'Personal AI agents could abstract away the Uber app through direct API integrations with rivals',
    'UK tax-law-style regulatory changes could structurally suppress revenue growth vs gross bookings globally',
    'Elevated AI and headcount spend could compress margins during any revenue growth deceleration',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 70, targetMedian: 104, targetHigh: 150, numAnalysts: 45 },

  revGrowth: [
    [0.07, 0.06, 0.06, 0.05, 0.05],   // Bear: AV disruption + competition limits growth
    [0.14, 0.12, 0.11, 0.10, 0.09],   // Base: Q1 FY26 trajectory sustains, insurance tailwind
    [0.18, 0.16, 0.14, 0.13, 0.12],   // Bull: Uber One + hotels + AV leverage + suburban
  ],

  fcfMargin: [
    [0.15, 0.14, 0.14, 0.13, 0.13],   // Bear: competition + tech spend erode margins
    0.18,                               // Base: stable at FY2025 level; insurance savings offset AI spend
    [0.20, 0.22, 0.24, 0.25, 0.26],   // Bull: insurance + operating leverage + AV near-zero marginal cost
  ],

  exitMultiple: [11, 15, 17],

  desc: [
    'AV disruption materializes: Waymo and Tesla Robotaxi capture 15-20% trip share in top-10 cities by 2028. Personal AI agents abstract away app usage, eroding retention. ' +
      'Uber One growth stalls at 60M as benefit value proposition weakens. Revenue growth decelerates to 5-7%; FCF margins compress as Uber invests to defend position. ' +
      'Insurance savings partially offset by re-investment, yield shrinks. Market reprices at 11× EBITDA. 5-yr target: ~$43 (-39% from $70), roughly -9% annualized.',
    'Q1 FY26 trajectory sustains. Insurance savings ($200-400M annually) passed to consumers → trip growth holds at 20%+. Uber One scales to 70M members; cross-platform Delivery adoption drives incremental frequency. ' +
      'AV adds trips rather than cannibalizes — utilization premium on Uber\'s network keeps AV partners committed. Revenue compounds at ~11% annually; FCF margin holds at ~18-19% with AI spend offset by headcount discipline. ' +
      '5-yr target: ~$104 (+48% from $70), roughly +8% annualized — consistent with analyst consensus median.',
    'Insurance savings deliver $500M+ annually, driving sustained U.S. Mobility acceleration. Suburban expansion creates a durable second growth leg; sparse market trips compound at 25%+ for 3+ years. ' +
      'Hotels + travel reaches $10B+ annual gross bookings by FY2030 (Uber Reserve trajectory extrapolated). Uber One hits 100M+ members; cross-platform usage crosses 50% of gross bookings. ' +
      'AV partner network (30→100+ partners) delivers incremental high-margin trips at near-zero variable cost by FY2029. FCF margins expand to 25-26% on operating leverage. ' +
      '5-yr target: ~$198 (+181% from $70), roughly +23% annualized.',
  ],

  thesis: [
    'Bear mechanics: AV tech improves faster than expected; Waymo price cuts draw price-sensitive segments. Tesla Robotaxi launch at scale in 3-5 key markets erodes Uber\'s driver supply economics. ' +
      'Personal AI agents (Apple Siri, OpenAI Operator, Google Gemini) get deep integrations with direct booking APIs from Lyft or DoorDash, bypassing Uber\'s app. ' +
      'UK tax model change spreads to other jurisdictions, structurally suppressing revenue growth vs gross bookings. ' +
      'AI spend increase (CFO disclosed re-upped budget) + headcount pressure = margin compression during a revenue growth slowdown. Multiple contracts from 17x to 11x EBITDA on lower growth expectations.',
    'Q1 FY26 shows the base case is already executing. Data points: Trips +20%, Gross Bookings +21% CC, Non-GAAP EPS +44%, record $3B buyback in a single quarter. ' +
      'Insurance savings explicitly quantified ("hundreds of millions this year") and already flowing: L.A. trip growth accelerating, California market outperforming rest of U.S. ' +
      'Uber One (+50% YoY to 50M) creates a structural retention moat: >50% of bookings, 3x spend per member. This is not promotional spend — it\'s genuine ecosystem lock-in. ' +
      'AV is additive not subtractive: in every Waymo-active market, Uber\'s category position has held or improved. The 10x YoY growth in AV trips on Uber\'s network validates the aggregator model. ' +
      'FCF $9.8B (+42%) on $52B revenue = 18.8% margin at scale. At $70, market cap $148B = 15x FCF. This is cheap for a 20%+ gross bookings growth platform.',
    'Bull case is an operating leverage story with three accelerants: (1) Insurance: every $100M in annual insurance savings that passes through to lower prices drives measurable elasticity — L.A. is the proof point, now scaling nationally. ' +
      '(2) Uber One network effects: hotels → more members → more bookings → more partners → better inventory. Reserve and hotels prove Uber can own planned travel, not just on-demand. ' +
      '(3) AV platform: Uber\'s 30+ partner strategy vs Waymo\'s 1P model is defensible at scale. AV trips have higher utilization, higher take rates, and near-zero driver marginal cost. By FY2028-2030, AV trip share on Uber\'s network could be 15-20% of trips at structurally higher margins. ' +
      'FCF expands to 25%+ margins (from 19% today) without multiple expansion needed: at 17x EBITDA and $198B FCF in FY2030, target price exceeds $200. Santan Hertz Hertz + Santander financing ecosystem makes AV scaling capital-light for Uber.',
  ],

  termGrowth: [0.015, 0.025, 0.030],
  bbRate: [0.010, 0.015, 0.025],
  ebitdaProxy: [0.17, 0.24, 0.32],
  bullMaOptVal: false,

  burry: {
    sbc: 1300,
    gaapNi: 5100,         // Normalized FY2025 NI ex. $5B one-time Netherlands DTA release
    buyback: 3000,        // FY2025 gross buybacks est. ~$3B (Q1 FY26 alone was a record $3B)
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 40,
    overstatementSource: 'estimated',
    note: 'FY2025 GAAP NI was $10.1B but includes $5.0B one-time DTA release (Netherlands); normalized NI ~$5.1B used here. SBC/normalized NI = 25.5%. 3-yr return ~2.0× ($36→$70) → MTM 2.0× amplifier → 51%. Buyback offset: $3B buyback / $1.3B SBC = 2.3× → -13% → net ~38%, rounded to 40%. Critical tier but buyback program nearly offsets SBC dilution — effective real dilution is manageable.',
  },

  debtSafety: {
    netDebt: 2400,
    ebitda: 8700,
    fy: 'FY25',
    note: 'Net debt ~$2.4B (gross debt $9.5B − cash $7.1B). FY2025 adj. EBITDA $8.7B → leverage 0.27×. GREEN — effectively unlevered platform with $9.8B FCF. The $3B Q1 FY26 buyback reduced cash buffer but leverage remains minimal.',
  },
});

import { defineStock } from './defineStock';

export const SHOP = defineStock({
  ticker: 'SHOP',
  name: 'Shopify',
  sector: 'E-commerce Infrastructure / Payments',
  themeColor: '#95BF47',
  currentPrice: 114.18,
  fairPriceRange: '$85 - $155',
  shares0: 1307,
  rev25: 11600,
  fcfMargin25: 0.17,
  taxRate: 0.18,
  cash: 8500,
  debt: 1100,
  beta: 2.10,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 1.82,       // FY2026E non-GAAP EPS — raised to Street consensus (~$1.82) on 06/26 spot-check. Q1 2026 (qtr end Mar 31): rev $3.17B +34% YoY, adj EPS $0.36 (beat), GMV $101B +35%, FCF ~15% margin. Base CAGR (28%) + exit P/E (45) unchanged — already aligned with consensus.
  rsRating: 20,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  updatedOn: '06/30',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-26',

  reasonsToBuy: [
    'Universal Commerce Protocol co-developed with Google and adopted by Amazon, Meta, and Microsoft creates near-unbreakable platform lock-in',
    'Only commerce platform powering selling inside ChatGPT, Copilot, and Google from a single system',
    'B2B GMV growing at roughly double the headline rate, opening a massive underpenetrated market',
    'SBC dramatically reformed — buybacks now exceed SBC issuance, with minimal net dilution over five years',
    'GAAP profitable with genuine operating leverage, unlike most high-growth software peers',
  ],

  risksToBuy: [
    'Revenue deceleration from Q1\'s exceptional growth rate could trigger severe multiple compression at current valuation',
    'Amazon, Walmart Marketplace, and TikTok Shop intensify direct competition for SMB merchant acquisition',
    'Stripe, Adyen, and Meta-native checkout compete on Shopify Payments take-rate, compressing merchant solutions margins',
    'Premium valuation leaves no margin of safety — the entire stock price is justified by sustained high growth',
    'Agentic AI tools from competing platforms could commoditize the AI commerce edge Shopify currently enjoys',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 90, targetMedian: 135, targetHigh: 175, numAnalysts: 45 },

  revGrowth: [
    [0.22, 0.14, 0.10, 0.09, 0.08], // Bear: decelerates sharply after Q1 momentum fades
    [0.29, 0.20, 0.17, 0.14, 0.12], // Base: Q1 +34% / Q2 guided high 20s, normalizes 2027+
    [0.33, 0.26, 0.21, 0.17, 0.14], // Bull: agentic + B2B + international sustain acceleration
  ],

  fcfMargin: [
    [0.17, 0.17, 0.18, 0.18, 0.19], // Bear: margins hold but don't expand
    [0.18, 0.20, 0.22, 0.23, 0.24], // Base: gradual operating leverage continues
    [0.20, 0.23, 0.26, 0.28, 0.30], // Bull: payments + AI productivity drive margin expansion
  ],

  exitMultiple: [25, 40, 55],

  desc: [
    'Q1 2026 momentum fades as macro headwinds dampen SMB formation and Amazon intensifies competition. ' +
      'GenAI agents commoditize Shopify\'s AI edge as competing platforms close the gap. GMV growth slows to low teens; Shopify Payments take-rate compresses. ' +
      'Revenue decelerates despite Q1 tailwind; multiple compresses from ~60× to ~30× as market reprices SHOP toward mature-platform status. EPS growth ~14% from $1.68 base.',
    'Shopify sustains the Q1 2026 trajectory: FY2026 revenue ~30% growth followed by gradual normalization. B2B, offline and international each add durable growth vectors. ' +
      'UCP becomes the de-facto agentic commerce standard; Shopify Payments penetration climbs past 70%. Operating margins expand from ~17% toward 24% by FY30. ' +
      'EPS compounds at ~28% from the $1.68 FY2026 base. Multiple de-rates 60× → 45× through earnings growth. Solid but valuation-dependent returns.',
    'Agentic commerce inflects growth above 30% for multiple years. UCP network effects lock in merchants across ChatGPT, Copilot and Google surfaces. ' +
      'B2B scales to $2B+ revenue, Shop Pay becomes the Internet\'s default checkout outside the US, international sustains 45%+ GMV growth. ' +
      'FCF margin reaches 30%+ by FY30. EPS compounds at ~35% from $1.68 base. Multiple holds 60× given platform position.',
  ],

  thesis: [
    'E-commerce TAM saturates. Amazon Multi-Channel Fulfillment + Walmart Marketplace + TikTok Shop erode SMB acquisition. Q1 2026 momentum proves transitory. ' +
      'Merchant solutions take-rate compresses as Stripe, Adyen and Meta-native checkout compete. Operating leverage stalls. ' +
      'At ~61× forward P/E on $1.68 FY2026 EPS, even modest deceleration from Q1\'s 34% triggers severe multiple compression. Growth is the entire valuation justification.',
    'SHOP\'s flywheel keeps spinning off the Q1 2026 base. UCP becomes the agentic commerce standard; Shopify is embedded in ChatGPT/Copilot/Google as the de-facto checkout. ' +
      'Shop Pay approaches 70%+ GMV penetration. Operating leverage delivers 200-300 bps/yr of margin expansion. Buybacks scale as FCF compounds. ' +
      'Quality commerce-infrastructure compounder — returns reasonable from $103 entry if 28% EPS CAGR materializes.',
    'AI-driven entrepreneurship inflection: Sidekick + agentic tools make starting a commerce business radically easier, expanding the addressable merchant base. ' +
      'UCP network effects lock in Shopify at the center of all AI-native commerce. International + B2B cross the compound threshold simultaneously. ' +
      'Operating margins reach 28%+ by FY30. EPS compounds at 35%+ from $1.68 base. Multiple holds 60×. Strong annualized returns from current entry.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.005, 0.010, 0.015],
  ebitdaProxy: [0.18, 0.25, 0.32],
  bullMaOptVal: false,

  epsCagr: [14, 28, 35],
  exitPE: [28, 45, 60],
  prob: [20, 45, 35],

  driverOverrides: [
    {},
    {
      revPrem: [0.015, 0.015, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.02, 0.02],
    },
    {
      revPrem: [0.025, 0.02, 0.015, 0.015, 0.01],
      fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.025],
    },
  ],

  debtSafety: {
    netDebt: -7400,
    ebitda: 2200,
    fy: 'FY25',
    note: 'Net cash — $8.5B cash vs $1.1B debt = $7.4B net cash. Pristine balance sheet; no leverage concern.',
  },

  burry: {
    sbc: 449,
    gaapNi: 1500,
    buyback: 491,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 25,
    overstatementSource: 'estimated',
    note: 'OK boundary — Burry cited SHOP in his Cassandra Unchained piece, but the reputation was earned in 2021-2022 era when SBC peaked at $615M (FY23) and the company was GAAP loss-making. TIKR FY25 actuals show a transformed profile: SBC just $449M (3.8% of revenue — the lowest of any Burry-cited name and lower than many Pristine industrials in our coverage). Buybacks $491M LTM just initiated, already > SBC issuance. Diluted shares 1,274M (FY21) → 1,307M (LTM) = +2.6% over 5y (+0.5%/yr) — minimal net dilution. GAAP operating margin 17%, up from -8.5% in FY22. SHOP deserves to be reclassified out of the deeply-Tragic Burry-cited cohort (DDOG/ZS/AXON/CRWD) and into the reformed-compounder cohort with NOW and META.',
  },
});

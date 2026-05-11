import { defineStock } from './defineStock';

export const SHOP = defineStock({
  ticker: 'SHOP',
  name: 'Shopify',
  sector: 'E-commerce Infrastructure / Payments',
  themeColor: '#95BF47',
  currentPrice: 115,
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
  baseEps: 1.30,
  rsRating: 58,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '05/10',

  strategicNarrative:
    "Shopify is the cleanest 'Burry-cited' stock by a wide margin. The reputation for excess dilution was earned 2021-2022 era; the current profile is genuinely reformed. FY25 revenue $11.6B (+30% YoY), LTM $12.4B sustaining ~22% growth at meaningful scale. GAAP operating margin LTM 17.1% (up from -8.5% in FY22) — real operating leverage delivered, not promised. " +
    "Commerce flywheel: merchant solutions revenue (payments, capital, fulfillment) now drives most growth via attach to the subscription base. GenAI commerce tools (Sidekick, agentic shopping) compound the platform position. International expansion + B2B + offline POS all add growth vectors. " +
    "Capital allocation now genuinely shareholder-friendly: " +
    "SBC $449M FY25 = just **3.8% of revenue** (lowest of any Burry-cited name; better than NOW 14.6%, META 10.4%). Buybacks $491M LTM just started — slightly exceed SBC issuance. Diluted shares 1,274M (FY21) → 1,307M (LTM) = **+2.6% cumulative / +0.5%/yr** — minimal net dilution. SBC/CFO 22% (vs ZS 66%, DDOG 70%, AXON 408%). " +
    "Caveat: SHOP's gross margin (48%) is lower than pure SaaS peers because payments/merchant services are a real cost-of-sale, not a software-only model. This is a commerce-infrastructure hybrid, not classic SaaS. " +
    "Valuation: at $115 / ~$150B market cap on $1.30 forward non-GAAP EPS, forward P/E ~88×. Forward P/S ~12×. Premium multiple, but for a 22% grower with 17% FCF margin and real operating leverage, the multiple is at least defensible vs DDOG/ZS premium for slower growers with no GAAP profits. " +
    "Bull (~35%): Agentic commerce + Shop Pay network + international expansion sustains 22%+ growth, margins inflect to 25% → $155. Base (~45%): Growth normalizes to 18-20%, margins to 22% → $115-130. Bear (~20%): E-commerce decelerates + Amazon competition intensifies + GenAI commoditizes Shopify's value-add → $85. " +
    "BUY-leaning HOLD — Shopify deserves to be reclassified from 'Burry-cited dilution story' to 'reformed quality compounder.' Genuine net buybacks + low SBC + GAAP profitable + 22% growth is a rare combination. Trust the recent capital allocation trajectory.",

  analystConsensus: { rating: 'Strong Buy', targetLow: 90, targetMedian: 135, targetHigh: 175, numAnalysts: 45 },

  revGrowth: [
    [0.14, 0.12, 0.10, 0.09, 0.08], // Bear: e-commerce decelerates + Amazon competition
    [0.22, 0.19, 0.16, 0.14, 0.12], // Base: continued execution, normalizes
    [0.27, 0.24, 0.20, 0.17, 0.14], // Bull: agentic commerce + international + B2B inflection
  ],

  fcfMargin: [
    [0.17, 0.17, 0.18, 0.18, 0.19], // Bear: margins hold but don't expand
    [0.18, 0.20, 0.22, 0.23, 0.24], // Base: gradual operating leverage continues
    [0.20, 0.23, 0.26, 0.28, 0.30], // Bull: payments + AI productivity drive margin expansion
  ],

  exitMultiple: [25, 40, 55],

  desc: [
    'E-commerce growth decelerates as the post-COVID adjustment normalizes and Amazon intensifies competition for SMB merchants. ' +
      'GenAI agents commoditize SHOP\'s differentiated features as every commerce platform adds AI-native tools. ' +
      'GMV growth halves; payments take-rate compresses. Growth decelerates to 10-12% by FY28. Multiple compresses from 88× to 30× as market reprices SHOP as a mature commerce platform. ' +
      '5yr target ~$85-95, roughly -4% to -2% annualized as multiple contraction overwhelms EPS growth.',
    'Shopify continues compounding as the de-facto SMB commerce OS. Merchant solutions revenue (payments, capital, fulfillment) grows faster than subscription. ' +
      'Operating margin expands from 17% to 24% by FY30. Buyback program scales to $1B+/yr as cash flow grows. Share count nearly flat throughout. ' +
      'EPS compounds at ~28% from $1.30 base. Multiple compresses 88× → 50× through earnings growth. 5yr target ~$130, ~3% annualized.',
    'Agentic commerce + Shop Pay network effects drive multi-year growth acceleration. International expansion (especially Europe + LatAm) adds 30%+ growth contribution. B2B commerce scales to $1B+ revenue. ' +
      'Operating leverage compounds: FCF margin to 30%, operating margin to 28%. SBC stays at 3-4% of revenue indefinitely. Buybacks accelerate. ' +
      'EPS compounds at 35% from $1.30 base. Multiple holds 55× given platform position. 5yr target ~$155, ~6-8% annualized.',
  ],

  thesis: [
    'E-commerce TAM saturates. Amazon Multi-Channel Fulfillment + Walmart Marketplace + TikTok Shop all eat into SMB acquisition. SHOP\'s share of new commerce launches plateaus. ' +
      'Merchant solutions take-rate compresses as payments alternatives (Stripe, Adyen) compete. Operating leverage expansion stalls at 18-20%. ' +
      'At 88× forward P/E, even modest growth deceleration triggers severe multiple compression. The capital allocation story is good, but the growth story is the valuation justification.',
    'SHOP\'s flywheel keeps spinning: more merchants → more payments volume → more capital lending → more fulfillment → more advanced commerce features → more merchants. Network effects compound. ' +
      'Shop Pay (consumer side) becomes a meaningful competitor to PayPal/Apple Pay. Agentic AI commerce tools drive new revenue tiers. ' +
      'Operating leverage continues delivering 200-300bps/yr of margin expansion. Buybacks scale as cash grows. Quality commerce-infrastructure compounder at full price — returns ~3% from $115 entry.',
    'AI-driven commerce inflection: Sidekick + Shop AI agents make starting and running a commerce business 10× easier, dramatically expanding the addressable merchant base. Agentic shopping experience drives consumer adoption of Shop Pay. ' +
      'International expansion accelerates as the GenAI translation layer removes language barriers for global commerce. B2B commerce scales as the network effect crosses over. ' +
      'Operating margins reach 28% by FY30. EPS compounds at 35%+. Multiple holds 55× given the platform position. 6-8% annualized returns from current entry.',
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

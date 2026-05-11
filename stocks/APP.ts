import { defineStock } from './defineStock';

export const APP = defineStock({
  ticker: 'APP',
  name: 'AppLovin Corporation',
  sector: 'Ad-Tech / AI Monetization',
  themeColor: '#f97316',
  updatedOn: '05/11',
  currentPrice: 478.42,
  fairPriceRange: '$310 - $836',
  shares0: 340,
  rev25: 5480,
  fcfMargin25: 0.72,
  taxRate: 0.127,
  cash: 2500,
  debt: 3500,
  beta: 2.22,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 9.75,
  rsRating: 21,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "AppLovin is the highest-margin ad-tech engine in the market — 84% EBITDA margin, 95% incremental flow-through, $4B FCF. " +
    "Post-earnings: CAC/LTV 30-day breakeven + self-serve GA 1H'26 + GenAI creative tools signal a scalable growth loop beyond gaming. " +
    "The problem: margin expansion is exhausted at 82-84% EBITDA, so from here growth = revenue growth. RS 58 (from 75) reflects weakening momentum after the selloff. " +
    "If self-serve + e-comm broaden the advertiser base, this is a 15%+ compounder. If ad cycle breaks, the leverage that created 84% margins works in brutal reverse. " +
    "60-65% probability of 15%+ CAGR — strong execution story, cyclical and priced for it. " +
    "Burry full-SBC adjustment (estimated): 50% overstatement (Critical) — real owner profit ~50% of GAAP; apply discount when comparing multiples to peers.",


  analystConsensus: { rating: 'Strong Buy', targetLow: 465, targetMedian: 705, targetHigh: 860, numAnalysts: 26 },
  revGrowth: [
    [0.20, 0.12, 0.10, 0.10, 0.08],
    [0.25, 0.18, 0.16, 0.15, 0.14],
    [0.30, 0.25, 0.22, 0.20, 0.18],
  ],
  fcfMargin: [
    [0.68, 0.65, 0.62, 0.60, 0.58],
    [0.72, 0.72, 0.71, 0.70, 0.70],
    [0.72, 0.74, 0.75, 0.76, 0.76],
  ],
  exitMultiple: [16, 22, 28],
  desc: [
    'Advertising budgets get cut and competition from Meta erodes market share. Revenue growth drops to the low teens. ' +
      'At 82-84% EBITDA margins, there is no room to expand so any revenue miss flows straight to the bottom line. ' +
      'The self-serve rollout disappoints and the e-commerce vertical fails to scale. The multiple compresses to 18x, leaving near-flat returns from current entry.',
    'Q1 guidance validates the sustained growth engine. Revenue compounds at roughly 18% with EBITDA margins holding above 80%. ' +
      'The self-serve platform drives advertiser broadening, with customer acquisition payback scaling efficiently. Buybacks add 1-2% annually. ' +
      'The P/E naturally compresses from 43x to 22x through earnings growth, meaning returns are driven by EPS expansion rather than multiple expansion. ' +
      'Earnings grow at roughly 31% annually, delivering around 15% annualized stock returns.',
    'Self-serve, e-commerce, and GenAI creative tools unlock a meaningful expansion of the addressable market. Revenue sustains 25%+ growth. ' +
      'Advertiser diversity improves conversion rates significantly, and MAX becomes the default auction layer for mobile monetization. ' +
      'Massive free cash flow funds aggressive buybacks. The market re-rates the business from cyclical to structural, ' +
      'with earnings compounding at roughly 37% annually and delivering over 20% annualized returns.',
  ],
  thesis: [
    'Ad cycle turns down — macro cuts budgets. Meta captures no-ID traffic, TikTok takes share. ' +
      'Margin at 82-84% EBITDA has zero room to expand — revenue miss flows straight to EPS. ' +
      '"Black box" narrative keeps institutional discount. At $460, stock already prices strong execution. ' +
      'Self-serve qualified leads → go-live at 57% shows conversion bottleneck (lack of creatives for format).',
    'Q1 guide (+5-7% QoQ despite seasonality) validates growth engine intact. ' +
      'Self-serve GA 1H26 broadens advertiser base. CAC/LTV 30-day breakeven = scalable growth loop. ' +
      'MAX lock-in (>50% of publisher UA spend) sustains moat. Platform broadening reduces cyclicality. ' +
      'GenAI creative tools remove key bottleneck. Buybacks + $3.28B auth provide EPS floor.',
    'AppLovin becomes the default monetization + creative platform for mobile ecosystem. ' +
      'Self-serve + GenAI tools + e-comm solve advertiser diversity problem → conversion rate expansion. ' +
      'Network effects compound: more advertisers → better auction → higher publisher ROAS → more publishers. ' +
      'CTV, web, lead-gen open new TAM. $4B+ FCF funds aggressive buybacks. ' +
      'Meta competition expands pie (bid density) rather than taking share.',
  ],

  epsCagr: [20, 31, 37],
  exitPE: [18, 22, 25],
  prob: [20, 45, 35],

  bbRate: [0.01, 0.02, 0.03],
  ebitdaProxy: [0.70, 0.78, 0.82],
  bullMaOptVal: false,

  burry: {
    sbc: 210,
    gaapNi: 3420,
    buyback: 2584,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 25,
    overstatementSource: 'estimated',
    note: 'Ok (major downgrade from original Tragic 50% after TIKR refresh). FY25 TIKR actuals dramatically cleaner than estimated: SBC just $210M (was $660M est, 3× too high), buybacks $2,584M (was $1,000M est, 2.5× too low). Key metrics put APP in elite-compounder territory: SBC just 3.8% of revenue (matches FICO 7%, SHOP 3.8% range), Buyback/SBC ~12× (matches FICO 12× — highest tier), diluted share count actually **-0.7% over 5 years** (342.76M FY21 → 340.43M LTM). SBC = 5.2% of CFO — among the cleanest in our coverage. The ~16× MTM amplifier (stock $30 → $469) suggests Burry-style methodology should apply some haircut, but aggressive buybacks at current prices are literally paying the MTM cost upfront — that\'s the right way to handle dilution. 77% operating margin + 73% FCF margin at 70% revenue growth is genuinely extraordinary. APP should be classified alongside META/SHOP/NOW as a reformed-compounder, not the broken-SaaS cohort.',
  },
});

import { defineStock } from './defineStock';

export const APP = defineStock({
  ticker: 'APP',
  name: 'AppLovin Corporation',
  sector: 'Ad-Tech / AI Monetization',
  themeColor: '#f97316',
  updatedOn: '06/11',
  lastReportTag: 'Q1 2026',
  currentPrice: 478.57,
  fairPriceRange: '$310 - $836',
  shares0: 336,
  rev25: 7500,          // FY2026 estimate: Q1 $1.84B + Q2 guide $1.93B + H2 ~$3.8B
  fcfMargin25: 0.68,    // FY2026: FCF guide ~75% of EBITDA (84-85%) ≈ 63-64% of revenue
  taxRate: 0.127,
  cash: 2760,           // Q1 2026 end: $2.76B
  debt: 3500,
  beta: 2.22,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 14.50,       // FY2026 estimate: ~$6.3B EBITDA × 75% FCF conv ÷ 333M shares ≈ $14-15
  rsRating: 85,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'AXON AI engine delivers mobile advertisers measurably better ROAS, creating compounding lock-in as spend scales up.',
    'Best-in-class EBITDA margins with a high-fixed-cost model mean every incremental revenue dollar is nearly pure profit.',
    'Self-serve platform launch opens the long tail of SMB advertisers, dramatically expanding the potential customer base.',
    'Lead-gen expansion into auto, health, and fintech diversifies away from pure gaming and reduces cyclicality.',
    'Aggressive buyback program with share count effectively flat demonstrates rare capital discipline at this growth rate.',
  ],

  risksToBuy: [
    'Revenue growth IS the valuation — any deceleration will compress the multiple severely given the premium entry price.',
    'Algorithmic black-box nature keeps institutional buyers cautious and makes advertiser trust fragile during any miss.',
    'Meta\'s competing AI ad platform is expanding the bid density pie but also intensifying competition for the same budgets.',
    'Self-serve conversion rate must scale efficiently or the TAM expansion thesis stalls at the onboarding bottleneck.',
    'Ad spend is highly cyclical — a macro slowdown or consumer pullback would hit revenue with no cost cushion to absorb it.',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 465, targetMedian: 705, targetHigh: 860, numAnalysts: 26 },
  revGrowth: [
    [0.15, 0.12, 0.10, 0.10, 0.08],  // Bear: self-serve disappoints, consumer stalls
    [0.22, 0.18, 0.16, 0.15, 0.14],  // Base: self-serve ramps, consumer + lead-gen expand
    [0.30, 0.27, 0.23, 0.20, 0.18],  // Bull: consumer + lead-gen + CTV all scale
  ],
  fcfMargin: [
    [0.68, 0.65, 0.62, 0.60, 0.58],
    [0.72, 0.72, 0.71, 0.70, 0.70],
    [0.72, 0.74, 0.75, 0.76, 0.76],
  ],
  exitMultiple: [16, 22, 28],
  desc: [
    'June self-serve launch stalls — onboarding friction persists despite video creative tools. The consumer vertical loses momentum as macro cuts e-commerce ad budgets. ' +
      'Revenue growth decelerates from 59% to low-mid teens within 2 years. At 85% EBITDA margins there is zero cushion — every revenue miss flows straight through. ' +
      'Multiple compresses from 33x to 18x. Earnings grow at ~15% from $14.50 base; modest returns from current entry.',
    'June self-serve launch ramps efficiently: <30-day breakeven and near-zero churn confirm the cohort economics. Consumer vertical sustains April record momentum through 2026. ' +
      'Lead-gen model (auto/health/fintech) rolls out in 2027 as the next TAM expansion. Revenue compounds at ~22% annually; 85% EBITDA margins hold. ' +
      'EPS grows at ~27% from $14.50 base; multiple settles to 22x through earnings growth, delivering ~15% annualized returns.',
    'Self-serve + consumer + lead-gen + CTV all compound simultaneously. 100K+ new advertisers per year at $70K+ LTV creates a flywheel where more demand density raises publisher ROAS, which attracts more supply. ' +
      'Revenue sustains 28-30% growth for 3+ years. Buybacks accelerate on $5B+ FCF. ' +
      'EPS grows at ~37% from $14.50 base; market re-rates from cyclical to structural at 25x; 20%+ annualized returns.',
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

  epsCagr: [15, 21, 37],
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

  debtSafety: {
    netDebt: 740,        // Q1 2026: debt $3,500M − cash $2,760M
    ebitda: 6300,        // FY2026E: ~85% adj EBITDA margin × $7.5B rev guide
    fy: 'FY26E',
    note: 'Net leverage 0.12× — effectively debt-free relative to earnings power. $5B+ annual FCF rapidly deleverages; $3.28B buyback authorization provides capital return floor.',
  },
});

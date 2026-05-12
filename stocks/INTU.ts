import { defineStock } from './defineStock';

export const INTU = defineStock({
  ticker: 'INTU',
  name: 'Intuit Inc.',
  sector: 'Software / SMB Finance & Tax',
  themeColor: '#0077c5',
  currentPrice: 387.74,
  fairPriceRange: '$340 - $640',
  shares0: 280,
  rev25: 18800,
  fcfMargin25: 0.30,
  taxRate: 0.22,
  cash: 4000,
  debt: 6300,
  beta: 1.20,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 15.59,
  rsRating: 18,
  rsTrend: 'falling',
  aiImpact: 'DISRUPTION_RISK',
  ratingOverride: 'HOLD',
  updatedOn: '05/12',

  strategicNarrative:
    "Intuit is the dominant SMB-finance + consumer-tax platform (TurboTax, QuickBooks, Credit Karma, Mailchimp) — FY25 revenue $18.8B (+16% YoY), GAAP EPS $13.67 (+31%), GAAP operating margin 26%, non-GAAP EPS $20.15 (+19%). " +
    "FY26 guide: revenue $20.997-21.186B (+12-13%), GAAP EPS $15.49-15.69 (+13-15%) — durable double-digit compounding. " +
    "The catch: stock is -38% over the past year (peak $814 → $396), 52-wk range bottoms at $342. RS 18 / SMA200 negative reflects AI-disruption fear: ChatGPT-era tax filing, generative SMB accounting, and Block + competitors threatening the moat. Intuit's response (Agentic AI, Intuit Assist) is real but unproven monetization. " +
    "Capital allocation supportive: $2.8B FY25 buyback (+39% YoY), $5.3B remaining authorization. SBC ~$2B vs $3.9B GAAP NI is high for a mature software franchise. " +
    "Bull (~25%): Agentic AI cements switching costs, growth re-accelerates to 15%+, multiple re-rates to 30× → $700+. " +
    "Base (~50%): Mid-teens EPS growth holds, multiple settles 24× → $480. " +
    "Bear (~25%): AI-native challengers chip away at TurboTax/QuickBooks moat, growth decelerates to single digits, multiple compresses to 18× → $300. " +
    "Burry indicator flags 32% overstatement (Critical, Burry-published). Quality franchise at a multi-year drawdown — wait for stabilization above $420 before adding.",

  analystConsensus: { rating: 'Buy', targetLow: 425, targetMedian: 636, targetHigh: 916, numAnalysts: 35 },

  revGrowth: [
    [0.08, 0.06, 0.05, 0.04, 0.04],
    [0.13, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.13, 0.12, 0.11],
  ],
  fcfMargin: [
    [0.27, 0.27, 0.27, 0.27, 0.27],
    [0.30, 0.31, 0.32, 0.33, 0.33],
    [0.32, 0.34, 0.35, 0.36, 0.37],
  ],
  exitMultiple: [14, 19, 26],

  desc: [
    'AI-native tax filing tools (ChatGPT-era + free competitors) erode TurboTax pricing power; Block / Xero / Wave chip away at QuickBooks SMB share. Revenue growth halves to 6-8% by FY28 as Agentic AI fails to monetize. ' +
      'EPS compounds at ~8% on flat-to-down margins. Multiple compresses 26× → 18× as market prices a maturing franchise. 5yr target ~$300, ~-5% annualized.',
    'FY26 guide ($21B revenue, $15.59 GAAP EPS midpoint) executes; Agentic AI rollout protects core moat without dramatic re-rating. Operating margin expands 26% → 30%. ' +
      'EPS compounds at ~14% with steady buyback contribution. Multiple settles 24× through earnings growth. 5yr target ~$480, ~4% annualized — model fair value with modest upside.',
    'Intuit Assist + Agentic AI become the SMB system of record across finance, tax, marketing (Mailchimp), and payments (Credit Karma). Cross-sell drives ARPU expansion. ' +
      'EPS compounds at ~22% on margin expansion to 37%. Multiple holds premium 32× as platform thesis validates. 5yr target ~$700+, ~12% annualized.',
  ],

  thesis: [
    'Generative AI commoditizes tax filing and SMB bookkeeping. TurboTax pricing power erodes as IRS Direct File expands and AI-first alternatives offer free or near-free filing. ' +
      'QuickBooks SMB moat depends on ecosystem stickiness; AI-native challengers (Pilot, Block, etc.) chip away at the lower end of the market. ' +
      'Mailchimp acquisition struggles to deliver cross-sell. Credit Karma growth slows post-COVID-era boost. ' +
      'High SBC (~$2B/yr = 32% Burry overstatement) inflates non-GAAP optics; real owner economics are weaker than headlines suggest.',
    'Intuit\'s FY26 guide ($21B revenue, $15.59 GAAP EPS midpoint) executes cleanly. Agentic AI tools defend the moat without dramatic ARPU expansion — they shift from optional to expected. ' +
      'TurboTax retains free-edition share via brand and integration with QuickBooks ecosystem. Credit Karma stabilizes as auto/personal loan markets recover. ' +
      'Capital returns continue ($2.8B FY25 buyback, $5.3B authorized) but growth decelerates from 16% to low-teens as TAM matures. Quality franchise, fair valuation, modest upside.',
    'Agentic AI proves transformative — Intuit Assist becomes the autonomous SMB CFO + consumer tax pro, dramatically lowering customer acquisition cost and expanding wallet share. ' +
      'QuickBooks evolves from accounting software to integrated SMB OS (finance + payroll + payments + marketing + benefits). ' +
      'TurboTax adds proactive year-round tax optimization, Credit Karma evolves into AI financial advisor for the mass market. ' +
      'Margins expand to 37% on platform leverage. Market re-rates from "mature software" to "AI-native financial platform" at 32× premium multiple.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.010, 0.018, 0.025],
  ebitdaProxy: [0.32, 0.38, 0.43],
  bullMaOptVal: false,

  epsCagr: [8, 14, 22],
  exitPE: [18, 24, 32],
  prob: [25, 50, 25],

  burry: {
    sbc: 1968,
    gaapNi: 4340,
    buyback: 3754,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 32,
    overstatementSource: 'burry-published',
    note: 'Critical per Burry — 32% overstatement. FY25 calendar actuals (TIKR): SBC $1,968M (10.1% of revenue — very heavy), buybacks $3,754M = 2.1× SBC. Despite buybacks consistently exceeding SBC, diluted share count grew 273M → 282M over 5 years (+3.3%) because gross issuance roughly equals gross retirements. Our 4y-MTM formula breaks down here because the stock is flat-to-down over 4 years ($430 → $396, multiplier 0.92×), producing a perverse negative haircut. Burry\'s 32% reflects the absolute SBC burden ($2B/yr is real money) rather than MTM amplification. Trust the published value; do not apply our calculator to flat-stock + high-SBC names like INTU.',
  },
});

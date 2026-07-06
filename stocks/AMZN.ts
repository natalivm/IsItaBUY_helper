import { defineStock } from './defineStock';

export const AMZN = defineStock({
  ticker: 'AMZN',
  name: 'Amazon.com',
  sector: 'E-commerce / Cloud / AI Infrastructure',
  themeColor: '#ff9900',
  currentPrice: 244.16,
  fairPriceRange: '$220 - $455',
  shares0: 10800,
  rev25: 800000,         // FY2026 estimate: Q1 $181.5B + Q2 mid $196.5B + H2 ~$420B
  fcfMargin25: 0.04,     // FY2026 peak capex year — Q1 CapEx $43.2B compresses FCF sharply
  taxRate: 0.18,
  cash: 100000,
  debt: 60000,
  beta: 1.20,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 7.85,         // FY2026 Street consensus (~$7.75-7.96). Q1 GAAP $2.78 included a $16.8B one-time pre-tax Anthropic mark-up — excluded from recurring earnings power here
  rsRating: 64,
  rsTrend: 'flat',
  aiImpact: 'TAILWIND',
  updatedOn: '07/06',
  lastReportTag: 'Q1 2026',

  reasonsToBuy: [
    'AWS is the dominant global cloud platform with AI demand accelerating its growth to the fastest pace in over a decade.',
    'Trainium custom silicon positions Amazon as a credible competitor to NVIDIA in AI compute at hyperscale economics.',
    'Advertising business is a high-margin, rapidly growing engine built on first-party shopper data no competitor can replicate.',
    'Amazon Leo satellite network has anchor commercial deals and government contracts providing a long-duration growth option.',
    'Retail automation and robotics are structurally expanding operating margins while improving delivery speed and customer experience.',
  ],

  risksToBuy: [
    'Peak CapEx year compresses near-term free cash flow, creating valuation sensitivity to any delay in monetization.',
    'Azure and Google Cloud are credible AI platform competitors; any AWS share loss would re-rate the multiple immediately.',
    'Amazon Leo is a capital-intensive bet with uncertain consumer adoption timelines and satellite deployment execution risk.',
    'Tariff and trade policy headwinds on physical retail supply chains could pressure unit economics in the core commerce segment.',
    'Regulatory and antitrust scrutiny across e-commerce, cloud, and advertising creates headline risk and potential structural constraints.',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 240, targetMedian: 320, targetHigh: 410, numAnalysts: 65 },

  // rev25 = FY2026 estimate; year-1 = FY2027 growth
  revGrowth: [
    [0.10, 0.09, 0.08, 0.07, 0.06], // Bear: AWS decelerates to high-single-digits, retail flats
    [0.14, 0.12, 0.11, 0.10, 0.09], // Base: AWS 15-18%, ads 20%+, retail stable
    [0.18, 0.16, 0.14, 0.12, 0.11], // Bull: Trainium/Leo/Rufus all scale; all-three-engines
  ],
  // fcfMargin25 = 4% (FY2026 peak capex); year-1 = FY2027 as capex moderates
  fcfMargin: [
    [0.05, 0.06, 0.07, 0.08, 0.09], // Bear: capex stays elevated, slow FCF recovery
    [0.08, 0.09, 0.10, 0.11, 0.12], // Base: CapEx peaks FY26-27, FCF inflects
    [0.11, 0.13, 0.14, 0.15, 0.16], // Bull: Trainium ROI + Leo early monetization
  ],
  exitMultiple: [14, 18, 24],

  desc: [
    'Q1 2026 record margins (13.1%) prove fleeting — AI capex ($43B+ Q1 alone) fails to generate incremental AWS revenue. Enterprise AI slower than hyped; Azure/Google take share. AWS decelerates to high-single digits by FY28. ' +
      'Retail margin stalls at 8% on labor/tariff costs; Amazon Leo burns cash without revenue payback. EPS CAGR ~5%. Multiple 22×. 5yr target ~$220, ~-4% annualized.',
    'AWS $364B backlog + Trainium sold-out validates the AI infrastructure thesis. AWS sustains 15-18% growth through FY28. Retail margin expands to 10-11% on robotics/automation. Ads reaches $80B+ by FY28. ' +
      'Leo commercial Q3 launch + Delta/Apple anchor deals build toward the "many billion-dollar revenue" vision. CapEx peaks FY26-27, FCF inflects sharply. ' +
      'EPS compounds at ~10% CAGR. Multiple 27×. 5yr target ~$340, ~5% annualized.',
    'Trainium becomes the leading AI chip ($50B+ standalone implied) as T3/T4 scale. Leo launches profitably Q3 2026 (Delta, Apple, enterprises) and grows into an AWS-like capital return story. ' +
      'Rufus agentic commerce expands wallet share; ads grow to $100B+ with first-party shopper data advantage. All three engines at full speed. EPS compounds ~14% CAGR. Multiple 30×. 5yr target ~$450+.',
  ],

  thesis: [
    'Q1 $43.2B CapEx run rate is unsustainable without proportional FCF. Azure (OpenAI exclusive), Google (Gemini + Tensor) take share as AI labs consolidate platforms. ' +
      'Retail wage/tariff headwinds absorb automation productivity gains. Leo launch delays or low adoption add ~$1B/quarter to losses. Multiple re-rates from 27× to 22× on capex anxiety.',
    'Q1 validated all three engines: AWS +28% (fastest in 15 quarters), $364B backlog, Bedrock tokens in Q1 > all prior years combined, Trainium top-3 chip globally on 40% QoQ growth, retail units +15%. ' +
      'Leo Q3 launch + Delta/Apple deals de-risk the satellite bet. Trainium $225B+ commitments + T3 nearly fully subscribed proves pricing power. CapEx investment follows AWS\'s established playbook — big upfront, big returns later.',
    'Trainium\'s $50B implied standalone run rate + $225B commitments puts Amazon at the center of AI compute in a way the market hasn\'t fully priced. Leo + Globalstar + Apple = the direct-to-device platform for the next decade. ' +
      'Rufus agentic commerce disrupts traditional search-to-purchase funnel in Amazon\'s favor. Graviton chosen by Meta for agentic AI proves CPU + GPU chip stack dominance. All TAMs compound simultaneously.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.0, 0.0, 0.0],
  ebitdaProxy: [0.14, 0.18, 0.22],
  bullMaOptVal: false,

  epsCagr: [5, 10, 14],
  exitPE: [22, 27, 30],
  prob: [20, 50, 30],

  burry: {
    sbc: 19467,
    gaapNi: 77670,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: '2025',
    overstatementPct: 21,
    overstatementSource: 'burry-published',
    note: 'Elevated per Burry — 21% overstatement, similar to NFLX tier. TIKR FY25 actuals: SBC $19,467M (2.7% of revenue — low for scale), zero buybacks (full reinvestment into AI capex). Naive SBC/NI 25%. Diluted shares only +5.4% over 5y (+1.1%/yr) despite zero buyback offset — modest dilution thanks to revenue/profit compounding. AMZN is the opposite of META: same Burry tier (~20%) but achieved by no buybacks + moderate stock appreciation rather than massive buybacks. Our 4y-MTM formula overshoots (32% vs Burry\'s 21%) because the 2.275× MTM multiplier produces noisier results in the 2-4× zone. Trust Burry\'s 21% as the anchor.',
  },
});

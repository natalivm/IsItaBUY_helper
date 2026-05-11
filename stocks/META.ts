import { defineStock } from './defineStock';

export const META = defineStock({
  ticker: 'META',
  name: 'Meta Platforms',
  sector: 'Social Media / Digital Advertising / AI',
  themeColor: '#1877F2',
  currentPrice: 598.86,
  fairPriceRange: '$520 - $820',
  shares0: 2540,
  rev25: 200970,
  fcfMargin25: 0.22,
  taxRate: 0.18,
  cash: 70700,
  debt: 30000,
  beta: 1.24,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 34.78,
  rsRating: 42,
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  updatedOn: '05/11',

  strategicNarrative:
    "Meta is a high-quality digital advertising compounder with elite economics — FY25 revenue $201B (+18% YoY), 41% operating margin, 33% net margin, 82% gross margin, 33% ROE, 22% ROIC. " +
    "TTM acceleration reinforces the AI-advertising flywheel: Q4'25 EPS Q/Q +62%, sales Q/Q +33%, TTM EPS rebounded to $27.51 vs FY25 $23.49 — Reels monetization, AI-driven ad targeting (Andromeda), and core Family of Apps engagement expansion all firing. " +
    "Diluted share count compressed from 2.91B (2017) → 2.54B (2025) thanks to consistent $25-45B annual buybacks — a Burry-approved capital return pattern. New $0.50/share dividend ($2 annualized) signals durability. " +
    "FY26 guidance points to massive AI capex ($65-100B+), pressuring near-term FCF margin (down from prior 30%+). The bet: AI investment translates to durable revenue acceleration via Llama-driven ad targeting, agentic ads, and AI-native consumer products. " +
    "Reality Labs continues bleeding ~$20B/year — a long-dated optionality that the market discounts heavily. " +
    "At $609.63 / forward P/E 17.5× / FY26E EPS $34.78, META screens reasonable on multiples vs the broader Mag-7 cohort. RS 42 + SMA200 -9.8% reflect 2026 underperformance (-7.6% YTD) on AI capex anxiety. " +
    "Bear: ad market saturation + AI capex doesn't ROI → multiple compresses to 14x, EPS stalls at 6-8% growth, $650 5yr target (~+1.5% CAGR). " +
    "Base: AI ad targeting drives sustained 14-16% EPS CAGR, capex pays back, multiple holds 18× → ~$1,200 5yr (~14% CAGR). " +
    "Bull: AI advertising flywheel + LLM monetization + Reality Labs path-to-breakeven → 22% EPS CAGR, premium 22× multiple → ~$2,000 5yr (~27% CAGR). " +
    "Burry SBC indicator: 20% overstatement (published) — Elevated tier, similar to NFLX. Massive buybacks offset most gross dilution but MTM amplifier on $20B+ annual SBC keeps the indicator above the Pristine threshold.",

  analystConsensus: { rating: 'Strong Buy', targetLow: 600, targetMedian: 820, targetHigh: 1000, numAnalysts: 56 },

  revGrowth: [
    [0.15, 0.10, 0.08, 0.07, 0.06], // Bear: ad market saturation, AI capex doesn't pay
    [0.20, 0.16, 0.13, 0.11, 0.10], // Base: 26% TTM growth normalizes; AI ad targeting sustains low-double-digit
    [0.25, 0.22, 0.19, 0.16, 0.14], // Bull: AI flywheel accelerates, agentic ads scale
  ],

  fcfMargin: [
    [0.18, 0.16, 0.18, 0.20, 0.22],   // Bear: AI capex stays elevated, FCF compressed
    [0.22, 0.24, 0.26, 0.28, 0.30],   // Base: capex moderates 2027+, margins recover
    [0.25, 0.28, 0.31, 0.33, 0.35],   // Bull: AI ROI strong, leverage on ad mix shift
  ],

  exitMultiple: [12, 16, 22],

  desc: [
    'AI ad targeting plateau — Andromeda gains saturate, Reels monetization caps out. AI capex ($80B+/yr) fails to translate to revenue acceleration; Reality Labs continues $20B+ annual losses without a path to monetization. ' +
      'Revenue growth decelerates to 6-8% by FY30. EPS compounds at ~8% CAGR. Multiple compresses from 17.5× to 14× as market re-rates Meta to mature ad utility. 5yr target ~$650, ~+1.5% annualized.',
    'AI advertising flywheel works as guided — better targeting → higher ROAS for advertisers → pricing power. Revenue compounds at low-double-digits, capex moderates 2027+ enabling FCF margin recovery to 28-30%. ' +
      'EPS compounds at 14% CAGR with buyback contribution. P/E holds 18× as market accepts AI investment as productive. 5yr target ~$1,200, ~14% annualized — quality compounder territory.',
    'AI super-cycle for advertising: Llama-driven targeting + agentic ads + AI-native creative tools expand Meta\'s ad TAM beyond traditional display. Reality Labs reaches path-to-breakeven by FY28. ' +
      'Revenue sustains high-teens growth, EPS compounds at 22% CAGR with margin expansion. Premium multiple at 22× as Meta becomes the AI-advertising platform. 5yr target ~$2,000, ~27% annualized.',
  ],

  thesis: [
    'AI capex bet doesn\'t generate sufficient ROI. Hyperscalers + open-source models commoditize Llama advantage. Reality Labs continues bleeding ($20B+/yr) without monetization path. ' +
      'Ad market saturates — TikTok pressure on engagement, Apple ATT and EU regulation continue limiting targeting precision. Buybacks slow as capex consumes cash. ' +
      'Multiple compresses on capex anxiety + growth deceleration. RS 42 + SMA200 -9.8% reflects this risk already starting to price.',
    'AI investment translates to ad performance — Andromeda model + LLM-driven targeting drive durable advertiser ROAS gains. Reels monetization closes gap to Feed. ' +
      'WhatsApp Business and click-to-message ads scale into a meaningful revenue line. Capex peaks FY26-27 then moderates as AI infrastructure productizes. ' +
      'Diluted share compression continues at 1-2%/yr from buybacks. Quality compounder at fair multiple, no margin compression risk.',
    'Meta becomes the dominant AI-advertising platform. Llama models win in agentic commerce. Open-source AI lowers Meta\'s own infrastructure costs structurally. ' +
      'Reality Labs Quest 4 + AR glasses reach mainstream by FY28 — second platform monetization beyond Family of Apps. ' +
      'AI-native creative tools (image/video gen) expand TAM beyond traditional ad spend into SMB self-serve. Operating leverage drives margins toward 50%.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.012, 0.018, 0.025],
  ebitdaProxy: [0.42, 0.48, 0.54],
  bullMaOptVal: false,

  epsCagr: [8, 14, 22],
  exitPE: [14, 18, 22],
  prob: [25, 50, 25],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.01, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
    },
  ],

  burry: {
    sbc: 20427,
    gaapNi: 63000,
    buyback: 44648,
    epsBasis: 'GAAP',
    fy: '2025',
    overstatementPct: 20,
    overstatementSource: 'burry-published',
    note: 'Elevated per Burry — 20% overstatement, similar to NFLX tier. TIKR FY25 actuals: SBC $20,427M (10.4% of revenue), buybacks $44,648M (was previously understated at $26.3B), GAAP NI ~$63B. Buyback covers SBC 2.2× and diluted share count compressed 2,859M → 2,567M = -10.2% over 5 years. Our 4y-MTM formula massively overshoots (71% vs Burry\'s 20%) because it doesn\'t credit buybacks for offsetting MTM cost. Burry\'s 20% reflects the genuine net-buyback effect: even though SBC is large in absolute dollars, share count is shrinking 2.1%/yr.',
  },
});

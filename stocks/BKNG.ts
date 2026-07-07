import { defineStock } from './defineStock';

export const BKNG = defineStock({
  ticker: 'BKNG',
  name: 'Booking Holdings',
  sector: 'Online Travel / Marketplace',
  themeColor: '#003580',
  updatedOn: '07/07',
  lastReportTag: 'Q1 2026',
  currentPrice: 181.95,
  fairPriceRange: '$150 - $440',
  // 25-for-1 forward split effective 04/06/2026: 30.6M × 25 = 765M shares
  shares0: 765,
  rev25: 26917,
  fcfMargin25: 0.337,
  taxRate: 0.18,
  cash: 17800,
  debt: 17500,
  beta: 1.15,
  costDebt: 0.04,
  rsRating: 29,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  reasonsToBuy: [
    'Revenue growing far faster than room nights signals pricing power and merchant payments mix doing the heavy lifting',
    'Aggressive share repurchase program at scale — billions returned quarterly — is compounding per-share value rapidly',
    'Two-sided marketplace with deep supply integrations and payment infrastructure creates a transaction-layer moat LLMs cannot easily displace',
    'Transformation cost savings program self-funds reinvestment while protecting EBITDA margin trajectory',
    'Trading at a historically low earnings multiple despite strong free cash flow yield providing meaningful downside cushion',
  ],

  risksToBuy: [
    'Middle East conflict and regional disruptions have already caused measurable short-term demand softness',
    'EU regulation could compress take rates and add compliance costs to the hotel fee structure',
    'AI travel assistants represent a real long-term top-of-funnel risk if booking happens outside Booking\'s platform',
    'Google\'s distribution power makes customer acquisition expensive and could erode margins if paid traffic costs rise',
    'RS near historic lows indicates no institutional momentum — value entry with uncertain catalyst timing',
  ],

  // Targets split-adjusted for 25-for-1: 4495/25=179.8, 5900/25=236, 6700/25=268
  analystConsensus: { rating: 'Buy', targetLow: 179.8, targetMedian: 236, targetHigh: 268, numAnalysts: 29 },

  // Revenue growth: Q1'26 actual +16%, Q2'26 guide 4-6% (Middle East drag), FY'26 guide HSD.
  revGrowth: [
    [0.05, 0.05, 0.05, 0.04, 0.04],   // Bear: Q2 softness becomes new normal, Middle East+macro persist
    [0.09, 0.09, 0.08, 0.08, 0.07],   // Base: FY HSD guide, pricing power sustains, gradual deceleration
    [0.11, 0.10, 0.10, 0.09, 0.09],   // Bull: above guide, H2 recovery + merchant mix acceleration
  ],

  // FCF margin: 2025A ~33.7%. Q1'26 FCF $3.1B (-2% YoY) on $5.5B rev — slight pressure.
  // $550M savings self-fund investments. EBITDA margin +50bps guide intact.
  fcfMargin: [
    [0.31, 0.30, 0.29, 0.29, 0.29],   // Bear: FCF slip continues, macro/Middle East drag on margins
    [0.34, 0.34, 0.345, 0.35, 0.35],  // Base: stable-to-modest expansion, savings offset reinvestment
    [0.35, 0.355, 0.36, 0.365, 0.37], // Bull: operating leverage + merchant mix tailwind
  ],

  // EBITDA exit multiples: historical EV/EBITDA ~14-22x, using conservative end for mature travel biz
  exitMultiple: [10, 14, 16],

  desc: [
    'Q2\'s soft 4–6% guide becomes the full-year story as Middle East tensions, macro fears, and airline disruptions spread globally. Volume growth stays stuck near 4–5% and pricing can\'t fill the gap. ' +
      'EU regulators squeeze hotel fees and AI chatbots siphon top-of-funnel traffic. FCF margins slip as fixed costs grow faster than revenue. ' +
      'The company still generates cash (~31% of revenue) and keeps buying back shares, but not enough to move the needle. Fair value ~$180 — essentially flat with today\'s price.',
    'Q1 2026 proved the model works: revenue +16%, EBITDA +19%, and Booking repurchased $3.6B of its own stock in a single quarter ($18.2B authorization still remaining). ' +
      'The Q2 softness (4–6% guide) is a Middle East/macro blip — not structural. Full-year high-single-digit revenue and mid-teens EPS growth holds. ' +
      'The $550M savings program self-funds $700M of reinvestment. With buybacks running at an aggressive pace, each remaining share compounds faster. ' +
      'At ~16x earnings (historically 16–30x), the market is paying cyclical-trough prices for a compounder. Fair value ~$308 — nearly double today\'s price, a ~14% annual return.',
    'Revenue is growing 2–3x faster than room nights (Q1: +16% vs +6%) — pricing power and merchant payments are inflecting. H2 2026 demand rebounds as Middle East tensions ease, and Booking\'s AI personalization drives share gains. ' +
      'Management maintains near-Q1 buyback pace off the $18.2B authorization, aggressively shrinking the float. Merchant payments expand margins toward 37%. ' +
      'LLM integration proves to be a net positive — a new paid channel, not a threat — because the transaction layer (payments, supply, service) stays with Booking. Fair value ~$412 — more than 2x today\'s price.',
  ],

  thesis: [
    'Q2 softness (4–6%) bleeds into full year. Middle East + macro + airline disruptions suppress volume; EU regulation erodes take rate. Market stays at trough valuation.',
    'Q1 beat (rev +16%, EBITDA +19%) and $3.6B Q1 buybacks signal execution. FY HSD rev + mid-teens EPS holds. $18.2B authorization compounds per-share value aggressively.',
    'Revenue growing 2-3x faster than room nights = pricing power inflecting. Near-Q1 buyback pace shrinks float. H2 recovery normalizes P/E from ~16x toward 18-20x.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  // Buybacks: $3.6B in Q1'26 alone, $18.2B remaining (~$135B mkt cap). Q1 annualized = ~11% gross.
  // Net of SBC (~2-3% dilution): Bear ~2%, Base ~5%, Bull ~8%.
  bbRate: [0.02, 0.05, 0.08],
  ebitdaProxy: [0.35, 0.38, 0.40],
  bullMaOptVal: false,

  // Zero out speculative premiums (revPrem, fcfUplift) — keep only buybacks as realistic enhancement.
  driverOverrides: [
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
  ],
});

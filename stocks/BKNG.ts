import { defineStock } from './defineStock';

export const BKNG = defineStock({
  ticker: 'BKNG',
  name: 'Booking Holdings',
  sector: 'Online Travel / Marketplace',
  themeColor: '#003580',
  updatedOn: '04/06',
  currentPrice: 176.19,
  fairPriceRange: '$4,500 - $6,700',
  shares0: 30.6,
  rev25: 26917,
  fcfMargin25: 0.337,
  taxRate: 0.18,
  cash: 17800,
  debt: 17500,
  beta: 1.15,
  costDebt: 0.04,
  rsRating: 18,
  rsTrend: 'falling',
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "BKNG is a high-quality travel compounder with a dominant two-sided marketplace moat. " +
    "Q4'25 call confirmed: 2026 algo targets ~9% CC top line (8% algo + 100 bps), mid-teens EPS growth, +50 bps EBITDA margin — even after $700M incremental reinvestment. " +
    "Transformation Program delivers $550M annual run-rate savings (end-2025), $500-550M in-year savings in 2026, self-funding growth investments with ROI discipline. " +
    "Capital return: 2025 FCF ~$9.1B, returned $8.2B (~90%). Since 2022: $29B buybacks, -22% net share count. ~4% annual net share reduction modeled in DCF. " +
    "LLM/AI risk addressed by CEO Fogel: LLMs may become new top-of-funnel, but merchant-of-record, supply integrations, payments, regulatory compliance, and service = deep moat at bottom of funnel. More likely a new paid traffic channel (like Google was) than an existential threat. " +
    "At ~15-16x forward P/E, market prices BKNG as cyclical trough — below historical 16-30x range. " +
    "DCF base fair value ~$5.2k (~25% upside) including ~3% annual net share reduction. FCF yield ~7-8% provides downside cushion. " +
    "RS 18 = no momentum — value entry, not breakout. Risks: travel macro slowdown (mgmt notes 'thoughtful discretionary spending'), EU regulation, Google distribution risk.",

  analystConsensus: { rating: 'Buy', targetLow: 4495, targetMedian: 5900, targetHigh: 6700, numAnalysts: 29 },

  // Revenue growth: 2026 algo ~9% CC top line. Q1'26 room nights +5-7%.
  revGrowth: [
    [0.05, 0.05, 0.05, 0.04, 0.04],   // Bear: travel slowdown, below algo, discretionary pullback
    [0.09, 0.09, 0.09, 0.08, 0.08],   // Base: algo execution ~9% CC, gradual deceleration
    [0.11, 0.10, 0.10, 0.09, 0.09],   // Bull: above-algo execution + global expansion
  ],

  // FCF margin: 2025A ~33.7%. Call: +50 bps EBITDA margin even after $700M reinvest.
  // $550M savings self-fund investments. Net margin expansion is policy, not accident.
  fcfMargin: [
    [0.32, 0.31, 0.30, 0.30, 0.30],   // Bear: margin compression from cycle pressure + reinvestment
    [0.34, 0.34, 0.345, 0.35, 0.35],  // Base: modest expansion, savings offset reinvestment
    [0.35, 0.355, 0.36, 0.365, 0.37], // Bull: operating leverage + merchant mix tailwind
  ],

  // EBITDA exit multiples: historical EV/EBITDA ~14-22x, using conservative end for mature travel biz
  exitMultiple: [10, 14, 16],

  desc: [
    'People cut back on travel due to a recession. Booking\'s revenue only grows 4-5% a year — basically treading water. ' +
      'New EU regulations squeeze the fees Booking charges hotels, and AI chatbots start stealing some customers who used to search on Booking.com. ' +
      'The company still generates solid cash (~33-34% of revenue), but Wall Street loses confidence and the stock gets cheap. Fair value ~$4,500 — barely above today\'s price, so you\'d earn roughly ~2% per year.',
    'Booking hits the targets management laid out: ~9% annual revenue growth, profits growing mid-teens, and the company keeps buying back ~4% of its own shares every year (making each remaining share worth more). ' +
      'They\'re funding growth by cutting $550M in internal costs, not by spending more. Cash generation improves from 34% to 36% of revenue over five years as they earn more from payments processing. ' +
      'The stock isn\'t expensive today at ~16x earnings (it historically trades at 16-30x). Fair value ~$7,700 — nearly double today\'s price, a ~14% annual return driven by the business actually growing, not by hype.',
    'Travel demand stays strong longer than expected and Booking\'s AI-powered personalization helps them win even more bookings. They earn more per transaction as they handle payments directly instead of just connecting buyers and sellers. ' +
      'The company aggressively buys back ~5% of shares per year, turbocharging per-share growth. AI chatbots turn out to be a new advertising channel for Booking (like Google search ads were) rather than a threat — ' +
      'because when you actually want to book and pay, you still need Booking\'s hotel network, payment system, and customer support. Fair value ~$10,300 — more than 2.5x today\'s price.',
  ],

  thesis: [
    'Macro recession hits discretionary travel. "Thoughtful spending" becomes real pullback. EU regulation + LLM-driven disintermediation erode take rate. Market re-rates to trough.',
    'Company executes algo (9% top line, mid-teens EPS). Transformation Program savings self-fund reinvestment. 90% FCF returned. P/E stays compressed but FCF compounds.',
    'Travel cycle extends, algo beats on merchant mix + payments. LLM integration becomes paid channel (like Google). P/E normalizes from 16x toward 18x.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  // Buybacks: -4% net share count in 2025 (net of SBC), -22% since 2022. ~90% FCF returned.
  // Bear: recession slows buybacks. Base: continues at ~4% (actual 2025 rate). Bull: accelerates.
  bbRate: [0.01, 0.03, 0.04],
  ebitdaProxy: [0.35, 0.38, 0.40],
  bullMaOptVal: false,

  // Zero out speculative premiums (revPrem, fcfUplift) — keep only buybacks as realistic enhancement.
  driverOverrides: [
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
    { revPrem: [0, 0, 0, 0, 0], fcfUplift: [0, 0, 0, 0, 0] },
  ],
});

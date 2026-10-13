import { defineStock } from './defineStock';

export const BKNG = defineStock({
  ticker: 'BKNG',
  name: 'Booking Holdings',
  sector: 'Online Travel / Marketplace',
  themeColor: '#003580',
  updatedOn: '10/13',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  currentPrice: 157.51,
  fairPriceRange: '$170 - $301',  // stockanalysis.com analyst target range (Oct 7 2026)
  // 25-for-1 forward split effective 04/06/2026; 751.4M shares Oct 2026 after buybacks
  shares0: 751.4,
  rev25: 26917,        // FY2025A; revGrowth[0] = FY26 (guide HSD; consensus $29.25B, +8.7%), FY27E $31.97B (+9.3%)
  fcfMargin25: 0.337,
  taxRate: 0.18,
  cash: 17210,         // Jun 2026 (stockanalysis)
  debt: 20920,
  beta: 1.15,
  costDebt: 0.04,
  rsRating: 55,        // IBD RS per user, 10/11/2026 (was 29)
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  // Q2 2026 UPDATE (Aug 4, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Room nights 325M (+5%), gross bookings $51.0B (+9%), revenue ~$7.4B
  // (+8%), adj. EBITDA ~$2.6B (+9%), adj. EPS $2.54 (+15%; share count −6%).
  // All beat the high end of guidance. FCF $3.6B (+16%); record $4.1B
  // returned. Q3 GUIDE: room nights +3-5%, GB/revenue/EBITDA +4-6% (Middle
  // East conflict drag on long-haul assumed to persist). FY26: GB/revenue/
  // EBITDA up HSD, adj. EPS up low-to-mid teens. Savings target raised to
  // ~$650M run-rate by end-2027. Street: Buy (37), PT $170-301 (median
  // $240); FY26E rev $29.25B / EPS $10.45, FY27E $31.97B / $12.38. Stock
  // $160.34 (~15× FY26E, ~8% FCF yield), down ~22% over 52 weeks.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Revenue growing far faster than room nights signals pricing power and merchant payments mix doing the heavy lifting',
    'Aggressive share repurchase program at scale — billions returned quarterly — is compounding per-share value rapidly',
    'Two-sided marketplace with deep supply integrations and payment infrastructure creates a transaction-layer moat LLMs cannot easily displace',
    'Transformation cost savings program self-funds reinvestment while protecting EBITDA margin trajectory',
    'Trading at a historically low earnings multiple despite strong free cash flow yield providing meaningful downside cushion',
  ],

  risksToBuy: [
    'Middle East conflict is weighing on long-haul travel, and guidance assumes the drag persists into the second half',
    'EU regulation could compress take rates and add compliance costs to the hotel fee structure',
    'AI travel assistants represent a real long-term top-of-funnel risk if booking happens outside Booking\'s platform',
    'Google\'s distribution power makes customer acquisition expensive and could erode margins if paid traffic costs rise',
    'RS near historic lows indicates no institutional momentum — value entry with uncertain catalyst timing',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 170, targetMedian: 240, targetHigh: 301, numAnalysts: 37 },  // stockanalysis.com (Oct 7 2026; split-adjusted)

  // Revenue growth: Q1'26 +16%, Q2'26 +8%, Q3 guide +4-6% (Middle East drag), FY'26 guide HSD.
  revGrowth: [
    [0.06, 0.02, 0.01, 0.02, 0.02],   // Bear (deepened 10/11/2026): AI agents disintermediate top-of-funnel + macro/Middle East drag
    [0.087, 0.09, 0.08, 0.08, 0.07],  // Base: FY26 ≈ $29.25B consensus, FY27 ≈ +9%, gradual deceleration
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
  exitMultiple: [8, 12, 15],   // Was [10, 14, 16] (10/11/2026): EV/EBITDA is ~12× today — base no longer assumes a re-rating; the old bear still earned ~9%/yr

  desc: [
    'The Q3 slowdown (+4-6%) becomes the run-rate as Middle East tensions, macro fears and airline capacity cuts spread. Volume growth stays near 3-5% and pricing can\'t fill the gap. ' +
      'EU regulators squeeze hotel fees and AI chatbots siphon top-of-funnel traffic. FCF margins slip, and buybacks keep the share count falling but can\'t move the needle. 5yr target {target} ({cagr} annualized).',
    'Q2 2026 beat the high end of every guided metric, FCF rose 16% and Booking returned a record $4.1B in one quarter. The H2 softness is a Middle East/macro blip, not structural. ' +
      'High-single-digit revenue growth and mid-teens EPS growth hold; the ~$650M savings program self-funds reinvestment while aggressive buybacks shrink the float. At ~15x earnings the market is paying trough prices for a compounder. 5yr target {target} ({cagr} annualized).',
    'Revenue keeps growing faster than room nights as merchant payments and pricing power inflect; demand rebounds as Middle East tensions ease and AI personalization drives share gains. ' +
      'LLM integration proves to be a new paid channel, not a threat, because the transaction layer stays with Booking. Merchant mix expands margins toward 37%. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'H2 softness (+4-6%) bleeds into 2027. Middle East + macro + airline disruptions suppress volume; EU regulation erodes take rate. Market stays at trough valuation.',
    'Q2 beat across the board, FCF +16% and a record $4.1B capital return signal execution. FY HSD revenue + low-to-mid-teens EPS growth holds; buybacks compound per-share value aggressively.',
    'Revenue growing faster than room nights = pricing power inflecting. Aggressive buybacks shrink the float. A demand recovery normalizes the P/E from ~15x toward 18-20x.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  // Buybacks: $3.6B in Q1'26, ~$4.1B total capital return in Q2'26 (~$120B mkt cap). Share count −6% y/y.
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

  debtSafety: {
    netDebt: 3410,         // Jun 2026 (stockanalysis): ~$20.9B debt − ~$17.2B cash
    ebitda: 10410,         // TTM EBITDA
    fy: 'TTM Q2 2026',
    note: 'GREEN (~0.3×). Modest net debt from funding buybacks; ~$9.5B annual FCF covers it easily.',
  },
});

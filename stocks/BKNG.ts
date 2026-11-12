import { defineStock } from './defineStock';

export const BKNG = defineStock({
  ticker: 'BKNG',
  name: 'Booking Holdings',
  sector: 'Online Travel / Marketplace',
  themeColor: '#003580',
  updatedOn: '11/12',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-08',
  currentPrice: 160.21,
  fairPriceRange: '$170 - $301',  // stockanalysis.com analyst target range (Oct 7 2026)
  // 25-for-1 forward split effective 04/06/2026. 743.7M shares at Nov 6 2026 (TIKR), down from 751.4M
  // in October: $9.5B of repurchases in the first nine months took the AVERAGE count down 7.5% y/y.
  shares0: 743.7,
  rev25: 26917,        // FY2025A; revGrowth[0] = FY26 (guide HSD; consensus $29.25B, +8.7%), FY27E $31.97B (+9.3%)
  fcfMargin25: 0.337,
  taxRate: 0.18,
  cash: 16200,         // Q3 2026 close per the call: cash and investments, down from $17.7B at Q2
  debt: 21427,         // DERIVED from TIKR LTM net debt of +$5,227M. Net debt rose $3.4B -> $5.2B because
                       // the buyback pace is running ahead of free cash flow.
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

  // Q3 2026 (reported Nov 3, after the close)
  // ─────────────────────────────────────────────────────────────────────────
  // Every guided metric beat the high end again. Room nights +7% (from +5% in
  // Q2), gross bookings +10% (+11% cc), adjusted revenue +9% (+10% cc),
  // adjusted EBITDA ~$4.6B (+9%) at a 47.0% margin that INCLUDES stock comp,
  // adjusted EPS $4.66 (+17%, on a 7.5% smaller average share count). Flights
  // +19%, attractions +24%, Connected Trip transactions +~20%, alternative
  // accommodations +7% with listings growth accelerating to +9%.
  //
  // BUT Q4 IS GUIDED TO A NEAR-STALL, and that is the news. Room nights +1-3%,
  // gross bookings +2-4%, adjusted revenue 0-2%, adjusted EBITDA ABOUT FLAT.
  // From +9% revenue to ~+1% in one quarter. Management names the causes --
  // the toughest comp of 2026, the Middle East conflict direct and indirect
  // (elevated airfares, reduced long-haul capacity), localized European unrest,
  // a 2pt FX headwind, and deliberately higher Q4 investment -- and assumes they
  // persist to year end. The FULL YEAR guide is reaffirmed: gross bookings,
  // revenue and EBITDA all up high single digits, adjusted EPS up low-to-mid
  // teens, full-year EBITDA margin stable. So revGrowth's 0.087 for FY26 still
  // holds; what has changed is the exit rate into FY27, where the model carries
  // 0.09. Against that, H1 2027 on-the-books "looks healthy" and the stated
  // long-term algorithm is 8-8-15: at least 8% cc gross bookings, 8% adjusted
  // revenue, 15% adjusted EPS. Left at 0.09, which sits at the optimistic end of
  // their own framework; FY27 at 0.07 still reads STRONG BUY, 0.06 does not.
  //
  // WHAT ACTUALLY DECIDES THE RATING IS exitMultiple, and the new data qualifies
  // the comment justifying it. That comment reads "EV/EBITDA is ~12x today — base
  // no longer assumes a re-rating". On TIKR's LTM figures that is right: EV
  // $124.7B over $10.05B of LTM EBITDA is 12.4x. On a FORWARD basis it is not —
  // NTM EV/EBITDA is 10.74x. An exit multiple is applied to terminal-year EBITDA,
  // so the forward number is the like-for-like comparison, and on that basis the
  // base case does assume a ~12% re-rating rather than none.
  //
  // This is the whole rating: 12 gives 16.46% and STRONG BUY, 11 gives 15.76%
  // and BUY. It is LEFT ALONE deliberately. It was set to 12 by hand on Oct 11,
  // cut from 14 for exactly this reason, against a stated historical range of
  // 14-22x; the stock is down 20% on the year, so exiting at today's depressed
  // forward multiple is itself an assumption that the de-rating is permanent.
  // The bear leg at 8 already prices that. New data qualifies the premise here,
  // it does not falsify it, and re-cutting a deliberate judgement input on a
  // basis distinction would be deciding the rating by choosing a denominator.
  //
  // The balance-sheet refresh below is nearly rating-neutral on its own: shares
  // 751.4 -> 743.7 adds 0.25pt, the net-debt correction takes 0.19pt back,
  // 16.40% -> 16.46%.
  //
  // AI DISINTERMEDIATION IS NOW MEASURED, which is new. LLM referrals are
  // "significantly less than 1%" of Booking.com room nights, accelerating after
  // the latest ChatGPT release, and the vast majority of that traffic reaches
  // Booking rather than suppliers. The bear leg's "AI chatbots siphon
  // top-of-funnel traffic" is still the right risk and is not yet visible in the
  // numbers. Conversion data cuts the other way: Priceline's Penny and Agoda's
  // assistant users convert at roughly twice the rate of non-users.
  //
  // NOT REFRESHED: rsRating 55 / rsTrend 'rising' is the Oct 11 read, and the
  // trend is load-bearing for the GROUP — at 55 the stock is under the 70
  // momentum line, so it needs 'rising' to clear the mid-RS exception. The stock
  // is -20% over twelve months, so that is the field to check next.
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Buy', targetLow: 170, targetMedian: 216.66, targetHigh: 301, numAnalysts: 37 },  // median = TIKR street target Nov 6 2026, cut from $240; low/high still Oct 7

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
    'Q3 beat the high end of every guided metric again — room nights +7%, revenue +9%, adjusted EPS +17% on a 7.5% smaller share count. Q4 is guided to a near-stall on comps, the Middle East and FX, but the full-year guide is reaffirmed and H1 2027 bookings look healthy.',
    'Revenue growing faster than room nights = pricing power inflecting. Aggressive buybacks shrink the float. A demand recovery normalizes the P/E from ~15x toward 18-20x.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  // Buybacks: $9.5B repurchased in 9M 2026, $2.1B of it in Q3; average share count −7.5% y/y.
  // NOTE, because this array reads as though it were doing work: bbRate is INERT for BKNG.
  // projectionService deliberately excludes buybacks from the DCF — every dollar of FCF is already in
  // equity value, so shrinking the share count too would count the cash that funds them twice, and
  // repurchases at fair value are value-neutral. It only drives the EPS_PE share-count display, and
  // BKNG has no modelType, so it runs on DCF_ADVANCED. Changing these three numbers moves nothing.
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
    netDebt: 5227,         // TIKR LTM, Nov 6 2026 (was 3410 at Q2)
    ebitda: 10052,         // LTM, derived from TIKR's 0.52x net-debt/EBITDA on that net debt
    fy: 'LTM Q3 2026',
    note: 'GREEN at 0.52x. Net debt grew $3.4B -> $5.2B in a quarter because buybacks are outrunning FCF — $9.5B repurchased in nine months against roughly $9.5B of annual free cash flow, plus a 1% dividend. Comfortable, and worth watching as a pace rather than a level.',
  },
});

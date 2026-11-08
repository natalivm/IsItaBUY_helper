import { defineStock } from './defineStock';

export const MSFT = defineStock({
  ticker: 'MSFT',
  name: 'Microsoft Corporation',
  sector: 'Cloud / Enterprise Software / AI Infrastructure',
  themeColor: '#00a4ef',
  updatedOn: '11/08',
  lastReportTag: 'Q1 FY27',
  dataReviewedOn: '2026-11-08',
  nextEarningsOn: '2027-01-27',   // Q2 FY27, late January on the usual cadence — NOT confirmed by IR

  currentPrice: 530.61,
  shares0: 7426.19,      // TIKR, Nov 6 2026 ($530.61 x 7,426.19 gives the $3,940,413M cap)

  // FISCAL YEAR ENDS JUNE. rev25 is FY2026 ACTUAL (year ended 30 Jun 2026), the last complete
  // year, so revGrowth year one is FY27 — the year we are one quarter into. Do not read the
  // field name literally here; FY2025 revenue was $281,724M.
  rev25: 331839,
  fcfMargin25: 0.202,    // FY26 actual: $66,987M of FCF on $331,839M. LTM is already 17.3% — see the note.
  taxRate: 0.20,         // effective 19.4% FY26, 19.7% LTM, and management guides ~20% for Q2 FY27
  cash: 20281,           // cash and equivalents at the LTM close (TIKR)
  debt: 89703,           // DERIVED so net debt reproduces TIKR's LTM +$69,422M; lease-inclusive
  beta: 1.04,            // TIKR 5-yr beta, Nov 6 2026
  costDebt: 0.04,

  modelType: 'EPS_PE',
  baseEps: 20.4,         // FY27E diluted EPS (year ending Jun 2027), BUILT rather than taken from a
                         // consensus, because none was to hand. Q1 FY27 actual $4.89; Q2 from the
                         // company's own guide (revenue $96.55B mid, less COGS $32.8B and opex
                         // $18.55B = $45.2B of operating income at a 46.8% margin, less ~$0.3B of
                         // other expense, taxed at the guided 20%) gives $4.83; a normal H2 ramp
                         // adds ~$10.50. Total ~$20.22. TIKR's NTM P/E of 25.56x implies $20.76,
                         // and NTM reaches a quarter further into FY28, so the two bracket this.
                         // Set at 20.40 between them. REPLACE with a published FY27 consensus.

  rsRating: 50,          // PLACEHOLDER — no IBD read supplied. The stock is +4.4% over twelve
  rsTrend: 'rising',     // months but ran hard off the July low, hence 'rising'. BOTH NEED YOUR
                         // NUMBER: at 50 the stock is under the 70 momentum line, so the GROUP
                         // depends entirely on the trend flag. The rating does not — 10.99% clears
                         // the hard 10% BUY line without the quality boost.
  aiImpact: 'TAILWIND',

  // Q1 FY27 (reported Oct 28 2026) — the first quarter of the new segment structure
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $92.3B, +19%. Operating income +21% at a 50% margin. EPS $4.89, +18%
  // (+19% cc) when adjusted for the OpenAI investment. Microsoft Cloud $63.9B with
  // growth ACCELERATING to +30%. Azure +48%, guided +49-50% cc for Q2 — Amy Hood
  // attributes the upside to platform efficiency gains that freed capacity for
  // Foundry, plus higher revenue per token, and warns both are lumpy quarter to
  // quarter. M365 Commercial Cloud +18%, paid seats +5%. Commercial RPO +73% to
  // $677B with the portion beyond twelve months +98%.
  //
  // Q2 FY27 GUIDE: revenue $96.0-97.1B (+18-19%), COGS $32.7-32.9B, opex
  // $18.5-18.6B, tax ~20%, operating margins down slightly. Azure +49-50% cc.
  //
  // READ THE BOOKINGS LINE CAREFULLY: commercial bookings -12%, which looks alarming
  // and is a comparison artifact — it laps enormous prior-year Azure commitments, and
  // management says explicitly that quarterly growth rates here are "less indicative
  // of underlying sales execution". RPO at +73% is the series that matters.
  //
  // THE COST OF ALL THIS IS FREE CASH FLOW, and that is the thing this model is
  // really about. Four fiscal years:
  //
  //        FY24    FY25    FY26    LTM
  //   FCF  30.2%   25.4%   20.2%   17.3%   of revenue
  //   capex 18.1%  22.9%   34.9%   39.2%   of revenue
  //
  // FCF has fallen in absolute dollars for three straight years — $74.1B, $71.6B,
  // $67.0B, $60.0B — while revenue compounded 15-18%. Capex was $45.2B in Q1 alone,
  // is guided above $50B in Q2, and management puts CALENDAR 2026 at ~$170B with the
  // fiscal second half accelerating further. Amy Hood's commitment is only that
  // Microsoft stays "free cash flow positive in FY27", and she flagged that the
  // company will "access additional sources of funding when we believe it is
  // attractive" — it has not yet tapped the debt markets. Same shape as AMZN, less
  // far along: Amazon is already at -5.9%.
  //
  // MARGINS ARE AT THE CEILING, which is what sets epsCagr below. Net margin is 41.2%
  // LTM against an operating margin of 47.1% and a ~20% tax rate, so there is very
  // little room between the two. EPS cannot outrun revenue here for long, and the
  // scenario legs are solved from that rather than extrapolated from the 31.6% FY26
  // EPS growth. Checked: [7, 11, 14] imply FY31 net margins of 40.2% / 41.4% / 42.3%
  // against 41.2% today. A first pass at [8, 13, 17] implied 42.1% / 45.3% / 48.1%
  // and was discarded — that is the error the PLTR note describes, caught before it
  // was written rather than after.
  //
  // WINDOWS IS THE ONE BROKEN LINE: OEM revenue -27%, guided down in the mid-30s for
  // Q2, on the Windows 10 end-of-support comparable, channel inventory that remains
  // elevated, and weak PC demand. Devices and Consumer overall -3%. It is ~5% of
  // revenue, so it costs about a point of company growth.
  //
  // NOT SET: analystConsensus is omitted rather than invented. TIKR gives a street
  // target of $634.14 and nothing else — the type needs a low, a high and a count,
  // and three made-up numbers to display one real one is not a trade worth making.
  // That and rsRating are the two things to fill first.
  // ─────────────────────────────────────────────────────────────────────────

  // rev25 = FY2026 ACTUAL; year one is FY27, which Q1 and the Q2 guide have largely set
  revGrowth: [
    [0.14, 0.11, 0.09, 0.08, 0.07], // Bear: Azure decelerates as capacity catches demand; Windows stays broken
    [0.17, 0.15, 0.13, 0.11, 0.10], // Base: Q1 +19% and Q2 guided +18-19%, then a gentle fade
    [0.19, 0.18, 0.16, 0.14, 0.12], // Bull: Copilot consumption and the enterprise agent stack compound
  ],
  // FY26 20.2% and falling. Base assumes capex peaks across FY27-28 and conversion recovers
  // toward the high-20s it ran at before the build-out, never back to FY24's 30%.
  fcfMargin: [
    [0.15, 0.15, 0.16, 0.17, 0.18], // Bear: capex stays at this level and FCF never recovers
    [0.17, 0.19, 0.21, 0.23, 0.25], // Base: capex peaks, conversion rebuilds
    [0.19, 0.23, 0.27, 0.29, 0.31], // Bull: the fleet is fungible as claimed and each dollar carries more revenue
  ],
  exitMultiple: [16, 21, 26],
  termGrowth: [0.025, 0.03, 0.035],
  bbRate: [0.004, 0.006, 0.008],   // share count falls only ~0.2%/yr: $21B of buyback against $12.6B of SBC
  ebitdaProxy: [0.54, 0.59, 0.63], // LTM EBITDA $205,691M on $346,445M = 59.4%
  bullMaOptVal: false,

  desc: [
    'AI capacity catches up with demand and Azure growth normalizes toward the 20s; the capex already committed keeps depreciation elevated long after the revenue has slowed. ' +
      'Windows stays impaired and Copilot consumption converts slowly outside coding. EPS compounds ~7% from the $20.40 FY27E base and the multiple settles at 20x. 5yr target {target} ({cagr} annualized).',
    'Azure +48% accelerating for a sixth straight quarter, Microsoft Cloud +30% and commercial RPO +73% to $677B say the demand is contracted, not hoped for. ' +
      'Margins are already at their ceiling, so EPS compounds ~11% with revenue rather than ahead of it, and free cash flow recovers as capex peaks. At 26x that is a 5yr target of {target} ({cagr} annualized) — a quality compounder priced close to fair.',
    'The fungible fleet claim proves out: each dollar of capex carries more revenue, Copilot consumption scales past coding into the broader M365 base, and the enterprise agent stack becomes a second platform business. ' +
      'EPS compounds ~14% and the market pays 31x for durable AI-era growth. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'The capex is the risk, not the demand. Free cash flow has fallen three years running in absolute dollars while revenue compounded; capex is ~39% of revenue and calendar 2026 lands near $170B. If Azure growth normalizes before that spend is absorbed, the depreciation arrives without the revenue.',
    'Q1 FY27 accelerated where it matters: Azure +48% guided to +49-50%, Cloud growth up to +30%, RPO +73% with the beyond-twelve-month portion +98%. The -12% bookings line is a comparison artifact management addressed directly. Margins at 47% operating and 41% net leave no room for EPS to outrun revenue, which is exactly what the base case assumes.',
    'Microsoft owns the distribution, the data and now the models. Copilot daily users are up 5x year-over-year, agents open a third of all GitHub PRs, and 50 million agents sit in the Agent 365 registry. If consumption billing scales the way GitHub\'s did, the TAM argument stops being a slide and starts being revenue.',
  ],

  epsCagr: [7, 11, 14],   // Solved from the margin ceiling, not extrapolated — see the note above
  exitPE: [20, 26, 31],   // NTM 25.56x, LTM 27.71x today; base assumes no re-rating
  prob: [25, 50, 25],

  debtSafety: {
    netDebt: 69422,        // TIKR LTM, Nov 6 2026
    ebitda: 205691,        // LTM reported EBITDA
    fy: 'LTM Q1 FY27',
    note: 'GREEN at 0.34x. Leverage is not the question here — free cash flow is. Net debt is trivial against $206B of EBITDA, but FCF has fallen from $74.1B to $60.0B over three years on a capex programme approaching $170B a calendar year, and the CFO has said the company will tap outside funding when it is attractive to do so.',
  },

  burry: {
    sbc: 12556,            // LTM
    gaapNi: 142631,        // LTM
    buyback: 21000,        // LTM repurchases
    epsBasis: 'GAAP',      // baseEps is a GAAP diluted figure, so no non-GAAP P/E haircut applies
    fy: 'LTM Q1 FY27',
    overstatementPct: 5,
    overstatementSource: 'estimated',
    note: 'Pristine, and unusually so for a mega-cap tech name. Naive SBC/NI is 8.8% — stock comp is only 3.6% of revenue. The three-year return is 1.56x, so the mark-to-market amplifier is the lowest band (1.5x), giving ~13%; buybacks run 1.67x SBC, which offsets ~6.7 points. Lands at ~5%. Not on Burry\'s published chart, so this is the calibrated heuristic rather than a published figure.',
  },
});

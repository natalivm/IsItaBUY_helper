import { defineStock } from './defineStock';

export const APP = defineStock({
  ticker: 'APP',
  name: 'AppLovin Corporation',
  sector: 'Ad-Tech / AI Monetization',
  themeColor: '#f97316',
  updatedOn: '11/06',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-06',
  currentPrice: 391.22,
  fairPriceRange: '$325 - $790',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 333,         // Q3 2026: 331M outstanding at Sep 30 (4.1M repurchased in the quarter for $1.4B); ~333M diluted
  rev25: 8324,          // FY2026E: Q1 $1,840M + Q2 $1,924M + Q3 actual $2,180M + Q4 guide mid $2,380M. Three quarters are now actual. Implies FY25 $5.55B at the "more than 50%" full-year growth management guided.
  fcfMargin25: 0.62,    // Q3 call reaffirmed FY26 FCF conversion of 70-75% of adj EBITDA; at an 84% EBITDA margin that is ~59-63% of revenue. Q3 itself ran 77% (Q2's 53% was the cash-tax timing management said would reverse, and it did).
  taxRate: 0.127,
  cash: 3170,           // Sep 30 2026
  debt: 3500,           // Sep 30 2026 long-term debt; net debt ~$330M, under 0.1x adj EBITDA
  beta: 2.22,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 16.36,       // FY2026E EPS built from the Q3 call: $3.54 + $3.76 + $4.30 + $4.77 (Q4 from the guided $2.01B adj EBITDA at Q3's 78% net-income conversion on ~330M shares). Note it does NOT rise on the beat — the Oct consensus already assumed a strong Q4, so three actual quarters land $0.31 below it. Prior: $16.67 (stockanalysis consensus, Oct 9 2026).
  rsRating: 41,         // IBD RS per user, 10/10/2026 (was 58). STALE: predates a +71% week and the Q3 beat — needs a fresh IBD read, and it gates the quality boost in getInstitutionalRating.
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q3 2026 UPDATE (Nov 6 2026) — read off the earnings call
  // ─────────────────────────────────────────────────────────────────────────
  // The Q2 miss did not become a trend. Revenue $2,180M (+55% YoY, +14% QoQ)
  // beat the high end of the guide by ~$100M; adj. EBITDA $1,840M (84%, +190bps
  // YoY) also beat. Net income $1,440M (+72%, a 66% net margin), FCF $1,400M =
  // 77% of EBITDA, reversing Q2's 53% exactly as management said the cash-tax
  // timing would. Gaming reaccelerated to ~+50% YoY; consumer grew triple
  // digits YoY and double digits sequentially. The next-generation model is
  // only PARTIALLY rolled out, which management frames as the headroom.
  //
  // Q4 GUIDE: revenue $2,365-2,395M (+43-44% YoY), adj. EBITDA $1,995-2,025M.
  // Long-term framing: "roughly 30% annually". Buyback authorization raised
  // $3.2B to $3.6B; 4.1M shares retired in Q3 for $1.4B; share count down ~2%
  // YoY for 8 straight quarters.
  //
  // What actually moved in this model: the GROWTH PATH and the narrative, not
  // the base. FY26E EPS is $16.36 against the $16.67 consensus it replaces —
  // the beat was already inside the Q4 expectation. The stock meanwhile went
  // from ~17x to ~24x FY26E, so the +71% week was multiple expansion, and the
  // base case now assumes that multiple compresses rather than holds.
  //
  // Not updated from the call, because it does not contain them: rsRating
  // (still the Oct 10 IBD read of 41, pre-move) and analystConsensus (Oct 9,
  // pre-print — the $325 low target is now far below spot). Both want a
  // refresh from their own sources.
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Buy', targetLow: 325, targetMedian: 470, targetHigh: 790, numAnalysts: 33 },  // stockanalysis.com, Oct 9 2026
  revGrowth: [
    [0.14, 0.10, 0.07, 0.05, 0.05],  // Bear: the model transition stalls mid-rollout and consumer decelerates (~8% CAGR)
    [0.28, 0.22, 0.18, 0.15, 0.13],  // Base: FY27 +28% off a $9.5B Q4 run-rate, then deceleration (~19% CAGR). Management guides "roughly 30% annually over the long term"; this sits below that.
    [0.33, 0.28, 0.24, 0.20, 0.17],  // Bull: the next-gen model keeps paying, consumer compounds, CTV arrives (~24% CAGR)
  ],
  fcfMargin: [
    [0.68, 0.65, 0.62, 0.60, 0.58],
    [0.72, 0.72, 0.71, 0.70, 0.70],
    [0.72, 0.74, 0.75, 0.76, 0.76],
  ],
  exitMultiple: [16, 22, 28],
  desc: [
    'The model transition stalls mid-rollout. Management was explicit that gains "won\'t land on a perfect quarterly schedule" — in this case they stop landing, consumer decelerates as e-commerce budgets tighten, and the Q4 guide of +43% proves the last easy comparison. ' +
      'At ~84% EBITDA margins there is zero cushion: every revenue miss flows straight through, as Q2 2026 showed. ' +
      'Revenue slows to mid-single digits by FY29 (~8% CAGR) and the multiple compresses from ~24x to 12x — a de-rating made larger by the fact that the stock already carries the re-rating. Earnings grow ~6% from the $16.36 FY26E base. 5yr target {target} ({cagr} annualized).',
    'The next-generation model completes its rollout and keeps paying, but at a decaying rate: FY27 grows ~28% off a $9.5B Q4 run-rate, then 22/18/15/13 (~19% CAGR) — below the "roughly 30% annually" management guides to, because a $10B+ platform decelerating is the base case rather than a bear one. ' +
      'Consumer keeps compounding off a small base and CTV stays a 2028 story. ~84% EBITDA margins hold but cannot expand; EPS therefore grows ~21% a year from the $16.36 base, revenue plus ~2% of buybacks. ' +
      'The multiple compresses from ~24x to 19x as growth normalizes. 5yr target {target} ({cagr} annualized).',
    'Management\'s own long-term framing proves conservative. The new architecture trains on more data and keeps producing uplifts, consumer penetration is still early enough to compound triple digits off a growing base, and CTV becomes a real third leg — the one place management says there is no top-to-bottom funnel performance offering yet. ' +
      'Revenue sustains 20%+ for four years (~24% CAGR) and $6B+ of annual free cash funds buybacks against a share count already falling 2% a year. ' +
      'EPS grows ~28% from the $16.36 base and the market holds today\'s ~24x rather than compressing it. 5yr target {target} ({cagr} annualized).',
  ],
  thesis: [
    'Model gains arrive on no schedule, and management refuses to promise a cadence — Q2 2026 showed what one quarter without them costs. ' +
      'Margin at ~84% EBITDA has no room to expand, so any revenue miss flows straight to EPS. ' +
      'The stock now carries a ~24x multiple instead of the ~17x it had a month ago, so a disappointment de-rates from a higher base. ' +
      'Creative remains the advertiser bottleneck: management says customers who do not invest in it simply do not scale, and the Western LLM labs are not working on the problem.',
    'Q3 beat both lines after a quarter spent answering for a miss, and gaming reaccelerated to ~+50% alongside the model rollout. ' +
      'The next generation is only partially deployed and helps most where data is sparsest — new and smaller advertisers, which is where the consumer vertical lives. ' +
      'One unified auction means gaming and consumer compete for the same impression, so the mix shift raises price rather than splitting it. ' +
      'Buybacks and the $3.6B authorization put a floor under EPS: 104M shares retired to date at an average of $90.',
    'The architecture generalizes — management allowed that the same models may eventually span media and client types rather than staying split between gaming and consumer. ' +
      'More data trains bigger models trains better predictions: the flywheel management describes, with acquisition of data relationships as a way to buy a decade of it at once. ' +
      'CTV is the one large under-monetized pool with no real performance offering, and they now have pilot campaigns running. ' +
      'Competition expands the pie: multiple rivals posted strong quarters and APP still grew 55%, several times the 10-to-mid-20s the large platforms reported.',
  ],

  // Recalibrated 10/11/2026 (targets looked too high): EPS growth now ties to the revenue path — margins are already ~84% EBITDA,
  // so EPS can only grow at revenue CAGR + ~2% buybacks. Was [5,21,37] / [12,22,25] → base $951, bull $2,011 (bull 37%
  // EPS on ~23% revenue was impossible at flat margins; base 22x exit sat well above today's ~17x).
  epsCagr: [6, 21, 28],   // Base: FY27 +28% then 22/18/15/13 = 19.1% revenue CAGR, + ~2% from buybacks. Margins are assumed flat — management manages to EBITDA dollars, not a margin percentage, so EPS tracks revenue. Was [3,16,24] on a 15.5% base path set when the Q2 miss read as the start of a slowdown; Q3 reaccelerated instead.
  exitPE: [12, 19, 24],   // The stock is ~24x FY26E at $391 — it was ~17x at $277 when this was last set, so the whole move has been multiple, not estimates. Base still assumes compression from here; bull assumes today's multiple holds rather than expanding.
  prob: [20, 50, 30],     // Was [25,50,25], set because momentum had broken. Q3 beat both lines, gaming reaccelerated to ~+50% and consumer grew triple digits, so that premise is gone.

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
    netDebt: 330,        // Sep 30 2026: debt $3,500M − cash $3,170M
    ebitda: 7000,        // FY2026E: Q1 ~$1,536M + Q2 $1,614M + Q3 $1,840M + Q4 guide mid $2,010M
    fy: 'FY26E',
    note: 'Net leverage under 0.1× on management\'s own figure, against the ~1× they say they would run long term. Q3 generated $1.4B of free cash and returned $1.4B; the buyback authorization was raised by $3.2B to $3.6B at the end of October.',
  },
});

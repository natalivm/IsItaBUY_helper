import { defineStock } from './defineStock';

export const ALAB = defineStock({
  ticker: 'ALAB',
  name: 'Astera Labs',
  sector: 'Semiconductors · AI Interconnect',
  themeColor: '#0ea5e9',
  updatedOn: '11/06',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-06',
  currentPrice: 190.71,
  fairPriceRange: '$190 - $500',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 187,        // Q4 2026 guided diluted. TIKR Q3 actual: 184.08M weighted diluted against 174.13M basic — a 5.7% overhang, which is the SBC story below rather than a rounding difference.
  rev25: 852.5,        // FY2025 revenue $852.5M (was mis-set to $1,345M); FY26E consensus $1.91B (+124%), FY27E $2.97B
  fcfMargin25: 0.33,   // FY25 FCF $281.8M
  taxRate: 0.12,       // non-GAAP ~12%
  cash: 1380,          // Sep 30 2026: cash, equivalents and marketable securities, up $125.3M in the quarter on record operating cash flow of $179.2M
  debt: 45,           // TIKR 9/30/26 total debt $44.99M — capital leases, not borrowings. Was 0.
  beta: 2.30,
  costDebt: 0.05,
  modelType: 'EPS_PE',
  baseEps: 4.32,       // FY2026E non-GAAP EPS: $0.56 + $0.80 + $1.32 ACTUAL + $1.64 guided. Unlike APP and AMD this one genuinely rises — Q3 came in at $1.32 against a $1.16-1.21 guide and Q4 is guided to $1.62-1.66, so the year lands 7.2% above the $4.03 consensus rather than on it. Prior: $4.03 (stockanalysis, Oct 9 2026; FY27E $6.39).
  rsRating: 47,        // IBD RS per user, 11/07/2026 (98 -> 88 -> 47). A hard fall, and the one that costs a group:
                       // 47 is under the 70 momentum line and rsTrend is falling, so the mid-RS exception does not
                       // apply either. The rating is unaffected — a 17.6% CAGR clears the hard 16% STRONG BUY line
                       // with no quality boost needed.
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q3 2026 UPDATE (Nov 6 2026) — read off the earnings call
  // ─────────────────────────────────────────────────────────────────────────
  // THE ONE THAT ACTUALLY BEAT. Revenue $584.9M (+49% q/q, +154% y/y) came
  // in above the $540-560M guide, and non-GAAP EPS $1.32 above the $1.16-1.21
  // guide. Non-GAAP gross margin 72.4%, operating margin 44.7% against 39.1%
  // in Q2 — 560bps of leverage in one quarter. Net income $243.4M, record
  // operating cash flow $179.2M, cash and securities $1.38B against no debt.
  // Scorpio became the largest product family with X-Series passing P-Series
  // and the family crossing $1B annualised.
  //
  // Q4 GUIDE: revenue $730-750M (+27% q/q), gross margin ~72%, opex
  // $194-200M, operating margin ~45%, tax ~12%, 187M diluted shares, non-GAAP
  // EPS $1.62-1.66. With TIKR's actual quarters (Q1 $308.36M, Q2 $392.40M,
  // Q3 $584.90M) that puts FY26 at $2,026M of revenue and $4.32 of EPS, 7%
  // above the consensus this file was carrying.
  //
  // Four new vectors moved from roadmap to dated: optical (NPO sampling this
  // quarter, ~6 months of qualification, revenue 2H 2027; management sizes
  // scale-up optics at a $40B TAM by 2030), custom silicon (10+ engagements,
  // shipments late 2027, volume 2028), Leo memory (preproduction now, volume
  // mid-2027) and Orion rack-scale (2027 via ODM/OEM, >$100K of Astera
  // content per 80-GPU rack, sold as boards plus COSMOS software plus a
  // reference-design royalty). Content per XPU already exceeds $1,000 and
  // management expects to double silicon content per XPU each generation.
  //
  // WHAT THEY WOULD NOT SAY is the reason epsCagr is unchanged. Asked twice
  // about 2027 — once directly on whether the lead customer's current
  // platform plateaus in Q1 2027 with the next generation not ramping until
  // 2028 — management declined to characterise the shape, answering only
  // that initial Scorpio X deployments "have completed much of their initial
  // ramp" and that new platforms and customers layer in through 2027. That
  // is not a denial. So the beat is taken into the base and the path is
  // left alone until there is something to change it on.
  //
  // Opex long-term target is ~30% of revenue; it is running below that now
  // (Q4 guide ~26.6%), which is why operating margin is ahead of the model.
  //
  // VERIFIED AGAINST TIKR (quarterly, through 9/30/26). Revenue by quarter
  // $270.58 / $308.36 / $392.40 / $584.90; gross margin sliding 75.6% ->
  // 76.3% -> 73.3% -> 72.3% as the hardware-heavy switch mix grows, which is
  // what the ~72% Q4 guide reflects. GAAP operating margin 30.6% in Q3 against
  // the 44.7% non-GAAP, the difference being $82.59M of stock compensation in
  // the quarter alone. Cash and short-term investments $1,378.24M against
  // $44.99M of capital leases. The model had debt at 0 and Q1 revenue
  // estimated at ~$335M against an actual $308.36M.
  //
  // RS REFRESHED 11/07: 88 -> 47, and this is the one that moves a group —
  // PRIME_GROWTH -> WATCH_LIST. The rating does not move: 17.6% clears the hard
  // 16% STRONG BUY line outright, so unlike APP and AMD nothing here leans on the
  // quality boost. A STRONG BUY in WATCH_LIST is the classifier doing its job —
  // it wants a reason AND a tape, and the tape has gone.
  // Still not updated: analystConsensus (Oct 9, pre-print — the $190 low target
  // is now at spot).
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Buy', targetLow: 190, targetMedian: 425, targetHigh: 500, numAnalysts: 26 },  // stockanalysis.com, Oct 9 2026
  revGrowth: [
    [1.18, 0.15, 0.00, -0.08, -0.15],   // Bear: FY26 ~locked (H1 + Q3 guide ≈ $1.25B); AI capex peaks, Scorpio displaced
    [1.24, 0.50, 0.15, 0.08, 0.00],     // Base: FY26/FY27 ≈ consensus $1.91B / $2.97B, then normalizes
    [1.30, 0.60, 0.25, 0.15, 0.08],     // Bull: Scorpio X + optical + UALink compound
  ],
  fcfMargin: [
    [0.25, 0.22, 0.20, 0.18, 0.16],
    [0.29, 0.32, 0.35, 0.37, 0.38],
    [0.30, 0.34, 0.38, 0.42, 0.44],
  ],
  exitMultiple: [14, 20, 26],
  desc: [
    'The AI capex cycle peaks early and a semiconductor downturn hits by 2028. Scorpio X is delayed or displaced by competing solutions from NVLink and ESUN. ' +
      'Hyperscalers begin internalizing their connectivity, and the operating expense step-up compresses margins without generating payback. ' +
      'Operating leverage works in reverse, EPS compounds only ~15% from the $4.32 FY26E base, and the multiple compresses to 20x as the growth premium evaporates. 5yr target {target} ({cagr} annualized).',
    'AI infrastructure spending sustains at moderate levels through 2028. Scorpio X ramps on schedule in 2027 with two to three hyperscaler customers. ' +
      'UALink adoption provides meaningful protocol diversification, and operating margins expand to around 45%. ' +
      'Revenue roughly doubles in 2026, grows ~50% in 2027, then normalizes as the business matures. ' +
      'Earnings compound at roughly 27% annually from the $4.32 base — the Q3 beat raises the base rather than the rate, management having declined to characterise 2027 — but from ~44x FY26E the stock return is more modest: 5yr target {target}, {cagr} annualized.',
    'The AI supercycle extends and Scorpio X becomes the standard scale-up switching layer across major hyperscalers. ' +
      'Optical products ramp in 2028 and UALink adoption accelerates broadly. The company transitions from a cyclical play to an architectural infrastructure layer. ' +
      'Operating margins reach 50% as multi-protocol optionality across CXL, UALink, and NVLink Fusion captures an expanding market. ' +
      'Earnings grow at roughly 35% annually: 5yr target {target}, {cagr} annualized.',
  ],
  thesis: [
    'AI scale-up protocol shifts away from merchant silicon. NVLink/ESUN displaces PCIe/CXL path. ' +
      'Hyperscalers build internal connectivity (like Google TPU interconnect). ' +
      'Aggressive OpEx step-up eats into margins during cycle downturn. ' +
      '$6.5B Amazon warrant is a ceiling, not a floor — concentrated customer risk. ' +
      'At ~44x FY26E the multiple has already halved from ~85x, but an air pocket still compresses it hard — and the lead customer platform plateauing in 1H 2027 before the next generation ramps is the specific shape management would not rule out. Semiconductor cycle hits 2028-2029.',
    'Amazon warrant secures strategic position. Scorpio X ramp validates scale-up switching TAM. ' +
      'PCIe 6 first-to-volume advantage holds. Software-defined fabric creates stickiness. ' +
      'AI capex sustains but growth decelerates naturally. EBIT margin expansion to 45% offsets revenue slowdown. ' +
      'Company remains cyclical growth (type B) with improving moat. Fundamentals deliver, but the entry multiple caps returns.',
    'Scorpio X + optical + UALink = triple growth engine. Company becomes the architectural connectivity layer ' +
      'for AI scale-up infrastructure. 2-3 hyperscaler adoption creates switching costs approaching SaaS levels. ' +
      'TAM expansion from $25B to $50B+ with optical. Moat transitions from technical to structural. ' +
      'Type B → Type A reclassification. Market cap re-rates as "AI fabric infrastructure platform".',
  ],

  epsCagr: [15, 27, 35],
  exitPE: [20, 30, 35],
  prob: [30, 40, 30],

  bbRate: [0.002, 0.008, 0.015],
  ebitdaProxy: [0.25, 0.40, 0.50],
  bullMaOptVal: false,

  debtSafety: {
    netDebt: -1333,        // TIKR 9/30/26: $44.99M of capital leases against $1,378.24M of cash and short-term investments
    ebitda: 876,           // FY26E non-GAAP: operating income $858.6M on $2,026M of revenue (Q1 35.9%, Q2 39.1%, Q3 44.7%, Q4 guided ~45%) plus ~$17M of D&A. TIKR's LTM GAAP EBITDA is $412.62M; the whole gap is stock compensation, which is the point of the burry block.
    fy: 'FY26E',
    note: 'GREEN by Step 1 — net cash, no debt. The balance-sheet risk is SBC dilution, not leverage.',
  },

  burry: {
    sbc: 237,           // TIKR LTM through Q3 2026 ($236.86M): 82.59 + 63.99 + 48.91 + 41.37
    gaapNi: 461,        // TIKR LTM ($461.32M): 182.94 + 153.09 + 80.31 + 44.98
    buyback: 0,         // $0.03M LTM, which is rounding, not a programme
    epsBasis: 'NON_GAAP',
    fy: 'LTM Q3 2026',
    overstatementPct: 75,
    overstatementSource: 'estimated',
    note: 'Still 75%, but for different reasons than before and it is now a closer call. Two of the three things the old note rested on are no longer true. Naive SBC/NI has gone from 76% (FY25: $167M on $219M) to 51% (LTM: $237M on $461M), because GAAP net income more than doubled while SBC grew less. And the dilution velocity that justified Tragic over Critical has collapsed: weighted diluted shares ran 181.18 → 181.16 → 183.34 → 184.08 across the last four quarters and are guided to 187M, which is +3.2% a year, not the +37% the old note cited. The old note said explicitly that if dilution slowed as IPO vesting completed ALAB could reclassify to Critical 50%, and on the share count that condition is now met. What holds the estimate at 75 is the method rather than the narrative: the documented heuristic multiplies the naive ratio by an MTM amplifier, and even the gentle ~1.5x for a stock that has gone 1.44x in two years ($132.45 to $190.71) puts 51% back at ~77%. Note the old note had that input wrong too — it assumed ~5x since IPO grants, and the stock has round-tripped from $483 in June. SBC is still 15.2% of revenue and buybacks are $0.03M, so the dilution is unmitigated; it is just no longer accelerating.',
  },
});

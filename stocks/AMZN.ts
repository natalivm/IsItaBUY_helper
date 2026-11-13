import { defineStock } from './defineStock';

export const AMZN = defineStock({
  ticker: 'AMZN',
  name: 'Amazon.com',
  sector: 'E-commerce / Cloud / AI Infrastructure',
  themeColor: '#ff9900',
  currentPrice: 267.44,
  fairPriceRange: '$230 - $405',  // stockanalysis.com analyst target range, Oct 7 2026
  shares0: 10813,      // TIKR, Nov 6 2026 ($259.30 x 10,813.14 gives the $2,803,847M cap)
  rev25: 827600,         // FY2026 now three actuals plus a guide: 181,519 + 200,606 + 201,944 + Q4 mid 243,500 = $827.6B.
                         // The $828.4B consensus this replaces was right to 0.1%. FY27E ~$948B (+14.5%).
  fcfMargin25: -0.059,   // LTM FCF is -$46.9B on $797.5B of revenue. It was -$7.6B at Q2; Q3 alone burned $34.8B
                         // on $77.3B of capex, a -17.3% quarterly FCF margin. This is far past 'peak capex year'.
  taxRate: 0.18,
  cash: 58714,           // cash and equivalents at Q3 close (TIKR); was 100000, which included securities
  debt: 249329,          // DERIVED: TIKR LTM net debt is +$190,615M, so debt = cash + that. The old 60000 left this
                         // file asserting $40B of NET CASH while Amazon issued $152.9B of debt in four quarters
                         // against $28.8B repaid. The figure includes leases, as TIKR's net debt does.
  beta: 1.5,             // TIKR 5-yr beta, Nov 6 2026 (was 1.20)
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 7.83,         // FY2026E adjusted EPS, rebuilt from reported quarters — see the Q3 note for the bridge.
                         // Was $8.31, the Oct 7 consensus. Still EXCLUDES the Anthropic mark-ups (Q1 $16.8B,
                         // Q2 $53.4B pre-tax); FY27E ~$10.47 (+34% on this base).
  rsRating: 98,          // IBD RS per user, 10/10/2026 (was 64)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '11/13',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-07',

  // Q2 2026 UPDATE (Jul 30, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Net sales $200.6B (+20%). AWS $42.2B (+37% — fastest in 18 quarters,
  // ~$169B run-rate), AWS op income $16.6B (vs $10.2B). Total op income
  // $27.5B (vs $19.2B). GAAP NI $62.6B inflated by $53.4B pre-tax Anthropic
  // investment gains. TTM FCF -$7.6B (capex +$66B y/y). Q3 GUIDE: net sales
  // $197-202B (+9-12%), op income $22.5-26.5B (vs $17.4B). Street: Strong Buy
  // (60), PT $230-405 (median $330); FY26E EPS $8.31 / rev $828B, FY27E
  // $10.47 / $948B. ~32× FY26E / ~25× FY27E. Net: AWS re-acceleration
  // validates the capex; FCF is the price of admission.
  // ─────────────────────────────────────────────────────────────────────────

  // Q3 2026 (reported Oct 29, after the close)
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $201.9B (+12%, +13% ex-FX), operating income $28.1B at a 13.9%
  // margin — the highest ever. AWS $46.0B, +39.3%, the SIXTH straight quarter
  // of acceleration and its fastest in nearly five years; AWS operating income
  // $17.8B at a 38.7% margin, backlog $578B growing triple digits. Ads $19.6B
  // (+12%, depressed ~850bp by the Prime Day shift into Q2; management expects
  // high teens in Q4). Q4 guide: revenue $240-247B, operating income
  // $28.5-33.5B.
  //
  // REBUILDING baseEps, AND THE BASIS IS THE WHOLE DIFFICULTY. Consensus for
  // "FY2026 EPS" ranges from $8.03 to $12.84 depending on whether the Anthropic
  // mark-ups are in. TIKR is in the second camp: its LTM P/E of 20.96x implies
  // $12.37 and the four reported quarters sum to exactly that, so its "EPS Excl
  // Extra Items" does NOT strip them. The line that does is EBT Excl. Unusual
  // Items, which is clean:
  //
  //   Q1  24,295 x 0.775 / 10,874 = $1.73
  //   Q2  27,611 x 0.775 / 10,903 = $1.96
  //   Q3  27,755 x 0.775 / 10,929 = $1.97
  //   Q4  op guide mid 31,000 less ~400 net interest = 30,600 -> $2.16
  //                                               FY26 = $7.83
  //
  // (0.775 is the effective rate net of the discrete tax on the Anthropic
  // gains, which the headline 22.5-24.0% rates include.)
  //
  // So $8.31 was ~6% high. The rating survives — 9.78% -> 8.48% CAGR, still BUY
  // on the soft 8% threshold the quality boost allows — but the margin is now
  // 2.2% of EPS. Below $7.66 this is a HOLD.
  //
  // Q3 WAS NOT THE MISS IT WAS REPORTED AS. Headlines read $1.89 against
  // $1.96-2.01. On this basis Q3 earned $1.97: the shortfall was an $890M
  // investment LOSS below the operating line, the mirror image of the gains
  // that flatter Q1 and Q2. Operating income rose 61%.
  //
  // THE BALANCE SHEET HAD THE SIGN WRONG. This file said net cash $40B. TIKR
  // reads net debt of +$190.6B. Amazon issued $152.9B of debt across the last
  // four quarters against $28.8B repaid, while cash fell from $90.1B to $58.7B.
  // debtSafety stays GREEN but now by Step 2 at 1.05x, not Step 1.
  //
  // AND THE CASH BURN IS PAST 'PEAK CAPEX YEAR'. LTM FCF is -$46.9B on $797.5B
  // of revenue, -5.9%. Q3 alone burned $34.8B on $77.3B of capex. Management
  // reaffirmed ~$220B of 2026 cash capex and said 2027 will be "meaningfully
  // more". fcfMargin25 moves 0.00 -> -0.059 to say so. AMZN rates on EPS_PE, so
  // this is the backup model, but it is the number the bear case is about.
  //
  // AWS GUIDANCE IS THE OTHER HALF, and the base revenue path only half reflects
  // it. Jassy guided AWS "north of 40%" in BOTH 2027 and 2028, with stated
  // visibility ("big chunks are reserved well in advance") and $578B of backlog.
  // At ~21% of revenue, AWS +40% plus non-AWS +7.5% gives ~14.4% total for FY27,
  // which is exactly the 0.14 already stored. Carry it to 2028 and the implied
  // total is ~15.6% against the 0.12 in year two. Left alone rather than marked
  // up: a two-year-out segment target is the weakest input class, it is the same
  // trap the STRL note refused, and revGrowth feeds only the DCF backup here. The
  // comment on that row said "AWS 15-18%", which is simply stale, and is fixed.
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Strong Buy', targetLow: 230, targetMedian: 326.85, targetHigh: 405, numAnalysts: 60 },  // median = TIKR street target Nov 6 2026 (was $330, so barely moved); low/high still Oct 7

  // rev25 = FY2026 estimate; year-1 = FY2027 growth
  revGrowth: [
    [0.10, 0.09, 0.08, 0.07, 0.06], // Bear: AWS decelerates to high-single-digits, retail flats
    [0.14, 0.12, 0.11, 0.10, 0.09], // Base: see the Q3 note — 0.14 is right for FY27 but 0.12 under-models FY28
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
    '2026 record margins prove fleeting — AI capex (TTM FCF already negative) fails to generate enough incremental AWS revenue. Enterprise AI slower than hyped; Azure/Google take share. AWS decelerates to high-single digits by FY28. ' +
      'Retail margin stalls at 8% on labor/tariff costs; Amazon Leo burns cash without revenue payback. EPS CAGR ~6% from the $7.83 FY26E base. Multiple 22×. 5yr target {target} ({cagr} annualized).',
    'AWS re-acceleration (+39.3% in Q3 2026, sixth straight quarter) + Trainium sold-out validates the AI infrastructure thesis. Management guides AWS above 40% in both FY27 and FY28. Retail margin expands to 10-11% on robotics/automation. Ads reaches $80B+ by FY28. ' +
      'Leo commercial Q3 launch + Delta/Apple anchor deals build toward the "many billion-dollar revenue" vision. CapEx peaks FY26-27, FCF inflects sharply. ' +
      'EPS compounds ~13% (FY27E +34% consensus off the rebuilt base, then ~10%/yr). Multiple 27×. 5yr target {target} ({cagr} annualized).',
    'Trainium becomes the leading AI chip ($50B+ standalone implied) as T3/T4 scale. Leo launches profitably Q3 2026 (Delta, Apple, enterprises) and grows into an AWS-like capital return story. ' +
      'Rufus agentic commerce expands wallet share; ads grow to $100B+ with first-party shopper data advantage. All three engines at full speed. EPS compounds ~18% CAGR. Multiple 30×. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'The capex surge (+$66B y/y, TTM FCF negative) is unsustainable without proportional FCF. Azure (OpenAI exclusive), Google (Gemini + Tensor) take share as AI labs consolidate platforms. ' +
      'Retail wage/tariff headwinds absorb automation productivity gains. Leo launch delays or low adoption add ~$1B/quarter to losses. Multiple re-rates from 27× to 22× on capex anxiety.',
    'Q2 extended it: AWS +37% (fastest in 18 quarters, ~$169B run-rate) with AWS op income +63%. Q1 had validated all three engines: AWS +28%, $364B backlog, Bedrock tokens in Q1 > all prior years combined, Trainium top-3 chip globally on 40% QoQ growth, retail units +15%. ' +
      'Leo Q3 launch + Delta/Apple deals de-risk the satellite bet. Trainium $225B+ commitments + T3 nearly fully subscribed proves pricing power. CapEx investment follows AWS\'s established playbook — big upfront, big returns later.',
    'Trainium\'s $50B implied standalone run rate + $225B commitments puts Amazon at the center of AI compute in a way the market hasn\'t fully priced. Leo + Globalstar + Apple = the direct-to-device platform for the next decade. ' +
      'Rufus agentic commerce disrupts traditional search-to-purchase funnel in Amazon\'s favor. Graviton chosen by Meta for agentic AI proves CPU + GPU chip stack dominance. All TAMs compound simultaneously.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.0, 0.0, 0.0],
  ebitdaProxy: [0.14, 0.18, 0.22],
  bullMaOptVal: false,

  epsCagr: [6, 13, 18],   // Q2 2026: raised from 5/10/14 — base now tracks Street (FY27E +26%, then ~10%/yr); 10% sat well below consensus
  exitPE: [22, 27, 30],
  prob: [20, 50, 30],

  debtSafety: {
    netDebt: 190615,       // TIKR LTM, Nov 6 2026. This was -40000 — the sign was wrong, not just the magnitude.
    ebitda: 181219,        // LTM reported EBITDA (49,025 + 47,449 + 42,797 + 41,948)
    fy: 'LTM Q3 2026',
    note: 'No longer net cash: Amazon issued $152.9B of debt in four quarters against $28.8B repaid, and the file still said net cash $40B. Still GREEN, but by Step 2 at 1.05x rather than Step 1. The thing to watch is unchanged and now much larger — LTM FCF is -$46.9B.',
  },

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

import { defineStock } from './defineStock';

export const ANET = defineStock({
  ticker: 'ANET',
  name: 'Arista Networks',
  sector: 'Cloud Networking',
  themeColor: '#6366f1',
  updatedOn: '11/06',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-07',
  currentPrice: 170.8,
  fairPriceRange: '$190 - $289',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 1280,       // Q4 2026 guided diluted (TIKR Q3 actual 1,278.20 weighted diluted, 1,262.20 basic)
  rev25: 9006,         // FY2025. FY26 is now $13,352M from TIKR's actual quarters ($2,709.0 + $3,035.7 + $3,657.6) plus the $3.95B Q4 guide midpoint — +48.3%, against the $12.68B consensus this file was built on. FY27 is guided to ~$18.5B.
  fcfMargin25: 0.47,   // FY2025. FY26 is running 40.3% through three quarters and LTM is 42.2% — see fcfMargin below.
  taxRate: 0.21,       // guided for Q4 and FY27. TIKR LTM actual is 18.5%, so this is the conservative of the two.
  cash: 14359,         // TIKR LTM net cash at 9/30/26; management said $14.4B of cash and marketable securities, no debt
  debt: 0,
  beta: 1.64,          // TIKR 5-year beta, Nov 6 2026 (was 1.10). This raises the WACC and is the single biggest adverse input in this update.
  costDebt: 0.045,
  rsRating: 77,         // IBD RS per user, 11/07/2026 (83 -> 99 -> 77). Still over the 70 momentum line, and the
                        // 11.5% CAGR clears the hard 10% BUY line without the quality boost, so nothing moves.
  rsTrend: 'falling',   // 99 -> 77 on the user's own successive reads
  aiImpact: 'TAILWIND',
  // Q3 2026 UPDATE (Nov 7 2026) — call plus TIKR quarterly actuals
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $3,657.6M, +58.5% y/y — the largest year-over-year growth in
  // Arista's history as a public company, and well above the ~$3.3B guided.
  // Non-GAAP gross margin 64%, operating margin 49.1%, net income $1.53B,
  // diluted EPS $1.20 against a $1.06-1.08 guide. FY26 guidance raised for
  // the FOURTH time this year, to just over $13.3B (+48%).
  //
  // FY27 FIRST GUIDE, and it is the reason this file changed shape: revenue
  // +38-40% to ~$18.5B, gross margin 62-64%, operating margin ~49%, tax ~21%.
  // Within it, AI fabrics double to ~$7B from $3.5B and campus grows 60% to
  // ~$2B from $1.25B. The model's base case had FY26 at +40% and FY27 at
  // +27%; both were too low, the first by an actual and the second by a
  // guide. revGrowth now starts from the actual and takes the guide.
  //
  // THE OFFSET IS CASH CONVERSION, and it is why this is not a straight
  // upgrade. FCF margin by quarter: 49.2% -> 60.5% -> 34.7% -> 30.1%. FY26 is
  // running 40.3% against FY25's 47%, because inventory went $2.5B -> $3.2B
  // (a $674.6M build in Q3 alone) and purchase commitments $9.7B -> $11.4B,
  // now including a multi-year memory agreement. Management says the
  // fluctuations continue. fcfMargin starts at 0.40 and recovers as the
  // inventory ships, which is what it was bought for.
  //
  // Beta 1.10 -> 1.64 per TIKR, which raises the WACC and is the single
  // biggest adverse input here — it works against the revenue upgrade.
  //
  // Two quirks worth not misreading. GAAP EPS of $1.22 EXCEEDS the $1.20
  // non-GAAP, because Other Non Operating income was +$135.8M in Q3 against
  // ~$4M in prior quarters. And deferred revenue FELL slightly to $6.8B
  // while revenue grew 58.5% — management's point being that the P&L did not
  // need to draw deferred down to get there.
  //
  // RS REFRESHED 11/07: 99 -> 77. Nothing moves — above the 70 momentum line and
  // the 11.5% CAGR clears the hard 10% BUY line unaided, so neither the rating nor
  // the group depends on it. Still not updated: the analyst target low/high/count
  // (Oct 9, pre-print). Street target median is TIKR's $246.25, within 1% of the
  // $248 it replaces.
  // ─────────────────────────────────────────────────────────────────────────


  analystConsensus: { rating: 'Strong Buy', targetLow: 190, targetMedian: 246.25, targetHigh: 289, numAnalysts: 32 },  // median = TIKR street target, Nov 6 2026; low/high/count still stockanalysis Oct 9
  revGrowth: [
    [0.483, 0.30, 0.13, 0.11, 0.10],   // Bear: FY26 is actual, so a bear case can only start at FY27 — guide missed on supply or AI digestion, then normalizes
    [0.483, 0.386, 0.23, 0.18, 0.15],  // Base: FY26 actual +48.3%, FY27 at the guided ~$18.5B midpoint, then decay. Reaching ~$32B by FY30 is ~16% of the >$200B TAM management sizes
    [0.483, 0.42, 0.30, 0.25, 0.20],   // Bull: above the guide, scale-up reaching production in 2028 as described, campus compounding off the 60% it is guided to in 2027
  ],
  fcfMargin: [
    [0.38, 0.38, 0.385, 0.39, 0.39],     // Bear: the working-capital drain does not reverse
    [0.40, 0.43, 0.45, 0.46, 0.465],     // Base: FY26 is running 40.3%, down from FY25's 47%, entirely on inventory ($2.5B -> $3.2B) and purchase commitments ($9.7B -> $11.4B). Recovers as the inventory ships, which is what it was bought for
    [0.41, 0.45, 0.47, 0.48, 0.49],      // Bull: the build converts quickly and conversion returns to the FY25 level
  ],
  exitMultiple: [18, 28, 32],
  desc: [
    'AI capex cycle peaks in 2026 and hyperscaler networking spend normalizes. FY26 lands near ~$12.4B (H1 + Q3 guide lock most of it) but supply-chain de-commits and memory/wafer cost inflation cap upside; growth decelerates from 25% to high-single digits by FY30 as the law of large numbers bites. ' +
      'Component cost pressures squeeze FCF margins from 46% toward 44% as Arista absorbs pricing rather than passing it through. Market re-rates from ~53x to 18x EBITDA-equivalent as growth premium evaporates — Arista treated as a mature networking vendor. 5yr target {target} ({cagr} annualized).',
    'AI networking demand stays production-scale — FY26 ~$12.6B revenue (~+40% YoY, raised through the year) with AI fabrics more than doubling and 100+ customers in 800G; FY27 grows high-20s. Growth decelerates naturally to mid-to-high teens as campus ($1.25B target) and EOS platform stickiness ' +
      'sustain above-market expansion; scale-across via 7800R adds a third leg. FCF margins hold at ~47% on CloudVision software mix shift, offsetting supply-chain margin pressure. P/E compresses from ~53x to 28x through earnings growth. Zero-debt fortress with $13.3B cash. 5yr target {target} ({cagr} annualized).',
    'AI supercycle extends into 2028+ — 1.6T ethernet and XPO optics (100+ vendor endorsements) ramp in 2027, ESUN unlocks scale-up rack opportunities (5–7 designs in active engineering with Ken/Hugh teams). ' +
      'Scale-across becomes the dominant differentiated workload as power-constrained sites force distribution; 1–2 new 10%+ customers emerge beyond Microsoft/Meta. Revenue sustains 20%+ growth on diverse-accelerator (AMD MI, TPU) traction and neocloud/sovereign wins. CloudVision software scales FCF margins to 48%. Market maintains premium 32x on structural AI infrastructure compounder. 5yr target {target} ({cagr} annualized).',
  ],

  termGrowth: [0.02, 0.03, 0.035],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.48, 0.50, 0.52],

  driverOverrides: [   // base entry carries no revPrem/fcfUplift premium (removed Oct 2026 — the base view lives in revGrowth/fcfMargin)
    {},
    {},
    {
      revPrem: [0.01, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.01, 0.01, 0.01],
    },
  ],
  debtSafety: {
    netDebt: -14359,       // TIKR LTM at 9/30/26
    ebitda: 6050,          // FY26E GAAP: $1,181.1 + $1,401.4 + $1,666.0 actual plus Q4 at ~45% of the $3.95B guide, plus D&A. TIKR LTM GAAP EBITDA is $5,304.2M.
    fy: 'FY26E',
    note: 'Zero debt, $13.3B cash & securities (Jun 30 2026). One of the cleanest balance sheets in networking. Net cash exceeds annual EBITDA nearly 3×.',
  },
});

import { defineStock } from './defineStock';

export const EME = defineStock({
  ticker: 'EME',
  name: 'EMCOR Group, Inc.',
  updatedOn: '10/26',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  sector: 'Facilities Services · Data Center Infrastructure',
  themeColor: '#22d3ee',
  currentPrice: 665.73,
  fairPriceRange: '$885 - $1,200',  // stockanalysis.com analyst target range (Aug 8 2026)
  shares0: 44.11,
  rev25: 16990,             // FY2025A; revGrowth[0] = FY26 (guide $20.0-20.5B raised; consensus $20.3B, +19.6%), FY27E $22.3B (+10%)
  fcfMargin25: 0.058,       // ~5.8% FCF margin; OCF $1.3B / $16.99B rev
  taxRate: 0.245,
  cash: 924,                // Jun 2026 (stockanalysis)
  debt: 548,
  beta: 1.08,
  costDebt: 0.052,
  baseEps: 32.86,           // FY26E EPS consensus (guide raised at Q2 to $32.00-33.25; FY25A $25.87; FY27E $36.75 +12%)
  modelType: 'EPS_PE',
  rsRating: 88,             // IBD RS per user, 10/11/2026 (was 83)
  rsTrend: 'rising',
  // ratingOverride 'HOLD' dropped per user 10/11/2026 — RS 88 rising met the upgrade trigger; the model's BUY (~9% base CAGR, quality-boosted) stands.
  aiImpact: 'TAILWIND',
  // Q2 2026 UPDATE (Jul 30, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Record revenue $5.15B (+19.8%; organic +19.6%), diluted EPS $9.06
  // (+34.8%; beat ~$7.23), op margin 10.6%. Record RPO $17.14B (+$5.2B y/y).
  // FY26 GUIDE RAISED: revenue $20.0-20.5B (from $18.5-19.25B), EPS
  // $32.00-33.25 (from $28.25-29.75). Buying five union electrical
  // contractors (~$625M trailing revenue). Street: Buy (10), PT $885-1,200
  // (median $1,047); FY26E rev $20.3B / EPS $32.86, FY27E $22.3B / $36.75.
  // Stock $789.45 (~24× FY26E) — below the lowest analyst target.
  // ─────────────────────────────────────────────────────────────────────────



  // ── Scenarios ──
  epsCagr: [5, 11, 16],        // From the FY26E $32.86 base (re-based Oct 2026; was [7,13,17] off
                               // FY25A $25.87). Cut to 9 on Oct 27 and put back the same day — the
                               // cut rested on the target clearing the $1,200 analyst high, and a
                               // 12-month price target is not a ceiling on a 5-year model (see
                               // RULEBOOK.md). The other argument was that 11% to FY31 outruns this
                               // scenario's own revenue tapering to 7-8%, which is not evidence
                               // either: revGrowth is inert for EPS_PE — projectionService computes
                               // it and no component reads it. On the one data-vs-data test, 11% is
                               // the better fit: $32.86 x 1.11 = $36.47 against FY27E consensus
                               // $36.75, where 9% gives $35.82. A higher target is also what a 27%
                               // guidance raise at Q2 ($32.00-33.25 from $28.25-29.75) should
                               // produce.
                               // THE TERMINAL RATE WAS THE OPEN QUESTION AND IT CHECKS OUT (Oct 27
                               // research): 11% sits almost exactly between the two published
                               // long-term estimates — Chartmill 8.17%, Simply Wall St 12.77%/yr —
                               // and in line with consensus for FY27 (~+11%) and FY28 (~+12.7%). It
                               // is far below what the company has actually done, ~31-40%/yr over
                               // the past five years. Conservative against history, middling against
                               // forecasts; not aggressive on any reading.
                               // The limit on that evidence: nobody publishes guidance past 2026 and
                               // consensus thins after FY28, so years 4-5 are corroborated by
                               // nothing. The risk named in the coverage is margins rather than
                               // demand — mechanical margins already fell YoY on project mix, plus
                               // labour availability, tariffs, supply chain and amortisation from
                               // the five electrical contractors being acquired.
  exitPE: [16, 22, 27],        // bear: ordinary industrial; base: quality cyclical; bull: premium for DC visibility
  prob: [20, 50, 30],       // nudged bull after DC RPO +60% YoY and AI mechanical multiplier confirmed


  analystConsensus: { rating: 'Buy', targetLow: 885, targetMedian: 1047, targetHigh: 1200, numAnalysts: 10 },  // stockanalysis.com (Aug 8 2026)
  revGrowth: [
    [0.17, 0.02, 0.00, -0.02, 0.03],  // Bear: FY26 near guide, then data-center digestion
    [0.20, 0.10, 0.08, 0.08, 0.07],   // Base: FY26 ≈ $20.3B, FY27 ≈ consensus, then HSD
    [0.21, 0.14, 0.12, 0.10, 0.10],   // Bull: AI data-center supercycle + M&A
  ],
  fcfMargin: [
    [0.048, 0.045, 0.042, 0.040, 0.042],
    [0.058, 0.058, 0.060, 0.060, 0.060],
    [0.060, 0.062, 0.065, 0.068, 0.070],
  ],
  termGrowth: [0.02, 0.03, 0.035],
  exitMultiple: [12, 16, 20],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.08, 0.10, 0.12],
  bullMaOptVal: 706 * 44.7 * 0.04,

  desc: [
    'Data center demand drops sharply after the 2026 surge, and margins drift back toward the 8-8.5% range as variable union labor absorbs only part of the pain. ' +
      'The market re-rates EMCOR as an ordinary industrial at 16x; earnings grow only ~5% annually from the FY26E $32.86. The downside is a valuation reset, not bankruptcy risk. 5yr target {target} ({cagr} annualized).',
    'Data center demand normalizes but holds at healthy levels; the record $17B RPO converts and organic growth runs high-single digits, supported by tuck-in M&A and buybacks. ' +
      'Earnings compound ~11% from $32.86 and the market values EMCOR as a quality cyclical at 22x. 5yr target {target} ({cagr} annualized).',
    'The AI data center supercycle extends through 2031; the larger mechanical/electrical scope on AI builds drives disproportionate growth, prefab/VDC productivity pushes margins higher, and acquisitions execute well. ' +
      'Earnings compound ~16% and the market pays a 27x premium for execution and visibility. 5yr target {target} ({cagr} annualized).',
  ],

  debtSafety: {
    netDebt: -376,         // Jun 2026 (stockanalysis): ~$924M cash − ~$548M debt
    ebitda: 1990,          // TTM EBITDA
    fy: 'TTM Q2 2026',
    note: 'Net cash ~$0.4B. Strong FCF supports the M&A pipeline (five electrical contractors being acquired) and ongoing buybacks.',
  },

  burry: {
    sbc: 60,
    gaapNi: 1100,
    buyback: 580,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 10,
    overstatementSource: 'estimated',
    note: 'Pristine — SBC $60M is 5.5% of GAAP NI ~$1.1B. Construction companies structurally have minimal SBC vs. tech peers. Buybacks ($580M) are ~10× SBC — exceptional offset.',
  },

  driverOverrides: [
    {
      revPrem: [0, 0, 0, 0, 0],
      fcfUplift: [0, 0, 0, 0, 0],
    },
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.003, 0.003, 0.005, 0.005, 0.005],
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
    },
  ],
});

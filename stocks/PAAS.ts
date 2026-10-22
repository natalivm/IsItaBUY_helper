import { defineStock } from './defineStock';

export const PAAS = defineStock({
  updatedOn: '10/22',
  ticker: 'PAAS',
  name: 'Pan American Silver Corp',
  sector: 'Precious Metals Mining · Silver & Gold',
  themeColor: '#94A3B8',
  currentPrice: 43.65,
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-11',
  fairPriceRange: '$51 - $94',  // stockanalysis.com analyst target range (Sep 18 2026)
  shares0: 417.1,     // stockanalysis (Oct 2026) — buybacks
  rev25: 3620,        // FY2025A; revGrowth[0] = FY26 (consensus $4.50B, +24%), FY27E $4.80B (+7%)
  fcfMargin25: 0.331,
  taxRate: 0.20,
  cash: 1710,         // Jun 2026 (stockanalysis); company cites $1.8B cash + investments
  debt: 841,
  beta: 1.20,
  costDebt: 0.05,

  modelType: 'EPS_PE',
  baseEps: 3.67,      // FY26E adj. EPS consensus (Sep 18 2026; range $3.16-5.14; FY25A ~$2.54, FY27E $4.75). Prior $3.89.

  rsRating: 78,       // IBD RS per user, 10/11/2026 (was 54)
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',
  // Q2 2026 UPDATE (Aug 12, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // Attributable FCF $344M; attributable silver output 6.5Moz (high end of
  // guidance); record $300M returned via dividends + buybacks. Cash and
  // investments $1.8B; revolver enlarged to $1.5B (+$750M accordion).
  // Street: Buy (9), PT $51-94 (median $57); FY26E rev $4.50B / EPS $3.67,
  // FY27E $4.80B / $4.75. Stock $46.27 (~12.6× FY26E), up ~16% over 52
  // weeks; TTM FCF $1.3B. Fully unhedged to silver and gold prices.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Fully unhedged silver and gold exposure provides maximum leverage to a continuing precious metals bull market',
    'Juanicipio is a world-class low-cost silver operation delivering strong free cash flow at current metal prices',
    'Escobal restart represents substantial optionality — a large, permitted mine that could add meaningful EPS uplift',
    'Record free cash flow and net cash balance sheet provide financial strength to pursue growth and return capital',
    'Record shareholder returns through dividends and buybacks show the cash generation is real at current metal prices',
  ],

  risksToBuy: [
    'No hedging means operating leverage works brutally in reverse if silver corrects even moderately from highs',
    'Strong momentum in commodity stocks frequently precedes volatile mean-reverting phases',
    'Escobal restart depends on Guatemalan regulatory and community approvals entirely outside management control',
    'No pricing power, no moat, no recurring revenue — the entire thesis rests on macro metal prices staying elevated',
    'A silver price correction to prior-cycle norms could cut the stock roughly in half from current levels',
  ],

  epsCagr: [-10, 6, 15],   // From the FY26E $3.67 base at high metal prices (re-based Oct 2026; was [-10,8,18] off $3.89)
  exitPE: [12, 15, 20],    // Miner multiples: trough / mid-cycle / bull-market premium (was [14,17,22])
  prob: [30, 40, 30],


  analystConsensus: { rating: 'Buy', targetLow: 51, targetMedian: 57, targetHigh: 94, numAnalysts: 9 },  // stockanalysis.com (Sep 18 2026)
  revGrowth: [
    [0.20, -0.15, -0.08, 0.00, 0.02],  // Bear: FY26 near consensus, then silver corrects
    [0.24, 0.06, 0.03, 0.03, 0.03],    // Base: FY26 ≈ $4.5B, prices plateau, modest volume growth
    [0.27, 0.12, 0.10, 0.08, 0.07],    // Bull: silver bull market + Escobal restart
  ],
  fcfMargin: [
    [0.20, 0.15, 0.10, 0.10, 0.10],
    [0.30, 0.28, 0.25, 0.25, 0.25],
    [0.33, 0.33, 0.35, 0.35, 0.36],
  ],
  exitMultiple: [5, 7, 10],

  desc: [
    'Silver and gold correct sharply from 2026 levels. Fully unhedged, operating leverage works in reverse: revenue falls 15-20%, operating income drops far more and FCF normalizes well below the current ~$1.3B run-rate. ' +
      'Juanicipio grades decline and Escobal stays suspended. EPS shrinks ~10%/yr from the FY26E $3.67 and the stock trades at a trough 12x. 5yr target {target} ({cagr} annualized).',
    'Metal prices plateau near current levels. FCF stays strong, Juanicipio keeps contributing at declining grades and Skarn Phase 1 adds moderate value; Escobal remains optionality only. ' +
      'Buybacks and dividends continue. EPS grows ~6% annually and the market pays a mid-cycle 15x. 5yr target {target} ({cagr} annualized).',
    'A silver bull market pushes prices materially higher and the unhedged exposure amplifies gains; Juanicipio and Skarn deliver strong FCF and an Escobal restart adds significant earnings uplift. ' +
      'EPS compounds ~15% and the market pays 20x. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Metals cycle reverses, operating leverage brutal on downside. Fully unhedged = maximum pain. ' +
      'Not a structural compounder — no moat, no recurring revenue, no pricing power outside commodity markets. ' +
      'Strong momentum in metals equities is typical of late-phase commodity cycles.',
    'FCF running ~$1.3B TTM with record capital returns, moderate growth from Juanicipio/Skarn, but entirely metal-price dependent. ' +
      'Company in sweet spot: high prices, growing production, low debt — but this is peak-cycle setup. ' +
      'High-single-digit returns are the realistic base case without a further metals rally.',
    'Silver supercycle + Escobal restart + operating leverage = multi-bagger territory. ' +
      'At $40+ silver: Escobal DCF >$4B, consolidated FCF >$2B/yr, EPS >$7-8. ' +
      'PAAS becomes a FCF machine. But this requires macro tailwind, not company execution.',
  ],

  termGrowth: [0.010, 0.015, 0.020],
  waccAdj: [0.015, 0, -0.005],
  bbRate: [0.003, 0.008, 0.012],
  ebitdaProxy: [0.30, 0.48, 0.55],
  bullMaOptVal: false,

  driverOverrides: [
    {
      bbRate: 0.003,
    },
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
      bbRate: 0.008,
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
      bbRate: 0.012,
    },
  ],

  debtSafety: {
    netDebt: -864,         // Jun 2026 (stockanalysis): ~$1.71B cash − ~$0.84B debt
    ebitda: 2120,          // TTM EBITDA
    fy: 'TTM Q2 2026',
    note: 'Net cash ~$0.9B (company cites $1.8B cash + investments) and an enlarged $1.5B revolver. Step 1 GREEN at current metal prices.',
  },
});

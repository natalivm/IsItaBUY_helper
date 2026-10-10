import { defineStock } from './defineStock';

export const AMAT = defineStock({
  ticker: 'AMAT',
  name: 'Applied Materials, Inc.',
  sector: 'Semiconductor Equipment · Deposition & Etch',
  themeColor: '#1a5f7a',
  updatedOn: '10/09',
  lastReportTag: 'Q3 FY26',
  dataReviewedOn: '2026-10-10',
  currentPrice: 507.03,
  fairPriceRange: '$358 - $900',  // stockanalysis.com analyst target range (Sep 28 2026)
  shares0: 800,           // Q3 FY26 diluted 800M; mkt cap ~$406B
  rev25: 28370,           // FY25 revenue $28.37B; FY26E (Oct) consensus $34.25B (+21%), FY27E $46.2B (+35%)
  fcfMargin25: 0.20,      // FCF $5.7B / rev $28.37B ≈ 20%
  taxRate: 0.12,
  cash: 14501,          // Jul 26 2026: $7.04B cash + $2.20B ST + $5.27B LT investments
  debt: 6544,           // Jul 26 2026: $1.30B ST + $5.25B LT
  beta: 1.25,
  costDebt: 0.035,
  modelType: 'EPS_PE',
  baseEps: 12.79,         // FY26E (Oct) non-GAAP EPS — stockanalysis consensus (Sep 28 2026; FY27E $18.48, +44%). Q3 FY26 $3.50 (record) + Q4 guide $4.02 ±0.20. Prior: $11.09 (TIKR, Q1 FY26).
  rsRating: 89,           // IBD RS per user, 10/10/2026 (was 95) — stock well off its peak after the Aug print
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q3 FY26 UPDATE (Aug 13, 2026) — first data review since Q1 FY26
  // ─────────────────────────────────────────────────────────────────────────
  // Records across the board. Revenue $9.12B (+25%): Semiconductor Systems
  // $7.04B (+27%; mix foundry/logic 67%, DRAM 26%, flash 7%), AGS $1.78B
  // (+22%), Display/other $294M. Non-GAAP GM 50.4% (+150bps), op margin
  // 34.0% (+330bps). Non-GAAP EPS $3.50 (+41%), GAAP $3.17. FCF $2.33B (9M
  // $3.58B, flat on EPIC capex). China 28% of revenue (from 35%). Cash +
  // investments $14.5B vs debt $6.5B. Q3 buybacks $440M + dividends $420M.
  // Q4 GUIDE: revenue $10.25B ±$0.5B (first $10B quarter), non-GAAP EPS
  // $4.02 ±$0.20 — above consensus. CEO raised CY26 Semi Systems view and
  // expects "another strong growth year in 2027"; capacity investments to
  // support demand through decade-end. Stock sold off on the print anyway
  // ("not impressive enough") and is well off its peak. Street: Strong Buy
  // (40), PT $358-900 (median $645.5); FY26E EPS $12.79, FY27E $18.48.
  // ~40× FY26E / ~27× FY27E. Net: the WFE up-cycle is bigger and longer than
  // the Q1 file assumed; valuation still prices most of it — HOLD.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Dominant position in CVD, PVD, ALD, and etch — process steps required for every advanced node transition.',
    'AGS services segment provides genuinely recurring revenue with multi-year contracts and a very high renewal rate.',
    'AI-driven advanced packaging and gate-all-around transitions at the leading edge require more AMAT steps per wafer.',
    'Multi-year EPS wave cycle with strong consensus visibility through the end of the decade, not a single-year spike.',
    'EPIC capacity investments create a long-term supply advantage that could sustain equipment market share gains.',
  ],

  risksToBuy: [
    'Valuation already prices the full EPS trajectory — multiple compression offsets earnings growth in the base case.',
    'China revenue concentration means any incremental export restrictions would hit revenue and margins immediately.',
    'WFE cycles historically pause for digestion after strong runs, and capex cleanroom constraints could amplify the downturn.',
    'Near-term FCF is compressed by EPIC capacity investment, reducing the cash return cushion if the cycle softens early.',
    'At a premium multiple on up-cycle earnings, the stock needs the cycle to run for years to deliver attractive returns.',
  ],

  epsCagr: [4, 13, 19],   // Q3 FY26: base 11→13, bull 17→19 — consensus FY27E +44% then ~6%/yr still compounds to ~13% from the FY26 base (below AMAT's long-run ~10%+/yr after FY27)
  exitPE: [17, 23, 29],
  prob: [30, 45, 25],


  analystConsensus: { rating: 'Strong Buy', targetLow: 358, targetMedian: 645.5, targetHigh: 900, numAnalysts: 40 },  // stockanalysis.com (Sep 28 2026)
  revGrowth: [
    [0.19, 0.02, -0.05, 0.03, 0.04], // bear: FY26 ~locked (Q4 guided); WFE digestion hits FY28
    [0.197, 0.25, 0.07, 0.06, 0.06], // base (+1%/yr revPrem): FY26 ≈ consensus $34.25B, FY27 +26% (haircut vs +35% consensus), normalization after
    [0.20, 0.33, 0.15, 0.13, 0.11],  // bull (+2%/yr revPrem): AI supercycle, cleanroom capacity added
  ],
  fcfMargin: [
    [0.17, 0.17, 0.18, 0.18, 0.19],  // bear: capex drag persists, margin pressure
    [0.19, 0.20, 0.21, 0.22, 0.22],  // base: FCF rebounds 2027-28 as EPIC normalizes
    [0.21, 0.23, 0.24, 0.25, 0.26],  // bull: volume leverage + services attach
  ],
  exitMultiple: [14, 21, 27],
  desc: [
    'The WFE cycle breaks after the FY27 surge — capex digestion arrives in FY28, NAND stays a small slice of WFE, and China mix drags margins. ' +
      'EPS grows only ~4% annually from the $12.79 FY26E base and the multiple reverts toward 17x as cycle visibility shrinks. ' +
      '5yr target {target} ({cagr} annualized).',
    'Management\'s view plays out: a record FY26 (~$34B revenue), "another strong growth year" in FY27 (consensus EPS +44% to ~$18.5), then normalization as the cycle matures. ' +
      'AGS keeps compounding as a recurring anchor. EPS compounds ~13% from the $12.79 base, but the multiple compresses from ~40x FY26E toward ~23x — the shrinking multiple eats most of the return. ' +
      '5yr target {target} ({cagr} annualized).',
    'AI supercycle extends to 2029-2030: GAA at 2nm and below, HBM/DRAM buildout and advanced packaging all require disproportionately more AMAT deposition and etch steps per wafer. ' +
      'Cleanroom constraints get solved and AGS attach rises. EPS compounds ~19% from the $12.79 base with a 29x exit multiple. ' +
      '5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Bear mechanics: capex cycles historically run 2-3 strong years before digestion. The FY26-27 surge pulls demand forward; physical constraints (cleanroom, supply chain, service engineers) that cap upside also magnify the downside. ' +
      'EPIC capacity capex keeps FCF flat even as EPS rises — if the cycle softens before FCF recovers, the setup deteriorates fast. ' +
      'At ~40x FY26E, a normal WFE pause plus multiple reversion is enough to deliver steep losses from {spot}.',
    'Post Q3 FY26, the up-cycle is stronger and longer than assumed in Q1: record revenue (+25%), 34% operating margin, Q4 guided to the first $10B quarter, DRAM and leading-edge logic accelerating, and management calling for another strong 2027. ' +
      'AGS is a genuine recurring anchor (2/3 under contract, ~90% renewal, growing ~20%). ' +
      'The problem: the market already prices this — ~40x FY26E and ~27x FY27E consensus. EPS grows robustly, but multiple compression offsets most of it. Verdict: HOLD — strong execution at a full price; better entries come in WFE digestion phases.',
    'Bull case requires two things simultaneously: EPS beats the consensus trajectory beyond FY27 AND the multiple holds near 29x. ' +
      'If the AI-driven WFE cycle runs through 2030 and AGS attach rises, {target} is achievable from {spot}. ' +
      'For a WFE business, sustaining ~19% EPS growth for five years is aggressive — this is an AI-cycle bet with limited margin of safety at the current price.',
  ],

  termGrowth: [0.015, 0.025, 0.03],
  bbRate: [0.005, 0.015, 0.025],
  ebitdaProxy: [0.28, 0.35, 0.42],

  debtSafety: {
    netDebt: -7957,        // Jul 26 2026: $6.54B debt − $14.50B cash & investments
    ebitda: 12500,         // FY26E: non-GAAP op margin ~33% × $34.25B + D&A — approximate
    fy: 'FY26E',
    note: 'GREEN by Step 1 — net cash (~$8B). Balance sheet is not the risk; WFE cyclicality and China export controls are.',
  },

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.005, 0.005, 0.01, 0.01],
    },
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.015, 0.015, 0.02, 0.02],
    },
  ],
});

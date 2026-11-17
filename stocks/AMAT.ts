import { defineStock } from './defineStock';

export const AMAT = defineStock({
  ticker: 'AMAT',
  name: 'Applied Materials, Inc.',
  sector: 'Semiconductor Equipment · Deposition & Etch',
  themeColor: '#1a5f7a',
  updatedOn: '11/17',
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-11-17',
  currentPrice: 350.25,
  fairPriceRange: '$358 - $900',  // stockanalysis.com analyst target range (Nov 16 2026)
  shares0: 798,           // Q4 FY26 diluted 798M (FY26 799M)
  rev25: 28370,           // FY25 revenue $28.37B; FY26A (Oct) $34.45B (+21.4%), FY27E consensus $47.95B (+39%) (stockanalysis, Nov 16 2026)
  fcfMargin25: 0.20,      // FCF $5.7B / rev $28.37B ≈ 20%
  taxRate: 0.12,
  cash: 14095,          // Oct 25 2026: $7.24B cash + $2.10B ST + $4.76B LT investments
  debt: 6532,           // Oct 25 2026: $1.30B ST + $5.23B LT
  beta: 1.25,
  costDebt: 0.035,
  modelType: 'EPS_PE',
  baseEps: 12.89,         // FY26 (Oct) ACTUAL non-GAAP EPS, reported Nov 12 2026 (GAAP $12.62). Base stays on FY26 — the model's 5y path starts from the year just closed; FY27E consensus $19.29 (+50%, stockanalysis Nov 16 2026). Q1 FY27 guide $4.35 ±0.20. Prior: $12.79 (FY26E consensus, Q3 FY26).
  rsRating: 89,           // IBD RS per user, 10/10/2026 (was 95) — stock well off its peak after the Aug print
  rsTrend: 'falling',
  aiImpact: 'TAILWIND',
  // Q4 FY26 UPDATE (Nov 12, 2026) — fiscal year closed
  // ─────────────────────────────────────────────────────────────────────────
  // Record quarter and year. Q4 revenue $10.41B (+53%): Semiconductor Systems
  // $8.00B, AGS $1.90B, other $517M. Non-GAAP GM 50.6%, op margin 35.3%
  // (record op income $3.68B). Non-GAAP EPS $4.16 (+92%), GAAP $3.40 — beat
  // ~$4.06 / ~$10.30B. FY26: revenue $34.45B (+21%), non-GAAP EPS $12.89,
  // GAAP $12.62 (NI $10.09B), non-GAAP GM 50.1%, op margin 33.1%. OCF $8.87B,
  // capex $2.67B, FCF $6.20B (18% of revenue). Buybacks $3.18B ($2.0B in Q4)
  // + dividends $1.57B; SBC $719M. China 25% of Q4 revenue, 27% of FY26.
  // Q1 FY27 GUIDE: revenue $11.1B ±$0.5B (+58% y/y at the midpoint; Semi
  // Systems ~$8.7B, first $2B AGS quarter), non-GAAP EPS $4.35 ±$0.20 — above
  // ~$4.26 consensus. CEO: Semi Systems on track to grow >40% in CY26;
  // "multi-year revenue and profit growth". Street: Strong Buy (40), PT
  // $358-900, median cut to $565 (from $645.5); FY27E EPS $19.29 / revenue
  // $47.95B. epsCagr HELD at 13 base: FY27E +50% then ~5%/yr reproduces it.
  // Sources: SEC 8-K ex. 99.1 (0001628280-26-073360); stockanalysis.com.
  // ─────────────────────────────────────────────────────────────────────────

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


  epsCagr: [4, 13, 19],   // Held at Q4 FY26. Q3 FY26: base 11→13, bull 17→19. Consensus FY27E is now +50% ($19.29); ~5%/yr after that still compounds to ~13% from the FY26 $12.89 base (below AMAT's long-run ~10%+/yr after FY27)
  exitPE: [17, 23, 29],
  prob: [30, 45, 25],


  analystConsensus: { rating: 'Strong Buy', targetLow: 358, targetMedian: 565, targetHigh: 900, numAnalysts: 40 },  // stockanalysis.com (Nov 16 2026; median was 645.5)
  revGrowth: [
    [0.19, 0.02, -0.05, 0.03, 0.04], // bear: FY26 closed at +21.4% (left as entered — EPS_PE rates on baseEps, not this path); WFE digestion hits FY28
    [0.197, 0.25, 0.07, 0.06, 0.06], // base (+1%/yr revPrem): FY26 ≈ actual $34.45B, FY27 +26% (haircut vs +39% consensus), normalization after
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
      'EPS grows only ~4% annually from the $12.89 FY26 base and the multiple reverts toward 17x as cycle visibility shrinks. ' +
      '5yr target {target} ({cagr} annualized).',
    'Management\'s view plays out: after a record FY26 (~$34B revenue), FY27 is another strong growth year (consensus EPS up roughly half to ~$19), then normalization as the cycle matures. ' +
      'AGS keeps compounding as a recurring anchor. EPS compounds ~13% from the $12.89 base, while the multiple settles at ~23x as the cycle matures — multiple compression takes back part of the earnings growth. ' +
      '5yr target {target} ({cagr} annualized).',
    'AI supercycle extends to 2029-2030: GAA at 2nm and below, HBM/DRAM buildout and advanced packaging all require disproportionately more AMAT deposition and etch steps per wafer. ' +
      'Cleanroom constraints get solved and AGS attach rises. EPS compounds ~19% from the $12.89 base with a 29x exit multiple. ' +
      '5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Bear mechanics: capex cycles historically run 2-3 strong years before digestion. The FY26-27 surge pulls demand forward; physical constraints (cleanroom, supply chain, service engineers) that cap upside also magnify the downside. ' +
      'EPIC capacity capex keeps FCF flat even as EPS rises — if the cycle softens before FCF recovers, the setup deteriorates fast. ' +
      'On peak-cycle earnings, a normal WFE pause plus multiple reversion is enough to deliver steep losses from {spot}.',
    'Post Q4 FY26, the up-cycle keeps strengthening: record FY26 revenue (+21%) and EPS, a first $10B quarter (+53%), 35% operating margin, and Q1 FY27 guided to ~$11.1B with the first $2B services quarter. ' +
      'AGS is a genuine recurring anchor (2/3 under contract, ~90% renewal, growing ~20%). ' +
      'The catch: these are up-cycle earnings. EPS grows robustly, but the exit multiple sits below today\'s, so compression offsets part of it — the base case returns {cagr} a year to {target}. Strong execution; the return depends on the price paid, and better entries come in WFE digestion phases.',
    'Bull case requires two things simultaneously: EPS beats the consensus trajectory beyond FY27 AND the multiple holds near 29x. ' +
      'If the AI-driven WFE cycle runs through 2030 and AGS attach rises, {target} is achievable from {spot}. ' +
      'For a WFE business, sustaining ~19% EPS growth for five years is aggressive — this is an AI-cycle bet with limited margin of safety at the current price.',
  ],

  termGrowth: [0.015, 0.025, 0.03],
  bbRate: [0.005, 0.015, 0.025],
  ebitdaProxy: [0.28, 0.35, 0.42],

  debtSafety: {
    netDebt: -7563,        // Oct 25 2026: $6.53B debt − $14.10B cash & investments
    ebitda: 12500,         // FY26: non-GAAP op margin 33.1% × $34.45B (= $11.4B) + D&A — approximate, not refreshed (tier is set by net cash)
    fy: 'FY26',
    note: 'GREEN by Step 1 — net cash (~$7.6B). Balance sheet is not the risk; WFE cyclicality and China export controls are.',
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

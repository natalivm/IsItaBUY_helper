import { defineStock } from './defineStock';

export const AMD = defineStock({
  ticker: 'AMD',
  name: 'Advanced Micro Devices',
  sector: 'Semiconductors / AI Compute',
  themeColor: '#ed1c24',
  currentPrice: 515.21,
  fairPriceRange: '$365 - $1,250',  // stockanalysis.com analyst target range, Oct 6 2026
  shares0: 1670,        // Q4 2026 guided diluted, including the Taalas and World Labs closings. Customer warrants are NOT in it — management defers that to 2027 guidance once the vesting conditions are met.
  rev25: 34639,         // FY2025 actual per TIKR (12/27/25); FY26E consensus $50.95B (+47%), FY27E $88.94B (+75%)
  fcfMargin25: 0.155,   // LTM per TIKR: CFO $9,123M − capex $2,067M = $7,056M on $45,436M of revenue. Corrects an 0.06 I derived by annualising Q3's $554M, which was one quarter distorted by a $3B inventory build and is not the run rate. The trend is still down — FY25 was 19.4% — as working capital and capacity capex fund the 2027 ramp.
  taxRate: 0.13,
  cash: 15800,          // Sep 2026 cash + ST investments
  debt: 7100,           // Sep 2026, including the $4.75B senior notes issued in August
  beta: 2.54,           // TIKR 5-year beta, Nov 6 2026 (was 1.85)
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 7.56,        // FY2026E non-GAAP EPS from the Q3 call: $0.89 + $1.66 + $2.09 actual + $2.92 guided (Q4 at $17B, 55% GM, $3.75B opex, 13% tax, 1.67B shares). Lands on the $7.59 consensus it replaces — the Q4 guide came in exactly where the street had FY26. Prior: $7.59 (stockanalysis consensus, Oct 6 2026).
  rsRating: 79,         // IBD RS per user, 11/07/2026 (97 -> 99 -> 79). It gates the quality boost that IS the
                        // difference between BUY and HOLD here — the 9.3% CAGR is under the hard 10% BUY line —
                        // but 79 is far above the 30 floor, so the verdict and the group both hold.
  rsTrend: 'falling',   // 99 -> 79 on the user's own successive reads
  aiImpact: 'TAILWIND',
  // ratingOverride REMOVED 2026-11-07. It read 'HOLD' and was set after Q2 2026,
  // when the stock was $608 on ~80x FY26E / ~39x FY27E and the base case landed
  // at spot — about a 1% CAGR — so flooring it at HOLD stopped the model calling
  // the #2 AI platform OVERVALUED on a technicality. At $449 and ~59x / ~28x that
  // premise is gone: the base case now lands at a 9.3% CAGR and the model reads
  // BUY on its own. A hard override was no longer preventing an overstatement, it
  // was suppressing the model's actual answer. Restoring it is one line if the
  // judgement goes the other way.
  updatedOn: '11/11',
  lastReportTag: 'Q3 2026',
  dataReviewedOn: '2026-11-06',

  // Q3 2026 UPDATE (Nov 6 2026) — read off the earnings call
  // ─────────────────────────────────────────────────────────────────────────
  // Largest and most profitable quarter in AMD's history. Revenue $13.4B
  // (+45% y/y, +16% q/q) beat the high end; non-GAAP EPS $2.09 (+74%). Data
  // Center $8.5B (+97%, 64% of revenue vs 47% a year ago) with segment op
  // margin 34% vs 25%. Embedded $1.1B (+29%), fourth straight quarter of
  // accelerating growth. Client $2.9B (+7%) but Gaming $773M (-40%), so
  // Client+Gaming fell 8%. Non-GAAP GM 56% (+190bps), op income $3.9B (+75%),
  // op margin 29% (+5pts).
  //
  // Q4 GUIDE: revenue ~$17B ±3% (+66% y/y, +27% q/q) with data center up ~50%
  // sequentially, GM ~55%, opex ~$3.75B, tax 13%, 1.67B diluted shares. Q4 is
  // the quarter data center AI revenue passes server revenue in dollars.
  //
  // 2027, which is the real news: revenue to grow MORE THAN 80% (was a 75%
  // consensus), server to double (guided +70% ninety days ago), data center AI
  // faster than previously projected, data center above 80% of total revenue,
  // and opex held to less than half the revenue growth rate. Rebuilding FY27
  // from those pieces gives EPS ~$15.82 against the $15.72 already assumed —
  // the call CONFIRMS the consensus step-up rather than raising it. What
  // genuinely improved is the tail, not FY27.
  //
  // The other side. FCF collapsed to $554M (4% of revenue) on a $3B
  // sequential inventory build to $11.5B plus capacity capex, and management
  // says both continue through 2027. Memory and component costs are
  // inflationary and are being shared with customers rather than absorbed.
  // Management plans for PC market units DOWN a double-digit percentage in
  // 2027. Demand exceeds supply, so the 2027 number is a supply plan as much
  // as a demand forecast. GAAP EPS was $1.46 against non-GAAP $2.09 — a $1.1B
  // non-cash warrant charge that grows with the share price.
  //
  // VERIFIED AGAINST TIKR (Nov 6 2026 close, $449.04, +11.04% on the day).
  // LTM revenue $45,436M, gross margin 56.0%, operating income $8,097M
  // (17.8%), net income $7,619M, CFO $9,123M, capex $2,067M. Beta 2.54.
  // Street target $650.22. NTM P/E 27.80x implies NTM EPS $16.15, which
  // corroborates the $15.82 FY27 rebuilt from the guide above to within 2%.
  // Two entries here were wrong and are corrected by it: fcfMargin25, which
  // I had set to 0.06 by annualising one working-capital-distorted quarter
  // against a real LTM 15.5%, and the burry block, whose $487M SBC and
  // $5,009M net income were both well off the LTM $1,999M and $7,619M.
  //
  // RS REFRESHED 11/07: 99 -> 79. Nothing moves — still above the 70 momentum
  // line, so BUY / PRIME_GROWTH either way — but note the boost is load-bearing:
  // the 9.3% CAGR clears only the soft 8% BUY threshold, so a collapse below 30
  // would take this to HOLD. 79 is nowhere near that.
  // Still not updated: the analyst target low/high/count (Oct 6, pre-print).
  // ─────────────────────────────────────────────────────────────────────────



  analystConsensus: { rating: 'Strong Buy', targetLow: 365, targetMedian: 650.22, targetHigh: 1250, numAnalysts: 55 },  // median = TIKR street target, Nov 6 2026; low/high/count still stockanalysis Oct 6 and pre-print

  revGrowth: [
    [0.40, 0.20, 0.10, 0.08, 0.07],   // Bear: FY26 ~locked (H1 + Q3 guide); Helios ramp disappoints, AI digestion
    [0.455, 0.60, 0.18, 0.15, 0.12],  // Base (+1.5%/yr revPrem): FY26 ≈ consensus $51B, FY27 +62% (haircut vs +75% consensus), then normalizes
    [0.45, 0.72, 0.25, 0.20, 0.15],   // Bull (+2-2.5%/yr revPrem): FY27 at/above consensus, share gains accelerate
  ],

  fcfMargin: [
    [0.13, 0.14, 0.15, 0.16, 0.17],   // Bear: opex growth stalls margin expansion
    [0.16, 0.19, 0.22, 0.24, 0.26],   // Base: gradual mix shift to high-margin AI
    [0.20, 0.24, 0.28, 0.31, 0.34],   // Bull: AI mix dominates, margins toward NVDA territory
  ],

  exitMultiple: [14, 20, 26],

  desc: [
    'AI capex pauses for digestion as hyperscalers slow deployments. NVDA software moat (CUDA) widens; AMD MI300/450 ramps disappoint. ' +
      'Data center growth drops to <25%, margins stall at 50-52%, opex creep (+34% YoY current) eats into profit. ' +
      'The 2027 plan is a supply plan — management says demand exceeds supply — so a hyperscaler pause converts straight into a miss. PC units fall the double digits management is planning for and memory cost inflation is not passed on. EPS compounds only ~13% from the $7.56 FY26E base and the multiple compresses to ~20×. 5yr target {target} ({cagr} annualized).',
    'The Helios/MI450 ramp roughly doubles EPS in FY27 — rebuilt from the guide it is $15.82, which is where consensus already sat — then growth normalizes as the base gets large. AMD wins durable AI share but NVDA still dominates training. ' +
      'Opex held to less than half the revenue growth rate carries operating margin up from 29%; gross margin caps near 55-57% as data center AI mix dilutes it. EPS compounds ~30% from the $7.56 base. ' +
      'Multiple compresses 59× FY26E → 25× as the cycle matures. 5yr target {target} ({cagr} annualized) — business performs, stock already prices it.',
    'AI super-cycle extends 2027-2029. AMD captures durable hyperscaler share with MI450/Helios, OpenAI partnership scales, Meta deal expands. ' +
      'MI500 and MI600 land into multi-gigawatt deployments already being planned with frontier labs, and the server TAM reaches the ~$220B management sizes for 2030. Margins push toward 58-60% on AI mix and embedded strength. EPS compounds ~38% from the $7.56 base. ' +
      'Market maintains a premium ~30× given the structural #2 position. 5yr target {target} ({cagr} annualized) — requires near-perfect execution.',
  ],

  thesis: [
    'AI demand cycle digests faster than expected. Hyperscaler optimization commentary (MSFT/AMZN/GOOG) replaces capacity expansion. ' +
      'NVDA software ecosystem (CUDA, NIM, NVLink) proves harder to displace than AMD\'s ROCm gains suggest. ' +
      'Free cash flow is already the tell: $554M on $13.4B of revenue, with a $3B inventory build and capacity capex that management says continue through 2027. Growth is being pre-funded. ' +
      'At ~59× FY26E the stock still prices a clean FY27 ramp, and the 2027 number is a supply plan against demand that exceeds it. ' +
      'Single-engine concentration is now worse, not better: data center is 64% of revenue and guided above 80% in 2027, so an AI capex pause is the whole story.',
    'Data center growth proves durable but normalizes. AMD genuinely wins share at hyperscalers (Meta, OpenAI, AWS Trainium-2 alternative) but NVDA stays #1 by wide margin. ' +
      'EPYC server CPU continues taking share from Intel — that part is structural, not cyclical. ' +
      'MI300/MI450 ramps cleanly but the ecosystem gap means premium pricing stays compressed vs NVDA. ' +
      'Margins improve to 55-57% via mix shift, but the 5-7pt gap to NVDA persists due to software moat. ' +
      'Q3 showed the operating leverage working — revenue +45%, operating income +75%, op margin +5pts — and management has committed to opex growing at less than half the revenue rate in 2027. ' +
      'EPS compounds healthily and the {spot} entry is no longer the $608 one this case was written against; returns come from EPS growth while the multiple compresses.',
    'AI super-cycle extends through 2028-2029 and AMD becomes a durable #2 platform with real software ecosystem (ROCm matures, AMD-native frameworks). ' +
      'MI450/Helios delivers competitive performance at attractive pricing → repeat orders, not pilots. ' +
      'OpenAI partnership scales to multi-billion-dollar revenue, Meta partnership expands. Custom silicon (Pensando, Xilinx) cross-sells. ' +
      'Margins push toward NVDA-like 58-60% on AI mix dominance. EPS compounds at 38%, market awards a sustained 30× premium. ' +
      'Requires execution and the AI capex cycle to hold together — but the supply is now contracted and the 2027 customer deployments are located, which is further than this case stood a quarter ago.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.005, 0.010, 0.015],
  ebitdaProxy: [0.20, 0.28, 0.36],
  bullMaOptVal: false,

  epsCagr: [13, 30, 38],   // Base 30% (was 28): FY27 EPS rebuilt from the guide is $15.82, which only CONFIRMS the $15.72 consensus already assumed — what improved is the tail. 90 days ago management guided server +70% and data center more than doubling; it is now server doubling, data center AI faster still, company revenue +80%, and opex held to less than half the revenue growth rate. Bear cut to 13 for the new explicit drag: management plans for PC market units down a double-digit percentage in 2027, on top of memory and component cost inflation.
  exitPE: [20, 25, 30],    // Unchanged by the call. The stock is ~59x FY26E / ~28x FY27E at $449, against ~80x / ~39x when this was last set at $608 — cheaper, but the de-rating came from the price, not from anything in this quarter.
  prob: [25, 50, 25],

  driverOverrides: [
    {},
    {
      revPrem: [0.015, 0.015, 0.015, 0.015, 0.015],
      fcfUplift: [0.01, 0.01, 0.01, 0.015, 0.015],
    },
    {
      revPrem: [0.025, 0.025, 0.02, 0.02, 0.02],
      fcfUplift: [0.015, 0.02, 0.02, 0.025, 0.025],
    },
  ],

  burry: {
    sbc: 1999,          // TIKR LTM through Q3 2026. FY25 $1,638M, FY24 $1,407M, FY23 $1,384M.
    gaapNi: 7619,       // TIKR LTM. FY25 $4,335M.
    buyback: 355,       // NOT re-verified — the Nov 6 TIKR pull did not include the financing section.
    epsBasis: 'NON_GAAP',
    fy: 'LTM Q3 2026',
    overstatementPct: 32,
    overstatementSource: 'burry-published',
    note: 'Critical per Burry — 32%, his published figure, kept as published. The inputs behind it are now TIKR actuals rather than estimates, and they correct this entry twice over: SBC is $1,999M LTM, not the $487M a previous TIKR read recorded, and GAAP net income is $7,619M, not $5,009M. Naive SBC/NI is therefore 26% rather than the 40% those old inputs implied. Dilution remains the real story: diluted share count went from 1,229M (FY21) to 1,640M outstanding today, +33% over five years, and buybacks have not inflected to cover it — SBC has risen every year (1,384 → 1,407 → 1,638 → 1,999) while the stock went up 4-5x, so the mark-to-market cost of those grants compounds.',
  },
  debtSafety: {
    netDebt: -6565,        // TIKR LTM, Nov 6 2026, and the figure that reconciles to the $663.3B market cap vs $656.7B enterprise value. Management's own Q3 numbers — $15.8B cash and short-term investments against $7.1B of debt — give -$8.7B; TIKR's debt definition is wider, most likely leases.
    ebitda: 11143,         // TIKR LTM: operating income $8,097M + total D&A $3,046M. Cross-checks against TIKR's own LTM net debt/EBITDA of -0.57x, which implies $11.5B.
    fy: 'LTM Q3 2026',
    note: 'GREEN by Step 1 — net cash of $6.6B against $11.1B of LTM EBITDA. Net cash has fallen though: the August $4.75B notes and a $3B inventory build took it from roughly $9.9B at Q2. Not a leverage concern, but it is no longer a fortress getting stronger.',
  },
});

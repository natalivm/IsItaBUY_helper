import { defineStock } from './defineStock';

export const SEZL = defineStock({
  ticker: 'SEZL',
  name: 'Sezzle Inc.',
  sector: 'FinTech / Buy Now, Pay Later',
  themeColor: '#6d28d9',
  updatedOn: '10/09',
  lastReportTag: 'Q2 2026',
  dataReviewedOn: '2026-10-10',
  currentPrice: 128.64,
  fairPriceRange: '$150 - $196',  // stockanalysis.com analyst target range (PTs as of Aug 20 2026)
  shares0: 33.59,         // Finviz Shs Outstand 33.59M (Q2 2026 diluted weighted 34.7M) (float only 16.74M; insiders own ~51%)
  rev25: 450.28,          // FY2025 total revenue $450.28M (+66% YoY); TTM $480.91M
  fcfMargin25: 0.308,     // FY2025 profit margin ~30.8% (NI $133.13M / rev $450.28M)
  taxRate: 0.22,          // FY2025 effective tax 18.3% actual; consensus forward ~22-23% (TIKR 26E 22.5%, 27E 23%)
  cash: 112,             // Jun 30 2026: $112.0M cash incl. $32.3M restricted; warehouse line funds the receivables
  debt: 123.5,          // Jun 30 2026: $123.5M drawn on the new $300M Mesirow facility (funds consumer receivables, lower cost of capital)
  beta: 2.8,            // Modeled high-vol beta; trailing Finviz beta is an extreme 6.49 (artifact of the parabolic +169% YTD move)
  costDebt: 0.10,
  modelType: 'EPS_PE',
  baseEps: 5.25,        // FY2026E adjusted EPS = guide $5.25 (raised at Q2 2026 from $5.10; consensus $5.26, FY27E $6.65 +26%). Adjusted ≈ GAAP here (Q2 GAAP $1.17 vs adj $1.13). Prior: $5.12. DCF distorted because the warehouse facility funds receivables, not corporate operations — lender => EPS_PE.
  rsRating: 94,        // IBD RS per user, 10/10/2026 (was 90)
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',  // AI assists underwriting, but BNPL is fundamentally a consumer-credit business, not an AI beneficiary

  // Q2 2026 UPDATE (Aug 6, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Beat-and-raise, then a violent sell-off. GMV $1.3B (+37.9%); revenue
  // $149.7M (+51.7%). Transaction-related costs $54.6M = 4.3% of GMV (+0.2pt
  // y/y — watch item). Net income $40.8M (+48%), GAAP EPS $1.17; adj. EBITDA
  // $58.0M (38.8% margin); adj. EPS $1.13 (vs $0.70). Active subscribers 854K
  // (+76%); MODS 982K (+31%). Cash $112M (incl. $32M restricted); $123.5M
  // drawn on a new $300M Mesirow facility (cheaper funding). Buybacks $28M H1
  // (~$72M left on $100M program). New products: SezzleCash (cash advance,
  // June) and Sezzle Send (P2P, August) — NOT in guidance. Bank-charter
  // application costs being incurred.
  // FY26 GUIDE RAISED: revenue growth 35% (top of 30-35%), adj. NI $185M
  // (from $180M), adj. EPS $5.25 (from $5.10). Stock fell ~27% after the
  // print (~$155 → ~$108 by late Sep), now $128.64 — BELOW the entire Street
  // PT range ($150-196, median $165). ~24× FY26E for ~26% EPS growth.
  // Net: the "wait for a better entry" condition has been met; HOLD → BUY.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Best-in-class BNPL economics — high operating margins and exceptional returns on equity, while many peers still lose money',
    'Relentless execution: beat both EPS and revenue estimates every quarter for two years, repeatedly raising full-year guidance',
    'Expanding from BNPL toward an all-in-one money app — Pay-in-5, virtual card, AT&T mobile plan, plus deposit accounts and a cash-flow/advance tool on the 2026-27 roadmap',
    'Pursuing an ILC bank charter (application mid-2026) — would swap WebBank variable fees for a fixed cost base and add regulatory defensibility',
    'Founder-aligned with heavy insider ownership and disciplined buybacks that more than offset stock compensation',
  ],

  risksToBuy: [
    'Credit losses as a share of volume are ticking up as the company pushes growth and new cash-advance products',
    'Extreme volatility and a very high short interest on a tiny float mean violent swings in both directions',
    'Intensely competitive against Affirm, Klarna, PayPal, and Block/Afterpay, with Apple a constant platform threat',
    'Consumer-credit cyclicality — a recession or unemployment shock would spike charge-offs and freeze origination growth',
    'BNPL faces rising regulatory scrutiny that could impose disclosure, underwriting, or fee constraints on the model',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 150, targetMedian: 165, targetHigh: 196, numAnalysts: 7 },  // stockanalysis.com (PTs Aug 20 2026)

  epsCagr: [13, 22, 30],   // Base trimmed to reflect TIKR consensus deceleration (GAAP NI +35% 26E → +28% 27E → +11% 28E), plus ~3%/yr buyback tailwind
  exitPE: [11, 15, 21],
  prob: [30, 50, 20],

  revGrowth: [
    [0.30, 0.10, 0.08, 0.06, 0.05],   // Bear: FY26 ~locked by H1 (+50%) even with a weak H2; then credit cycle + competition compress growth
    [0.35, 0.24, 0.20, 0.16, 0.12],   // Base: FY26 at raised 35% guide (~$609M), FY27 ≈ consensus $757M, decelerating
    [0.37, 0.30, 0.26, 0.22, 0.18],   // Bull: SezzleCash/Send + mobile scale, GMV compounds
  ],
  fcfMargin: [
    [0.24, 0.24, 0.25, 0.25, 0.26],       // Bear: charge-offs + funding costs compress margin
    [0.30, 0.31, 0.32, 0.32, 0.33],       // Base: stable low-30s margin
    [0.32, 0.34, 0.36, 0.37, 0.38],       // Bull: operating leverage as platform scales
  ],
  exitMultiple: [11, 15, 21],
  termGrowth: [0.02, 0.03, 0.035],
  waccAdj: [0.02, 0.005, -0.005],
  bbRate: [0.005, 0.015, 0.025],
  ebitdaProxy: [0.32, 0.40, 0.48],
  bullMaOptVal: false,

  desc: [
    'A consumer recession and unemployment shock push BNPL charge-offs higher, freezing GMV growth, while intensifying competition from Affirm, Klarna, PayPal, and Block compresses take rates. ' +
      'BNPL regulation adds disclosure and underwriting friction. EPS compounds at only ~13% from the FY2026E $5.25 base to ~$9.70 by FY31, and the market reprices Sezzle as a cyclical subprime lender at ~11x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30% — elevated for a consumer-credit business at a cyclical peak.',
    'Sezzle delivers on its twice-raised FY2026 guidance (35% revenue growth, ~$5.25 adjusted EPS) and growth decelerates gracefully thereafter. Pay-in-5, long-term lending, the virtual card, and the AT&T mobile plan keep GMV compounding while operating margins hold near 40%. ' +
      'EPS compounds ~22% from the $5.25 base to ~$14 by FY31 while the ~24x multiple normalizes toward ~15x as growth matures. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Excellent business, and after the post-Q2 sell-off the entry no longer discounts all of the growth.',
    'New products and the mobile-carrier channel scale faster than expected, purchase frequency keeps climbing, and operating leverage drives margins higher. Sezzle takes durable share as a profitable BNPL leader. ' +
      'EPS compounds ~30% from the $5.25 base to ~$19.5 by FY31, and the market awards ~21x on proven, profitable hypergrowth. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 20% — requires sustained torrid growth without a credit or competitive setback.',
  ],

  thesis: [
    'Bear mechanics: BNPL is unsecured consumer credit, and a downturn hits charge-offs and origination volume simultaneously. ' +
      'The competitive set (Affirm, Klarna, PayPal, Block/Afterpay, Apple) caps pricing power, and regulators are circling the model. ' +
      'Even after the post-Q2 sell-off to {spot}, the valuation prices in continued strong growth, so a credit stumble re-rates the multiple hard.',
    'The operating story is exceptional: revenue and EPS have beaten estimates every quarter for two years, margins are best-in-class (~40% operating, ~92% ROE), guidance keeps rising, and the PEG is below 1. ' +
      'After the Q2 beat-and-raise the stock still sold off ~27%, and at {spot} it trades below the entire Street price-target range (~$150-196) at ~24x FY26E for ~26% EPS growth — the better entry the old HOLD was waiting for. ' +
      'Extreme volatility, a high short float on a tiny ~17M-share float, and rising transaction losses argue for small sizing. Verdict: BUY — own the execution, sized for the volatility.',
    'The bull case needs the all-in-one platform push (Pay-in-5, virtual card, deposit accounts, a cash-flow/advance tool) to compound GMV while frequency and margins keep rising, with the ILC bank charter (applying mid-2026) lowering funding/processing costs and hardening the regulatory moat. ' +
      'If Sezzle sustains ~30% EPS growth and holds best-in-class margins, it earns a premium multiple as a profitable BNPL compounder, and {target} is achievable. ' +
      'The risk: BNPL is cyclical and crowded, and the market is unforgiving of any deceleration at this valuation. Probability 20% — real optionality, but not a margin-of-safety entry at {spot}.',
  ],

  burry: {
    sbc: 6.52,
    gaapNi: 133.13,
    buyback: 64.66,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 10,
    overstatementSource: 'estimated',
    note: 'Pristine. FY25 stock-based comp is only $6.52M vs $133.13M GAAP NI = ~4.9% naive (TIKR cash-flow statement) — Sezzle is capital-efficient and founder-led (insiders own ~51%), with SBC actually falling YoY ($10.3M FY22 → $6.5M FY25). Even applying a large MTM amplifier for the multi-fold stock run, FY25 buybacks of $64.66M exceed SBC ~10:1, so real per-share dilution is negative and owner earnings ≈ GAAP earnings. SBC/buyback verified; pct estimated via MTM heuristic.',
  },

  debtSafety: {
    netDebt: 12,           // Jun 30 2026: $123.5M drawn − $112.0M cash (incl. restricted)
    ebitda: 230,           // FY26E adj. EBITDA est. (Q2 $58M, ~39% margin on ~$609M revenue) — approximate
    fy: 'FY26E',
    note: 'Framework partially N/A for a BNPL lender — the ~$134M facility is warehouse/revolving debt funding consumer receivables, not corporate leverage. Net debt $31.17M at YE2025 (TIKR) vs EBITDA ~$185M => leverage ~0.12-0.17x, comfortably GREEN. Strong cash generation reinforces it: FY25 FCF ~$209M (~46% margin); quick & current ratios 3.65. Real risk metric is receivables credit quality and charge-off rates, not the leverage ratio.',
  },
});

import { defineStock } from './defineStock';

export const SEZL = defineStock({
  ticker: 'SEZL',
  name: 'Sezzle Inc.',
  sector: 'FinTech / Buy Now, Pay Later',
  themeColor: '#6d28d9',
  updatedOn: '07/13',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 160.25,   // Jun 26 2026 close
  fairPriceRange: '$120 - $185',
  shares0: 33.59,         // Finviz Shs Outstand 33.59M (float only 16.74M; insiders own ~51%)
  rev25: 450.28,          // FY2025 total revenue $450.28M (+66% YoY); TTM $480.91M
  fcfMargin25: 0.308,     // FY2025 profit margin ~30.8% (NI $133.13M / rev $450.28M)
  taxRate: 0.22,          // FY2025 effective tax 18.3% actual; consensus forward ~22-23% (TIKR 26E 22.5%, 27E 23%)
  cash: 103,             // $102.6M cash at YE2025 (TIKR); warehouse line funds the receivables
  debt: 134,            // ~$134M revolving facility funding consumer receivables; net debt $31.17M at YE2025 (TIKR, 0.12x EBITDA)
  beta: 2.8,            // Modeled high-vol beta; trailing Finviz beta is an extreme 6.49 (artifact of the parabolic +169% YTD move)
  costDebt: 0.10,
  modelType: 'EPS_PE',
  baseEps: 5.12,        // FY2026E GAAP consensus (Jun 23 2026 revision; ≈ mgmt adjusted-EPS guidance $5.10). DCF distorted because the warehouse facility funds receivables, not corporate operations — lender => EPS_PE.
  rsRating: 90,        // IBD Relative Strength Rating (Jun 2026); composite 99, EPS rating 97
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',  // AI assists underwriting, but BNPL is fundamentally a consumer-credit business, not an AI beneficiary

  reasonsToBuy: [
    'Best-in-class BNPL economics — high operating margins and exceptional returns on equity, while many peers still lose money',
    'Relentless execution: beat both EPS and revenue estimates every quarter for two years, repeatedly raising full-year guidance',
    'Expanding from BNPL toward an all-in-one money app — Pay-in-5, virtual card, AT&T mobile plan, plus deposit accounts and a cash-flow/advance tool on the 2026-27 roadmap',
    'Pursuing an ILC bank charter (application mid-2026) — would swap WebBank variable fees for a fixed cost base and add regulatory defensibility',
    'Founder-aligned with heavy insider ownership and disciplined buybacks that more than offset stock compensation',
  ],

  risksToBuy: [
    'Trades above the analyst price-target range after a parabolic run — the market price already exceeds consensus fair value',
    'Extreme volatility and a very high short interest on a tiny float mean violent swings in both directions',
    'Intensely competitive against Affirm, Klarna, PayPal, and Block/Afterpay, with Apple a constant platform threat',
    'Consumer-credit cyclicality — a recession or unemployment shock would spike charge-offs and freeze origination growth',
    'BNPL faces rising regulatory scrutiny that could impose disclosure, underwriting, or fee constraints on the model',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 100, targetMedian: 138, targetHigh: 165, numAnalysts: 7 },

  epsCagr: [13, 22, 30],   // Base trimmed to reflect TIKR consensus deceleration (GAAP NI +35% 26E → +28% 27E → +11% 28E), plus ~3%/yr buyback tailwind
  exitPE: [11, 15, 21],
  prob: [30, 50, 20],

  revGrowth: [
    [0.12, 0.10, 0.08, 0.06, 0.05],   // Bear: credit cycle + competition compress growth
    [0.32, 0.26, 0.20, 0.16, 0.12],   // Base: mgmt guided 30-35% FY2026, decelerating
    [0.38, 0.32, 0.26, 0.22, 0.18],   // Bull: new products + mobile scale, GMV compounds
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
      'BNPL regulation adds disclosure and underwriting friction. EPS compounds at only ~13% from the FY2026E $5.12 base to ~$9.40 by FY31, and the market reprices Sezzle as a cyclical subprime lender at ~11x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30% — elevated given the stock already trades above the analyst target range.',
    'Sezzle delivers on its raised FY2026 guidance (30-35% revenue growth, ~$5.10 adjusted EPS) and growth decelerates gracefully thereafter. Pay-in-5, long-term lending, the virtual card, and the AT&T mobile plan keep GMV compounding while operating margins hold near 40%. ' +
      'EPS compounds ~22% from the $5.12 base to ~$14 by FY31, but the rich multiple normalizes toward ~15x as growth matures — the same dynamic behind a Street price target ($138) that sits below the current price. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Excellent business — but the entry price already discounts much of the growth.',
    'New products and the mobile-carrier channel scale faster than expected, purchase frequency keeps climbing, and operating leverage drives margins higher. Sezzle takes durable share as a profitable BNPL leader. ' +
      'EPS compounds ~31% from the $5.12 base to ~$20 by FY31, and the market awards ~21x on proven, profitable hypergrowth. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 20% — requires sustained torrid growth without a credit or competitive setback.',
  ],

  thesis: [
    'Bear mechanics: BNPL is unsecured consumer credit, and a downturn hits charge-offs and origination volume simultaneously. ' +
      'The competitive set (Affirm, Klarna, PayPal, Block/Afterpay, Apple) caps pricing power, and regulators are circling the model. ' +
      'At {spot} — already above the Street\'s price target — the valuation prices in continued hypergrowth, so any stumble re-rates the multiple hard. The bear case delivers steep annualized losses from here.',
    'The operating story is exceptional: revenue and EPS have beaten estimates every quarter for two years, margins are best-in-class (~40% operating, ~92% ROE), guidance keeps rising, and the PEG is below 1. ' +
      'Yet the stock has run ~169% YTD and trades above the consensus price target ($138), with extreme volatility and a ~28% short float on a tiny ~17M-share float. ' +
      'The probability-weighted target sits below {spot}: the business is firing, but the price already pays for it. Verdict: HOLD — own the execution, wait for a better entry.',
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
    netDebt: 31,
    ebitda: 185,
    fy: 'FY25',
    note: 'Framework partially N/A for a BNPL lender — the ~$134M facility is warehouse/revolving debt funding consumer receivables, not corporate leverage. Net debt $31.17M at YE2025 (TIKR) vs EBITDA ~$185M => leverage ~0.12-0.17x, comfortably GREEN. Strong cash generation reinforces it: FY25 FCF ~$209M (~46% margin); quick & current ratios 3.65. Real risk metric is receivables credit quality and charge-off rates, not the leverage ratio.',
  },
});

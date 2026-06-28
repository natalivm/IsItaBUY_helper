import { defineStock } from './defineStock';

export const SEZL = defineStock({
  ticker: 'SEZL',
  name: 'Sezzle Inc.',
  sector: 'FinTech / Buy Now, Pay Later',
  themeColor: '#6d28d9',
  updatedOn: '06/28',
  lastReportTag: 'Q1 2026',
  dataReviewedOn: '2026-06-28',
  currentPrice: 161,
  fairPriceRange: '$110 - $185',
  shares0: 34,            // ~34M diluted shares (post 6:1 split Mar 2025; FY2025 ~34.0M, buybacks trimming)
  rev25: 450,             // FY2025 total revenue $450.3M (+66% YoY)
  fcfMargin25: 0.285,     // Adjusted net margin ~28.5% (adj NI $128.4M / rev $450.3M); GAAP NI 29.6%
  taxRate: 0.25,
  cash: 64,              // ~$64M cash; warehouse line funds the receivables (operational, not corporate leverage)
  debt: 140,            // ~$104-140M — revolving/warehouse facility funding consumer receivables
  beta: 2.1,            // High-beta momentum name; 52-wk range $49.50-$186.74
  costDebt: 0.10,
  modelType: 'EPS_PE',
  baseEps: 5.10,        // FY2026E adjusted EPS guidance (raised from $4.70 after Q1 2026 beat). DCF distorted because warehouse debt funds receivables, not corporate operations — lender => EPS_PE.
  rsRating: 97,
  rsTrend: 'rising',
  aiImpact: 'NEUTRAL',  // AI assists underwriting, but BNPL is fundamentally a consumer-credit business, not an AI beneficiary

  reasonsToBuy: [
    'Best-in-class profitability for BNPL — high operating margins and consistent GAAP net income while many peers still lose money',
    'Exceptional execution: GMV and revenue compounding fast, with management repeatedly raising full-year guidance',
    'New growth vectors layering on — Pay-in-5, long-term lending, virtual card, and a mobile-carrier partnership widen the funnel',
    'Rising purchase frequency per user shows deepening engagement and improving unit economics as the base scales',
    'Disciplined capital allocation — active buybacks more than offset stock compensation, shrinking the share count',
  ],

  risksToBuy: [
    'Richly valued after a multi-fold run — trades well above the analyst target range, leaving little margin of safety',
    'Intensely competitive space against Affirm, Klarna, PayPal, and Block/Afterpay, with Apple a constant platform threat',
    'Consumer-credit cyclicality — a recession or unemployment shock would spike charge-offs and freeze origination growth',
    'BNPL faces growing regulatory scrutiny that could impose disclosure, underwriting, or fee constraints on the model',
    'Small float and high beta mean sharp drawdowns when momentum reverses; growth must stay torrid to justify the multiple',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 82, targetMedian: 120, targetHigh: 141, numAnalysts: 6 },

  epsCagr: [10, 22, 32],
  exitPE: [11, 16, 22],
  prob: [30, 50, 20],

  revGrowth: [
    [0.12, 0.10, 0.08, 0.06, 0.05],   // Bear: credit cycle + competition compress growth
    [0.32, 0.26, 0.20, 0.16, 0.12],   // Base: mgmt guided 30-35% FY2026, decelerating
    [0.38, 0.32, 0.26, 0.22, 0.18],   // Bull: new products + mobile scale, GMV compounds
  ],
  fcfMargin: [
    [0.22, 0.22, 0.23, 0.23, 0.24],       // Bear: charge-offs + funding costs compress margin
    [0.285, 0.29, 0.30, 0.30, 0.31],      // Base: stable high-20s/low-30s margin
    [0.30, 0.32, 0.34, 0.35, 0.36],       // Bull: operating leverage as platform scales
  ],
  exitMultiple: [11, 16, 22],
  termGrowth: [0.02, 0.03, 0.035],
  waccAdj: [0.02, 0.005, -0.005],
  bbRate: [0.005, 0.015, 0.025],
  ebitdaProxy: [0.30, 0.40, 0.48],
  bullMaOptVal: false,

  desc: [
    'A consumer recession and unemployment shock push BNPL charge-offs higher, freezing GMV growth, while intensifying competition from Affirm, Klarna, PayPal, and Block compresses take rates. ' +
      'BNPL regulation adds disclosure and underwriting friction. Adjusted EPS compounds at only ~10% from the FY2026E $5.10 base to ~$8.20 by FY31, and the market reprices Sezzle as a cyclical subprime lender at ~11x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30% — elevated given the stock already trades above analyst fair value.',
    'Sezzle delivers on its raised FY2026 guidance (30-35% revenue growth, ~$5.10 adjusted EPS) and growth decelerates gracefully thereafter. Pay-in-5, long-term lending, the virtual card, and the AT&T mobile plan keep GMV compounding while operating margins hold in the high-20s to low-30s. ' +
      'Adjusted EPS compounds ~22% from the $5.10 base to ~$13.80 by FY31, and the multiple normalizes toward ~16x as growth matures. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Excellent business — but the entry price already discounts much of the growth.',
    'New products and the mobile-carrier channel scale faster than expected, purchase frequency keeps climbing, and operating leverage drives margins toward the mid-30s. Sezzle takes durable share as a profitable BNPL leader. ' +
      'Adjusted EPS compounds ~32% from the $5.10 base to ~$20+ by FY31, and the market awards ~22x on proven, profitable hypergrowth. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 20% — requires sustained torrid growth without a credit or competitive setback.',
  ],

  thesis: [
    'Bear mechanics: BNPL is unsecured consumer credit, and a downturn hits charge-offs and origination volume simultaneously. ' +
      'The competitive set (Affirm, Klarna, PayPal, Block/Afterpay, Apple) caps pricing power, and regulators are circling the model. ' +
      'At {spot} — already above the Street\'s target range — the valuation prices in continued hypergrowth, so any stumble re-rates the multiple hard. The bear case delivers steep annualized losses from here.',
    'Post Q1 2026, the operating story is excellent: revenue +29% to a record, EPS up sharply, margins expanding, guidance raised. ' +
      'Sezzle is one of the few consistently profitable BNPL players, and capital allocation is disciplined — buybacks more than offset compensation. ' +
      'But the stock has multiplied off its lows and trades well above analyst fair value (~$120 median). The probability-weighted target sits below {spot}: the business is firing, but the price already pays for it. Verdict: HOLD — own the execution, wait for a better entry.',
    'The bull case needs the new product suite (Pay-in-5, long-term lending, virtual card, mobile) to compound GMV while frequency and margins keep rising. ' +
      'If Sezzle sustains 30%+ adjusted EPS growth and holds best-in-class margins, it earns a premium multiple as a profitable BNPL compounder, and {target} is achievable. ' +
      'The risk: BNPL is cyclical and crowded, and the market is unforgiving of any deceleration at this valuation. Probability 20% — real optionality, but not a margin-of-safety entry at {spot}.',
  ],

  burry: {
    sbc: 18,
    gaapNi: 133.1,
    buyback: 50,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 40,
    overstatementSource: 'estimated',
    note: 'Estimated — exact FY25 SBC not confirmed from snippets (~$18M assumed vs $133.1M GAAP NI = ~14% naive). The large MTM amplifier (stock up many-fold over 3 years) pushes the Burry overstatement higher, but Sezzle is a net share REDUCER: $50M buyback completed in 2025 (+$100M newly authorized) far exceeds SBC, so real per-share dilution is negative. Refresh once the 10-K SBC line is verified.',
  },

  debtSafety: {
    netDebt: 76,
    ebitda: 185,
    fy: 'FY25',
    note: 'Framework partially N/A for a BNPL lender — the ~$140M facility is warehouse/revolving debt funding consumer receivables, not corporate leverage. Net debt ~$76M vs EBITDA ~$185M (op income $176.8M + D&A) => leverage <0.5x, comfortably GREEN. Real risk metric is receivables credit quality and charge-off rates, not the leverage ratio.',
  },
});

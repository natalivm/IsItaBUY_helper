import { defineStock } from './defineStock';

export const INTU = defineStock({
  ticker: 'INTU',
  name: 'Intuit Inc.',
  sector: 'Software / SMB Finance & Tax',
  themeColor: '#0077c5',
  currentPrice: 302.75,
  fairPriceRange: '$290 - $732',  // stockanalysis.com analyst target range, Oct 7 2026
  shares0: 272,        // Q4 FY26 diluted 272M (FY avg 277M, -2% y/y)
  rev25: 21400,        // FY26A (Jul 2026) $21.4B (+14%) — base year; revGrowth[0] = FY27 (guide $23.28-23.51B, +9-10%)
  fcfMargin25: 0.40,   // FY26 OCF $8.84B − capex $0.22B ≈ $8.6B FCF
  taxRate: 0.22,
  cash: 7200,          // Jul 31 2026: $4.7B cash + $2.5B investments
  debt: 7669,          // Jul 31 2026: $1.25B ST + $6.42B LT (incl. $1.75B notes issued Jun 2026)
  beta: 1.20,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 20.24,      // FY27E GAAP EPS = guide midpoint $20.12-20.36 (+22-24%; Aug 25 2026). FY27 non-GAAP guide $22.88-23.12 now INCLUDES SBC (~$2.0B). FY26A GAAP $16.46. Prior $15.59 was the FY26 GAAP guide.
  rsRating: 58,         // IBD RS per user, 10/10/2026 (was 3)
  rsTrend: 'rising',
  aiImpact: 'DISRUPTION_RISK',
  ratingOverride: 'BUY',  // Q4 FY26 review: at ~15× FY27 GAAP EPS guidance (+22-24%) the stock prices heavy AI disruption, RS has recovered (3→58, rising) and the bear case now models real disruption (1% EPS CAGR at 11×). The base case lands right at the 16% STRONG BUY line, so pin BUY — disruption risk to TurboTax argues against STRONG BUY.
  updatedOn: '10/09',
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-10',

  // Q4 FY26 UPDATE (Aug 25, 2026) — first data review
  // ─────────────────────────────────────────────────────────────────────────
  // FY26: revenue $21.4B (+14%): QuickBooks/GBS $12.9B (+16%), Consumer $8.6B
  // (+11%) — TurboTax $5.3B (+7%), Credit Karma $2.6B (+20%), ProTax $647M.
  // GAAP EPS $16.46 (+20%), non-GAAP $24.27. GAAP op margin 27.4%. OCF $8.8B.
  // Buybacks $5.5B (+96%), $7.9B authorization left; dividend +15% to $1.38/
  // qtr. Cash $7.2B vs debt $7.7B. Q4 beat (rev $4.35B vs $4.27B; EPS $4.03
  // vs $3.58). FY27 GUIDE (soft top line): revenue +9-10% — GBS +13-14%,
  // TurboTax only +2-3%, Credit Karma +11-13%, Mailchimp ~flat (new segment);
  // GAAP op income +26-27%; GAAP EPS $20.12-20.36 (+22-24%); non-GAAP
  // $22.88-23.12 now including ~$2.0B SBC. Q1 revenue $4.29-4.31B (below
  // ~$4.36B consensus). Stock dipped ~4%, then ~$339 (Sep 14) → $269 (Sep
  // 29) → $302.75. Street: Buy (34), PT $290-732 (median $400); FY27E rev
  // $23.4B, FY28E $25.6B. Net: AI-disruption fears (TurboTax +2-3%) have
  // de-rated a still-compounding franchise to ~15× GAAP earnings.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Dominant SMB finance and tax platform with deeply embedded workflows that create high switching costs for customers',
    'Agentic AI initiative positions Intuit as the autonomous financial back-office for small businesses if it monetizes successfully',
    'Durable double-digit revenue compounding driven by QuickBooks ecosystem lock-in and recurring subscription model',
    'Ongoing buyback program and remaining authorization provide meaningful EPS accretion support through the drawdown',
    'After a deep de-rating the stock trades at a low multiple of guided earnings that already prices in heavy AI disruption',
  ],

  risksToBuy: [
    'AI-native tax and accounting tools from ChatGPT-era competitors could erode TurboTax and QuickBooks pricing power',
    'TurboTax growth has slowed to low single digits, the clearest sign of AI and free-filing pressure on the consumer franchise',
    'Heavy SBC burden means non-GAAP earnings significantly flatter the true owner economics of the business',
    'IRS Direct File expansion and free alternatives directly threaten the consumer tax segment that anchors the brand',
    'Mailchimp cross-sell has underdelivered and Credit Karma growth has slowed, dimming the platform narrative',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 290, targetMedian: 400, targetHigh: 732, numAnalysts: 34 },  // stockanalysis.com, Oct 7 2026

  revGrowth: [
    [0.07, 0.02, 0.00, 0.00, 0.01],   // Bear: AI disruption — TurboTax shrinks, QuickBooks pricing erodes
    [0.095, 0.09, 0.08, 0.08, 0.07],  // Base: FY27 guide mid (+9.5%), FY28 ≈ consensus $25.6B
    [0.10, 0.12, 0.12, 0.11, 0.10],   // Bull: agentic AI expands SMB wallet share
  ],
  fcfMargin: [
    [0.27, 0.27, 0.27, 0.27, 0.27],
    [0.30, 0.31, 0.32, 0.33, 0.33],
    [0.32, 0.34, 0.35, 0.36, 0.37],
  ],
  exitMultiple: [14, 19, 26],

  desc: [
    'AI-native tax filing tools (ChatGPT-era + free competitors) erode TurboTax pricing power; Block / Xero / Wave chip away at QuickBooks SMB share. Revenue growth halves to 6-8% by FY28 as Agentic AI fails to monetize. ' +
      'EPS barely grows (~1%/yr from the $20.24 FY27E GAAP base) as AI disruption bites; the multiple compresses from ~15× to 11×. 5yr target {target} ({cagr} annualized).',
    'FY27 guide executes (revenue +9-10%, GAAP EPS ~$20.24, +22-24%); agentic AI protects the QuickBooks moat while TurboTax stagnates. ' +
      'EPS compounds ~12% from there (well below the FY27 guide, discounting disruption) with heavy buybacks; the multiple stays ~18×, near today\'s level. 5yr target {target} ({cagr} annualized).',
    'Intuit Assist + Agentic AI become the SMB system of record across finance, tax, marketing (Mailchimp), and payments (Credit Karma). Cross-sell drives ARPU expansion. ' +
      'EPS compounds ~20% on margin expansion. Multiple re-rates to 26× as the platform thesis validates. 5yr target {target} ({cagr} annualized).',
  ],

  thesis: [
    'Generative AI commoditizes tax filing and SMB bookkeeping. TurboTax pricing power erodes as IRS Direct File expands and AI-first alternatives offer free or near-free filing. ' +
      'QuickBooks SMB moat depends on ecosystem stickiness; AI-native challengers (Pilot, Block, etc.) chip away at the lower end of the market. ' +
      'Mailchimp acquisition struggles to deliver cross-sell. Credit Karma growth slows post-COVID-era boost. ' +
      'High SBC (~$2B/yr = 32% Burry overstatement) inflates non-GAAP optics; real owner economics are weaker than headlines suggest.',
    'Intuit delivered FY26 (revenue +14%, GAAP EPS +20%) and guides FY27 GAAP EPS +22-24%. Agentic AI tools defend the moat without dramatic ARPU expansion — they shift from optional to expected. ' +
      'TurboTax retains free-edition share via brand and integration with QuickBooks ecosystem. Credit Karma stabilizes as auto/personal loan markets recover. ' +
      'Capital returns accelerate ($5.5B FY26 buyback, $7.9B authorized) while revenue growth decelerates to ~9-10%. At ~15× GAAP earnings, the market already prices substantial disruption. Verdict: BUY — quality franchise at a discounted multiple, sized for the AI risk.',
    'Agentic AI proves transformative — Intuit Assist becomes the autonomous SMB CFO + consumer tax pro, dramatically lowering customer acquisition cost and expanding wallet share. ' +
      'QuickBooks evolves from accounting software to integrated SMB OS (finance + payroll + payments + marketing + benefits). ' +
      'TurboTax adds proactive year-round tax optimization, Credit Karma evolves into AI financial advisor for the mass market. ' +
      'Margins expand to 37% on platform leverage. Market re-rates from "mature software" to "AI-native financial platform" at 32× premium multiple.',
  ],

  termGrowth: [0.020, 0.030, 0.035],
  bbRate: [0.010, 0.018, 0.025],
  ebitdaProxy: [0.32, 0.38, 0.43],
  bullMaOptVal: false,

  epsCagr: [1, 12, 20],   // Q4 FY26: bear 8→1 (real AI disruption), base 14→12 (below the +22-24% FY27 guide), bull 22→20
  exitPE: [11, 18, 26],   // Was [18, 24, 32]: the old bear (8% at 18x) still returned ~12%/yr; base now ≈ today's ~15-18x, no re-rating assumed
  prob: [25, 50, 25],

  debtSafety: {
    netDebt: 469,          // Jul 31 2026: $7.67B debt − $7.20B cash & investments
    ebitda: 9500,          // FY26: non-GAAP op income $8.9B + D&A — approximate
    fy: 'FY26',
    note: 'GREEN — roughly net-neutral balance sheet (~0.05× EBITDA) after $5.5B of FY26 buybacks partly funded by June 2026 notes.',
  },

  burry: {
    sbc: 1968,
    gaapNi: 4340,
    buyback: 3754,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 32,
    overstatementSource: 'burry-published',
    note: 'Critical per Burry — 32% overstatement. FY25 calendar actuals (TIKR): SBC $1,968M (10.1% of revenue — very heavy), buybacks $3,754M = 2.1× SBC. Despite buybacks consistently exceeding SBC, diluted share count grew 273M → 282M over 5 years (+3.3%) because gross issuance roughly equals gross retirements. Our 4y-MTM formula breaks down here because the stock is flat-to-down over 4 years ($430 → $396, multiplier 0.92×), producing a perverse negative haircut. Burry\'s 32% reflects the absolute SBC burden ($2B/yr is real money) rather than MTM amplification. Trust the published value; do not apply our calculator to flat-stock + high-SBC names like INTU.',
  },
});

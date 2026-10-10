import { defineStock } from './defineStock';

export const PANW = defineStock({
  updatedOn: '10/09',
  lastReportTag: 'Q4 FY26',
  dataReviewedOn: '2026-10-10',
  ticker: 'PANW',
  name: 'Palo Alto Networks',
  sector: 'Cybersecurity',
  themeColor: '#00a3e0',
  currentPrice: 418.78,
  fairPriceRange: '$190 - $475',  // stockanalysis.com analyst target range, Oct 7 2026
  shares0: 845,        // FY27 guide 844-847M non-GAAP diluted (post CyberArk stock deal; was 770)
  rev25: 11480,        // FY26A (Jul 2026) $11.48B (+24.5%) — base year; revGrowth[0] = FY27 (guide $14.10-14.20B), FY28E $16.23B
  fcfMargin25: 0.384,  // FY26 adj. FCF $4.41B; FY27 guide 38%
  taxRate: 0.20,
  cash: 7906,          // Jul 31 2026: $2.51B cash + $0.56B ST + $4.84B LT investments
  debt: 1774,          // Jul 31 2026: convertible notes (incl. those assumed from CyberArk)
  beta: 1.20,
  costDebt: 0.05,
  rsRating: 99,         // IBD RS per user, 10/10/2026 (was 90)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  // Q4 FY26 UPDATE (Aug 2026) — first data review since Q2 FY26
  // ─────────────────────────────────────────────────────────────────────────
  // Q4 revenue $3.41B (+34%, incl. CyberArk); NGS ARR $9.10B (+63%); RPO
  // $21.2B (+34%). Non-GAAP op margin ~29.6%; non-GAAP EPS $1.02, GAAP -$0.35
  // (CyberArk integration + a $524M convertible-note fair-value hit). FY26:
  // revenue $11.48B, non-GAAP EPS $3.84 (GAAP $0.40), adj. FCF $4.41B (38.4%).
  // Cash & investments $7.9B vs $1.77B converts. Non-GAAP diluted shares
  // 832M (764M FY avg) after the CyberArk stock deal. Acquiring Console
  // (agentic AI workflows). FY27 GUIDE: revenue $14.10-14.20B (+23-24%), NGS
  // ARR $11.08-11.18B (+22-23%, in line with ~22% consensus), non-GAAP op
  // margin 29.5%, EPS $4.16-4.19 on 844-847M shares, adj. FCF margin 38%.
  // Street: Buy (55), PT $190-475 (median $412.50); FY27E EPS $4.19, FY28E
  // $4.88. Stock $418.78 (~100× FY27E) at the median target.
  // ─────────────────────────────────────────────────────────────────────────
  reasonsToBuy: [
    'Four-pillar platform strategy drives customer consolidation with best-in-class net revenue retention',
    'SASE and Identity acquisitions meaningfully expand addressable budget and deepen switching costs',
    'Agentic AI security is a net-new, expanding category where PANW\'s platform is already well-positioned',
    'Elite free cash flow margins make PANW one of the most capital-efficient cybersecurity businesses at scale',
  ],

  risksToBuy: [
    'CyberArk and Chronosphere integration costs have already cut near-term EPS guidance and may drag further',
    'Stock trades at a very rich multiple of earnings, at the median analyst target, with little margin of safety',
    'The CyberArk stock deal expanded the share count meaningfully, diluting per-share growth for existing holders',
    'Cybersecurity platform consolidation is intensifying from Microsoft, CrowdStrike, and other scaled competitors',
    'SBC remains large in absolute terms and buybacks have not yet scaled to meaningfully offset dilution',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 190, targetMedian: 412.5, targetHigh: 475, numAnalysts: 55 },  // stockanalysis.com, Oct 7 2026
  revGrowth: [
    [0.20, 0.08, 0.06, 0.05, 0.05],   // Bear: FY27 below guide; integration friction, organic decel
    [0.235, 0.145, 0.12, 0.10, 0.10], // Base: FY27 guide mid ~$14.15B, FY28 ≈ consensus $16.2B
    [0.25, 0.20, 0.17, 0.13, 0.13],   // Bull: agentic AI security + platformization
  ],
  fcfMargin: [
    [0.28, 0.29, 0.30, 0.30, 0.30],
    [0.37, 0.37, 0.39, 0.40, 0.40],
    [0.40, 0.41, 0.43, 0.44, 0.45],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'CyberArk/Chronosphere integration friction drags margins; SaaS rotation persists. Organic NGS ARR deceleration masked by M&A contribution. 5yr target {target} ({cagr} annualized).',
    'Consensus path: FY27 at guide (revenue +23-24%, NGS ARR +22-23%), integration on track, FCF margins ~38-40%. 5yr target {target} ({cagr} annualized) — from ~100× FY27E EPS, the base case does not cover the price.',
    'Agentic AI security becomes enterprise standard; 4-pillar platform drives consolidation wins at scale; NGS ARR $20B FY2030 target achieved early. 5yr target {target} ({cagr} annualized).',
  ],

  ebitdaProxy: [0.28, 0.35, 0.42],
  bbRate: [0.005, 0.015, 0.02],
  bullMaOptVal: 149.0 * 770.0 * 0.07,

  debtSafety: {
    netDebt: -6132,        // Jul 31 2026: $1.77B converts − $7.91B cash & investments
    ebitda: 4500,          // FY27E: non-GAAP op margin 29.5% × ~$14.15B + D&A — approximate
    fy: 'FY27E',
    note: 'GREEN by Step 1 — net cash (~$6.1B) even after the CyberArk deal (largely stock-funded).',
  },

  burry: {
    sbc: 1351,
    gaapNi: 1282,
    buyback: 115,
    epsBasis: 'NON_GAAP',
    fy: 'FY25 LTM',
    overstatementPct: 45,
    overstatementSource: 'estimated',
    note: 'Critical (major downgrade from earlier 90% Tragic estimate). TIKR LTM actuals: SBC $1,351M (13.7% of revenue — moderate), buybacks just $115M (0.08× SBC, but starting to scale). The headline FCF $3.57B (36% margin) holds up under the SBC adjustment: adjusted FCF $2.21B = 22.4% margin — still elite. Critically, PANW has crossed into durable GAAP profitability: operating margin 13%, GAAP NI $1.28B (vs my -$1.5B estimate which was wrong). Recent 1y dilution just 0.5% (713.5M → 711.3M effectively flat). PANW belongs in the reformed-compounder cohort with NOW (35%), not the broken-SaaS cohort with CRWD/ZS (90-100%). Still 45% rather than OK-tier because absolute SBC ($1.35B) is large and buybacks haven\'t scaled to offset it. Watch the buyback trajectory — if PANW grows buybacks to even 0.5× SBC, this should compress further toward 30%.',
  },
});

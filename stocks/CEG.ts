import { defineStock } from './defineStock';

export const CEG = defineStock({
  ticker: 'CEG',
  name: 'Constellation Energy',
  sector: 'Power',
  themeColor: '#3b82f6',
  updatedOn: '04/25',
  currentPrice: 313.53,
  fairPriceRange: '$200 - $540',
  shares0: 358,
  rev25: 25200,
  fcfMargin25: 0.051,
  taxRate: 0.255,
  cash: 4500,
  debt: 19900,
  beta: 1.83,
  costDebt: 0.0525,
  modelType: 'EPS_PE',
  baseEps: 9.39,
  rsRating: 49,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Q4/FY25 earnings confirmed: adj operating EPS $9.39 (+8.3% YoY), matching consensus. Nuclear capacity factor 96.8%. " +
    "But real FCF is only $1.29B (OCF $4.24B − CapEx $2.95B) → 1.2% FCF yield at $105B market cap — very thin for a power business. " +
    "Switched to EPS × P/E model since heavy CapEx (uprates, restarts, Calpine integration) temporarily depresses FCF while earnings power is clear. " +
    "Calpine acquisition now closed — 2026 is first full combined year. Data center strategy real: CyrusOne 760 MW, Microsoft Crane 20-yr PPA + $1B DOE loan guarantee. " +
    "Capacity prices repriced structurally ($51.89 → $179.79 Mid-Atlantic) — sustainability is the key question. " +
    "P(15% CAGR) tightened to 35–40% post-earnings. At 31× trailing / 25–26× forward, this is a premium cyclical with structural AI tailwind, not a cheap compounder. " +
    "March 31 Business & Earnings Outlook (first combined guidance) is the next major catalyst. RS 22 — tape not confirming.",

  epsCagr: [6, 12, 17],
  exitPE: [16, 20, 25],
  prob: [25, 50, 25],

  analystConsensus: { rating: 'Buy', targetLow: 347, targetMedian: 403, targetHigh: 462, numAnalysts: 14 },
  revGrowth: [
    [0.03, 0.03, 0.04, 0.04, 0.03],
    [0.10, 0.10, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [
    [0.040, 0.045, 0.050, 0.055, 0.060],
    [0.051, 0.058, 0.065, 0.070, 0.075],
    [0.060, 0.070, 0.080, 0.090, 0.100],
  ],
  exitMultiple: [13, 17, 21],
  desc: [
    'Power price normalization from elevated 2025 levels, Calpine integration friction, and merchant gas exposure increase earnings volatility. EPS growth slows to ~6% CAGR. Market reprices to 16× as cyclicality reasserts.',
    'Solid execution: Calpine accretion materializes, partial MW lever delivery (uprates + DR scaling), stable capacity pricing. EPS compounds at ~12% but falls short of 15% CAGR. Moderate P/E compression to 20× reflects mature premium utility status.',
    'Full execution on all MW levers — uprates on schedule, Crane/TMI restarts, DR at 1,000 MW ELCC, signed hyperscaler PPAs, clean Calpine integration. 17% EPS CAGR; business reclassifies as contracted infrastructure compounder at 25×.',
  ],

  bbRate: [0.005, 0.012, 0.025],
});

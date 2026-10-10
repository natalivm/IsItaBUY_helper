import { defineStock } from './defineStock';

export const DELL = defineStock({
  ticker: 'DELL',
  name: 'Dell Technologies',
  sector: 'Hardware / AI Infrastructure',
  themeColor: '#007DB8',

  currentPrice: 586.06,
  fairPriceRange: '$480 - $735',  // stockanalysis.com analyst target range, Oct 9 2026
  shares0: 650,
  rev25: 113500,
  fcfMargin25: 0.10,
  taxRate: 0.20,
  cash: 11569,         // Jul 31 2026 cash & equivalents (+$2.7B long-term investments not counted)
  debt: 34466,         // Jul 31 2026 total debt ($8.5B ST + $26.0B LT) — a large share is DFS financing debt matched by receivables
  beta: 1.35,
  costDebt: 0.045,

  rsRating: 97,         // IBD RS per user, 10/10/2026 (was 92)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '10/09',
  lastReportTag: 'Q2 FY27',
  dataReviewedOn: '2026-10-10',

  // Q2 FY27 UPDATE (Sep 1, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Blowout. Revenue $47.0B (+58%), record. ISG $31.8B (+89%): AI servers
  // $16.4B (+100%), traditional servers & networking $10.5B (+122%), storage
  // $4.85B (+26%); ISG op margin 15.0%. CSG $15.0B (+20%), 7.6% margin. AI
  // orders $60.9B (record), backlog $95B (record). Non-GAAP op margin 12.6%;
  // non-GAAP EPS $7.04 (+203%), GAAP $6.34. BUT Q2 FCF only $986M (-47%) as
  // AI working capital soaks up cash (YTD FCF $4.1B flat; "adjusted" FCF
  // $11.3B YTD). Returned ~$4.2B in Q2 ($3.8B buybacks + $0.4B dividends);
  // diluted shares 652M (-5% y/y). Total debt $34.5B vs cash $11.6B.
  // FY27 GUIDE RAISED: revenue $167B → $192B (+69%), AI servers $60B → $74B
  // (+200%), non-GAAP EPS $17.90 → $25.50 (+148%), GAAP EPS $24.37. Q3:
  // revenue $49.0B (+81%), non-GAAP EPS $6.50. Street (stockanalysis): FY27E
  // EPS $25.90, FY28E $29.12; revenue $193.4B / $225.4B. Stock $586 ≈ analyst
  // mean target, ~23× FY27E / ~20× FY28E EPS. Net: earnings power reset far
  // higher; the debate is now peak-cycle risk and cash conversion, not demand.
  // ─────────────────────────────────────────────────────────────────────────
  analystConsensus: { rating: 'Buy', targetLow: 480, targetMedian: 600, targetHigh: 735, numAnalysts: 29 },  // stockanalysis.com, Oct 9 2026

  reasonsToBuy: [
    'Unmatched Fortune 500 distribution reach that pure-play ODMs cannot replicate at enterprise scale',
    'Massive multi-quarter AI server backlog gives rare revenue visibility for a hardware business',
    'High-margin services and storage attach to AI deployments is an underpriced earnings-quality upgrade',
    'Deep Nvidia Blackwell integration positions Dell as the default on-prem AI infrastructure vendor',
    'Valuation remains undemanding relative to the scale of revenue and cash flow growth being delivered',
  ],

  risksToBuy: [
    'AI server hardware is a thin-margin pass-through, so explosive revenue growth does not translate equally to free cash flow',
    'Hyperscaler capex normalization in coming years could unwind backlog faster than supply commitments allow',
    'PC segment faces ongoing secular decline and contributes meaningfully to overall revenue mix',
    'Debt load of tens of billions limits financial flexibility and amplifies cyclical downside risk',
    'Supermicro and HPE compete aggressively on liquid-cooled Blackwell configurations, pressuring share',
  ],

  revGrowth: [
    [0.62, -0.05, 0.00, 0.03, 0.03], // Bear: FY27 lands ~4% under the $192B guide (H1 + Q3 guide ≈ locked), then AI capex normalizes and revenue dips in FY28
    [0.69, 0.16, 0.07, 0.05, 0.04],  // Base: FY27 at raised $192B guide (+69%), FY28 ≈ consensus $225B, growth tapers as the $95B backlog ships
    [0.72, 0.25, 0.18, 0.14, 0.10],  // Bull: AI super-cycle, enterprise + sovereign AI adds new leg
  ],

  fcfMargin: [
    [0.08, 0.08, 0.08, 0.09, 0.09], // Bear: server mix pressure, capex stays elevated
    [0.09, 0.09, 0.10, 0.10, 0.11], // Base: thin AI-server mix keeps FCF margin modest
    [0.12, 0.14, 0.16, 0.17, 0.18], // Bull: services attach accelerates, operating leverage
  ],

  exitMultiple: [8, 9, 15],
  ebitdaProxy: [0.09, 0.115, 0.16],  // Base 0.10→0.115 at Q2 FY27 review: FY26A EBITDA margin ~11% ($12.5B/$113.5B) and Q2 FY27 non-GAAP op margin 12.6% — 0.10 sat below actuals
  termGrowth: [0.015, 0.025, 0.030],
  bbRate: [0.005, 0.015, 0.025],

  desc: [
    'FY27 lands short of the $192B guide and the $95B AI backlog slips as hyperscaler CapEx normalizes faster than expected; FY28 revenue declines. Supermicro captures share on liquid-cooled Blackwell configs. PC segment contracts further. Server mix keeps FCF margins at 8%. Multiple compresses to 8× EBITDA as market re-rates Dell as cyclical hardware at peak earnings. Bear-case 5yr target {target} ({cagr} annualized).',
    'Dell delivers on its raised FY27 guidance ($192B revenue, $74B AI servers, $25.50 EPS) and FY28 tracks consensus. Services attach rates improve as enterprise deployments scale from PoC to production infrastructure; storage and networking mix rises. FCF margin expands from 10% to 12–13% by FY30 on operating leverage. Growth tapers to mid-single digits as the backlog ships; multiple holds ~9× EBITDA. Base-case 5yr target {target} ({cagr} annualized) — the re-rating already prices most of the reset.',
    'AI becomes the dominant enterprise infrastructure layer and Dell is the distribution channel. Sovereign AI programs, on-prem model hosting, and edge inference drive a second AI server wave in FY29–30. Services ARR grows 20%+/yr. FCF margin reaches 17–18%. Multiple expands to ~15× as earnings quality improves. Bull-case 5yr target {target} ({cagr} annualized).',
  ],

  burry: {
    sbc: 785,
    gaapNi: 5936,
    buyback: 3500,
    epsBasis: 'GAAP',
    fy: 'FY26',
    overstatementPct: 50,
    overstatementSource: 'estimated',
    note: 'Critical — estimated. FY26 SBC $785M vs GAAP NI ~$5.9B = naive 13%. DELL stock ~8-10× over 3 years (~$50 in 2023 to ~$586 by Oct 2026 after the Q2 FY27 guide raise); MTM amplifier ~5×. Q2 FY27 SBC $184M/qtr (flat y/y) vs non-GAAP NI $4.6B — the naive ratio is collapsing as earnings explode; refresh at FY27 close. Offset partially by ~$3.5B buybacks (4.5× SBC, 20% offset). Estimated overstatement ~50%.',
  },
  debtSafety: {
    netDebt: 22897,        // Jul 31 2026: $34.5B total debt − $11.6B cash
    ebitda: 17000,         // LTM EBITDA ≈ $17B after Q1-Q2 FY27 surge — approximate
    fy: 'LTM Q2 FY27',
    note: 'Net Debt/EBITDA ~1.3× (GREEN, Step 2) on LTM EBITDA ~$17B (FY26 was ~1.6× on $12.5B). Gross debt rose to $34.5B as AI working capital + record buybacks absorbed cash (Q2 FCF just $1.0B). An old $7.5B EBITDA value had wrongly flagged RED. Much of the gross debt is DFS financing debt matched by financing receivables.',
  },
});

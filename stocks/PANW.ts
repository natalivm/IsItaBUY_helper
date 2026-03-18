import { defineStock } from './defineStock';

export const PANW = defineStock({
  updatedOn: '07/03',
  ticker: 'PANW',
  name: 'Palo Alto Networks',
  sector: 'Cybersecurity',
  themeColor: '#00a3e0',
  currentPrice: 149,
  fairPriceRange: '$160 - $225',
  shares0: 770.0,
  rev25: 9200,
  fcfMargin25: 0.37,
  taxRate: 0.20,
  cash: 4540,
  debt: 600,
  beta: 1.20,
  costDebt: 0.05,
  rsRating: 21,
  aiImpact: 'TAILWIND',
  strategicNarrative: "Q2 FY2026 beat (NGS ARR +33% to $6.3B, EPS $1.03 vs $0.94 est.), but FY2026 EPS guidance cut to $3.65–3.70 (from $3.80) on CyberArk + Chronosphere integration costs. CyberArk (closed Feb 11) adds Identity as 4th pillar. 1,550 platformized customers, 119% NRR, SASE ARR >$1.5B. Stock RS ~20 — tape is broken. Avoid until integration costs digest and RS recovers above 40.",


  analystConsensus: { rating: 'Buy', targetLow: 160, targetMedian: 216, targetHigh: 260, numAnalysts: 38 },
  revGrowth: [
    [0.12, 0.09, 0.07, 0.05, 0.05],
    [0.23, 0.16, 0.14, 0.09, 0.12],
    [0.27, 0.20, 0.17, 0.13, 0.13],
  ],
  fcfMargin: [
    [0.28, 0.29, 0.30, 0.30, 0.30],
    [0.37, 0.37, 0.39, 0.40, 0.40],
    [0.40, 0.41, 0.43, 0.44, 0.45],
  ],
  exitMultiple: [12, 16, 20],
  desc: [
    'CyberArk/Chronosphere integration friction drags margins; SaaS rotation persists. Organic NGS ARR deceleration masked by M&A contribution.',
    'Consensus path: integration on track, NGS ARR sustains ~30%+ growth toward $20B FY2030 target, FCF margins expand to 40% by FY2028.',
    'Agentic AI security becomes enterprise standard; 4-pillar platform drives consolidation wins at scale; NGS ARR $20B FY2030 target achieved early.',
  ],

  ebitdaProxy: [0.28, 0.35, 0.42],
  bbRate: [0.005, 0.015, 0.02],
  bullMaOptVal: 149.0 * 770.0 * 0.07,
});

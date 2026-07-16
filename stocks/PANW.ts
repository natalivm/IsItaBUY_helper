import { defineStock } from './defineStock';

export const PANW = defineStock({
  updatedOn: '07/16',
  lastReportTag: 'Q2 FY26',
  ticker: 'PANW',
  name: 'Palo Alto Networks',
  sector: 'Cybersecurity',
  themeColor: '#00a3e0',
  currentPrice: 353.99,
  fairPriceRange: '$160 - $260',
  shares0: 770.0,
  rev25: 9200,
  fcfMargin25: 0.37,
  taxRate: 0.20,
  cash: 4540,
  debt: 600,
  beta: 1.20,
  costDebt: 0.05,
  rsRating: 90,
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Four-pillar platform strategy drives customer consolidation with best-in-class net revenue retention',
    'SASE and Identity acquisitions meaningfully expand addressable budget and deepen switching costs',
    'Agentic AI security is a net-new, expanding category where PANW\'s platform is already well-positioned',
    'Elite free cash flow margins make PANW one of the most capital-efficient cybersecurity businesses at scale',
  ],

  risksToBuy: [
    'CyberArk and Chronosphere integration costs have already cut near-term EPS guidance and may drag further',
    'Stock trades above the model\'s fair value range and above the analyst consensus high — entry risk is elevated',
    'RS deeply negative signals broad institutional skepticism that may persist until integration costs clear',
    'Cybersecurity platform consolidation is intensifying from Microsoft, CrowdStrike, and other scaled competitors',
    'SBC remains large in absolute terms and buybacks have not yet scaled to meaningfully offset dilution',
  ],

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

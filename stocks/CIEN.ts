import { defineStock } from './defineStock';

export const CIEN = defineStock({
  updatedOn: '07/14',
  lastReportTag: 'Q1 FY26',
  ticker: 'CIEN',
  name: 'Ciena Corporation',
  sector: 'Optical Networking / Telecom Infrastructure',
  themeColor: '#0ea5e9',
  currentPrice: 446.93,
  fairPriceRange: '$70 - $350',
  shares0: 141,
  rev25: 4770,
  fcfMargin25: 0.139,
  taxRate: 0.22,
  cash: 1400,
  debt: 100,
  beta: 1.30,
  costDebt: 0.045,
  rsRating: 99,
  aiImpact: 'TAILWIND',
  reasonsToBuy: [
    'Undisputed global leader in high-speed optical connectivity with deep hyperscaler design relationships',
    'Massive backlog secured well into the future, providing unusually strong near-term revenue visibility',
    'Next-generation product portfolio — Hyper-rail, CPO, Nitro Redriver — opens in-datacenter optical markets beyond WAN',
    'Supply-constrained market means pricing power and gross margin hold near record levels while demand outpaces supply',
    'AI data center interconnect is a structural multi-year buildout, not a one-quarter upgrade cycle',
  ],

  risksToBuy: [
    'EPS has historically been highly volatile through telecom capex cycles — drawdowns have been severe and prolonged',
    'Hardware-centric revenue model lacks a recurring software base to cushion when the upgrade cycle peaks',
    'Current valuation prices in a sustained supercycle — any deceleration in hyperscaler AI spending would compress the multiple sharply',
    'Cisco, Nokia, and Huawei compete aggressively on price in WAN and can replicate portions of the product roadmap',
    'Momentum-driven RS rating inflates near-term sentiment; the structural moat is moderate, not best-in-class',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 180, targetMedian: 260, targetHigh: 320, numAnalysts: 20 },
  revGrowth: [
    [0.28, 0.08, 0.05, 0.04, 0.03],
    [0.28, 0.15, 0.12, 0.09, 0.08],
    [0.28, 0.20, 0.18, 0.14, 0.12],
  ],
  fcfMargin: [
    [0.11, 0.10, 0.10, 0.10, 0.10],
    [0.12, 0.13, 0.135, 0.14, 0.145],
    [0.135, 0.15, 0.16, 0.17, 0.18],
  ],
  exitMultiple: [14, 18, 25],
  desc: [
    'Telecom capex cycle peaks in 2026-27, hyperscaler optical spend normalizes post-build-out. $7B backlog provides FY27 floor but FY28+ demand uncertain. ' +
      'Revenue growth decelerates to low-single digits as upgrade cycle completes. FCF margins stay compressed at ~10% due to hardware-heavy mix and component cost inflation. ' +
      'P/E compresses to historical telecom equipment levels (14x EV/EBITDA). EPS CAGR ~8%. Target ~$198, CAGR ~-7%.',
    'AI data center demand sustains through 2028+. Scale-across training deployments expand from 3 hyperscalers to broader base including neo-scalers. ' +
      'FY27 backlog-secured revenue gives high near-term confidence. EBIT margin stabilizes at 18-19% with gross margin reaching 45%+ waypoint. ' +
      'Hyper-rail and 800ZR pluggables drive incremental content. EPS CAGR ~15%. P/E compresses from ~48x to ~28x. Target ~$344, CAGR ~3%.',
    'AI supercycle extends multi-year — 800G/1.6T optical ramps, hyper-rail inflection in 2027, Vesta CPO and Nitro Redriver open in-datacenter TAM. ' +
      'Scale-across training expands globally. MOFN and neo-scaler demand accelerates. Revenue sustains 15%+ growth. ' +
      'Gross margin expands to 46%+ on pricing power in supply-constrained market. FCF margins reach 18%. EPS CAGR ~20%. Target ~$535, CAGR ~13%.',
  ],
  thesis: [
    'Supply constraints ease in FY27H2, revealing demand was partially pulled forward. Hyperscaler AI capex decelerates as $600B+ aggregate spend faces ROI scrutiny. ' +
      'Hardware-centric revenue model means no recurring base to cushion downturn. Historical EPS volatility (2.91→1.90→2.72→1.82→0.85) repeats. ' +
      'Component cost inflation squeezes margins. Competition from Cisco/Nokia intensifies on price as supply normalizes.',
    'Q1 FY26 record results and $7B backlog validate multi-year demand thesis. Three hyperscaler scale-across deployments expand with additional clusters. ' +
      'MOFN drives structural service provider growth (India +40% YoY). Gross margin reaches 45% waypoint on pricing + cost reductions + mix. ' +
      'Capacity investments in FY26 set up strong FY27 delivery. Supply-demand imbalance persists, supporting pricing power.',
    'Full AI optical networking thesis: scale-across training becomes standard architecture, Vesta CPO captures in-datacenter optical TAM, ' +
      'hyper-rail delivers order-of-magnitude fiber density improvement. DCOM expands beyond Meta to 2+ hyperscalers. Neo-scaler wave adds new customer cohort. ' +
      'Inference workload growth (still in infancy per mgmt) drives next wave of WAN demand. S&P 500 inclusion attracts institutional flows. EPS reaches $15+ by 2030.',
  ],

  prob: [25, 50, 25],
  termGrowth: [0.015, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.14, 0.22, 0.28],

  driverOverrides: [
    {},
    {
      revPrem: [0.005, 0.005, 0.005, 0.005, 0.005],
      fcfUplift: [0.005, 0.005, 0.005, 0.005, 0.005],
    },
    {
      revPrem: [0.01, 0.015, 0.015, 0.01, 0.01],
      fcfUplift: [0.005, 0.01, 0.01, 0.015, 0.015],
    },
  ],
});

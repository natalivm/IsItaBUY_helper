import { defineStock } from './defineStock';

export const CIEN = defineStock({
  updatedOn: '05/08',
  ticker: 'CIEN',
  name: 'Ciena Corporation',
  sector: 'Optical Networking / Telecom Infrastructure',
  themeColor: '#0ea5e9',
  currentPrice: 548.11,
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
  strategicNarrative: "Type B — cyclical growth on AI optical networking / data center interconnect wave. CIEN is the undisputed global leader in high-speed optical connectivity, benefiting from hyperscaler AI capex and 800G/1.6T upgrades. Q1 FY26 record: $1.43B revenue (+33% YoY), adj EPS $1.35 (2x YoY), gross margin 44.7%. FY26 guidance raised to $5.9B-$6.3B (+24-28% YoY). Backlog surged to $7B (+$2B in one quarter), with nearly all new orders for FY27 — providing multiyear visibility. Three hyperscalers deploying scale-across AI training solutions (early innings). Supply-constrained: demand outstripping supply for several quarters. New product inflections: Hyper-rail, Vesta 200 CPO, Nitro Redriver. Moat moderate — switching costs, vertical integration, deep hyperscaler collaboration, but faces Cisco/Nokia/Huawei competition in WAN. Forward P/E ~48x prices in significant cycle recovery. Key risk: telecom capex cyclicality — hardware revenue non-recurring, EPS historically volatile (2.91→1.90→2.72→1.82→0.85). RS 99 = massive momentum, not structural moat. Expected CAGR ~3-5% at current price. Probability of 15%+ CAGR: ~10-15%. Fair entry for 15% returns ~$150-$180.",

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

  burry: {
    sbc: 130,
    gaapNi: 200,
    buyback: 0,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 70,
    overstatementSource: 'estimated',
    note: 'Tragic — naive SBC/NI ~65% (estimated SBC ~$130M vs FY25 GAAP NI ~$200M; full-year EPS ~$1.40 across volatile quarters). Stock is +11× over 3 years ($50 → $548), creating massive MTM amplifier on vested awards. Minimal buyback program. Hardware-centric revenue with high SBC dependence makes the GAAP-to-economic gap worst among networking peers.',
  },
});

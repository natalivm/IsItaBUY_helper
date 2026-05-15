import { defineStock } from './defineStock';

export const ASTS = defineStock({
  ticker: 'ASTS',
  name: 'AST SpaceMobile',
  sector: 'Space Technology',
  themeColor: '#38bdf8',
  currentPrice: 83.67,
  updatedOn: '05/15',
  lastReportTag: 'Q1 2026',
  fairPriceRange: '$20 - $250',
  shares0: 370,
  rev25: 71,
  fcfMargin25: -0.10,
  taxRate: 0.15,
  cash: 3500,           // Q1 2026 end: $3.5B (inclusive of Feb convertible notes)
  debt: 2500,
  beta: 1.46,
  costDebt: 0.03,
  rsRating: 90,
  rsTrend: 'falling',
  ratingOverride: 'HOLD',
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "AST SpaceMobile is the only space-based cellular broadband network for standard smartphones — now ~60 MNO partners covering 3B+ subscribers (Verizon, AT&T, Vodafone, STC, Bell, TELUS, Rakuten). " +
    "Q1 2026 key facts: revenue $14.7M (below $36.6M expected, down 73% QoQ), FY2026 guidance $150-200M reiterated, cash $3.5B at Q1-end. Management explicitly said revenue will build each sequential quarter in 2026. " +
    "Technology milestone: 98.9 Mbps peak downlink achieved on Block 1 satellites over international waters to unmodified off-the-shelf smartphones — record, and Block 2 (BB8/9/10) expected to nearly double this to ~200 Mbps. ASIC delivers 10 GHz processing bandwidth vs 1 GHz on FPGA satellites (10×). " +
    "Manufacturing at scale: BB11-BB33 in advanced assembly, phased arrays complete through BB28. Target 6 fully assembled satellites/month. BB8/9/10 on Falcon 9 launching mid-June. BB7 lost in Blue Origin upper-stage anomaly; Blue Origin back-pad timeline uncertain but BO has 2 boosters in integration — management remains optimistic. Target: ~45 satellites in orbit by YE2026. " +
    "Ground integration active in 19 countries (US, Canada, UK, India, Brazil, Spain, Germany, France, Romania, Saudi Arabia, Japan, NZ, Philippines + 5 African markets) covering 2.9B people. Commissioning target 45 days post-launch → aiming for 2 weeks. Handoff achieved without connectivity disruption. FCC commercial authorization granted for US operations. " +
    "New partners: TELUS (Canada #2), Axian Telecom (pan-African, 11 countries). 3 new U.S. government awards through prime contractors (comms + non-comms). Golden Dome / Space Force budget request >$70B backdrop is favorable. 2027 revenue opportunity approaching $1B (contracted + highly recurring). " +
    "Bear case remains the same: Q1 miss creates pressure on a guide that requires the back 3 quarters to average $45-62M each. No guidance revision — that's the key signal to watch. RS falling to 90 reflects post-miss institutional caution. HOLD until launch milestones and H2 revenue ramp provide evidence.",

  analystConsensus: { rating: 'Hold', targetLow: 43, targetMedian: 70, targetHigh: 137, numAnalysts: 9 },
  revGrowth: [
    [0.97, 2.21, 1.44, 0.70, 0.45],
    [1.46, 4.14, 1.78, 0.90, 0.50],
    [2.52, 4.20, 2.08, 1.15, 0.60],
  ],
  fcfMargin: [
    [-2.50, -0.40, 0.05, 0.20, 0.28],
    [-5.00, -0.88, 0.07, 0.39, 0.49],
    [-3.80, -0.50, 0.15, 0.45, 0.52],
  ],
  exitMultiple: [12, 18, 25],
  desc: [
    'Deployment delays with <30 sats by YE26, stacking issues persist. Revenue reaches ~$140M in 2026, stalls below $2.5B by 2030. Launch cadence misses targets. Margins compressed by hardware-heavy mix and elevated capex ($350-425M/qtr). Dilution accelerates from additional capital raises.',
    'On-plan deployment hitting 45 sats by YE26, stacking validated, continuous coverage live. Revenue ramps from $71M (FY25 actual) through $175M (2026 guidance midpoint) to ~$900M (2027) and $4.8B by 2029. Service revenue reaches 88% of mix. $1.2B contracted backlog provides near-term visibility. 90%+ EBITDA margins at scale as unit economics validate.',
    'Accelerated deployment (60+ sats YE26), government/DoD contracts secured (Golden Dome, SHIELD, SDA prime contractor), L/S-band spectrum monetization live. Revenue exceeds $1.3B by 2027 and $8B+ by 2030. EBITDA margins above 80%, multiple expansion as market re-rates ASTS as dual-use infrastructure monopoly.',
  ],

  burry: {
    sbc: 47.49,
    gaapNi: -341.94,
    buyback: 23.02,
    epsBasis: 'GAAP',
    fy: 'FY25',
    overstatementPct: 100,
    overstatementSource: 'estimated',
    note: 'GAAP loss company — SBC overstatement framework inapplicable; rated Tragic by default. Real risk is constellation capex ($1.06B) and 395% 5-year share dilution, not SBC.',
  },

  bbRate: [0, 0, 0],
  ebitdaProxy: [0.35, 0.55, 0.65],
  bullMaOptVal: 73.65 * 370 * 0.07,

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.02, 0.02, 0.02, 0.02, 0.02],
      fcfUplift: [0.01, 0.01, 0.015, 0.015, 0.02],
    },
  ],
});

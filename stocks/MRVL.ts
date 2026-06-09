import { defineStock } from './defineStock';

export const MRVL = defineStock({
  updatedOn: '06/09',
  lastReportTag: 'Q1 FY27',
  ticker: 'MRVL',
  name: 'Marvell Technology',
  sector: 'Semiconductors',
  themeColor: '#22d3ee',
  currentPrice: 266.88,
  fairPriceRange: '$130 - $250',
  shares0: 870,
  rev25: 8195,            // FY26 annual revenue ($8.195B, ended Feb 1, 2026)
  fcfMargin25: 0.27,      // Updated: Q1 FY27 non-GAAP op margin 35.0%; FCF lags by ~5pp; trajectory to 32%+ in FY27
  taxRate: 0.15,
  cash: 2640,
  debt: 4470,
  beta: 2.29,
  costDebt: 0.055,
  rsRating: 87,           // 52W high $217.45 hit post-earnings; +176% 52W performance
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',

  // Q1 FY27 EARNINGS (May 27, 2026 AMC)
  // ─────────────────────────────────────────────────────────────────────────
  // Revenue $2.418B record (+28% YoY, +9% QoQ); non-GAAP EPS $0.80 (+29%
  // YoY, in-line QoQ); beat both consensus lines. Non-GAAP gross margin
  // 58.9%; non-GAAP operating margin 35.0%. GAAP EPS $0.04 (includes $331.8M
  // non-cash contingent consideration charge + SBC $207.6M vs $142.1M YoY).
  // Data center 76% of revenue, +27% YoY. Non-GAAP net income $718M.
  // Q2 FY27 guide: $2.7B (~+35% YoY, accelerating from 28%).
  // FY27 raised to ~$11.5B (+40% YoY); FY28 raised to ~$16.5B (+43% YoY).
  // FY28 non-GAAP operating margin target: 38-40%.
  // Management committed: Q4 FY27 revenue >$3B.
  // Interconnect products: >70% YoY revenue growth FY27.
  // Custom silicon: $1.5B FY26 → +20% FY27 → 20+ design wins entering
  // production FY28-FY29 (Amazon 5yr partnership, Google 2 inference chips).
  // Nvidia $2B strategic investment (Mar 2026) + NVLink Fusion integration.
  // Stock +4.8% post-earnings to $208.26; +145% YTD entering the print.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Custom-silicon flywheel scaling fast, with a multi-year Amazon partnership and Google inference-chip wins confirming hyperscaler diversification',
    'Market-leading optical interconnect (800G/1.6T DSPs) riding relentless AI data-center bandwidth demand',
    'Nvidia strategic investment and NVLink Fusion integration make Marvell an architectural dependency of the dominant AI stack, not just a supplier',
    'Beat-and-raise momentum: management keeps lifting the revenue and operating-margin trajectory as data center dominates the mix',
    'Broad design-win pipeline entering production over the next several years gives unusual revenue visibility',
  ],

  risksToBuy: [
    'Richly valued after a massive run — much of the AI-interconnect optionality is already priced in',
    'Heavy reliance on a handful of hyperscaler customers makes custom-silicon revenue lumpy and concentrated',
    'Broadcom and other ASIC/optical rivals compete directly for the same hyperscaler sockets',
    'GAAP earnings are thin relative to non-GAAP, weighed down by stock comp and acquisition charges',
    'High beta and a leveraged AI-capex thesis mean sharp drawdowns if hyperscaler spending cools',
  ],

  analystConsensus: { rating: 'Strong Buy', targetLow: 175, targetMedian: 245, targetHigh: 350, numAnalysts: 39 },

  revGrowth: [
    [0.32, 0.15, 0.08, 0.06, 0.05], // Bear: AI capex peaks FY27; custom silicon FY28 delay; Broadcom optical share gain
    [0.40, 0.43, 0.18, 0.12, 0.08], // Base: follows FY27 $11.5B and FY28 $16.5B management outlook raises
    [0.40, 0.50, 0.25, 0.18, 0.12], // Bull: Nvidia + Amazon + Google + new wins all ramp; Celestial fabric scales
  ],

  fcfMargin: [
    [0.25, 0.26, 0.27, 0.27, 0.27], // Bear: capex cycle; margins plateau on competitive pressure
    [0.28, 0.32, 0.34, 0.35, 0.36], // Base: operating leverage to 35% FCF as op margin expands to 40%+
    [0.28, 0.34, 0.38, 0.40, 0.42], // Bull: platform scale + SBC moderation + lower capex intensity
  ],

  exitMultiple: [18, 28, 35],

  desc: [
    'AI capex peaks in FY27 and hyperscaler custom silicon programs delay their FY28 ramp. Broadcom closes the optical DSP gap with integrated switching+optics bundles. Celestial AI photonic fabric slips to FY29+. ' +
      'Revenue growth decelerates sharply after FY27; FY31 reaches ~$15B but FCF margins plateau at 27%. Multiple compresses 65× → 18× EBITDA as the market reprices MRVL as a semiconductor cyclical. 5yr CAGR ~-4% from $208.',
    'FY27 $11.5B and FY28 $16.5B deliver per management guidance raises. Custom silicon grows +20% in FY27, re-accelerates in FY28 as 20+ design wins enter production. Optical interconnect holds 70%+ share. ' +
      'Non-GAAP operating margin expands from 35% to 40%+ by FY30 (per 38-40% FY28 target). Revenue reaches ~$23.4B by FY31 with 36% FCF margin. Exit at 28× EBITDA (42% proxy). 5yr CAGR ~9% from $208.',
    'Nvidia NVLink Fusion, Amazon, Google, and new hyperscaler programs all ramp simultaneously in FY28-29. Celestial AI photonic fabric achieves $1B+ run-rate by FY30, opening a new TAM. CXL/switching adds a third $1B+ growth vector. ' +
      'Revenue approaches $28B by FY31 with 42% FCF margin. FY28 $16.5B guide proves conservative. Exit at 35× EBITDA (47% proxy). 5yr CAGR ~18% from $208.',
  ],

  thesis: [
    'AI capex cycles historically run 2-3 years before rationalization. With MRVL up 145% YTD and trading at premium multiples, the market is pricing perfection. Customer concentration risk: a single Amazon or Google custom silicon program delay cascades through FY28 estimates. ' +
      'Broadcom threatens optical DSP share by bundling with Tomahawk switching (dominant franchise) — end-to-end portfolio discounts vs Marvell point-solution pricing. ' +
      'Celestial AI photonic fabric at scale has never shipped; integration complexity and latency requirements create significant execution risk. ' +
      'Revenue growth decelerates to mid-single-digits post-FY28 as the initial hyperscaler build-out matures. Multiple compresses to semiconductor-cyclical 18× EBITDA, erasing the AI premium.',
    'Marvell\'s thesis rests on structural, multi-year AI infrastructure investment: hyperscalers are committing $500B+/year in AI capex through at least 2028. Custom silicon is the most defensible franchise — once an XPU design is taped out with Marvell IPs, switching costs are prohibitive for 3-5 years (new tape-outs cost $500M+). ' +
      'Amazon, Google, and Microsoft all have multi-year programs in flight; 20+ new design wins entering FY28-29 production give unprecedented forward revenue visibility for a semiconductor company. ' +
      'Optical interconnect\'s 70%+ share in 800G/1.6T is extending into 200G/lane PAM4 and 1.6T next-gen. The NVLink Fusion integration locks MRVL into the Nvidia ecosystem structurally. ' +
      'Buybacks at $2.3B/yr (2.4× SBC) + expanding margins create durable EPS leverage. FY28 at 38-40% non-GAAP op margin on $16.5B revenue implies $5.60+ non-GAAP EPS — stock at 37× FY28E is reasonable for a semi growing 43% with this architecture.',
    'The Nvidia $2B investment and NVLink Fusion integration signal architectural dependency, not vendor relationship: Nvidia is standardizing on Marvell\'s optical and custom silicon as a long-term platform requirement. If Nvidia\'s infrastructure scales 50%+/year, MRVL\'s embedded position compounds revenue beyond the current $16.5B FY28 guide. ' +
      'Celestial AI photonic fabric represents the true asymmetric option: a potential $10B+ TAM for scale-up AI interconnect (intra-pod vs inter-rack); adoption would structurally re-rate MRVL from data center supplier to AI networking platform. ' +
      'Amazon and Google custom programs are in early innings — FY29 ramps are likely materially larger than FY28 production starts, with next-gen XPU generations already in design. The 20+ new design wins represent a multi-year compounding flywheel: each successful program wins the subsequent generation.',
  ],

  prob: [20, 50, 30],
  termGrowth: [0.025, 0.035, 0.04],
  bbRate: [0.002, 0.005, 0.01],
  ebitdaProxy: [0.32, 0.42, 0.47],
  bullMaOptVal: false,  // $181B+ market cap — too large for realistic acquisition

  driverOverrides: [
    {},
    {},
    {
      revPrem: [0.03, 0.03, 0.02, 0.02, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.02, 0.02],
    },
  ],

  burry: {
    sbc: 591,
    gaapNi: 2670,
    buyback: 2281,
    epsBasis: 'NON_GAAP',
    fy: 'FY26',
    overstatementPct: 35,
    overstatementSource: 'estimated',
    note: 'Critical (FY26 TIKR actuals). SBC $591M (7.2% of revenue), buybacks $2,281M = 3.86× SBC coverage. GAAP NI $2.67B FY26 (EPS $3.07) — major swing vs -$1.02 FY25. Burry overstatement 35% reflects moderate SBC + strong buyback offset. NOTE: Q1 FY27 SBC accelerated to $207.6M (+46% YoY from $142.1M), annualizing to ~$830M FY27 — a significant step-up from FY26 $591M. If FY27 SBC is $830M and normalized GAAP NI ~$1.2B (ex-contingent charges), naive SBC/NI jumps to 69%; buyback offset (~$2.5B = 3× SBC) still significant. Monitoring required: if SBC continues accelerating as a % of revenue, the tier may move to higher end of Critical or Tragic. FY26 used as anchor; revisit at next full-year report.',
  },
});

import { defineStock } from './defineStock';

export const HPE = defineStock({
  ticker: 'HPE',
  name: 'Hewlett Packard Enterprise Company',
  sector: 'Networking / AI Infrastructure',
  themeColor: '#01A982',
  updatedOn: '07/08',
  lastReportTag: 'Q2 FY26',
  dataReviewedOn: '2026-06-28',
  currentPrice: 44.67,    // Jun 26 2026 close (FY ends Oct 31); ran off ~$14 lows on the Juniper/AI re-rate
  fairPriceRange: '$40 - $125',
  shares0: 1340,          // ~1,342M diluted post-Juniper (preferred issued for the deal); mkt cap ~$58B
  rev25: 34296,           // FY2025 (Oct) revenue $34,296M (+13.8%, partial-year Juniper); LTM $38,794M. Q2 FY26 rev $10.7B (+40%)
  fcfMargin25: 0.07,      // FY25 reported FCF margin 1.8% (Juniper integration drag); normalized ~7-9%; FY26 FCF guide >=$3.5B
  taxRate: 0.15,          // ~15% effective (TIKR forward)
  cash: 5400,             // ~$5.4B cash (FY25 $5,859M); LTM $5,354M
  debt: 21000,           // ~$21B total debt post-Juniper; net debt de-levering toward the 2.0x target
  beta: 1.30,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 3.40,          // FY2026E non-GAAP EPS — mgmt guide midpoint $3.35-$3.45 (raised 40%+ at Q2, 2 yrs ahead of plan). FY25 was a GAAP loss on a $1.6B Juniper writedown/restructuring. FY27 framework: 12-16% EPS growth. TIKR path: $3.40->$4.00->$4.25->$5.03->$5.61 (FY26-30, ~13% CAGR).
  rsRating: 96,           // IBD RS 96 (Composite 82); strong individual RS, though its industry group ranks weak (group RS E)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',

  reasonsToBuy: [
    'Juniper acquisition transforms HPE into a networking-led platform — integration and synergies are running ahead of schedule, lifting the margin mix',
    'Networks for AI plus AI-native "self-driving" networking (Aruba/Mist, owned routing and campus silicon) puts HPE at the center of the enterprise AI buildout',
    'Record orders and backlog, with rare six-quarter guidance, signal durable demand into FY2027 — management calls AI networking demand "untouchable"',
    'Undemanding low-teens forward P/E for a double-digit earnings grower leaves clear room to re-rate toward networking peers',
    'De-levering to its 2.0x net-leverage target a year early unlocks a plan to return at least 75% of free cash flow via dividends and buybacks',
  ],

  risksToBuy: [
    'Heavy net debt from the Juniper deal still sits above target and amplifies downside in a downturn — the balance sheet is the key watch-item',
    'Memory and component (DDR) supply is the gating factor — strong orders can outrun the company\'s ability to convert backlog to revenue',
    'Revenue growth decelerates after the FY26 Juniper step-up, limiting the case for a premium networking multiple',
    'Hardware-heavy model (plus GreenLake leasing) keeps CapEx high and FCF margins well below software peers even in the bull case',
    'AI-capex normalization or enterprise budget fatigue could cut server and networking orders faster than management expects',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 24, targetMedian: 62, targetHigh: 80, numAnalysts: 23 },

  epsCagr: [7, 13, 18],   // Base mid of mgmt's 12-16% FY27 EPS framework / TIKR ~13% path; bull adds networking-mix acceleration
  exitPE: [9, 12, 16],
  prob: [30, 45, 25],

  revGrowth: [
    [0.28, 0.06, 0.03, 0.04, 0.03],   // Bear: AI-capex normalizes fast, synergies miss, legacy declines
    [0.31, 0.11, 0.06, 0.08, 0.05],   // Base: full-year Juniper + FY27 framework holds (TIKR path)
    [0.33, 0.15, 0.10, 0.12, 0.08],   // Bull: AI fabric becomes the dominant enterprise infrastructure layer
  ],
  fcfMargin: [
    [0.06, 0.07, 0.07, 0.08, 0.08],
    [0.08, 0.09, 0.10, 0.10, 0.10],
    [0.10, 0.12, 0.13, 0.14, 0.15],
  ],
  exitMultiple: [7, 11, 15],
  termGrowth: [0.015, 0.025, 0.030],
  bbRate: [0.003, 0.010, 0.015],
  ebitdaProxy: [0.15, 0.19, 0.21],
  bullMaOptVal: false,

  desc: [
    'AI capex normalizes faster than HPE\'s integration model assumed; Juniper synergies disappoint and legacy server/storage declines offset networking gains. The acquisition debt becomes a free-cash-flow burden, and the market re-rates HPE back to a cyclical hardware multiple (~9x). ' +
      'EPS compounds only ~7% from the FY2026E $3.40 base. 5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30%.',
    'Full-year Juniper consolidation and synergies deliver the FY26 step-up (EPS raised 40%+, two years ahead of plan), and HPE compounds earnings ~13% as Networks for AI and record backlog convert through FY2027. Free cash flow funds the dividend while the debt de-levers to its 2.0x target a year early, unlocking 75%+ FCF returns. EPS compounds ~13% from the $3.40 base while the low-teens multiple holds (~12x) — the networking re-rate is optional upside, not a requirement. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Cheap for the growth, with real optionality — but leverage and hardware cyclicality keep it from being a pound-the-table name.',
    'AI networking becomes the dominant enterprise infrastructure layer and HPE is a primary distribution platform — sovereign AI, on-prem inference and edge demand drive a second wave of fabric and server demand, and Juniper\'s Mist/Marvis becomes the de facto self-driving network. EPS compounds ~18% from the $3.40 base and the market awards a networking-peer ~16x as earnings quality re-rates. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: HPE is still a hardware-heavy, cyclical IT vendor carrying large acquisition debt. If AI capex digests or Juniper synergies slip, earnings stall while interest and CapEx eat the cash flow, and the multiple sinks back to high-single digits. ' +
      'At {spot} the valuation is low, but a levered balance sheet means the equity takes the hit if the cycle turns.',
    'The setup is unusually strong: a blowout Q2 (revenue +40%, EPS +108%, orders more than doubled to a record backlog) let management raise FY26 EPS 40%+ — two years ahead of plan — and hand out a rare six-quarter guide. HPE trades at a low-teens forward multiple while full-year Juniper, ahead-of-schedule synergies and durable AI-networking demand drive a low-teens EPS CAGR, with free cash flow de-levering the balance sheet to 2.0x a year early and then funding 75%+ capital returns. ' +
      'You are paying a hardware multiple for a business shifting toward higher-margin networking, with owned routing/campus silicon giving a supply edge — the re-rate toward Cisco/Arista-tier multiples is upside you are not forced to pay for. The catch remains the balance sheet and the memory/component supply that gates how fast the record backlog converts. Verdict: BUY — cheap, improving and levered to enterprise AI, but size for the leverage.',
    'The bull case: enterprise AI networking compounds for years, HPE/Juniper owns the fabric and self-driving campus standard, the legacy mix shrinks as a share of profit, and the market finally pays a networking multiple for the combined franchise. ' +
      '{target} is achievable if synergies compound, supply loosens and the networking re-rate plays out. Probability 25% — requires durable AI-infrastructure demand and clean execution.',
  ],

  burry: {
    sbc: 850,
    gaapNi: 3300,
    buyback: 300,
    epsBasis: 'NON_GAAP',
    fy: 'FY26E',
    overstatementPct: 50,
    overstatementSource: 'estimated',
    note: 'Critical. SBC ~$850M (FY25 $643M, rising with Juniper) vs FY26E GAAP NI ~$3.3B (GAAP EPS guide $2.42-$2.52) = ~26% naive; the ~3x stock move over 3 years adds a meaningful MTM amplifier, and buybacks are paused until the 2.0x leverage target so there is little offset for now. Reported non-GAAP profitability overstates true owner economics. (FY25 GAAP was a loss on a $1.6B Juniper writedown/restructuring.)',
  },

  debtSafety: {
    netDebt: 13500,
    ebitda: 6800,
    fy: 'FY26E',
    note: 'GREEN (de-levering through the line). Net leverage was 2.3x at Q2 FY26 (down from 2.6x) and management now expects to hit its 2.0x net-leverage target by end of FY2026 — a year early — on strong FCF (>=$3.5B FY26 guide) and the full divestiture of the H3C stake. Once at 2.0x, HPE plans to return >=75% of FCF via dividends and buybacks. Investment-grade credit; post-Juniper leverage is the watch-item but is coming down fast. CapEx/OCF runs ~35-40% (hardware + GreenLake leasing).',
  },
});

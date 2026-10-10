import { defineStock } from './defineStock';

export const HPE = defineStock({
  ticker: 'HPE',
  name: 'Hewlett Packard Enterprise Company',
  sector: 'Networking / AI Infrastructure',
  themeColor: '#01A982',
  updatedOn: '10/09',
  lastReportTag: 'Q3 FY26',
  dataReviewedOn: '2026-10-10',
  currentPrice: 73.46,    // FY ends Oct 31; ran off ~$14 lows on the Juniper/AI re-rate
  fairPriceRange: '$53 - $92',  // stockanalysis.com analyst target range, Oct 6 2026
  shares0: 1449,          // Q3 FY26 diluted weighted shares 1,449M (incl. preferred issued for Juniper); mkt cap ~$106B
  rev25: 34296,           // FY2025 (Oct) revenue $34,296M (+13.8%, partial-year Juniper); LTM $38,794M. Q2 FY26 rev $10.7B (+40%)
  fcfMargin25: 0.07,      // FY25 reported FCF margin 1.8% (Juniper integration drag); normalized ~7-9%; FY26 FCF guide >=$3.5B
  taxRate: 0.15,          // ~15% effective (TIKR forward)
  cash: 6216,             // Jul 31 2026 cash & equivalents
  debt: 20244,           // Jul 31 2026: $2.9B ST + $17.3B LT; de-levering toward the 2.0x target
  beta: 1.30,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 3.80,          // FY2026E non-GAAP EPS — guide midpoint $3.75-$3.85 (raised again at Q3 FY26 from $3.35-3.45; consensus $3.83, FY27E $4.71). FY27 outlook: EPS +16-20%, revenue +13-17%, FCF >=$5B. Prior: $3.40 (Q2 guide, raised 40%+, 2 yrs ahead of plan). FY25 was a GAAP loss on a $1.6B Juniper writedown/restructuring. Old FY27 framework (pre-Q3): 12-16% EPS growth. Old TIKR path: $3.40->$4.00->$4.25->$5.03->$5.61 (FY26-30, ~13% CAGR).
  rsRating: 99,           // IBD RS per user, 10/10/2026 (was 96)
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',

  // Q3 FY26 UPDATE (Sep 2, 2026)
  // ─────────────────────────────────────────────────────────────────────────
  // Beat-and-raise again. Revenue $12.2B (+34% y/y, +14% q/q), above the
  // $11.5-12.1B guide. Non-GAAP gross margin 40.4%, op margin 16.2% (GAAP
  // 11.4%). Non-GAAP EPS $1.11 (vs $0.88-0.93 guide, $0.44 y/y); GAAP $1.06.
  // NETWORKING $2.9B (+75%, 22.0% margin): routing $788M (+270%), DC
  // networking $382M (+112%), security +76%, campus & branch +31%. CLOUD & AI
  // $9.0B (+25%), margin 17.0% (from 7.0%): servers $6.8B (+35%), storage
  // +10%. Backlog "at a record level". OCF $1.64B, FCF $958M. Cash $6.2B vs
  // debt $20.2B (net ~$14.0B). $324M returned (dividends + buybacks).
  // GUIDE: Q4 revenue $13.9-14.8B, non-GAAP EPS $1.20-1.30, return >=75% of
  // Q4 FCF. FY26 raised: revenue +34-37%, networking +73-74%, non-GAAP EPS
  // $3.75-3.85, GAAP $2.93-3.03, FCF >=$3.75B. FY27 raised: revenue +13-17%,
  // non-GAAP EPS +16-20%, op margin 14-15%, FCF >=$5B. Street: Buy, PT
  // $53-92 (median $70) — stock at ~$73 sits ON the mean target, ~19× FY26E
  // / ~16× FY27E EPS (re-rated from low-teens). Net: execution excellent;
  // the cheap-multiple leg of the BUY case is gone, so the verdict is HOLD.
  // ─────────────────────────────────────────────────────────────────────────

  reasonsToBuy: [
    'Juniper acquisition transforms HPE into a networking-led platform — integration and synergies are running ahead of schedule, lifting the margin mix',
    'Networks for AI plus AI-native "self-driving" networking (Aruba/Mist, owned routing and campus silicon) puts HPE at the center of the enterprise AI buildout',
    'Record orders and backlog, with rare six-quarter guidance, signal durable demand into FY2027 — management calls AI networking demand "untouchable"',
    'Networking is now the profit engine — routing and data-center networking are growing several-fold, lifting the margin mix',
    'De-levering to its 2.0x net-leverage target a year early unlocks a plan to return at least 75% of free cash flow via dividends and buybacks',
  ],

  risksToBuy: [
    'Heavy net debt from the Juniper deal still sits above target and amplifies downside in a downturn — the balance sheet is the key watch-item',
    'Memory and component (DDR) supply is the gating factor — strong orders can outrun the company\'s ability to convert backlog to revenue',
    'Revenue growth decelerates after the FY26 Juniper step-up, limiting the case for a premium networking multiple',
    'Hardware-heavy model (plus GreenLake leasing) keeps CapEx high and FCF margins well below software peers even in the bull case',
    'AI-capex normalization or enterprise budget fatigue could cut server and networking orders faster than management expects',
  ],

  analystConsensus: { rating: 'Buy', targetLow: 52.59, targetMedian: 70, targetHigh: 92, numAnalysts: 24 },  // stockanalysis.com, Oct 6 2026

  epsCagr: [7, 13, 18],   // Kept at Q3 FY26: new FY27 guide +16-20% then tapering (~18/14/12/11/10%) still compounds to ~13%. Was: base mid of mgmt's 12-16% FY27 EPS framework / TIKR ~13% path; bull adds networking-mix acceleration
  exitPE: [9, 12, 16],
  prob: [30, 45, 25],

  revGrowth: [
    [0.34, 0.08, 0.03, 0.04, 0.03],   // Bear: FY26 at low end of +34-37% guide; AI-capex normalizes fast, synergies miss, legacy declines
    [0.355, 0.15, 0.06, 0.08, 0.05],  // Base: FY26 guide mid (+34-37%), FY27 guide mid (+13-17%), then tapering
    [0.37, 0.19, 0.10, 0.12, 0.08],   // Bull: AI fabric becomes the dominant enterprise infrastructure layer
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
    'AI capex normalizes faster than HPE\'s integration model assumed after the FY26 step-up; Juniper synergies disappoint and legacy server/storage declines offset networking gains. The acquisition debt becomes a free-cash-flow burden, and the market re-rates HPE back to a cyclical hardware multiple (~9x). ' +
      'EPS compounds only ~7% from the FY2026E $3.80 base. 5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 30%.',
    'Full-year Juniper consolidation and synergies deliver the FY26 step-up (EPS guide raised twice, to ~$3.80), and HPE compounds earnings ~13% as the FY27 outlook (EPS +16-20%) and record backlog convert. Free cash flow funds the dividend while the debt de-levers to its 2.0x target a year early, unlocking 75%+ FCF returns. EPS compounds ~13% from the $3.80 base but the multiple normalizes from ~19x back toward ~12x. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. The stock has already re-rated on the good news — great execution, fair price, HOLD.',
    'AI networking becomes the dominant enterprise infrastructure layer and HPE is a primary distribution platform — sovereign AI, on-prem inference and edge demand drive a second wave of fabric and server demand, and Juniper\'s Mist/Marvis becomes the de facto self-driving network. EPS compounds ~18% from the $3.80 base and the market awards a networking-peer ~16x as earnings quality re-rates. ' +
      '5-yr target: {target} ({return} from current), roughly {cagr} annualized. Probability: 25%.',
  ],

  thesis: [
    'Bear mechanics: HPE is still a hardware-heavy, cyclical IT vendor carrying large acquisition debt. If AI capex digests or Juniper synergies slip, earnings stall while interest and CapEx eat the cash flow, and the multiple sinks back to high-single digits. ' +
      'At {spot} (~19x FY26E EPS after the re-rate) the valuation is no longer low, and a levered balance sheet means the equity takes the hit if the cycle turns.',
    'Execution keeps beating: a blowout Q2 (revenue +40%, EPS +108%) and a Q3 beat (revenue +34%, networking +75%, Cloud & AI margin 17% from 7%) drove two FY26 EPS raises and a raised FY27 outlook. But the stock has re-rated from a low-teens to a ~19x FY26E multiple and sits on the Street mean target, while full-year Juniper, ahead-of-schedule synergies and durable AI-networking demand drive a low-teens EPS CAGR, with free cash flow de-levering the balance sheet to 2.0x a year early and then funding 75%+ capital returns. ' +
      'The business is shifting toward higher-margin networking, with owned routing/campus silicon giving a supply edge — but the re-rate toward networking-peer multiples is now largely paid for. The balance sheet and the memory/component supply that gates backlog conversion remain the watch-items. Verdict: HOLD — quality improving fast, but the cheap entry is gone; add on pullbacks.',
    'The bull case: enterprise AI networking compounds for years, HPE/Juniper owns the fabric and self-driving campus standard, the legacy mix shrinks as a share of profit, and the market finally pays a networking multiple for the combined franchise. ' +
      '{target} is achievable if synergies compound, supply loosens and the networking re-rate plays out. Probability 25% — requires durable AI-infrastructure demand and clean execution.',
  ],

  burry: {
    sbc: 700,           // Q3 FY26 SBC $165M/qtr → ~$0.7B FY26E
    gaapNi: 4300,       // FY26E: GAAP EPS guide $2.93-3.03 (raised at Q3) × ~1.45B diluted shares
    buyback: 300,
    epsBasis: 'NON_GAAP',
    fy: 'FY26E',
    overstatementPct: 50,
    overstatementSource: 'estimated',
    note: 'Critical. Q3 FY26 refresh: SBC ~$0.7B (Q3 $165M) vs FY26E GAAP NI ~$4.3B (GAAP EPS guide raised to $2.93-3.03) = ~16% naive — but the stock is ~5x off its lows, so the MTM amplifier is large; re-estimate the % at FY26 close (Oct). Earlier: SBC ~$850M est. (FY25 $643M) vs FY26E GAAP NI ~$3.3B = ~26% naive; the ~3x stock move over 3 years adds a meaningful MTM amplifier, and buybacks are paused until the 2.0x leverage target so there is little offset for now. Reported non-GAAP profitability overstates true owner economics. (FY25 GAAP was a loss on a $1.6B Juniper writedown/restructuring.)',
  },

  debtSafety: {
    netDebt: 14028,        // Jul 31 2026: $20.2B debt − $6.2B cash
    ebitda: 8500,          // FY26E: non-GAAP op profit guided +100-105% (~$6.5B) + D&A — approximate
    fy: 'FY26E',
    note: 'GREEN (~1.65× on FY26E EBITDA). Q3 FY26: FCF $958M; FY26 FCF guide raised to >=$3.75B, FY27 >=$5B; capital returns (>=75% of FCF) restarting in Q4. Earlier (Q2): Net leverage was 2.3x at Q2 FY26 (down from 2.6x) and management now expects to hit its 2.0x net-leverage target by end of FY2026 — a year early — on strong FCF (>=$3.5B FY26 guide) and the full divestiture of the H3C stake. Once at 2.0x, HPE plans to return >=75% of FCF via dividends and buybacks. Investment-grade credit; post-Juniper leverage is the watch-item but is coming down fast. CapEx/OCF runs ~35-40% (hardware + GreenLake leasing).',
  },
});

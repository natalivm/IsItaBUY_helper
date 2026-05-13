import { defineStock } from './defineStock';

export const ZS = defineStock({
  ticker: 'ZS',
  name: 'Zscaler',
  sector: 'Cybersecurity / Zero Trust',
  themeColor: '#0067D9',
  currentPrice: 146.17,
  fairPriceRange: '$115 - $280',
  shares0: 161,
  rev25: 3000,
  fcfMargin25: 0.30,
  taxRate: 0.20,
  cash: 3508,
  debt: 1150,
  beta: 0.98,
  costDebt: 0.045,
  modelType: 'EPS_PE',
  baseEps: 4.57,
  rsRating: 55,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  ratingOverride: 'HOLD',
  updatedOn: '05/12',

  strategicNarrative:
    "Zscaler is the dominant zero-trust security platform — FY25 revenue $2.67B (+23% YoY), LTM $3.00B sustaining ~28% growth. Elite scale economics: 77% gross margin, 31.5% FCF margin, strong deferred revenue ($573M increase in FY25 alone signals durable enterprise prepayments). Revenue 5y CAGR 35% — extremely rare in cybersecurity at this scale. " +
    "Zero-trust architecture is structurally winning vs legacy firewall-based security: every cloud workload, every remote worker, every AI agent needs identity-based access rather than network perimeter. ZS is the architectural standard, with Microsoft + Cisco scrambling to catch up. " +
    "The Burry problem: SBC $737M LTM = **24.6% of revenue** — the highest in our entire portfolio coverage. Naive comparisons: " +
    "DDOG 21.3%, AXON 21.1%, CRWD 22.8%, but ZS tops them all. SBC = **66.2% of operating cash flow** and **77.9% of reported FCF**. The 'cash machine' narrative depends on counting SBC as non-cash; without that addback, true owner economics shrink dramatically. " +
    "Zero buybacks across all years. Diluted shares 136M (FY21) → 157M (LTM) = +16% cumulative / +3.0%/yr — better than PLTR/AXON but unoffset by any repurchase program. " +
    "GAAP profitability remains elusive: operating margin LTM -4.4%, has narrowed from -14% in FY23 but stays negative. The path to 20%+ operating margin requires either (a) SBC ratio compressing dramatically — historically rare for high-growth SaaS, or (b) revenue growing far faster than comp — possible but needs continued 25%+ growth. " +
    "Valuation context at $152.13 / ~$24B market cap (May 2026): forward P/E 33× on $4.57 forward non-GAAP EPS, forward P/S 8×, EV/Sales 7.6×. Stock has crashed from 52w high of $337 (−55% drawdown), currently +33% above 52w low of $115. YTD −32%, 1Y −35%. RS faded but recently bounced (SMA20 +11%, RSI 61). " +
    "GAAP picture remains weak: LTM operating margin -4.5%, net income -$67.6M, GAAP EPS -$0.43. The non-GAAP forward EPS of $4.57 vs LTM GAAP -$0.43 = a $5 EPS gap, almost entirely SBC addback. " +
    "Analyst target median $221 (Recom 1.47 Strong Buy) implies +45% upside, but consensus has been wrong before on ZS. " +
    "Bull (~30%): Zero-trust supercycle extends + AI security inflection, growth holds 25%+, margins finally inflect to 15%+ by FY28 → $280. Base (~45%): Growth decelerates to 18-20%, margins slowly improve, multiple stays 33× → $175-200. Bear (~25%): Competition (PANW, Microsoft Entra, Cisco) intensifies, growth halves, SBC stays structural, multiple compresses to 22× → $115. " +
    "HOLD — best zero-trust pure-play, but the SBC profile is the worst in our coverage and the company has yet to generate GAAP profits at scale. Burry-cited stock; the framework flags this as deeply Tragic (95% overstatement). At $152 the multiple is materially more reasonable than at $337 peak, but until ZS shows durable GAAP profitability + initiates buybacks, the dilution overhang remains the dominant risk.",

  analystConsensus: { rating: 'Strong Buy', targetLow: 115, targetMedian: 221, targetHigh: 280, numAnalysts: 30 },

  revGrowth: [
    [0.15, 0.13, 0.11, 0.10, 0.08], // Bear: PANW Cortex + MSFT Entra erode share, growth halves
    [0.22, 0.20, 0.17, 0.15, 0.13], // Base: zero-trust adoption continues, normalizes
    [0.28, 0.25, 0.22, 0.19, 0.16], // Bull: AI security inflection + international + zero-trust dominance
  ],

  fcfMargin: [
    [0.28, 0.28, 0.29, 0.29, 0.30], // Bear: margin stalls
    [0.31, 0.33, 0.35, 0.36, 0.37], // Base: gradual operating leverage
    [0.32, 0.36, 0.39, 0.42, 0.45], // Bull: full SaaS economics emerge
  ],

  exitMultiple: [22, 35, 50],

  desc: [
    'Microsoft Entra + Cisco SSE + PANW Cortex bundles erode Zscaler\'s pricing power in mid-market and SMB segments. Growth decelerates to mid-teens. ' +
      'SBC stays at 22-24% of revenue — operating leverage inflection delayed indefinitely. GAAP operating margin stays negative through FY28. ' +
      'Multiple compresses from 69× to 30×. EPS grows at ~10% from $3.50 base. 5yr target ~$150-180, roughly -7% to -5% annualized.',
    'Zero-trust architecture continues winning vs perimeter security. ZS maintains its position as the standard for enterprise SSE. Growth normalizes to 18-20%. ' +
      'Operating leverage gradually delivers: FCF margin expands to 37%, GAAP operating margin reaches 8-10% by FY28. SBC ratio drops from 24% to 17%. ' +
      'Multiple compresses 43× → 35× through earnings growth. 5yr target ~$155-175, ~0-3% annualized — fair valuation, modest returns.',
    'Zero-trust + AI security super-cycle. ZS captures the AI-agent security TAM (every agent needs identity + policy). Workload protection + browser isolation become core platform. ' +
      'Operating leverage delivers: FCF margin to 45%, GAAP operating margin to 18%+. SBC ratio falls to 14%. Buybacks initiate in FY28 once cash position justifies it. ' +
      'Multiple holds 50× given platform position. EPS compounds at 25%+ from $3.50 base. 5yr target $320+, ~6-8% annualized.',
  ],

  thesis: [
    'Microsoft Entra + Cisco SSE + Palo Alto Prisma Access bundle attacks ZS\'s premium pricing model. Enterprises consolidate security spend with incumbent vendors who can bundle SSE with existing licenses. ' +
      'Net retention compresses from 117% to 110%. SBC stays structurally high; GAAP profitability remains years away. ' +
      'At 69× forward P/E + 24.6% SBC drag + competition headwind, multiple compression delivers severe drawdown. Net dilution at 3%/yr without buyback offset compounds the problem.',
    'Zero-trust architecture remains the structural winner; ZS keeps its lead as the pure-play. Enterprise zero-trust deployments accelerate as remote work + cloud workloads + AI agents all demand identity-based access. ' +
      'Operating leverage finally emerges as the existing customer base monetizes deeper through Workload Protection + Browser Isolation + Data Protection modules. ' +
      'SBC ratio gradually improves but stays elevated. Quality compounder at fair multiple — most returns from EPS growth, not multiple expansion.',
    'AI-driven security inflection: every AI agent, every model deployment, every autonomous workload needs zero-trust identity + policy enforcement. ZS becomes the de-facto AI-security infrastructure. ' +
      'Zero Trust Exchange evolves into Zero Trust Cloud (browser isolation + workload protection + AI security). Operating leverage delivers SBC compression. ' +
      'Market awards 50× premium given pure-play AI-security position. 25%+ EPS CAGR delivers durable 8-10% annualized returns.',
  ],

  termGrowth: [0.025, 0.035, 0.040],
  bbRate: [0.000, 0.003, 0.008],
  ebitdaProxy: [0.20, 0.30, 0.40],
  bullMaOptVal: false,

  epsCagr: [10, 22, 30],
  exitPE: [25, 40, 55],
  prob: [25, 45, 30],

  driverOverrides: [
    {},
    {
      revPrem: [0.01, 0.01, 0.01, 0.01, 0.01],
      fcfUplift: [0.005, 0.01, 0.015, 0.02, 0.02],
    },
    {
      revPrem: [0.02, 0.02, 0.015, 0.015, 0.01],
      fcfUplift: [0.01, 0.015, 0.02, 0.025, 0.025],
    },
  ],

  burry: {
    sbc: 661,
    gaapNi: -68,
    buyback: 0,
    epsBasis: 'NON_GAAP',
    fy: 'FY25',
    overstatementPct: 95,
    overstatementSource: 'estimated',
    note: 'Tragic — Burry explicitly cites ZS in his Cassandra Unchained list. TIKR FY25 actuals: SBC $661M (LTM $737M = 24.6% of revenue — highest in our entire coverage). May 2026 finviz refresh: LTM operating margin -4.5%, GAAP NI -$67.6M, GAAP EPS -$0.43. The reported $947M FCF is 77.9% SBC addback by accounting math; true owner FCF is closer to $200M after treating SBC as the real cash cost. Zero buybacks across all years. Diluted shares +16% over 5y (+3%/yr); current 160.57M. baseEps $4.57 is non-GAAP forward; GAAP is negative, so the haircut framework already broken. The 95% estimate reflects Burry-cited tier + worst SBC ratio in coverage + no buyback offset + GAAP loss-maker status. ZS makes CRWD look like a buyback hero by comparison.',
  },
});

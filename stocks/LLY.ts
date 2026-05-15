import { defineStock } from './defineStock';

export const LLY = defineStock({
  ticker: 'LLY',
  name: 'Eli Lilly and Company',
  sector: 'Pharmaceuticals / GLP-1',
  themeColor: '#e01933',
  updatedOn: '05/15',
  currentPrice: 1004.92,
  fairPriceRange: '$750 - $1800',
  shares0: 947,
  rev25: 65200,
  fcfMargin25: 0.137,
  taxRate: 0.14,
  cash: 3200,
  debt: 30000,
  beta: 0.8,
  costDebt: 0.04,
  modelType: 'EPS_PE',
  baseEps: 24.21,
  rsRating: 69,
  rsTrend: 'flat',
  aiImpact: 'NEUTRAL',
  strategicNarrative:
    "LLY is a structural compounder driven by the GLP-1 revolution (obesity + diabetes). " +
    "Q4 2025 earnings + TD Cowen call confirmed a broader thesis: not a one-drug obesity winner but a metabolic disease platform " +
    "(like NVDA in AI or ASML in lithography) with manufacturing moat, direct-to-patient channel via Lilly Direct, " +
    "and multi-layered pipeline: tirzepatide (foundation), orforglipron (oral mass market, FDA approval expected early Q2, " +
    "instant launch readiness, $149–399 pricing for mass adoption), retatrutide (28–29% weight loss, severe obesity BMI>37–40), " +
    "and amylin drugs (low side effects). TD Cowen confirmed: $1.5B pre-launch inventory ready, no oral/injectable cannibalization — " +
    "oral expands TAM. Two-stage market emerging: injections for weight loss → oral for maintenance, increasing patient LTV. " +
    "FY26 guide strong: revenue $80–83B (+25% YoY), EPS $33.5–35.0 (+38–45% YoY). Volume is the driver — price headwinds " +
    "(low-to-mid teens) offset by scale. Global TAM: ~1B potential patients (100M US, 900M ex-US), current penetration only ~2–3%. " +
    "Consensus models $100–150B GLP-1 market by 2030, but penetration math suggests $250–300B+ is possible " +
    "(400–500M addressable × 15–20% penetration × $3–4k ARPU). GLP-1s expanding beyond weight loss into CV, kidney, sleep apnea, " +
    "fatty liver, addiction — becoming metabolic platform therapy. Retatrutide (triple agonist: GLP-1 + GIP + glucagon) could be " +
    "most valuable asset — 24–29% weight loss approaches bariatric surgery levels, targeting severe obesity (BMI>37–40), " +
    "a $60–80B segment where payer willingness-to-pay is highest. Phase III critical — triple agonists may have more GI side effects. " +
    "LLY builds tiered therapy stack: orforglipron (mass oral) → tirzepatide (core) → retatrutide (high-efficacy) → amylin (low side effects). " +
    "If TAM reaches $250B+ with LLY at 35–40% share, GLP-1 revenue alone could be $90–120B vs $65B total today. " +
    "Pipeline beyond GLP-1: cardiovascular (LPA), oncology (oral SERDs), Alzheimer (Kisunla, remternetug). " +
    "However, at ~41x trailing P/E the stock is priced for near-perfect execution. " +
    "Fair value ~$750–850 on base case; valuation looks reasonable only if TAM is $250B+. " +
    "Probability of 15%+ CAGR: ~45%. Main risk is valuation / multiple compression, not business deterioration. " +
    "RS 80: strong relative strength in consolidation, not a fresh breakout leader.",

  epsCagr: [12, 18, 22],
  exitPE: [22, 28, 35],
  prob: [20, 45, 35],

  analystConsensus: { rating: 'Strong Buy', targetLow: 700, targetMedian: 1230, targetHigh: 1500, numAnalysts: 30 },

  revGrowth: [
    [0.20, 0.12, 0.08, 0.06, 0.04],
    [0.25, 0.18, 0.14, 0.10, 0.08],
    [0.28, 0.22, 0.18, 0.14, 0.10],
  ],
  fcfMargin: [
    [0.12, 0.12, 0.13, 0.13, 0.14],
    [0.14, 0.16, 0.18, 0.20, 0.22],
    [0.16, 0.19, 0.22, 0.24, 0.26],
  ],
  exitMultiple: [14, 18, 22],
  desc: [
    'Price erosion stronger than expected, oral GLP-1 launch underwhelms, market growth decelerates. EPS compounds at ~12% as competition from Novo Nordisk, Amgen, and Pfizer intensifies. P/E compresses to 22x toward historical norms. Patent cliff concerns post-2030 weigh on sentiment.',
    'Strong structural growth continues — GLP-1 market expands to $100B+, Zepbound/Mounjaro maintain leadership, orforglipron adds oral optionality. EPS grows ~18% as revenue scales and EBIT margin expands to high-40s. Moderate P/E compression to 28x reflects maturing growth phase.',
    'GLP-1 market reaches $250B+ as penetration rises to 15–20% of addressable population. Orforglipron at $149–399 drives mass-market oral adoption, retatrutide (24–29% weight loss) captures $60–80B severe obesity segment as pharma alternative to bariatric surgery. Tiered therapy stack covers full patient spectrum. Two-stage model (inject → oral maintenance) maximizes patient LTV. LLY at 35–40% share = $90–120B GLP-1 revenue alone. EPS compounds at ~22%, premium 35x multiple holds on metabolic disease platform leadership.',
  ],

  termGrowth: [0.02, 0.025, 0.03],
  bbRate: [0.005, 0.01, 0.015],
  ebitdaProxy: [0.40, 0.45, 0.50],
});

import { defineStock } from './defineStock';

export const HPE = defineStock({
  ticker: 'HPE',
  name: 'Hewlett Packard Enterprise Company',
  sector: 'Networking / AI Infrastructure',
  themeColor: '#01A982',

  currentPrice: 56.15,
  fairPriceRange: '$15 - $85',
  shares0: 1330,
  rev25: 34296,
  fcfMargin25: 0.06,
  taxRate: 0.16,
  cash: 4840,
  debt: 21660,
  beta: 1.30,
  costDebt: 0.045,

  rsRating: 93,
  rsTrend: 'rising',
  aiImpact: 'TAILWIND',
  updatedOn: '06/02',
  lastReportTag: 'Q2 FY26',

  analystConsensus: { rating: 'Buy', targetLow: 32, targetMedian: 50, targetHigh: 68, numAnalysts: 25 },

  strategicNarrative:
    'Q2 FY26 (Apr 2026): Revenue $10.678B (+40% YoY, +15% QoQ) · Non-GAAP EPS $0.79 vs $0.53 est. (49% beat, +108% YoY) · GAAP EPS $0.44 · Non-GAAP gross margin 36.9% (record, +750 bps YoY) · OCF $1.4B (+$1.9B YoY) · FCF $0.9B (record Q2, +$1.8B YoY) · Networks for AI orders on track for $1.7–$1.9B cumulative by FY26 year-end.\n\n' +

    'FY26 guidance raised: revenue +29–33% YoY (~$44–46B), GAAP EPS $2.42–$2.52, non-GAAP EPS $3.35–$3.45, FCF ≥$3.5B. FY27 financial framework introduced for the first time: revenue +8–12%, non-GAAP EPS +12–16%, FCF ≥$4.5B — multi-year visibility management has not previously offered.\n\n' +

    "HPE's core thesis is the Juniper Networks integration repricing. The $14B acquisition (closed Feb 2024) is executing ahead of schedule on $600M+ synergy targets, and the margin proof is unambiguous: non-GAAP gross margin expanded from the mid-20s to 36.9% — a structural shift, not a one-quarter beat. Juniper (Aruba, Mist AI, cloud-native switching) transforms HPE from a commodity server/storage vendor into a networking-led infrastructure platform. Networks for AI — Ethernet fabrics for AI clusters, campus AI networking, sovereign AI — is the new demand vector, with $1.7–1.9B in cumulative orders expected by FY26 year-end as enterprises begin the build-out cycle. Dell's Q1 FY27 print confirmed AI server demand; tonight's HPE print confirms the networking side of the same buildout.\n\n" +

    "At $43 post-surge, HPE trades at ~12.6× FY26 non-GAAP EPS ($3.40 midpoint) with 31% revenue growth — undemanding if Juniper synergies compound into FY27 and the $4.5B+ FCF framework holds. The structural concern is net debt of ~$16.8B (~2.9× FY26E EBITDA) from the Juniper acquisition; CapEx/OCF running ~34% (hardware model) and Altman Z ~2.5 flag elevated leverage. FCF of $3.5B+ covers interest at ~6× coverage, so this is a balance-sheet drag on upside, not an imminent risk. The FY27 revenue deceleration to 8–12% from 31% is the multiple governor — HPE re-rates networking premium only if the AI fabric thesis sustains beyond FY26. Rating: BUY — the transformation is proven at record margins, the AI networking thesis is early-stage with durable enterprise demand, and the 12.6× non-GAAP earnings multiple is reasonable despite the leverage.",

  revGrowth: [
    [0.25, 0.07, 0.05, 0.04, 0.03], // Bear: AI capex normalizes fast, Juniper synergies miss, server/storage declines
    [0.31, 0.10, 0.08, 0.07, 0.06], // Base: FY26 guidance delivers, FY27 framework holds
    [0.33, 0.15, 0.12, 0.10, 0.08], // Bull: AI fabric becomes dominant enterprise infrastructure layer
  ],

  fcfMargin: [
    [0.06, 0.07, 0.07, 0.08, 0.08], // Bear: synergy disappointment, hardware mix drag
    [0.08, 0.09, 0.10, 0.11, 0.12], // Base: FCF guidance delivers, margin expands per FY27 framework
    [0.10, 0.13, 0.15, 0.17, 0.18], // Bull: networking mix shift drives software-like FCF leverage
  ],

  exitMultiple: [7, 12, 16],
  ebitdaProxy: [0.10, 0.14, 0.18],
  termGrowth: [0.015, 0.025, 0.030],
  bbRate: [0.003, 0.010, 0.015],

  desc: [
    'AI capex normalizes faster than HPE\'s integration model assumed. Juniper synergies come in below the $600M target; legacy server and storage revenue declines offset networking gains. Net debt ($16.8B) becomes a FCF burden as margins stall. Multiple compresses to 7× as market re-rates HPE as cyclical IT hardware. Bear-case 5yr target ~$12–18.',
    'HPE delivers on FY26 guidance (+31% revenue, FCF ≥$3.5B) and the FY27 framework proves durable (+8–12% growth, FCF ≥$4.5B). Juniper synergies hit the $600M target by FY27. Networks for AI orders expand as enterprise AI buildout moves from pilots to production. FCF margin improves from 8% to 12% on operating leverage and networking mix. Multiple holds at 12× as the networking premium is partially earned. Base-case 5yr target ~$48–55.',
    'AI networking becomes the dominant enterprise infrastructure layer and HPE is the distribution platform for it. Sovereign AI programs, on-prem model hosting, and edge inference drive a second wave of AI fabric demand in FY28–30. Juniper\'s Mist AI becomes the de facto campus AI platform. FCF margin reaches 17–18% as networking mix exceeds 50% of revenue. Multiple expands to 16× as earnings quality justifies a Cisco-tier premium. Bull-case 5yr target ~$80–100.',
  ],

  burry: {
    sbc: 1400,
    gaapNi: 3300,
    buyback: 200,
    epsBasis: 'GAAP',
    fy: 'FY26',
    overstatementPct: 95,
    overstatementSource: 'estimated',
    note: 'FY26E SBC ~$1.4B vs GAAP NI ~$3.3B = 42% naive; 2.7× stock rise (2023–2026) → 2.5× MTM amplifier → ~105% pre-cap. Set at 95% (profitable, unlike GAAP-loss peers).',
  },

  debtSafety: {
    netDebt: 16820,
    ebitda: 5800,
    capexToOcf: 0.34,
    interestCoverage: 6.0,
    altmanZ: 2.5,
    fy: 'FY26',
    note: 'Juniper acquisition ($14B, Feb 2024) drives leverage. Net debt ~2.9× EBITDA. CapEx/OCF 34% (hardware model); interest coverage 6× PASSES; Altman Z ~2.5 soft-flag for asset-heavy model.',
  },
});

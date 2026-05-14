import { defineStock } from './defineStock';

export const UBER = defineStock({
  updatedOn: '05/14',
  ticker: 'UBER',
  name: 'Uber Technologies',
  sector: 'Mobility',
  themeColor: '#22c55e',
  currentPrice: 74.69,
  fairPriceRange: '$65 - $140',
  shares0: 2110,
  rev25: 43500,
  fcfMargin25: 0.11,
  taxRate: 0.21,
  cash: 5800,
  debt: 9500,
  beta: 1.35,
  costDebt: 0.065,
  rsRating: 22,
  aiImpact: 'TAILWIND',
  strategicNarrative:
    "Uber is a global mobility + delivery platform with $43.5B revenue, 11% FCF margins, and the theoretical optionality of becoming the platform-as-a-service layer for autonomous vehicles. " +
    "The problem: RS 16 signals aggressive institutional rotation out as AV promise meets regulatory friction and Waymo/Tesla competition threatens the core ride-hailing moat. " +
    "If Uber becomes the demand aggregator for AVs (fleet management, routing, insurance, demand matching), the platform value compounds far beyond current pricing. If AVs disintermediate Uber, the moat erodes. " +
    "Heavy distribution phase — wait for RS recovery above 40 before building a position. The AV optionality is real but the tape says institutions aren't paying for it yet. ",


  analystConsensus: { rating: 'Strong Buy', targetLow: 72, targetMedian: 107, targetHigh: 150, numAnalysts: 33 },
  revGrowth: [
    [0.06, 0.05, 0.05, 0.04, 0.04],
    [0.12, 0.11, 0.10, 0.09, 0.08],
    [0.16, 0.15, 0.14, 0.13, 0.12],
  ],
  fcfMargin: [0.0935, 0.11, 0.1265],
  exitMultiple: [12, 16, 19],
  desc: [
    'Economic headwinds leading to multiple compression and slower growth.',
    'Market alignment with standard institutional growth expectations.',
    'Category-defining growth powered by AI tailwinds and operating leverage.',
  ],

  bullMaOptVal: 78.45 * 2110 * 0.07,
});

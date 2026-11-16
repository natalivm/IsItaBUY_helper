// Landing-page lists, rebuilt once a week before Monday's open by
// weekly_feature.py (.github/workflows/weekly-feature.yml). Hand edits are
// overwritten by the next run — change the scoring in weekly_feature.py instead.

import type { PatternDirection, PatternStage, PatternTimeframe } from './patternWatchlist';

/** One of the week's featured setups, scored by weekly_feature.score_setup. */
export interface HotSetup {
  ticker: string;
  name: string;
  pattern: string;
  timeframe: PatternTimeframe;
  direction: PatternDirection;
  stage: PatternStage;
  stageDate?: string;
  /** Close the setup's percentages are measured from, and its date. */
  price: number;
  priceDate?: string;
  target: number;
  invalidation?: number;
  /** Daily Wilder RSI-14 at the time of the run. */
  rsi?: number;
  score: number;
}

/** A covered stock reporting earnings during the featured week. */
export interface EarningsEvent {
  ticker: string;
  name: string;
  /** Report date, YYYY-MM-DD. */
  date: string;
  /** Before the open / after the close / not announced. */
  time: 'bmo' | 'amc' | 'tbd';
  /** Yahoo has not confirmed the date — treat it as provisional. */
  estimated?: boolean;
}

export interface WeeklyFeature {
  /** Monday of the featured week, YYYY-MM-DD. */
  weekOf: string;
  /** Friday of the featured week, YYYY-MM-DD. */
  weekEnd: string;
  /** When this file was last rebuilt, YYYY-MM-DD. */
  generatedOn: string;
  hot: HotSetup[];
  earnings: EarningsEvent[];
}

export const WEEKLY_FEATURE: WeeklyFeature = {
  weekOf: "2026-11-16",
  weekEnd: "2026-11-20",
  generatedOn: "2026-11-16",
  hot: [
    {
      ticker: "TTD",
      name: "The Trade Desk, Inc.",
      pattern: "Falling Wedge",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-11-10",
      price: 15.68,
      priceDate: "2026-11-13",
      target: 20.3,
      invalidation: 8.88,
      rsi: 67.6,
      score: 102.3
    },
    {
      ticker: "APP",
      name: "AppLovin Corporation",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-11-06",
      price: 393.68,
      priceDate: "2026-11-12",
      target: 483.59,
      invalidation: 296.47,
      rsi: 70.7,
      score: 98.5
    },
    {
      ticker: "TTWO",
      name: "Take-Two Interactive Software, Inc.",
      pattern: "Descending Channel",
      timeframe: "weekly",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-05-11",
      price: 227.82,
      priceDate: "2026-11-13",
      target: 270.92,
      invalidation: 150.85,
      rsi: 63.9,
      score: 97
    },
    {
      ticker: "ZS",
      name: "Zscaler",
      pattern: "Rising Wedge",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-11-13",
      price: 192.47,
      priceDate: "2026-11-13",
      target: 137.27,
      invalidation: 274.83,
      rsi: 35.8,
      score: 104.2
    },
    {
      ticker: "RTX",
      name: "RTX Corporation",
      pattern: "Ascending Channel",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-09-21",
      price: 198.58,
      priceDate: "2026-11-13",
      target: 145.92,
      invalidation: 203.04,
      rsi: 53.6,
      score: 94
    },
    {
      ticker: "PINS",
      name: "Pinterest",
      pattern: "Rising Wedge",
      timeframe: "daily",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-09-04",
      price: 19.15,
      priceDate: "2026-11-13",
      target: 15.68,
      invalidation: 23.89,
      rsi: 40.9,
      score: 85.7
    }
  ],
  earnings: [
    {
      ticker: "SMWB",
      name: "Similarweb Ltd.",
      date: "2026-11-17",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "NVDA",
      name: "NVIDIA Corporation",
      date: "2026-11-17",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "PANW",
      name: "Palo Alto Networks",
      date: "2026-11-18",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "WWD",
      name: "Woodward, Inc.",
      date: "2026-11-18",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "ROAD",
      name: "Construction Partners, Inc.",
      date: "2026-11-19",
      estimated: true,
      time: "bmo"
    },
    {
      ticker: "ALOY",
      name: "REalloys Inc.",
      date: "2026-11-19",
      estimated: true,
      time: "tbd"
    },
    {
      ticker: "VEEV",
      name: "Veeva Systems Inc.",
      date: "2026-11-19",
      estimated: true,
      time: "tbd"
    },
    {
      ticker: "INTU",
      name: "Intuit Inc.",
      date: "2026-11-19",
      estimated: true,
      time: "amc"
    }
  ]
};

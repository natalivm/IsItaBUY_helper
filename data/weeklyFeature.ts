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
  weekOf: "2026-11-02",
  weekEnd: "2026-11-06",
  generatedOn: "2026-11-02",
  hot: [
    {
      ticker: "GD",
      name: "General Dynamics Corporation",
      pattern: "Descending Channel",
      timeframe: "weekly",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-06-08",
      price: 372.59,
      priceDate: "2026-10-30",
      target: 486.18,
      invalidation: 290.63,
      rsi: 72.6,
      score: 94.8
    },
    {
      ticker: "DELL",
      name: "Dell Technologies",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-09-03",
      price: 424.3,
      priceDate: "2026-10-30",
      target: 694.22,
      invalidation: 342.09,
      rsi: 43.9,
      score: 94
    },
    {
      ticker: "SPGI",
      name: "S&P Global",
      pattern: "Falling Wedge",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-21",
      price: 466.55,
      priceDate: "2026-10-30",
      target: 534.91,
      invalidation: 382.64,
      rsi: 75.5,
      score: 92.1
    },
    {
      ticker: "MRVL",
      name: "Marvell Technology, Inc.",
      pattern: "Evening Star",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-10-26",
      price: 218.34,
      priceDate: "2026-10-29",
      target: 151.77,
      invalidation: 301.27,
      rsi: 40,
      score: 97.4
    },
    {
      ticker: "LITE",
      name: "Lumentum Holdings Inc.",
      pattern: "Ascending Channel",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-10-19",
      price: 840.7,
      priceDate: "2026-10-30",
      target: 480.62,
      invalidation: 874.58,
      rsi: 51.8,
      score: 97.1
    },
    {
      ticker: "FCX",
      name: "Freeport-McMoRan Inc.",
      pattern: "Ascending Channel",
      timeframe: "daily",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-10-22",
      price: 62.47,
      priceDate: "2026-10-30",
      target: 51.24,
      invalidation: 70.3,
      rsi: 39,
      score: 96.6
    }
  ],
  earnings: [
    {
      ticker: "PLTR",
      name: "Palantir Technologies",
      date: "2026-11-02",
      estimated: false,
      time: "tbd"
    },
    {
      ticker: "AMD",
      name: "Advanced Micro Devices",
      date: "2026-11-03",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "APP",
      name: "AppLovin Corporation",
      date: "2026-11-04",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "ARM",
      name: "Arm Holdings plc",
      date: "2026-11-04",
      estimated: true,
      time: "amc"
    },
    {
      ticker: "IREN",
      name: "IREN Limited",
      date: "2026-11-05",
      estimated: true,
      time: "amc"
    }
  ]
};

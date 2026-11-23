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
  weekOf: "2026-11-23",
  weekEnd: "2026-11-27",
  generatedOn: "2026-11-23",
  hot: [
    {
      ticker: "RIOT",
      name: "Riot Platforms, Inc.",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-11-09",
      price: 16.23,
      priceDate: "2026-11-20",
      target: 22.08,
      invalidation: 12.64,
      rsi: 48.3,
      score: 85.7
    },
    {
      ticker: "WWD",
      name: "Woodward, Inc.",
      pattern: "Falling Wedge",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-11-03",
      price: 326.56,
      priceDate: "2026-11-20",
      target: 408.34,
      invalidation: 297.67,
      rsi: 51.5,
      score: 84.7
    },
    {
      ticker: "FCX",
      name: "Freeport-McMoRan Inc.",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-02",
      price: 45.99,
      priceDate: "2026-11-20",
      target: 102.75,
      invalidation: 36.74,
      score: 84
    },
    {
      ticker: "TEAM",
      name: "Atlassian Corporation",
      pattern: "Ascending Channel",
      timeframe: "daily",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-11-17",
      price: 134.65,
      priceDate: "2026-11-20",
      target: 53.19,
      invalidation: 154.75,
      rsi: 24,
      score: 106.2
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corp",
      pattern: "Rising Wedge",
      timeframe: "daily",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-11-17",
      price: 484.52,
      priceDate: "2026-11-20",
      target: 357.55,
      invalidation: 568.38,
      rsi: 34.8,
      score: 94.5
    },
    {
      ticker: "CVX",
      name: "Chevron Corporation",
      pattern: "Ascending Channel",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-09-21",
      price: 208.37,
      priceDate: "2026-11-20",
      target: 100.5,
      invalidation: 251.44,
      rsi: 40.1,
      score: 93.4
    }
  ],
  earnings: []
};

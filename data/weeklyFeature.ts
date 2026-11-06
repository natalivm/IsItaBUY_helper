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
  weekOf: "2026-11-09",
  weekEnd: "2026-11-13",
  generatedOn: "2026-11-06",
  hot: [
    {
      ticker: "KKR",
      name: "KKR & Co. Inc.",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-29",
      price: 98.3,
      priceDate: "2026-11-05",
      target: 144.54,
      invalidation: 90.46,
      rsi: 64.9,
      score: 107.4
    },
    {
      ticker: "GE",
      name: "GE Aerospace",
      pattern: "Falling Wedge",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-16",
      price: 314.73,
      priceDate: "2026-11-05",
      target: 351.07,
      invalidation: 286.38,
      rsi: 62.1,
      score: 96
    },
    {
      ticker: "JPM",
      name: "JPMorgan Chase & Co.",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-16",
      price: 337.34,
      priceDate: "2026-11-05",
      target: 450.81,
      invalidation: 325.96,
      rsi: 63.2,
      score: 95.5
    },
    {
      ticker: "XOP",
      name: "SPDR S&P Oil & Gas E&P ETF",
      pattern: "Ascending Channel",
      timeframe: "daily",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-09-21",
      price: 174.1,
      priceDate: "2026-11-05",
      target: 112.63,
      invalidation: 231.55,
      rsi: 34.9,
      score: 95.9
    },
    {
      ticker: "NU",
      name: "Nu Holdings",
      pattern: "Rising Wedge",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-05-11",
      price: 11.74,
      priceDate: "2026-11-05",
      target: 7.05,
      invalidation: 19.78,
      rsi: 35.7,
      score: 94.6
    },
    {
      ticker: "RVLV",
      name: "Revolve Group, Inc.",
      pattern: "Rising Wedge",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-08-31",
      price: 19.04,
      priceDate: "2026-11-05",
      target: 14.28,
      invalidation: 27.65,
      rsi: 35.8,
      score: 90.8
    }
  ],
  earnings: [
    {
      ticker: "B",
      name: "Barrick Mining Corporation",
      date: "2026-11-09",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "CEG",
      name: "Constellation Energy",
      date: "2026-11-09",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "KKR",
      name: "KKR & Co. Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "NRG",
      name: "NRG Energy, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "ACHR",
      name: "Archer Aviation Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "ASTS",
      name: "AST SpaceMobile",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "HIMS",
      name: "Hims & Hers Health, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "MARA",
      name: "MARA Holdings, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "OXY",
      name: "Occidental Petroleum Corporation",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "PLUG",
      name: "Plug Power Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "RKLB",
      name: "Rocket Lab USA, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "TTD",
      name: "The Trade Desk, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "TTWO",
      name: "Take-Two Interactive Software, Inc.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "ZETA",
      name: "Zeta Global Holdings Corp.",
      date: "2026-11-09",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "LQDA",
      name: "Liquidia Corporation",
      date: "2026-11-10",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "SE",
      name: "Sea Limited",
      date: "2026-11-10",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "WIX",
      name: "Wix.com Ltd.",
      date: "2026-11-10",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "CRWV",
      name: "CoreWeave, Inc.",
      date: "2026-11-10",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "RGTI",
      name: "Rigetti Computing, Inc.",
      date: "2026-11-10",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "NBIS",
      name: "Nebius Group N.V.",
      date: "2026-11-12",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "ONDS",
      name: "Ondas Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "TE",
      name: "T1 Energy Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "AMAT",
      name: "Applied Materials, Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "ARWR",
      name: "Arrowhead Pharmaceuticals, Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "CBRS",
      name: "Cerebras Systems Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "CSCO",
      name: "Cisco Systems, Inc.",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "DLO",
      name: "DLocal Limited",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "NU",
      name: "Nu Holdings",
      date: "2026-11-12",
      estimated: false,
      time: "amc"
    }
  ]
};

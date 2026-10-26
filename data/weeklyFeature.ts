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
  weekOf: "2026-10-26",
  weekEnd: "2026-10-30",
  generatedOn: "2026-10-26",
  hot: [
    {
      ticker: "SPGI",
      name: "S&P Global",
      pattern: "Falling Wedge",
      timeframe: "daily",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-21",
      price: 450.31,
      priceDate: "2026-10-23",
      target: 534.91,
      invalidation: 382.64,
      rsi: 71.9,
      score: 105.9
    },
    {
      ticker: "INTU",
      name: "Intuit Inc.",
      pattern: "Descending Channel",
      timeframe: "weekly",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-19",
      price: 343.39,
      priceDate: "2026-10-23",
      target: 528.19,
      invalidation: 282.06,
      rsi: 64.1,
      score: 104.9
    },
    {
      ticker: "AZO",
      name: "AutoZone",
      pattern: "Descending Channel",
      timeframe: "weekly",
      direction: "up",
      stage: "confirmed",
      stageDate: "2026-10-19",
      price: 3200.76,
      priceDate: "2026-10-23",
      target: 4211.42,
      invalidation: 2894.72,
      rsi: 65.6,
      score: 104.8
    },
    {
      ticker: "ANET",
      name: "Arista Networks",
      pattern: "Ascending Channel",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-10-19",
      price: 172.37,
      priceDate: "2026-10-23",
      target: 126.57,
      invalidation: 186.08,
      rsi: 34.1,
      score: 105.3
    },
    {
      ticker: "NBIS",
      name: "Nebius Group N.V.",
      pattern: "Descending Channel",
      timeframe: "daily",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-10-22",
      price: 158.74,
      priceDate: "2026-10-23",
      target: 98.69,
      invalidation: 170.28,
      rsi: 30.9,
      score: 105.1
    },
    {
      ticker: "APH",
      name: "Amphenol Corp",
      pattern: "Rising Wedge",
      timeframe: "weekly",
      direction: "down",
      stage: "confirmed",
      stageDate: "2026-10-19",
      price: 74.09,
      priceDate: "2026-10-23",
      target: 50.95,
      invalidation: 90.03,
      rsi: 32.7,
      score: 104.5
    }
  ],
  earnings: [
    {
      ticker: "VZ",
      name: "Verizon Communications",
      date: "2026-10-26",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "AMKR",
      name: "Amkor Technology, Inc.",
      date: "2026-10-26",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "CLS",
      name: "Celestica Inc.",
      date: "2026-10-26",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "NUE",
      name: "Nucor Corporation",
      date: "2026-10-26",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "FCX",
      name: "Freeport-McMoRan Inc.",
      date: "2026-10-27",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "GLW",
      name: "Corning Inc",
      date: "2026-10-27",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "KO",
      name: "The Coca-Cola Company",
      date: "2026-10-27",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "SOFI",
      name: "SoFi Technologies",
      date: "2026-10-27",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "SPGI",
      name: "S&P Global",
      date: "2026-10-27",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "CAKE",
      name: "Cheesecake Factory (The)",
      date: "2026-10-27",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "ENPH",
      name: "Enphase Energy, Inc.",
      date: "2026-10-27",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "HOOD",
      name: "Robinhood Markets, Inc.",
      date: "2026-10-27",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "STX",
      name: "Seagate Technology Holdings",
      date: "2026-10-27",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "V",
      name: "VISA Inc.",
      date: "2026-10-27",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "APH",
      name: "Amphenol Corp",
      date: "2026-10-28",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "GEV",
      name: "GE Vernova Inc.",
      date: "2026-10-28",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "VRT",
      name: "Vertiv Holdings Co",
      date: "2026-10-28",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "STRL",
      name: "Sterling Infrastructure, Inc.",
      date: "2026-10-28",
      estimated: false,
      time: "tbd"
    },
    {
      ticker: "FTNT",
      name: "Fortinet",
      date: "2026-10-28",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "GOOGL",
      name: "Alphabet Inc.",
      date: "2026-10-28",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "KLAC",
      name: "KLA Corporation",
      date: "2026-10-28",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "MSFT",
      name: "Microsoft Corp",
      date: "2026-10-28",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "NOW",
      name: "ServiceNow",
      date: "2026-10-28",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "CAT",
      name: "Caterpillar Inc.",
      date: "2026-10-29",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "LHX",
      name: "L3Harris Technologies, Inc.",
      date: "2026-10-29",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "LLY",
      name: "Eli Lilly and Company",
      date: "2026-10-29",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "AMZN",
      name: "Amazon.com",
      date: "2026-10-29",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "COIN",
      name: "Coinbase Global, Inc.",
      date: "2026-10-29",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "INTC",
      name: "Intel Corporation",
      date: "2026-10-29",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "RDDT",
      name: "Reddit, Inc.",
      date: "2026-10-29",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "SNDK",
      name: "SanDisk Corporation",
      date: "2026-10-29",
      estimated: false,
      time: "amc"
    },
    {
      ticker: "CCJ",
      name: "Cameco Corporation",
      date: "2026-10-30",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "CVX",
      name: "Chevron Corporation",
      date: "2026-10-30",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "D",
      name: "Dominion Energy, Inc.",
      date: "2026-10-30",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "GD",
      name: "General Dynamics Corporation",
      date: "2026-10-30",
      estimated: false,
      time: "bmo"
    },
    {
      ticker: "XOM",
      name: "Exxon Mobil Corporation",
      date: "2026-10-30",
      estimated: false,
      time: "bmo"
    }
  ]
};

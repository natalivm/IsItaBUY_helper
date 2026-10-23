// News feed (Notes / News panel → News tab), newest first.
// Pattern Break Watchlist status changes are posted here automatically by
// update_prices.py / pattern_watchlist.py: new setups, breaks confirmed,
// targets reached, setups that need updating. Hand-written posts can be added
// too; keep each `id` unique (the bot uses it to avoid double-posting).

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  tickers?: string[];
  image?: string;
  text?: string;
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "2026-10-23-INTU-main-confirmed",
    date: "Oct 23 2026",
    tickers: ["INTU"],
    title: "INTU · new setup",
    text: "Falling Wedge (weekly), break confirmed.",
  },
  {
    id: "2026-10-22-ALAB-main-target",
    date: "Oct 22 2026",
    tickers: ["ALAB"],
    title: "ALAB · target reached",
    text: "Hit target $258.24.",
  },
  {
    id: "2026-10-22-FLEX-daily-alt-target",
    date: "Oct 22 2026",
    tickers: ["FLEX"],
    title: "FLEX · target reached (daily setup)",
    text: "Hit target $83.65.",
  },
  {
    id: "2026-10-22-KMB-main-target",
    date: "Oct 22 2026",
    tickers: ["KMB"],
    title: "KMB · target reached",
    text: "Hit target $110.01.",
  },
  {
    id: "2026-10-22-LMT-main-target",
    date: "Oct 22 2026",
    tickers: ["LMT"],
    title: "LMT · target reached",
    text: "Hit target $561.66.",
  },
  {
    id: "2026-10-22-MLM-daily-alt-target",
    date: "Oct 22 2026",
    tickers: ["MLM"],
    title: "MLM · target reached (daily setup)",
    text: "Hit target $517.37.",
  },
  {
    id: "2026-10-22-MNDY-main-target",
    date: "Oct 22 2026",
    tickers: ["MNDY"],
    title: "MNDY · target reached",
    text: "Hit target $106.03.",
  },
  {
    id: "2026-10-22-NOW-main-target",
    date: "Oct 22 2026",
    tickers: ["NOW"],
    title: "NOW · target reached",
    text: "Hit target $156.29.",
  },
  {
    id: "2026-10-22-COHR-main-update",
    date: "Oct 22 2026",
    tickers: ["COHR"],
    title: "COHR · needs updating",
    text: "Closed $207.82 back below invalidation $230.78.",
  },
  {
    id: "2026-10-22-INTU-daily-alt-update",
    date: "Oct 22 2026",
    tickers: ["INTU"],
    title: "INTU · needs updating (daily setup)",
    text: "Closed $354.9 above confirm $341.79.",
  },
  {
    id: "2026-10-22-MSFT-main-update",
    date: "Oct 22 2026",
    tickers: ["MSFT"],
    title: "MSFT · needs updating",
    text: "Closed $521.08 below confirm $524.43.",
  },
  {
    id: "2026-10-22-VRT-main-update",
    date: "Oct 22 2026",
    tickers: ["VRT"],
    title: "VRT · needs updating",
    text: "Closed $195.59 back below invalidation $202.42.",
  },
  {
    id: "2026-10-21-CAVA-daily-alt-update",
    date: "Oct 21 2026",
    tickers: ["CAVA"],
    title: "CAVA · needs updating (daily setup)",
    text: "Closed $55 back below signal $57.3, signal cancelled.",
  },
  {
    id: "2026-10-21-DASH-main-update",
    date: "Oct 21 2026",
    tickers: ["DASH"],
    title: "DASH · needs updating",
    text: "Closed $184.45 back below signal $189.73, signal cancelled.",
  },
  {
    id: "2026-10-21-DAVE-daily-alt-update",
    date: "Oct 21 2026",
    tickers: ["DAVE"],
    title: "DAVE · needs updating (daily setup)",
    text: "Closed $376.76 back above signal $370.4, signal cancelled.",
  },
  {
    id: "2026-10-21-HTFL-daily-alt-update",
    date: "Oct 21 2026",
    tickers: ["HTFL"],
    title: "HTFL · needs updating (daily setup)",
    text: "Closed $55.82 above signal $51.13.",
  },
  {
    id: "2026-10-21-ITT-daily-alt-update",
    date: "Oct 21 2026",
    tickers: ["ITT"],
    title: "ITT · needs updating (daily setup)",
    text: "Closed $200.34 back above signal $198.65, signal cancelled.",
  },
  {
    id: "2026-10-21-ROAD-daily-alt-update",
    date: "Oct 21 2026",
    tickers: ["ROAD"],
    title: "ROAD · needs updating (daily setup)",
    text: "Closed $84.94 above confirm $84.68.",
  },
  {
    id: "2026-10-21-SEZL-daily-alt-update",
    date: "Oct 21 2026",
    tickers: ["SEZL"],
    title: "SEZL · needs updating (daily setup)",
    text: "Closed $136.22 above confirm $135.",
  },
  {
    id: "2026-10-21-SPCX-main-update",
    date: "Oct 21 2026",
    tickers: ["SPCX"],
    title: "SPCX · needs updating",
    text: "Closed $159.31 above confirm $149.04.",
  },
  {
    id: "2026-10-21-SPY-main-update",
    date: "Oct 21 2026",
    tickers: ["SPY"],
    title: "SPY · needs updating",
    text: "Closed $773.09 back above signal $767.98, signal cancelled.",
  },
  {
    id: "2026-10-21-VEEV-main-update",
    date: "Oct 21 2026",
    tickers: ["VEEV"],
    title: "VEEV · needs updating",
    text: "Closed $320.55 above break-up $319.05.",
  },
  {
    id: "2026-10-21-auto-rescan",
    date: "Oct 21 2026",
    tickers: [],
    title: "Auto-detected setups refreshed",
    text: "Up to 5 setups per timeframe are now stored per stock; each row shows the best weekly and daily one. Stocks you posted keep their setups. Auto-detected setups carry a red dot until checked.",
  },
  {
    id: "2026-10-21-auto-scan-133",
    date: "Oct 21 2026",
    tickers: [],
    title: "Auto-detected setups updated for 133 stocks",
    text: "Every valid pattern per stock is now listed (weekly and daily); 1056 setups added. Auto-detected ones carry a red dot until checked by hand.",
  },
  {
    id: "2026-10-21-auto-scan",
    date: "Oct 21 2026",
    tickers: [],
    title: "Auto-detected setups for 67 stocks",
    text: "67 with a channel, wedge or reversal candle, 0 with no clear pattern yet. Marked with a red dot until checked by hand.",
  },
  {
    id: "2026-10-21-CBRS-main-removed",
    date: "Oct 21 2026",
    tickers: ["CBRS"],
    title: "CBRS · setup closed",
    text: "Target reached Oct 20.",
  },
  {
    id: "2026-10-21-CRWD-main-removed",
    date: "Oct 21 2026",
    tickers: ["CRWD"],
    title: "CRWD · setup closed",
    text: "Target reached Jul 1.",
  },
  {
    id: "2026-10-20-LIFE-main-removed",
    date: "Oct 20 2026",
    tickers: ["LIFE"],
    title: "LIFE · target reached",
    text: "Hit target $41.17.",
  },
  {
    id: "2026-10-21-AGCO-main-confirmed",
    date: "Oct 21 2026",
    tickers: ["AGCO"],
    title: "AGCO · new setup",
    text: "Ascending Channel (daily), break confirmed.",
  },
  {
    id: "2026-10-20-NFLX-main-update",
    date: "Oct 20 2026",
    tickers: ["NFLX"],
    title: "NFLX · needs updating",
    text: "Closed $68.69 back below signal $70.22, signal cancelled.",
  },
  {
    id: "2026-10-19-HTFL-main-update",
    date: "Oct 19 2026",
    tickers: ["HTFL"],
    title: "HTFL · needs updating",
    text: "Closed $51.02 back above signal $50.93, signal cancelled.",
  },
];

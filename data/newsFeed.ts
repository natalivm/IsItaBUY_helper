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

export const NEWS_ITEMS: NewsItem[] = [];

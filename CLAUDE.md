# Claude Code Instructions — IsItaBUY

See `.github/copilot-instructions.md` for full project conventions, stock definition format, and architecture.

## Updating Stock Prices

Stock prices are hard-coded as `currentPrice` in each `stocks/TICKER.ts` file (line 8). There is no live price fetching — prices are updated manually by request.

### Procedure

1. **Get the ticker list** — grep all `currentPrice` values from `stocks/`:
   ```bash
   grep -r 'currentPrice:' stocks/ | sort
   ```

2. **Fetch live prices via web search** — search in batches of 5-6 tickers at a time:
   ```
   WebSearch: "NVDA NFLX AMAT AVGO MRVL ASML stock price today [month] [year]"
   ```
   Sources that reliably return prices in search snippets: **investing.com, CNBC, Morningstar, TradingView, stockanalysis.com, finviz.com**.

   Run 4-5 parallel WebSearch calls to cover all stocks in ~8-10 searches.

   **Important**: Direct API calls (Yahoo Finance, yfinance Python) and WebFetch to major finance sites are blocked from this environment (403 proxy). WebSearch is the only reliable method.

3. **Update prices** — use `sed` for bulk updates (faster than Edit for many files):
   ```bash
   cd stocks
   sed -i 's/currentPrice: OLD,/currentPrice: NEW,/' TICKER.ts
   ```

4. **Verify** — confirm all updates applied:
   ```bash
   grep -r 'currentPrice:' stocks/ | sort
   ```

5. **Review tiering impact** — after updating prices, check if any stocks changed their rating (STRONG BUY / BUY / HOLD / OVERVALUED) or home page group (PRIME GROWTH / TURBO GROWTH / WATCH LIST / GRAVEYARD). Run the build to verify:
   ```bash
   npm run build
   ```
   Rating thresholds (base-case upside): >30% STRONG BUY, >15% BUY, <96% OVERVALUED (only if no quality boost, otherwise HOLD), else HOLD. See `.github/copilot-instructions.md` "Rating Logic" for full rules.
   Group assignment depends on rating + market cap + RS rating + RS trend (see `classifyStock()` in `App.tsx`).

   If a stock's rating or group changed, evaluate whether `rsRating`, `rsTrend`, or `ratingOverride` also need updating to reflect current market conditions.

### Price Rounding Convention

Match the existing style — for stocks >$100 round to nearest integer (e.g., `375`). For stocks <$20 keep one or two decimal places (e.g., `18.84`).

### Data Freshness

Web search prices reflect the most recent trading session close or intraday snapshot. Some results may show stale data — cross-reference multiple sources for tickers with ambiguous results. Always prefer the most recent date.

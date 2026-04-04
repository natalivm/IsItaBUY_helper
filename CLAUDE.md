# Claude Code Instructions — IsItaBUY

See `.github/copilot-instructions.md` for full project conventions, stock definition format, and architecture.

## Updating Stock Prices

Stock prices are hard-coded as `currentPrice` in each `stocks/TICKER.ts` file (line 8). Prices are updated automatically via GitHub Actions and can also be updated manually.

### Automatic Updates (GitHub Actions)

A workflow (`.github/workflows/update-prices.yml`) runs **every weekday at 9:30 PM UTC** (after US market close). It fetches prices from Yahoo Finance, commits changes to `main`, and triggers a site redeploy. You can also trigger it manually from the **Actions** tab on GitHub.

### Manual Update via Script (on your local machine)

The `update_prices.py` script fetches prices from Yahoo Finance. No dependencies needed — just Python 3.

```bash
cd IsItaBUY_gemini
python3 update_prices.py          # dry run — shows what would change
python3 update_prices.py --apply  # writes changes to stock files
```

After applying, commit and push:

```bash
git add stocks/
git commit -m "Update stock prices"
git push
```

### Manual Update via Claude Code (uses credits)

If the script is unavailable, prices can be updated via web search:

1. **Get the ticker list**:
   ```bash
   grep -r 'currentPrice:' stocks/ | sort
   ```

2. **Fetch live prices via web search** — search in batches of 5-6 tickers at a time:
   ```
   WebSearch: "NVDA NFLX AMAT AVGO MRVL ASML stock price today [month] [year]"
   ```
   Sources that reliably return prices in search snippets: **investing.com, CNBC, Morningstar, TradingView, stockanalysis.com, finviz.com**.

   **Note**: Direct API calls (Yahoo Finance, yfinance Python) and WebFetch to major finance sites are blocked from this environment (403 proxy). WebSearch is the only reliable method from Claude Code.

3. **Update prices** — use `sed` for bulk updates:
   ```bash
   cd stocks
   sed -i 's/currentPrice: OLD,/currentPrice: NEW,/' TICKER.ts
   ```

4. **Verify**:
   ```bash
   grep -r 'currentPrice:' stocks/ | sort
   ```

### After Any Price Update

Review tiering impact — check if any stocks changed their rating (STRONG BUY / BUY / HOLD / OVERVALUED) or home page group (PRIME GROWTH / TURBO GROWTH / WATCH LIST / AVOID). Run the build to verify:
```bash
npm run build
```
Rating thresholds (base-case upside): >30% STRONG BUY, >15% BUY, <96% OVERVALUED (only if no quality boost, otherwise HOLD), else HOLD. See `.github/copilot-instructions.md` "Rating Logic" for full rules.
Group assignment depends on rating + market cap + RS rating + RS trend (see `classifyStock()` in `App.tsx`).

If a stock's rating or group changed, evaluate whether `rsRating`, `rsTrend`, or `ratingOverride` also need updating to reflect current market conditions.

### Price Format

Keep exact prices from Yahoo Finance (e.g., `348.47`). Trailing zeros are stripped (`348.00` → `348`, `348.40` → `348.4`).

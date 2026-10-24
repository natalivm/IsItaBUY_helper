# Claude Code Instructions — IsItaBUY

See `.github/copilot-instructions.md` for full project conventions, stock definition format, and architecture.

## Updating Stock Prices

Stock prices are hard-coded as `currentPrice` in each `stocks/TICKER.ts` file (line 8). Prices are updated automatically via GitHub Actions and can also be updated manually.

### Automatic Updates (GitHub Actions)

A workflow (`.github/workflows/update-prices.yml`) runs **every weekday at 9:47 PM UTC** (after US market close). It fetches prices from Yahoo Finance, commits changes to `main`, and triggers a site redeploy. You can also trigger it manually from the **Actions** tab on GitHub.

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
Rating thresholds (expected 5-year CAGR — both DCF and EPS_PE feed a 5y-forward target, annualized to a CAGR): >16% STRONG BUY, >10% BUY, <3% OVERVALUED (only if no quality boost, otherwise HOLD), else HOLD. Quality boost is disabled for RS < 30. See `.github/copilot-instructions.md` "Rating Logic" for full rules.
Group assignment depends on rating + market cap + RS rating + RS trend (see `classifyStock()` in `App.tsx`).

If a stock's rating or group changed, evaluate whether `rsRating`, `rsTrend`, or `ratingOverride` also need updating to reflect current market conditions.

### Pattern Break Watchlist prices (`#watchlist`)

The watchlist ledger (`#watchlist`, the app's main list) reads `data/patternWatchlist.ts`. The same `update_prices.py` run (logic in `pattern_watchlist.py`) also:

- refreshes every entry's `price` / `priceDate` (the expanded panel's **Now** row and all `%` figures read these), including watchlist-only symbols like SPY/TSLA that have no `stocks/` file;
- checks targets: a `confirmed` setup (or its `alt`) whose target was **touched** by any daily bar since the last check (low ≤ target for downward, high ≥ target for upward) is flipped to `stage: "target"` with `stageDate` = that day. A bar that stops just short still counts: the touch carries a tolerance of **0.5% of the target** (`TARGET_TOL` in `pattern_watchlist.py`), so a move that ends thirteen cents above a $53.37 target is a target reached, not a miss. The margin is a fraction of the target rather than a fixed number of cents because the watchlist runs from sub-dollar names to four-figure ones. The bot only sees daily candles, so it catches intraday touches after the close; marking a hit manually earlier is fine, since the bot never reverts `"target"`;
- flags **pending** setups (forming / signal / either-direction) that **closed** past a limit as `stage: "update"` ("Needs updating": post a new setup), recording `prevStage` and `updateNote`. Limits: forming = invalidation ↔ signal (or confirm if no signal level); signal = signal (close back past it cancels the signal) ↔ confirm; either-direction = breakDown ↔ breakUp. Only a close on the setup's own timeframe counts: daily every run, weekly on Fridays, monthly on the month's last weekday. In between, it's listed for review only;
- only *reports* (never edits) confirmed setups that **closed** beyond invalidation. Failure needs a follow-through close, so mark those manually.

- uses **regular-session prices only** (9:30–16:00 ET), never pre/post-market. Close-based checks (needs updating, invalidation) are skipped while that day's session is still open, so a run before 16:00 ET never re-labels a setup on an intraday price; target touches count from regular-session highs/lows. The Action runs at 21:47 UTC, after the close year-round.

- **removes finished setups**: target reached (touched any time since confirmation) or failed (a completed close past invalidation plus a follow-through close), each with one News post saying why. A setup **you posted** (not auto-detected) is kept as a `history` row instead of vanishing, so a call that played out still shows under **Finished** on its stock — a target you called and hit is worth keeping. The stock's `keyLevel` and any existing history survive a setup being replaced too. "Needs updating" setups stay until a replacement is posted. By hand: `python3 pattern_watchlist.py --prune` (dry run) / `--prune --apply`.

**Every status change goes to the News feed** (`data/newsFeed.ts`, newest first). The script diffs the watchlist against `data/watchlistStatus.json`, so hand edits (a new setup, a re-posted setup, a setup marked failed or removed) are posted too, not just the bot's own changes. **After editing any setup's `stage` by hand, run `python3 pattern_watchlist.py --apply`** (no network; re-checks stored prices and posts the changes), and commit `data/`. The daily price run does the same automatically. A new News post also triggers the in-app "What's New" toast.

`note` prose is hand-written and isn't rewritten when the price moves. Re-read it when a setup changes stage.

**Charts in the expanded rows** (`components/SetupChart.tsx`, TradingView `lightweight-charts`, loaded on first expand) read candles from `public/bars/TICKER_timeframe.json`. The price run rewrites these for every watchlist setup's timeframe (daily 1y, weekly 5y, monthly 10y, regular session only); refresh them by hand with `python3 pattern_watchlist.py --bars`. A setup's levels are drawn as labelled lines and its `stageDate` as a marker. Trendlines come from the setup's (or its `alt`'s) `lines: [{ from: ['YYYY-MM-DD', price], to: ['YYYY-MM-DD', price] }, …]`; the chart extends them to the newest candle.

**Auto-detected setups** (`pattern_detect.py`): stocks without a setup are scanned on the daily and weekly charts (weekly = main, steadier; daily = second setup) for the clearest channel / wedge / hammer per PATTERN_RULES.md, or get a pending "No clear pattern" placeholder. They carry `auto: true` and show a **red dot** until checked by hand — remove `auto: true` once verified.
The dot belongs to the **setup, not the stock**: it marks one machine-drawn reading, and a stock can carry a hand-posted setup and an auto-detected one at the same time without either inheriting the other's status. A setup you post has no dot, and a price refresh never adds one — `update_prices.py` touches `price`, `priceDate`, `rsi` and `trend` and never writes `auto`. In the UI the dot therefore sits beside the pattern name, not beside the ticker. A finished setup leaves a placeholder that gets rescanned. `python3 pattern_detect.py` (dry run), `--apply`, `--compare` (agreement with the posted setups), `--add TICKER` (scan a watchlist-only symbol).

### Working on the scripts: two traps

- **`auto` is a stock-level flag.** Only the `auto: true` directly on the entry decides posted-vs-auto; the stored setups inside `more: [...]` carry their own. A text search for `auto: true` matches both, so a stock that looks auto-detected may be one you posted by hand — ask the parser (`{k: v[2] for k, v in e['fields'].items()}`), not grep.
- **The parser keeps array fields as spans, not values.** For `lines` (and `history`) `_setups()` gives you the position in the source text, and `s.get('lines')` is always `None`. To read trendlines use `pattern_lines.stored_lines(text, pos)`; to write them, splice the span. Anything guarded by `if s.get('lines')` never runs — which is currently true of the channel branch of `_finished()`, so channels fail by the generic close-past-invalidation-plus-follow-through rule rather than on one close back inside the broken line.

**Pattern rules** (how each pattern — channels, wedges, head & shoulders, hammers — is drawn and how signal / confirm / target / invalidation are set, with verified examples) are in `PATTERN_RULES.md`. Follow them when posting a setup by hand.

**Trendlines are fitted automatically** by `pattern_lines.py` (run by the daily price job for setups without lines; by hand: `python3 pattern_lines.py` dry run, `--apply` to write, `--refit` to replace existing). It reproduces the source tool's construction: lines run through swing highs (upper) / swing lows (lower), at least 1 candle each side; channels are parallel (two-pivot line + parallel through one pivot, or one pivot aimed at the stored level); wedges use two pivots per line; head & shoulders necklines run through the closes of the two troughs. A fit is only accepted when the lines reproduce the setup's own levels: signal = broken line at the signal candle (the candle whose high/low equals `confirm`), target = signal ± the pattern height where the lines start, invalidation ≈ a line's value at the latest candle; forming setups match their break levels at the latest candle. Setups it can't match (and Hammer / Head & Shoulders) are listed and left without lines. After posting a new channel/wedge setup, run `python3 pattern_lines.py --apply`.

**Sloped invalidations track their line.** An invalidation is a trendline's value at the latest candle, so it moves a little every session while the stored number stays where it was written (this is why a level can read fine in the source tool and stale here). The daily job re-reads them after the candles and the fitter; by hand: `python3 pattern_lines.py --relevel` (dry run) / `--relevel --apply`. A **confirmed channel's** invalidation sits on the boundary it broke (upper line for an upward break, lower for a downward one) — its fail rule reads "back inside the broken boundary". While a channel is still **pending** there is nothing to fall back into, so the level that kills it is the *opposite* side of the channel, with the follow-through wording. A **wedge's** sits on the far side either way (lower line for an upward break, upper for a downward one). Auto-detected setups are skipped: `pattern_detect.py` derives their levels together and puts a pending channel's invalidation on the broken boundary instead, so re-reading them here would only fight the detector — a rescan redoes them. A level is left alone, and listed for review, when the setup isn't live (needs updating / target / failed), its two lines are within 3% of each other (near a wedge's apex, which line a level belongs to is a coin flip), the level is more than 8% off its line (it was set some other way), or the move would be under 1% (close enough — and a number entered by hand from the source tool isn't worth fighting over every run).

### Price Format

Keep exact prices from Yahoo Finance (e.g., `348.47`). Trailing zeros are stripped (`348.00` → `348`, `348.40` → `348.4`).

## Landing Page (weekly lists)

`#` (no hash) is the **landing page** (`components/Landing.tsx`). The stock ledger
moved to `#watchlist`; `#watchlist/TICKER` opens it with the search box pre-filled,
which is what the landing page's "See TICKER in the watchlist" buttons link to.
`#TICKER` is still a stock's detail page, and "Back" there returns to whichever
list you came from.

The landing page renders two lists, both read straight from `data/weeklyFeature.ts`
— it computes nothing itself:

- **Hottest setups** — at most 3 (`TOP_N`), picked by `weekly_feature.score_setup`
  from the setups the watchlist actually shows (main + alt), skipping
  auto-detected ones (red dot = not checked by hand) and "No clear pattern"
  placeholders. Score: stage (confirmed 40 / signal 25 / forming 12), RSI
  momentum (+20 with, −25 against, same thresholds as `pattern_watchlist`),
  trend agreement (+10 / −5), agreeing stored setups (+4 each, max +12), room to
  target (0.6 per %, capped at 40%), reward/risk vs invalidation (+10 at ≥3x,
  +5 at ≥2x) and freshness (+8 within 10 days, +4 within 30). A setup whose
  target the price has already passed is dropped. Each card lists the reasons
  that scored it — change the weights in `weekly_feature.py`, not the data file.
- **Reporting this week** — every symbol the site tracks whose next earnings
  date falls in the featured Mon–Fri, from Yahoo Finance, cached in
  `data/earningsCalendar.json`. "Tracked" means anything in
  `data/patternWatchlist.ts`, valuation page or not: a watchlist-only symbol
  (XOM, CAT, MSFT …) has a setup to link to, which is all this list needs.
  To cover a stock for earnings without writing a `defineStock`, add a
  `pattern_watchlist.placeholder_entry` to the watchlist — `pattern_detect`
  rescans every "No clear pattern" placeholder on the next run, so the real
  setup, the candles and the price arrive with the daily job.
  The cache is only ever added to, so a run that cannot reach Yahoo keeps last
  week's dates instead of emptying the list. A stock file's hand-curated
  `nextEarningsOn` fills a gap Yahoo leaves; it never overrides Yahoo.
  Laid out as one column per weekday; a card opens that stock's setup
  (`#watchlist/TICKER`). The setup shown on a card is read **live** from
  `data/patternWatchlist.ts`, not stored in `weeklyFeature.ts`: stages move with
  the daily price run while this list is only rewritten weekly. A card reading
  "Needs updating" or carrying a red dot is the signal that stock is going into
  earnings without a checked setup.

The page animates with `motion/react` and honours `prefers-reduced-motion`:
every number, sparkline and meter is present with motion off. Each featured
card draws a 90-day sparkline from `public/bars/TICKER_daily.json` — the same
candle files the expanded-row charts read, fetched lazily, so a missing file
degrades to a shimmer placeholder rather than an error. The meter under the
price shows where the close sits between invalidation (0%) and target (100%).

The ledger's ⚡ chip sorts by **daily RSI, highest first** (no reading sorts
last). Every row shows its RSI; the bolt and the accent colour mark only the
setups momentum backs (≥60 for a long, ≤40 for a short), so the badge still
says "actionable" while the order stays a plain number.

### The 10% stop rule

A setup's invalidation is its stop, and a stop nobody would wear is not a setup.
**`MAX_STOP = 10`** (percent of price, `pattern_watchlist.py`, mirrored in
`components/PatternWatchlist.tsx`) is the line, and it is the same number on
every timeframe — the loss does not know which chart the line was drawn on.
Inside it the level is one you could put an order behind; beyond it the pattern
is still a true reading of where the stock is going, which is worth keeping, but
it is not an entry. Only ~18% of the setups the ledger shows clear the bar, so
the rule **ranks and labels, it never deletes**:

- **The ledger** reads the distance off the Invalidation column. Within 10% it
  sits in a green pill; wider and the whole cell recedes to muted grey. The
  ⤓ chip beside ⚡ sorts tightest-stop first and carries the count of rows that
  clear the bar. Only a setup you could still take is measured at all
  (`stopPct`): a reached target, a failure, a needs-updating row and an at-risk
  one — which has by definition already closed past its stop — read as no
  distance rather than as a tight one.
- **`pattern_detect.rank_setups`** puts a tradable stop **third** in its key,
  under "is it active" and under target agreement: when a chart offers both a
  wide pattern and one you could trade, the tradable one is promoted, but it
  never outranks several stored setups agreeing on a target. The placement was
  measured in all five slots against the hand-posted setups — under agreement it
  matches the posted pattern 45% of the time against 43% with no tier at all;
  over agreement that falls to 37% and the full pattern-direction-stage match
  collapses from 33% to 22%. Agreement is evidence about the chart; the stop is
  a question about the trade.
- **`weekly_feature.score_setup`** adds 15 for a stop inside 10% and subtracts 20
  beyond 25%, so the landing page's three cards are setups to act on rather than
  the widest drawings on the board.

### Rebuilding the lists

`.github/workflows/weekly-feature.yml` runs **Mondays at 9:23 AM UTC**, before
the 9:30 AM ET open, and commits `data/weeklyFeature.ts` +
`data/earningsCalendar.json`. It can also be triggered by hand from the
**Actions** tab. Deploys chain off it the same way they chain off the price job.

It needs no prices of its own: Friday's close is already in
`data/patternWatchlist.ts` from the weekday price run, so the featured numbers
are the latest close (the card section says which date).

```bash
python3 weekly_feature.py                   # dry run — print both lists
python3 weekly_feature.py --apply           # write data/weeklyFeature.ts
python3 weekly_feature.py --offline         # skip Yahoo, use the cached calendar
python3 weekly_feature.py --week 2026-11-02 # pin the week (testing)
python3 weekly_feature.py --top 5           # feature more than 3 setups
python3 weekly_feature.py --include-auto    # let auto-detected setups compete
```

Yahoo is blocked from Claude Code's sandbox (same 403 proxy as the price API), so
run it `--offline` here; the Action does the real fetch.

## Data Freshness Tracking

Prices auto-refresh daily, but everything else (fundamentals, RS, overrides, Burry/debt blocks) is hand-curated and goes stale silently. **`updatedOn` is NOT a freshness signal** — `update_prices.py` resets it to today on every price run. The real signal is **`dataReviewedOn`** (`'YYYY-MM-DD'`), which the price bot never touches.

**Whenever you refresh a stock's fundamentals / RS / override after checking its latest earnings, set `dataReviewedOn` to that date.**

Run the review-queue report any time (it only reads — never changes values):

```bash
python3 review_status.py                # full report
python3 review_status.py --days 75      # flag reviews older than 75 days (default 90)
python3 review_status.py --strict       # exit 1 if anything needs review (CI gate)
```

It flags stocks that are stale (review older than the threshold), never reviewed (no `dataReviewedOn`), or missing `lastReportTag` / `debtSafety` / `burry`. Use `lastReportTag` (e.g. `'Q1 2026'`) to record which earnings the data reflects — keep the convention consistent (calendar `Q# YYYY` or fiscal `Q# FY##`, but don't mix within a stock).

## Alpha Strategic View — Why Buy / Risks

The detail-page "Why Buy / Risks" panel (formerly the prose "Alpha Strategic View") renders two bulleted lists. **These live in `stocks/prose/TICKER.ts`, not in the `defineStock` call** — along with `verdictNarrative` and `keyTakeaways`, they are the four detail-page-only prose fields, split into per-stock lazy chunks so the home page doesn't download them (~38 KB gzipped). Edit them there; the shape is the same:

```ts
reasonsToBuy: ['…', '…'],  // qualitative case FOR owning the stock
risksToBuy:   ['…', '…'],  // qualitative risks AGAINST
```

Rules (see INTC for the reference implementation):

- **No precise numbers.** No price targets, percentages, valuation multiples, or specific revenue/EPS figures. Qualitative magnitude words are fine ("billions in revenue", "best-in-class margins", "years away"). The point is a fast, numbers-free read.
- 4-5 bullets each, one line (~8-18 words), specific to *this* company — real catalysts/moats on the buy side, real execution/competition/valuation/balance-sheet concerns on the risk side.
- `reasonsToBuy` = the bull drivers; `risksToBuy` = the bear factors. For loss-making/speculative names, risks should say so honestly.

`strategicNarrative` is **gone** — removed from the stock files, from `StockDefinition` and from `SimpleStockInput`. New stocks need `reasonsToBuy` + `risksToBuy` in `stocks/prose/TICKER.ts`.

### Adding a new stock's prose

Create `stocks/prose/TICKER.ts` next to `stocks/TICKER.ts` — the filename must match the ticker exactly, since `loadProse()` resolves `./${ticker}.ts`:

```ts
export const prose = {
  reasonsToBuy: ['…'],
  risksToBuy: ['…'],
  verdictNarrative: '…',   // optional
  keyTakeaways: ['…'],     // optional
};
```

A stock with no prose file renders the detail page without those panels — it does not error. Scenario prose (`desc` / `thesis`) stays in the stock file: the home page needs the rest of `scenarios` to compute ratings.

## Narrative Live-Value Tokens

The **scenario** prose still renders — Quant Narrative (`desc[]`) and the scenario cards (`thesis[]`) — and any number there that is **relative to the live spot price** (scenario target, "% from current", annualized CAGR) drifts the moment `currentPrice` updates and silently contradicts the computed cards. Write those as `{token}` placeholders that bind to the same projection the card renders from (`services/narrative.ts`). Plain prose and historical figures (YTD %, past revenue, EPS inputs) stay as literals — unknown tokens pass through untouched.

`desc[]` and `thesis[]` resolve **per-scenario** tokens for *that* path only: `{spot}` `{target}` `{return}` `{cagr}`. Do **not** reference another scenario's number or `{blended}` inside a scenario string — it won't resolve there. `{return}` is signed vs spot (e.g. `-32.7%`), `{target}`/`{spot}` are formatted dollars, `{cagr}` is a signed percentage. INTC is the reference implementation.

## Probability-Weighted Blend

The "Blended Value" / "5Y Prob-Weighted CAGR" use each stock's own `prob: [bear, base, bull]` weights (normalized), falling back to 25/50/25 when `prob` is absent. This is **display-only** — ratings and home-page groups are driven by *base-case* upside, so changing `prob` never moves a stock's rating or group. The `probAcceleration` card ("Prob of Acceleration") is a **separate** composite momentum signal (upside · RS · AI), not a scenario weight.

## Burry SBC Indicator

Each stock can carry an optional `burry` block in its `defineStock` call. When present, the home-page row gets a colored `B X%` badge, the detail page renders a full `BurryIndicator` panel + `Burry-Adjusted Read` callout in the verdict, The model verdict itself is **never** affected — Burry data is parallel/display-only.

### Schema

```ts
burry: {
  sbc: number;              // Annual stock-based compensation in $M
  gaapNi: number;           // Annual GAAP net income in $M (negative = loss)
  buyback?: number;         // Annual gross share repurchases in $M
  epsBasis?: 'GAAP' | 'NON_GAAP';  // Basis of `baseEps` for the multiple-haircut tile
  fy?: string;              // Fiscal year label, e.g. "FY25" or "2025"
  overstatementPct?: number;       // 0-100; preferred over computed SBC/NI when set
  overstatementSource?: 'burry-published' | 'estimated';
  note?: string;            // One-line context shown in the indicator panel
}
```

### Tier thresholds (must match across BurryBadge + BurryIndicator)

| Tier | Overstatement % | Coefficient (1 − pct/100) | Color |
|---|---|---|---|
| Pristine | < 15% | > 0.85 | emerald |
| OK | 15–30% | 0.70–0.85 | lime |
| Critical | 30–70% | 0.30–0.70 | amber |
| Tragic | ≥ 70% (or GAAP loss) | ≤ 0.30 (or any when NI ≤ 0) | rose |

### Setting `overstatementPct` for a new stock

**If on Burry's published chart** (LRCX 49%, AMD 32%, INTU 32%, SNPS 31%, NVDA 29%, NFLX 22%, META 20%, AMZN 21%): use the published value with `overstatementSource: 'burry-published'`.

**Otherwise**, estimate using calibrated heuristic:

1. Compute naive SBC/NI = `sbc / gaapNi` × 100
2. Apply MTM amplifier based on 3-year stock return:
   - 1×–2× return → multiplier ~1.5
   - 2×–4× return → multiplier ~2.5
   - 4×–8× return → multiplier ~4.0
   - 8×+ return → multiplier ~6.0
3. Subtract buyback offset: `min(20%, (buyback / sbc - 1) × 10)` if buyback > SBC, else 0
4. Cap at 100%; round to nearest 5%

Examples (calibration check against published values):
- LRCX naive 6%, 4.8× stock, modest buyback → est. ~50% (matches published 49%)
- NVDA naive 5%, 7.2× stock, $40B buyback (6× SBC) → est. ~30% (matches published 29%)
- NFLX naive 7.5%, 2.6× stock, 10× SBC buyback → est. ~22% (matches published 22%)

Use `overstatementSource: 'estimated'` for these.

### When to refresh Burry data

Update the `burry` block when:
1. A company reports a new fiscal year (refresh `sbc`, `gaapNi`, `buyback`, `fy`)
2. SBC growth deviates significantly from prior years (>20% change)
3. A buyback authorization is materially exercised or paused
4. Burry publishes new chart data and the stock appears on it

After any update:
- Verify the badge tier changes haven't broken expected groupings
- Run `npm run build` to confirm no TypeScript errors

### Loss-makers and edge cases

- For GAAP-loss stocks (e.g., RBRK, ASTS, ARRY, SMWB, THM): set `overstatementPct: 100` with a note explaining the framework breaks down for negative NI
- For pre-revenue companies (THM): `gaapNi` should be negative, `overstatementPct: 100`
- For stocks with no `baseEps` (DCF/FCF model): `epsBasis` can be `'GAAP'` since there's no non-GAAP P/E haircut to apply
- Coefficient ≤ 0 always falls into Tragic tier regardless of percentage

### Source data

Always cite specific FY when entering data. Useful sources for SBC + buybacks:
- **macrotrends.net** — annual SBC time series
- **financecharts.com** — buybacks + SBC quarterly/annual
- Company 10-K filings (cash flow statement: "Stock-based compensation" line)
- Quarterly press releases for buyback dollar amounts

## Debt Safety Indicator

Each stock can carry an optional `debtSafety` block in its `defineStock` call. When present, the detail page renders a **Debt Safety Check** panel below the Burry Indicator. Display-only — does not affect the model verdict or rating.

### Schema

```ts
debtSafety: {
  netDebt: number;          // Total debt − cash, $M. Negative = net cash.
  ebitda: number;           // Annual EBITDA, $M (for leverage ratio).
  capexToOcf?: number;      // CapEx / Operating Cash Flow (0–1). Only needed if netDebt/ebitda > 2.0.
  interestCoverage?: number; // EBIT / Interest Expense. Only needed if netDebt/ebitda > 2.0.
  altmanZ?: number;         // Altman Z-Score. Only needed if netDebt/ebitda > 2.0.
  fy?: string;              // Fiscal year label, e.g. "FY25"
  note?: string;            // One-line context shown in the panel
}
```

### 3-Step Logic (tier thresholds must stay aligned with `services/debtTier.ts`)

| Step | Condition | Tier |
|---|---|---|
| 1 | Net Debt ≤ 0 (net cash) | GREEN |
| 2 | Net Debt / EBITDA ≤ 2.0 | GREEN |
| 3a | All three pass: CapEx/OCF < 20%, Interest Coverage > 5×, Altman Z > 3.0 | YELLOW |
| 3b | Any condition fails | RED |

- **GREEN**: Financially safe — no further action needed.
- **YELLOW**: Debt elevated but justified (e.g., MSCI). Can invest, monitor leverage trajectory.
- **RED**: Dangerous — high default risk, skip or heavy discount.

### When to add/update `debtSafety`

Add it for **every new stock**. Update when:
1. Company reports a new fiscal year (refresh `netDebt`, `ebitda`)
2. A large acquisition or debt paydown materially changes leverage
3. Interest coverage or Altman Z crosses a tier boundary

### Setting Step-3 fields

Step-3 fields (`capexToOcf`, `interestCoverage`, `altmanZ`) are only needed when `netDebt / ebitda > 2.0`. For net-cash or low-leverage stocks you can omit them entirely.

**Altman Z-Score note**: the classic Z-Score was designed for manufacturing companies and can give misleading results for asset-light tech/SaaS businesses. For software/SaaS names, treat Z < 3.0 as a soft flag rather than a hard red — use `note` to document the caveat.

### Sources

- **macrotrends.net** — Net Debt time series, EBITDA
- **wisesheets.io / stockanalysis.com** — Interest coverage, CapEx/OCF
- Company 10-K filings — balance sheet (debt, cash), income statement (EBIT, interest expense), cash flow (CapEx, OCF)
- Altman Z-Score calculators: **wisesheets.io**, **gurufocus.com**

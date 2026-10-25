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
  A **pending** setup counts too, as long as the same close carried it past its confirm level: the move ran through signal, confirm and target, so there is nothing left to judge and it is marked `target` on the day. It does **not** wait for its own timeframe's close — otherwise a monthly call that fully played out would sit on "forming" for weeks;
- checks **pending** setups (forming / signal / either-direction) against the limit on either side of them. Which side the close crossed decides what happened, and the two are not the same event. Limits: forming = invalidation behind ↔ signal (or confirm if no signal level) ahead; signal = signal behind (a close back past it cancels the signal) ↔ confirm ahead; either-direction = breakDown ↔ breakUp.
  - a close past the limit **ahead** is the setup working, so it **moves on**: to `signal` past the signal level, to `confirmed` past confirm. `confirm` *is* the signal candle's low/high (see PATTERN_RULES.md), so "a later close beyond confirm" and "beyond the signal candle's low" are one test — which is why the bot can judge this itself. Confirmation needs a later bar than the one that signalled, so a close on the signal's own bar waits. `stageDate` moves to the closing date.
    **Promoting out of `forming` also writes `confirm`**, from the candle that signalled — its high for an upward break, its low for a downward one, folded over the setup's own timeframe (a weekly setup signalling on Friday confirms against that week's high). A forming setup carries no `confirm` and cannot: there is no signal candle yet. Without writing it at the promotion, the setup lands on `signal` with nothing ahead of it and can never confirm, only cancel — 92 of the 253 pending directional setups were that shape. If the candles do not reach the day, `confirm` is left unset and the setup is listed for review rather than given a guessed level.
  - a close past the limit **behind** is the setup coming apart, and only that sets `stage: "update"` ("Needs updating": post a new setup), recording `prevStage` and `updateNote` (`stageDate` stays put). An either-direction setup that breaks is flagged the same way: it carries no signal, confirm or target, so the directional setup has to be drawn by hand.
  - Only a close on the setup's own timeframe counts: daily every run, weekly on Fridays, monthly on the month's last weekday. In between, it's listed for review only;
- only *reports* (never edits) confirmed setups that **closed** beyond invalidation. Failure needs a follow-through close, so mark those manually.

- uses **regular-session prices only** (9:30–16:00 ET), never pre/post-market. Close-based checks (needs updating, invalidation) are skipped while that day's session is still open, so a run before 16:00 ET never re-labels a setup on an intraday price; target touches count from regular-session highs/lows. The Action runs at 21:47 UTC, after the close year-round.

- **removes finished setups**: target reached (touched any time since confirmation) or failed (a completed close past invalidation plus a follow-through close), each with one News post saying why. A setup **you posted** (not auto-detected) is kept as a `history` row instead of vanishing, so a call that played out still shows under **Finished** on its stock — a target you called and hit is worth keeping. The stock's `keyLevel` and any existing history survive a setup being replaced too. "Needs updating" setups stay until a replacement is posted. By hand: `python3 pattern_watchlist.py --prune` (dry run) / `--prune --apply`.

**Every status change goes to the News feed** (`data/newsFeed.ts`, newest first). The script diffs the watchlist against `data/watchlistStatus.json`, so hand edits (a new setup, a re-posted setup, a setup marked failed or removed) are posted too, not just the bot's own changes. **After editing any setup's `stage` by hand, run `python3 pattern_watchlist.py --apply`** (no network; re-checks stored prices and posts the changes), and commit `data/`. The daily price run does the same automatically. A new News post also triggers the in-app "What's New" toast.

`note` prose is hand-written and isn't rewritten when the price moves. Re-read it when a setup changes stage.

**Charts in the expanded rows** (`components/SetupChart.tsx`, TradingView `lightweight-charts`, loaded on first expand) read candles from `public/bars/TICKER_timeframe.json`. The price run rewrites these for every watchlist setup's timeframe (daily 1y, weekly 5y, monthly 10y, regular session only); refresh them by hand with `python3 pattern_watchlist.py --bars`. A setup's levels are drawn as labelled lines and its `stageDate` as a marker. Trendlines come from the setup's (or its `alt`'s) `lines: [{ from: ['YYYY-MM-DD', price], to: ['YYYY-MM-DD', price] }, …]`; the chart extends them to the newest candle.

**When the detector runs.** A setup takes time to develop, so the daily price job does
**not** go looking for new ones: `prune_finished` closes the setups that finished, which
leaves those stocks a "No clear pattern" placeholder, and the plain `pattern_detect.run()`
fills only those. Everything else is left to keep developing. **Friday is the
re-evaluation** — the price run passes `redo_auto=True` (a superset of the placeholder
scan, so it replaces the daily call rather than adding to it) and then `redo_stored()`, so
every machine-drawn setup is redrawn on the week's closed candles. Neither path touches
anything written by hand. The Friday run also writes `archive/handSetups-<date>.json`;
`ARCHIVE_KEEP` holds the newest 8, about two months.

**Auto-detected setups** (`pattern_detect.py`): stocks without a setup are scanned on the daily and weekly charts (weekly = main, steadier; daily = second setup) for the clearest channel / wedge / hammer per PATTERN_RULES.md, or get a pending "No clear pattern" placeholder. They carry `auto: true` and show a **red dot** until checked by hand — remove `auto: true` once verified.
There are **two dots on a ledger row, deliberately the same signal twice**. One sits
beside the **ticker**, so the Stock column can be scanned top to bottom for the stocks
still owed a look; the other sits beside the **pattern name**, where it says which
reading is machine-drawn. Both fire on the shown setup's own `auto` — 67 of 149 rows at
the time of writing. The expanded panel carries its own dot on each setup it lists, which
is where the stored ones surface. A stock can hold a hand-posted setup and an
auto-detected one at the same time without either inheriting the other's status, a setup
you post has no dot, and a price refresh never adds one — `update_prices.py` touches
`price`, `priceDate`, `rsi` and `trend` and never writes `auto`.

The row dots cannot see the stored setups: the build moves `alt` and `more` into
`public/setups/TICKER.json` (the `split-stored-setups` plugin in `vite.config.ts`) and
an expanded row fetches them. Counting those would need the plugin to leave a tally
behind as it strips them, which was tried and backed out — 124 of 149 stocks carry an
unchecked setup somewhere, so a dot covering them fires on almost every row and stops
discriminating. If that broader signal is ever wanted, that is where it goes.

### Targets: what the completed setups actually say

Completed setups from the source tool are recorded as `history` rows. Comparing them
against the detector's reading of the same chart looked at first like a clean defect —
the break levels agree (confirms have matched to the cent on CVX and CRWD, and within
3% on XOM, FRSH and KMB) while the measured move off those same lines runs 1.4x to
4.4x longer, median 2.18x over five matched pairs.

**That comparison is confounded and the 2.18x should not be used.** Every pair sets one
of our *live* setups against one of their *completed* ones, and a setup completes partly
because its target was short enough to reach. Controlling for it:

| | n | median move |
|---|---|---|
| live setups posted from the source tool | 525 | 30.1% |
| live setups the detector drew | 247 | 38.9% |
| **completed** setups from the source tool | 18 | **12.1%** |

The source tool's own live setups project 30.1% and the ones that finish average 12.1%.
Same tool, same method — the gap is survivorship, not error. Against that control the
detector projects **1.29x** the source tool, not 2.18x, and even that may be composition
rather than method.

What survives is more interesting than the original claim: **a measured-move target is
usually not reached, in either system.** Long-target setups mostly do not resolve, which
is why the ledger accumulates "confirmed" rows whose price walked away — FRSH led the
landing page on 40.7% of room to a target that had effectively already played out. The
fix is therefore not to shorten the projection. It is to stop treating an unreached
target as a reason to keep a setup live, which is what `atRisk` and the "Break undone"
chip already do and what the retirement rules should lean on harder.

Smaller completed targets are not evidence of a better method either — META's hammer
reached a 2.2% objective because a candle pattern projects a candle-sized move.

One number from the comparison does stand without needing the survivorship question
settled: **on all six charts where a completed call has been recorded, our own setup for
the same break is still open.** XOM, CVX, FRSH, LIFE, KMB, RBRK — in each case price
reached their objective and stopped short of ours. That is a statement about the state of
this ledger, not about whose method is better, and those six rows are exactly the ones
that should have closed themselves.

### Training on the calls that completed

`pattern_reproduce.py` scores the detector against the source tool's finished calls,
which are recorded as `history` rows in `data/patternWatchlist.ts`. For each one it
replays the chart up to the day the call completed, runs the detector on exactly those
candles, and asks whether it rebuilds that setup. Every label is a setup that paid, so
unlike the distribution comparisons there is no survivorship to correct for.

**The replay stops one bar before the completion day** (`BACK` in `pattern_reproduce.py`,
`--back N` to change it). The completion bar is the one that reached the target, so
including it hands the detector a chart on which the move is already over — and `_stage`
discards a setup whose target has been reached. The shorter and more accurate the
projection, the more often that fires, so at `BACK = 0` the setups that survive to be
scored are disproportionately the ones that over-project. That flattered the exact number
being measured: channels read 17.4% on the completion bar and 22.6% a bar earlier.

Baseline on the 24 calls whose candles reach back far enough:

- **confirm level: 0.0% median error.** The break detection is exact — this is not where
  anything is wrong.
- **right pattern and direction: 18/24.** Most of the misses are Hammers that
  `detect_hammer` does not find, and one is a Bull Flag, which is not implemented and is
  not a tuning gap — see PATTERN_RULES.md §5b for why, and for the measuring rule verified
  off the one completed flag on record.
- **target: 4.8% median error**, with 14 of the 18 inside both level tolerances.

The tables below were measured on the 20 calls on record at the time. Four more have since
been added and the headline has only improved — 6.7% at 23 labels, 4.8% at 24. None of them
was used to tune anything, so each is an out-of-sample check rather than a re-fit. The most
recent, STRL's daily ascending channel (confirmed below $480.23, reached $419.52 on
2026-10-15), is the cleanest reproduction on record: **0.0% confirm error and 0.7% on the
target**.

**`HEIGHT_REF`** (`pattern_detect.py`) decides where a pattern's height is measured for
the measured move. The height used to be taken at the pattern's *start*, where a
converging wedge is at its widest, so the projection was the full mouth of it. Measured
against the completed calls:

| | wedges | channels | patterns rebuilt |
|---|---|---|---|
| `start` | 11.4% | 22.6% | 16/20 |
| **`mean`** (current) | **4.7%** | 22.6% | 15/20 |

Wedge error drops by well over half, and holds under every cutoff tested (at `BACK = 0`
it reads 14.6% → 6.8%, at `BACK = 2` 11.4% → 4.2%). Channels do not move at all and
cannot — their lines are parallel, so the height is the same wherever it is measured, and
their error is a line-fitting problem rather than a height one — see **MIN_SIDE_TOUCHES**
below, which is what fixed it.

The cost is one setup, consistently: KLAC's daily rising wedge at `BACK = 1`, CVX's weekly
falling wedge at `BACK = 0`. Both are lost to the same guard — a shorter target is more
often one the chart has already reached, and `_stage` then discards the setup as finished.
That is the detector being right in a way the harness scores as a miss, and it is the
honest price of the change. It also costs about 2 points on the held-out half of the
agreement-with-hand-posted metric (32.7% to 30.9%); the train half fell much further,
which is noise at n=63.

**`pw.MIN_ROOM = 0.10` is costing three of the completed calls, and the measurement that
said otherwise was broken.** Six of the 22 completed calls had less than 10% between
confirm and target — META's hammer at 2.2%, LMT's at 2.8%, LMT's daily descending channel
at 3.1%, CRWD's hammer at 3.4%, KMB's channel at 5.0%, NBIS's at 8.1% — so the floor
discards 27% of the setups that worked, candle patterns worst of all, since a candle
projects a candle-sized move.

This used to read "lowering it did not change the reproduction score, so there is no
measured gain to point at". That was an artifact: `_roomy` reads `pw.MIN_ROOM`, the
harness applied overrides with `setattr(pd, ...)`, and `pd.MIN_ROOM` does not exist — the
sweep created an attribute nothing reads and faithfully reported no change. Swept on the
module that owns it:

| `pw.MIN_ROOM` | overall | channels | wedges | levels close | patterns rebuilt |
|---|---|---|---|---|---|
| 0.00 | **4.6%** | 8.8% | 4.7% | **16/20** | **20/23** |
| 0.05 | 6.7% | 8.8% | 4.7% | 13/17 | 17/23 |
| **0.10** (current) | 6.7% | 8.8% | 4.7% | 13/17 | 17/23 |
| 0.15 | 10.4% | 10.6% | 6.7% | 9/15 | 15/23 |

The three calls the floor throws away are META's, LMT's and CRWD's hammers, and the
detector rebuilds all three at **0.0% confirm error and 0.0% target error** — exact
reproductions, discarded for being short. The prose argument was right and the number
that appeared to contradict it never ran.

**It has still not been changed**, because this harness cannot price the other side.
It scores recall against calls that are known to have paid; it never sees the thin setups
a lower floor would also admit, which is what the floor exists to keep off the ledger.
Lowering it is a decision about how much clutter a hit is worth, and the number above is
only one half of it.

**The stored setups on a hand-posted stock are refreshed separately.** `--redo-auto`
rebuilds the 65 machine-drawn *entries*; the ~250 auto setups hidden inside `more: [...]`
on the 85 hand-posted stocks are a different population, and they feed the agreement
badge, `weekly_feature`'s "+4 per agreeing setup" and `rank_setups`' target agreement.
`python3 pattern_detect.py --redo-stored` (dry run) / `--redo-stored --apply` re-detects
those **in place**: a setup is matched by (timeframe, pattern, direction) and only its
levels are replaced. Use it rather than `--extras`, which calls `_strip_stored()` — that
deletes the entire `more` list and rebuilds it, taking every hand-written stored setup
with it (174 of them at the time of writing).

**`auto: true` is the only thing protecting a hand-written setup.** A stored setup
without the flag is never rewritten, whatever it looks like — and some of the unflagged
ones plainly are machine-drawn (direction `"both"` is a shape only `_classify` produces).
They stay anyway: the flag is the contract, and guessing against it is how hand-written
prose gets eaten. A setup the fresh scan no longer finds is also left alone rather than
deleted — 28 were, on this run.

Every run of `--redo-stored` first writes `archive/handSetups-<date>.json`: the verbatim
source of every stored setup on every hand-posted stock, `auto` flag included, plus each
stock's `keyLevel` and `history`. It stores source text rather than parsed values, so a
setup goes back exactly as it was written. `python3 pattern_detect.py --archive` writes
one without changing anything.

**`MIN_SIDE_TOUCHES = 2`: both boundaries have to be touched.** A channel is one line
through two swing points plus a *parallel through a single opposite pivot*, and nothing in
the scoring objected to how far away that pivot sat. The result was a boundary price never
came back to, and a channel as wide as its one outlier. On the completed calls the
detector's channel was wider than the call's in **8 cases out of 8**, never narrower.

Requiring each boundary to carry at least 2 touches (wedges already do, both their lines
being fitted through two pivots, so this bites only channels):

| | channel target error | overall | levels close | patterns rebuilt | agrees with hand-posted |
|---|---|---|---|---|---|
| 1 per side | 22.6% | 13.5% | 8/15 | 15/20 | 79.0% |
| 2 per side | 9.9% | 9.0% | 10/15 | 15/20 | 74.6% |
| **2 per side, `SIDE_EXEMPT = 0.20`** (current) | **8.8%** | **6.7%** | **12/15** | 15/20 | 75.0% |
| 3 per side | 9.4% | 9.0% | — | 9/20 | — |

Channel error drops by more than half with no loss on the completed calls, and three per
side collapses recall for nothing.

**`SIDE_EXEMPT` keeps the rule off narrow patterns**, where a single-touch boundary costs
little in absolute width. It is not a free parameter fitted to the result: swept from 0 to
100% the error falls to a flat optimum over 20–25% and then climbs back to *exactly* the
no-rule baseline by 40% (13.5% / 22.6%), which is the shape the argument predicts and the
reason to believe it. 0.20 is the near edge of that plateau, so the fewest single-touch
channels are readmitted for the same gain.

**The remaining cost is 4 points on the independent control** — reproducing the setups
posted by hand is 75.0% against 79.0% with no rule, 10 of 252 — because some hand-drawn
channels do rest on a single touch and are wider than the exemption. That trade was taken
deliberately: the goal is the setups worth acting on, not every setup the rules can draw,
and a boundary touched once is not a boundary. Raising `SIDE_EXEMPT` hands them back,
at the width accuracy the table prices.

### How much of this is real: n is 23

Every table above reproduces — re-measured on all 23 labels the overall column still reads
13.5% → 9.0% → 6.7%, the channel column 9.9% and 8.8%, and the `SIDE_EXEMPT` sweep has
exactly the predicted shape (flat optimum over 0.20–0.25, back to the no-rule baseline of
13.5% from 0.40 and precisely on it by 0.50). **None of the three gains clears sampling
noise.** Paired bootstrap over the labels, 4000 resamples, median target error:

| change | n | observed | 95% CI |
|---|---|---|---|
| `HEIGHT_REF` start → mean (wedges) | 7 | +9.9 pts | [−5.5, +17.4] |
| `MIN_SIDE_TOUCHES` 1 → 2 (channels) | 10 | +10.7 pts | [−11.9, +16.0] |
| `SIDE_EXEMPT` 0 → 0.20 (all) | 17 | +2.3 pts | [0.0, +5.8] |

Every interval touches or crosses zero. The `SIDE_EXEMPT` gain in particular moves the
error of exactly **two** labels — LMT's channel (32.5% → 8.5%) and XOM's (10.4% → 2.4%) —
so the flat optimum, real as its shape is, is a plateau produced by two charts.

This does not make the settings wrong. Each was argued from what the construction *should*
be — a boundary touched once is not a boundary; a converging wedge is not as wide as its
mouth — and the measurements agree in direction every time. It means the tables are
corroboration, not proof, and that a few points of median error between two configs is not
a reason to prefer one. Re-run the bootstrap before moving anything on the strength of a
table alone, and treat new completed calls as the thing that would actually settle it.

**`HEIGHT_VS = 'start'`: judge a pattern's height where the price was.** `MAX_HEIGHT`
caps how tall a pattern may be relative to price, but it was measured against the close at
the pattern's **last anchor** — and for a rising pattern price has climbed by then, so the
same height is a smaller fraction of it. CRDO's weekly ascending channel came in at 69% of
that close, under the 70% cap, while being **106% of the lowest close it spans**: a channel
wider than the share price, with its lower boundary at $40.77 in February when the lowest
low on the chart was $86.49. It had to be demoted by hand.

Judged against the close at the pattern's *start* instead:

| | target | channels | inside both tolerances | patterns | agrees with hand-posted | rejects CRDO |
|---|---|---|---|---|---|---|
| `last` (was) | 6.7% | 8.8% | 13 | 17/23 | 76.4% | no |
| **`start`** (current) | **5.0%** | 8.8% | 13 | 17/23 | 74.8% | yes |
| `mean` | 5.0% | 8.8% | 13 | 17/23 | 76.4% | **no** |
| `min` | 4.6% | 6.1% | 15 | 16/23 | 71.7% | yes |

`mean` was rejected despite costing nothing: it improves the metric without fixing the case
that prompted the change, which is tuning to the scoreboard rather than to the problem.
`min` buys a further 0.4 points of target error and two more setups inside tolerance, but
costs three times the agreement (12 setups against 4), loses CRWV's weekly rising wedge,
and leaves CRDO's weekly chart with **no** reading at all — accuracy bought by declining to
read the chart. `start` fixes the case for 1.6 points, 4 setups of 254.

Note what this is *not*: the touches were not the problem. CRDO's lower boundary is touched
at bars 7 and 22 of a 36-bar span — properly spread, and `MIN_SIDE_TOUCHES` passes it
honestly. A rising line can be far below price at the start and still be touched later as it
catches up, which is why the width test has to be anchored where the pattern begins.

### Stop distance: why the live invalidation cannot measure it

A sloped invalidation is its line's value at the **latest** candle (see "Sloped
invalidations track their line" above), so it walks every session. `invalidation` says
where a setup dies *today*; it does not say what being wrong would have cost on entry.
Both obvious ways of reading a stop off the ledger are therefore broken, and each fails
in its own direction:

- **Distance from today's price** finds THM, EME and MLM at 0.0% — that is price sitting
  *on* the line, a setup about to be invalidated. Ranked tightest-first it promotes the
  setups closest to dying.
- **Distance from the confirm level** looked spectacular (reward/risk of 301x, 100x, 75x)
  and is an artifact: a confirmed channel's invalidation sits on the boundary it broke, so
  right after the break `confirm ≈ invalidation` by construction. Confirmed setups inside
  2% had a median age of **10 days** against **46** for those beyond 20%. The number was
  measuring elapsed time, not risk.

**`breakInvalidation` is the fix**: the invalidation as it stood on the day of the break,
written once by `pattern_lines.freeze_stops()` (`python3 pattern_lines.py --freeze-stops`,
`--apply`; the daily run calls it after `relevel`) and never re-read. On the same test the
age spread across stop buckets falls from 4.6x to 1.8x, and what is left is survivorship
rather than drift — a tight stop resolves faster, so the tight setups still open are
genuinely younger. Backfilled for 570 confirmed setups; the handful that could not be
recovered have no trendlines or no candles reaching their `stageDate`.

A setup redrawn by a rescan loses the field and gets a fresh one on the next run, which is
correct: it is a different setup. **Nothing ranks on it yet** — it exists so that a stop
rule, if one is ever wanted again, has a number that means what it says.

**It will not record a number that cannot be a stop.** The level is read off a trendline,
and a trendline can be degenerate. `_stop_fault` refuses three shapes: a level on the
*winning* side of the entry (AVGO's weekly channel froze a short's stop below its own
confirm), a risk wider than `MAX_STOP = 0.5` of the entry (STX: entry 700.39, line at the
break 1420.58 — 103%, which is a steep line extended a long way, not a level anyone traded
against), and two boundaries converged within `CONVERGED` near a wedge's apex, where which
line the level belongs to is a coin flip. `relevel` already declined all three for the
*live* level; freeze wrote them anyway, and being write-once it wrote them for good.
The guards arrived after the backfill, so `python3 pattern_lines.py --recheck-stops` (dry
run) / `--recheck-stops --apply` clears the ones already stored — 41 of 562 on the first
pass. It only ever **removes** a value, never recomputes one: write-once is what makes the
field mean anything, and a level recomputed months later off a since-refitted line would be
a different number wearing the same name.

### Stranded setups: confirmed breaks nothing can retire

A setup fails on a close past invalidation plus a follow-through. When that level is half
the share price away, the rule can never fire — so a confirmed break whose price has gone
back past the level that confirmed it sits in the ledger forever, on a target nobody is
trading towards. LITE carried two: a daily ascending channel confirmed down in August
whose price then rallied **32% above its confirm** before falling back, kept alive by an
invalidation 57% above the highest price the stock had ever traded.

`stranded_setups()` in `pattern_watchlist.py` reports them, and the daily run prints the
list under **🪦 Stranded**. The test is both conditions at once: the break undone by more
than `STRANDED_UNDONE` (10%) *and* an invalidation more than `STRANDED_STOP` (40%) from
price. Either alone is normal — a sloped invalidation on an old break runs away from price
by design, which is why 123 of 560 confirmed setups have one outside every price the stock
has traded, and that is not a defect. The intersection is 9.

**A setup still travelling toward its target is not stranded**, whatever the snapshot
says. Both tests above are instants, and an instant cannot tell a setup that was abandoned
from one whose price overshot the wrong way and is now coming back. ENVA's weekly rising
wedge confirmed down at $145.08, rallied to $267, and sits at $165.07 falling — 14% above
the confirm, so it read stranded, while in fact it is heading for its $119.67 target, which
is what the source tool and a human reading of the chart both say. `_closing_in()` compares
price against its close 40 sessions back and drops those. It took the list from 6 to 3, and
the three it removed were all of this shape.

Nothing is marked automatically. The auto-detected ones are candidates for Friday's
redraw, which replaces their levels where the fresh scan still finds the same pattern; the
hand-posted ones need a replacement posted, since only a human can say whether the chart
still means what it did. The UI already shows the condition as the **Break undone %** chip
(`undoneBy()` in `components/PatternWatchlist.tsx`) — what was missing was anything that
listed them.

### Working on the scripts: three traps

- **`auto` is a stock-level flag.** Only the `auto: true` directly on the entry decides posted-vs-auto; the stored setups inside `more: [...]` carry their own. A text search for `auto: true` matches both, so a stock that looks auto-detected may be one you posted by hand — ask the parser (`{k: v[2] for k, v in e['fields'].items()}`), not grep.
- **The parser keeps array fields as spans, not values.** For `lines` (and `history`) `_setups()` gives you the position in the source text, and `s.get('lines')` is always `None`. To read trendlines use `pattern_lines.stored_lines(text, pos)`; to write them, splice the span. Anything guarded by `if s.get('lines')` never runs — which is currently true of the channel branch of `_finished()`, so channels fail by the generic close-past-invalidation-plus-follow-through rule rather than on one close back inside the broken line.
- **`--redo-auto` rewrites the whole entry.** `_ts_entry()` builds an auto entry from scratch, so anything the detector doesn't write is gone unless it is carried over: `rsi` / `trend` (the price run's), `keyLevel` and `history` (hand-written, and `history` is the record of completed calls the reproduce harness trains on). That is what `KEEP_HEAD` / `KEEP_TAIL` and `_carry()` in `pattern_detect.py` are for — add any new entry-level field to one of them, or the next re-scan deletes it.

**Setups need room.** A setup whose target is within **10%** of its confirmation
level is skipped — `MIN_ROOM` in `pattern_watchlist.py`, enforced by
`pattern_detect.py` so a scan never produces one. `python3 pattern_watchlist.py --thin`
(dry run) / `--thin --apply` drops the auto-detected ones already stored and lists
hand-posted ones for review; the daily report has the same list under "Too little room".

**Pattern rules** (how each pattern — channels, wedges, head & shoulders, hammers — is drawn and how signal / confirm / target / invalidation are set, with verified examples) are in `PATTERN_RULES.md`. Follow them when posting a setup by hand.

**Trendlines are fitted automatically** by `pattern_lines.py` (run by the daily price job for setups without lines; by hand: `python3 pattern_lines.py` dry run, `--apply` to write, `--refit` to replace existing). It reproduces the source tool's construction: lines run through swing highs (upper) / swing lows (lower), at least 1 candle each side; channels are parallel (two-pivot line + parallel through one pivot, or one pivot aimed at the stored level); wedges use two pivots per line; head & shoulders necklines run through the closes of the two troughs. A fit is only accepted when the lines reproduce the setup's own levels: signal = broken line at the signal candle (the candle whose high/low equals `confirm`), target = signal ± the pattern height where the lines start, invalidation ≈ a line's value at the latest candle; forming setups match their break levels at the latest candle. Setups it can't match (and Hammer / Head & Shoulders) are listed and left without lines. After posting a new channel/wedge setup, run `python3 pattern_lines.py --apply`.

**Sloped invalidations track their line.** An invalidation is a trendline's value at the latest candle, so it moves a little every session while the stored number stays where it was written (this is why a level can read fine in the source tool and stale here). The daily job re-reads them after the candles and the fitter; by hand: `python3 pattern_lines.py --relevel` (dry run) / `--relevel --apply`. A **confirmed channel's** invalidation sits on the boundary it broke (upper line for an upward break, lower for a downward one) — its fail rule reads "back inside the broken boundary". While a channel is still **pending** there is nothing to fall back into, so the level that kills it is the *opposite* side of the channel, with the follow-through wording. A **wedge's** sits on the far side either way (lower line for an upward break, upper for a downward one). Auto-detected setups are skipped: `pattern_detect.py` derives their levels together and puts a pending channel's invalidation on the broken boundary instead, so re-reading them here would only fight the detector — a rescan redoes them. A level is left alone, and listed for review, when the setup isn't live (needs updating / target / failed), its two lines are within 3% of each other (near a wedge's apex, which line a level belongs to is a coin flip), the level is more than 8% off its line (it was set some other way), or the move would be under 1% (close enough — and a number entered by hand from the source tool isn't worth fighting over every run).

**A channel changing stage switches which boundary its invalidation sits on**, and relevel
handles that as its own case. When a pending channel confirms — by hand or by the daily
run's promotion — the rule moves its level from the far side of the channel to the boundary
it broke, a whole channel width away. Both guards above read that as "set some other way"
and refused, so a promoted channel kept its pending stop for good and could never be flagged
`atRisk`. Relevel now recognises it: if the stored level still sits on the line the *pending*
rule named, that is a side switch rather than drift, and the level moves. It prints as `SIDE`
rather than `LEVEL` — **re-read that setup's `failRule`**, which is hand-written prose
quoting the old price and the pending follow-through wording, and is not rewritten for you.
A wedge invalidates on the far side at every stage, so this never fires for one.

## Bundle: what loads on which route

`#` is the landing page, and it used to download the whole app — all 95 stock definitions,
the valuation model, the ledger and the notes drawer, none of which it renders. The routes
past it are `React.lazy` now, and the first chunk is 514 KB / 151 KB gzipped against 944 KB
/ 293 KB before.

| chunk | carries | fetched when |
|---|---|---|
| `index` | React, motion, `data/patternWatchlist.ts`, Landing | always |
| `WhatsNewToast` | the toast | there is an unseen update |
| `ReleaseNotesPanel` + `utils` | the drawer, `cn`, tailwind-merge | the drawer is first opened |
| `PatternWatchlist` | the ledger | `#watchlist` |
| `StockPage` | **all 95 stock definitions**, `constants.ts`, the projection service, the detail page | `#TICKER` |
| `lightweight-charts` | the charting library | a row is first expanded |

Three rules keep it that way, and breaking any one of them silently puts the stock
definitions back in the first chunk:

- **Nothing reachable from `App.tsx` or `Landing.tsx` may import `constants.ts`, `stocks/`
  or `services/universe.ts`** — directly or through a helper. `utils.ts` counts: it imports
  `StockGroup` from constants.
- **What the list routes need from the stock files is `virtual:stock-catalog`**, one
  `{ticker, name}` row per file in `stocks/`, served by `stockCatalog()` in `vite.config.ts`
  (~3 KB against 555 KB). It is the landing page's "covered" count, the ledger's company
  names, and the check that `#TICKER` is a real route. Nothing else needs it; the detail
  page has the definitions themselves. The plugin fails the build if a file's `ticker` does
  not match its filename, which `loadProse()` already depended on silently.
- **A lazy route must not also be imported statically.** Landing pulling five helpers out of
  `PatternWatchlist.tsx` was enough for rollup to give up on the split and bundle the whole
  ledger; those live in `components/setupStatus.tsx` now. Rollup says so when it happens —
  *"dynamically imported ... but also statically imported"* — and that warning is the signal
  the split has silently reverted.

Check it with `npx vite build` and look at `index-*.js`, or load the page and watch which
`.js` the network panel fetches.

**`npm run lint` only became real with `@types/react`.** It was missing, so `tsc --noEmit`
treated every JSX element as `any` and checked no component props at all — a bogus prop on
a typed component raised nothing. Installing `@types/react` / `@types/react-dom` turned up
exactly zero pre-existing errors, so nothing was being hidden, but nothing was being caught
either. Keep them: a route split is exactly the kind of change that trips prop errors.

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

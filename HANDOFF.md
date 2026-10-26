# Handoff — picking this up in a new chat

Written 2026-10-26, on branch `claude/hopeful-turing-gsb3s2` at `62e5eb2`. Everything
described here is committed and pushed; the working tree is clean.

Read `CLAUDE.md` for how the machinery works, `RULEBOOK.md` for the decision rules and
`PATTERN_RULES.md` for how a pattern is drawn. This file says only what the last session
did and what it left.

## Standing constraints — do not change these without being asked

- **News is paused.** `NEWS_PAUSED = True` in `pattern_watchlist.py:69`. Stage changes are
  computed and printed but nothing is written to `data/newsFeed.ts`. It stays paused until
  the user says otherwise.
- **Branch is `claude/hopeful-turing-gsb3s2`.** Develop and push there, nowhere else.
- **No pull requests** unless explicitly asked.
- **`auto: true` is the only thing protecting a hand-written setup.** A stored setup
  without the flag is never rewritten, whatever it looks like.
- **Reproduce every source-tool level from our own candles before writing it.** A number
  read off their screenshot that our bars do not support is not posted.
- **No more training/tuning work.** The user's words: *"let's not do training anymore,
  just post the set ups for our stock because i'm running short on time."* Posting setups
  for stocks is the work; `pattern_reproduce.py` and the threshold sweeps are not.

## Rules the user dictated this session, and where they now live

All of these are recorded in `RULEBOOK.md` unless noted:

1. **Hand-posted setups** can only be *completed* by the price update or *invalidated* —
   but they **can** be replaced by an auto-generated one. (§ Changing a setup)
2. **The red dot belongs to the setup, not the stock.** Every auto-detected setup carries
   one wherever it is drawn. (§ The dots)
3. **The green dot belongs to the stock** — `checkedOn` records that somebody looked. It
   has **nothing to do with earnings**; that link was removed and must not come back.
   (§ The dots)
4. **A green dot dies when any of the stock's setups is replaced by an auto-detected one**
   — clear `checkedOn` in the same edit. (§ The dots; *not wired up*, hand rule for now)
5. **A bottom you cannot see yet**: while a stock is reverting with no confirmed bottom,
   the main setup stays `forming` — it can still go lower. Post the bearish continuation
   as the main and the post-reversion bullish read as the next one. (§ A bottom you cannot
   see yet)
6. **An invalidation is not a stop.** It marks a trend change, not a trade stop, so
   reward:risk must not be measured confirm→invalidation. (§ An invalidation is not a stop)
7. **The stop moves to the last target the move has already paid.** Invalidation only
   serves as a stop while no target has been reached; after that you are too late.
   (§ The stop moves to the last target the move has already paid)
8. **Where you enter is the trade** — the entry is *at* the invalidation, not mid-range.
   So **an invalidation says: wait for price to come to its level before taking it.** A
   confirmed setup sitting mid-range is a watch, not a signal. (§ Where you enter is the
   trade). This reverses the "Stop distance" conclusion in `CLAUDE.md`, which is corrected
   in place.
9. **Trendlines are endless by nature.** A line extending far past price, even toward
   zero, is not a defect — the drawing is scoped to its own window and we deliberately go
   out months to years for historical structure. Do not clamp spans.
10. **Direction priority**: on a stock the user has called bearish, the bearish setups take
    the slots (CAT); on a bullish one, the bullish patterns with the higher target
    (FTNT). A reading that fights the call does not hold a slot while a better one exists.

## What was posted / changed this session

Setups posted or redrawn by hand, from the source tool's charts: **IREN, INTC, FTNT,
AVGO, FCX, SNDK, CAT, AMZN**, plus the five earlier redraws of setups with negative
trendline anchors. IREN and the stocks checked by hand carry `checkedOn`.

Three new scripts, all validated against the user's own TradingView panels:

- `price_profile.py` — TPO (time-at-price) profile from `public/bars/`. Reports POC,
  VAH/VAL, HVN bands and thin bands (`pocket` vs `shelf`), and writes `profileStop` on
  confirmed setups. **It counts time, not volume** — `write_chart_bars` drops volume, so a
  POC here says price spent a long time there, never that size traded there.
- `matrix_state.py` — port of `indicators/matrix_trend_btr.pine` (daily/weekly rows).
  Validated exactly against PLTR: POWER UP / ABOVE / UP, SMA55 $183.82.
- `reversion.py` — port of `indicators/mean_reversion_zscore.pine`. Five exact
  validations: PLTR, CLS, INTC (out-of-sample), FCX, CAT.

Scoring changes in `pattern_watchlist.py`: `SLOT_OPPOSITE` (second slot prefers the other
direction), `SLOT_UNDONE` / `SLOT_UNDONE_CAP` (a confirmed break price has walked back past
loses its stage credit), a `checkedOn` exemption in `reslot_setups()`, and
`failing_setups()` reporting under 💀.

## What is still open

- **Reward:risk is still measured off the invalidation in three places**, which rules 6–8
  say is wrong: `stop_fault()`'s `MIN_RR = 1.0`, `slot_score()`'s RR term, and
  `weekly_feature.score_setup`'s "+10 at ≥3x". Rewiring them needs a real stop, which
  needs met targets recorded per stock — `data/completedCalls.json` has 30 rows and none
  for most tickers. Not started.
- **`slot_score()`'s "room to target" term rewards distance from the target**, while rule 8
  says entry quality is *proximity to invalidation*. That contradiction is unresolved and
  is the cleanest next piece of work if the user wants the scoring to match the rules.
- **The replacement rule (1) and the dot-expiry rules (4) are documented, not wired.**
  Nothing re-flags a row automatically today.
- **Volume in `write_chart_bars`** would turn the TPO proxy into a real volume profile.
- **News stays paused.**

## How to pick up

```bash
cd /home/user/IsItaBUY_helper
git log --oneline -15                      # what the last session did
python3 pattern_watchlist.py               # dry run: the daily report, all the ⚠ 🪦 💀 📏 lists
python3 review_status.py                   # stale fundamentals queue
npm run lint && npm run build              # tsc --noEmit is what catches field mistakes
```

Posting a setup by hand: follow `PATTERN_RULES.md`, then
`python3 pattern_lines.py --apply` to fit its trendlines, then
`python3 pattern_watchlist.py --apply` so the stage change is recorded. Verify the parse
after every edit — entries are matched on the stock's `name` and a mismatch fails silently.

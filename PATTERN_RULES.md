# Pattern Rules — Pattern Break Watchlist

How each chart pattern on the watchlist is drawn and how its price levels are
set. Every rule below was reverse-engineered from setups posted from the source
tool and checked against real candles (Yahoo, regular session). "Verified" lists
the setups that reproduce exactly.

Code: `pattern_lines.py` (draws/fits the lines), `pattern_watchlist.py`
(stage changes, News). Data: `data/patternWatchlist.ts`.

---

## 1. Rules that apply to every pattern

**Swing points.** A swing high (H) is a candle whose high is the highest of the
candles around it; a swing low (L) the lowest low. One candle on each side is
enough (AMD's Aug 17 high only beats its direct neighbours).

**Timeframes.** A pattern lives on one timeframe: daily, weekly or monthly. Only
a *completed* close on that timeframe counts (weekly = Friday close, monthly =
last trading day). Regular-session prices only, never pre/after-market.

**Stages.**

| Stage | Rule |
|---|---|
| Forming / Waiting | The pattern is drawn, price is still inside it. |
| Signal (Pending) | A completed close beyond the break line. **Signal level** = the break line's value at that candle. A close back inside cancels the signal. |
| Confirmed | A later completed close beyond the signal candle's extreme. **Confirm level** = the signal candle's low (downward break) or high (upward break). |
| Retest | (Ours) A confirmed break that has come back to the boundary it broke, without a completed close back past it. The levels do not change — it is the same setup being tested. It resolves by walking away (back to Confirmed, on toward the target) or by failing. Marked **by hand**: the price run reports a confirmed setup sitting on its boundary but never sets or clears the stage, so a stock cannot flip between the two every session. Everything else treats it as Confirmed — same levels, same target and failure checks. |
| At risk | (Ours) A confirmed break whose own timeframe has closed back past invalidation — the first leg of the failure test, with only the follow-through close outstanding. Set **and cleared by the price run**, unlike `retest`: it turns on a completed close rather than price brushing a line, so it cannot flicker session to session. A close back inside returns it to Confirmed. `stageDate` keeps the confirmation date and `updateDate` holds the at-risk date, as for Needs updating. Levels, target and failure rule are unchanged. Marking it **failed** stays a hand call. |
| Target reached | Price *touches* the target (intraday high/low counts). |
| Failed | A completed close back past invalidation, then a follow-through close beyond that candle's extreme. |
| Needs updating | (Ours) A pending setup closed past one of its limits; a new setup must be posted. |

Only a completed close on the setup's *own* timeframe counts for At risk, so a monthly setup trading past its invalidation mid-month stays Confirmed and the row shows "Monthly close pending" instead.

**Target** = signal level ± the pattern's height (measured move), in the break
direction. **Invalidation** = where the idea is wrong (per pattern, below).

**Enough room to be worth taking.** A setup whose target sits within **10%** of
its confirmation level is skipped. The confirmation level is what you would act
on, so that is where the room is measured from — LMT's daily ascending channel
asked for a close above $608.00 for a $610.97 target, half a percent of move for
a full call. The same floor applies on every timeframe: a weekly or monthly
pattern that only promises 10% is worth less, not more, for the time it takes.
A two-way (still forming) setup is measured on both of its sides and judged at
the narrower one. `pattern_detect.py` will not emit a setup below the floor;
`python3 pattern_watchlist.py --thin` lists the stored ones and drops the
auto-detected ones (`--thin --apply`), leaving anything posted by hand for a
human to replace.

**Several setups per stock.** Every pattern × timeframe that satisfies its rules
is its own setup, and a stock can have several at once, even pointing opposite
ways. Example, IREN: weekly Rising Wedge (down, confirmed), weekly Ascending
Channel (down, confirmed), weekly Falling Wedge (up, at risk), monthly Inverted
Hammer (forming). Each has its own lines, levels, stage and News posts.

---

## 2. Ascending Channel / Descending Channel

- **Shape:** two **parallel** lines. Ascending: both rise. Descending: both fall.
  Price swings between them.
- **Drawing:** one line through **two** swing points; the other line parallel to
  it through **one** swing point on the opposite side. (When the broken line
  only touches once, it runs through that swing point and is aimed at the
  signal level at the signal candle; the parallel then goes through the
  opposite swing point. SNDK.)
- **Usual break:** Ascending → downward (lower line). Descending → upward (upper
  line). Either can be tracked in both directions while forming.
- **Height:** vertical distance between the lines (constant).
- **Levels:** signal = break line at the signal candle · confirm = signal
  candle's low/high · target = signal ∓ height · invalidation = the broken line's
  value at the latest candle ("close back inside the channel").
- **Forming (either direction):** breaks up = upper line now, breaks down = lower
  line now, goal up = breaks up + height, goal down = breaks down − height.
- **Verified:** AGCO (target $95.77 = $120.66 − $24.89), MU, SNDK, plus ~30 more.

## 3. Rising Wedge / Falling Wedge

- **Shape:** two **converging** lines. Rising: both rise, the lower faster (the
  top can be flat, IREN). Falling: both fall, the upper faster (the bottom can be
  flat).
- **Drawing:** upper line through **two swing highs**, lower line through **two
  swing lows** (the H / L markers on the source chart).
- **Usual break:** Rising → downward. Falling → upward.
- **Height:** distance between the lines **where the pattern starts** (its widest
  point, at the earliest of the four swing points).
- **Levels:** signal = break line at the signal candle · confirm = signal
  candle's low/high · target = signal ± starting height · invalidation = the
  lower line's value at the latest candle for upward breaks (the pattern's
  floor); the far line for downward breaks.
- **Verified:** AMD weekly falling wedge exactly — swing highs Jun 29 / Aug 17,
  lows Jun 8 / Jul 27; signal $488.47, target $664.85, invalidation $401.41.
  Also QQQ, IREN, META, COST, GE, TWLO and others.

## 4. Symmetrical Triangle / Megaphone

- **Shape:** two **non-parallel** lines sloping in **opposite** directions.
  *Symmetrical Triangle* (thinning): upper falls, lower rises — they converge.
  *Megaphone* (widening; also called a broadening formation or expanding
  triangle): upper rises, lower falls — they diverge.
- **Drawing:** upper line through **two swing highs**, lower line through **two
  swing lows**, same as a wedge (§3).
- **Usual break:** neither shape predicts its own direction, so both are tracked
  **both ways** while forming, like a channel — breaks up = upper line now,
  breaks down = lower line now.
- **Height:** the pattern's **widest** width. For a Symmetrical Triangle that is
  where it starts (the earliest of the four swing points, as in §3). For a
  Megaphone it is at the **break candle**, because the shape widens with time.
- **Levels:** signal = break line at the signal candle · confirm = signal
  candle's low/high · target = signal ± height · invalidation = the broken
  line's value at the latest candle ("close back inside"), as for channels.
- **Not a wedge.** A wedge's two lines slope the **same** way (§3: rising =
  both rise, falling = both fall; the far line may be flat). A *rising* lower
  line under a *falling* upper line is a Symmetrical Triangle. DAVE's weekly
  setup was mislabelled a Falling Wedge on exactly this — its lower line rose
  from $298.44 to $314.61 while the upper fell from $458.25 to $321.19.
- **Sanity check:** a very tall thinning triangle fails the measured move. DAVE's
  year-long version starts $376 wide against a ~$355 spot, so the downward
  target lands below zero; the detector's `MIN_TARGET` guard drops these.

---

## 5. Head & Shoulders (top) / Inverse Head & Shoulders

- **Shape:** three peaks; the middle one (head) highest, the shoulders lower and
  roughly level. Inverse: three troughs, the middle one lowest.
- **Drawing:** the **neckline** runs through the **closes** of the two troughs
  between the shoulders and the head (inverse: the closes of the two peaks).
- **Break:** top → downward through the neckline; inverse → upward.
- **Height:** head's high minus the neckline at the head (inverse: neckline minus
  the head's low).
- **Levels:** signal = neckline at the signal candle · confirm = signal candle's
  low/high · target = signal ∓ height · invalidation = the neckline at the latest
  candle.
- **Verified:** CRWV daily — neckline through the Sep 2 ($80.93) and Sep 17
  ($79.88) closes, head Sep 8 $104.59; signal $77.99, target $54.01.
- Inverse H&S follows by symmetry (not yet seen in our data).

## 6. Candle patterns (single- and multi-candle reversals)

The pattern is the candle (or the two or three candles) itself — **no trendlines**.

**Context decides the direction, not the shape.** The same shape is bullish after
a decline and bearish after an advance, which is why each row below is a pair.
A candle pattern only counts at the end of a move: a decline for the bullish
reading, an advance for the bearish one.

### Shapes

**Single candle** — one long wick at least 2× the body, the opposite wick no more
than 30% of the candle's range:

| Long wick | After a decline (upward) | After an advance (downward) |
|---|---|---|
| Lower | **Hammer** | **Hanging Man** |
| Upper | **Inverted Hammer** | **Topping Tail** |

*Topping Tail* is the name this project uses; the standard literature calls the
same candle a **Shooting Star**. It is the Inverted Hammer's shape read at a top.

**Bald candle (Marubozu)** — the body spans essentially the whole range, with no
meaningful wick at either end. *Bullish Bald Candle*: opens at or near its low and
closes at or near its high. *Bearish Bald Candle*: the mirror. One side being bald
is enough to name it; what matters is that the period closed at its extreme with no
rejection. Unlike the wick patterns above it needs no prior move — it is a
continuation signal as often as a reversal — so direction comes from the candle
itself, not from the trend into it.

**Two candles**

- **Bullish Engulfing:** after a decline, a down candle, then an up candle whose
  body covers the previous body completely.
- **Bearish Engulfing:** after an advance, an up candle, then a down candle whose
  body covers the previous body completely.

**Three candles**

- **Morning Star** (upward, after a decline): a long down candle, a small-bodied
  candle, then a long up candle closing at least halfway into the first body.
- **Evening Star** (downward, after an advance): the mirror image.
- **Three White Soldiers** (upward): three long up candles, each closing above the
  last, each with a small upper wick.
- **Three Black Crows** (downward): the mirror image.

**Doji** (a body under 5% of the candle's range) means indecision, not direction.
It is deliberately **not** a setup on its own — there is nothing to aim at. Note
it in prose if it matters; do not post it.

### Levels

Across the pattern's candles let **range** = highest high − lowest low, and
**extreme** = that highest high (upward) or lowest low (downward).

- **confirm** = a completed close beyond the extreme
- **invalidation** = the opposite end of the range
- **target** = extreme ± range

This is the §6 hammer rule generalised, and it reproduces the verified example
exactly — SPCX daily hammer, Oct 15 (high $149.04, low $140.66, range $8.38):
confirm $149.04, invalidation $140.66, target $157.42. It also reproduces the source
tool's monthly Bullish Bald Candle on ENVA to the cent: range $242.93 − $158.38 =
$84.55, target $242.93 + $84.55 = $327.48.

### Reliability

Published win rates for these patterns disagree between sources and methodologies,
so none are quoted here. Multi-candle patterns are generally held to be steadier
than single-candle ones, and every source stresses that context — the prior trend,
nearby levels, volume — decides whether a candle means anything. Treat a candle
setup as the weakest evidence on a chart: where one disagrees with a channel or
wedge on the same timeframe, the trendline pattern wins.

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
| Target reached | Price *touches* the target (intraday high/low counts). |
| Failed | A completed close back past invalidation, then a follow-through close beyond that candle's extreme. |
| Needs updating | (Ours) A pending setup closed past one of its limits; a new setup must be posted. |

**Target** = signal level ± the pattern's height (measured move), in the break
direction. **Invalidation** = where the idea is wrong (per pattern, below).

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

## 4. Head & Shoulders (top) / Inverse Head & Shoulders

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

## 5. Hammer / Inverted Hammer (single-candle reversals)

- **Hammer:** after a decline, a candle with a long **lower** wick (at least 2×
  the body) and little or no upper wick.
- **Inverted Hammer:** after a decline, a long **upper** wick (at least 2× the
  body) and little or no lower wick.
- **No trendlines:** the pattern is the candle itself.
- **Levels (upward):** confirm = a completed close above the candle's high ·
  invalidation = the candle's low · target = the high + the candle's full range
  (high − low).
- **Verified:** SPCX daily hammer, Oct 15 (high $149.04, low $140.66): confirm
  $149.04, invalidation $140.66, target $157.42 = $149.04 + $8.38.
- Inverted Hammer uses the same levels by symmetry of the rule above (not yet
  seen in our data); a bearish version after a rise mirrors them downward.

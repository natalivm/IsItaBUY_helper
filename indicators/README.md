# TradingView indicators

The Pine sources behind the panels referenced in `data/patternWatchlist.ts` notes. They
are kept here so the readings those notes quote can eventually be **computed** rather than
read off a screenshot — nothing in this repo runs them yet.

| file | panel on the charts |
|---|---|
| `matrix_trend_btr.pine` | Matrix BTR / the "MATRIX BTM" dashboard, the cloud, the yellow MA and the BUY / SELL triangles |
| `mean_reversion_zscore.pine` | MeanRev: z-score, half-life, variance ratio, Hurst, regime |

## What a Python port could reproduce

Our candles (`public/bars/TICKER_{daily,weekly,monthly}.json`) carry `t/o/h/l/c` and **no
volume**, so anything volume-based is out.

**MeanRev: verified, not just portable.** Reproduced against the live panel on CLS (NYSE,
50-bar lookback):

| | panel | port |
|---|---|---|
| variance ratio q=4 | .99 | **0.99** |
| Hurst | .50 | **0.50** |
| half-life | 118.3 | **117.0** |
| z-score | −1.56 | −2.20 raw, the gap being the 5-bar EMA |

**The half-life must be fitted to the SMOOTHED z**, not the raw one — that single choice
moves it from 11.3 bars to 117.0. Not a near-miss but an order of magnitude, and worth
knowing before porting the rest: a rolling statistic computed on the wrong series is a
different number, not an approximate one.

**Run it on the listing you trade.** CLS gives a different *verdict* on each line. TSX/CAD
reads half-life 57.7, variance ratio 1.14, Hurst .55 — "trending, fades are dangerous" —
while NYSE/USD reads 118.3, .99, .50 and says "reverting". Same company, same day, opposite
labels, because the FX layer is part of the series. Both still trip `hlGate` (half-life above
the 50-bar lookback), so neither plots a turn dot, which is why that chart shows no bottoming
signal on either.

**Matrix BTR: the daily and weekly parts.** On those timeframes `fastChart` is false, so
the profile resolves to a 9/80/160 cloud shifted 3 bars and a **55 SMA** — which is what
the APP dashboard's "Price / SMA 55" row shows. The cloud bias, the MA rows, the RSI gates
and the RSI + cloud engine's BUY / SELL all follow from OHLC.

**Not reproducible here:** every intraday timeframe (the 5m / 10m / 15m / 1H / 4H RSI
column in the screenshots), the previous-day lines, which are 15m-only, and the manual
Matrixchannel zone engine, which takes hand-entered levels rather than deriving them.

## Why port it at all

Three uses, in order of value:

1. **Backtest the signal.** `pattern_backtest.py` already replays 1,717 confirmed setups
   walk-forward. Adding a Matrix state as a filter would answer whether "no buy signal
   yet" actually improves the hit rate — right now it is a plausible-sounding confirmation
   with no measured value attached.
2. **Carry it on the ledger** beside `rsi` and `trend`, so the watchlist can sort and
   filter on it instead of checking chart by chart.
3. **Score it** in `weekly_feature.score_setup`, once (1) says what it is worth.

A port must be checked against the panels before it is trusted: reproduce the current
reading on APP, CRDO and LITE first, and only then measure anything with it.

## Provenance

Both files are the user's own work, saved verbatim. The Matrix file's own header states it
is an approximation built from supplied instructions and not a reconstruction of the
original author's price-level engine; the MeanRev header documents which defaults were
matched to a reference pane by eye rather than fitted to data. Keep those caveats attached
to any number either one produces.

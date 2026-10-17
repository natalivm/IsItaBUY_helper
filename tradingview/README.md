# TradingView scripts

## `RSI_MultiTF_60_40.pine` — RSI Multi-TF 60/40 Alerts

Pine Script **v6** indicator: standard RSI + RSI-based MA + a higher-timeframe RSI, with 60/40 momentum levels and alerts.

### Install
1. TradingView → **Pine Editor** (bottom panel) → **Open → New indicator**.
2. Replace everything with the contents of `RSI_MultiTF_60_40.pine` → **Save** → **Add to chart**.

### What's on the pane
| Element | Default |
|---|---|
| RSI (purple; green above 60, red below 40) | 14, close |
| RSI-based MA (yellow) | SMA 14 (also EMA / RMA / WMA / VWMA / SMA + Bollinger Bands / None) |
| HTF RSI (thin dashed blue step line) | **Auto**: ≤1m→15m, ≤5m→1h, ≤1h→4h, ≤4h→D, D→W, W→M |
| Levels | 70 / 60 / 50 / 40 / 30 |
| Triangles | RSI breaks above 60 (HTF RSI ≥ 50) / below 40 (HTF RSI ≤ 50) |
| Background tint | chart RSI **and** HTF RSI both > 60 (green) or both < 40 (red) |
| Divergences | off by default |

### Alerts
- **Per-event**: Create alert → Condition = this indicator → pick an event (e.g. "RSI breaks above bull level (60)") → set **Once Per Bar Close**.
- **All-in-one**: Create alert → pick **"Any alert() function call"**. It sends one message per bar listing every event ticked in the *alert() events* settings group, with live RSI / HTF RSI values.

### Best practices applied (and why)
| Pitfall commonly reported by Pine users | How the script handles it |
|---|---|
| **HTF repainting** — `request.security()` shows the still-forming HTF bar live, but finished values in history, so backtests look better than realtime | PineCoders method: expression offset `[1]` **plus** `lookahead_on`. Only confirmed HTF bars are used, so history and realtime match. You can switch it off to get a faster line that repaints. |
| **`lookahead_on` without an offset** leaks future data into history | Never used without the `[1]` offset. |
| Requesting a timeframe **lower or equal** to the chart returns junk | The HTF line is hidden and an on-chart warning label explains why. |
| **Intrabar signals** appear and disappear before the bar closes | "Signals on bar close only" (default ON) gates markers and alerts with `barstate.isconfirmed`. `alert()` uses `alert.freq_once_per_bar_close`. |
| **Pine v6 lazy `and` / `or`**: a `ta.*` call on the right of `and` gets skipped on some bars and its history breaks | Every `ta.*` call runs at global scope on every bar. The booleans are combined afterwards. (The built-in RSI's divergence code needed this rewrite.) |
| Several `alert()` calls on one bar can be dropped | One `alert()` call per bar with a combined message. |
| Divergences "repaint" | They are pivot-based, so they are only *known* `Pivot right` bars later. They are drawn back on the pivot, and their alerts arrive late. This is documented in the tooltip. |

### Why 60/40
Andrew Cardwell and Constance Brown described an **RSI range shift**. In uptrends RSI tends to hold the 40–80 range, so 40 acts as support and pushes above 60 confirm strength. In downtrends it tends to stay in 20–60, so 60 acts as resistance. A break of 60 or 40 is a momentum regime signal, not an overbought/oversold call. That is why the momentum marks need the higher-timeframe RSI to agree.

### Sources
- PineCoders — [Higher-timeframe requests](https://www.tradingview.com/script/W1YpYcOI-Higher-timeframe-requests/)
- PineCoders FAQ — [How to avoid repainting when using security()](https://vn.tradingview.com/script/cyPWY96u-How-to-avoid-repainting-when-using-security-PineCoders-FAQ/)
- Pine docs — [Other data and timeframes FAQ](https://tradingview.com/pine-script-docs/faq/other-data-and-timeframes)
- [Pine Script repainting: why it happens](https://crosstrade.io/blog/pine-script-repainting) (its `barstate.isconfirmed ? 0 : 1` security trick is outdated; PineCoders now advise against it)
- PineCoders [Alerts library](https://www.tradingview.com/script/ukFhL5WK-Alerts/) — gating alerts with `barstate.isconfirmed`

---

## `MACD_MultiTF.pine` — MACD Multi-TF Alerts

Classic MACD (12 / 26 / 9, EMA) in the same style and with the same safeguards as the RSI script (the higher timeframe never repaints, signals fire on closed bars only, one combined `alert()`).

### What's on the pane
| Element | Meaning |
|---|---|
| **Purple line** | MACD (fast EMA − slow EMA) |
| **Yellow line** | Signal (9-bar EMA of MACD) |
| **Soft fill between them** | green while MACD > signal, red while below |
| **Histogram** | MACD − signal. Solid = momentum growing away from zero; faded = shrinking back toward zero |
| **Dotted line** | Zero |
| **▲ / ▼** | MACD crosses its signal, shown only when the higher-timeframe MACD agrees (optional: bull crosses only below zero / bear only above) |
| **Background tint** | both timeframes have MACD above signal **and** above zero (green), or below both (red) |
| Divergences | off by default |

The higher-timeframe MACD is used as a filter and for the tint, but it is **not drawn**. Its values are on a much larger scale and would squash the pane. Its values appear in the Data Window.

### Alerts
The setup is the same as the RSI script. Per-event conditions: bullish / bearish cross, zero-line crosses, histogram turns, multi-TF alignment and divergences. Or use **"Any alert() function call"** for a single combined alert.

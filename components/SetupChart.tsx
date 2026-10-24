import React, { useEffect, useRef, useState } from 'react';
import type { IChartApi, Time } from 'lightweight-charts';

// Candle chart for an expanded watchlist row: the setup's price levels as
// labelled lines, optional trendlines, and a marker on the stage date.
// Candles come from public/bars/TICKER_timeframe.json, written by the daily
// price job (pattern_watchlist.write_chart_bars). The charting library is
// loaded on first use so it stays out of the main bundle.

export interface ChartLevel {
  price: number;
  label: string;
  tone: 'up' | 'down' | 'muted' | 'target';
  solid?: boolean;
}

export interface ChartMarker {
  date: string;
  text: string;
  tone: 'up' | 'down' | 'muted';
  above: boolean;
}

export type TrendLine = { from: [string, number]; to: [string, number] };

interface Bars { t: string[]; o: number[]; h: number[]; l: number[]; c: number[] }

// Bars visible on open, per timeframe (the rest is a scroll/zoom away).
const VISIBLE: Record<string, number> = { daily: 90, weekly: 52, monthly: 60 };

const cssVar = (el: Element, name: string) => getComputedStyle(el).getPropertyValue(name).trim();

const SetupChart: React.FC<{
  ticker: string;
  timeframe: string;
  levels: ChartLevel[];
  marker?: ChartMarker;
  lines?: TrendLine[];
}> = ({ ticker, timeframe, levels, marker, lines }) => {
  const box = useRef<HTMLDivElement>(null);
  // Redraw only when the drawn data actually changes, not on every parent render.
  const spec = JSON.stringify([levels, marker, lines]);
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    let chart: IChartApi | null = null;
    let observer: MutationObserver | null = null;
    let resizer: ResizeObserver | null = null;
    let cancelled = false;

    (async () => {
      let bars: Bars;
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}bars/${ticker}_${timeframe}.json`);
        if (!res.ok) throw new Error(String(res.status));
        bars = await res.json();
      } catch {
        if (!cancelled) setState('missing');
        return;
      }
      const lc = await import('lightweight-charts');
      if (cancelled || !box.current || !bars.t.length) return;
      const el = box.current;

      const palette = () => ({
        bg: cssVar(el, '--surface'), fg: cssVar(el, '--muted'), grid: cssVar(el, '--line'),
        up: cssVar(el, '--up'), down: cssVar(el, '--down'), muted: cssVar(el, '--faint'),
        target: cssVar(el, '--target'),
      });
      let pal = palette();

      chart = lc.createChart(el, {
        autoSize: true,
        layout: { background: { type: lc.ColorType.Solid, color: pal.bg }, textColor: pal.fg, fontFamily: 'IBM Plex Mono, ui-monospace, monospace', attributionLogo: true },
        grid: { vertLines: { color: pal.grid }, horzLines: { color: pal.grid } },
        rightPriceScale: { borderColor: pal.grid },
        timeScale: { borderColor: pal.grid, rightOffset: 6 },
        crosshair: { mode: lc.CrosshairMode.Normal },
        handleScroll: { vertTouchDrag: false },
      });

      // Keep every level in view unless it is far outside the candles (extreme targets).
      const lo = Math.min(...bars.l), hi = Math.max(...bars.h);
      const inView = levels.map(l => l.price).filter(p => p >= lo * 0.5 && p <= hi * 1.6);
      const candles = chart.addSeries(lc.CandlestickSeries, {
        upColor: pal.up, downColor: pal.down, wickUpColor: pal.up, wickDownColor: pal.down, borderVisible: false,
        // The current price gets its own green line below, so suppress the series'
        // default last-value tag -- otherwise the axis shows two labels for it.
        priceLineVisible: false,
        lastValueVisible: false,
        autoscaleInfoProvider: (original: () => { priceRange: { minValue: number; maxValue: number } } | null) => {
          const r = original();
          if (!r || !inView.length) return r;
          return { ...r, priceRange: { minValue: Math.min(r.priceRange.minValue, ...inView), maxValue: Math.max(r.priceRange.maxValue, ...inView) } };
        },
      });
      candles.setData(bars.t.map((t, i) => ({ time: t as Time, open: bars.o[i], high: bars.h[i], low: bars.l[i], close: bars.c[i] })));

      const toneColor = (t: ChartLevel['tone']) =>
        t === 'up' ? pal.up : t === 'down' ? pal.down : t === 'target' ? pal.target : pal.muted;

      // Where price is now: green, so it reads apart from the setup's own levels.
      const nowLine = candles.createPriceLine({
        price: bars.c[bars.c.length - 1], color: pal.up, lineWidth: 1,
        lineStyle: lc.LineStyle.Dotted, axisLabelVisible: true, title: 'Now',
      });
      const priceLines = levels.map(l => candles.createPriceLine({
        price: l.price, color: toneColor(l.tone), lineWidth: l.solid ? 2 : 1,
        lineStyle: l.solid ? lc.LineStyle.Solid : lc.LineStyle.Dashed, axisLabelVisible: true, title: l.label,
      }));

      // Snap a date to the candle that contains it (weekly / monthly bars are dated at their start).
      const snap = (d: string) => { let t = bars.t[0]; for (const x of bars.t) { if (x <= d) t = x; else break; } return t; };

      // Trendlines run to the newest candle: extend past their stored end at the same slope per bar.
      const lastIdx = bars.t.length - 1;
      const idxOf = (d: string) => bars.t.indexOf(snap(d));
      for (const ln of lines ?? []) {
        const s = chart.addSeries(lc.LineSeries, {
          color: cssVar(el, '--trend'), lineWidth: 2, lineStyle: lc.LineStyle.LargeDashed,
          priceLineVisible: false, lastValueVisible: false, crosshairMarkerVisible: false,
        });
        const i0 = idxOf(ln.from[0]), i1 = idxOf(ln.to[0]);
        const perBar = i1 > i0 ? (ln.to[1] - ln.from[1]) / (i1 - i0) : 0;
        const endIdx = Math.max(i1, lastIdx);
        s.setData([
          { time: bars.t[i0] as Time, value: ln.from[1] },
          { time: bars.t[endIdx] as Time, value: ln.from[1] + perBar * (endIdx - i0) },
        ]);
      }

      if (marker && marker.date >= bars.t[0]) {
        lc.createSeriesMarkers(candles, [{
          time: snap(marker.date) as Time, position: marker.above ? 'aboveBar' : 'belowBar',
          color: toneColor(marker.tone), shape: marker.above ? 'arrowDown' : 'arrowUp', text: marker.text,
        }]);
      }

      // ~7px per candle, so a phone — or the narrow panel beside the setup list —
      // opens on fewer bars than a wide desktop column.
      const n = bars.t.length;
      const fitRange = () => {
        const show = Math.min(VISIBLE[timeframe] ?? 90, Math.max(20, Math.floor(el.clientWidth / 7)));
        chart?.timeScale().setVisibleLogicalRange({ from: Math.max(0, n - show), to: n + 5 });
      };
      fitRange();
      setState('ready');

      // On resize keep the candles their size and drop older bars off the left,
      // rather than squeezing the whole window into a narrower box.
      let frame = 0;
      resizer = new ResizeObserver(() => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(fitRange);
      });
      resizer.observe(el);

      // Follow the app's light/dark toggle.
      observer = new MutationObserver(() => {
        if (!chart) return;
        pal = palette();
        chart.applyOptions({
          layout: { background: { type: lc.ColorType.Solid, color: pal.bg }, textColor: pal.fg },
          grid: { vertLines: { color: pal.grid }, horzLines: { color: pal.grid } },
          rightPriceScale: { borderColor: pal.grid }, timeScale: { borderColor: pal.grid },
        });
        candles.applyOptions({ upColor: pal.up, downColor: pal.down, wickUpColor: pal.up, wickDownColor: pal.down });
        priceLines.forEach((pl, i) => pl.applyOptions({ color: toneColor(levels[i].tone) }));
        nowLine.applyOptions({ color: pal.up });
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      resizer?.disconnect();
      chart?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticker, timeframe, spec]);

  return (
    <div className="chart-box">
      <div ref={box} className="chart" />
      {state !== 'ready' && (
        <div className="chart-msg">{state === 'loading' ? 'Loading chart…' : 'Chart not available yet — candles are added by the next price run.'}</div>
      )}
    </div>
  );
};

export default SetupChart;

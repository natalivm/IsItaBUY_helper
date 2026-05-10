import React, { useEffect, useRef } from 'react';

interface Props {
  ticker: string;
  /** Date range shown by default. */
  dateRange?: '1D' | '1M' | '3M' | '12M' | '60M' | 'ALL';
  /** Pixel height of the chart. */
  height?: number;
  /** Hex color (e.g. "#1877F2") that becomes the chart line color. */
  themeColor?: string;
}

/**
 * Compact TradingView "Mini Symbol Overview" widget for a single ticker.
 * Loads the TradingView script once per mount via a tiny inline DOM injection.
 * Re-mounts cleanly when the ticker changes.
 */
const TradingViewMiniChart: React.FC<Props> = ({
  ticker,
  dateRange = '12M',
  height = 220,
  themeColor,
}) => {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = container.current;
    if (!node) return;

    // Clear any prior render so we don't stack scripts on ticker change.
    node.innerHTML = '';

    const widgetWrap = document.createElement('div');
    widgetWrap.className = 'tradingview-widget-container__widget';
    node.appendChild(widgetWrap);

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
    script.innerHTML = JSON.stringify({
      symbol: ticker,
      width: '100%',
      height,
      locale: 'en',
      dateRange,
      colorTheme: 'dark',
      isTransparent: true,
      autosize: false,
      largeChartUrl: '',
      trendLineColor: themeColor || 'rgba(56,189,248,1)',
      underLineColor: themeColor ? `${themeColor}1A` : 'rgba(56,189,248,0.10)',
      underLineBottomColor: 'rgba(56,189,248,0)',
    });
    node.appendChild(script);

    return () => {
      node.innerHTML = '';
    };
  }, [ticker, dateRange, height, themeColor]);

  return (
    <div
      ref={container}
      className="tradingview-widget-container"
      style={{ minHeight: height }}
    />
  );
};

export default TradingViewMiniChart;

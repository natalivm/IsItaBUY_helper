import React from 'react';
import { motion } from 'motion/react';
import { TickerDefinition } from '../types';
import { StockGroup } from '../constants';
import { cn, rsRatingStyle } from '../utils';
import BurryBadge from './BurryBadge';
import EarningsBadge from './EarningsBadge';

export interface StockRowData {
  ticker: string;
  fairPriceRange: string;
  baseTarget: number;
  baseUpside: number;
  rsRating: number;
  label: string;
  color: string;
  dot: string;
  aiImpact: string;
  group: StockGroup;
}

interface Props {
  stock: StockRowData;
  tickerDef: TickerDefinition;
  animationIndex: number;
  onSelect: (ticker: string) => void;
}

const StockRow: React.FC<Props> = ({ stock, tickerDef, animationIndex, onSelect }) => {
  const isAvoid = stock.group === 'AVOID';
  const upsidePct = stock.baseUpside * 100;
  return (
    <motion.button
      key={stock.ticker}
      layout
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: animationIndex * 0.02 }}
      onClick={() => onSelect(stock.ticker)}
      className="w-full flex items-center gap-4 py-3 px-4 group transition-all duration-300 border-b border-slate-800/50 hover:bg-white/5 text-left"
    >
      {/* Dot */}
      <div className={cn("w-3 h-3 rounded-full flex-shrink-0", stock.dot)} />

      {/* Ticker */}
      <span className="text-2xl lg:text-3xl font-black transition-colors tracking-tighter flex-shrink-0 flex items-center gap-1 w-28 text-white group-hover:text-[#ff007f]">
        {isAvoid && <span className="hidden group-hover:inline text-xl text-red-400">⚠</span>}
        {stock.ticker}
      </span>

      {/* Prices + upd tag */}
      <div className="flex-shrink-0 flex flex-col items-start w-56">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold mono text-blue-400">
            ${tickerDef.currentPrice.toFixed(2)}
          </span>
          <span className="text-slate-600 text-sm">→</span>
          <span className="text-base font-bold mono text-slate-300">
            ${stock.baseTarget.toFixed(0)}
          </span>
          <span className={cn(
            "text-xs font-black",
            upsidePct >= 0 ? "text-emerald-400" : "text-rose-400"
          )}>
            {upsidePct >= 0 ? '+' : ''}{upsidePct.toFixed(0)}%
          </span>
        </div>
        {tickerDef.updatedOn && (
          <span className="text-[10px] font-medium text-slate-500 border border-slate-800 rounded px-1.5 py-0.5 mt-1">
            upd {tickerDef.updatedOn}
          </span>
        )}
      </div>

      {/* Rating label */}
      <span className={cn("text-xs font-black uppercase tracking-widest flex-shrink-0 w-28", stock.color)}>
        {stock.label}
      </span>

      {/* RS badge */}
      <span className={cn(
        "text-sm font-bold mono border rounded px-1.5 py-0.5 flex-shrink-0",
        rsRatingStyle(tickerDef.rsRating)
      )}>
        RS {tickerDef.rsRating}
      </span>

      {/* Burry badge */}
      <BurryBadge tickerDef={tickerDef} />

      {/* Sector */}
      <span className="text-sm font-medium truncate text-slate-400">
        {tickerDef.sector.split(/\s[·\/]\s/)[0]}
      </span>

      {/* Quarterly earnings badge */}
      {tickerDef.lastReportTag && (
        <div className="ml-auto flex-shrink-0">
          <EarningsBadge tickerDef={tickerDef} dimmed={isAvoid} />
        </div>
      )}
    </motion.button>
  );
};

export default StockRow;

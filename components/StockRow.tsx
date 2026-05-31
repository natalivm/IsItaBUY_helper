import React from 'react';
import { motion } from 'motion/react';
import { TickerDefinition } from '../types';
import { StockGroup } from '../constants';
import { cn, rsRatingStyle } from '../utils';
import BurryBadge from './BurryBadge';

export interface StockRowData {
  ticker: string;
  fairPriceRange: string;
  baseTarget: number;
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
  return (
    <motion.button
      key={stock.ticker}
      layout
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: animationIndex * 0.02 }}
      onClick={() => onSelect(stock.ticker)}
      className={cn(
        "w-full flex items-end gap-4 py-3 px-4 group transition-all duration-300 border-b border-slate-800/50 hover:bg-white/5 text-left",
        isAvoid && "opacity-60"
      )}
    >
      {/* Dot */}
      <div className={cn("w-3 h-3 rounded-full flex-shrink-0 mb-1", stock.dot)} />

      {/* Ticker */}
      <span className={cn(
        "text-2xl lg:text-3xl font-black transition-colors tracking-tighter flex-shrink-0 flex items-center gap-1 w-28",
        isAvoid ? "text-slate-600 group-hover:text-slate-500" : "text-white group-hover:text-[#ff007f]"
      )}>
        {isAvoid && <span className="hidden group-hover:inline text-xl text-red-400">⚠</span>}
        {stock.ticker}
      </span>

      {/* Prices + upd tag */}
      <div className="flex-shrink-0 flex flex-col items-start w-48">
        <div className="flex items-baseline gap-3">
          <span className={cn("text-base font-bold mono", isAvoid ? "text-blue-400/40" : "text-blue-400")}>
            ${tickerDef.currentPrice.toFixed(2)}
          </span>
          <span className="text-slate-600 text-sm">→</span>
          <span className={cn("text-base font-bold mono", isAvoid ? "text-slate-300/40" : "text-slate-300")}>
            ${stock.baseTarget.toFixed(0)}
          </span>
        </div>
        {tickerDef.updatedOn && (
          <span className="text-[10px] font-medium text-slate-500 border border-slate-800 rounded px-1.5 py-0.5 mt-1">
            upd {tickerDef.updatedOn}
          </span>
        )}
      </div>

      {/* Rating label */}
      <span className={cn("text-xs font-black uppercase tracking-widest flex-shrink-0 w-28 mb-0.5", stock.color)}>
        {stock.label}
      </span>

      {/* RS badge */}
      <span className={cn(
        "text-sm font-bold mono border rounded px-1.5 py-0.5 flex-shrink-0 mb-0.5",
        rsRatingStyle(tickerDef.rsRating)
      )}>
        RS {tickerDef.rsRating}
      </span>

      {/* Burry badge */}
      <BurryBadge tickerDef={tickerDef} dimmed={isAvoid} />

      {/* Sector */}
      <span className={cn("text-sm font-medium truncate mb-0.5", isAvoid ? "text-slate-400/40" : "text-slate-400")}>
        {tickerDef.sector.split(/\s[·\/]\s/)[0]}
      </span>

      {/* Report tag */}
      {tickerDef.lastReportTag && (
        <span className="text-sm font-bold text-white border border-emerald-700/60 bg-emerald-950/70 rounded px-1.5 py-0.5 flex-shrink-0 ml-auto mb-0.5">
          {tickerDef.lastReportTag}
        </span>
      )}
    </motion.button>
  );
};

export default StockRow;

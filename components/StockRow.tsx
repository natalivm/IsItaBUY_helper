import React from 'react';
import { motion } from 'motion/react';
import { TickerDefinition } from '../types';
import { StockGroup } from '../constants';
import { cn, rsRatingStyle } from '../utils';

export interface StockRowData {
  ticker: string;
  fairPriceRange: string;
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
        "w-full flex items-center gap-4 py-4 px-4 group transition-all duration-300 border-b border-slate-800/50 hover:bg-white/5 text-left",
        isAvoid && "opacity-60"
      )}
    >
      <div className={cn("w-3 h-3 rounded-full flex-shrink-0", stock.dot)}></div>
      <span className={cn(
        "text-2xl lg:text-3xl font-black transition-colors tracking-tighter flex-shrink-0 flex items-center gap-1",
        isAvoid
          ? "text-slate-600 group-hover:text-slate-500 w-32"
          : "text-white group-hover:text-[#ff007f] w-28"
      )}>
        {isAvoid && <span className="hidden group-hover:inline text-xl text-red-400">{'\u26A0'}</span>}
        {stock.ticker}
      </span>
      <div className="w-24 flex-shrink-0 flex flex-col">
        <span className={cn("text-base font-bold mono", isAvoid ? "text-blue-400/40" : "text-blue-400")}>${tickerDef.currentPrice.toFixed(2)}</span>
        {tickerDef.updatedOn && (
          <span className="text-xs font-medium text-slate-500 border border-slate-700 rounded px-1.5 py-0.5 mt-0.5 self-start">
            upd {tickerDef.updatedOn}
          </span>
        )}
      </div>
      <div className="flex flex-col w-28 flex-shrink-0">
        <span className={cn("text-xs font-black uppercase tracking-widest", stock.color)}>{stock.label}</span>
      </div>
      <span className={cn(
        "text-sm font-bold mono border rounded px-1.5 py-0.5 flex-shrink-0",
        rsRatingStyle(tickerDef.rsRating)
      )}>RS {tickerDef.rsRating}</span>
      <span className={cn("text-sm font-bold mono", isAvoid ? "text-slate-300/40" : "text-slate-300")}>{stock.fairPriceRange}</span>
      <span className={cn("text-sm font-medium truncate", isAvoid ? "text-slate-400/40" : "text-slate-400")}>{tickerDef.sector.split(/\s[·\/]\s/)[0]}</span>
    </motion.button>
  );
};

export default StockRow;


import React from 'react';
import { ProjectionData, ValuationModelType } from '../types';
import { getInstitutionalRating } from '../services/projectionService';
import { usd, pctFmt } from '../services/stockMetrics';
import { applyNarrativeTokens, scenarioNarrativeTokens } from '../services/narrative';

interface Props {
  data: ProjectionData;
  currentPrice: number;
  modelType?: ValuationModelType;
}

const ScenarioMetricsCard: React.FC<Props> = ({ data, currentPrice, modelType }) => {
  const { config, pricePerShare, mosPrice, w } = data;
  const isEpsPe = modelType === 'EPS_PE';

  // Use the standardized institutional rating logic for this specific scenario path
  const rating = getInstitutionalRating(pricePerShare, currentPrice);

  return (
    <div className="bg-surface-card/60 border border-slate-800 rounded-xl p-6 shadow-xl transition-all hover:border-slate-700">
      <h3 className="text-xl font-black mb-1" style={{ color: config.color }}>
        {config.label}
      </h3>
      <p className="text-slate-300 text-sm leading-relaxed mb-6 h-12 overflow-hidden line-clamp-2">
        {applyNarrativeTokens(config.thesis || config.desc, scenarioNarrativeTokens(currentPrice, data))}
      </p>

      <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 uppercase font-black tracking-widest">{isEpsPe ? 'EPS×PE Value:' : 'DCF Value:'}</span>
          <span className="text-base font-black text-white">{usd(pricePerShare)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 uppercase font-black tracking-widest">MoS (25%):</span>
          <span className="text-base font-black text-slate-300">{usd(mosPrice)}</span>
        </div>
        {isEpsPe ? (
          <>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase font-black tracking-widest">EPS CAGR:</span>
              <span className="text-base font-black text-slate-300">{config.epsCagr}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase font-black tracking-widest">Exit P/E:</span>
              <span className="text-base font-black text-slate-300">{config.exitPE}x</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase font-black tracking-widest">WACC:</span>
              <span className="text-base font-black text-slate-300">{pctFmt(w)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-slate-400 uppercase font-black tracking-widest">Terminal g:</span>
              <span className="text-base font-black text-slate-300">{pctFmt(config.termGrowth ?? 0)}</span>
            </div>
          </>
        )}
      </div>

      <div className={`pt-4 border-t border-slate-800/50 text-base font-black uppercase tracking-wider ${rating.color}`}>
        {rating.label} — {pricePerShare > currentPrice ? '+' : ''}{( (pricePerShare / currentPrice - 1) * 100).toFixed(0)}% Path
      </div>
    </div>
  );
};

export default ScenarioMetricsCard;

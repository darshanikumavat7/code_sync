import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  Landmark, 
  Sparkles, 
  DollarSign, 
  ArrowUpRight, 
  Percent, 
  Layers,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { generate12MonthGrowth, formatCurrency, MonthlyGrowthPoint } from '../utils/calculator';

interface ProfitGraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  initialCapital: number;
  portfolioNetRoi: number;
}

export const ProfitGraphModal: React.FC<ProfitGraphModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  initialCapital,
  portfolioNetRoi,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const [simCapital, setSimCapital] = useState(initialCapital);
  const [hoveredPoint, setHoveredPoint] = useState<MonthlyGrowthPoint | null>(null);

  // Generate 12-month trajectory
  const { points, totalAlphaUsd, totalCreditScoutProfit } = generate12MonthGrowth(simCapital, portfolioNetRoi);
  const activePoint = hoveredPoint || points[points.length - 1];

  // SVG chart dimensions
  const svgWidth = 620;
  const svgHeight = 240;
  const paddingX = 45;
  const paddingY = 30;

  const maxVal = points[points.length - 1].creditScoutValue * 1.02;
  const minVal = simCapital;

  const getX = (idx: number) => paddingX + (idx / (points.length - 1)) * (svgWidth - 2 * paddingX);
  const getY = (val: number) => svgHeight - paddingY - ((val - minVal) / (maxVal - minVal)) * (svgHeight - 2 * paddingY);

  // Credit Scout path
  const csPoints = points.map((p, idx) => ({ x: getX(idx), y: getY(p.creditScoutValue) }));
  const csPathD = csPoints.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  const csAreaD = `${csPathD} L ${csPoints[csPoints.length - 1].x} ${svgHeight - paddingY} L ${csPoints[0].x} ${svgHeight - paddingY} Z`;

  // Bank FD path
  const fdPoints = points.map((p, idx) => ({ x: getX(idx), y: getY(p.bankFdValue) }));
  const fdPathD = fdPoints.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-slate-950/80 animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel-glow bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {t.profitModalTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  ALPHA ENGINE
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.profitModalSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Top Performance Comparison Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Credit Scout Projected Profit */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/30 shadow-inner">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Credit Scout AI ({portfolioNetRoi.toFixed(1)}%)
                </span>
                <span className="text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded text-emerald-300">12M Compounded</span>
              </div>
              <div className="text-2xl font-black text-emerald-400 font-mono">
                +{formatCurrency(activePoint.creditScoutProfit, currency)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Total Value: <span className="text-white font-mono font-bold">{formatCurrency(activePoint.creditScoutValue, currency)}</span>
              </div>
            </div>

            {/* Bank Fixed Deposit (6.0%) */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                  <Landmark className="w-3.5 h-3.5 text-slate-400" />
                  Bank FD (~6.0%)
                </span>
                <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Standard</span>
              </div>
              <div className="text-2xl font-black text-slate-300 font-mono">
                +{formatCurrency(activePoint.bankFdProfit, currency)}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Total Value: <span className="text-slate-300 font-mono font-bold">{formatCurrency(activePoint.bankFdValue, currency)}</span>
              </div>
            </div>

            {/* Excess Alpha Delta */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-teal-950/20 border border-emerald-500/40">
              <div className="flex items-center justify-between text-xs text-emerald-400 mb-1 font-semibold">
                <span>{t.profitAlphaLabel}</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-2xl font-black text-white font-mono flex items-baseline gap-1">
                <span>+{formatCurrency(activePoint.alphaDelta, currency)}</span>
              </div>
              <div className="text-[11px] text-emerald-400/90 mt-1 font-mono">
                +{(portfolioNetRoi - 6.0).toFixed(1)}% Annualized Alpha Spread
              </div>
            </div>

          </div>

          {/* Interactive Simulation Capital Slider */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-semibold text-slate-300">
                Simulate Capital Size:
              </span>
              <span className="text-sm font-bold text-white font-mono text-emerald-300">
                {formatCurrency(simCapital, currency)}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-1 sm:max-w-xs">
              <input
                type="range"
                min="2000"
                max="25000"
                step="1000"
                value={simCapital}
                onChange={(e) => setSimCapital(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>

          {/* SVG Interactive Line Chart */}
          <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                  <span className="w-3 h-0.5 bg-emerald-400 rounded-full inline-block" />
                  Credit Scout AI (Compounded)
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-400">
                  <span className="w-3 h-0.5 bg-slate-500 rounded-full inline-block" />
                  Bank FD (6.0%)
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Hover over graph for monthly inspection
              </span>
            </div>

            {/* Chart SVG */}
            <div className="overflow-x-auto">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="csGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid horizontal guidelines */}
                {[0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
                  const y = svgHeight - paddingY - frac * (svgHeight - 2 * paddingY);
                  return (
                    <line
                      key={idx}
                      x1={paddingX}
                      y1={y}
                      x2={svgWidth - paddingX}
                      y2={y}
                      stroke="#1e293b"
                      strokeDasharray="4 4"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Credit Scout Gradient Area Fill */}
                <path d={csAreaD} fill="url(#csGradient)" />

                {/* Bank FD Path */}
                <path
                  d={fdPathD}
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />

                {/* Credit Scout Path */}
                <path
                  d={csPathD}
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Monthly Data Points */}
                {points.map((p, idx) => {
                  const csPt = csPoints[idx];
                  const isHovered = hoveredPoint?.month === p.month;

                  return (
                    <g
                      key={p.month}
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(p)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    >
                      {/* Invisible hover zone */}
                      <rect
                        x={csPt.x - 18}
                        y={0}
                        width={36}
                        height={svgHeight}
                        fill="transparent"
                      />

                      {/* Credit Scout Dot */}
                      <circle
                        cx={csPt.x}
                        cy={csPt.y}
                        r={isHovered ? 6 : 4}
                        fill="#020617"
                        stroke="#34d399"
                        strokeWidth={isHovered ? 3 : 2}
                        className="transition-all"
                      />

                      {/* Month label along bottom */}
                      <text
                        x={csPt.x}
                        y={svgHeight - 8}
                        textAnchor="middle"
                        fill={isHovered ? '#34d399' : '#64748b'}
                        fontSize="9"
                        fontWeight={isHovered ? 'bold' : 'normal'}
                      >
                        M{p.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Currently Inspected Month Details */}
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
              <span className="font-bold text-white">
                Selected: {activePoint.monthName}
              </span>
              <div className="flex items-center gap-4 text-slate-300 font-mono">
                <span>CS: <strong className="text-emerald-400">{formatCurrency(activePoint.creditScoutValue, currency)}</strong></span>
                <span>FD: <strong className="text-slate-400">{formatCurrency(activePoint.bankFdValue, currency)}</strong></span>
                <span>Alpha: <strong className="text-emerald-300">+{formatCurrency(activePoint.alphaDelta, currency)}</strong></span>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Assumes automated monthly EMI reinvestment compounding.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};

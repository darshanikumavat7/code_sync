import React from 'react';
import { 
  PieChart, 
  ShieldCheck, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { MatchResult, Language, Currency, Borrower } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface DiversificationBarProps {
  topMatches: MatchResult[];
  language: Language;
  currency: Currency;
  totalCapital: number;
  onSelectBorrower: (borrower: Borrower) => void;
}

// Distinct modern color palettes for the 5 basket segments
const SEGMENT_COLORS = [
  {
    bg: 'bg-emerald-500',
    border: 'border-emerald-400',
    text: 'text-emerald-400',
    gradient: 'from-emerald-500 to-teal-500',
    glow: 'rgba(52, 211, 153, 0.4)',
  },
  {
    bg: 'bg-teal-500',
    border: 'border-teal-400',
    text: 'text-teal-400',
    gradient: 'from-teal-500 to-cyan-500',
    glow: 'rgba(20, 184, 166, 0.4)',
  },
  {
    bg: 'bg-cyan-500',
    border: 'border-cyan-400',
    text: 'text-cyan-400',
    gradient: 'from-cyan-500 to-blue-500',
    glow: 'rgba(6, 182, 212, 0.4)',
  },
  {
    bg: 'bg-indigo-500',
    border: 'border-indigo-400',
    text: 'text-indigo-400',
    gradient: 'from-indigo-500 to-violet-500',
    glow: 'rgba(99, 102, 241, 0.4)',
  },
  {
    bg: 'bg-amber-500',
    border: 'border-amber-400',
    text: 'text-amber-400',
    gradient: 'from-amber-500 to-orange-500',
    glow: 'rgba(245, 158, 11, 0.4)',
  },
];

export const DiversificationBar: React.FC<DiversificationBarProps> = ({
  topMatches,
  language,
  currency,
  totalCapital,
  onSelectBorrower,
}) => {
  const t = TRANSLATIONS[language];

  // Helper for localized borrower name
  const getBorrowerName = (b: Borrower) => {
    if (language === 'hi') return b.nameHi;
    if (language === 'mr') return b.nameMr;
    return b.name;
  };

  const getBasketTag = (match: MatchResult) => {
    if (language === 'hi') return match.basketTagHi;
    if (language === 'mr') return match.basketTagMr;
    return match.basketTagEn;
  };

  return (
    <div className="rounded-2xl glass-panel p-6 sm:p-7 border border-slate-800/90 shadow-xl space-y-5">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Layers className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {t.smartBasketTitle}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                TOP 5 AUTO-ALLOCATION
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {t.smartBasketSubtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto font-mono">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Zero Single-Borrower Overexposure</span>
        </div>
      </div>

      {/* Stacked Progress Bar */}
      <div className="space-y-2">
        <div className="w-full h-5 sm:h-6 rounded-xl bg-slate-950/80 p-1 border border-slate-800 flex overflow-hidden gap-1">
          {topMatches.map((match, index) => {
            const color = SEGMENT_COLORS[index % SEGMENT_COLORS.length];
            const name = getBorrowerName(match.borrower);

            return (
              <button
                key={match.borrower.id}
                type="button"
                onClick={() => onSelectBorrower(match.borrower)}
                className={`relative group h-full rounded-lg bg-gradient-to-r ${color.gradient} transition-all duration-300 hover:brightness-125 focus:outline-none`}
                style={{
                  width: `${match.allocationPercent}%`,
                }}
                title={`${name}: ${match.allocationPercent}% (${formatCurrency(match.allocatedAmountUsd, currency)})`}
              >
                {/* Allocation percentage label inside segment if wide enough */}
                {match.allocationPercent >= 14 && (
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] sm:text-xs font-black text-slate-950 truncate px-1">
                    {match.allocationPercent}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend / Borrower Chips Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-2">
          {topMatches.map((match, index) => {
            const color = SEGMENT_COLORS[index % SEGMENT_COLORS.length];
            const name = getBorrowerName(match.borrower);
            const tag = getBasketTag(match);

            return (
              <div
                key={match.borrower.id}
                onClick={() => onSelectBorrower(match.borrower)}
                className="group relative p-3 rounded-xl bg-slate-950/70 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  {/* Top row with color pill & percentage */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 border border-slate-800 ${color.text}`}>
                      <span className={`w-2 h-2 rounded-full ${color.bg}`} />
                      <span>{match.allocationPercent}% Split</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">
                      {match.netRoi.toFixed(1)}% ROI
                    </span>
                  </div>

                  {/* Borrower info */}
                  <div className="flex items-center gap-2">
                    <img
                      src={match.borrower.avatarUrl}
                      alt={name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-200 truncate group-hover:text-emerald-400 transition-colors">
                        {name}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">
                        {match.borrower.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Allocated Amount & Basket Role Tag */}
                <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-white">
                    {formatCurrency(match.allocatedAmountUsd, currency)}
                  </span>
                  <span className="text-[9px] text-slate-400 truncate max-w-[80px]">
                    {tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

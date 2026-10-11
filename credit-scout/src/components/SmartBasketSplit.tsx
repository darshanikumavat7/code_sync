import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  CheckCircle, 
  Building2, 
  ArrowUpRight 
} from 'lucide-react';
import { BorrowerMatch, Language, Currency, Borrower } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface SmartBasketSplitProps {
  top5Matches: BorrowerMatch[];
  language: Language;
  currency: Currency;
  totalCapital: number;
  onSelectBorrower: (borrower: Borrower) => void;
}

// Bank portal accessible segment colors
const BASKET_COLORS = [
  { bg: 'bg-blue-800', border: 'border-blue-900', text: 'text-blue-900', label: 'Primary (30%)' },
  { bg: 'bg-emerald-700', border: 'border-emerald-800', text: 'text-emerald-900', label: 'Essential (25%)' },
  { bg: 'bg-sky-600', border: 'border-sky-700', text: 'text-sky-900', label: 'Balanced (20%)' },
  { bg: 'bg-indigo-600', border: 'border-indigo-700', text: 'text-indigo-900', label: 'Steady (15%)' },
  { bg: 'bg-teal-600', border: 'border-teal-700', text: 'text-teal-900', label: 'Growth (10%)' },
];

export const SmartBasketSplit: React.FC<SmartBasketSplitProps> = ({
  top5Matches,
  language,
  currency,
  totalCapital,
  onSelectBorrower,
}) => {
  const t = TRANSLATIONS[language];

  const getBorrowerName = (b: Borrower) => {
    if (language === 'hi') return b.nameHi;
    if (language === 'mr') return b.nameMr;
    return b.name;
  };

  const getRole = (m: BorrowerMatch) => {
    if (language === 'hi') return m.basketRoleHi;
    if (language === 'mr') return m.basketRoleMr;
    return m.basketRoleEn;
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 sm:p-7 space-y-5">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {t.smartBasketTitle}
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
              5-WAY DIVERSIFICATION
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.smartBasketSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Maximum 35% Exposure Per Business</span>
        </div>
      </div>

      {/* High-Contrast Stacked Progress Bar */}
      <div className="space-y-3">
        <div className="w-full h-8 rounded-lg bg-slate-200 p-1 border border-slate-300 flex overflow-hidden gap-1">
          {top5Matches.map((m, idx) => {
            const color = BASKET_COLORS[idx % BASKET_COLORS.length];
            const name = getBorrowerName(m.borrower);

            return (
              <button
                key={m.borrower.id}
                type="button"
                onClick={() => onSelectBorrower(m.borrower)}
                className={`relative h-full rounded ${color.bg} hover:opacity-90 transition-opacity flex items-center justify-center text-white text-xs font-bold focus:outline-none`}
                style={{ width: `${m.allocationPercent}%` }}
                title={`${name}: ${m.allocationPercent}% (${formatCurrency(m.allocatedAmount, currency)})`}
              >
                {m.allocationPercent >= 12 && (
                  <span className="truncate px-1 font-mono text-[11px]">
                    {m.allocationPercent}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Itemized Borrower Allocation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {top5Matches.map((m, idx) => {
            const color = BASKET_COLORS[idx % BASKET_COLORS.length];
            const name = getBorrowerName(m.borrower);
            const role = getRole(m);

            return (
              <div
                key={m.borrower.id}
                onClick={() => onSelectBorrower(m.borrower)}
                className="bg-slate-50 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 rounded-lg p-3 transition-colors cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${color.bg}`} />
                      <span>{m.allocationPercent}% Share</span>
                    </span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded border border-emerald-300">
                      +{m.borrower.expectedAnnualProfit}%
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {m.borrower.businessName}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold font-mono text-blue-900">
                    {formatCurrency(m.allocatedAmount, currency)}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    CIBIL {m.borrower.cibilScore}
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

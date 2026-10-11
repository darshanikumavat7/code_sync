import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  CheckCircle, 
  Building2, 
  Calendar,
  Lock,
  ArrowUpRight,
  Coins,
  Sparkles,
  AlertTriangle 
} from 'lucide-react';
import { BorrowerMatch, Language, Currency, Borrower } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface SmartBasketSplitProps {
  top5Matches: BorrowerMatch[];
  language: Language;
  currency: Currency;
  totalBudgetInr: number;
  isPortfolioLocked: boolean;
  onSelectBorrower: (borrower: Borrower) => void;
}

// Bank portal accessible segment colors
const BASKET_COLORS = [
  { bg: 'bg-blue-800', border: 'border-blue-900', text: 'text-blue-900', label: 'Primary Anchor' },
  { bg: 'bg-emerald-700', border: 'border-emerald-800', text: 'text-emerald-900', label: 'Essential Staples' },
  { bg: 'bg-sky-600', border: 'border-sky-700', text: 'text-sky-900', label: 'Balanced Turnover' },
  { bg: 'bg-indigo-600', border: 'border-indigo-700', text: 'text-indigo-900', label: 'Yield Booster' },
  { bg: 'bg-teal-600', border: 'border-teal-700', text: 'text-teal-900', label: 'Micro-Slice' },
];

export const SmartBasketSplit: React.FC<SmartBasketSplitProps> = ({
  top5Matches,
  language,
  currency,
  totalBudgetInr,
  isPortfolioLocked,
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

  const totalAllocated = top5Matches.reduce((acc, m) => acc + m.allocatedAmountInr, 0);
  const idleCash = Math.max(0, totalBudgetInr - totalAllocated);
  const isMicroBudget = totalBudgetInr <= 2000;

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 sm:p-7 space-y-5">
      
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {t.smartBasketTitle} ({top5Matches.length}-Way Diversification)
            </h3>
            {isPortfolioLocked ? (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono">
                100% CAPITAL LOCKED
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 font-mono">
                UNLOCKED MODE
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.smartBasketSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {isPortfolioLocked && (
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-950 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
              <Lock className="w-3.5 h-3.5 text-blue-800" />
              <span>Exact Rupee Match (₹0 Idle Cash)</span>
            </span>
          )}
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Multi-Borrower Protection</span>
          </div>
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
                title={`${name}: ${m.allocationPercent}% (${formatCurrency(m.allocatedAmountInr, currency)}) • ${m.borrower.loanTenureMonths}M`}
              >
                {m.allocationPercent >= 10 && (
                  <span className="truncate px-1 font-mono text-[11px]">
                    {m.allocationPercent}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Itemized Borrower Allocation Cards with Loan Duration Tag */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-1">
          {top5Matches.map((m, idx) => {
            const color = BASKET_COLORS[idx % BASKET_COLORS.length];
            const name = getBorrowerName(m.borrower);
            const role = getRole(m);

            return (
              <div
                key={m.borrower.id}
                onClick={() => onSelectBorrower(m.borrower)}
                className="bg-slate-50 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 rounded-lg p-3 transition-colors cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${color.bg}`} />
                      <span>{m.allocationPercent}% Share</span>
                    </span>
                    <span className="text-[10px] font-bold bg-blue-100 text-blue-900 px-1.5 py-0.2 rounded border border-blue-200 font-mono">
                      {m.borrower.loanTenureMonths}M
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-900">
                    {name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {m.borrower.businessName}
                  </p>
                  <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                    {role}
                  </span>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-bold font-mono text-blue-900">
                    {formatCurrency(m.allocatedAmountInr, currency)}
                  </span>
                  <span className="text-[10px] text-emerald-800 font-bold">
                    +{m.borrower.expectedAnnualProfit}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Portfolio Lock Verification Footer Banner */}
      <div className="pt-2 border-t border-slate-200">
        <div className="bg-slate-50 rounded-lg p-3 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-blue-900 shrink-0" />
            <div className="space-y-0.5">
              <span className="font-bold text-slate-800">
                Total Budget: <strong className="font-mono text-blue-900">{formatCurrency(totalBudgetInr, currency)}</strong>
                {' '}• Total Allocated: <strong className="font-mono text-emerald-800">{formatCurrency(totalAllocated, currency)}</strong>
                {' '}• Idle Cash: <strong className="font-mono text-slate-900">{formatCurrency(idleCash, currency)}</strong>
              </span>
              {isMicroBudget && (
                <p className="text-[11px] text-slate-500">
                  Inclusive Micro-Split: Even at {formatCurrency(totalBudgetInr, currency)}, your savings are safely distributed across {top5Matches.length} micro-enterprises so no single borrower holds more than 35%.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 font-bold text-emerald-800 font-mono text-[11px] bg-emerald-50 px-2 py-1 rounded border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Zero Cash Drag Guarantee</span>
          </div>
        </div>
      </div>

    </div>
  );
};

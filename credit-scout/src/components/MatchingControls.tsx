import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Sliders, 
  HelpCircle, 
  Percent, 
  AlertCircle,
  CheckCircle2,
  Lock,
  Unlock,
  Calendar,
  Sparkles,
  Coins,
  Plus,
  Minus,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Language, Currency, TargetTimeline } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface MatchingControlsProps {
  language: Language;
  currency: Currency;
  budgetInr: number;
  setBudgetInr: (val: number) => void;
  targetTimeline: TargetTimeline;
  setTargetTimeline: (val: TargetTimeline) => void;
  isPortfolioLocked: boolean;
  setIsPortfolioLocked: (val: boolean) => void;
  basketCount?: number;
  setBasketCount?: (val: number) => void;
  riskLevel: number;
  setRiskLevel: (val: number) => void;
  expectedAnnualProfit: number;
  averageCibil: number;
}

export const MatchingControls: React.FC<MatchingControlsProps> = ({
  language,
  currency,
  budgetInr,
  setBudgetInr,
  targetTimeline,
  setTargetTimeline,
  isPortfolioLocked,
  setIsPortfolioLocked,
  basketCount = 5,
  setBasketCount,
  riskLevel,
  setRiskLevel,
  expectedAnnualProfit,
  averageCibil,
}) => {
  const t = TRANSLATIONS[language];

  // Micro-preset chips as requested in prompt (₹500, ₹1,000, ₹5,000, ₹25,000) plus max ₹50,000
  const budgetPresets = [500, 1000, 5000, 25000, 50000];

  // Timelines array (1M, 3M, 6M, 12M, 24M, plus All Timelines)
  const timelineOptions: { id: TargetTimeline; label: string; sub: string; count: number }[] = [
    { id: 0, label: t.timelineAll, sub: 'All Tenures', count: 10 },
    { id: 1, label: '1 Month', sub: 'Fast Turnover', count: 2 },
    { id: 3, label: '3 Months', sub: 'Quarterly', count: 2 },
    { id: 6, label: '6 Months', sub: 'Mid-Term', count: 2 },
    { id: 12, label: '12 Months', sub: '1 Year Cycle', count: 2 },
    { id: 24, label: '24 Months', sub: 'Long-Term Yield', count: 2 },
  ];

  // Risk description helper
  const getRiskExplanation = (level: number) => {
    if (level <= 3) {
      return {
        badge: t.riskLevelSafe,
        badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        safetyText: '98.5% Capital Safety (Highest Protection)',
      };
    } else if (level <= 7) {
      return {
        badge: t.riskLevelBalanced,
        badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
        safetyText: '96.0% Capital Safety (Standard Protection)',
      };
    } else {
      return {
        badge: t.riskLevelHighYield,
        badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
        safetyText: '93.0% Capital Safety (Higher Growth Focus)',
      };
    }
  };

  const riskInfo = getRiskExplanation(riskLevel);

  // Manual input change handler
  const handleManualBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      setBudgetInr(500);
      return;
    }
    const val = Number(rawVal);
    if (!isNaN(val)) {
      setBudgetInr(val);
    }
  };

  // Nudge amount helper
  const nudgeBudget = (delta: number) => {
    const next = Math.max(500, Math.min(50000, budgetInr + delta));
    setBudgetInr(next);
  };

  const isMicroBudget = budgetInr <= 2000;

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 sm:p-8 space-y-7">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wide">
              <Lock className="w-3.5 h-3.5 text-blue-800" />
              <span>Smart Budget, Timeline & Micro-Lending Engine</span>
            </span>
            {isMicroBudget && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold font-mono">
                <Coins className="w-3.5 h-3.5 text-emerald-700" />
                <span>Micro-Lending Tier Active</span>
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            {t.sliderSectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5 max-w-2xl">
            {t.sliderSectionSubtitle}
          </p>
        </div>

        {/* Expected Return Highlight Card */}
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 sm:px-6 shadow-sm flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-sm">
            %
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
              {t.expectedAnnualProfitLabel}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-emerald-800 font-mono">
                +{expectedAnnualProfit.toFixed(1)}%
              </span>
              <span className="text-xs font-semibold text-emerald-700">
                per year
              </span>
            </div>
            <span className="text-[11px] text-emerald-800 font-medium block mt-0.5">
              Average CIBIL: <strong>{averageCibil} / 900</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Grid: 1. Budget Controls & 2. Timeline Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 1. Exact Portfolio Allocation Budget (Micro-scale ₹500 to ₹50,000) */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <label htmlFor="budget-input" className="text-sm font-bold text-slate-900 block">
                  {t.investmentAmountLabel}
                </label>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 font-mono">
                  ₹500 - ₹50,000
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.investmentAmountDesc}
              </p>
            </div>

            {/* Manual Number Entry Input with Nudge Buttons */}
            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => nudgeBudget(-500)}
                disabled={budgetInr <= 500}
                className="w-7 h-7 rounded border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white flex items-center justify-center text-slate-700 text-xs font-bold transition-colors"
                title="Decrease by ₹500"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>

              <div className="relative flex items-center">
                <span className="absolute left-2.5 text-xs font-bold text-blue-900 pointer-events-none">
                  {currency === 'INR' ? '₹' : '$'}
                </span>
                <input
                  id="budget-input"
                  type="number"
                  min="500"
                  max="50000"
                  step="250"
                  value={budgetInr}
                  onChange={handleManualBudgetChange}
                  className="w-28 py-1.5 pl-6 pr-2 rounded-lg border-2 border-blue-900 bg-white text-blue-900 font-mono font-black text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <button
                type="button"
                onClick={() => nudgeBudget(500)}
                disabled={budgetInr >= 50000}
                className="w-7 h-7 rounded border border-slate-300 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white flex items-center justify-center text-slate-700 text-xs font-bold transition-colors"
                title="Increase by ₹500"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive Range Slider */}
          <div className="space-y-1.5 pt-1">
            <input
              id="budget-slider"
              type="range"
              min="500"
              max="50000"
              step="100"
              value={budgetInr}
              onChange={(e) => setBudgetInr(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-300 accent-blue-900"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-500 font-mono">
              <span className={budgetInr <= 1000 ? 'text-blue-900 font-bold' : ''}>₹500 ($10)</span>
              <span className={budgetInr >= 4500 && budgetInr <= 5500 ? 'text-blue-900 font-bold' : ''}>₹5,000</span>
              <span className={budgetInr >= 24000 && budgetInr <= 26000 ? 'text-blue-900 font-bold' : ''}>₹25,000</span>
              <span className={budgetInr >= 49000 ? 'text-blue-900 font-bold' : ''}>₹50,000 ($500+)</span>
            </div>
          </div>

          {/* Micro-Preset Chips (₹500, ₹1,000, ₹5,000, ₹25,000) */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-slate-600">Micro-Presets:</span>
              {budgetPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setBudgetInr(preset)}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold transition-all border ${
                    budgetInr === preset
                      ? 'bg-blue-900 text-white border-blue-900 shadow-sm ring-2 ring-blue-300/60'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  {formatCurrency(preset, currency)}
                </button>
              ))}
            </div>

            {/* Low-Income Inclusive Helper Banner */}
            <div className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
              isMicroBudget 
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
                : 'bg-blue-50/60 border-blue-200 text-slate-700'
            }`}>
              <Coins className={`w-4 h-4 shrink-0 mt-0.5 ${isMicroBudget ? 'text-emerald-700' : 'text-blue-800'}`} />
              <div className="space-y-0.5">
                <span className="font-bold block">
                  {isMicroBudget ? 'Inclusive Micro-Investment Tier (₹500–₹2,000)' : 'Exact Capital Allocation'}
                </span>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  {isMicroBudget 
                    ? 'Fractional micro-lending enables small-scale savers to contribute slices as low as ₹500, automatically completing larger local micro-borrower funding pools.' 
                    : t.microBudgetHelp}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Target Loan Duration / Timeline Selector (1M, 3M, 6M, 12M, 24M) */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-bold text-slate-900 block flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-900" />
                  <span>{t.targetTimelineLabel}</span>
                </label>
                <p className="text-xs text-slate-500 mt-0.5">
                  {t.targetTimelineDesc}
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-300">
                {targetTimeline === 0 ? 'All Durations' : `${targetTimeline} Months Filter`}
              </span>
            </div>

            {/* Timeline Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-3">
              {timelineOptions.map((opt) => {
                const isSelected = targetTimeline === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTargetTimeline(opt.id)}
                    className={`p-2.5 rounded-lg text-left transition-all border flex flex-col justify-between ${
                      isSelected
                        ? 'bg-blue-900 text-white border-blue-900 shadow-md ring-2 ring-blue-300/60'
                        : 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold">
                        {opt.label}
                      </span>
                      {opt.id > 0 && (
                        <span className={`text-[10px] font-mono px-1 rounded ${
                          isSelected ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {opt.id}M
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between w-full mt-1 text-[10px]">
                      <span className={isSelected ? 'text-blue-200 font-medium' : 'text-slate-500'}>
                        {opt.sub}
                      </span>
                      <span className={`font-mono font-semibold ${isSelected ? 'text-emerald-300' : 'text-emerald-700'}`}>
                        {opt.count} listings
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {targetTimeline > 0
                ? `Borrowers with ${targetTimeline}-month repayment duration are dynamically prioritized at the top with "100% Match" badges.`
                : 'All durations shown. Select 1M, 3M, 6M, 12M, or 24M to prioritize matching loan sizes and repayment schedules.'}
            </span>
          </div>
        </div>

      </div>

      {/* Grid: 3. Dynamic Portfolio Lock Toggle & 4. Risk / Safety Slider */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2 border-t border-slate-200">
        
        {/* 3. Lock Specific Portfolio Balance Toggle */}
        <div className={`p-5 rounded-xl border-2 space-y-4 flex flex-col justify-between transition-colors ${
          isPortfolioLocked ? 'bg-blue-50/70 border-blue-300' : 'bg-amber-50/50 border-amber-300'
        }`}>
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                  isPortfolioLocked ? 'bg-blue-900 text-white' : 'bg-amber-600 text-white'
                }`}>
                  {isPortfolioLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">
                      {t.lockBalanceLabel}
                    </h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      isPortfolioLocked
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-amber-100 text-amber-900 border-amber-300'
                    }`}>
                      {isPortfolioLocked ? '100% CAPITAL LOCKED' : 'UNLOCKED / MANUAL'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {t.lockBalanceDesc}
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={isPortfolioLocked}
                onClick={() => setIsPortfolioLocked(!isPortfolioLocked)}
                className={`w-12 h-7 rounded-full transition-colors relative p-1 shrink-0 ${
                  isPortfolioLocked ? 'bg-blue-900' : 'bg-slate-400'
                }`}
                title={isPortfolioLocked ? 'Click to Unlock' : 'Click to Lock 100% Balance'}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    isPortfolioLocked ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Split Size Selector (3 to 5 matching borrowers) */}
            {isPortfolioLocked && setBasketCount && (
              <div className="mt-3 pt-3 border-t border-blue-200/80 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-blue-900" />
                  <span>Diversification Split:</span>
                </span>
                <div className="flex items-center gap-1.5">
                  {[3, 4, 5].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setBasketCount(cnt)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all border ${
                        basketCount === cnt
                          ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                      }`}
                    >
                      {cnt} Borrowers
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Active Status Badge or Warning */}
          {isPortfolioLocked ? (
            <div className="bg-emerald-100/90 border border-emerald-300 text-emerald-950 p-2.5 rounded-lg text-xs font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>100% of {formatCurrency(budgetInr, currency)} Auto-Split Across {basketCount} Borrowers • ₹0 Idle Cash</span>
              </span>
              <span className="font-mono text-emerald-900 shrink-0 hidden sm:inline">Zero Cash Drag</span>
            </div>
          ) : (
            <div className="bg-amber-100 border border-amber-300 text-amber-950 p-2.5 rounded-lg text-xs font-medium flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Unlocked mode: Unallocated funds may sit idle in bank escrow without generating returns.</span>
              </span>
              <button
                type="button"
                onClick={() => setIsPortfolioLocked(true)}
                className="underline font-bold text-amber-900 ml-2 shrink-0 hover:text-black"
              >
                Re-Lock
              </button>
            </div>
          )}
        </div>

        {/* 4. Risk & Safety Level Slider */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="risk-safety-slider" className="text-sm font-bold text-slate-900 block">
                {t.riskSafetyLabel}
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.riskSafetyDesc}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-slate-800 bg-white px-2.5 py-1 rounded-lg border border-slate-300 shadow-sm block font-mono">
                Level {riskLevel} of 10
              </span>
            </div>
          </div>

          {/* Range Input */}
          <div className="space-y-1.5">
            <input
              id="risk-safety-slider"
              type="range"
              min="1"
              max="10"
              step="1"
              value={riskLevel}
              onChange={(e) => setRiskLevel(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-300 accent-blue-900"
            />
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span className={riskLevel <= 3 ? 'text-emerald-700 font-bold' : ''}>1 (Max Safety)</span>
              <span className={riskLevel >= 4 && riskLevel <= 7 ? 'text-blue-800 font-bold' : ''}>5 (Balanced)</span>
              <span className={riskLevel >= 8 ? 'text-amber-800 font-bold' : ''}>10 (High Return)</span>
            </div>
          </div>

          {/* Active Level Badge */}
          <div className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-between ${riskInfo.badgeClass}`}>
            <div className="flex items-center gap-1.5 truncate">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="truncate">{riskInfo.badge}</span>
            </div>
            <span className="font-mono shrink-0">{riskInfo.safetyText}</span>
          </div>
        </div>

      </div>

    </div>
  );
};

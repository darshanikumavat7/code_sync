import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Sliders, 
  HelpCircle, 
  Percent, 
  AlertCircle,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface MatchingControlsProps {
  language: Language;
  currency: Currency;
  capital: number;
  setCapital: (val: number) => void;
  riskLevel: number;
  setRiskLevel: (val: number) => void;
  expectedAnnualProfit: number;
  averageCibil: number;
}

export const MatchingControls: React.FC<MatchingControlsProps> = ({
  language,
  currency,
  capital,
  setCapital,
  riskLevel,
  setRiskLevel,
  expectedAnnualProfit,
  averageCibil,
}) => {
  const t = TRANSLATIONS[language];

  // Capital presets
  const presets = [3000, 5000, 10000, 15000, 25000];

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

  return (
    <div className="bg-white rounded-xl border border-slate-300 shadow-sm p-6 sm:p-8 space-y-6">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-200 gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wide mb-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-800" />
            <span>Instant Matchmaker Engine</span>
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            {t.sliderSectionTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            {t.sliderSectionSubtitle}
          </p>
        </div>

        {/* Expected Return Highlight Card */}
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-xl p-4 sm:px-6 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xl">
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
              Average Borrower CIBIL: <strong>{averageCibil} / 900</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Sliders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-2">
        
        {/* Slider 1: Total Investment Amount */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="investment-amount-slider" className="text-sm font-bold text-slate-900 block">
                {t.investmentAmountLabel}
              </label>
              <p className="text-xs text-slate-500 mt-0.5">
                {t.investmentAmountDesc}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-blue-900 font-mono bg-white px-3 py-1 rounded-lg border border-slate-300 shadow-sm block">
                {formatCurrency(capital, currency)}
              </span>
            </div>
          </div>

          {/* Range Input */}
          <div className="space-y-2">
            <input
              id="investment-amount-slider"
              type="range"
              min="2000"
              max="25000"
              step="500"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-300"
            />
            <div className="flex justify-between text-xs font-semibold text-slate-500 font-mono">
              <span>{formatCurrency(2000, currency)}</span>
              <span>{formatCurrency(12500, currency)}</span>
              <span>{formatCurrency(25000, currency)}</span>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs font-bold text-slate-600">Quick Select:</span>
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setCapital(p)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all border ${
                  capital === p
                    ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                }`}
              >
                {formatCurrency(p, currency)}
              </button>
            ))}
          </div>
        </div>

        {/* Slider 2: Risk & Safety Level (1 to 10) */}
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
              <span className="text-sm font-black text-slate-800 bg-white px-3 py-1 rounded-lg border border-slate-300 shadow-sm block font-mono">
                Level {riskLevel} of 10
              </span>
            </div>
          </div>

          {/* Range Input */}
          <div className="space-y-2">
            <input
              id="risk-safety-slider"
              type="range"
              min="1"
              max="10"
              step="1"
              value={riskLevel}
              onChange={(e) => setRiskLevel(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-300"
            />
            <div className="flex justify-between text-xs font-semibold text-slate-600">
              <span className={riskLevel <= 3 ? 'text-emerald-700 font-bold' : ''}>1 (Max Safety)</span>
              <span className={riskLevel >= 4 && riskLevel <= 7 ? 'text-blue-800 font-bold' : ''}>5 (Balanced)</span>
              <span className={riskLevel >= 8 ? 'text-amber-800 font-bold' : ''}>10 (High Return)</span>
            </div>
          </div>

          {/* Active Level Explanation Badge */}
          <div className="pt-1">
            <div className={`p-2.5 rounded-lg border text-xs font-bold flex items-center justify-between ${riskInfo.badgeClass}`}>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>{riskInfo.badge}</span>
              </div>
              <span className="font-mono">{riskInfo.safetyText}</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

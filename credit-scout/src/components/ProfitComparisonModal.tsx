import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  Building2, 
  CheckCircle2, 
  ArrowUpRight, 
  DollarSign, 
  Sliders,
  ShieldCheck
} from 'lucide-react';
import { Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { generateComparisonStats, formatCurrency } from '../utils/calculator';

interface ProfitComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  initialCapital: number;
  expectedAnnualProfit: number;
}

export const ProfitComparisonModal: React.FC<ProfitComparisonModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  initialCapital,
  expectedAnnualProfit,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const [testCapital, setTestCapital] = useState(initialCapital);

  const stats = generateComparisonStats(testCapital, expectedAnnualProfit);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-sm bg-slate-900/60 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl border border-slate-300 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-blue-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-blue-800 border border-blue-700 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                {t.profitModalTitle}
              </h3>
              <p className="text-xs text-blue-200 mt-0.5">
                {t.profitModalSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* PeerFund Card */}
            <div className="p-5 rounded-xl bg-emerald-50 border-2 border-emerald-400 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                  {t.peerFundYieldLabel}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-200 text-emerald-900">
                  +{expectedAnnualProfit.toFixed(1)}% / Year
                </span>
              </div>
              <div className="text-3xl font-black text-emerald-900 font-mono">
                +{formatCurrency(stats.peerFundProfit, currency)}
              </div>
              <div className="text-xs text-emerald-800 pt-2 border-t border-emerald-200">
                Total 1-Year Value: <strong className="font-mono text-emerald-950">{formatCurrency(stats.peerFundTotal, currency)}</strong>
              </div>
            </div>

            {/* Traditional Bank FD Card */}
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-300 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  {t.bankFdYieldLabel}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-200 text-slate-700">
                  ~6.0% / Year
                </span>
              </div>
              <div className="text-3xl font-black text-slate-800 font-mono">
                +{formatCurrency(stats.bankFdProfit, currency)}
              </div>
              <div className="text-xs text-slate-600 pt-2 border-t border-slate-200">
                Total 1-Year Value: <strong className="font-mono text-slate-900">{formatCurrency(stats.bankFdTotal, currency)}</strong>
              </div>
            </div>

          </div>

          {/* Generated Extra Profit Banner */}
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-lg">
                ★
              </div>
              <div>
                <span className="text-xs font-bold text-blue-900 uppercase">
                  {t.extraProfitLabel}
                </span>
                <p className="text-xs text-slate-600">
                  By cutting out high banking intermediaries and funding MSMEs directly
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black font-mono text-blue-900">
                +{formatCurrency(stats.extraProfit, currency)}
              </span>
              <span className="text-[10px] text-blue-800 font-bold block">
                ({stats.growthMultiplier}x higher than Bank FD)
              </span>
            </div>
          </div>

          {/* Capital Slider inside Modal */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">
                Simulate With Different Capital:
              </span>
              <span className="text-sm font-bold font-mono text-blue-900 bg-white px-2.5 py-0.5 rounded border border-slate-300">
                {formatCurrency(testCapital, currency)}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="25000"
              step="1000"
              value={testCapital}
              onChange={(e) => setTestCapital(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-300"
            />
          </div>

          {/* High Contrast Visual Bar Chart Comparison */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-3">
            <span className="text-xs font-bold text-slate-700 block">
              Direct Visual Profit Comparison:
            </span>
            
            {/* PeerFund Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-emerald-800">PeerFund Micro-Lending ({expectedAnnualProfit.toFixed(1)}%)</span>
                <span className="font-mono text-emerald-800">+{formatCurrency(stats.peerFundProfit, currency)}</span>
              </div>
              <div className="w-full h-5 bg-slate-100 rounded-md overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-emerald-600 rounded"
                  style={{ width: `${Math.min(100, (expectedAnnualProfit / 20) * 100)}%` }}
                />
              </div>
            </div>

            {/* Bank FD Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-600">Standard Bank Fixed Deposit (6.0%)</span>
                <span className="font-mono text-slate-700">+{formatCurrency(stats.bankFdProfit, currency)}</span>
              </div>
              <div className="w-full h-5 bg-slate-100 rounded-md overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-slate-500 rounded"
                  style={{ width: `${(6.0 / 20) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-colors shadow-sm"
          >
            Close Comparison
          </button>
        </div>

      </div>
    </div>
  );
};

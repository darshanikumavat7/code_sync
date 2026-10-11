import React, { useState } from 'react';
import { 
  X, 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  RefreshCw, 
  ArrowUpRight, 
  Calendar, 
  CheckCircle2, 
  DollarSign, 
  Percent,
  Clock
} from 'lucide-react';
import { Language, Currency, EscrowTransaction, MatchResult } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface PortfolioDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  transactions: EscrowTransaction[];
  topMatches: MatchResult[];
  totalCapital: number;
  portfolioNetRoi: number;
}

export const PortfolioDrawer: React.FC<PortfolioDrawerProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  transactions,
  topMatches,
  totalCapital,
  portfolioNetRoi,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const [autoReinvest, setAutoReinvest] = useState(true);

  // If transactions exist, show deployed state, otherwise mock demo portfolio
  const isLive = transactions.length > 0;
  const activeAmount = isLive ? transactions[0].totalDeployedUsd : totalCapital;
  const activeBorrowers = topMatches.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex justify-end backdrop-blur-md bg-slate-950/70 animate-in fade-in duration-200">
      
      {/* Drawer Panel */}
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Layers className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {t.portfolioDrawerTitle}
              </h3>
              <p className="text-xs text-slate-400">
                {isLive ? 'Active ERC-4626 Vault Disbursal' : 'Simulated Smart Basket Sandbox'}
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

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto">
          
          {/* Portfolio Metric Hero */}
          <div className="p-5 rounded-2xl bg-slate-950/90 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Deployed Capital Value</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {isLive ? 'ON-CHAIN LOCKED' : 'PRE-ALLOCATED'}
              </span>
            </div>
            <div className="text-3xl font-black text-white font-mono text-emerald-400">
              {formatCurrency(activeAmount, currency)}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
              <span className="text-slate-400">Projected Annual Yield:</span>
              <span className="text-emerald-400 font-mono font-bold">+{portfolioNetRoi.toFixed(2)}% Net</span>
            </div>
          </div>

          {/* Auto Reinvest Toggle */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <RefreshCw className={`w-4 h-4 ${autoReinvest ? 'text-emerald-400 animate-spin' : 'text-slate-500'}`} style={{ animationDuration: '8s' }} />
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  {t.portfolioAutoCompound}
                </span>
                <span className="text-[10px] text-slate-400">
                  Compounds monthly EMI interest automatically
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setAutoReinvest(!autoReinvest)}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                autoReinvest ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-slate-950 transition-transform ${
                  autoReinvest ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Disbursed Micro-Loan Entries */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>{t.portfolioActiveLoans} ({activeBorrowers.length})</span>
              <span className="text-[10px] text-emerald-400 font-mono">100% HEALTHY</span>
            </div>

            <div className="space-y-2">
              {activeBorrowers.map((match, idx) => (
                <div
                  key={match.borrower.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={match.borrower.avatarUrl}
                        alt={match.borrower.name}
                        className="w-7 h-7 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white">
                          {match.borrower.name}
                        </h4>
                        <p className="text-[10px] text-slate-400">
                          {match.borrower.businessName}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold font-mono text-emerald-400">
                      {formatCurrency(match.allocatedAmountUsd, currency)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/60 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      Next EMI: Nov 5, 2026
                    </span>
                    <span className="text-slate-300">
                      CIBIL {match.borrower.cibilScore} • {match.netRoi.toFixed(1)}% Net
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/80">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Close Portfolio View
          </button>
        </div>

      </div>
    </div>
  );
};

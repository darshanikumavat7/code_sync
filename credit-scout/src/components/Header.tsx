import React from 'react';
import { 
  ShieldCheck, 
  Mic, 
  TrendingUp, 
  Lock, 
  Globe, 
  DollarSign, 
  Coins, 
  Sparkles,
  Layers
} from 'lucide-react';
import { Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  onOpenVoiceModal: () => void;
  onOpenProfitModal: () => void;
  onOpenEscrowModal: () => void;
  onOpenPortfolioDrawer: () => void;
  totalCapital: number;
  portfolioNetRoi: number;
  deployedTxCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  currency,
  setCurrency,
  onOpenVoiceModal,
  onOpenProfitModal,
  onOpenEscrowModal,
  onOpenPortfolioDrawer,
  totalCapital,
  portfolioNetRoi,
  deployedTxCount,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-300/30">
              <ShieldCheck className="w-6 h-6 text-slate-950" strokeWidth={2.5} />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-white font-sans">
                  Credit<span className="text-emerald-400">Scout</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  P2P ENGINE • PUNE/PCMC
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden md:block">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Quick Metrics & Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3.5">
            
            {/* Currency Switcher (USD / INR) */}
            <div className="flex items-center p-0.5 rounded-lg bg-slate-900 border border-slate-800">
              <button
                type="button"
                onClick={() => setCurrency('USD')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                  currency === 'USD'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="View in US Dollars ($)"
              >
                <DollarSign className="w-3.5 h-3.5" />
                <span>USD</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrency('INR')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all flex items-center gap-1 ${
                  currency === 'INR'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="View in Indian Rupees (₹)"
              >
                <Coins className="w-3.5 h-3.5" />
                <span>INR (₹)</span>
              </button>
            </div>

            {/* Multi-Lingual Dropdown Switcher (EN / HI / MR) */}
            <div className="relative group">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-200 transition-all cursor-pointer">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{language === 'en' ? 'English (EN)' : language === 'hi' ? 'हिंदी (HI)' : 'मराठी (MR)'}</span>
                <span className="text-[10px] text-slate-500">▼</span>
              </div>
              <div className="absolute right-0 mt-1 w-36 py-1 bg-slate-900 border border-slate-800 rounded-lg shadow-xl shadow-black/50 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all z-50">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                    language === 'en' ? 'text-emerald-400 font-bold bg-slate-800/40' : 'text-slate-300'
                  }`}
                >
                  <span>English (EN)</span>
                  {language === 'en' && <span className="text-emerald-400">✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                    language === 'hi' ? 'text-emerald-400 font-bold bg-slate-800/40' : 'text-slate-300'
                  }`}
                >
                  <span>हिंदी (HI)</span>
                  {language === 'hi' && <span className="text-emerald-400">✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('mr')}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-800/80 transition-colors ${
                    language === 'mr' ? 'text-emerald-400 font-bold bg-slate-800/40' : 'text-slate-300'
                  }`}
                >
                  <span>मराठी (MR)</span>
                  {language === 'mr' && <span className="text-emerald-400">✓</span>}
                </button>
              </div>
            </div>

            {/* Voice Assistant Mode Trigger ("ScoutVoice AI") */}
            <button
              type="button"
              onClick={onOpenVoiceModal}
              className="relative group px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm shadow-emerald-950"
              title="Activate ScoutVoice AI Voice Assistant"
            >
              <Mic className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">{t.voiceAssistantBtn}</span>
              <span className="sm:hidden">Voice</span>
            </button>

            {/* 12-Month Profit Growth Graph Trigger */}
            <button
              type="button"
              onClick={onOpenProfitModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-all hover:text-white"
              title="Compare 12-Month Profit Growth vs 6.0% Bank Fixed Deposit"
            >
              <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
              <span>12M vs Bank FD</span>
            </button>

            {/* Active Portfolio Drawer / Status */}
            <button
              type="button"
              onClick={onOpenPortfolioDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 transition-all hover:border-slate-700"
              title="View Deployed Portfolio"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Portfolio</span>
              {deployedTxCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                  {deployedTxCount}
                </span>
              )}
            </button>

            {/* 1-Click Escrow Direct Trigger */}
            <button
              type="button"
              onClick={onOpenEscrowModal}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 active:scale-95"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Deploy Escrow</span>
              <span className="md:hidden">Escrow</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};

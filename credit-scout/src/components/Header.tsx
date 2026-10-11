import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Phone, 
  Globe, 
  Mic, 
  TrendingUp, 
  DollarSign, 
  Coins,
  CheckCircle,
  FileText
} from 'lucide-react';
import { Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  onOpenVoiceModal: () => void;
  onOpenProfitModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  currency,
  setCurrency,
  onOpenVoiceModal,
  onOpenProfitModal,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      
      {/* Top Government Portal Identity Ribbon */}
      <div className="bg-slate-100 border-b border-slate-200 px-4 sm:px-8 py-1.5 text-[11px] text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-1">
        <div className="flex items-center gap-2 font-medium">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
          <span className="font-semibold text-slate-800">{t.officialBadge}</span>
          <span className="text-slate-400">|</span>
          <span>Digital India Small Business Initiative</span>
        </div>

        <div className="flex items-center gap-4 text-slate-600">
          <div className="flex items-center gap-1 font-mono">
            <Phone className="w-3 h-3 text-blue-700" />
            <span>1800-202-7337 (Toll-Free)</span>
          </div>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">Official Portal Version 3.2</span>
        </div>
      </div>

      {/* Main Bank / Portal Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Portal Logo & Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-blue-900 border border-blue-950 flex items-center justify-center text-white shadow-md">
            <Building2 className="w-6 h-6 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                Peer<span className="text-blue-800">Fund</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300 uppercase tracking-wider">
                Micro-Lending Portal
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {t.portalSubtitle}
            </p>
          </div>
        </div>

        {/* Right Action & Accessibility Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          
          {/* Currency Toggle (USD $ / INR ₹) */}
          <div className="flex items-center bg-slate-100 border border-slate-300 rounded-lg p-0.5">
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${
                currency === 'USD'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <DollarSign className="w-3.5 h-3.5" />
              <span>USD ($)</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrency('INR')}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-all flex items-center gap-1 ${
                currency === 'INR'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>INR (₹)</span>
            </button>
          </div>

          {/* Prominent Multi-Lingual Toggle (English / हिंदी / मराठी) */}
          <div className="flex items-center bg-slate-100 border border-slate-300 rounded-lg p-0.5" title="Switch Language">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'en'
                  ? 'bg-blue-900 text-white font-bold'
                  : 'text-slate-700 hover:text-blue-900'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'hi'
                  ? 'bg-blue-900 text-white font-bold'
                  : 'text-slate-700 hover:text-blue-900'
              }`}
            >
              हिंदी
            </button>
            <button
              type="button"
              onClick={() => setLanguage('mr')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                language === 'mr'
                  ? 'bg-blue-900 text-white font-bold'
                  : 'text-slate-700 hover:text-blue-900'
              }`}
            >
              मराठी
            </button>
          </div>

          {/* Voice Assistant Button ("Tap to Speak") */}
          <button
            type="button"
            onClick={onOpenVoiceModal}
            className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Mic className="w-4 h-4 text-emerald-700 animate-pulse" />
            <span>{t.voiceMicBtn}</span>
          </button>

          {/* Compare with Bank FD Button */}
          <button
            type="button"
            onClick={onOpenProfitModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold transition-all shadow-sm"
          >
            <TrendingUp className="w-4 h-4 text-blue-700" />
            <span>{t.compareWithFdBtn}</span>
          </button>

        </div>

      </div>
    </header>
  );
};

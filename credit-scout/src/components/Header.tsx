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
  FileText,
  User,
  LogOut,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { Language, Currency, UserRole, AuthUser, PortalTab } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenVoiceModal: () => void;
  onOpenProfitModal: () => void;
  currentUser: AuthUser | null;
  onOpenAuthModal: () => void;
  onLogout: () => void;
  activeTab: PortalTab;
  onTabChange: (tab: PortalTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  currency,
  setCurrency,
  currentRole,
  onRoleChange,
  onOpenVoiceModal,
  onOpenProfitModal,
  currentUser,
  onOpenAuthModal,
  onLogout,
  activeTab,
  onTabChange,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Portal Logo & Title */}
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-blue-900 border border-blue-950 flex items-center justify-center text-white shadow-md shrink-0">
            <Building2 className="w-6 h-6 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-black tracking-tight text-slate-900 font-sans">
                Peer<span className="text-blue-800">Fund</span>
              </h1>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border uppercase tracking-wider font-mono ${
                currentRole === 'investor'
                  ? 'bg-blue-100 text-blue-900 border-blue-300'
                  : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                {currentRole === 'investor' ? 'Lender Mode' : 'Borrower Mode'}
              </span>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {t.portalSubtitle}
            </p>
          </div>
        </div>

        {/* Central Dual-Role Switcher (Lender vs Borrower) */}
        <div className="flex items-center justify-center self-start sm:self-auto">
          <div className="bg-slate-100 p-1 rounded-xl border border-slate-300 shadow-sm flex items-center gap-1" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={currentRole === 'investor'}
              onClick={() => onRoleChange('investor')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRole === 'investor'
                  ? 'bg-blue-900 text-white shadow-md ring-1 ring-blue-950'
                  : 'text-slate-700 hover:text-blue-900 hover:bg-white'
              }`}
            >
              <TrendingUp className={`w-3.5 h-3.5 ${currentRole === 'investor' ? 'text-emerald-300' : 'text-slate-500'}`} />
              <span>{t.roleLender}</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={currentRole === 'borrower'}
              onClick={() => onRoleChange('borrower')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                currentRole === 'borrower'
                  ? 'bg-blue-900 text-white shadow-md ring-1 ring-blue-950'
                  : 'text-slate-700 hover:text-blue-900 hover:bg-white'
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${currentRole === 'borrower' ? 'text-amber-300' : 'text-slate-500'}`} />
              <span>{t.roleBorrower}</span>
            </button>
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

          {/* Zero-Rate-Limit Auth Controls */}
          {currentUser ? (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold font-mono shrink-0">
                  {(currentUser.fullName || currentUser.name || currentUser.email || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <div className="text-xs font-bold text-slate-800 leading-tight truncate max-w-[120px]">
                    {currentUser.fullName || currentUser.name || currentUser.email}
                  </div>
                  <div className="text-[10px] text-slate-500 capitalize">
                    {currentUser.role === 'investor' ? 'Investor' : 'Borrower'}
                  </div>
                </div>

                {currentUser.isEmailVerified ? (
                  <span 
                    className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold font-mono flex items-center gap-1 shadow-xs" 
                    title="Zero-Rate-Limit OTP Verified Email"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>✓ Verified Email</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onOpenAuthModal}
                    className="px-2 py-0.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300 text-[10px] font-bold font-mono flex items-center gap-1"
                    title="Click to Verify 6-digit OTP"
                  >
                    <span>Verify OTP</span>
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={onLogout}
                title="Sign Out"
                className="p-1.5 rounded-lg text-slate-500 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            >
              <KeyRound className="w-3.5 h-3.5 text-emerald-300" />
              <span>Sign In / Register</span>
            </button>
          )}

        </div>

      </div>

      {/* Clean Tabbed Navigation Bar: Marketplace & Wizard, My Portfolio, Escrow Receipts, AI Assistant */}
      <div className="bg-slate-50 border-t border-slate-200 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto py-1.5 gap-4">
          <div className="flex items-center gap-1 sm:gap-2 shrink-0" role="tablist">
            
            {/* Tab 1: Marketplace & Wizard */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'marketplace'}
              onClick={() => onTabChange('marketplace')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'marketplace'
                  ? 'bg-blue-900 text-white shadow-sm ring-1 ring-blue-950'
                  : 'text-slate-700 hover:text-blue-900 hover:bg-slate-200/70'
              }`}
            >
              <Building2 className={`w-3.5 h-3.5 ${activeTab === 'marketplace' ? 'text-emerald-300' : 'text-slate-500'}`} />
              <span>Marketplace & Wizard</span>
            </button>

            {/* Tab 2: My Portfolio */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'portfolio'}
              onClick={() => onTabChange('portfolio')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'portfolio'
                  ? 'bg-blue-900 text-white shadow-sm ring-1 ring-blue-950'
                  : 'text-slate-700 hover:text-blue-900 hover:bg-slate-200/70'
              }`}
            >
              <TrendingUp className={`w-3.5 h-3.5 ${activeTab === 'portfolio' ? 'text-emerald-300' : 'text-slate-500'}`} />
              <span>My Portfolio</span>
            </button>

            {/* Tab 3: Escrow Receipts */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'receipts'}
              onClick={() => onTabChange('receipts')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'receipts'
                  ? 'bg-blue-900 text-white shadow-sm ring-1 ring-blue-950'
                  : 'text-slate-700 hover:text-blue-900 hover:bg-slate-200/70'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${activeTab === 'receipts' ? 'text-emerald-300' : 'text-slate-500'}`} />
              <span>Escrow Receipts</span>
            </button>

            {/* Tab 4: AI Voice Assistant */}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'assistant'}
              onClick={() => onTabChange('assistant')}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'assistant'
                  ? 'bg-blue-900 text-white shadow-sm ring-1 ring-blue-950'
                  : 'text-slate-700 hover:text-blue-900 hover:bg-slate-200/70'
              }`}
            >
              <Mic className={`w-3.5 h-3.5 ${activeTab === 'assistant' ? 'text-emerald-300 animate-pulse' : 'text-emerald-700'}`} />
              <span>AI Voice Guide</span>
            </button>

          </div>

          {/* Bank Escrow Protection Status Badge */}
          <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>SBI Escrow Gateway Active • 0% Platform Fee • RBI Section 45-IA</span>
          </div>
        </div>
      </div>
    </header>
  );
};

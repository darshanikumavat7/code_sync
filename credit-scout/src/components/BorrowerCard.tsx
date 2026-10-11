import React from 'react';
import { 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Percent, 
  AlertTriangle,
  FileCheck,
  Building2,
  Calendar
} from 'lucide-react';
import { MatchResult, Language, Currency, Borrower } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface BorrowerCardProps {
  match: MatchResult;
  language: Language;
  currency: Currency;
  onOpenExplainModal: (borrower: Borrower) => void;
  onFundSolo: (borrower: Borrower) => void;
}

export const BorrowerCard: React.FC<BorrowerCardProps> = ({
  match,
  language,
  currency,
  onOpenExplainModal,
  onFundSolo,
}) => {
  const t = TRANSLATIONS[language];
  const { borrower, matchScore, netRoi, nominalInterestRate, defaultProbability, lossPenalty } = match;

  // Localized field getters
  const borrowerName = language === 'hi' ? borrower.nameHi : language === 'mr' ? borrower.nameMr : borrower.name;
  const businessName = language === 'hi' ? borrower.businessNameHi : language === 'mr' ? borrower.businessNameMr : borrower.businessName;
  const categoryName = language === 'hi' ? borrower.categoryHi : language === 'mr' ? borrower.categoryMr : borrower.category;
  const locationName = language === 'hi' ? borrower.locationHi : language === 'mr' ? borrower.locationMr : borrower.location;
  const loanPurpose = language === 'hi' ? borrower.loanPurposeHi : language === 'mr' ? borrower.loanPurposeMr : borrower.loanPurpose;

  // CIBIL Score color mapping
  const getCibilColor = (score: number) => {
    if (score >= 770) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30', label: 'Prime' };
    if (score >= 720) return { text: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30', label: 'Good' };
    if (score >= 680) return { text: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30', label: 'Fair' };
    return { text: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30', label: 'Moderate' };
  };

  const cibilMeta = getCibilColor(borrower.cibilScore);

  // Match score ring color
  const getMatchScoreBadge = (score: number) => {
    if (score >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 75) return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
    return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
  };

  return (
    <div className="group relative rounded-2xl glass-panel p-5 sm:p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-950/20 flex flex-col justify-between">
      
      {/* Top Header: Avatar, Business Name, Location & Match Score */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={borrower.avatarUrl}
                alt={borrowerName}
                className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-md group-hover:scale-105 transition-transform"
              />
              {borrower.aadhaarKycVerified && (
                <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-emerald-500 text-slate-950 shadow-sm" title="Aadhaar e-KYC Verified">
                  <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                </span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {borrowerName}
                </h4>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">
                  {categoryName}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium truncate max-w-[190px]">
                {businessName}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <MapPin className="w-3 h-3 text-emerald-400" />
                <span>{locationName}</span>
              </div>
            </div>
          </div>

          {/* Dynamic Match Score Badge */}
          <div className="text-right shrink-0">
            <div className={`px-2.5 py-1 rounded-xl border text-xs font-black font-mono flex items-center gap-1 shadow-sm ${getMatchScoreBadge(matchScore)}`}>
              <Sparkles className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{matchScore}%</span>
            </div>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 block mt-0.5 font-semibold">
              {t.matchScoreLabel}
            </span>
          </div>
        </div>

        {/* PROMINENT RISK-ADJUSTED NET ROI DISPLAY (Core Prompt Requirement) */}
        <div className="rounded-xl bg-slate-950/80 border border-emerald-500/25 p-3.5 mb-4 shadow-inner">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.netRoiLabel}</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              Nominal {nominalInterestRate.toFixed(1)}% APR
            </span>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black text-emerald-400 font-mono tracking-tight drop-shadow-sm">
                {netRoi.toFixed(2)}%
              </span>
              <span className="text-xs text-emerald-500/80 font-semibold">
                Net Annualized
              </span>
            </div>

            <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              Risk Drag: -{(nominalInterestRate - netRoi).toFixed(2)}%
            </span>
          </div>

          {/* Mini breakdown footnote */}
          <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between font-mono">
            <span>Def. Prob: {(defaultProbability * 100).toFixed(1)}%</span>
            <span>•</span>
            <span>50% Loss Penalty: -{lossPenalty}%</span>
          </div>
        </div>

        {/* Credit & Repayment Metrics Row */}
        <div className="grid grid-cols-3 gap-2 py-2 mb-4 text-center border-y border-slate-800/60">
          {/* CIBIL Score */}
          <div className="p-1.5 rounded-lg bg-slate-950/40">
            <span className="text-[10px] text-slate-400 block mb-0.5">CIBIL Bureau</span>
            <span className={`text-xs font-bold font-mono ${cibilMeta.text}`}>
              {borrower.cibilScore}
            </span>
            <span className="text-[9px] text-slate-400 block font-sans">
              {cibilMeta.label}
            </span>
          </div>

          {/* Past Repayment */}
          <div className="p-1.5 rounded-lg bg-slate-950/40">
            <span className="text-[10px] text-slate-400 block mb-0.5">On-Time Rate</span>
            <span className="text-xs font-bold font-mono text-white">
              {borrower.pastRepaymentRate}%
            </span>
            <span className="text-[9px] text-emerald-400 block">
              Clean Ledger
            </span>
          </div>

          {/* Loan Term */}
          <div className="p-1.5 rounded-lg bg-slate-950/40">
            <span className="text-[10px] text-slate-400 block mb-0.5">Loan Duration</span>
            <span className="text-xs font-bold font-mono text-white">
              {borrower.termMonths} Mos
            </span>
            <span className="text-[9px] text-slate-400 block">
              {formatCurrency(borrower.loanAmountUsd, currency)}
            </span>
          </div>
        </div>

        {/* Loan Purpose / MSME Narrative */}
        <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed bg-slate-950/30 p-2.5 rounded-lg border border-slate-800/50">
          <span className="text-emerald-400 font-semibold mr-1">Purpose:</span>
          {loanPurpose}
        </p>

        {/* Verification Checkmarks */}
        <div className="flex items-center gap-3 text-[10px] text-slate-400 mb-5 font-medium">
          {borrower.gstinVerified && (
            <span className="flex items-center gap-1 text-emerald-400/90">
              <CheckCircle2 className="w-3 h-3" />
              <span>GSTIN Active</span>
            </span>
          )}
          {borrower.udyamVerified && (
            <span className="flex items-center gap-1 text-teal-400/90">
              <CheckCircle2 className="w-3 h-3" />
              <span>Udyam MSME</span>
            </span>
          )}
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>Escrow Ready</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onOpenExplainModal(borrower)}
          className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.viewAiRationale}</span>
        </button>

        <button
          type="button"
          onClick={() => onFundSolo(borrower)}
          className="py-2 px-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 text-xs font-bold transition-all flex items-center gap-1 active:scale-95"
          title="Direct solo allocation"
        >
          <span>Fund</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    </div>
  );
};

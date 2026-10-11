import React from 'react';
import { 
  CheckCircle, 
  MapPin, 
  ShieldCheck, 
  TrendingUp, 
  Info, 
  ArrowRight,
  FileCheck,
  Calendar,
  Building2,
  Sparkles,
  PieChart
} from 'lucide-react';
import { BorrowerMatch, Language, Currency, Borrower } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface BorrowerCardProps {
  match: BorrowerMatch;
  language: Language;
  currency: Currency;
  onOpenDetails: (borrower: Borrower) => void;
}

export const BorrowerCard: React.FC<BorrowerCardProps> = ({
  match,
  language,
  currency,
  onOpenDetails,
}) => {
  const t = TRANSLATIONS[language];
  const { borrower, matchScore, isTimelineMatch, isBudgetMatch, matchBadgeLabel } = match;

  // Localized fields
  const name = language === 'hi' ? borrower.nameHi : language === 'mr' ? borrower.nameMr : borrower.name;
  const business = language === 'hi' ? borrower.businessNameHi : language === 'mr' ? borrower.businessNameMr : borrower.businessName;
  const category = language === 'hi' ? borrower.businessCategoryHi : language === 'mr' ? borrower.businessCategoryMr : borrower.businessCategory;
  const location = language === 'hi' ? borrower.locationHi : language === 'mr' ? borrower.locationMr : borrower.location;
  const purpose = language === 'hi' ? borrower.loanPurposeHi : language === 'mr' ? borrower.loanPurposeMr : borrower.loanPurpose;
  const pastRecord = language === 'hi' ? borrower.pastRepaymentRecordHi : language === 'mr' ? borrower.pastRepaymentRecordMr : borrower.pastRepaymentRecord;

  // CIBIL grade
  const getCibilBadge = (score: number) => {
    if (score >= 770) {
      return { text: 'text-emerald-800 bg-emerald-50 border-emerald-300', label: 'Prime Grade' };
    } else if (score >= 720) {
      return { text: 'text-blue-800 bg-blue-50 border-blue-300', label: 'Very Good' };
    }
    return { text: 'text-amber-800 bg-amber-50 border-amber-300', label: 'Good' };
  };

  const cibilMeta = getCibilBadge(borrower.cibilScore);

  return (
    <div className={`bg-white rounded-xl border transition-all p-5 flex flex-col justify-between space-y-4 ${
      matchBadgeLabel ? 'border-2 border-emerald-500 shadow-md ring-2 ring-emerald-300/40' : 'border-slate-300 hover:border-blue-500 shadow-sm'
    }`}>
      
      {/* Top Header */}
      <div>
        {/* Just Onboarded New Borrower Badge */}
        {borrower.isNewListing && (
          <div className="mb-3 p-2 rounded-lg bg-purple-50 border-2 border-purple-400 text-purple-950 flex items-center justify-between gap-2 shadow-sm animate-pulse">
            <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-purple-600 fill-purple-400" />
              <span>✨ Just Onboarded • Live On Marketplace</span>
            </span>
            <span className="text-[10px] font-mono font-bold bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full border border-purple-300">
              New Applicant
            </span>
          </div>
        )}

        {/* Prominent "100% Budget & Timeline Match" Badge */}
        {matchBadgeLabel && (
          <div className="mb-3.5 -mt-1 p-2.5 rounded-lg bg-emerald-50 border-2 border-emerald-500 shadow-sm flex flex-col gap-1 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-black text-emerald-950 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-500" />
                <span>{t.match100Badge}</span>
              </span>
              <span className="text-[10px] font-mono font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full border border-emerald-300">
                {borrower.loanTenureMonths} Months
              </span>
            </div>
            {match.matchReasonText && (
              <p className="text-[11px] font-medium text-emerald-800 leading-tight">
                🎯 {match.matchReasonText}
              </p>
            )}
          </div>
        )}

        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-3">
            <img
              src={borrower.avatarUrl}
              alt={name}
              className="w-12 h-12 rounded-lg object-cover border border-slate-300 shadow-sm shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <h4 className="text-base font-bold text-slate-900">
                  {name}
                </h4>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-300">
                  {category}
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium truncate max-w-[190px]">
                {business}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <MapPin className="w-3 h-3 text-blue-800" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Match Score Badge & Duration */}
          <div className="text-right shrink-0 space-y-1">
            <span className={`inline-block px-2.5 py-1 rounded font-mono font-bold text-xs border ${
              matchBadgeLabel
                ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                : 'bg-blue-50 text-blue-900 border-blue-200'
            }`}>
              {matchScore}% Match
            </span>
            <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-slate-600">
              <Calendar className="w-3 h-3 text-blue-800" />
              <span>{borrower.loanTenureMonths} Mos</span>
            </div>
          </div>
        </div>

        {/* Expected Profit & Fractional Pool Progress */}
        <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3 my-2.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                {t.expectedAnnualProfitLabel}
              </span>
              <span className="text-xl font-black text-emerald-800 font-mono">
                +{borrower.expectedAnnualProfit}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-600 block">Total Pool Goal</span>
              <span className="text-xs font-bold font-mono text-slate-900">
                {formatCurrency(borrower.poolGoalInr, currency)}
              </span>
            </div>
          </div>

          {/* Fractional Micro-Lending Pool Progress Bar */}
          <div className="space-y-1.5 pt-1 border-t border-emerald-200">
            <div className="flex justify-between text-[10px] font-bold text-emerald-950">
              <span>Fractional Pool Status: {borrower.fundingProgressPct}% Funded</span>
              <span className="text-slate-600 font-mono">
                {formatCurrency(borrower.poolGoalInr - borrower.fundedAmountInr, currency)} left
              </span>
            </div>
            <div className="w-full h-2 bg-emerald-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${borrower.fundingProgressPct}%` }}
              />
            </div>

            {/* Fractional Impact Text Pill */}
            {match.fractionalImpactText ? (
              <div className="p-1.5 rounded bg-white/80 border border-emerald-200 text-[11px] text-emerald-900 font-medium leading-tight">
                {match.fractionalImpactText}
              </div>
            ) : (
              <p className="text-[10px] text-emerald-900 italic">
                Accepts micro-slices from {formatCurrency(borrower.microTicketMinInr, currency)}
              </p>
            )}
          </div>

          {/* Allocation Share if part of active basket */}
          {match.allocatedAmountInr > 0 && (
            <div className="pt-1.5 border-t border-emerald-200 flex items-center justify-between text-xs font-bold text-slate-900">
              <span className="text-[11px] text-slate-600">Basket Share ({match.allocationPercent}%):</span>
              <span className="font-mono text-blue-900">{formatCurrency(match.allocatedAmountInr, currency)}</span>
            </div>
          )}
        </div>

        {/* CIBIL & Repayment Record */}
        <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-200 text-slate-700">
          <div>
            <span className="text-[10px] text-slate-500 block">CIBIL Credit Score</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="font-mono font-bold text-slate-900 text-sm">{borrower.cibilScore}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${cibilMeta.text}`}>
                {cibilMeta.label}
              </span>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-slate-500 block">Repayment Record</span>
            <span className="font-semibold text-emerald-700 block mt-0.5 text-xs truncate">
              {pastRecord}
            </span>
          </div>
        </div>

        {/* Loan Purpose */}
        <div className="pt-2">
          <span className="text-[11px] font-bold text-slate-700 block mb-1">
            {t.loanPurposeLabel}:
          </span>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded border border-slate-200">
            {purpose}
          </p>
        </div>

        {/* Government Verified Badges */}
        <div className="flex items-center gap-2 pt-2.5 text-[10px] text-slate-600 font-medium">
          <span className="flex items-center gap-1 text-emerald-700">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span>Aadhaar e-KYC</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-blue-800">
            <CheckCircle className="w-3 h-3 text-blue-800" />
            <span>GSTIN Active</span>
          </span>
          <span>•</span>
          <span>Udyam MSME</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => onOpenDetails(borrower)}
          className="w-full py-2.5 px-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <span>{t.viewDetailsBtn}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};

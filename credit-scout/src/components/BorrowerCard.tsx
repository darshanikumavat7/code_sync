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
  Building2
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
  const { borrower, matchScore } = match;

  // Localized fields
  const name = language === 'hi' ? borrower.nameHi : language === 'mr' ? borrower.nameMr : borrower.name;
  const business = language === 'hi' ? borrower.businessNameHi : language === 'mr' ? borrower.businessNameMr : borrower.businessName;
  const category = language === 'hi' ? borrower.businessCategoryHi : language === 'mr' ? borrower.businessCategoryMr : borrower.businessCategory;
  const location = language === 'hi' ? borrower.locationHi : language === 'mr' ? borrower.locationMr : borrower.location;
  const purpose = language === 'hi' ? borrower.loanPurposeHi : language === 'mr' ? borrower.loanPurposeMr : borrower.loanPurpose;
  const pastRecord = language === 'hi' ? borrower.pastRepaymentRecordHi : language === 'mr' ? borrower.pastRepaymentRecordMr : borrower.pastRepaymentRecord;
  const stability = language === 'hi' ? borrower.cashFlowStabilityHi : language === 'mr' ? borrower.cashFlowStabilityMr : borrower.cashFlowStability;

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
    <div className="bg-white rounded-xl border border-slate-300 hover:border-blue-500 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4">
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <img
              src={borrower.avatarUrl}
              alt={name}
              className="w-12 h-12 rounded-lg object-cover border border-slate-300 shadow-sm"
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
              <p className="text-xs text-slate-600 font-medium truncate max-w-[200px]">
                {business}
              </p>
              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                <MapPin className="w-3 h-3 text-blue-800" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Match Score Badge */}
          <div className="text-right shrink-0">
            <span className="inline-block px-2.5 py-1 rounded bg-blue-50 text-blue-900 border border-blue-200 font-mono font-bold text-xs">
              {matchScore}% Match
            </span>
          </div>
        </div>

        {/* Expected Profit Highlight Box */}
        <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-3 my-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                {t.expectedAnnualProfitLabel}
              </span>
              <span className="text-xl font-black text-emerald-800 font-mono">
                +{borrower.expectedAnnualProfit}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 block">Loan Amount</span>
              <span className="text-sm font-bold font-mono text-slate-800">
                {formatCurrency(borrower.loanAmount, currency)}
              </span>
            </div>
          </div>
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
        <div className="flex items-center gap-2 pt-3 text-[10px] text-slate-600 font-medium">
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

      {/* View Details Action Button */}
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

import React from 'react';
import { 
  X, 
  CheckCircle2, 
  Building2, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  ShieldCheck, 
  FileCheck,
  CreditCard,
  DollarSign
} from 'lucide-react';
import { Borrower, Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface BorrowerDetailsModalProps {
  borrower: Borrower | null;
  onClose: () => void;
  language: Language;
  currency: Currency;
}

export const BorrowerDetailsModal: React.FC<BorrowerDetailsModalProps> = ({
  borrower,
  onClose,
  language,
  currency,
}) => {
  if (!borrower) return null;

  const t = TRANSLATIONS[language];

  // Localized texts
  const name = language === 'hi' ? borrower.nameHi : language === 'mr' ? borrower.nameMr : borrower.name;
  const business = language === 'hi' ? borrower.businessNameHi : language === 'mr' ? borrower.businessNameMr : borrower.businessName;
  const category = language === 'hi' ? borrower.businessCategoryHi : language === 'mr' ? borrower.businessCategoryMr : borrower.businessCategory;
  const location = language === 'hi' ? borrower.locationHi : language === 'mr' ? borrower.locationMr : borrower.location;
  const purpose = language === 'hi' ? borrower.loanPurposeHi : language === 'mr' ? borrower.loanPurposeMr : borrower.loanPurpose;
  const reason = language === 'hi' ? borrower.recommendationReasonHi : language === 'mr' ? borrower.recommendationReasonMr : borrower.recommendationReasonEn;
  const pastRecord = language === 'hi' ? borrower.pastRepaymentRecordHi : language === 'mr' ? borrower.pastRepaymentRecordMr : borrower.pastRepaymentRecord;
  const stability = language === 'hi' ? borrower.cashFlowStabilityHi : language === 'mr' ? borrower.cashFlowStabilityMr : borrower.cashFlowStability;

  // CIBIL SVG sparkline calculation
  const scores = borrower.cibilHistory.map((p) => p.score);
  const minScore = Math.min(...scores) - 10;
  const maxScore = Math.max(...scores) + 10;
  const chartHeight = 70;
  const chartWidth = 280;

  const points = borrower.cibilHistory.map((p, idx) => {
    const x = 25 + idx * ((chartWidth - 50) / (borrower.cibilHistory.length - 1));
    const y = chartHeight - 15 - ((p.score - minScore) / (maxScore - minScore)) * (chartHeight - 30);
    return { x, y, score: p.score, month: p.month };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-sm bg-slate-900/60 animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-xl border border-slate-300 shadow-2xl overflow-hidden my-8">
        
        {/* Official Blue Portal Header */}
        <div className="bg-blue-900 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={borrower.avatarUrl}
              alt={name}
              className="w-14 h-14 rounded-lg object-cover border-2 border-white shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {name}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-800 text-blue-100 border border-blue-700">
                  {category}
                </span>
              </div>
              <p className="text-xs text-blue-100 font-medium">
                {business}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-blue-200 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{location}</span>
                <span>•</span>
                <span className="font-mono">Reference: {borrower.id}</span>
              </div>
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
        <div className="p-6 sm:p-7 space-y-5 max-h-[75vh] overflow-y-auto">
          
          {/* Plain English Recommendation Reason Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-800" />
              <span>{t.recommendationReasonTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
              "{reason}"
            </p>
          </div>

          {/* CIBIL History & Financial Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* CIBIL 4-Month Trend Graph */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  {t.cibilHistoryTitle}
                </h4>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                  {borrower.cibilScore} / 900
                </span>
              </div>

              {/* Sparkline Graphic */}
              <div className="pt-2 flex justify-center">
                <svg width={chartWidth} height={chartHeight} className="overflow-visible">
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#1e40af"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {points.map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill="#ffffff"
                        stroke="#1e40af"
                        strokeWidth="2.5"
                      />
                      <text
                        x={p.x}
                        y={p.y - 8}
                        textAnchor="middle"
                        fill="#0f172a"
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {p.score}
                      </text>
                      <text
                        x={p.x}
                        y={chartHeight - 2}
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize="9"
                      >
                        {p.month}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              <span className="text-[10px] text-slate-500 block text-center pt-1">
                Data authenticated via TransUnion CIBIL India
              </span>
            </div>

            {/* Key Loan Metrics */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                {t.loanDetailsTitle}
              </h4>
              <div className="space-y-1.5 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Requested Loan:</span>
                  <span className="font-bold font-mono text-slate-900">{formatCurrency(borrower.loanAmount, currency)}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Loan Tenure:</span>
                  <span className="font-bold text-slate-900">{borrower.loanTenureMonths} Months</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Expected Annual Profit:</span>
                  <span className="font-black text-emerald-800 font-mono">+{borrower.expectedAnnualProfit}%</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Cash Flow Stability:</span>
                  <span className="font-bold text-blue-900">{stability}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Stated Loan Purpose */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
              {t.loanPurposeLabel}
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {purpose}
            </p>
          </div>

          {/* Past Repayment Record Ledger */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {t.repaymentHistoryTitle}
              </h4>
              <span className="text-xs font-bold text-emerald-800">
                {pastRecord}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {borrower.repaymentLogs.map((log) => (
                <div key={log.id} className="bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                  <span className="text-[10px] text-slate-500 block">{log.date}</span>
                  <span className="text-xs font-bold font-mono text-slate-900 block mt-0.5">
                    {formatCurrency(log.amount, currency)}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 block mt-0.5">
                    ✓ Paid On-Time
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Documents */}
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900 flex-wrap gap-2">
            <span className="font-bold">{t.verifiedBadgesTitle}:</span>
            <div className="flex items-center gap-3 font-semibold">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>Aadhaar e-KYC</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>PAN Card Verified</span>
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>GSTIN & Udyam Active</span>
              </span>
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
            Close Details
          </button>
        </div>

      </div>
    </div>
  );
};

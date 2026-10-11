import React from 'react';
import { 
  X, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  Building2, 
  DollarSign, 
  Percent, 
  Activity,
  FileCheck,
  CreditCard,
  ArrowUpRight
} from 'lucide-react';
import { Borrower, Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { calculateNetRoi, formatCurrency } from '../utils/calculator';

interface ExplainAiModalProps {
  borrower: Borrower | null;
  onClose: () => void;
  language: Language;
  currency: Currency;
  investorRisk: number;
  onConfirmFund: (borrower: Borrower) => void;
}

export const ExplainAiModal: React.FC<ExplainAiModalProps> = ({
  borrower,
  onClose,
  language,
  currency,
  investorRisk,
  onConfirmFund,
}) => {
  if (!borrower) return null;

  const t = TRANSLATIONS[language];
  const netRoi = calculateNetRoi(borrower.nominalInterestRate, borrower.defaultProbability);
  const lossPenalty = Number((borrower.defaultProbability * 50).toFixed(2));

  // Localized getters
  const borrowerName = language === 'hi' ? borrower.nameHi : language === 'mr' ? borrower.nameMr : borrower.name;
  const businessName = language === 'hi' ? borrower.businessNameHi : language === 'mr' ? borrower.businessNameMr : borrower.businessName;
  const categoryName = language === 'hi' ? borrower.categoryHi : language === 'mr' ? borrower.categoryMr : borrower.category;
  const locationName = language === 'hi' ? borrower.locationHi : language === 'mr' ? borrower.locationMr : borrower.location;
  const loanPurpose = language === 'hi' ? borrower.loanPurposeHi : language === 'mr' ? borrower.loanPurposeMr : borrower.loanPurpose;
  const aiRationale = language === 'hi' ? borrower.aiRationaleHi : language === 'mr' ? borrower.aiRationaleMr : borrower.aiRationaleEn;

  // CIBIL SVG sparkline calculation
  const scores = borrower.cibilTrend.map((p) => p.score);
  const minScore = Math.min(...scores) - 15;
  const maxScore = Math.max(...scores) + 15;
  const chartHeight = 70;
  const chartWidth = 260;

  const points = borrower.cibilTrend.map((p, idx) => {
    const x = 20 + idx * ((chartWidth - 40) / (borrower.cibilTrend.length - 1));
    const y = chartHeight - 15 - ((p.score - minScore) / (maxScore - minScore)) * (chartHeight - 30);
    return { x, y, score: p.score, month: p.month };
  });

  const pathD = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-slate-950/80 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl rounded-3xl glass-panel-glow bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between p-6 sm:p-7 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-4">
            <img
              src={borrower.avatarUrl}
              alt={borrowerName}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/50 shadow-lg shadow-emerald-950"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {borrowerName}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {categoryName}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {businessName}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{locationName}</span>
                <span className="text-slate-600">•</span>
                <span className="text-emerald-400 font-mono">ID: {borrower.id}</span>
              </div>
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

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* AI Decision Rationale Banner */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-950/70 to-teal-950/30 border border-emerald-500/30 p-5 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>{t.aiMatchRationaleTitle}</span>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              "{aiRationale}"
            </p>
            <div className="mt-3 pt-3 border-t border-emerald-500/15 flex items-center justify-between text-xs text-slate-400">
              <span>Risk Alignment: Level {investorRisk}/10 Investor</span>
              <span className="text-emerald-400 font-mono font-semibold">Underwritten by Scout-Neural-70B</span>
            </div>
          </div>

          {/* Grid: CIBIL Score History & Return Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* CIBIL Score 4-Month Trend Chart */}
            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {t.aiCibilTrendTitle}
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <span className="text-slate-400">Current:</span>
                  <span className="text-emerald-400 font-black">{borrower.cibilScore}</span>
                  <span className="text-[10px] text-emerald-500 font-bold">(+17 pts)</span>
                </div>
              </div>

              {/* Sparkline Graphic */}
              <div className="pt-2 flex justify-center">
                <svg width={chartWidth} height={chartHeight} className="overflow-visible">
                  <defs>
                    <linearGradient id="cibilGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Connecting Line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Points with Tooltip Labels */}
                  {points.map((p, i) => (
                    <g key={i}>
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="4.5"
                        fill="#020617"
                        stroke="#34d399"
                        strokeWidth="2.5"
                      />
                      <text
                        x={p.x}
                        y={p.y - 9}
                        textAnchor="middle"
                        fill="#94a3b8"
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

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/80">
                <span>Bureau: TransUnion CIBIL India</span>
                <span className="text-emerald-400 font-medium">99.2% Credit Prime Tier</span>
              </div>
            </div>

            {/* Net ROI Formula Breakdown */}
            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Risk-Adjusted Return Anatomy
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Nominal Borrower APR:</span>
                  <span className="font-mono font-bold text-white">+{borrower.nominalInterestRate.toFixed(2)}%</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Statistical Default Risk:</span>
                  <span className="font-mono text-amber-400">{(borrower.defaultProbability * 100).toFixed(2)}%</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">50% Loss Severity Drag:</span>
                  <span className="font-mono text-rose-400">-{lossPenalty}%</span>
                </div>
                <div className="flex items-center justify-between pt-1.5 font-bold text-sm">
                  <span className="text-emerald-400">Net Expected ROI:</span>
                  <span className="font-mono font-black text-emerald-400 text-lg">
                    {netRoi.toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 bg-slate-900/80 p-2 rounded-lg border border-slate-800">
                Note: Credit Scout discounts raw interest rates with actuarial loss-given-default modeling.
              </div>
            </div>

          </div>

          {/* Cash Flow & Repayment Ledger */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Cash Flow Telemetry */}
            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  {t.aiCashFlowTitle}
                </h4>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Monthly Rev</span>
                  <span className="text-xs font-bold font-mono text-white">
                    {formatCurrency(borrower.monthlyRevenueUsd, currency)}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-0.5">DTI Ratio</span>
                  <span className="text-xs font-bold font-mono text-emerald-400">
                    {borrower.debtToIncomeRatio}%
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Stability</span>
                  <span className="text-xs font-bold text-teal-400">
                    {borrower.cashFlowStability}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                <span className="text-slate-300 font-semibold">Purpose: </span>
                {loanPurpose}
              </p>
            </div>

            {/* Repayment History Ledger */}
            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {t.aiRepaymentHistoryTitle}
                  </h4>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  {borrower.pastRepaymentRate}% On-Time
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                {borrower.pastRepaymentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-900/70 border border-slate-800/80"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-mono">{log.month}</span>
                      <span className="text-[10px] text-slate-400">({log.id})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-200">
                        {formatCurrency(log.amount, currency)}
                      </span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'EARLY' ? 'bg-teal-500/20 text-teal-400' :
                        log.status === 'ON_TIME' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {log.status === 'EARLY' ? 'Early' : log.status === 'ON_TIME' ? 'On-Time' : 'Grace'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Verified Credentials Pills */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-400 font-medium">{t.aiVerifiedCreds}:</span>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>GSTIN Audited</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-teal-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Udyam Registered MSME</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-cyan-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Aadhaar e-KYC Authenticated</span>
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>Direct micro-loan requirement: </span>
            <span className="text-white font-mono font-bold">{formatCurrency(borrower.loanAmountUsd, currency)}</span>
            <span className="text-slate-400"> ({borrower.termMonths} Months Term)</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onConfirmFund(borrower);
                onClose();
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20 active:scale-95 flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Deploy Smart Escrow Allocation</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

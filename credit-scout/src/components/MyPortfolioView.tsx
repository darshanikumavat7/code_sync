import React from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  ShieldCheck, 
  Calendar, 
  Coins, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Layers, 
  ArrowRight,
  PieChart,
  User,
  MapPin,
  Sparkles
} from 'lucide-react';
import { Language, Currency, Borrower } from '../types';
import { formatCurrency } from '../utils/calculator';
import { TRANSLATIONS } from '../data/translations';

interface MyPortfolioViewProps {
  language: Language;
  currency: Currency;
  onNavigateToWizard: () => void;
  onSelectBorrower: (borrower: Borrower) => void;
  borrowers: Borrower[];
}

export const MyPortfolioView: React.FC<MyPortfolioViewProps> = ({
  language,
  currency,
  onNavigateToWizard,
  onSelectBorrower,
  borrowers,
}) => {
  const t = TRANSLATIONS[language];

  // Active micro-funded contracts
  const activeContracts = borrowers.slice(0, 4);
  const totalCapital = 25000;
  const blendedProfitRate = 12.8;
  const totalEarningsInr = 1850;

  // Upcoming repayment schedule
  const repaymentSchedule = [
    { id: 'EMI-01', date: '15 Oct 2026', borrower: 'Sunil Jagtap', enterprise: 'Jagtap Hardware', amount: 845, status: 'DUE_SOON' },
    { id: 'EMI-02', date: '22 Oct 2026', borrower: 'Anita Patil', enterprise: 'Mauli Organic Grocery', amount: 920, status: 'ON_TRACK' },
    { id: 'EMI-03', date: '01 Nov 2026', borrower: 'Ramesh Shinde', enterprise: 'Shinde General Stores', amount: 1140, status: 'ON_TRACK' },
    { id: 'EMI-04', date: '10 Nov 2026', borrower: 'Prakash Gaikwad', enterprise: 'Gaikwad Floriculture', amount: 650, status: 'ON_TRACK' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Portfolio Ribbon */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-blue-800">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-800 text-blue-200 text-xs font-bold uppercase tracking-wider font-mono border border-blue-700">
              Active Investor Portfolio • Safe Micro-Lending
            </span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Capital Escrowed</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            My Micro-Investment Portfolio & Cashflows
          </h2>
          <p className="text-sm text-blue-200 leading-relaxed">
            Consolidated overview of all active community loans funded across Pune and PCMC micro-enterprises with live repayment trackers.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shrink-0 flex flex-col sm:items-end justify-center">
          <span className="text-xs text-blue-200">Want to allocate more micro-capital?</span>
          <button
            type="button"
            onClick={onNavigateToWizard}
            className="mt-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <span>+ Allocate New Capital</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Capital */}
        <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Capital Deployed</span>
            <Coins className="w-4 h-4 text-blue-900" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            {formatCurrency(totalCapital, currency)}
          </div>
          <p className="text-[11px] text-slate-600">
            Locked across {activeContracts.length} verified micro-borrowers
          </p>
        </div>

        {/* Expected Net Profit */}
        <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Blended Net Return</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-700">
            +{blendedProfitRate}% <span className="text-xs text-slate-500 font-normal">p.a.</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold">
            ~4.3% higher than bank fixed deposits
          </p>
        </div>

        {/* Cumulative Earnings */}
        <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Interest Collected</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-mono text-blue-900">
            {formatCurrency(totalEarningsInr, currency)}
          </div>
          <p className="text-[11px] text-slate-600">
            Auto-credited to Escrow Bank Account
          </p>
        </div>

        {/* Capital Safety Score */}
        <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
            <span>Average CIBIL Grade</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-900">
            786 <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">Prime</span>
          </div>
          <p className="text-[11px] text-slate-600">
            100% Aadhaar & e-KYC Counter-Signed
          </p>
        </div>

      </div>

      {/* Main Grid: Active Loan Portfolio & Repayment Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Active Funded Loans (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-300">
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Active Micro-Loan Contracts
              </h3>
              <p className="text-xs text-slate-500">
                Verified micro-enterprises actively servicing scheduled monthly repayments.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
              {activeContracts.length} Active Contracts
            </span>
          </div>

          <div className="space-y-4">
            {activeContracts.map((borrower) => (
              <div 
                key={borrower.id}
                className="bg-white rounded-xl border border-slate-300 hover:border-blue-500 p-5 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <img
                    src={borrower.avatarUrl}
                    alt={borrower.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">{borrower.name}</h4>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {borrower.businessCategory}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium">{borrower.businessName}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-800" />
                        <span>{borrower.location}</span>
                      </span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">{borrower.cibilScore} CIBIL</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-500 block">Allocated Capital</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {formatCurrency(borrower.poolGoalInr > 0 ? Math.round(totalCapital / activeContracts.length) : 5000, currency)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectBorrower(borrower)}
                    className="mt-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <span>Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Upcoming Repayments Schedule (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="pb-2 border-b border-slate-300">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-900" />
              <span>Upcoming EMI Repayment Schedule</span>
            </h3>
            <p className="text-xs text-slate-500">
              Direct ACH / NACH bank auto-debit payments from borrower accounts.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-300 shadow-sm p-5 space-y-4">
            <div className="space-y-3">
              {repaymentSchedule.map((item) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900">{item.borrower}</div>
                    <div className="text-[11px] text-slate-500">{item.enterprise}</div>
                    <div className="text-[10px] font-mono text-blue-900 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-700" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <div className="font-mono font-bold text-slate-900 text-sm">
                      {formatCurrency(item.amount, currency)}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                      item.status === 'DUE_SOON'
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {item.status === 'DUE_SOON' ? 'Due in 4 Days' : 'On Track'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Zero Moneylender Exploitation Guarantee</span>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-800">
                Borrowers pay fair peer rates (12-14% p.a.). High repayment rates of 98.4% across Pune & PCMC are supported by direct community escrow oversight.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

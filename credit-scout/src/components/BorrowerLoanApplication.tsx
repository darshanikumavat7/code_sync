import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Coins, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  BadgePercent, 
  Zap, 
  HelpCircle,
  FileCheck2,
  Check,
  AlertCircle
} from 'lucide-react';
import { Language, Currency, TargetTimeline, Borrower } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency, calculateBorrowerPreAssessment } from '../utils/calculator';
import { applyAsNewBorrower } from '../services/borrowerService';

interface BorrowerLoanApplicationProps {
  language: Language;
  currency: Currency;
  onSwitchToLender: () => void;
  onProceedToEscrow?: (amount: number) => void;
  onOpenNewBorrowerModal?: () => void;
  borrowers?: Borrower[];
  onSelectBorrower?: (borrower: Borrower) => void;
  onBorrowerCreated?: (borrower: Borrower) => void;
}

export const BorrowerLoanApplication: React.FC<BorrowerLoanApplicationProps> = ({
  language,
  currency,
  onSwitchToLender,
  onProceedToEscrow,
  onOpenNewBorrowerModal,
  borrowers = [],
  onSelectBorrower,
  onBorrowerCreated,
}) => {
  const t = TRANSLATIONS[language];

  // Application form states
  const [applicantName, setApplicantName] = useState('Sunil Jagtap');
  const [businessName, setBusinessName] = useState('Jagtap Hardware & Electrical Spares');
  const [businessCategory, setBusinessCategory] = useState('Electricals & Hardware');
  const [location, setLocation] = useState('Bhosari MIDC, PCMC');
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(65000);
  const [loanAmount, setLoanAmount] = useState<number>(30000);
  const [tenureMonths, setTenureMonths] = useState<1 | 3 | 6 | 12 | 24>(6);
  const [repaymentFreq, setRepaymentFreq] = useState<'DAILY' | 'WEEKLY' | 'MONTHLY'>('MONTHLY');
  const [loanPurpose, setLoanPurpose] = useState('Bulk purchase of electrical cables and switches for local housing repairs');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationRef, setApplicationRef] = useState('');

  // Loan presets
  const loanPresets = [10000, 25000, 30000, 50000, 75000];

  // Tenure options
  const tenureOptions: { id: 1 | 3 | 6 | 12 | 24; label: string; sub: string }[] = [
    { id: 1, label: '1 Month', sub: 'Fast Turn' },
    { id: 3, label: '3 Months', sub: 'Quarterly' },
    { id: 6, label: '6 Months', sub: 'Mid-Term' },
    { id: 12, label: '12 Months', sub: '1 Year' },
    { id: 24, label: '24 Months', sub: 'Long-Term' },
  ];

  // Common purposes
  const purposeOptions = [
    'Bulk purchase of electrical cables and switches for local housing repairs',
    'Procurement of raw materials for seasonal festival rush',
    'Inventory stocking for daily retail sales & groceries',
    'Shop machinery & commercial tool upgrade',
    'Immediate working capital for supplier invoice payments',
  ];

  // Live Instant Credit Pre-Assessment
  const preAssessment = useMemo(() => {
    return calculateBorrowerPreAssessment(loanAmount, tenureMonths, repaymentFreq, monthlyRevenue);
  }, [loanAmount, tenureMonths, repaymentFreq, monthlyRevenue]);

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `APP-PUN-${Math.floor(100000 + Math.random() * 900000)}`;
    setApplicationRef(ref);

    try {
      const res = await applyAsNewBorrower({
        fullName: applicantName,
        email: `${applicantName.toLowerCase().replace(/\s+/g, '.')}@peerfund.org`,
        phone: '+91 98220 12345',
        cityArea: location,
        businessName,
        businessCategory,
        requestedAmountInr: loanAmount,
        tenureMonths,
        purpose: loanPurpose,
        monthlyIncomeInr: monthlyRevenue,
        cibilSelfDeclaration: preAssessment.estimatedCibil,
        mockDocUploaded: 'Aadhaar_PAN_eKYC_Verified.pdf',
      });

      if (res.success && res.borrower && onBorrowerCreated) {
        onBorrowerCreated(res.borrower);
      }
    } catch (err) {
      console.warn('Local borrower registration fallback active:', err);
    }

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-blue-800">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-800 text-blue-200 text-xs font-bold uppercase tracking-wider font-mono border border-blue-700">
              Borrower Portal • Zero Collateral Micro-Credit
            </span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 font-mono flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400" />
              <span>Instant P2P Pre-Assessment</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            {t.borrowerPortalTitle}
          </h2>
          <p className="text-sm text-blue-200 leading-relaxed">
            {t.borrowerPortalSubtitle}
          </p>
        </div>

        {/* Action Controls: Prominent Apply as New Borrower & Switch to Lender */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shrink-0 flex flex-col sm:items-end justify-center gap-2.5">
          {onOpenNewBorrowerModal && (
            <button
              type="button"
              onClick={onOpenNewBorrowerModal}
              className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-1.5 border border-emerald-400 active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-emerald-100 fill-emerald-200" />
              <span>Apply as New Borrower</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-blue-200 hidden sm:inline">Investor view:</span>
            <button
              type="button"
              onClick={onSwitchToLender}
              className="px-3.5 py-1.5 rounded-lg bg-blue-800 hover:bg-blue-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1 border border-blue-700"
            >
              <span>Switch to Lender</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Application Form (Left) & Instant Pre-Assessment Engine (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Loan Application Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-300 shadow-sm p-6 sm:p-7 space-y-6">
          <div className="pb-4 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-900" />
              <span>Micro-Business Loan Application Details</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Fill in your micro-enterprise details to generate instant credit pre-qualification.
            </p>
          </div>

          <form onSubmit={handleSubmitApplication} className="space-y-5">
            
            {/* 1. Loan Amount Request */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="req-amount" className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  {t.requestedAmountLabel}
                </label>
                <span className="font-mono font-black text-blue-900 text-lg">
                  {formatCurrency(loanAmount, currency)}
                </span>
              </div>

              <input
                id="req-amount"
                type="range"
                min="5000"
                max="100000"
                step="2500"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-300 accent-blue-900"
              />

              {/* Quick Loan Presets */}
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[11px] text-slate-500 font-semibold">Presets:</span>
                {loanPresets.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setLoanAmount(amt)}
                    className={`px-2.5 py-1 rounded text-xs font-bold transition-all border ${
                      loanAmount === amt
                        ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                    }`}
                  >
                    {formatCurrency(amt, currency)}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Repayment Tenure & Repayment Frequency */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Tenure Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-900" />
                  <span>{t.repaymentTenureLabel}</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {tenureOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setTenureMonths(opt.id)}
                      className={`p-2 rounded-lg text-xs font-bold transition-all text-center border ${
                        tenureMonths === opt.id
                          ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                      }`}
                    >
                      <span className="block">{opt.label}</span>
                      <span className={`text-[10px] block font-normal ${tenureMonths === opt.id ? 'text-blue-200' : 'text-slate-500'}`}>
                        {opt.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Repayment Frequency */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-900" />
                  <span>{t.repaymentFreqLabel}</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['DAILY', 'WEEKLY', 'MONTHLY'] as const).map((freq) => (
                    <button
                      key={freq}
                      type="button"
                      onClick={() => setRepaymentFreq(freq)}
                      className={`p-2 rounded-lg text-xs font-bold transition-all text-center border ${
                        repaymentFreq === freq
                          ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                      }`}
                    >
                      <span>{freq === 'DAILY' ? 'Daily' : freq === 'WEEKLY' ? 'Weekly' : 'Monthly'}</span>
                      <span className={`text-[10px] block font-normal ${repaymentFreq === freq ? 'text-blue-200' : 'text-slate-500'}`}>
                        {freq === 'DAILY' ? 'Micro-Pay' : freq === 'WEEKLY' ? 'Batched' : 'Standard'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* 3. Applicant & Business Identity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <label htmlFor="app-name" className="text-xs font-bold text-slate-700">
                  {t.applicantNameLabel}
                </label>
                <input
                  id="app-name"
                  type="text"
                  required
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="biz-name" className="text-xs font-bold text-slate-700">
                  {t.businessNameLabel}
                </label>
                <input
                  id="biz-name"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="biz-cat" className="text-xs font-bold text-slate-700">
                  {t.businessCategoryLabel}
                </label>
                <select
                  id="biz-cat"
                  value={businessCategory}
                  onChange={(e) => setBusinessCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white"
                >
                  <option value="Essential Grocery">Essential Grocery & Kirana</option>
                  <option value="Electricals & Hardware">Electricals & Hardware</option>
                  <option value="Textile & Apparel">Textile, Handloom & Apparel</option>
                  <option value="Agriculture & Dairy">Agriculture, Dairy & Milk</option>
                  <option value="Electronics & IT Services">Electronics Repair & IT</option>
                  <option value="Logistics & Transport">Transport & Logistics</option>
                  <option value="Floriculture & Events">Floriculture & Event Supplies</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="biz-loc" className="text-xs font-bold text-slate-700">
                  {t.businessLocationLabel}
                </label>
                <input
                  id="biz-loc"
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  placeholder="e.g. Bhosari MIDC, PCMC or Kothrud, Pune"
                />
              </div>
            </div>

            {/* 4. Monthly Revenue */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="biz-rev" className="text-xs font-bold text-slate-700">
                  {t.monthlyRevenueLabel}
                </label>
                <span className="text-xs font-mono font-bold text-slate-900">
                  {formatCurrency(monthlyRevenue, currency)} / month
                </span>
              </div>
              <input
                id="biz-rev"
                type="number"
                min="10000"
                max="500000"
                step="5000"
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold"
              />
            </div>

            {/* 5. Stated Purpose */}
            <div className="space-y-1.5">
              <label htmlFor="loan-purp" className="text-xs font-bold text-slate-700">
                {t.loanPurposeLabel}
              </label>
              <textarea
                id="loan-purp"
                rows={2}
                value={loanPurpose}
                onChange={(e) => setLoanPurpose(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                placeholder="Describe how the loan will be used..."
              />
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] text-slate-500">Suggested:</span>
                {purposeOptions.slice(0, 2).map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLoanPurpose(p)}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded truncate max-w-[240px]"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-slate-200">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <FileCheck2 className="w-4 h-4 text-emerald-400" />
                <span>{t.submitLoanBtn}</span>
              </button>
            </div>

          </form>
        </div>

        {/* Right Column: Instant Credit Pre-Assessment Dashboard (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 space-y-5 shadow-xl border border-slate-800 relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block font-mono">
                  Live Algorithmic Assessment
                </span>
                <h4 className="text-lg font-black text-white mt-0.5">
                  {t.preAssessmentTitle}
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-xs font-bold">
                ✓ Pre-Qualified
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed relative z-10">
              {t.preAssessmentSubtitle}
            </p>

            {/* Pre-Assessment Highlight Cards */}
            <div className="grid grid-cols-2 gap-3 relative z-10">
              
              {/* Estimated CIBIL */}
              <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {t.preAssessmentCibil}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    {preAssessment.estimatedCibil}
                  </span>
                  <span className="text-[10px] text-emerald-300 font-semibold">
                    Prime Grade
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block">
                  Based on ₹{(monthlyRevenue).toLocaleString('en-IN')} revenue
                </span>
              </div>

              {/* Indicative Interest */}
              <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1">
                <span className="text-[10px] text-slate-400 block uppercase font-bold">
                  {t.preAssessmentRate}
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black font-mono text-blue-400">
                    ~{preAssessment.indicativeInterestRate}%
                  </span>
                  <span className="text-[10px] text-blue-300 font-semibold">
                    p.a.
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 block">
                  Direct P2P rate (No bank markup)
                </span>
              </div>

            </div>

            {/* Estimated Installment Banner */}
            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 space-y-2 relative z-10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-300 font-bold uppercase tracking-wider text-[10px]">
                  {repaymentFreq === 'DAILY' ? t.freqDaily : repaymentFreq === 'WEEKLY' ? t.freqWeekly : t.freqMonthly}
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-200">
                  {tenureMonths} Months Repayment
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white font-mono">
                  {formatCurrency(preAssessment.installmentAmount, currency)}
                </span>
                <span className="text-xs text-emerald-300 font-medium">
                  / {repaymentFreq === 'DAILY' ? 'day' : repaymentFreq === 'WEEKLY' ? 'week' : 'month'}
                </span>
              </div>

              <div className="pt-2 border-t border-emerald-800/60 flex items-center justify-between text-[11px] text-emerald-200">
                <span>Total Repayable:</span>
                <span className="font-mono font-bold text-white">
                  {formatCurrency(preAssessment.totalRepayable, currency)}
                </span>
              </div>
            </div>

            {/* Disbursal & Protection Checklist */}
            <div className="space-y-2 pt-2 text-xs text-slate-300 relative z-10 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Collateral Required for loans up to ₹1,00,000</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Funds disbursed directly via RBI-Compliant Bank Escrow</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant fractional listing across community retail lenders</span>
              </div>
            </div>

          </div>

          {/* Low-Income Micro-Enterprise Guarantee Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-blue-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-800" />
              <span>Small Business & Micro-Enterprise Safety Standard</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600">
              PeerFund protects micro-borrowers from high moneylender rates (36%–60%). Through fractional community funding, small enterprises receive capital at fair, RBI-capped peer rates.
            </p>
          </div>

        </div>

      </div>

      {/* Pre-loaded Active Borrower Profiles (Pune & PCMC Region) */}
      {borrowers && borrowers.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">
                  Active Verified Borrower Network (Pune & PCMC)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-300 font-mono">
                  {borrowers.length} Live Profiles
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                Pre-loaded Pune & PCMC micro-enterprise profiles seeking low-cost community credit.
              </p>
            </div>

            {onOpenNewBorrowerModal && (
              <button
                type="button"
                onClick={onOpenNewBorrowerModal}
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                <span>+ Apply as New Borrower</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {borrowers.map((b) => (
              <div 
                key={b.id} 
                className={`bg-white rounded-xl border p-4 shadow-sm flex flex-col justify-between space-y-3 transition-all hover:border-blue-400 ${
                  b.isNewListing ? 'border-2 border-purple-400 ring-2 ring-purple-100 shadow-md' : 'border-slate-300'
                }`}
              >
                <div>
                  {b.isNewListing && (
                    <div className="mb-2 p-1.5 rounded bg-purple-50 border border-purple-300 text-purple-900 text-[10px] font-bold flex items-center justify-between">
                      <span>✨ JUST ONBOARDED APPLICANT</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.2 bg-purple-200 rounded">LIVE</span>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <img 
                      src={b.avatarUrl} 
                      alt={b.name} 
                      className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0" 
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{b.name}</h4>
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                          {b.cibilScore} CIBIL
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 truncate">{b.businessName}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{b.location}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-lg p-2.5 text-xs font-mono space-y-1.5 border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Loan Goal:</span>
                    <span className="font-bold text-slate-900">{formatCurrency(b.poolGoalInr, currency)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tenure:</span>
                    <span className="font-bold text-blue-900">{b.loanTenureMonths} Months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Investor Return:</span>
                    <span className="font-bold text-emerald-700">+{b.expectedAnnualProfit}% p.a.</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {onSelectBorrower && (
                    <button
                      type="button"
                      onClick={() => onSelectBorrower(b)}
                      className="w-full py-2 px-3 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-xs"
                    >
                      <span>View Profile & Financials</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Submission Success Notice Modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/60 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-300 shadow-2xl p-6 sm:p-8 space-y-5 text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono">
                {t.loanApprovedBadge}
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight pt-2">
                {t.applicationSuccessTitle}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.applicationSuccessDesc}
              </p>
            </div>

            {/* Application Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Application Reference:</span>
                <span className="font-bold text-slate-900">{applicationRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold text-slate-900">{applicantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Enterprise:</span>
                <span className="font-bold text-slate-900">{businessName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Approved Loan Amount:</span>
                <span className="font-bold text-emerald-700 text-sm">{formatCurrency(loanAmount, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tenure:</span>
                <span className="font-bold text-slate-900">{tenureMonths} Months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Repayment Installment:</span>
                <span className="font-bold text-blue-900">
                  {formatCurrency(preAssessment.installmentAmount, currency)} / {repaymentFreq.toLowerCase()}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {onProceedToEscrow && (
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    onProceedToEscrow(loanAmount);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-black transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-200" />
                  <span>{t.proceedToPayBtn} ({formatCurrency(loanAmount, currency)})</span>
                </button>
              )}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="w-1/2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  Close Application
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    onSwitchToLender();
                  }}
                  className="w-1/2 py-2.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>View Lender Pool</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

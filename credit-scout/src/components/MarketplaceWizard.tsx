import React from 'react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  TrendingUp, 
  Building2, 
  ShieldCheck, 
  Coins, 
  Calendar, 
  Sparkles, 
  Lock, 
  FileText, 
  CreditCard,
  Layers,
  FileCheck2,
  AlertCircle
} from 'lucide-react';
import { 
  Language, 
  Currency, 
  UserRole, 
  TargetTimeline, 
  BorrowerMatch, 
  Borrower, 
  WizardStep 
} from '../types';
import { formatCurrency } from '../utils/calculator';
import { TRANSLATIONS } from '../data/translations';

import { MatchingControls } from './MatchingControls';
import { SmartBasketSplit } from './SmartBasketSplit';
import { BorrowerCard } from './BorrowerCard';
import { BorrowerLoanApplication } from './BorrowerLoanApplication';

interface MarketplaceWizardProps {
  language: Language;
  currency: Currency;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeStep: WizardStep;
  onStepChange: (step: WizardStep) => void;
  
  // Matching States
  budgetInr: number;
  setBudgetInr: (budget: number) => void;
  targetTimeline: TargetTimeline;
  setTargetTimeline: (timeline: TargetTimeline) => void;
  isPortfolioLocked: boolean;
  setIsPortfolioLocked: (locked: boolean) => void;
  basketCount: number;
  setBasketCount: (count: number) => void;
  riskLevel: number;
  setRiskLevel: (risk: number) => void;
  expectedAnnualProfit: number;
  averageCibil: number;
  
  // Data
  allMatches: BorrowerMatch[];
  topMatches: BorrowerMatch[];
  borrowersList: Borrower[];
  onSelectBorrower: (borrower: Borrower) => void;
  onOpenProfitModal: () => void;
  onOpenNewBorrowerModal: () => void;
  onProceedToEscrow: (amount: number, role: UserRole) => void;
  onBorrowerCreated: (borrower: Borrower) => void;
}

export const MarketplaceWizard: React.FC<MarketplaceWizardProps> = ({
  language,
  currency,
  currentRole,
  onRoleChange,
  activeStep,
  onStepChange,
  budgetInr,
  setBudgetInr,
  targetTimeline,
  setTargetTimeline,
  isPortfolioLocked,
  setIsPortfolioLocked,
  basketCount,
  setBasketCount,
  riskLevel,
  setRiskLevel,
  expectedAnnualProfit,
  averageCibil,
  allMatches,
  topMatches,
  borrowersList,
  onSelectBorrower,
  onOpenProfitModal,
  onOpenNewBorrowerModal,
  onProceedToEscrow,
  onBorrowerCreated,
}) => {
  const t = TRANSLATIONS[language];

  const stepsConfig: { step: WizardStep; title: string; subtitle: string }[] = [
    { step: 1, title: 'Select Role', subtitle: currentRole === 'investor' ? 'Retail Investor' : 'Micro-Borrower' },
    { step: 2, title: 'Budget & Timeline', subtitle: `${formatCurrency(budgetInr, currency)} • ${targetTimeline === 0 ? 'All' : targetTimeline + 'M'}` },
    { step: 3, title: 'Allocations & Lock', subtitle: `${basketCount} Matches • 100% Locked` },
    { step: 4, title: 'Escrow & Receipt', subtitle: 'SBI Trustee • Verified' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* PROGRESSIVE DISCLOSURE WIZARD STEPPER */}
      <nav aria-label="Portal Wizard Steps" className="bg-white rounded-2xl border border-slate-300 p-3 sm:p-4 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
          {stepsConfig.map((item) => {
            const isCurrent = activeStep === item.step;
            const isCompleted = activeStep > item.step;

            return (
              <button
                key={item.step}
                type="button"
                onClick={() => onStepChange(item.step)}
                className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                  isCurrent
                    ? 'bg-blue-900 text-white border-blue-950 shadow-md ring-2 ring-blue-500/20'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-950 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                  isCurrent
                    ? 'bg-blue-800 text-white border border-blue-700'
                    : isCompleted
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-slate-600 border border-slate-300'
                }`}>
                  {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : item.step}
                </div>

                <div className="min-w-0 flex-1">
                  <div className={`text-xs font-bold truncate ${isCurrent ? 'text-white' : isCompleted ? 'text-emerald-950' : 'text-slate-900'}`}>
                    {item.title}
                  </div>
                  <div className={`text-[11px] truncate font-mono ${isCurrent ? 'text-blue-200' : isCompleted ? 'text-emerald-700' : 'text-slate-500'}`}>
                    {item.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </nav>

      {/* STEP 1: SELECT DUAL ROLE */}
      {activeStep === 1 && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold font-mono">
              Step 1 of 4: Portal Role Specification
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
              How would you like to participate today?
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              PeerFund connects community retail investors directly with verified Pune and PCMC micro-enterprises through RBI-regulated escrow accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-2">
            
            {/* Investor Mode Card */}
            <div 
              onClick={() => {
                onRoleChange('investor');
                onStepChange(2);
              }}
              className={`p-6 sm:p-7 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-6 bg-white hover:shadow-xl ${
                currentRole === 'investor' 
                  ? 'border-blue-900 ring-4 ring-blue-100 shadow-lg' 
                  : 'border-slate-300 hover:border-blue-500'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-md">
                    <TrendingUp className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="px-2.5 py-1 rounded bg-blue-100 text-blue-900 text-xs font-bold font-mono border border-blue-300">
                    Lender Portal
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    I Want to Invest (Earn Returns)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Deploy micro-capital from ₹500 to ₹50,000 across pre-vetted small businesses. Earn 11%–14% p.a. with Scheduled Commercial Bank Escrow Trustee protection.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Micro-Tickets from ₹500 ($10)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% Capital Lock & Zero Idle Cash</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Prime Grade CIBIL Credit Ratings (770+)</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Continue as Retail Investor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Borrower Mode Card */}
            <div 
              onClick={() => {
                onRoleChange('borrower');
              }}
              className={`p-6 sm:p-7 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between space-y-6 bg-white hover:shadow-xl ${
                currentRole === 'borrower' 
                  ? 'border-blue-900 ring-4 ring-blue-100 shadow-lg' 
                  : 'border-slate-300 hover:border-blue-500'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-md">
                    <Building2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 text-xs font-bold font-mono border border-amber-300">
                    Borrower Portal
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-slate-900">
                    I Need a Micro-Loan (Borrower)
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Zero-collateral micro-credit for Pune & PCMC enterprises (₹500 to ₹50,000). Escape high moneylender interest rates (36%+) through community retail capital.
                  </p>
                </div>

                <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Instant P2P Algorithmic Credit Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Zero Collateral up to ₹1,00,000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Live Dynamic Marketplace Listing</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRoleChange('borrower');
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>Borrower Pre-Assessment Form</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenNewBorrowerModal();
                  }}
                  className="py-3 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-1"
                  title="Apply as New Borrower"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Apply New</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* STEP 2: SET BUDGET & TIMELINE (Lender) OR BORROWER PORTAL */}
      {activeStep === 2 && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          {currentRole === 'investor' ? (
            <>
              <div className="flex items-center justify-between pb-2 border-b border-slate-300">
                <div>
                  <span className="text-[11px] font-bold text-blue-900 font-mono uppercase tracking-wider">
                    Step 2 of 4: Accessible Allocation Controls
                  </span>
                  <h3 className="text-xl font-black text-slate-900 tracking-tight">
                    Set Portfolio Allocation Budget & Repayment Timeline
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onStepChange(1)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Role</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onStepChange(3)}
                    className="px-4 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <span>Proceed to Step 3: Allocations</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <MatchingControls
                language={language}
                currency={currency}
                budgetInr={budgetInr}
                setBudgetInr={setBudgetInr}
                targetTimeline={targetTimeline}
                setTargetTimeline={setTargetTimeline}
                isPortfolioLocked={isPortfolioLocked}
                setIsPortfolioLocked={setIsPortfolioLocked}
                basketCount={basketCount}
                setBasketCount={setBasketCount}
                riskLevel={riskLevel}
                setRiskLevel={setRiskLevel}
                expectedAnnualProfit={expectedAnnualProfit}
                averageCibil={averageCibil}
              />

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-950">
                      Capital Allocation: {formatCurrency(budgetInr, currency)} • {targetTimeline === 0 ? 'Flexible Duration' : `${targetTimeline} Months Duration`}
                    </div>
                    <p className="text-[11px] text-blue-800">
                      Ready to auto-distribute across {basketCount} top safe Pune & PCMC micro-enterprises with 100% balance lock.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onStepChange(3)}
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Review Borrowers & Basket Split</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <BorrowerLoanApplication
              language={language}
              currency={currency}
              onSwitchToLender={() => onRoleChange('investor')}
              onProceedToEscrow={(amount) => onProceedToEscrow(amount, 'borrower')}
              onOpenNewBorrowerModal={onOpenNewBorrowerModal}
              borrowers={borrowersList}
              onSelectBorrower={onSelectBorrower}
              onBorrowerCreated={onBorrowerCreated}
            />
          )}
        </div>
      )}

      {/* STEP 3: ALLOCATIONS & BALANCE LOCK */}
      {activeStep === 3 && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-300">
            <div>
              <span className="text-[11px] font-bold text-blue-900 font-mono uppercase tracking-wider">
                Step 3 of 4: Dynamic Basket Diversification
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Lock Portfolio Balance Across Top Safe Matches
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => onStepChange(2)}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Adjust Budget</span>
              </button>
              <button
                type="button"
                onClick={() => onStepChange(4)}
                className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>Proceed to Escrow (Step 4)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Smart Basket Split Component */}
          <SmartBasketSplit
            top5Matches={topMatches}
            language={language}
            currency={currency}
            totalBudgetInr={budgetInr}
            isPortfolioLocked={isPortfolioLocked}
            onSelectBorrower={onSelectBorrower}
          />

          {/* Active Marketplace Listings */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-lg font-bold text-slate-900">
                  Individual Micro-Borrower Match Cards
                </h4>
                <p className="text-xs text-slate-600">
                  Prioritized by budget alignment, CIBIL grade, and regional micro-lending demand.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onOpenNewBorrowerModal}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                  <span>+ Apply as Borrower</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allMatches.map((match) => (
                <BorrowerCard
                  key={match.borrower.id}
                  match={match}
                  language={language}
                  currency={currency}
                  onOpenDetails={onSelectBorrower}
                />
              ))}
            </div>
          </div>

          {/* Step 3 Footer Navigation */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="text-sm font-bold flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>100% Portfolio Balance Locked • ₹0 Idle Cash</span>
              </div>
              <p className="text-xs text-slate-400">
                Ready for bank escrow authorization via UPI, NetBanking, or Cards.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onStepChange(4)}
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Lock Balance & Proceed to Escrow Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ESCROW PAYMENT & VERIFIED RECEIPT */}
      {activeStep === 4 && (
        <div className="space-y-6 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-300">
            <div>
              <span className="text-[11px] font-bold text-blue-900 font-mono uppercase tracking-wider">
                Step 4 of 4: Escrow Execution & Official Receipt
              </span>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Authorize Escrow Payment & Generate Counter-Signed Receipt
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onStepChange(3)}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Basket</span>
            </button>
          </div>

          {/* Payment & Escrow Review Box */}
          <div className="bg-white rounded-2xl border-2 border-blue-900 p-6 sm:p-8 shadow-xl space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold shadow-md">
                  <ShieldCheck className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    RBI-Compliant Scheduled Bank Escrow Authorization
                  </h4>
                  <p className="text-xs text-slate-600">
                    Trustee: State Bank of India / ICICI P2P Escrow Trustee Account
                  </p>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 uppercase tracking-wider block font-bold">
                  Total Escrow Capital
                </span>
                <span className="text-3xl font-black font-mono text-emerald-700">
                  {formatCurrency(budgetInr, currency)}
                </span>
              </div>
            </div>

            {/* Allocation Breakdown Summary */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                Direct Beneficiary Micro-Borrowers (Pune & PCMC):
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {topMatches.map((m) => (
                  <div key={m.borrower.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="font-bold text-slate-900 truncate">{m.borrower.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{m.borrower.businessName}</div>
                    <div className="flex justify-between font-mono pt-1 border-t border-slate-200 text-[11px]">
                      <span className="text-slate-600">{m.allocationPercent}% Share</span>
                      <span className="font-bold text-blue-900">{formatCurrency(m.allocatedAmountInr, currency)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Gateway Apps Strip */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 block uppercase tracking-wide">
                Supported Instant Payment Apps:
              </span>
              <div className="flex items-center gap-3 flex-wrap text-xs font-semibold text-slate-700">
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 shadow-xs flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-blue-700" />
                  <span>Google Pay (UPI)</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 shadow-xs flex items-center gap-1.5">
                  <CreditCard className="w-3.5 h-3.5 text-purple-700" />
                  <span>PhonePe (UPI)</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 shadow-xs flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Paytm / BHIM UPI</span>
                </span>
                <span className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 shadow-xs flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-700" />
                  <span>SBI / HDFC NetBanking</span>
                </span>
              </div>
            </div>

            {/* Launch Payment Modal CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Convenience Fee: <strong className="text-slate-900 font-mono">₹0.00</strong> • Instant official dual-party receipt generation.
              </div>

              <button
                type="button"
                onClick={() => onProceedToEscrow(budgetInr, currentRole)}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-200" />
                <span>Proceed to Pay / Escrow ({formatCurrency(budgetInr, currency)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  ShieldCheck, 
  TrendingUp, 
  Lock, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Printer, 
  FileCheck,
  Calendar,
  Sparkles
} from 'lucide-react';

import { Language, Currency, Borrower, TransactionReceipt, TargetTimeline, UserRole, AuthUser } from './types';
import { MOCK_BORROWERS } from './data/mockBorrowers';
import { computeSmartBasket, formatCurrency, generateOfficialReceipt } from './utils/calculator';
import { TRANSLATIONS } from './data/translations';
import { getCurrentUser, logoutUser } from './services/authService';
import { getCustomMarketplaceBorrowers } from './services/borrowerService';

import { Header } from './components/Header';
import { MatchingControls } from './components/MatchingControls';
import { SmartBasketSplit } from './components/SmartBasketSplit';
import { BorrowerCard } from './components/BorrowerCard';
import { BorrowerDetailsModal } from './components/BorrowerDetailsModal';
import { ProfitComparisonModal } from './components/ProfitComparisonModal';
import { OfficialReceiptModal } from './components/OfficialReceiptModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { BorrowerLoanApplication } from './components/BorrowerLoanApplication';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { AuthModal } from './components/AuthModal';
import { NewBorrowerModal } from './components/NewBorrowerModal';
import { Footer } from './components/Footer';

export function App() {
  // Dual-Role Switcher: 'investor' (Lender Mode) vs. 'borrower' (Borrower Mode)
  const [currentRole, setCurrentRole] = useState<UserRole>('investor');

  // User Authentication State (Zero Rate Limit In-Memory & LocalStorage)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isNewBorrowerModalOpen, setIsNewBorrowerModalOpen] = useState<boolean>(false);

  // Active Borrowers List (Pre-loaded Pune & PCMC + Dynamically Added Onboarding Borrowers)
  const [borrowersList, setBorrowersList] = useState<Borrower[]>(() => {
    const custom = getCustomMarketplaceBorrowers();
    const customIds = new Set(custom.map((c) => c.id));
    return [...custom, ...MOCK_BORROWERS.filter((b) => !customIds.has(b.id))];
  });

  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  // Primary States with inclusive micro-budget defaults
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('INR');
  const [budgetInr, setBudgetInr] = useState<number>(5000); // Default ₹5,000 (range ₹500 to ₹50,000)
  const [targetTimeline, setTargetTimeline] = useState<TargetTimeline>(0); // 0 = All Timelines
  const [isPortfolioLocked, setIsPortfolioLocked] = useState<boolean>(true); // Lock Balance (Zero Idle Cash)
  const [basketCount, setBasketCount] = useState<number>(5); // 3 to 5 matching borrowers
  const [riskLevel, setRiskLevel] = useState<number>(3); // Level 3 = Maximum Capital Safety

  // Modals
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);
  const [isProfitModalOpen, setIsProfitModalOpen] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [paymentModalAmount, setPaymentModalAmount] = useState<number>(5000);
  const [paymentModalRole, setPaymentModalRole] = useState<UserRole>('investor');
  const [activeReceipt, setActiveReceipt] = useState<TransactionReceipt | null>(null);

  const t = TRANSLATIONS[language];

  // REAL-TIME RECALCULATION & RE-RANKING VIA useMemo
  // Recalculates dynamically based on Budget, Timeline, Risk, and Basket Size
  const allMatches = useMemo(() => {
    return computeSmartBasket(
      borrowersList,
      riskLevel,
      budgetInr,
      targetTimeline,
      isPortfolioLocked,
      basketCount
    );
  }, [borrowersList, riskLevel, budgetInr, targetTimeline, isPortfolioLocked, basketCount]);

  // Top Safe Matches for Smart Basket Split (3 to 5 borrowers)
  const topMatches = useMemo(() => {
    return allMatches.slice(0, basketCount);
  }, [allMatches, basketCount]);

  // Weighted Portfolio Metrics
  const { expectedAnnualProfit, averageCibil } = useMemo(() => {
    if (topMatches.length === 0) return { expectedAnnualProfit: 11.5, averageCibil: 750 };

    let weightedProfit = 0;
    let sumCibil = 0;

    topMatches.forEach((m) => {
      const share = m.allocationPercent / 100;
      weightedProfit += m.borrower.expectedAnnualProfit * share;
      sumCibil += m.borrower.cibilScore;
    });

    return {
      expectedAnnualProfit: Number(weightedProfit.toFixed(1)),
      averageCibil: Math.round(sumCibil / topMatches.length),
    };
  }, [topMatches]);

  // Auth and Borrower Handlers
  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const handleBorrowerCreated = (newBorrower: Borrower) => {
    setBorrowersList((prev) => [newBorrower, ...prev.filter((b) => b.id !== newBorrower.id)]);
    setNotificationToast(`🎉 Borrower "${newBorrower.name}" dynamically listed on live marketplace!`);
    setTimeout(() => setNotificationToast(null), 6000);
  };

  // Trigger Payment Gateway & Escrow Modal
  const handleOpenPayment = (amount: number = budgetInr, role: UserRole = currentRole) => {
    setPaymentModalAmount(amount);
    setPaymentModalRole(role);
    setIsPaymentModalOpen(true);
  };

  // Payment Verified Success Handler: launches receipt modal
  const handlePaymentSuccess = (receipt: TransactionReceipt) => {
    setIsPaymentModalOpen(false);
    setActiveReceipt(receipt);
  };

  const perfectMatchCount = allMatches.filter((m) => m.matchBadgeLabel).length;
  const timelineMatchCount = allMatches.filter((m) => m.isTimelineMatch).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      
      {/* Dynamic Marketplace Listing Notification Toast */}
      {notificationToast && (
        <div className="fixed top-16 right-4 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-emerald-500 animate-in slide-in-from-top duration-300 max-w-md flex items-center justify-between gap-3 font-sans">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold">{notificationToast}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotificationToast(null)}
            className="text-slate-400 hover:text-white text-xs font-bold px-1.5 py-0.5 rounded"
          >
            ✕
          </button>
        </div>
      )}

      {/* Official Government & Bank Style Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        onOpenProfitModal={() => setIsProfitModalOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {currentRole === 'investor' ? (
          <>
            {/* Step 1: Accessible Budget & Timeline Controls */}
            <section aria-label="Smart Budget, Timeline & Micro-Lending Controls">
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
            </section>

            {/* Step 2: Smart Basket Split (100% Capital Lock & Zero Idle Cash) */}
            <section aria-label="Capital Diversification Split">
              <SmartBasketSplit
                top5Matches={topMatches}
                language={language}
                currency={currency}
                totalBudgetInr={budgetInr}
                isPortfolioLocked={isPortfolioLocked}
                onSelectBorrower={(b) => setSelectedBorrower(b)}
              />
            </section>

            {/* Step 3: Verified Micro-Borrowers (Pune & PCMC Region) */}
            <section aria-label="Verified Micro-Borrower Listings" className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-300">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
                      {t.borrowersListTitle}
                    </h3>
                    {targetTimeline > 0 && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-300 font-mono">
                        Filtered by: {targetTimeline} Months
                      </span>
                    )}
                    {budgetInr <= 2000 && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono">
                        Micro-Ticket Mode (₹{budgetInr.toLocaleString('en-IN')})
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {t.borrowersListSubtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {perfectMatchCount > 0 && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-300 font-mono flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{perfectMatchCount} Perfect 100% Matches</span>
                    </span>
                  )}
                  {targetTimeline > 0 && (
                    <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 font-mono">
                      {timelineMatchCount} with {targetTimeline}M Tenure
                    </span>
                  )}
                  <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-300 shadow-sm font-mono">
                    {borrowersList.length} Verified Micro-Enterprises
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsNewBorrowerModalOpen(true)}
                    className="px-3 py-1 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
                    <span>+ Apply as Borrower</span>
                  </button>
                </div>
              </div>

              {/* Grid of Borrower Cards with "100% Match" badges and fractional progress */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {allMatches.map((match) => (
                  <BorrowerCard
                    key={match.borrower.id}
                    match={match}
                    language={language}
                    currency={currency}
                    onOpenDetails={(b) => setSelectedBorrower(b)}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Borrower Mode: Micro-Loan Application Form & Instant Pre-Assessment */
          <BorrowerLoanApplication
            language={language}
            currency={currency}
            onSwitchToLender={() => setCurrentRole('investor')}
            onProceedToEscrow={(amount) => handleOpenPayment(amount, 'borrower')}
            onOpenNewBorrowerModal={() => setIsNewBorrowerModalOpen(true)}
            borrowers={borrowersList}
            onSelectBorrower={(b) => setSelectedBorrower(b)}
            onBorrowerCreated={handleBorrowerCreated}
          />
        )}

      </main>

      {/* Floating 1-Click Fund Portfolio Bottom Dock - Only in Lender/Investor Mode */}
      {currentRole === 'investor' && (
        <div className="sticky bottom-4 z-30 max-w-3xl mx-auto px-4 w-full no-print">
          <div className="bg-white border-2 border-blue-900 rounded-xl p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                  <span>Fund Micro-Portfolio ({formatCurrency(budgetInr, currency)})</span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono">
                    +{expectedAnnualProfit}% Profit / Year
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {isPortfolioLocked
                    ? '🔒 100% Balance Locked Across Top Matches • ₹0 Idle Cash'
                    : 'Secured via Scheduled Commercial Bank Escrow Account'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsProfitModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 text-xs font-bold transition-colors"
              >
                <TrendingUp className="w-4 h-4 text-blue-900" />
                <span>Compare with FD</span>
              </button>

              <button
                type="button"
                onClick={() => handleOpenPayment(budgetInr, 'investor')}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{t.proceedToPayBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Government & Bank Portal Footer */}
      <Footer language={language} />

      {/* Modals */}
      <BorrowerDetailsModal
        borrower={selectedBorrower}
        onClose={() => setSelectedBorrower(null)}
        language={language}
        currency={currency}
      />

      <ProfitComparisonModal
        isOpen={isProfitModalOpen}
        onClose={() => setIsProfitModalOpen(false)}
        language={language}
        currency={currency}
        initialCapital={budgetInr}
        expectedAnnualProfit={expectedAnnualProfit}
      />

      <PaymentGatewayModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        language={language}
        currency={currency}
        amountInr={paymentModalAmount}
        userRole={paymentModalRole}
        topMatches={topMatches}
        targetTimeline={targetTimeline}
        isPortfolioLocked={isPortfolioLocked}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <OfficialReceiptModal
        receipt={activeReceipt}
        onClose={() => setActiveReceipt(null)}
        language={language}
      />

      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={language}
        setLanguage={setLanguage}
        setBudgetInr={setBudgetInr}
        setTargetTimeline={setTargetTimeline}
        setRiskLevel={setRiskLevel}
        onOpenProfitModal={() => setIsProfitModalOpen(true)}
        onFundPortfolio={() => handleOpenPayment(budgetInr, 'investor')}
      />

      {/* Zero-Rate-Limit Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        language={language}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* New Borrower Application & Onboarding Modal */}
      <NewBorrowerModal
        isOpen={isNewBorrowerModalOpen}
        onClose={() => setIsNewBorrowerModalOpen(false)}
        language={language}
        currency={currency}
        onBorrowerCreated={handleBorrowerCreated}
      />

    </div>
  );
}

export default App;

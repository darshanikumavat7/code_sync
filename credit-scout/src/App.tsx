import React, { useState, useMemo, useEffect } from 'react';
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
  Sparkles,
  Mic
} from 'lucide-react';

import { 
  Language, 
  Currency, 
  Borrower, 
  TransactionReceipt, 
  TargetTimeline, 
  UserRole, 
  AuthUser,
  PortalTab,
  WizardStep
} from './types';
import { MOCK_BORROWERS } from './data/mockBorrowers';
import { computeSmartBasket, formatCurrency, generateOfficialReceipt } from './utils/calculator';
import { TRANSLATIONS } from './data/translations';
import { getCurrentUser, logoutUser } from './services/authService';
import { getCustomMarketplaceBorrowers, fetchMarketplaceBorrowers } from './services/borrowerService';

import { Header } from './components/Header';
import { MarketplaceWizard } from './components/MarketplaceWizard';
import { MyPortfolioView } from './components/MyPortfolioView';
import { EscrowReceiptsView } from './components/EscrowReceiptsView';
import { AIProcessorDrawer } from './components/AIProcessorDrawer';

import { BorrowerDetailsModal } from './components/BorrowerDetailsModal';
import { ProfitComparisonModal } from './components/ProfitComparisonModal';
import { OfficialReceiptModal } from './components/OfficialReceiptModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { AuthModal } from './components/AuthModal';
import { NewBorrowerModal } from './components/NewBorrowerModal';
import { Footer } from './components/Footer';

export function App() {
  // Navigation Tabs: 'marketplace' | 'portfolio' | 'receipts' | 'assistant'
  const [activeTab, setActiveTab] = useState<PortalTab>('marketplace');

  // Progressive Disclosure Wizard Stepper: 1 (Role) -> 2 (Budget/Timeline) -> 3 (Allocations) -> 4 (Escrow)
  const [wizardStep, setWizardStep] = useState<WizardStep>(1);

  // Dual-Role Switcher: 'investor' (Lender Mode) vs. 'borrower' (Borrower Mode)
  const [currentRole, setCurrentRole] = useState<UserRole>('investor');

  // User Authentication State (Zero Rate Limit In-Memory & LocalStorage)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => getCurrentUser());
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isNewBorrowerModalOpen, setIsNewBorrowerModalOpen] = useState<boolean>(false);
  const [isAIProcessorOpen, setIsAIProcessorOpen] = useState<boolean>(false);

  // Active Borrowers List (Pre-loaded Pune & PCMC + Dynamically Added Onboarding Borrowers)
  const [borrowersList, setBorrowersList] = useState<Borrower[]>(() => {
    const custom = getCustomMarketplaceBorrowers();
    const customIds = new Set(custom.map((c) => c.id));
    return [...custom, ...MOCK_BORROWERS.filter((b) => !customIds.has(b.id))];
  });

  // Fetch updated borrowers from backend GET /api/borrowers on mount
  useEffect(() => {
    fetchMarketplaceBorrowers().then((borrowers) => {
      if (borrowers && borrowers.length > 0) {
        setBorrowersList(borrowers);
      }
    });
  }, []);

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
    setNotificationToast(`✓ Payment verified! Dual-party receipt minted: ${receipt.referenceId}`);
    setTimeout(() => setNotificationToast(null), 7000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      
      {/* Dynamic Marketplace Listing Notification Toast */}
      {notificationToast && (
        <div className="fixed top-20 right-4 z-50 p-4 rounded-xl bg-slate-900 text-white shadow-2xl border border-emerald-500 animate-in slide-in-from-top duration-300 max-w-md flex items-center justify-between gap-3 font-sans">
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

      {/* Official Government & Bank Style Header with Tabbed Navigation */}
      <Header
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        currentRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role === 'investor') setWizardStep(1);
          else setWizardStep(2);
        }}
        onOpenVoiceModal={() => setIsAIProcessorOpen(true)}
        onOpenProfitModal={() => setIsProfitModalOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'assistant') {
            setIsAIProcessorOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
      />

      {/* Main Dynamic Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* VIEW 1: Clean Step-by-Step Marketplace & Wizard */}
        {activeTab === 'marketplace' && (
          <MarketplaceWizard
            language={language}
            currency={currency}
            currentRole={currentRole}
            onRoleChange={(role) => {
              setCurrentRole(role);
              if (role === 'investor') setWizardStep(1);
              else setWizardStep(2);
            }}
            activeStep={wizardStep}
            onStepChange={setWizardStep}
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
            allMatches={allMatches}
            topMatches={topMatches}
            borrowersList={borrowersList}
            onSelectBorrower={(b) => setSelectedBorrower(b)}
            onOpenProfitModal={() => setIsProfitModalOpen(true)}
            onOpenNewBorrowerModal={() => setIsNewBorrowerModalOpen(true)}
            onProceedToEscrow={(amount, role) => handleOpenPayment(amount, role)}
            onBorrowerCreated={handleBorrowerCreated}
          />
        )}

        {/* VIEW 2: My Portfolio Dashboard */}
        {activeTab === 'portfolio' && (
          <MyPortfolioView
            language={language}
            currency={currency}
            onNavigateToWizard={() => {
              setActiveTab('marketplace');
              setWizardStep(2);
            }}
            onSelectBorrower={(b) => setSelectedBorrower(b)}
            borrowers={borrowersList}
          />
        )}

        {/* VIEW 3: Escrow Receipts & Dual-Party Ledger */}
        {activeTab === 'receipts' && (
          <EscrowReceiptsView
            language={language}
            currency={currency}
            onOpenReceipt={(receipt) => setActiveReceipt(receipt)}
            onNavigateToWizard={() => {
              setActiveTab('marketplace');
              setWizardStep(2);
            }}
          />
        )}

        {/* VIEW 4: Dedicated AI Voice Guide Portal */}
        {activeTab === 'assistant' && (
          <div className="bg-white rounded-2xl border border-slate-300 p-8 sm:p-12 shadow-md text-center max-w-2xl mx-auto space-y-5 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-2xl bg-blue-900 text-white flex items-center justify-center mx-auto shadow-lg">
              <Mic className="w-8 h-8 text-emerald-400 animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                AI Voice Guide & Intent Processor
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                Speak commands in English, Hindi, or Marathi to automate micro-budgeting, filter by Prime CIBIL scores, and configure escrow allocations with a visual step-by-step progress drawer.
              </p>
            </div>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsAIProcessorOpen(true)}
                className="px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Launch Interactive Speech Drawer</span>
              </button>
            </div>
          </div>
        )}

      </main>

      {/* Floating 1-Click Fund Portfolio Bottom Dock - Only in Wizard Step 3 */}
      {activeTab === 'marketplace' && currentRole === 'investor' && wizardStep === 3 && (
        <div className="sticky bottom-4 z-30 max-w-3xl mx-auto px-4 w-full no-print animate-in slide-in-from-bottom duration-200">
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
                onClick={() => setWizardStep(4)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Escrow (Step 4)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Government & Bank Portal Footer */}
      <Footer language={language} />

      {/* Modals & Drawers */}
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

      {/* AI Voice Guide & Intent Processor Drawer */}
      <AIProcessorDrawer
        isOpen={isAIProcessorOpen}
        onClose={() => setIsAIProcessorOpen(false)}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setBudgetInr={setBudgetInr}
        setTargetTimeline={setTargetTimeline}
        setRiskLevel={setRiskLevel}
        onProceedToStep={(step) => {
          setActiveTab('marketplace');
          setWizardStep(step as WizardStep);
        }}
        onProceedToEscrow={(amount) => {
          handleOpenPayment(amount, 'investor');
        }}
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

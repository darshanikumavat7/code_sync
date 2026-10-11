import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Layers, 
  Lock, 
  Mic, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle,
  Coins,
  MapPin,
  Cpu
} from 'lucide-react';

import { Language, Currency, Borrower, EscrowTransaction } from './types';
import { MOCK_BORROWERS } from './data/mockBorrowers';
import { computeSmartBasket, formatCurrency } from './utils/calculator';
import { TRANSLATIONS } from './data/translations';

import { Header } from './components/Header';
import { RiskSliders } from './components/RiskSliders';
import { DiversificationBar } from './components/DiversificationBar';
import { BorrowerGrid } from './components/BorrowerGrid';
import { ExplainAiModal } from './components/ExplainAiModal';
import { ProfitGraphModal } from './components/ProfitGraphModal';
import { EscrowModal } from './components/EscrowModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { PortfolioDrawer } from './components/PortfolioDrawer';
import { Footer } from './components/Footer';

export function App() {
  // Primary Interactive Application States
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [capital, setCapital] = useState<number>(10000);
  const [riskAppetite, setRiskAppetite] = useState<number>(3); // Default to Safe/Balanced

  // Modal and Drawer States
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);
  const [isProfitModalOpen, setIsProfitModalOpen] = useState<boolean>(false);
  const [isEscrowModalOpen, setIsEscrowModalOpen] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isPortfolioDrawerOpen, setIsPortfolioDrawerOpen] = useState<boolean>(false);

  // Deployed Escrow History
  const [transactions, setTransactions] = useState<EscrowTransaction[]>([]);
  const [notificationToast, setNotificationToast] = useState<string | null>(null);

  const t = TRANSLATIONS[language];

  // REAL-TIME RECALCULATION & RE-RANKING VIA useMemo (Core Requirement)
  const allMatches = useMemo(() => {
    return computeSmartBasket(MOCK_BORROWERS, riskAppetite, capital);
  }, [riskAppetite, capital]);

  // Top 5 Smart Basket Matches
  const topMatches = useMemo(() => {
    return allMatches.slice(0, 5);
  }, [allMatches]);

  // Weighted Portfolio Metrics
  const { portfolioNetRoi, portfolioNominalRoi, averageDefaultProb } = useMemo(() => {
    if (topMatches.length === 0) {
      return { portfolioNetRoi: 12.5, portfolioNominalRoi: 14.5, averageDefaultProb: 0.02 };
    }

    let weightedNet = 0;
    let weightedNominal = 0;
    let weightedDef = 0;

    topMatches.forEach((m) => {
      const weight = (m.allocationPercent || 20) / 100;
      weightedNet += m.netRoi * weight;
      weightedNominal += m.nominalInterestRate * weight;
      weightedDef += m.defaultProbability * weight;
    });

    return {
      portfolioNetRoi: weightedNet,
      portfolioNominalRoi: weightedNominal,
      averageDefaultProb: weightedDef,
    };
  }, [topMatches]);

  // Handle solo fund action
  const handleFundSolo = (borrower: Borrower) => {
    setSelectedBorrower(borrower);
  };

  const handleTransactionSuccess = (tx: EscrowTransaction) => {
    setTransactions((prev) => [tx, ...prev]);
    showToast(`Escrow transaction ${tx.txHash.slice(0, 10)}... confirmed on Block #${tx.blockNumber}!`);
  };

  const showToast = (msg: string) => {
    setNotificationToast(msg);
    setTimeout(() => {
      setNotificationToast(null);
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-slate-950 font-sans">
      
      {/* Top Sticky Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        onOpenProfitModal={() => setIsProfitModalOpen(true)}
        onOpenEscrowModal={() => setIsEscrowModalOpen(true)}
        onOpenPortfolioDrawer={() => setIsPortfolioDrawerOpen(true)}
        totalCapital={capital}
        portfolioNetRoi={portfolioNetRoi}
        deployedTxCount={transactions.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Section 1: Dynamic Utility Scoring & Risk Sliders */}
        <section aria-label="Investment Preferences & Dynamic Scoring">
          <RiskSliders
            language={language}
            currency={currency}
            capital={capital}
            setCapital={setCapital}
            riskAppetite={riskAppetite}
            setRiskAppetite={setRiskAppetite}
            portfolioNetRoi={portfolioNetRoi}
            portfolioNominalRoi={portfolioNominalRoi}
            averageDefaultProb={averageDefaultProb}
            matchedCount={allMatches.length}
          />
        </section>

        {/* Section 2: Smart Basket Diversification Stacked Progress Bar */}
        <section aria-label="Smart Basket Diversification Engine">
          <DiversificationBar
            topMatches={topMatches}
            language={language}
            currency={currency}
            totalCapital={capital}
            onSelectBorrower={(b) => setSelectedBorrower(b)}
          />
        </section>

        {/* Section 3: Re-ranked Live Borrower Listings (Pune & PCMC) */}
        <section aria-label="Localized Micro-Borrower Listings">
          <BorrowerGrid
            matches={allMatches}
            language={language}
            currency={currency}
            onOpenExplainModal={(b) => setSelectedBorrower(b)}
            onFundSolo={handleFundSolo}
          />
        </section>

      </main>

      {/* Floating Escrow Call-To-Action Dock */}
      <div className="sticky bottom-5 z-30 max-w-2xl mx-auto px-4 w-full">
        <div className="rounded-2xl glass-panel-glow bg-slate-900/90 border border-emerald-500/40 p-3.5 shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span>Smart Basket: {topMatches.length} Pune MSMEs</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  {portfolioNetRoi.toFixed(2)}% Net
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                Allocating {formatCurrency(capital, currency)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsProfitModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5 text-teal-400" />
              <span>Growth Graph</span>
            </button>

            <button
              type="button"
              onClick={() => setIsEscrowModalOpen(true)}
              className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-extrabold transition-all shadow-md shadow-emerald-500/30 active:scale-95 flex items-center gap-1.5"
            >
              <span>{t.deployEscrowBtn.split(' ')[0]} {t.deployEscrowBtn.split(' ')[1]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer language={language} />

      {/* Modals & Drawers */}
      <ExplainAiModal
        borrower={selectedBorrower}
        onClose={() => setSelectedBorrower(null)}
        language={language}
        currency={currency}
        investorRisk={riskAppetite}
        onConfirmFund={(b) => {
          setIsEscrowModalOpen(true);
        }}
      />

      <ProfitGraphModal
        isOpen={isProfitModalOpen}
        onClose={() => setIsProfitModalOpen(false)}
        language={language}
        currency={currency}
        initialCapital={capital}
        portfolioNetRoi={portfolioNetRoi}
      />

      <EscrowModal
        isOpen={isEscrowModalOpen}
        onClose={() => setIsEscrowModalOpen(false)}
        language={language}
        currency={currency}
        totalCapital={capital}
        topMatches={topMatches}
        onTransactionSuccess={handleTransactionSuccess}
      />

      <VoiceAssistantModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={language}
        setLanguage={setLanguage}
        setCapital={setCapital}
        setRiskAppetite={setRiskAppetite}
        onOpenProfitModal={() => setIsProfitModalOpen(true)}
        onOpenEscrowModal={() => setIsEscrowModalOpen(true)}
      />

      <PortfolioDrawer
        isOpen={isPortfolioDrawerOpen}
        onClose={() => setIsPortfolioDrawerOpen(false)}
        language={language}
        currency={currency}
        transactions={transactions}
        topMatches={topMatches}
        totalCapital={capital}
        portfolioNetRoi={portfolioNetRoi}
      />

      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 shadow-2xl text-xs font-semibold text-emerald-200 flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notificationToast}</span>
        </div>
      )}

    </div>
  );
}

export default App;

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
  FileCheck 
} from 'lucide-react';

import { Language, Currency, Borrower, TransactionReceipt } from './types';
import { MOCK_BORROWERS } from './data/mockBorrowers';
import { computeSmartBasket, formatCurrency, generateOfficialReceipt } from './utils/calculator';
import { TRANSLATIONS } from './data/translations';

import { Header } from './components/Header';
import { MatchingControls } from './components/MatchingControls';
import { SmartBasketSplit } from './components/SmartBasketSplit';
import { BorrowerCard } from './components/BorrowerCard';
import { BorrowerDetailsModal } from './components/BorrowerDetailsModal';
import { ProfitComparisonModal } from './components/ProfitComparisonModal';
import { OfficialReceiptModal } from './components/OfficialReceiptModal';
import { VoiceAssistantModal } from './components/VoiceAssistantModal';
import { Footer } from './components/Footer';

export function App() {
  // Primary States
  const [language, setLanguage] = useState<Language>('en');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [capital, setCapital] = useState<number>(10000);
  const [riskLevel, setRiskLevel] = useState<number>(3); // Default to Safe

  // Modals
  const [selectedBorrower, setSelectedBorrower] = useState<Borrower | null>(null);
  const [isProfitModalOpen, setIsProfitModalOpen] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [activeReceipt, setActiveReceipt] = useState<TransactionReceipt | null>(null);

  const t = TRANSLATIONS[language];

  // REAL-TIME RECALCULATION & RE-RANKING VIA useMemo
  const allMatches = useMemo(() => {
    return computeSmartBasket(MOCK_BORROWERS, riskLevel, capital);
  }, [riskLevel, capital]);

  // Top 5 Safe Matches for Smart Basket Split
  const top5Matches = useMemo(() => {
    return allMatches.slice(0, 5);
  }, [allMatches]);

  // Weighted Portfolio Metrics
  const { expectedAnnualProfit, averageCibil } = useMemo(() => {
    if (top5Matches.length === 0) return { expectedAnnualProfit: 11.5, averageCibil: 750 };

    let weightedProfit = 0;
    let sumCibil = 0;

    top5Matches.forEach((m) => {
      const share = m.allocationPercent / 100;
      weightedProfit += m.borrower.expectedAnnualProfit * share;
      sumCibil += m.borrower.cibilScore;
    });

    return {
      expectedAnnualProfit: Number(weightedProfit.toFixed(1)),
      averageCibil: Math.round(sumCibil / top5Matches.length),
    };
  }, [top5Matches]);

  // 1-Click "Fund Selected Portfolio" Action Handler
  const handleFundPortfolio = () => {
    // Generate official receipt immediately
    const receipt = generateOfficialReceipt(capital, currency, top5Matches);
    setActiveReceipt(receipt);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Official Government & Bank Style Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
        onOpenVoiceModal={() => setIsVoiceModalOpen(true)}
        onOpenProfitModal={() => setIsProfitModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Step 1: Matching Controls & Sliders */}
        <section aria-label="Investment Matching Controls">
          <MatchingControls
            language={language}
            currency={currency}
            capital={capital}
            setCapital={setCapital}
            riskLevel={riskLevel}
            setRiskLevel={setRiskLevel}
            expectedAnnualProfit={expectedAnnualProfit}
            averageCibil={averageCibil}
          />
        </section>

        {/* Step 2: Smart Basket Split (5-Way Capital Protection) */}
        <section aria-label="5-Way Capital Diversification Split">
          <SmartBasketSplit
            top5Matches={top5Matches}
            language={language}
            currency={currency}
            totalCapital={capital}
            onSelectBorrower={(b) => setSelectedBorrower(b)}
          />
        </section>

        {/* Step 3: Verified Micro-Borrowers (Pune & PCMC Region) */}
        <section aria-label="Verified Micro-Borrower Listings" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-300">
            <div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight font-sans">
                {t.borrowersListTitle}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                {t.borrowersListSubtitle}
              </p>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-lg border border-slate-300 shadow-sm self-start sm:self-auto font-mono">
              6 Verified Micro-Enterprises
            </span>
          </div>

          {/* Grid of Borrower Cards */}
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

      </main>

      {/* Floating 1-Click Fund Portfolio Bottom Dock */}
      <div className="sticky bottom-4 z-30 max-w-3xl mx-auto px-4 w-full no-print">
        <div className="bg-white border-2 border-blue-900 rounded-xl p-4 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span>Fund 5-Way Portfolio ({formatCurrency(capital, currency)})</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono">
                  +{expectedAnnualProfit}% Profit / Year
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Secured via Scheduled Commercial Bank Escrow Account
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
              onClick={handleFundPortfolio}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{t.fundPortfolioBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

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
        initialCapital={capital}
        expectedAnnualProfit={expectedAnnualProfit}
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
        setCapital={setCapital}
        setRiskLevel={setRiskLevel}
        onOpenProfitModal={() => setIsProfitModalOpen(true)}
        onFundPortfolio={handleFundPortfolio}
      />

    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Printer, 
  Download, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ArrowRight, 
  Hash, 
  Landmark, 
  User, 
  MapPin, 
  Sparkles,
  ExternalLink,
  Search
} from 'lucide-react';
import { Language, Currency, TransactionReceipt, ReceiptBorrowerDetail } from '../types';
import { formatCurrency } from '../utils/calculator';
import { TRANSLATIONS } from '../data/translations';
import { getSavedReceipts } from '../services/paymentService';

interface EscrowReceiptsViewProps {
  language: Language;
  currency: Currency;
  onOpenReceipt: (receipt: TransactionReceipt) => void;
  onNavigateToWizard: () => void;
}

export const EscrowReceiptsView: React.FC<EscrowReceiptsViewProps> = ({
  language,
  currency,
  onOpenReceipt,
  onNavigateToWizard,
}) => {
  const t = TRANSLATIONS[language];
  const [receipts, setReceipts] = useState<TransactionReceipt[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Default pre-seeded realistic dual-party receipts if user hasn't completed one yet
  const defaultReceipts: TransactionReceipt[] = [
    {
      referenceId: '#PF-2026-88941',
      date: '11/10/2026',
      time: '14:32:05 IST',
      totalCapitalInr: 5000,
      currency: 'INR',
      status: 'VERIFIED & ESCROWED',
      escrowStatus: 'VERIFIED & ESCROWED',
      convenienceFeeInr: 0,
      isPortfolioLocked: true,
      targetTimeline: 6,
      lenderName: 'Rajesh Mehta (Retail Micro-Investor)',
      lenderAadhaarRef: 'XXXX-XXXX-9418',
      smartEscrowContractHash: '0x7f4b8c9d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b',
      verificationHash: 'SHA256: 0x7f4b8c9d1e2f...3e4f5a6b',
      escrowPartnerBank: 'State Bank of India / ICICI P2P Escrow Trustee',
      totalExpectedAnnualProfit: 12.8,
      paymentApp: 'Google Pay (UPI)',
      transactionId: 'TXN_90823412',
      bankRefNumber: 'SBI_UTR_88392019482',
      orderId: 'ORD_892314',
      payerRole: 'investor',
      repaymentScheduleSummary: '6 Months Batched Scheduled Commercial Bank Escrow Disbursal',
      borrowers: [
        {
          borrowerId: 'PF-PUN-01',
          borrowerName: 'Sunil Jagtap',
          borrowerNameHi: 'सुनील जगताप',
          borrowerNameMr: 'सुनील जगताप',
          businessName: 'Jagtap Hardware & Electrical Spares',
          businessNameHi: 'जगताप हार्डवेयर एवं इलेक्ट्रिकल्स',
          businessNameMr: 'जगताप हार्डवेअर आणि इलेक्ट्रिकल्स',
          businessCategory: 'Electricals & Hardware',
          location: 'Bhosari MIDC, PCMC',
          locationHi: 'भोसरी एमआईडीसी, पीसीएमसी',
          locationMr: 'भोसरी एमआयडीसी, पिंपरी-चिंचवड',
          allocatedAmountInr: 2500,
          allocationPercent: 50,
          cibilScore: 782,
          expectedProfit: 13.5,
          loanTenureMonths: 6,
          loanPurpose: 'Bulk inventory procurement of high-demand copper wiring',
          monthlyEmiInr: 445,
        },
        {
          borrowerId: 'PF-PUN-02',
          borrowerName: 'Anita Patil',
          borrowerNameHi: 'अनिता पाटिल',
          borrowerNameMr: 'अनिता पाटील',
          businessName: 'Mauli Organic Daily Staples & Spices',
          businessNameHi: 'माउली ऑर्गेनिक किराना एवं मसाले',
          businessNameMr: 'माउली ऑरगॅनिक किराणा व मसाले',
          businessCategory: 'Essential Grocery',
          location: 'Hadapsar, Pune',
          locationHi: 'हडपसर, पुणे',
          locationMr: 'हडपसर, पुणे',
          allocatedAmountInr: 2500,
          allocationPercent: 50,
          cibilScore: 795,
          expectedProfit: 12.0,
          loanTenureMonths: 3,
          loanPurpose: 'Farm-direct procurement of seasonal turmeric and wheat',
          monthlyEmiInr: 858,
        }
      ]
    },
    {
      referenceId: '#PF-2026-77491',
      date: '10/10/2026',
      time: '11:15:42 IST',
      totalCapitalInr: 25000,
      currency: 'INR',
      status: 'VERIFIED & ESCROWED',
      escrowStatus: 'VERIFIED & ESCROWED',
      convenienceFeeInr: 0,
      isPortfolioLocked: true,
      targetTimeline: 12,
      lenderName: 'Priya Kulkarni (Retail Investor)',
      lenderAadhaarRef: 'XXXX-XXXX-5521',
      smartEscrowContractHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
      verificationHash: 'SHA256: 0x9a8b7c6d5e4f...3e2f1a0b',
      escrowPartnerBank: 'State Bank of India / ICICI P2P Escrow Trustee',
      totalExpectedAnnualProfit: 13.2,
      paymentApp: 'PhonePe (UPI)',
      transactionId: 'TXN_48192044',
      bankRefNumber: 'SBI_UTR_77192039401',
      orderId: 'ORD_774912',
      payerRole: 'investor',
      repaymentScheduleSummary: '12 Months Low-Income Micro-Lending Pool Escrow Contract',
      borrowers: [
        {
          borrowerId: 'PF-PUN-NEW-773',
          borrowerName: 'Ramesh Shinde',
          borrowerNameHi: 'रमेश शिंदे',
          borrowerNameMr: 'रमेश शिंदे',
          businessName: 'Shinde General Stores & Dairy Supplies',
          businessNameHi: 'शिंदे जनरल स्टोअर्स आणि डेअरी सप्लाय',
          businessNameMr: 'शिंदे जनरल स्टोअर्स आणि डेअरी सप्लाय',
          businessCategory: 'Essential Grocery',
          location: 'Kothrud, Pune',
          allocatedAmountInr: 25000,
          allocationPercent: 100,
          cibilScore: 775,
          expectedProfit: 13.2,
          loanTenureMonths: 6,
          loanPurpose: 'Bulk milk cooler purchase and daily FMCG inventory stocking',
          monthlyEmiInr: 4443,
        }
      ]
    }
  ];

  useEffect(() => {
    const saved = getSavedReceipts();
    if (saved.length > 0) {
      // Merge saved with defaults, deduplicating by referenceId
      const savedIds = new Set(saved.map((s) => s.referenceId));
      setReceipts([...saved, ...defaultReceipts.filter((d) => !savedIds.has(d.referenceId))]);
    } else {
      setReceipts(defaultReceipts);
    }
  }, []);

  const filteredReceipts = receipts.filter((r) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      r.referenceId.toLowerCase().includes(q) ||
      r.lenderName.toLowerCase().includes(q) ||
      (r.orderId && r.orderId.toLowerCase().includes(q)) ||
      (r.transactionId && r.transactionId.toLowerCase().includes(q)) ||
      r.borrowers?.some((b) => b.borrowerName.toLowerCase().includes(q) || b.businessName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Ledger Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800 relative overflow-hidden">
        <div className="space-y-2 max-w-2xl relative z-10">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-blue-800 text-blue-200 text-xs font-bold uppercase tracking-wider font-mono border border-blue-700">
              Official Escrow Ledger • Section 45-IA RBI Act
            </span>
            <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dual-Party Localized Verification</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans">
            Audited Escrow Receipts & Contracts Ledger
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every transaction is digitally counter-signed by RBI-compliant Scheduled Commercial Bank Trustees (SBI & ICICI Trustee Services) with cryptographic smart escrow hashes.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shrink-0 text-left sm:text-right relative z-10 flex flex-col sm:items-end justify-center">
          <span className="text-xs text-blue-200 font-medium">Active Receipts in Ledger</span>
          <span className="text-2xl font-black font-mono text-emerald-400">{receipts.length} Verified Contracts</span>
          <button
            type="button"
            onClick={onNavigateToWizard}
            className="mt-2.5 px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <span>+ Fund New Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-300 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by Order ID, Reference, or Borrower..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-600 font-mono">
          <span>Showing {filteredReceipts.length} of {receipts.length} Contracts</span>
        </div>
      </div>

      {/* Receipts Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReceipts.map((r) => {
          const firstBorrower = r.borrowers && r.borrowers.length > 0 ? r.borrowers[0] : null;
          return (
            <div 
              key={r.referenceId}
              className="bg-white rounded-2xl border-2 border-slate-300 hover:border-blue-600 shadow-md transition-all p-6 space-y-5 flex flex-col justify-between"
            >
              
              {/* Receipt Card Header */}
              <div className="space-y-3 pb-3 border-b border-slate-200">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded font-mono font-bold text-xs bg-blue-100 text-blue-900 border border-blue-300">
                        {r.referenceId}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold font-mono border border-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{r.status}</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{r.date} {r.time}</span>
                      </span>
                      <span>•</span>
                      <span>App: {r.paymentApp}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-bold">
                      Escrow Capital
                    </span>
                    <span className="text-xl font-black font-mono text-emerald-700">
                      {formatCurrency(r.totalCapitalInr, currency)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dual-Party Section (Investor & Borrower) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                
                {/* Party 1: Retail Investor */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Party 1: Retail Micro-Investor
                  </span>
                  <div className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-blue-800 shrink-0" />
                    <span>{r.lenderName}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-mono">
                    Aadhaar Ref: {r.lenderAadhaarRef}
                  </div>
                  <div className="text-[11px] font-mono text-blue-900 font-bold">
                    Target Yield: +{r.totalExpectedAnnualProfit}% p.a.
                  </div>
                </div>

                {/* Party 2: Verified Borrower(s) */}
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Party 2: Beneficiary Borrower
                  </span>
                  {firstBorrower ? (
                    <>
                      <div className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                        <span>{firstBorrower.borrowerName}</span>
                      </div>
                      <div className="text-[11px] text-slate-600 truncate">
                        {firstBorrower.businessName}
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-blue-700" />
                          <span>{firstBorrower.location}</span>
                        </span>
                        <span className="text-emerald-700 font-bold">
                          {firstBorrower.cibilScore} CIBIL
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="text-slate-600 italic">Diversified micro-portfolio basket</div>
                  )}
                </div>

              </div>

              {/* Escrow Partner & Hash Stamp */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3 text-xs space-y-1 font-mono text-blue-950">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Escrow Trustee:</span>
                  <span className="font-bold">{r.escrowPartnerBank}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Smart Contract Hash:</span>
                  <span className="font-bold truncate max-w-[200px]" title={r.smartEscrowContractHash}>
                    {r.smartEscrowContractHash}
                  </span>
                </div>
                {r.bankRefNumber && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600">Bank UTR Number:</span>
                    <span className="font-bold">{r.bankRefNumber}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onOpenReceipt(r)}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-emerald-400" />
                  <span>View Official Dual-Party Receipt</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

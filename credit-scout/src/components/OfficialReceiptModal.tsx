import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  CheckCircle2, 
  Building2, 
  ShieldCheck, 
  FileText, 
  Layers, 
  ArrowRight,
  Stamp
} from 'lucide-react';
import { TransactionReceipt, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface OfficialReceiptModalProps {
  receipt: TransactionReceipt | null;
  onClose: () => void;
  language: Language;
}

export const OfficialReceiptModal: React.FC<OfficialReceiptModalProps> = ({
  receipt,
  onClose,
  language,
}) => {
  if (!receipt) return null;

  const t = TRANSLATIONS[language];

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Download official text document
  const handleDownload = () => {
    const lines = [
      '=========================================================================',
      '                      PEERFUND OFFICIAL TRANSACTION RECEIPT              ',
      '        National Micro-Lending & Small Business Capital Portal           ',
      '                 (Republic of India NBFC-P2P Compliant)                  ',
      '=========================================================================',
      '',
      `Transaction Reference ID : ${receipt.referenceId}`,
      `Date of Issue            : ${receipt.date}`,
      `Execution Time           : ${receipt.time}`,
      `Escrow Status            : ${receipt.escrowStatus}`,
      `Escrow Trustee Bank      : ${receipt.escrowPartnerBank}`,
      `Investor Reference       : ${receipt.investorAadhaarRef}`,
      `Total Capital Funded     : ${formatCurrency(receipt.totalCapital, receipt.currency)}`,
      `Projected Annual Yield   : +${receipt.totalExpectedAnnualProfit}% per year`,
      `Verification Hash        : ${receipt.verificationHash}`,
      '',
      '-------------------------------------------------------------------------',
      'ITEMIZED CAPITAL ALLOCATION BREAKDOWN (TOP 5 LOCAL MICRO-BUSINESSES):',
      '-------------------------------------------------------------------------',
    ];

    receipt.borrowers.forEach((b, idx) => {
      lines.push(
        `${idx + 1}. ${b.borrowerName.padEnd(16)} | ${b.businessName.padEnd(32)} | CIBIL: ${b.cibilScore} | Share: ${b.allocationPercent}% | Allocated: ${formatCurrency(b.allocatedAmount, receipt.currency)}`
      );
      lines.push(`   Purpose: ${b.loanPurpose}`);
      lines.push('');
    });

    lines.push('-------------------------------------------------------------------------');
    lines.push('OFFICIAL VERIFICATION STAMP:');
    lines.push('>>> VERIFIED & SECURED BY SCHEDULED COMMERCIAL BANK ESCROW TRUSTEE <<<');
    lines.push('=========================================================================');
    lines.push('Support & Verification: 1800-202-7337 | grievance@peerfund.org.in');

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PeerFund-Receipt-${receipt.referenceId.replace('#', '')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-sm bg-slate-900/60 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-xl border border-slate-300 shadow-2xl overflow-hidden my-8">
        
        {/* Printable Receipt Container */}
        <div id="printable-receipt" className="p-6 sm:p-10 space-y-6">
          
          {/* Header of the Official Receipt */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-2xl shadow-sm">
                PF
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
                  Peer<span className="text-blue-900">Fund</span>
                </h2>
                <p className="text-xs text-slate-600 font-semibold">
                  National Micro-Lending Portal • Official Investment Receipt
                </p>
                <span className="text-[10px] text-slate-500 font-mono">
                  NBFC-P2P Reg. No. N-14.03291 • Escrow Account: SBI P2P Trustee
                </span>
              </div>
            </div>

            {/* Official Verification Stamp */}
            <div className="text-right flex flex-col items-end">
              <div className="official-stamp text-xs sm:text-sm">
                ✓ {t.officialStampText}
              </div>
              <span className="text-[10px] text-slate-400 font-mono mt-1">
                Ref: {receipt.referenceId}
              </span>
            </div>
          </div>

          {/* Transaction Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-300 rounded-xl text-xs">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                {t.receiptRefLabel}
              </span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {receipt.referenceId}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                {t.receiptDateLabel}
              </span>
              <span className="font-bold text-slate-900">
                {receipt.date}
              </span>
              <span className="text-[10px] text-slate-500 block font-mono">
                {receipt.time}
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                {t.receiptStatusLabel}
              </span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>SECURED & LOCKED</span>
              </span>
            </div>

            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-bold">
                {t.receiptTotalLabel}
              </span>
              <span className="text-base font-black font-mono text-blue-950">
                {formatCurrency(receipt.totalCapital, receipt.currency)}
              </span>
            </div>
          </div>

          {/* Itemized Allocation Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center justify-between">
              <span>Itemized Capital Allocation to Verified MSMEs:</span>
              <span className="text-emerald-700 font-mono font-bold">
                Projected Profit: +{receipt.totalExpectedAnnualProfit}% / Year
              </span>
            </h4>

            <div className="overflow-x-auto border border-slate-300 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold">
                  <tr>
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">{t.receiptTableColBorrower}</th>
                    <th className="py-2.5 px-3">{t.receiptTableColPurpose}</th>
                    <th className="py-2.5 px-3">{t.receiptTableColCibil}</th>
                    <th className="py-2.5 px-3 text-right">{t.receiptTableColShare}</th>
                    <th className="py-2.5 px-3 text-right">{t.receiptTableColAllocated}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800">
                  {receipt.borrowers.map((b, idx) => (
                    <tr key={b.borrowerId} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-500">{idx + 1}</td>
                      <td className="py-2.5 px-3">
                        <span className="font-bold block text-slate-900">{b.borrowerName}</span>
                        <span className="text-[11px] text-slate-500">{b.businessName}</span>
                      </td>
                      <td className="py-2.5 px-3 max-w-[200px] truncate text-[11px] text-slate-600">
                        {b.loanPurpose}
                      </td>
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-700">
                        {b.cibilScore}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-blue-900">
                        {b.allocationPercent}%
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                        {formatCurrency(b.allocatedAmount, receipt.currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100 font-bold border-t border-slate-300 text-slate-900">
                  <tr>
                    <td colSpan={4} className="py-2.5 px-3 text-right">Total Deployed Capital:</td>
                    <td className="py-2.5 px-3 text-right font-mono">100%</td>
                    <td className="py-2.5 px-3 text-right font-mono text-sm text-blue-950">
                      {formatCurrency(receipt.totalCapital, receipt.currency)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Security & Regulatory Footer Info */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 space-y-1">
            <div className="flex items-center justify-between font-mono">
              <span>Authentication Token: {receipt.verificationHash}</span>
              <span className="text-emerald-700 font-bold">✓ Trustee Bank Authenticated</span>
            </div>
            <p>
              Note: This is an official digital receipt generated by PeerFund under RBI NBFC-P2P Master Directions. Capital is held in a zero-interest designated escrow account until disbursal.
            </p>
          </div>

        </div>

        {/* Modal Controls / Action Bar */}
        <div className="bg-slate-100 p-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>{t.receiptPrintBtn}</span>
            </button>

            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-4 h-4 text-blue-900" />
              <span>Save As Text File</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
          >
            {t.receiptCloseBtn}
          </button>
        </div>

      </div>
    </div>
  );
};

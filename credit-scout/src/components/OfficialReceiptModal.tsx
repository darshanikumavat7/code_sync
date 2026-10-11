import React, { useEffect } from 'react';
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
  Stamp, 
  Lock, 
  Calendar,
  Clock,
  User,
  Hash,
  Landmark,
  Coins,
  MapPin,
  Briefcase
} from 'lucide-react';
import { TransactionReceipt, Language, ReceiptBorrowerDetail } from '../types';
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
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!receipt) return null;

  const t = TRANSLATIONS[language];

  // Guaranteed safe fallback values to prevent any blank render bug
  const totalCapitalInr = receipt.totalCapitalInr || 5000;
  const currency = receipt.currency || 'INR';
  const referenceId = receipt.referenceId || '#PF-2026-88941';
  const dateStr = receipt.date || new Date().toLocaleDateString('en-GB');
  const timeStr = receipt.time || '12:00:00 IST';
  const lenderName = receipt.lenderName || 'Rajesh Mehta (Retail Investor • Aadhaar Verified)';
  const lenderAadhaarRef = receipt.lenderAadhaarRef || 'XXXX-XXXX-9418';
  const contractHash = receipt.smartEscrowContractHash || '0x7f4b8c9d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b';
  const escrowPartnerBank = receipt.escrowPartnerBank || 'State Bank of India / ICICI P2P Escrow Trustee';
  const expectedProfit = receipt.totalExpectedAnnualProfit || 13.5;
  const verificationHash = receipt.verificationHash || `SHA256: ${contractHash.substring(0, 16)}...`;
  
  // Payment Gateway Transaction Details
  const paymentApp = receipt.paymentApp || 'Google Pay (UPI)';
  const transactionId = receipt.transactionId || `TXN_${referenceId.replace(/\D/g, '') || '90823412'}`;
  const bankRefNumber = receipt.bankRefNumber || `SBI_UTR_${Math.floor(10000000000 + Math.random() * 90000000000)}`;
  const orderId = receipt.orderId || `ORD_${referenceId.replace(/\D/g, '').slice(-6) || '892314'}`;
  const payerRole = receipt.payerRole || 'investor';

  // Fallback borrower rows if empty
  const defaultBorrowers: ReceiptBorrowerDetail[] = [
    {
      borrowerId: 'b-1',
      borrowerName: 'Sunil Jagtap',
      borrowerNameHi: 'सुनील जगताप',
      borrowerNameMr: 'सुनील जगताप',
      businessName: 'Jagtap Hardware & Electrical Spares',
      businessNameHi: 'जगताप हार्डवेयर एवं इलेक्ट्रिकल्स',
      businessNameMr: 'जगताप हार्डवेअर आणि इलेक्ट्रिकल्स',
      businessCategory: 'Hardware & Electricals',
      businessCategoryHi: 'हार्डवेयर एवं इलेक्ट्रिकल्स',
      businessCategoryMr: 'हार्डवेअर आणि इलेक्ट्रिकल्स',
      location: 'Bhosari MIDC, PCMC',
      locationHi: 'भोसरी एमआईडीसी, पीसीएमसी',
      locationMr: 'भोसरी एमआयडीसी, पिंपरी-चिंचवड',
      allocatedAmountInr: Math.round(totalCapitalInr * 0.25),
      allocationPercent: 25,
      cibilScore: 782,
      expectedProfit: 13.5,
      loanTenureMonths: 6,
      loanPurpose: 'Bulk inventory stocking of high-demand copper wiring & switches',
      loanPurposeHi: 'उच्च मांग वाले तांबे के तारों और स्विचों का थोक इन्वेंट्री स्टॉक',
      loanPurposeMr: 'तांब्याची वायरिंग आणि स्विचेसचा घाऊक साठा खरेदी',
      monthlyEmiInr: Math.round((totalCapitalInr * 0.25 * 1.0675) / 6),
    },
    {
      borrowerId: 'b-2',
      borrowerName: 'Anita Patil',
      borrowerNameHi: 'अनिता पाटिल',
      borrowerNameMr: 'अनिता पाटील',
      businessName: 'Mauli Organic Daily Staples & Spices',
      businessNameHi: 'माउली ऑर्गेनिक किराना एवं मसाले',
      businessNameMr: 'माउली ऑरगॅनिक किराणा व मसाले',
      businessCategory: 'Daily Essentials & Grocery',
      businessCategoryHi: 'दैनिक किराना एवं मसाले',
      businessCategoryMr: 'दैनंदिन किराणा व मसाले',
      location: 'Hadapsar, Pune',
      locationHi: 'हडपसर, पुणे',
      locationMr: 'हडपसर, पुणे',
      allocatedAmountInr: Math.round(totalCapitalInr * 0.25),
      allocationPercent: 25,
      cibilScore: 795,
      expectedProfit: 12.0,
      loanTenureMonths: 3,
      loanPurpose: 'Farm-direct procurement of whole wheat and seasonal turmeric',
      loanPurposeHi: 'किसानों से सीधे गेहूं और मौसमी हल्दी की खरीद',
      loanPurposeMr: 'शेतकऱ्यांकडून थेट गहू व हळद खरेदी',
      monthlyEmiInr: Math.round((totalCapitalInr * 0.25 * 1.03) / 3),
    },
    {
      borrowerId: 'b-3',
      borrowerName: 'Sachin Waghmare',
      borrowerNameHi: 'सचिन वाघमारे',
      borrowerNameMr: 'सचिन वाघमारे',
      businessName: 'Shree Sai Express Agro-Delivery Fleet',
      businessNameHi: 'श्री साई एक्सप्रेस एग्रो-डिलीवरी फ्लीट',
      businessNameMr: 'श्री साई एक्सप्रेस कृषी वाहतूक',
      businessCategory: 'Logistics & Cargo',
      businessCategoryHi: 'लॉजिस्टिक्स एवं कार्गो',
      businessCategoryMr: 'वाहतूक व पुरवठा साखळी',
      location: 'Chakan Industrial Zone, Pune',
      locationHi: 'चाकण इंडस्ट्रियल जोन, पुणे',
      locationMr: 'चाकण औद्योगिक वसाहत, पुणे',
      allocatedAmountInr: Math.round(totalCapitalInr * 0.25),
      allocationPercent: 25,
      cibilScore: 765,
      expectedProfit: 14.5,
      loanTenureMonths: 12,
      loanPurpose: 'Commercial vehicle fitness certification and tyre replacement',
      loanPurposeHi: 'व्यावसायिक वाहन फिटनेस प्रमाणन और नए टायर प्रतिस्थापन',
      loanPurposeMr: 'वाहनांचे फिटनेस प्रमाणीकरण आणि नवीन टायर खरेदी',
      monthlyEmiInr: Math.round((totalCapitalInr * 0.25 * 1.145) / 12),
    },
    {
      borrowerId: 'b-4',
      borrowerName: 'Priya Kulkarni',
      borrowerNameHi: 'प्रिया कुलकर्णी',
      borrowerNameMr: 'प्रिया कुलकर्णी',
      businessName: 'Swad Maharashtrian Tiffin & Bakery',
      businessNameHi: 'स्वाद महाराष्ट्रीयन टिफिन एवं बेकरी',
      businessNameMr: 'स्वाद महाराष्ट्रीयन टिफिन व बेकरी',
      businessCategory: 'Food Processing & Cloud Kitchen',
      businessCategoryHi: 'खाद्य प्रसंस्करण एवं क्लाउड किचन',
      businessCategoryMr: 'अन्न प्रक्रिया व डबा सेवा',
      location: 'Kothrud, Pune',
      locationHi: 'कोथरूड, पुणे',
      locationMr: 'कोथरूड, पुणे',
      allocatedAmountInr: Math.round(totalCapitalInr * 0.25),
      allocationPercent: 25,
      cibilScore: 752,
      expectedProfit: 14.0,
      loanTenureMonths: 6,
      loanPurpose: 'Commercial stainless steel refrigeration unit for packaged meals',
      loanPurposeHi: 'पैकेज्ड भोजन के लिए वाणिज्यिक स्टेनलेस स्टील रेफ्रिजरेशन यूनिट',
      loanPurposeMr: 'टिफिन सेवेसाठी व्यावसायिक स्टेनलेस स्टील फ्रिज खरेदी',
      monthlyEmiInr: Math.round((totalCapitalInr * 0.25 * 1.07) / 6),
    },
  ];

  const borrowersList: ReceiptBorrowerDetail[] = 
    receipt.borrowers && receipt.borrowers.length > 0 
      ? receipt.borrowers 
      : defaultBorrowers;

  // Aggregate monthly EMI across all allocated slices
  const totalMonthlyEmi = borrowersList.reduce((acc, b) => acc + (b.monthlyEmiInr || 0), 0);

  // Helper for localized borrower strings
  const getBorrowerName = (b: ReceiptBorrowerDetail) => {
    if (language === 'hi' && b.borrowerNameHi) return b.borrowerNameHi;
    if (language === 'mr' && b.borrowerNameMr) return b.borrowerNameMr;
    return b.borrowerName;
  };

  const getBusinessName = (b: ReceiptBorrowerDetail) => {
    if (language === 'hi' && b.businessNameHi) return b.businessNameHi;
    if (language === 'mr' && b.businessNameMr) return b.businessNameMr;
    return b.businessName;
  };

  const getBusinessCategory = (b: ReceiptBorrowerDetail) => {
    if (language === 'hi' && b.businessCategoryHi) return b.businessCategoryHi;
    if (language === 'mr' && b.businessCategoryMr) return b.businessCategoryMr;
    return b.businessCategory || 'Micro-Enterprise';
  };

  const getLocation = (b: ReceiptBorrowerDetail) => {
    if (language === 'hi' && b.locationHi) return b.locationHi;
    if (language === 'mr' && b.locationMr) return b.locationMr;
    return b.location || 'Pune / PCMC';
  };

  const getPurpose = (b: ReceiptBorrowerDetail) => {
    if (language === 'hi' && b.loanPurposeHi) return b.loanPurposeHi;
    if (language === 'mr' && b.loanPurposeMr) return b.loanPurposeMr;
    return b.loanPurpose;
  };

  // Active Print / Download PDF Receipt Handler
  const handlePrint = () => {
    window.print();
  };

  // Structured Plaintext Document Download
  const handleDownloadTxt = () => {
    const lines = [
      '========================================================================================',
      '               PEERFUND DUAL-PARTY MICRO-LOAN CONTRACT & OFFICIAL RECEIPT               ',
      '             National Micro-Lending Portal • RBI NBFC-P2P Master Directions             ',
      '========================================================================================',
      '',
      `Transaction Reference ID   : ${referenceId}`,
      `Execution Timestamp        : ${dateStr} • ${timeStr}`,
      `Smart Escrow Contract Hash : ${contractHash}`,
      `Escrow Trustee Bank        : ${escrowPartnerBank}`,
      `Escrow Clearance Status    : SECURED & DEPLOYED (RBI P2P Compliant)`,
      '',
      '----------------------------------------------------------------------------------------',
      'PART A: INVESTOR / LENDER INFORMATION',
      '----------------------------------------------------------------------------------------',
      `Lender / Investor Name     : ${lenderName}`,
      `Lender Aadhaar Reference   : ${lenderAadhaarRef}`,
      `Total Capital Escrowed     : ${formatCurrency(totalCapitalInr, currency)}`,
      `Zero Cash Drag Policy      : 100% Capital Fully Deployed Across Verified Borrowers (₹0 Idle)`,
      `Projected Annual Yield     : +${expectedProfit}% per annum`,
      `Target Repayment Duration  : ${receipt.targetTimeline === 0 ? 'All Durations' : `${receipt.targetTimeline} Months`}`,
      '',
      '----------------------------------------------------------------------------------------',
      'PART B: BORROWER / RECIPIENT ALLOCATION BREAKDOWN (PUNE & PCMC REGION)',
      '----------------------------------------------------------------------------------------',
    ];

    borrowersList.forEach((b, idx) => {
      lines.push(
        `[#${idx + 1}] Borrower: ${b.borrowerName} | Business: ${b.businessName}`
      );
      lines.push(
        `     Category: ${b.businessCategory} | Location: ${b.location}`
      );
      lines.push(
        `     CIBIL Score: ${b.cibilScore} | Tenure: ${b.loanTenureMonths} Months | Monthly EMI: ${formatCurrency(b.monthlyEmiInr, currency)}`
      );
      lines.push(
        `     Portfolio Share: ${b.allocationPercent}% | Allocated Capital: ${formatCurrency(b.allocatedAmountInr, currency)}`
      );
      lines.push(
        `     Stated Purpose: ${b.loanPurpose}`
      );
      lines.push('');
    });

    lines.push('----------------------------------------------------------------------------------------');
    lines.push(`AGGREGATE MONTHLY EMI REPAYMENT COLLECTION: ${formatCurrency(totalMonthlyEmi, currency)} / month`);
    lines.push(`TOTAL ESCROWED CAPITAL: ${formatCurrency(totalCapitalInr, currency)} (100.0% Allocation)`);
    lines.push('----------------------------------------------------------------------------------------');
    lines.push('');
    lines.push('OFFICIAL REGULATORY & ESCROW TRUSTEE STAMP:');
    lines.push(`>>> ${t.officialStampText} <<<`);
    lines.push(`Authentication Token : ${verificationHash}`);
    lines.push(`Trustee Certification: ${t.receiptTrusteeAuthenticated}`);
    lines.push('========================================================================================');
    lines.push(t.footerHelplineText);

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PeerFund-Official-Receipt-${referenceId.replace('#', '')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-sm bg-slate-900/65 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Modal Card Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-2xl border border-slate-300 shadow-2xl overflow-hidden my-6">
        
        {/* Printable Official Receipt Body */}
        <div id="printable-receipt" className="p-6 sm:p-10 space-y-6 text-slate-900 bg-white">
          
          {/* Header of the Official Receipt */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 rounded-xl bg-blue-900 text-white flex items-center justify-center font-black text-2xl shadow-sm border border-blue-950">
                PF
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight font-sans">
                    Peer<span className="text-blue-900">Fund</span>
                  </h2>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300 font-mono">
                    NBFC-P2P REG. N-14.03291
                  </span>
                </div>
                <p className="text-xs text-slate-700 font-bold mt-0.5">
                  {t.receiptDualPartyTitle}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {t.receiptSubHeader}
                </p>
              </div>
            </div>

            {/* Official Verification Stamp */}
            <div className="flex flex-col items-start sm:items-end">
              <div className="official-stamp text-xs sm:text-sm font-mono font-black">
                ✓ {t.receiptStatusStamp}
              </div>
              <span className="text-[10px] text-slate-500 font-mono mt-1 font-bold">
                {t.receiptRefLabel}: {referenceId}
              </span>
            </div>
          </div>

          {/* BACKEND PAYMENT GATEWAY CLEARANCE DETAILS */}
          <div className="p-3.5 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-xl shadow-sm space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/20 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-black tracking-wide font-mono uppercase">
                  Escrow Payment Clearance • {paymentApp}
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-emerald-400 text-slate-950 font-mono">
                {t.receiptStatusStamp}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-blue-200 block text-[10px] uppercase font-bold">
                  {t.receiptPaymentAppLabel}
                </span>
                <span className="font-bold text-white text-xs block">
                  {paymentApp}
                </span>
              </div>

              <div>
                <span className="text-blue-200 block text-[10px] uppercase font-bold">
                  {t.receiptTxnIdLabel}
                </span>
                <span className="font-mono font-bold text-emerald-300 text-xs block">
                  {transactionId}
                </span>
              </div>

              <div>
                <span className="text-blue-200 block text-[10px] uppercase font-bold">
                  {t.receiptBankRefLabel}
                </span>
                <span className="font-mono font-bold text-white text-xs block truncate" title={bankRefNumber}>
                  {bankRefNumber}
                </span>
              </div>

              <div>
                <span className="text-blue-200 block text-[10px] uppercase font-bold">
                  {t.orderIdLabel}
                </span>
                <span className="font-mono font-bold text-blue-100 text-xs block">
                  {orderId}
                </span>
              </div>
            </div>
          </div>

          {/* PART 1: INVESTOR / LENDER DETAILS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-blue-200 pb-1.5">
              <h3 className="text-sm font-black uppercase tracking-wider text-blue-950 flex items-center gap-2">
                <User className="w-4 h-4 text-blue-900" />
                <span>{t.receiptLenderSection}</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-300 font-mono">
                {t.receiptZeroCashDragBadge}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 border border-slate-300 rounded-xl p-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  {t.receiptLenderNameLabel}
                </span>
                <span className="font-bold text-slate-900 block text-xs">
                  {lenderName}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  Aadhaar: {lenderAadhaarRef}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  {t.receiptTotalLabel}
                </span>
                <span className="text-base font-black font-mono text-blue-950">
                  {formatCurrency(totalCapitalInr, currency)}
                </span>
                <span className="text-[10px] text-emerald-700 block font-bold">
                  +{expectedProfit}% Expected Yield / Yr
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  {t.receiptDateLabel} & {t.receiptTimeLabel}
                </span>
                <span className="font-bold text-slate-900 block font-mono">
                  {dateStr}
                </span>
                <span className="text-[10px] text-slate-500 font-mono block">
                  {timeStr}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">
                  {t.receiptStatusLabel}
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[11px] mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>{t.receiptStatusStamp}</span>
                </span>
                <span className="text-[10px] text-slate-500 block mt-0.5 truncate" title={escrowPartnerBank}>
                  {escrowPartnerBank}
                </span>
              </div>
            </div>

            {/* Smart Escrow Contract Hash */}
            <div className="px-3.5 py-2 bg-blue-50/70 border border-blue-200 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
              <div className="flex items-center gap-1.5 font-mono text-blue-950 font-bold">
                <Hash className="w-3.5 h-3.5 text-blue-800 shrink-0" />
                <span className="text-slate-600 font-normal">{t.receiptContractHashLabel}:</span>
                <span className="truncate max-w-[280px] sm:max-w-md">{contractHash}</span>
              </div>
              <span className="text-[10px] text-slate-600 font-semibold">
                Duration: {receipt.targetTimeline === 0 ? 'All Durations' : `${receipt.targetTimeline} Months`}
              </span>
            </div>
          </div>

          {/* PART 2: BORROWER / RECIPIENT ALLOCATION BREAKDOWN */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-blue-200 pb-1.5">
              <h3 className="text-sm font-black uppercase tracking-wider text-blue-950 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-900" />
                <span>{t.receiptBorrowerSection}</span>
              </h3>
              <span className="text-xs font-mono font-bold text-slate-700">
                {borrowersList.length} Verified Local Enterprises (Pune / PCMC)
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-300 rounded-xl shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold">
                  <tr>
                    <th className="py-2.5 px-3 w-8">#</th>
                    <th className="py-2.5 px-3">{t.receiptTableColBorrower}</th>
                    <th className="py-2.5 px-3">{t.receiptColLocation}</th>
                    <th className="py-2.5 px-3">{t.receiptTableColPurpose}</th>
                    <th className="py-2.5 px-3 text-center">{t.receiptTableColCibil}</th>
                    <th className="py-2.5 px-3 text-center">{t.receiptColTenure}</th>
                    <th className="py-2.5 px-3 text-right">{t.receiptColEmi}</th>
                    <th className="py-2.5 px-3 text-right">{t.receiptTableColShare}</th>
                    <th className="py-2.5 px-3 text-right">{t.receiptTableColAllocated}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-800 bg-white">
                  {borrowersList.map((b, idx) => (
                    <tr key={b.borrowerId || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70 hover:bg-slate-100/60'}>
                      <td className="py-3 px-3 font-mono font-bold text-slate-500">{idx + 1}</td>
                      
                      {/* Borrower & Enterprise Name */}
                      <td className="py-3 px-3 min-w-[150px]">
                        <span className="font-bold text-slate-900 block text-xs">
                          {getBorrowerName(b)}
                        </span>
                        <span className="text-[11px] text-slate-600 block">
                          {getBusinessName(b)}
                        </span>
                      </td>

                      {/* Category & Location */}
                      <td className="py-3 px-3 min-w-[140px]">
                        <span className="text-slate-900 font-medium block text-[11px]">
                          {getBusinessCategory(b)}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 text-slate-400" />
                          <span>{getLocation(b)}</span>
                        </span>
                      </td>

                      {/* Stated Purpose */}
                      <td className="py-3 px-3 max-w-[200px] text-[11px] text-slate-600 leading-snug">
                        {getPurpose(b)}
                      </td>

                      {/* CIBIL Score Badge */}
                      <td className="py-3 px-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-slate-100 text-slate-800 border border-slate-300">
                          {b.cibilScore}
                        </span>
                      </td>

                      {/* Repayment Tenure */}
                      <td className="py-3 px-3 text-center font-mono font-bold text-blue-900 text-xs">
                        {b.loanTenureMonths}M
                      </td>

                      {/* Monthly EMI Breakdown */}
                      <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 text-xs">
                        {formatCurrency(b.monthlyEmiInr, currency)}
                        <span className="text-[9px] text-slate-500 block font-sans">/ mo</span>
                      </td>

                      {/* Portfolio Share */}
                      <td className="py-3 px-3 text-right font-mono font-bold text-blue-900">
                        {b.allocationPercent}%
                      </td>

                      {/* Allocated Capital */}
                      <td className="py-3 px-3 text-right font-mono font-black text-slate-900 text-xs">
                        {formatCurrency(b.allocatedAmountInr, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-100 font-bold border-t-2 border-slate-300 text-slate-900">
                  <tr>
                    <td colSpan={6} className="py-3 px-3 text-right font-black uppercase text-xs">
                      Aggregate Monthly Collection & Total Deployed:
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-xs font-black text-emerald-800">
                      {formatCurrency(totalMonthlyEmi, currency)}/mo
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-xs text-blue-900">
                      100.0%
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-sm font-black text-blue-950">
                      {formatCurrency(totalCapitalInr, currency)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Legal / Verification Footer & Regulatory Compliance */}
          <div className="p-4 bg-slate-50 border border-slate-300 rounded-xl space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] pb-2 border-b border-slate-200">
              <span className="text-slate-600">
                Auth Token: <strong className="text-slate-900 font-mono">{verificationHash}</strong>
              </span>
              <span className="text-emerald-800 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.receiptTrusteeAuthenticated}</span>
              </span>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              {t.receiptRegulatoryNote}
            </p>

            <div className="text-[10px] text-slate-500 pt-1 flex flex-col sm:flex-row justify-between gap-1">
              <span>{t.footerHelplineText}</span>
              <span className="font-mono">Official Reference: {referenceId}</span>
            </div>
          </div>

        </div>

        {/* Modal Controls / Action Bar */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            {/* Active Print / PDF Receipt Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 active:scale-95 text-white font-black text-xs transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <Printer className="w-4 h-4 text-white" />
              <span>{t.receiptDownloadPdfBtn}</span>
            </button>

            {/* Save Plaintext Copy */}
            <button
              type="button"
              onClick={handleDownloadTxt}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 active:scale-95 border border-slate-300 text-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4 text-blue-900" />
              <span>{t.receiptSaveTxtBtn}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
          >
            {t.receiptCloseBtn}
          </button>
        </div>

      </div>
    </div>
  );
};

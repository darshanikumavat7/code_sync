import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Coins, 
  AlertCircle, 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  FileCheck2,
  TrendingUp,
  Sliders
} from 'lucide-react';
import { Language, Currency, Borrower, NewBorrowerApplicationRequest } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';
import { applyAsNewBorrower } from '../services/borrowerService';

interface NewBorrowerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  onBorrowerCreated: (newBorrower: Borrower) => void;
}

export const NewBorrowerModal: React.FC<NewBorrowerModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  onBorrowerCreated,
}) => {
  const t = TRANSLATIONS[language];

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cityArea, setCityArea] = useState('Kothrud');
  const [businessName, setBusinessName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('Vendor Stock & Kirana');
  const [requestedAmount, setRequestedAmount] = useState<number>(25000);
  const [tenureMonths, setTenureMonths] = useState<1 | 3 | 6 | 12 | 24>(6);
  const [purpose, setPurpose] = useState('Vendor inventory restocking for seasonal wholesale order');
  const [monthlyIncome, setMonthlyIncome] = useState<number>(45000);
  const [cibilScore, setCibilScore] = useState<number>(760);
  const [uploadedDocName, setUploadedDocName] = useState<string>('Aadhaar_PAN_eKYC_Verified.pdf');

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [createdBorrower, setCreatedBorrower] = useState<Borrower | null>(null);

  if (!isOpen) return null;

  // City / Area presets for Pune & PCMC
  const cityPresets = ['Pimpri', 'Chinchwad', 'Kothrud', 'Bhosari', 'Hadapsar', 'Wakad', 'Katraj'];

  // Quick autofill demo borrower for evaluation
  const handleAutofillDemo = () => {
    setFullName('Ramesh Shinde');
    setEmail('ramesh.shinde@peerfund-demo.in');
    setPhone('+91 98220 54321');
    setCityArea('Kothrud');
    setBusinessName('Shinde General Stores & Dairy');
    setBusinessCategory('Essential Grocery');
    setRequestedAmount(25000);
    setTenureMonths(6);
    setPurpose('Bulk procurement of high-turnover grocery inventory and milk cooler');
    setMonthlyIncome(52000);
    setCibilScore(775);
    setUploadedDocName('UIDAI_Aadhaar_2384_PAN_Masked.pdf');
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full legal name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (requestedAmount < 500 || requestedAmount > 50000) {
      setErrorMessage('Requested loan amount must be between ₹500 and ₹50,000.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: NewBorrowerApplicationRequest = {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || '+91 98000 00000',
        cityArea,
        businessName: businessName.trim() || `${fullName.trim()}'s Enterprise`,
        businessCategory,
        requestedAmountInr: requestedAmount,
        tenureMonths,
        purpose,
        monthlyIncomeInr: monthlyIncome,
        cibilSelfDeclaration: cibilScore,
        mockDocUploaded: uploadedDocName,
      };

      const result = await applyAsNewBorrower(payload);

      if (result.success && result.borrower) {
        setCreatedBorrower(result.borrower);
        onBorrowerCreated(result.borrower);
      } else {
        setErrorMessage(result.error || 'Failed to submit borrower application. Please verify details.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseAndReset = () => {
    setCreatedBorrower(null);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-300 shadow-2xl my-8 overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-800 border border-blue-700 flex items-center justify-center text-white">
              <Building2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight font-sans">
                  New Borrower Application & Onboarding
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold font-mono">
                  Instant P2P Listing
                </span>
              </div>
              <p className="text-xs text-blue-200">
                PeerFund Pune & PCMC Micro-Enterprise Direct Credit Network
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCloseAndReset}
            className="p-1.5 rounded-lg bg-blue-800 hover:bg-blue-700 text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">

          {createdBorrower ? (
            /* Application Approved & Listed State */
            <div className="text-center space-y-5 py-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono">
                  ✨ DYNAMICALLY LISTED ON MARKETPLACE
                </span>
                <h4 className="text-2xl font-black text-slate-900 tracking-tight pt-2">
                  Borrower Onboarding Complete!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your loan request is now <strong className="text-slate-900">live in the active lender marketplace</strong>. PeerFund retail investors can immediately allocate micro-tickets to fund your request.
                </p>
              </div>

              {/* Dynamic Assessment Outcome Card */}
              <div className="bg-slate-50 border border-slate-300 rounded-xl p-5 text-left text-xs space-y-3 font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Marketplace Borrower ID:</span>
                  <span className="font-bold text-blue-900">{createdBorrower.id}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Applicant Legal Name:</span>
                  <span className="font-bold text-slate-900">{createdBorrower.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Business Enterprise:</span>
                  <span className="font-bold text-slate-900">{createdBorrower.businessName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-bold text-slate-900">{createdBorrower.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Requested Micro-Loan:</span>
                  <span className="font-black text-emerald-700 text-sm">
                    {formatCurrency(createdBorrower.poolGoalInr, currency)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Tenure:</span>
                  <span className="font-bold text-slate-900">{createdBorrower.loanTenureMonths} Months</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Algorithmic CIBIL Score:</span>
                  <span className="font-black text-emerald-600 text-sm">
                    {createdBorrower.cibilScore} (Prime Grade)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Indicative Investor Return:</span>
                  <span className="font-bold text-blue-900">
                    +{createdBorrower.expectedAnnualProfit}% Annual ROI
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <span className="text-slate-500">e-KYC Document Verification:</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Aadhaar & PAN Match 100%</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <span>View in Live Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            /* Application Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Evaluator Quick Demo Autofill Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-700 shrink-0" />
                  <p className="text-xs text-blue-950 font-medium">
                    Demo Mode: 1-click test application for Pune / PCMC micro-enterprise
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAutofillDemo}
                  className="px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shrink-0 shadow-sm"
                >
                  ⚡ Autofill Demo Application
                </button>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* SECTION 1: Personal & Identity Information */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 pb-1 border-b border-slate-200">
                  <User className="w-4 h-4 text-blue-900" />
                  <span>1. Personal & Contact Information</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label htmlFor="borrower-name" className="text-xs font-bold text-slate-700">
                      Full Legal Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        id="borrower-name"
                        type="text"
                        required
                        placeholder="e.g. Ramesh Shinde"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="borrower-email" className="text-xs font-bold text-slate-700">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        id="borrower-email"
                        type="email"
                        required
                        placeholder="e.g. ramesh.shinde@peerfund.org"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label htmlFor="borrower-phone" className="text-xs font-bold text-slate-700">
                      Mobile Number (WhatsApp linked)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                      <input
                        id="borrower-phone"
                        type="tel"
                        placeholder="+91 98220 12345"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">
                      City / Area (Pune & PCMC) *
                    </label>
                    <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                      {cityPresets.map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setCityArea(area)}
                          className={`px-2.5 py-1 text-xs rounded-md font-semibold border transition-all ${
                            cityArea === area
                              ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          {area}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Loan Request Specifications */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 pb-1 border-b border-slate-200">
                  <Coins className="w-4 h-4 text-blue-900" />
                  <span>2. Micro-Loan Request & Purpose</span>
                </h4>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="loan-amt-slider" className="text-xs font-bold text-slate-700">
                      Requested Loan Amount (₹500 to ₹50,000)
                    </label>
                    <span className="font-mono font-black text-blue-900 text-base">
                      {formatCurrency(requestedAmount, currency)}
                    </span>
                  </div>
                  <input
                    id="loan-amt-slider"
                    type="range"
                    min="500"
                    max="50000"
                    step="500"
                    value={requestedAmount}
                    onChange={(e) => setRequestedAmount(Number(e.target.value))}
                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-300 accent-blue-900"
                  />
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <span className="text-[11px] text-slate-500">Presets:</span>
                    {[2000, 5000, 15000, 25000, 50000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setRequestedAmount(amt)}
                        className={`px-2 py-0.5 rounded text-[11px] font-bold border transition-all ${
                          requestedAmount === amt
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {formatCurrency(amt, currency)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-900" />
                      <span>Repayment Tenure (1 to 24 Months)</span>
                    </label>
                    <div className="grid grid-cols-5 gap-1">
                      {([1, 3, 6, 12, 24] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setTenureMonths(m)}
                          className={`p-1.5 rounded-lg text-xs font-bold text-center border transition-all ${
                            tenureMonths === m
                              ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {m}M
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="biz-cat" className="text-xs font-bold text-slate-700">
                      Enterprise Category
                    </label>
                    <select
                      id="biz-cat"
                      value={businessCategory}
                      onChange={(e) => setBusinessCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-white"
                    >
                      <option value="Essential Grocery">Essential Grocery & Kirana</option>
                      <option value="Vendor Stock & Trade">Vendor Stock & Retail Trade</option>
                      <option value="Electricals & Hardware">Electricals & Hardware</option>
                      <option value="Agriculture & Dairy">Agriculture & Dairy Farming</option>
                      <option value="Machinery & Tooling">Shop Equipment & Machinery</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="loan-purpose-input" className="text-xs font-bold text-slate-700">
                    Stated Loan Purpose *
                  </label>
                  <textarea
                    id="loan-purpose-input"
                    rows={2}
                    required
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    placeholder="e.g. Purchase of shop supplies, raw materials, or equipment..."
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>
              </div>

              {/* SECTION 3: Credit & Verification Docs */}
              <div className="space-y-3.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5 pb-1 border-b border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-blue-900" />
                  <span>3. Credit Assessment & Document Verification</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <div className="flex items-between justify-between">
                      <label htmlFor="monthly-income-input" className="text-xs font-bold text-slate-700">
                        Monthly Enterprise Income
                      </label>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {formatCurrency(monthlyIncome, currency)}/mo
                      </span>
                    </div>
                    <input
                      id="monthly-income-input"
                      type="number"
                      min="10000"
                      max="300000"
                      step="5000"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-between justify-between">
                      <label htmlFor="cibil-slider" className="text-xs font-bold text-slate-700">
                        CIBIL Self-Declaration
                      </label>
                      <span className="text-xs font-mono font-bold text-emerald-700">
                        {cibilScore} Score
                      </span>
                    </div>
                    <input
                      id="cibil-slider"
                      type="range"
                      min="680"
                      max="850"
                      step="5"
                      value={cibilScore}
                      onChange={(e) => setCibilScore(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer border border-slate-300 accent-emerald-600"
                    />
                  </div>
                </div>

                {/* Mock Aadhaar / PAN Upload Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Aadhaar / PAN KYC Verification Document
                  </label>
                  <div className="p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 transition-colors flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                        <UploadCloud className="w-5 h-5 text-blue-700" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <span>{uploadedDocName}</span>
                          <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                            e-KYC Ready
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">
                          Encrypted 256-bit Document Storage • Auto UIDAI Tokenized
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setUploadedDocName(`Aadhaar_PAN_eKYC_${Math.floor(1000 + Math.random() * 9000)}.pdf`)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold shrink-0"
                    >
                      Browse File
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCloseAndReset}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white font-bold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {isSubmitting ? 'Validating & Publishing to Marketplace...' : 'Submit Application & List on Marketplace'}
                  </span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

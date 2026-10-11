import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Smartphone, 
  Building2, 
  CreditCard, 
  QrCode, 
  ArrowRight, 
  RefreshCw, 
  Sparkles,
  Check,
  Landmark,
  Coins
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Currency, UserRole, PaymentMethod, TransactionReceipt, BorrowerMatch, TargetTimeline } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency, generateOfficialReceipt } from '../utils/calculator';
import { createPaymentOrder, verifyPaymentTransaction } from '../services/paymentService';

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  amountInr: number;
  userRole: UserRole;
  topMatches?: BorrowerMatch[];
  targetTimeline?: TargetTimeline;
  isPortfolioLocked?: boolean;
  onPaymentSuccess: (receipt: TransactionReceipt) => void;
}

export const PaymentGatewayModal: React.FC<PaymentGatewayModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  amountInr,
  userRole,
  topMatches = [],
  targetTimeline = 0,
  isPortfolioLocked = true,
  onPaymentSuccess,
}) => {
  const t = TRANSLATIONS[language];

  // Active Tab: 'upi' | 'netbanking' | 'card'
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');

  // Order Details
  const [orderId, setOrderId] = useState<string>('');
  const [isLoadingOrder, setIsLoadingOrder] = useState<boolean>(true);

  // UPI Form States
  const [selectedUpiApp, setSelectedUpiApp] = useState<string>('Google Pay');
  const [upiId, setUpiId] = useState<string>('investor.rajesh@okaxis');

  // NetBanking Form States
  const [selectedBank, setSelectedBank] = useState<string>('State Bank of India');
  const [accountType, setAccountType] = useState<'retail' | 'corporate'>('retail');

  // Card Form States
  const [cardNumber, setCardNumber] = useState<string>('4532 8841 9021 7382');
  const [cardHolder, setCardHolder] = useState<string>('RAJESH MEHTA');
  const [cardExpiry, setCardExpiry] = useState<string>('08/29');
  const [cardCvv, setCardCvv] = useState<string>('782');

  // Authorization Processing States
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const [authStep, setAuthStep] = useState<number>(1);
  const [authError, setAuthError] = useState<string | null>(null);
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isAuthorizing) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isAuthorizing]);

  // Create order via backend API when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoadingOrder(true);
      setAuthError(null);
      setIsAuthorizing(false);
      setAuthStep(1);

      createPaymentOrder({
        amountInr,
        currency,
        role: userRole,
        lenderName: 'Rajesh Mehta (Retail Investor • Aadhaar Verified)',
        notes: `PeerFund ${userRole === 'investor' ? 'Portfolio Investment' : 'Borrower Escrow Pledge'}`,
      }).then((order) => {
        setOrderId(order.orderId);
        setIsLoadingOrder(false);
      });
    }
  }, [isOpen, amountInr, currency, userRole]);

  if (!isOpen) return null;

  // Autofill handlers
  const handleAutofillUpi = (preset: string) => {
    setUpiId(preset);
  };

  const handleAutofillCard = () => {
    setCardNumber('4532 8841 9021 7382');
    setCardHolder('RAJESH MEHTA');
    setCardExpiry('08/29');
    setCardCvv('782');
  };

  // UPI Apps list
  const upiApps = [
    { name: 'Google Pay', badge: 'GPay', color: 'border-blue-500 bg-blue-50/50 text-blue-900' },
    { name: 'PhonePe', badge: 'PhonePe', color: 'border-purple-500 bg-purple-50/50 text-purple-900' },
    { name: 'Paytm', badge: 'Paytm', color: 'border-sky-500 bg-sky-50/50 text-sky-900' },
    { name: 'BHIM UPI', badge: 'BHIM', color: 'border-emerald-600 bg-emerald-50/50 text-emerald-900' },
  ];

  // Netbanking major banks
  const banksList = [
    { name: 'State Bank of India', tag: 'Escrow Trustee Bank', icon: '🏛️' },
    { name: 'HDFC Bank', tag: 'Fast 2FA', icon: '🏦' },
    { name: 'ICICI Bank', tag: 'P2P Clearing Partner', icon: '🏦' },
    { name: 'Axis Bank', tag: 'Instant RTGS', icon: '🏦' },
    { name: 'Punjab National Bank', tag: 'PSU Bank', icon: '🏛️' },
    { name: 'Bank of Baroda', tag: 'Govt Partner', icon: '🏛️' },
  ];

  // Execute payment authorization via backend API
  const handleAuthorizePayment = async () => {
    setIsAuthorizing(true);
    setAuthError(null);
    setAuthStep(1);

    // Step 1: Connecting to Escrow Bank
    const stepTimer1 = setTimeout(() => setAuthStep(2), 700);
    // Step 2: 2FA & Clearing Validation
    const stepTimer2 = setTimeout(() => setAuthStep(3), 1400);

    const paymentAppLabel = 
      selectedMethod === 'upi' ? `${selectedUpiApp} (UPI)` :
      selectedMethod === 'netbanking' ? `${selectedBank} (NetBanking)` :
      'RuPay / Visa Platinum Card';

    try {
      const result = await verifyPaymentTransaction({
        orderId,
        paymentMethod: selectedMethod,
        paymentApp: paymentAppLabel,
        payerUpiOrAccount: selectedMethod === 'upi' ? upiId : selectedMethod === 'card' ? `Card ending ${cardNumber.slice(-4)}` : selectedBank,
        amountInr,
        currency,
        role: userRole,
        simulateFailure,
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);

      if (result.success && result.status === 'SUCCESS') {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // ignore if canvas not supported
        }

        // Generate complete official receipt enriched with real payment transaction details
        const receipt = generateOfficialReceipt(
          amountInr,
          currency,
          topMatches,
          targetTimeline,
          isPortfolioLocked,
          'Rajesh Mehta (Retail Investor • Aadhaar Verified)',
          {
            orderId: result.orderId,
            paymentApp: result.paymentApp,
            transactionId: result.transactionId,
            bankRefNumber: result.bankRefNumber,
            payerRole: userRole,
            escrowStatus: 'VERIFIED & ESCROWED',
          }
        );

        setTimeout(() => {
          setIsAuthorizing(false);
          onPaymentSuccess(receipt);
        }, 600);
      } else {
        setIsAuthorizing(false);
        setAuthError(result.message || t.paymentFailedToast);
      }
    } catch (err: any) {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsAuthorizing(false);
      setAuthError(err?.message || 'Payment authorization encountered a communication failure.');
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto backdrop-blur-md bg-slate-900/70 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isAuthorizing) onClose();
      }}
    >
      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl border border-slate-300 shadow-2xl overflow-hidden my-6">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white px-6 py-4 flex items-center justify-between border-b border-blue-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/20">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black tracking-tight">
                  {t.paymentModalTitle}
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-mono">
                  256-BIT SSL
                </span>
              </div>
              <p className="text-xs text-blue-200">
                {t.paymentModalSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isAuthorizing}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Summary Strip */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">
              {t.orderIdLabel}
            </span>
            <span className="font-mono font-bold text-slate-900 text-xs">
              {isLoadingOrder ? 'Generating...' : orderId}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">
              {t.selectedRoleLabel}
            </span>
            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
              userRole === 'investor' 
                ? 'bg-blue-100 text-blue-900 border border-blue-200' 
                : 'bg-amber-100 text-amber-900 border border-amber-200'
            }`}>
              {userRole === 'investor' ? 'Investor (Lender)' : 'Borrower Mode'}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">
              {t.convenienceFeeLabel}
            </span>
            <span className="text-emerald-700 font-bold font-mono">
              {t.freeZeroFee}
            </span>
          </div>

          <div>
            <span className="text-slate-500 block text-[10px] uppercase font-bold">
              {t.paymentAmountLabel}
            </span>
            <span className="text-base font-black font-mono text-blue-950">
              {formatCurrency(amountInr, currency)}
            </span>
          </div>
        </div>

        {/* Payment Methods Navigation */}
        <div className="p-6 space-y-6">
          <div className="flex border-b border-slate-200">
            <button
              type="button"
              onClick={() => setSelectedMethod('upi')}
              className={`flex-1 pb-3 text-xs font-bold transition-all flex items-center justify-center gap-2 border-b-2 ${
                selectedMethod === 'upi'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>{t.paymentMethodUpi}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('netbanking')}
              className={`flex-1 pb-3 text-xs font-bold transition-all flex items-center justify-center gap-2 border-b-2 ${
                selectedMethod === 'netbanking'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>{t.paymentMethodNetBanking}</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('card')}
              className={`flex-1 pb-3 text-xs font-bold transition-all flex items-center justify-center gap-2 border-b-2 ${
                selectedMethod === 'card'
                  ? 'border-blue-900 text-blue-900'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>{t.paymentMethodCard}</span>
            </button>
          </div>

          {/* TAB 1: UPI PAYMENT */}
          {selectedMethod === 'upi' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <label className="block text-xs font-bold text-slate-700">
                Select Instant UPI Application:
              </label>

              {/* UPI App Selection Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {upiApps.map((app) => (
                  <button
                    key={app.name}
                    type="button"
                    onClick={() => setSelectedUpiApp(app.name)}
                    className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                      selectedUpiApp === app.name
                        ? `border-2 border-blue-900 bg-blue-50/70 shadow-sm ring-1 ring-blue-900 font-bold`
                        : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xs font-black">{app.badge}</span>
                    <span className="text-[10px] text-slate-600 font-medium">{app.name}</span>
                  </button>
                ))}
              </div>

              {/* UPI ID Input & Test Autofill */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="upi-id-input" className="text-xs font-bold text-slate-700">
                    VPA / UPI ID:
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-slate-500 font-medium">{t.testUpiAutofillBtn}:</span>
                    <button
                      type="button"
                      onClick={() => handleAutofillUpi('9876543210@upi')}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 hover:bg-blue-100 text-blue-900 border border-slate-300"
                    >
                      9876543210@upi
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAutofillUpi('investor@okhdfcbank')}
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 hover:bg-blue-100 text-blue-900 border border-slate-300"
                    >
                      @okhdfcbank
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    id="upi-id-input"
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder={t.upiIdPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono text-xs"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-bold text-emerald-700 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Verified VPA</span>
                  </span>
                </div>
              </div>

              {/* QR Code Simulation Mini Card */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white border border-slate-300 flex items-center justify-center shrink-0">
                    <QrCode className="w-5 h-5 text-blue-900" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">Dynamic Escrow QR Generated</span>
                    <span className="text-[10px] text-slate-500 font-mono">Scan directly with PhonePe, GPay, Paytm</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-900 px-2 py-1 bg-white border border-slate-300 rounded">
                  0% Convenience Fee
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: NETBANKING */}
          {selectedMethod === 'netbanking' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  {t.selectBankLabel}:
                </label>
                <div className="flex items-center gap-1 text-[11px] font-bold">
                  <button
                    type="button"
                    onClick={() => setAccountType('retail')}
                    className={`px-2 py-0.5 rounded ${accountType === 'retail' ? 'bg-blue-900 text-white' : 'text-slate-600'}`}
                  >
                    Retail
                  </button>
                  <button
                    type="button"
                    onClick={() => setAccountType('corporate')}
                    className={`px-2 py-0.5 rounded ${accountType === 'corporate' ? 'bg-blue-900 text-white' : 'text-slate-600'}`}
                  >
                    Corporate
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {banksList.map((bank) => (
                  <button
                    key={bank.name}
                    type="button"
                    onClick={() => setSelectedBank(bank.name)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                      selectedBank === bank.name
                        ? 'border-2 border-blue-900 bg-blue-50/70 shadow-sm ring-1 ring-blue-900'
                        : 'border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base">{bank.icon}</span>
                      <div>
                        <span className="font-bold text-slate-900 block text-xs">{bank.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{bank.tag}</span>
                      </div>
                    </div>
                    {selectedBank === bank.name && (
                      <CheckCircle2 className="w-4 h-4 text-blue-900 shrink-0" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-[11px] text-slate-700">
                <span>Direct integration with <strong>State Bank of India P2P Trustee Gateway</strong> ensures instantaneous capital transfer and immediate receipt issuance.</span>
              </div>
            </div>
          )}

          {/* TAB 3: DEBIT / CREDIT CARD */}
          {selectedMethod === 'card' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Card Form */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">
                    Card Details (RuPay, Visa, MasterCard):
                  </label>
                  <button
                    type="button"
                    onClick={handleAutofillCard}
                    className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-100 hover:bg-blue-200 text-blue-900 border border-blue-300"
                  >
                    {t.testCardAutofillBtn}
                  </button>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    {t.cardNumber}
                  </span>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 •••• •••• 8841"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="col-span-2 sm:col-span-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                      {t.cardHolderName}
                    </span>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono text-xs"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                      {t.cardExpiry}
                    </span>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono text-xs text-center"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                      {t.cardCvv}
                    </span>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-900 font-mono text-xs text-center"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Test / Quality Assurance Toggle */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">
              {t.simulateFailureToggle}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={simulateFailure}
                onChange={(e) => setSimulateFailure(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          {/* Error Message Alert */}
          {authError && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-xl flex items-center gap-2 text-xs text-red-800 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <Lock className="w-3.5 h-3.5 text-emerald-700" />
              <span>RBI Regulated P2P Escrow Clearing</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                disabled={isAuthorizing}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors w-full sm:w-auto disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAuthorizePayment}
                disabled={isAuthorizing}
                className="px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-black text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto disabled:opacity-60"
              >
                {isAuthorizing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>{t.authorizingBankDelay}</span>
                  </>
                ) : (
                  <>
                    <span>{t.authorizePaymentBtn} ({formatCurrency(amountInr, currency)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

        {/* 2-Second Simulated Bank Authorization Modal Overlay */}
        {isAuthorizing && (
          <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center space-y-4 animate-in fade-in duration-200">
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-900 flex items-center justify-center shadow-md relative">
              <RefreshCw className="w-8 h-8 animate-spin text-blue-900" />
            </div>

            <div className="space-y-1 max-w-sm">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-900 border border-blue-300">
                BANK ESCROW HANDSHAKE
              </span>
              <h4 className="text-base font-black text-slate-900 pt-1">
                Authorizing {formatCurrency(amountInr, currency)} Escrow Deposit
              </h4>
              <p className="text-xs text-slate-500">
                {authStep === 1 && '1/3 Connecting securely to Scheduled Commercial Bank Gateway...'}
                {authStep === 2 && '2/3 Validating 2FA authentication & cryptographic signature...'}
                {authStep === 3 && '3/3 Minting Smart Escrow Contract Hash on RBI P2P Registry...'}
              </p>
            </div>

            <div className="w-48 bg-slate-200 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-blue-900 h-full transition-all duration-700 ease-out"
                style={{ width: authStep === 1 ? '35%' : authStep === 2 ? '75%' : '100%' }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

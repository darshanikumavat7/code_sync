import { Language } from '../types';

export interface Translations {
  portalName: string;
  portalSubtitle: string;
  officialBadge: string;
  helpline: string;
  sliderSectionTitle: string;
  sliderSectionSubtitle: string;
  investmentAmountLabel: string;
  investmentAmountDesc: string;
  microBudgetHelp: string;
  targetTimelineLabel: string;
  targetTimelineDesc: string;
  timelineAll: string;
  timeline1M: string;
  timeline3M: string;
  timeline6M: string;
  timeline12M: string;
  timeline24M: string;
  lockBalanceLabel: string;
  lockBalanceDesc: string;
  lockBalanceActiveNotice: string;
  riskSafetyLabel: string;
  riskSafetyDesc: string;
  riskLevelSafe: string;
  riskLevelBalanced: string;
  riskLevelHighYield: string;
  expectedAnnualProfitLabel: string;
  safetyScoreLabel: string;
  smartBasketTitle: string;
  smartBasketSubtitle: string;
  borrowersListTitle: string;
  borrowersListSubtitle: string;
  match100Badge: string;
  timelineBadge: string;
  fractionalSliceBadge: string;
  cibilScoreLabel: string;
  loanPurposeLabel: string;
  pastRecordLabel: string;
  viewDetailsBtn: string;
  fundPortfolioBtn: string;
  compareWithFdBtn: string;
  voiceMicBtn: string;
  voiceModalTitle: string;
  voiceModalSubtitle: string;
  voiceListening: string;
  voiceTapToSpeak: string;
  voiceCommandsHelp: string[];
  borrowerModalTitle: string;
  borrowerModalSubtitle: string;
  cibilHistoryTitle: string;
  loanDetailsTitle: string;
  repaymentHistoryTitle: string;
  recommendationReasonTitle: string;
  verifiedBadgesTitle: string;
  profitModalTitle: string;
  profitModalSubtitle: string;
  profitComparisonTitle: string;
  peerFundYieldLabel: string;
  bankFdYieldLabel: string;
  extraProfitLabel: string;
  receiptModalTitle: string;
  receiptModalSubtitle: string;
  receiptRefLabel: string;
  receiptDateLabel: string;
  receiptTimeLabel: string;
  receiptStatusLabel: string;
  receiptTotalLabel: string;
  receiptTableColBorrower: string;
  receiptTableColPurpose: string;
  receiptTableColCibil: string;
  receiptTableColAllocated: string;
  receiptTableColShare: string;
  receiptPrintBtn: string;
  receiptCloseBtn: string;
  officialStampText: string;
  footerHelplineText: string;
  footerNbfcNotice: string;

  // Dual-Role Toggle
  roleLender: string;
  roleBorrower: string;

  // Borrower Application Flow
  borrowerPortalTitle: string;
  borrowerPortalSubtitle: string;
  applicantNameLabel: string;
  businessNameLabel: string;
  businessCategoryLabel: string;
  businessLocationLabel: string;
  monthlyRevenueLabel: string;
  requestedAmountLabel: string;
  repaymentTenureLabel: string;
  repaymentFreqLabel: string;
  freqDaily: string;
  freqWeekly: string;
  freqMonthly: string;
  preAssessmentTitle: string;
  preAssessmentSubtitle: string;
  preAssessmentCibil: string;
  preAssessmentRate: string;
  preAssessmentEmi: string;
  preAssessmentDisbursal: string;
  submitLoanBtn: string;
  loanApprovedBadge: string;
  loanSubmittedSuccess: string;
  applicationSuccessTitle: string;
  applicationSuccessDesc: string;

  // Dual-Party Receipt Strings
  receiptDualPartyTitle: string;
  receiptSubHeader: string;
  receiptLenderSection: string;
  receiptBorrowerSection: string;
  receiptLenderNameLabel: string;
  receiptContractHashLabel: string;
  receiptEscrowBankLabel: string;
  receiptColTenure: string;
  receiptColEmi: string;
  receiptColLocation: string;
  receiptDownloadPdfBtn: string;
  receiptSaveTxtBtn: string;
  receiptZeroCashDragBadge: string;
  receiptTrusteeAuthenticated: string;
  receiptRegulatoryNote: string;

  // Payment Gateway Keys
  paymentModalTitle: string;
  paymentModalSubtitle: string;
  paymentSummaryTitle: string;
  paymentAmountLabel: string;
  convenienceFeeLabel: string;
  freeZeroFee: string;
  selectedRoleLabel: string;
  orderIdLabel: string;
  paymentMethodUpi: string;
  paymentMethodNetBanking: string;
  paymentMethodCard: string;
  upiIdPlaceholder: string;
  testUpiAutofillBtn: string;
  selectBankLabel: string;
  cardHolderName: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvv: string;
  testCardAutofillBtn: string;
  authorizePaymentBtn: string;
  authorizingBankDelay: string;
  proceedToPayBtn: string;
  paymentSuccessToast: string;
  paymentFailedToast: string;
  simulateFailureToggle: string;
  receiptPaymentAppLabel: string;
  receiptTxnIdLabel: string;
  receiptBankRefLabel: string;
  receiptStatusStamp: string;
  receiptRepaymentSchedule: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    portalName: 'PeerFund',
    portalSubtitle: 'National Micro-Lending & Small Business Capital Portal',
    officialBadge: 'REPUBLIC OF INDIA • NBFC-P2P COMPLIANT',
    helpline: 'Toll-Free Investor Helpline: 1800-202-7337',
    sliderSectionTitle: 'Smart Budget, Timeline & Micro-Lending Engine',
    sliderSectionSubtitle: 'Inclusive financial portal: Invest as low as ₹500 ($6) or up to ₹50,000 ($600) with guaranteed zero idle cash.',
    investmentAmountLabel: 'Exact Portfolio Allocation Budget',
    investmentAmountDesc: 'Enter any amount from ₹500 to ₹50,000 or pick a micro-preset chip.',
    microBudgetHelp: 'Low-income inclusive micro-investments supported via fractional pools.',
    targetTimelineLabel: 'Target Loan Duration / Timeline',
    targetTimelineDesc: 'Filter borrowers by repayment schedule to match when you need your capital returned.',
    timelineAll: 'All Timelines',
    timeline1M: '1 Month (Fast Turn)',
    timeline3M: '3 Months (Quarterly)',
    timeline6M: '6 Months (Mid-Term)',
    timeline12M: '12 Months (1 Year)',
    timeline24M: '24 Months (2 Years)',
    lockBalanceLabel: 'Lock Specific Portfolio Balance',
    lockBalanceDesc: 'Auto-allocates 100% of your exact budget across 3–5 safe borrowers to eliminate uninvested cash.',
    lockBalanceActiveNotice: '100% Capital Fully Deployed • ₹0 Idle / Uninvested Cash',
    riskSafetyLabel: 'Safety & Risk Level',
    riskSafetyDesc: '1 = Maximum Capital Safety (Low Risk) to 10 = Maximum Return (Higher Risk)',
    riskLevelSafe: 'Level 1-3: Maximum Safety (Focus on High CIBIL & Daily Essentials)',
    riskLevelBalanced: 'Level 4-7: Balanced Return (Well-Established Local Businesses)',
    riskLevelHighYield: 'Level 8-10: High Return (Rapid Expansion & Logistics)',
    expectedAnnualProfitLabel: 'Expected Profit per Year',
    safetyScoreLabel: 'Capital Protection Score',
    smartBasketTitle: 'Automatic 5-Way Capital Protection Split',
    smartBasketSubtitle: 'Your exact budget is intelligently split across top verified borrowers so no single borrower holds your capital.',
    borrowersListTitle: 'Active Micro-Borrowers (Pune & PCMC Region)',
    borrowersListSubtitle: 'Ranked dynamically by budget fit, target timeline, and creditworthiness.',
    match100Badge: '100% Budget & Timeline Match',
    timelineBadge: 'Duration',
    fractionalSliceBadge: 'Fractional Micro-Pool',
    cibilScoreLabel: 'CIBIL Credit Score',
    loanPurposeLabel: 'Loan Purpose',
    pastRecordLabel: 'Past Payment Record',
    viewDetailsBtn: 'View Business Details',
    fundPortfolioBtn: 'Fund Selected Portfolio',
    compareWithFdBtn: 'Compare with Bank FD (6%)',
    voiceMicBtn: 'Voice Assistant',
    voiceModalTitle: 'PeerFund Voice Assistant',
    voiceModalSubtitle: 'Speak naturally to adjust your budget amount, duration, or safety level.',
    voiceListening: 'Listening to your voice...',
    voiceTapToSpeak: 'Click the microphone to start speaking',
    voiceCommandsHelp: [
      'Say "Invest 500" or "Set budget to 5000"',
      'Say "1 Month", "6 Months", or "12 Months"',
      'Say "Safe mode" or "High return"',
      'Say "Lock portfolio" or "Fund portfolio"',
    ],
    borrowerModalTitle: 'Verified Business & Credit Profile',
    borrowerModalSubtitle: 'Audited government registrations, CIBIL credit score, and financial background.',
    cibilHistoryTitle: '4-Month CIBIL Score History',
    loanDetailsTitle: 'Loan & Business Details',
    repaymentHistoryTitle: 'Recent Loan Repayment Record',
    recommendationReasonTitle: 'Why This Business Was Recommended',
    verifiedBadgesTitle: 'Government Verified Documents',
    profitModalTitle: '1-Year Profit Comparison: PeerFund vs Bank Fixed Deposit',
    profitModalSubtitle: 'See how lending directly to productive local businesses compares with traditional savings.',
    profitComparisonTitle: 'Estimated Return on Your Capital',
    peerFundYieldLabel: 'PeerFund Expected Profit',
    bankFdYieldLabel: 'Standard Bank Fixed Deposit (~6.0%)',
    extraProfitLabel: 'Extra Annual Earnings',
    receiptModalTitle: 'Official PeerFund Transaction Receipt',
    receiptModalSubtitle: 'Capital successfully deposited into escrow and allocated to verified businesses.',
    receiptRefLabel: 'Transaction Reference ID',
    receiptDateLabel: 'Date of Issue',
    receiptTimeLabel: 'Time of Execution',
    receiptStatusLabel: 'Escrow Status',
    receiptTotalLabel: 'Total Capital Committed',
    receiptTableColBorrower: 'Borrower & Business',
    receiptTableColPurpose: 'Stated Purpose',
    receiptTableColCibil: 'CIBIL',
    receiptTableColAllocated: 'Allocated Amount',
    receiptTableColShare: 'Portfolio Share',
    receiptPrintBtn: 'Print / Save Official Receipt',
    receiptCloseBtn: 'Close & Return to Dashboard',
    officialStampText: 'SECURED BY ESCROW • VERIFIED',
    footerHelplineText: 'Customer Care & Grievance Cell: grievance@peerfund.org.in | Working Hours: 9:30 AM - 6:00 PM IST',
    footerNbfcNotice: 'PeerFund acts as a digital matching platform for Peer-to-Peer lending. All transactions are securely handled through scheduled commercial bank escrow accounts.',

    // Dual-Role Toggle
    roleLender: 'I Want to Invest (Lender Mode)',
    roleBorrower: 'I Need a Loan (Borrower Mode)',

    // Borrower Application Flow
    borrowerPortalTitle: 'Micro-Enterprise & Small Business Loan Application',
    borrowerPortalSubtitle: 'Apply for fast, transparent P2P trade capital directly from verified community lenders with zero collateral.',
    applicantNameLabel: 'Applicant / Entrepreneur Name',
    businessNameLabel: 'Enterprise / Business Name',
    businessCategoryLabel: 'Business Category',
    businessLocationLabel: 'Location / City (Pune & PCMC)',
    monthlyRevenueLabel: 'Monthly Business Revenue',
    requestedAmountLabel: 'Requested Micro-Loan Amount',
    repaymentTenureLabel: 'Repayment Tenure',
    repaymentFreqLabel: 'Repayment Frequency',
    freqDaily: 'Daily Micro-Installment',
    freqWeekly: 'Weekly Installment',
    freqMonthly: 'Monthly EMI (Standard)',
    preAssessmentTitle: 'Instant Credit Pre-Assessment Engine',
    preAssessmentSubtitle: 'Algorithmic instant pre-qualification based on verified business cash flows and credit eligibility.',
    preAssessmentCibil: 'Pre-Approved CIBIL Range',
    preAssessmentRate: 'Indicative Interest Rate',
    preAssessmentEmi: 'Estimated Installment',
    preAssessmentDisbursal: 'Estimated Disbursal Speed',
    submitLoanBtn: 'Submit Loan Application to P2P Escrow',
    loanApprovedBadge: 'INSTANT PRE-APPROVAL CONFIRMED',
    loanSubmittedSuccess: 'Application successfully pre-approved and listed for community micro-investor funding.',
    applicationSuccessTitle: 'Micro-Loan Pre-Approval Issued',
    applicationSuccessDesc: 'Your loan application has passed instant risk assessment and is secured via P2P Escrow for community disbursement.',

    // Dual-Party Receipt Strings
    receiptDualPartyTitle: 'PeerFund Dual-Party Micro-Loan Contract & Receipt',
    receiptSubHeader: 'National Micro-Lending Portal • RBI NBFC-P2P Master Direction Compliant',
    receiptLenderSection: '1. Investor / Lender Information',
    receiptBorrowerSection: '2. Borrower / Enterprise Allocation Breakdown',
    receiptLenderNameLabel: 'Lender / Investor Name',
    receiptContractHashLabel: 'Smart Escrow Contract Hash',
    receiptEscrowBankLabel: 'Escrow Partner Bank',
    receiptColTenure: 'Tenure',
    receiptColEmi: 'Monthly EMI',
    receiptColLocation: 'Category & Location',
    receiptDownloadPdfBtn: 'Print / Download PDF Receipt',
    receiptSaveTxtBtn: 'Download Text Copy',
    receiptZeroCashDragBadge: '100% Capital Deployed • Zero Idle Cash Guarantee',
    receiptTrusteeAuthenticated: 'Verified & Authenticated by Scheduled Commercial Bank Escrow Trustee',
    receiptRegulatoryNote: 'Official transaction receipt generated under RBI NBFC-P2P Master Directions. Capital is securely routed through designated bank escrow accounts.',

    // Payment Gateway Translations
    paymentModalTitle: 'Secure Payment Gateway & Escrow Deposit',
    paymentModalSubtitle: 'Select your preferred payment method to deposit capital into RBI-compliant escrow.',
    paymentSummaryTitle: 'Payment Summary & Escrow Order',
    paymentAmountLabel: 'Amount to Escrow',
    convenienceFeeLabel: 'Convenience Fee',
    freeZeroFee: '₹0 (100% Free / Waived)',
    selectedRoleLabel: 'Participant Role',
    orderIdLabel: 'Order Reference ID',
    paymentMethodUpi: 'UPI Apps (Instant)',
    paymentMethodNetBanking: 'NetBanking (NEFT/RTGS)',
    paymentMethodCard: 'Debit / Credit Card',
    upiIdPlaceholder: 'Enter UPI ID (e.g. 9876543210@upi or name@okaxis)',
    testUpiAutofillBtn: 'Autofill Test UPI',
    selectBankLabel: 'Select Escrow Partner Bank',
    cardHolderName: 'Cardholder Name',
    cardNumber: 'Card Number',
    cardExpiry: 'Valid Thru',
    cardCvv: 'CVV',
    testCardAutofillBtn: 'Autofill Test Card (Instant Pass)',
    authorizePaymentBtn: 'Authorize & Escrow Payment',
    authorizingBankDelay: 'Simulating 2s Bank Escrow Authorization...',
    proceedToPayBtn: 'Proceed to Pay / Escrow',
    paymentSuccessToast: 'Payment Verified & Escrowed Successfully!',
    paymentFailedToast: 'Bank Authorization Failed. Please try another method.',
    simulateFailureToggle: 'Simulate Bank Authorization Failure (Testing)',
    receiptPaymentAppLabel: 'Payment App Used',
    receiptTxnIdLabel: 'Transaction ID',
    receiptBankRefLabel: 'Bank Ref / UTR No.',
    receiptStatusStamp: 'VERIFIED & ESCROWED',
    receiptRepaymentSchedule: 'Repayment Schedule',
  },
  hi: {
    portalName: 'पीयरफंड (PeerFund)',
    portalSubtitle: 'राष्ट्रीय सूक्ष्म-ऋण एवं लघु उद्योग पूंजी पोर्टल',
    officialBadge: 'भारत गणराज्य • आरबीआई एनबीएफसी-पी2पी दिशानिर्देश',
    helpline: 'टोल-फ्री निवेशक हेल्पलाइन: 1800-202-7337',
    sliderSectionTitle: 'स्मार्ट बजट, समय-सीमा एवं सूक्ष्म-ऋण इंजन',
    sliderSectionSubtitle: 'समावेशी वित्तीय पोर्टल: न्यूनतम ₹500 से ₹50,000 तक निवेश करें, 100% राशि का तुरंत सुरक्षित आवंटन।',
    investmentAmountLabel: 'सटीक पोर्टफोलियो आवंटन बजट',
    investmentAmountDesc: '₹500 से ₹50,000 के बीच कोई भी राशि दर्ज करें या नीचे दिए गए चिप्स चुनें।',
    microBudgetHelp: 'कम आय वाले छोटे निवेशकों के लिए आंशिक सूक्ष्म-ऋण (Fractional Pools) समर्थित।',
    targetTimelineLabel: 'ऋण अवधि / समय-सीमा (Timeline)',
    targetTimelineDesc: 'अपनी सुविधानुसार समय चुनें जब आपको पूंजी वापस चाहिए।',
    timelineAll: 'सभी अवधियां',
    timeline1M: '1 माह (त्वरित वापसी)',
    timeline3M: '3 माह (तिमाही)',
    timeline6M: '6 माह (मध्यम)',
    timeline12M: '12 माह (1 वर्ष)',
    timeline24M: '24 माह (2 वर्ष)',
    lockBalanceLabel: 'सटीक पोर्टफोलियो बैलेंस लॉक करें (Lock Balance)',
    lockBalanceDesc: 'आपकी चुनी हुई पूरी राशि को 3 से 5 सुरक्षित व्यापारियों में 100% बांटता है ताकि एक रुपया भी बेकार न रहे।',
    lockBalanceActiveNotice: '100% पूंजी पूरी तरह आवंटित • ₹0 अप्रयुक्त राशि (Zero Idle Cash)',
    riskSafetyLabel: 'सुरक्षा एवं जोखिम स्तर',
    riskSafetyDesc: '1 = अधिकतम पूंजी सुरक्षा (कम जोखिम) से 10 = अधिकतम लाभ (उच्च जोखिम)',
    riskLevelSafe: 'स्तर 1-3: अधिकतम सुरक्षा (उच्च सिबिल और आवश्यक दैनिक किराना)',
    riskLevelBalanced: 'स्तर 4-7: संतुलित लाभ (पुराने स्थापित स्थानीय व्यवसाय)',
    riskLevelHighYield: 'स्तर 8-10: उच्च लाभ (परिवहन और औद्योगिक विस्तार)',
    expectedAnnualProfitLabel: 'अपेक्षित वार्षिक लाभ',
    safetyScoreLabel: 'पूंजी सुरक्षा स्कोर',
    smartBasketTitle: 'स्वचालित 5-तरफा पूंजी सुरक्षा विभाजन',
    smartBasketSubtitle: 'आपका पूरा बजट शीर्ष व्यापारियों में सुरक्षित बंट जाता है ताकि जोखिम न्यूनतम रहे।',
    borrowersListTitle: 'सक्रिय ऋण आवेदक (पुणे एवं पिंपरी-चिंचवड)',
    borrowersListSubtitle: 'बजट, समय-सीमा और क्रेडिट स्कोर के आधार पर प्राथमिकता से प्रदर्शित।',
    match100Badge: '100% बजट एवं समय-सीमा मेल (Perfect Match)',
    timelineBadge: 'अवधि',
    fractionalSliceBadge: 'आंशिक सूक्ष्म-पूल',
    cibilScoreLabel: 'सिबिल (CIBIL) क्रेडिट स्कोर',
    loanPurposeLabel: 'ऋण का उद्देश्य',
    pastRecordLabel: 'पिछला भुगतान रिकॉर्ड',
    viewDetailsBtn: 'व्यवसाय विवरण देखें',
    fundPortfolioBtn: 'चयनित पोर्टफोलियो को फंड करें',
    compareWithFdBtn: 'बैंक एफडी (6%) से तुलना करें',
    voiceMicBtn: 'आवाज सहायक (Voice)',
    voiceModalTitle: 'पीयरफंड आवाज सहायक',
    voiceModalSubtitle: 'बजट या समय-सीमा बदलने के लिए बोलें।',
    voiceListening: 'आपकी आवाज सुनी जा रही है...',
    voiceTapToSpeak: 'बोलने के लिए माइक पर क्लिक करें',
    voiceCommandsHelp: [
      '"500 निवेश करो" या "बजट 5000 सेट करो" बोलें',
      '"1 महीना", "6 महीना" या "12 महीना" बोलें',
      '"सुरक्षित मोड" या "ज्यादा मुनाफा" बोलें',
      '"पोर्टफोलियो फंड करो" बोलें',
    ],
    borrowerModalTitle: 'सत्यापित व्यवसाय एवं क्रेडिट प्रोफ़ाइल',
    borrowerModalSubtitle: 'सरकारी पंजीकरण, सिबिल स्कोर और वित्तीय पृष्ठभूमि का विवरण।',
    cibilHistoryTitle: '4-महीने का सिबिल स्कोर इतिहास',
    loanDetailsTitle: 'ऋण एवं व्यवसाय विवरण',
    repaymentHistoryTitle: 'हालिया ऋण चुकौती रिकॉर्ड',
    recommendationReasonTitle: 'इस व्यवसाय की सिफारिश क्यों की गई',
    verifiedBadgesTitle: 'सरकारी सत्यापित दस्तावेज',
    profitModalTitle: '1-वर्षीय लाभ तुलना: पीयरफंड बनाम बैंक फिक्स्ड डिपॉजिट',
    profitModalSubtitle: 'देखें कि स्थानीय व्यवसायों को सीधे ऋण देने पर बैंक एफडी की तुलना में कितना अधिक लाभ मिलता है।',
    profitComparisonTitle: 'आपकी पूंजी पर अनुमानित रिटर्न',
    peerFundYieldLabel: 'पीयरफंड अनुमानित लाभ',
    bankFdYieldLabel: 'सामान्य बैंक एफडी (~6.0%)',
    extraProfitLabel: 'अतिरिक्त वार्षिक कमाई',
    receiptModalTitle: 'आधिकारिक पीयरफंड लेनदेन रसीद',
    receiptModalSubtitle: 'राशि बैंक एस्क्रो में सुरक्षित जमा की गई और सत्यापित व्यवसायों को आवंटित की गई।',
    receiptRefLabel: 'लेनदेन संदर्भ संख्या (Ref ID)',
    receiptDateLabel: 'जारी करने की तिथि',
    receiptTimeLabel: 'समय',
    receiptStatusLabel: 'एस्क्रो स्थिति',
    receiptTotalLabel: 'कुल स्वीकृत पूंजी',
    receiptTableColBorrower: 'उधारकर्ता एवं व्यवसाय',
    receiptTableColPurpose: 'ऋण उद्देश्य',
    receiptTableColCibil: 'सिबिल',
    receiptTableColAllocated: 'आवंटित राशि',
    receiptTableColShare: 'हिस्सा (%)',
    receiptPrintBtn: 'आधिकारिक रसीद प्रिंट / सहेजें',
    receiptCloseBtn: 'बंद करें एवं पोर्टल पर लौटें',
    officialStampText: 'एस्क्रो द्वारा सुरक्षित • सत्यापित',
    footerHelplineText: 'ग्राहक सहायता एवं शिकायत निवारण: grievance@peerfund.org.in | समय: सुबह 9:30 से शाम 6:00 तक',
    footerNbfcNotice: 'पीयरफंड पीयर-टू-पीयर लेंडिंग मंच के रूप में कार्य करता है। सभी लेनदेन अनुसूचित वाणिज्यिक बैंक एस्क्रो खातों के माध्यम से सुरक्षित होते हैं।',

    // Dual-Role Toggle
    roleLender: 'मैं निवेश करना चाहता हूँ (ऋणदाता मोड)',
    roleBorrower: 'मुझे ऋण चाहिए (उधारकर्ता मोड)',

    // Borrower Application Flow
    borrowerPortalTitle: 'सूक्ष्म-उद्यमी एवं लघु उद्योग ऋण आवेदन',
    borrowerPortalSubtitle: 'सत्यापित सामुदायिक निवेशकों से बिना किसी गारंटी के त्वरित, पारदर्शी व्यापारिक पूंजी सीधे प्राप्त करें।',
    applicantNameLabel: 'आवेदक / उद्यमी का नाम',
    businessNameLabel: 'व्यापार / उद्यम का नाम',
    businessCategoryLabel: 'व्यापार श्रेणी',
    businessLocationLabel: 'स्थान / शहर (पुणे एवं पिंपरी-चिंचवड)',
    monthlyRevenueLabel: 'मासिक व्यावसायिक राजस्व (Revenue)',
    requestedAmountLabel: 'वांछित सूक्ष्म-ऋण राशि',
    repaymentTenureLabel: 'पुनर्भुगतान अवधि (Tenure)',
    repaymentFreqLabel: 'भुगतान आवृत्ति (Frequency)',
    freqDaily: 'दैनिक सूक्ष्म किश्त',
    freqWeekly: 'साप्ताहिक किश्त',
    freqMonthly: 'मासिक ईएमआई (EMI)',
    preAssessmentTitle: 'त्वरित क्रेडिट पूर्व-मूल्यांकन इंजन',
    preAssessmentSubtitle: 'नकदी प्रवाह एवं क्रेडिट पात्रता पर आधारित त्वरित स्वचालित पूर्व-स्वीकृति।',
    preAssessmentCibil: 'पूर्व-स्वीकृत सिबिल (CIBIL) सीमा',
    preAssessmentRate: 'संकेतात्मक वार्षिक ब्याज दर',
    preAssessmentEmi: 'अनुमानित किश्त राशि',
    preAssessmentDisbursal: 'अनुमानित वितरण गति',
    submitLoanBtn: 'एस्क्रो में ऋण आवेदन जमा करें',
    loanApprovedBadge: 'त्वरित पूर्व-स्वीकृति पुष्ट',
    loanSubmittedSuccess: 'आपका आवेदन पूर्व-स्वीकृत हो गया है और सामुदायिक निवेशकों के लिए लिस्ट कर दिया गया है।',
    applicationSuccessTitle: 'सूक्ष्म-ऋण पूर्व-स्वीकृति पत्र जारी',
    applicationSuccessDesc: 'आपका ऋण आवेदन त्वरित जोखिम मूल्यांकन पास कर चुका है और सामुदायिक वितरण हेतु सुरक्षित किया गया है।',

    // Dual-Party Receipt Strings
    receiptDualPartyTitle: 'पीयरफंड द्विपक्षीय सूक्ष्म-ऋण अनुबंध एवं रसीद',
    receiptSubHeader: 'राष्ट्रीय सूक्ष्म-ऋण पोर्टल • आरबीआई एनबीएफसी-पी2पी दिशानिर्देश अनुपालित',
    receiptLenderSection: '१. निवेशक / ऋणदाता विवरण',
    receiptBorrowerSection: '२. लाभार्थी / उधारकर्ता पूंजी आवंटन विवरण',
    receiptLenderNameLabel: 'ऋणदाता / निवेशक का नाम',
    receiptContractHashLabel: 'स्मार्ट एस्क्रो अनुबंध हैश',
    receiptEscrowBankLabel: 'एस्क्रो पार्टनर बैंक',
    receiptColTenure: 'अवधि',
    receiptColEmi: 'मासिक ईएमआई',
    receiptColLocation: 'श्रेणी एवं स्थान',
    receiptDownloadPdfBtn: 'प्रिंट / पीडीएफ रसीद डाउनलोड करें',
    receiptSaveTxtBtn: 'टेक्स्ट फाइल सहेजें',
    receiptZeroCashDragBadge: '१००% पूंजी आवंटित • शून्य अप्रयुक्त नकद गारंटी',
    receiptTrusteeAuthenticated: 'अनुसूचित वाणिज्यिक बैंक एस्क्रो ट्रस्टी द्वारा सत्यापित एवं प्रमाणित',
    receiptRegulatoryNote: 'आरबीआई एनबीएफसी-पी2पी मास्टर निर्देशों के तहत आधिकारिक डिजिटल रसीद। पूंजी नामित बैंक एस्क्रो खातों के माध्यम से सुरक्षित है।',

    // Payment Gateway Translations
    paymentModalTitle: 'सुरक्षित भुगतान गेटवे एवं एस्क्रो जमा',
    paymentModalSubtitle: 'आरबीआई-अनुपालित बैंक एस्क्रो में पूंजी जमा करने हेतु भुगतान विकल्प चुनें।',
    paymentSummaryTitle: 'भुगतान सारांश एवं एस्क्रो ऑर्डर',
    paymentAmountLabel: 'एस्क्रो राशि',
    convenienceFeeLabel: 'सुविधा शुल्क (Fee)',
    freeZeroFee: '₹० (१००% निःशुल्क / छूट)',
    selectedRoleLabel: 'भागीदार भूमिका (Role)',
    orderIdLabel: 'ऑर्डर संदर्भ आईडी (Order ID)',
    paymentMethodUpi: 'यूपीआई ऐप्स (तत्काल)',
    paymentMethodNetBanking: 'नेटबैंकिंग (NEFT/RTGS)',
    paymentMethodCard: 'डेबिट / क्रेडिट कार्ड',
    upiIdPlaceholder: 'यूपीआई आईडी दर्ज करें (उदा. 9876543210@upi)',
    testUpiAutofillBtn: 'टेस्ट यूपीआई ऑटोफिल',
    selectBankLabel: 'एस्क्रो पार्टनर बैंक चुनें',
    cardHolderName: 'कार्डधारक का नाम',
    cardNumber: 'कार्ड संख्या',
    cardExpiry: 'वैधता (MM/YY)',
    cardCvv: 'सीवीवी (CVV)',
    testCardAutofillBtn: 'टेस्ट कार्ड ऑटोफिल (त्वरित स्वीकृति)',
    authorizePaymentBtn: 'भुगतान अधिकृत करें एवं एस्क्रो जमा करें',
    authorizingBankDelay: '२-सेकंड बैंक एस्क्रो प्राधिकरण अनुकरण जारी...',
    proceedToPayBtn: 'भुगतान एवं एस्क्रो हेतु आगे बढ़ें',
    paymentSuccessToast: 'भुगतान सत्यापित एवं एस्क्रो सुरक्षित!',
    paymentFailedToast: 'बैंक प्राधिकरण विफल। कृपया अन्य माध्यम चुनें।',
    simulateFailureToggle: 'बैंक प्राधिकरण विफलता का अनुकरण करें (परीक्षण)',
    receiptPaymentAppLabel: 'प्रयुक्त भुगतान ऐप',
    receiptTxnIdLabel: 'लेनदेन आईडी (Transaction ID)',
    receiptBankRefLabel: 'बैंक संदर्भ / यूटीआर संख्या',
    receiptStatusStamp: 'सत्यापित एवं एस्क्रो सुरक्षित',
    receiptRepaymentSchedule: 'पुनर्भुगतान अनुसूची',
  },
  mr: {
    portalName: 'पिअरफंड (PeerFund)',
    portalSubtitle: 'राष्ट्रीय सूक्ष्म-कर्ज व लघु व्यवसाय भांडवल पोर्टल',
    officialBadge: 'भारतीय प्रजासत्ताक • आरबीआय एनबीएफसी-पी२पी नियमावली',
    helpline: 'टोल-फ्री गुंतवणूकदार हेल्पलाईन: 1800-202-7337',
    sliderSectionTitle: 'स्मार्ट बजेट, कालावधी व सूक्ष्म-कर्ज इंजिन',
    sliderSectionSubtitle: 'समावेशक आर्थिक व्यासपीठ: अगदी ₹५०० पासून ₹५०,००० पर्यंत गुंतवणूक करा, १००% रकमेची खात्रीशीर विभागणी.',
    investmentAmountLabel: 'अचूक पोर्टफोलिओ वाटप बजेट',
    investmentAmountDesc: '₹५०० ते ₹५०,००० दरम्यान रक्कम टाका किंवा खालील चिप्स निवडा.',
    microBudgetHelp: 'अल्प उत्पन्न असणाऱ्यांसाठी सूक्ष्म-गुंतवणूक (Fractional Pools) उपलब्ध.',
    targetTimelineLabel: 'कर्ज परतफेड कालावधी (Timeline)',
    targetTimelineDesc: 'आपल्या सोयीनुसार कालावधी निवडा जेणेकरून रक्कम वेळेत परत मिळेल.',
    timelineAll: 'सर्व कालावधी',
    timeline1M: '१ महिना (अति-जलद परतफेड)',
    timeline3M: '३ महिने (तिमाही)',
    timeline6M: '६ महिने (मध्यम)',
    timeline12M: '१२ महिने (१ वर्ष)',
    timeline24M: '२४ महिने (२ वर्षे)',
    lockBalanceLabel: 'अचूक पोर्टफोलिओ शिल्लक लॉक करा (Lock Balance)',
    lockBalanceDesc: 'आपले १००% बजेट ३ ते ५ सुरक्षित व्यावसायिकांमध्ये विभागते, जेणेकरून एकही रुपया पडून राहत नाही.',
    lockBalanceActiveNotice: '१००% भांडवल पूर्णपणे वाटप • ₹० शिल्लक पडून (Zero Idle Cash)',
    riskSafetyLabel: 'सुरक्षितता व जोखीम स्तर',
    riskSafetyDesc: '१ = सर्वोच्च भांडवल संरक्षण (कमी जोखीम) ते १० = सर्वोच्च परतावा (जास्त जोखीम)',
    riskLevelSafe: 'स्तर १-३: सर्वोच्च सुरक्षितता (उत्कृष्ट सिबिल आणि दैनंदिन किराणा/दूध)',
    riskLevelBalanced: 'स्तर ४-७: संतुलित परतावा (स्थापित स्थानिक व्यवसाय)',
    riskLevelHighYield: 'स्तर ८-१०: उच्च परतावा (वाहतूक व औद्योगिक व्यवसाय)',
    expectedAnnualProfitLabel: 'अपेक्षित वार्षिक नफा',
    safetyScoreLabel: 'भांडवल संरक्षण स्कोअर',
    smartBasketTitle: 'स्वयंचलित ५-भागी भांडवल संरक्षण विभागणी',
    smartBasketSubtitle: 'आपले अचूक बजेट सर्वोत्तम व्यावसायिकांमध्ये सुरक्षित विभागले जाते.',
    borrowersListTitle: 'सक्रिय कर्ज मागणीदार (पुणे व पिंपरी-चिंचवड परिसर)',
    borrowersListSubtitle: 'बजेट आणि कालावधीच्या अचूक मेळानुसार अग्रक्रमाने दर्शविले आहेत.',
    match100Badge: '१००% बजेट व कालावधी जुळणी (Perfect Match)',
    timelineBadge: 'कालावधी',
    fractionalSliceBadge: 'सूक्ष्म-पूल',
    cibilScoreLabel: 'सिबिल (CIBIL) क्रेडिट स्कोअर',
    loanPurposeLabel: 'कर्जाचे कारण',
    pastRecordLabel: 'मागील परतफेड नोंद',
    viewDetailsBtn: 'व्यवसाय माहिती पहा',
    fundPortfolioBtn: 'निवडलेल्या पोर्टफोलिओला निधी द्या',
    compareWithFdBtn: 'बँक एफडीशी तुलना करा (६%)',
    voiceMicBtn: 'आवाज सहाय्यक (Voice)',
    voiceModalTitle: 'पिअरफंड आवाज सहाय्यक',
    voiceModalSubtitle: 'बजेट किंवा कालावधी बदलण्यासाठी बोला.',
    voiceListening: 'आपला आवाज ऐकत आहे...',
    voiceTapToSpeak: 'बोलण्यासाठी माइक बटणावर क्लिक करा',
    voiceCommandsHelp: [
      '"५०० गुंतवा" किंवा "बजेट ५००० करा" बोला',
      '"१ महिना", "६ महिने" किंवा "१२ महिने" बोला',
      '"सुरक्षित मोड" किंवा "जास्त नफा" बोला',
      '"पोर्टफोलिओ फंड करा" बोला',
    ],
    borrowerModalTitle: 'तपासलेला व्यवसाय व क्रेडिट तपशील',
    borrowerModalSubtitle: 'शासकीय नोंदणी, सिबिल स्कोअर व आर्थिक पार्श्वभूमी.',
    cibilHistoryTitle: '४ महिन्यांचा सिबिल स्कोअर प्रवास',
    loanDetailsTitle: 'कर्ज व व्यवसाय माहिती',
    repaymentHistoryTitle: 'अलीकडील कर्ज परतफेड नोंद',
    recommendationReasonTitle: 'या व्यवसायाची निवड का केली',
    verifiedBadgesTitle: 'शासकीय प्रमाणित कागदपत्रे',
    profitModalTitle: '१ वर्षाची नफा तुलना: पिअरफंड विरुद्ध बँक मुदत ठेव (FD)',
    profitModalSubtitle: 'स्थानिक व्यवसायांना थेट कर्ज देऊन पारंपरिक बँक एफडीपेक्षा किती जास्त नफा मिळतो ते पहा.',
    profitComparisonTitle: 'आपल्या भांडवलावरील अंदाजित परतावा',
    peerFundYieldLabel: 'पिअरफंड अपेक्षित नफा',
    bankFdYieldLabel: 'प्रमाणित बँक एफडी (~६.०%)',
    extraProfitLabel: 'अतिरिक्त वार्षिक कमाई',
    receiptModalTitle: 'अधिकृत पिअरफंड व्यवहार पावती',
    receiptModalSubtitle: 'रक्कम बँक एस्क्रो खात्यात सुरक्षित जमा झाली असून ५ तपासलेल्या व्यावसायिकांना वाटप केली गेली आहे.',
    receiptRefLabel: 'व्यवहार संदर्भ क्रमांक (Ref ID)',
    receiptDateLabel: 'जारी तारीख',
    receiptTimeLabel: 'वेळ',
    receiptStatusLabel: 'एस्क्रो स्थिती',
    receiptTotalLabel: 'एकूण मंजूर भांडवल',
    receiptTableColBorrower: 'कर्जदार व व्यवसाय',
    receiptTableColPurpose: 'कर्जाचा उद्देश',
    receiptTableColCibil: 'सिबिल',
    receiptTableColAllocated: 'वाटप रक्कम',
    receiptTableColShare: 'वाटा (%)',
    receiptPrintBtn: 'अधिकृत पावती प्रिंट / सेव्ह करा',
    receiptCloseBtn: 'बंद करा व मुख्य पानावर जा',
    officialStampText: 'एस्क्रो द्वारे सुरक्षित • प्रमाणित',
    footerHelplineText: 'ग्राहक सेवा व तक्रार निवारण कक्ष: grievance@peerfund.org.in | वेळ: सकाळी ९:३० ते संध्याकाळी ६:००',
    footerNbfcNotice: 'पिअरफंड हे पी२पी कर्ज मंच म्हणून कार्य करते. सर्व आर्थिक व्यवहार अधिकृत व्यावसायिक बँक एस्क्रो खात्यांद्वारे सुरक्षित केले जातात.',

    // Dual-Role Toggle
    roleLender: 'मला गुंतवणूक करायची आहे (कर्जदाता मोड)',
    roleBorrower: 'मला कर्ज हवे आहे (कर्जदार मोड)',

    // Borrower Application Flow
    borrowerPortalTitle: 'सूक्ष्म-उद्योजक व लघु व्यवसाय कर्ज अर्ज',
    borrowerPortalSubtitle: 'स्थानिक गुंतवणूकदारांकडून थेट जलद व पारदर्शक विनातारण व्यापार भांडवल मिळवा.',
    applicantNameLabel: 'अर्जदार / व्यावसायिकाचे नाव',
    businessNameLabel: 'व्यवसाय / पेढीचे नाव',
    businessCategoryLabel: 'व्यवसाय प्रकार',
    businessLocationLabel: 'ठिकाण / शहर (पुणे व पिंपरी-चिंचवड)',
    monthlyRevenueLabel: 'मासिक व्यावसायिक उलाढाल',
    requestedAmountLabel: 'हवी असलेली सूक्ष्म-कर्ज रक्कम',
    repaymentTenureLabel: 'परतफेडीचा कालावधी',
    repaymentFreqLabel: 'हप्ता परतफेड वारंवारता',
    freqDaily: 'दैनंदिन सूक्ष्म हप्ता',
    freqWeekly: 'साप्ताहिक हप्ता',
    freqMonthly: 'मासिक ईएमआय (EMI)',
    preAssessmentTitle: 'त्वरित पत पूर्व-मूल्यांकन इंजिन',
    preAssessmentSubtitle: 'रोख प्रवाह व क्रेडिट पात्रतेवर आधारित त्वरित स्वयंचलित पूर्व-मंजुरी.',
    preAssessmentCibil: 'पूर्व-मंजूर सिबिल (CIBIL) श्रेणी',
    preAssessmentRate: 'अंदाजे वार्षिक व्याजदर',
    preAssessmentEmi: 'अंदाजे हप्ता रक्कम',
    preAssessmentDisbursal: 'अंदाजे कर्ज वाटप वेळ',
    submitLoanBtn: 'एस्क्रो खात्यात कर्ज अर्ज सादर करा',
    loanApprovedBadge: 'त्वरित पूर्व-मंजुरी निश्चित',
    loanSubmittedSuccess: 'तुमचा अर्ज पूर्व-मंजूर झाला असून गुंतवणूकदारांसाठी उपलब्ध करण्यात आला आहे.',
    applicationSuccessTitle: 'सूक्ष्म-कर्ज पूर्व-मंजुरी पत्र जारी',
    applicationSuccessDesc: 'आपला कर्ज अर्ज त्वरित पत पडताळणी उत्तीर्ण झाला असून वितरणासाठी एस्क्रो खात्यात सुरक्षित केला गेला आहे.',

    // Dual-Party Receipt Strings
    receiptDualPartyTitle: 'पिअरफंड द्विपक्षीय सूक्ष्म-कर्ज करार व पावती',
    receiptSubHeader: 'राष्ट्रीय सूक्ष्म-कर्ज पोर्टल • आरबीआय एनबीएफसी-पी२पी नियमावलीनुसार',
    receiptLenderSection: '१. गुंतवणूकदार / कर्जदाता तपशील',
    receiptBorrowerSection: '२. लाभार्थी / कर्जदार भांडवल वाटप तपशील',
    receiptLenderNameLabel: 'गुंतवणूकदार / कर्जदात्याचे नाव',
    receiptContractHashLabel: 'स्मार्ट एस्क्रो करार हॅश',
    receiptEscrowBankLabel: 'एस्क्रो भागीदार बँक',
    receiptColTenure: 'कालावधी',
    receiptColEmi: 'मासिक ईएमआय',
    receiptColLocation: 'प्रकार व ठिकाण',
    receiptDownloadPdfBtn: 'प्रिंट / पीडीएफ पावती डाउनलोड करा',
    receiptSaveTxtBtn: 'मजकूर फाइल जतन करा',
    receiptZeroCashDragBadge: '१००% भांडवल वाटप • शून्य निष्क्रीय रक्कम हमी',
    receiptTrusteeAuthenticated: 'अनुसूचित व्यावसायिक बँक एस्क्रो ट्रस्टीद्वारे पडताळणी व प्रमाणित',
    receiptRegulatoryNote: 'आरबीआय एनबीएफसी-पी२पी मार्गदर्शक तत्त्वांतर्गत अधिकृत डिजिटल पावती. सर्व भांडवल बँक एस्क्रो खात्यांद्वारे सुरक्षित आहे.',

    // Payment Gateway Translations
    paymentModalTitle: 'सुरक्षित पेमेंट गेटवे व एस्क्रो जमा',
    paymentModalSubtitle: 'आरबीआय-नियमावलीनुसार बँक एस्क्रोमध्ये रक्कम जमा करण्यासाठी पेमेंट पर्याय निवडा.',
    paymentSummaryTitle: 'पेमेंट सारांश व एस्क्रो ऑर्डर',
    paymentAmountLabel: 'एस्क्रो रक्कम',
    convenienceFeeLabel: 'सुविधा शुल्क',
    freeZeroFee: '₹० (१००% मोफत / सवलत)',
    selectedRoleLabel: 'सहभागी भूमिका (Role)',
    orderIdLabel: 'ऑर्डर संदर्भ क्रमांक (Order ID)',
    paymentMethodUpi: 'यूपीआय ॲप्स (त्वरित)',
    paymentMethodNetBanking: 'नेटबँकिंग (NEFT/RTGS)',
    paymentMethodCard: 'डेबिट / क्रेडिट कार्ड',
    upiIdPlaceholder: 'यूपीआय आयडी टाका (उदा. 9876543210@upi)',
    testUpiAutofillBtn: 'टेस्ट यूपीआय ऑटोफिल',
    selectBankLabel: 'एस्क्रो भागीदार बँक निवडा',
    cardHolderName: 'कार्डधारकाचे नाव',
    cardNumber: 'कार्ड क्रमांक',
    cardExpiry: 'वैधता (MM/YY)',
    cardCvv: 'सीव्हीव्ही (CVV)',
    testCardAutofillBtn: 'टेस्ट कार्ड ऑटोफिल (त्वरित मंजुरी)',
    authorizePaymentBtn: 'पेमेंट अधिकृत करा व एस्क्रो खात्यात जमा करा',
    authorizingBankDelay: '२-सेकंद बँक एस्क्रो पडताळणी प्रक्रिया चालू...',
    proceedToPayBtn: 'पेमेंट व एस्क्रोसाठी पुढे जा',
    paymentSuccessToast: 'पेमेंट प्रमाणित व एस्क्रो सुरक्षित!',
    paymentFailedToast: 'बँक पडताळणी अयशस्वी. कृपया दुसरा पर्याय निवडा.',
    simulateFailureToggle: 'बँक पडताळणी अपयशाचे अनुकरण करा (चाचणी)',
    receiptPaymentAppLabel: 'वापरलेले पेमेंट ॲप',
    receiptTxnIdLabel: 'व्यवहार आयडी (Transaction ID)',
    receiptBankRefLabel: 'बँक संदर्भ / युटीआर क्रमांक',
    receiptStatusStamp: 'प्रमाणित व एस्क्रो सुरक्षित',
    receiptRepaymentSchedule: 'परतफेड वेळापत्रक',
  },
};

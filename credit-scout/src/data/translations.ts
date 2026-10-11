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
  },
};

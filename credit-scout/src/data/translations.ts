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
    sliderSectionTitle: 'Step 1: Set Your Investment Preferences',
    sliderSectionSubtitle: 'Select how much you wish to lend and your preferred balance between safety and return.',
    investmentAmountLabel: 'Total Investment Amount',
    investmentAmountDesc: 'Choose an amount between $2,000 and $25,000 to distribute across small businesses.',
    riskSafetyLabel: 'Safety & Risk Level',
    riskSafetyDesc: '1 = Maximum Capital Safety (Low Risk) to 10 = Maximum Return (Higher Risk)',
    riskLevelSafe: 'Level 1-3: Maximum Safety (Focus on High CIBIL & Daily Essentials)',
    riskLevelBalanced: 'Level 4-7: Balanced Return (Well-Established Local Businesses)',
    riskLevelHighYield: 'Level 8-10: High Return (Rapid Expansion & Logistics)',
    expectedAnnualProfitLabel: 'Expected Profit per Year',
    safetyScoreLabel: 'Capital Protection Score',
    smartBasketTitle: 'Automatic 5-Way Capital Protection Split',
    smartBasketSubtitle: 'Your money is automatically divided across 5 reliable businesses so you never rely on just one loan.',
    borrowersListTitle: 'Active Micro-Borrowers (Pune & PCMC Region)',
    borrowersListSubtitle: 'Verified local businesses matching your selected safety and budget criteria.',
    cibilScoreLabel: 'CIBIL Credit Score',
    loanPurposeLabel: 'Loan Purpose',
    pastRecordLabel: 'Past Payment Record',
    viewDetailsBtn: 'View Business Details',
    fundPortfolioBtn: 'Fund Selected Portfolio',
    compareWithFdBtn: 'Compare with Bank FD (6%)',
    voiceMicBtn: 'Voice Assistant',
    voiceModalTitle: 'PeerFund Voice Assistant',
    voiceModalSubtitle: 'Speak naturally to adjust your investment amount or safety level.',
    voiceListening: 'Listening to your voice...',
    voiceTapToSpeak: 'Click the microphone to start speaking',
    voiceCommandsHelp: [
      'Say "Safe mode" or "Low risk" to prioritize safety',
      'Say "High return" or "Aggressive" to increase profit',
      'Say "Invest 10000" or "Set amount to 15000"',
      'Say "Compare with Bank FD" or "Fund portfolio"',
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
    receiptModalSubtitle: 'Capital successfully deposited into escrow and allocated to 5 verified businesses.',
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
    sliderSectionTitle: 'चरण 1: अपनी निवेश प्राथमिकताएं चुनें',
    sliderSectionSubtitle: 'चुनें कि आप कितनी राशि ऋण देना चाहते हैं और सुरक्षा एवं लाभ का क्या अनुपात रखना चाहते हैं।',
    investmentAmountLabel: 'कुल निवेश राशि',
    investmentAmountDesc: 'छोटे व्यवसायों में बांटने के लिए $2,000 से $25,000 के बीच राशि चुनें।',
    riskSafetyLabel: 'सुरक्षा एवं जोखिम स्तर',
    riskSafetyDesc: '1 = अधिकतम पूंजी सुरक्षा (कम जोखिम) से 10 = अधिकतम लाभ (उच्च जोखिम)',
    riskLevelSafe: 'स्तर 1-3: अधिकतम सुरक्षा (उच्च सिबिल और आवश्यक दैनिक किराना)',
    riskLevelBalanced: 'स्तर 4-7: संतुलित लाभ (पुराने स्थापित स्थानीय व्यवसाय)',
    riskLevelHighYield: 'स्तर 8-10: उच्च लाभ (परिवहन और औद्योगिक विस्तार)',
    expectedAnnualProfitLabel: 'अपेक्षित वार्षिक लाभ',
    safetyScoreLabel: 'पूंजी सुरक्षा स्कोर',
    smartBasketTitle: 'स्वचालित 5-तरफा पूंजी सुरक्षा विभाजन',
    smartBasketSubtitle: 'आपकी राशि स्वचालित रूप से 5 भरोसेमंद व्यापारियों में बांट दी जाती है ताकि जोखिम न्यूनतम रहे।',
    borrowersListTitle: 'सक्रिय ऋण आवेदक (पुणे एवं पिंपरी-चिंचवड)',
    borrowersListSubtitle: 'आपकी चुनी हुई सुरक्षा और बजट के अनुसार सत्यापित स्थानीय व्यवसाय।',
    cibilScoreLabel: 'सिबिल (CIBIL) क्रेडिट स्कोर',
    loanPurposeLabel: 'ऋण का उद्देश्य',
    pastRecordLabel: 'पिछला भुगतान रिकॉर्ड',
    viewDetailsBtn: 'व्यवसाय विवरण देखें',
    fundPortfolioBtn: 'चयनित पोर्टफोलियो को फंड करें',
    compareWithFdBtn: 'बैंक एफडी (6%) से तुलना करें',
    voiceMicBtn: 'आवाज सहायक (Voice)',
    voiceModalTitle: 'पीयरफंड आवाज सहायक',
    voiceModalSubtitle: 'राशि या सुरक्षा स्तर बदलने के लिए सामान्य रूप से बोलें।',
    voiceListening: 'आपकी आवाज सुनी जा रही है...',
    voiceTapToSpeak: 'बोलने के लिए माइक पर क्लिक करें',
    voiceCommandsHelp: [
      '"सेफ मोड" या "सुरक्षित" बोलें',
      '"उच्च लाभ" या "ज्यादा मुनाफा" बोलें',
      '"10 हजार निवेश करो" या "15 हजार सेट करो" बोलें',
      '"बैंक एफडी तुलना" या "फंड करो" बोलें',
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
    receiptModalSubtitle: 'राशि बैंक एस्क्रो में सुरक्षित जमा की गई और 5 सत्यापित व्यवसायों को आवंटित की गई।',
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
    sliderSectionTitle: 'टप्पा १: आपली गुंतवणूक प्राधान्ये निवडा',
    sliderSectionSubtitle: 'आपण किती रक्कम कर्ज देऊ इच्छिता आणि सुरक्षितता व परतावा यातील संतुलन निवडा.',
    investmentAmountLabel: 'एकूण गुंतवणूक रक्कम',
    investmentAmountDesc: 'लहान व्यवसायांना मदत करण्यासाठी $2,000 ते $25,000 दरम्यान रक्कम निवडा.',
    riskSafetyLabel: 'सुरक्षितता व जोखीम स्तर',
    riskSafetyDesc: '१ = सर्वोच्च भांडवल संरक्षण (कमी जोखीम) ते १० = सर्वोच्च परतावा (जास्त जोखीम)',
    riskLevelSafe: 'स्तर १-३: सर्वोच्च सुरक्षितता (उत्कृष्ट सिबिल आणि दैनंदिन किराणा/दूध)',
    riskLevelBalanced: 'स्तर ४-७: संतुलित परतावा (स्थापित स्थानिक व्यवसाय)',
    riskLevelHighYield: 'स्तर ८-१०: उच्च परतावा (वाहतूक व औद्योगिक व्यवसाय)',
    expectedAnnualProfitLabel: 'अपेक्षित वार्षिक नफा',
    safetyScoreLabel: 'भांडवल संरक्षण स्कोअर',
    smartBasketTitle: 'स्वयंचलित ५-भागी भांडवल संरक्षण विभागणी',
    smartBasketSubtitle: 'आपली रक्कम आपोआप ५ खात्रीशीर व्यावसायिकांमध्ये विभागली जाते, जेणेकरून जोखीम नगण्य राहते.',
    borrowersListTitle: 'सक्रिय कर्ज मागणीदार (पुणे व पिंपरी-चिंचवड परिसर)',
    borrowersListSubtitle: 'आपल्या पसंतीच्या सुरक्षिततेनुसार तपासलेले स्थानिक व्यवसाय.',
    cibilScoreLabel: 'सिबिल (CIBIL) क्रेडिट स्कोअर',
    loanPurposeLabel: 'कर्जाचे कारण',
    pastRecordLabel: 'मागील परतफेड नोंद',
    viewDetailsBtn: 'व्यवसाय माहिती पहा',
    fundPortfolioBtn: 'निवडलेल्या पोर्टफोलिओला निधी द्या',
    compareWithFdBtn: 'बँक एफडीशी तुलना करा (६%)',
    voiceMicBtn: 'आवाज सहाय्यक (Voice)',
    voiceModalTitle: 'पिअरफंड आवाज सहाय्यक',
    voiceModalSubtitle: 'रक्कम किंवा सुरक्षितता स्तर बदलण्यासाठी सहजतेने बोला.',
    voiceListening: 'आपला आवाज ऐकत आहे...',
    voiceTapToSpeak: 'बोलण्यासाठी माइक बटणावर क्लिक करा',
    voiceCommandsHelp: [
      '"सेफ मोड" किंवा "सुरक्षित" बोला',
      '"जास्त परतावा" किंवा "हाय यील्ड" बोला',
      '"१० हजार गुंतवा" किंवा "१५ हजार रक्कम करा" बोला',
      '"बँक एफडी तुलना" किंवा "फंड करा" बोला',
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

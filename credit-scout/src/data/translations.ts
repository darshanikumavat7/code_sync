import { Language } from '../types';

export interface Translations {
  appName: string;
  appSubtitle: string;
  tagline: string;
  capitalSliderTitle: string;
  capitalSliderSubtitle: string;
  riskSliderTitle: string;
  riskSliderSubtitle: string;
  riskUltraSafe: string;
  riskBalanced: string;
  riskAggressive: string;
  riskDefenseNote: string;
  netRoiHighlight: string;
  netRoiFormulaNote: string;
  smartBasketTitle: string;
  smartBasketSubtitle: string;
  diversificationBadge: string;
  topBorrowersTitle: string;
  topBorrowersSubtitle: string;
  filterAll: string;
  filterPune: string;
  filterPcmc: string;
  filterHighYield: string;
  filterAgri: string;
  cibilScoreLabel: string;
  netRoiLabel: string;
  nominalRateLabel: string;
  defaultRiskLabel: string;
  matchScoreLabel: string;
  viewAiRationale: string;
  fundSolo: string;
  deployEscrowBtn: string;
  viewGrowthGraph: string;
  voiceAssistantBtn: string;
  voiceListening: string;
  voicePrompt: string;
  voiceHint: string;
  voiceHelpTitle: string;
  voiceSuggestions: string[];
  escrowTitle: string;
  escrowSubtitle: string;
  escrowStep1: string;
  escrowStep2: string;
  escrowStep3: string;
  escrowStep4: string;
  escrowSuccessTitle: string;
  escrowTxHash: string;
  escrowBlock: string;
  escrowDownloadReceipt: string;
  escrowClose: string;
  profitModalTitle: string;
  profitModalSubtitle: string;
  profitAlphaLabel: string;
  profitFdRateLabel: string;
  profitCompoundedLabel: string;
  profitVsBankFd: string;
  aiModalTitle: string;
  aiModalSubtitle: string;
  aiCibilTrendTitle: string;
  aiCashFlowTitle: string;
  aiRepaymentHistoryTitle: string;
  aiMatchRationaleTitle: string;
  aiVerifiedCreds: string;
  portfolioDrawerTitle: string;
  portfolioActiveLoans: string;
  portfolioTotalYield: string;
  portfolioAutoCompound: string;
  footerComplianceNotice: string;
  punePcmcHubs: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'Credit Scout',
    appSubtitle: 'Automated P2P Micro-Lending Matchmaker & Portfolio Engine',
    tagline: 'AI-driven capital allocation for MSMEs across Pune & PCMC corridor',
    capitalSliderTitle: 'Total Investment Capital',
    capitalSliderSubtitle: 'Specify total deployable funds ($2,000 to $25,000)',
    riskSliderTitle: 'Investor Risk Strategy',
    riskSliderSubtitle: 'Adjust risk tolerance slider from Capital Defense to Aggressive Yield',
    riskUltraSafe: 'Ultra Safe / Capital Defense',
    riskBalanced: 'Balanced Growth / Prudent Yield',
    riskAggressive: 'Aggressive High Yield',
    riskDefenseNote: 'Focuses on 780+ CIBIL scores with institutional supply backing',
    netRoiHighlight: 'Projected Portfolio Net ROI',
    netRoiFormulaNote: 'Formula: (Nominal % × (1 - Default Risk)) - (Default Risk × 50% Penalty)',
    smartBasketTitle: 'Smart Basket Diversification Engine',
    smartBasketSubtitle: 'AI splits your capital across top 5 uncorrelated Pune/PCMC borrowers to minimize risk',
    diversificationBadge: 'Auto-Balanced Portfolio',
    topBorrowersTitle: 'Live Borrower Listings (Pune & PCMC)',
    topBorrowersSubtitle: 'Ranked in real-time by dynamic utility scoring matching your risk and budget',
    filterAll: 'All Businesses (8)',
    filterPune: 'Pune Metro Hubs',
    filterPcmc: 'PCMC Industrial MIDC',
    filterHighYield: 'High Yield (16%+)',
    filterAgri: 'Agri & Food Staples',
    cibilScoreLabel: 'CIBIL Bureau Score',
    netRoiLabel: 'Net Expected ROI',
    nominalRateLabel: 'Nominal APR',
    defaultRiskLabel: 'Default Prob.',
    matchScoreLabel: 'AI Match',
    viewAiRationale: 'Explainable AI Deep-Dive',
    fundSolo: 'Fund Micro-Loan',
    deployEscrowBtn: '1-Click Escrow Smart Contract Deployment',
    viewGrowthGraph: '12-Month Profit Growth Graph vs Bank FD',
    voiceAssistantBtn: 'ScoutVoice AI',
    voiceListening: 'Listening to your voice command...',
    voicePrompt: 'Tap microphone and speak in English, Hindi, or Marathi',
    voiceHint: 'Try saying: "Safe mode", "Invest 10000", "Show profit graph", or "Deploy escrow"',
    voiceHelpTitle: 'Voice Commands Supported',
    voiceSuggestions: [
      'Set capital to $10,000',
      'Switch to Safe Mode',
      'Switch to Aggressive Mode',
      'Show 12-Month Growth Graph',
      'Deploy Smart Escrow Contract',
    ],
    escrowTitle: 'Smart Contract Escrow Execution',
    escrowSubtitle: 'Cryptographic non-custodial capital disbursal protocol on Polygon / Arbitrum',
    escrowStep1: 'Verifying Investor KYC Mandate & CIBIL Bureau Token',
    escrowStep2: 'Minting ERC-4626 Micro-Lending Vault Shares',
    escrowStep3: 'Multi-Sig Escrow Lock on Smart Contract',
    escrowStep4: 'Instant Disbursal to Verified Pune/PCMC Merchant UPI IDs',
    escrowSuccessTitle: 'Escrow Successfully Deployed & Locked!',
    escrowTxHash: 'Transaction Hash',
    escrowBlock: 'Confirmed on Block',
    escrowDownloadReceipt: 'Download Certified Audit Receipt',
    escrowClose: 'Return to Dashboard',
    profitModalTitle: '12-Month Compounded Returns Projection',
    profitModalSubtitle: 'Comparing Credit Scout AI Portfolio against Traditional Bank Fixed Deposits (~6.0%)',
    profitAlphaLabel: 'Generated Alpha (Excess Profit)',
    profitFdRateLabel: 'Standard Bank FD Benchmark',
    profitCompoundedLabel: 'Monthly Compounding Reinvestment',
    profitVsBankFd: 'Credit Scout vs 6.0% Bank Fixed Deposit',
    aiModalTitle: 'Explainable AI Borrower Analysis',
    aiModalSubtitle: 'Audited financial telemetry & AI underwriting rationale',
    aiCibilTrendTitle: '4-Month CIBIL Score Trajectory',
    aiCashFlowTitle: 'Cash Flow & Liquidity Telemetry',
    aiRepaymentHistoryTitle: 'Historical Repayment Ledger',
    aiMatchRationaleTitle: 'AI Matchmaker Rationale',
    aiVerifiedCreds: 'Verified Credentials & Certifications',
    portfolioDrawerTitle: 'Active Capital Deployment',
    portfolioActiveLoans: 'Active Micro-Loans',
    portfolioTotalYield: 'Realized Net Yield',
    portfolioAutoCompound: 'Auto-Reinvest EMI Inflows',
    footerComplianceNotice: 'Credit Scout operates as an AI-powered matching layer under peer-to-peer lending NBFC norms (RBI Master Directions). All transactions are encrypted and non-custodial.',
    punePcmcHubs: 'Covering Kothrud, Hinjawadi Phase 1, Laxmi Road, Bhosari MIDC, Chinchwad, Baner & Talegaon',
  },
  hi: {
    appName: 'क्रेडिट स्काउट (Credit Scout)',
    appSubtitle: 'स्वचालित पी2P सूक्ष्म-ऋण मैचमेकर एवं पोर्टफोलियो इंजन',
    tagline: 'पुणे एवं पिंपरी-चिंचवड के एमएसएमई (MSME) व्यापारियों के लिए एआई आधारित पूंजी आवंटन',
    capitalSliderTitle: 'कुल निवेश पूंजी',
    capitalSliderSubtitle: 'अपनी कुल निवेश राशि निर्धारित करें ($2,000 से $25,000)',
    riskSliderTitle: 'निवेशक जोखिम रणनीति',
    riskSliderSubtitle: 'पूंजी सुरक्षा से लेकर आक्रामक उच्च लाभ तक जोखिम स्लाइडर को बदलें',
    riskUltraSafe: 'अल्ट्रा सेफ / पूंजी सुरक्षा',
    riskBalanced: 'संतुलित विकास / विवेकपूर्ण लाभ',
    riskAggressive: 'आक्रामक उच्च प्रतिफल',
    riskDefenseNote: '780+ सिबिल स्कोर और सत्यापित आपूर्ति अनुबंधों पर केंद्रित',
    netRoiHighlight: 'अनुमानित पोर्टफोलियो शुद्ध आरओआई (Net ROI)',
    netRoiFormulaNote: 'सूत्र: (ब्याज दर × (1 - डिफ़ॉल्ट जोखिम)) - (डिफ़ॉल्ट जोखिम × 50% पेनल्टी)',
    smartBasketTitle: 'स्मार्ट बास्केट विविधीकरण इंजन',
    smartBasketSubtitle: 'एआई जोखिम कम करने के लिए आपकी पूंजी को शीर्ष 5 पुणे/पिंपरी-चिंचवड व्यापारियों में बांटता है',
    diversificationBadge: 'ऑटो-बैलेंस्ड पोर्टफोलियो',
    topBorrowersTitle: 'सक्रिय ऋण आवेदक (पुणे एवं पिंपरी-चिंचवड)',
    topBorrowersSubtitle: 'आपके जोखिम और बजट के आधार पर रियल-टाइम स्कोरिंग से रैंक किया गया',
    filterAll: 'सभी व्यवसाय (8)',
    filterPune: 'पुणे मेट्रो हब',
    filterPcmc: 'पिंपरी-चिंचवड एमआईडीसी',
    filterHighYield: 'उच्च प्रतिफल (16%+)',
    filterAgri: 'कृषि एवं किराना',
    cibilScoreLabel: 'सिबिल (CIBIL) स्कोर',
    netRoiLabel: 'शुद्ध अपेक्षित आरओआई',
    nominalRateLabel: 'वार्षिक ब्याज दर',
    defaultRiskLabel: 'डिफ़ॉल्ट जोखिम',
    matchScoreLabel: 'एआई मैच',
    viewAiRationale: 'विस्तृत एआई विश्लेषण (Explainable AI)',
    fundSolo: 'सीधे ऋण दें',
    deployEscrowBtn: '1-क्लिक एस्क्रो स्मार्ट अनुबंध परिनियोजन (Deploy Escrow)',
    viewGrowthGraph: '12-महीने का लाभ वृद्धि ग्राफ (बैंक एफडी तुलना)',
    voiceAssistantBtn: 'स्काउट-वॉइस एआई (Voice)',
    voiceListening: 'आपकी आवाज सुनी जा रही है...',
    voicePrompt: 'माइक दबाएं और अंग्रेजी, हिंदी या मराठी में बोलें',
    voiceHint: 'बोल कर देखें: "सेफ मोड", "१० हजार निवेश करो", "ग्राफ दिखाओ", या "एस्क्रो चालू करो"',
    voiceHelpTitle: 'समर्थित आवाज आदेश',
    voiceSuggestions: [
      'निवेश पूंजी $10,000 सेट करें',
      'सुरक्षित मोड (Safe Mode) में बदलें',
      'आक्रामक मोड (Aggressive) में बदलें',
      '12-महीने का वृद्धि ग्राफ दिखाएं',
      'स्मार्ट एस्क्रो कॉन्ट्रैक्ट डिप्लॉय करें',
    ],
    escrowTitle: 'स्मार्ट कॉन्ट्रैक्ट एस्क्रो निष्पादन',
    escrowSubtitle: 'पॉलीगॉन / आर्बिट्रम पर गैर-कस्टोडियल पूंजी वितरण प्रोटोकॉल',
    escrowStep1: 'निवेशक केवाईसी और सिबिल ब्यूरो टोकन सत्यापन',
    escrowStep2: 'ERC-4626 माइक्रो-लेंडिंग वॉल्ट शेयर्स निर्माण',
    escrowStep3: 'मल्टी-सिग एस्क्रो स्मार्ट अनुबंध में पूंजी लॉक',
    escrowStep4: 'पुणे/पिंपरी-चिंचवड व्यापारियों के यूपीआई (UPI) पर तत्काल वितरण',
    escrowSuccessTitle: 'एस्क्रो स्मार्ट अनुबंध सफलतापूर्वक लॉक एवं निष्पादित!',
    escrowTxHash: 'ट्रांजेक्शन हैश (Tx Hash)',
    escrowBlock: 'पुष्ट ब्लॉक संख्या',
    escrowDownloadReceipt: 'प्रमाणित ऑडिट रसीद डाउनलोड करें',
    escrowClose: 'डैशबोर्ड पर लौटें',
    profitModalTitle: '12-महीने का चक्रवृद्धि रिटर्न अनुमान',
    profitModalSubtitle: 'पारंपरिक बैंक फिक्स्ड डिपॉजिट (~6.0%) बनाम क्रेडिट स्काउट एआई पोर्टफोलियो',
    profitAlphaLabel: 'अतिरिक्त लाभ (Alpha Return)',
    profitFdRateLabel: 'बैंक एफडी मानक दर',
    profitCompoundedLabel: 'मासिक चक्रवृद्धि पुनर्निवेश',
    profitVsBankFd: 'क्रेडिट स्काउट बनाम 6.0% बैंक एफडी',
    aiModalTitle: 'पारदर्शी एआई उधारकर्ता विश्लेषण',
    aiModalSubtitle: 'ऑडिटेड वित्तीय आंकड़े और एआई अंडरराइटिंग तर्क',
    aiCibilTrendTitle: '4-महीने का सिबिल स्कोर प्रक्षेपवक्र',
    aiCashFlowTitle: 'कैश फ्लो और तरलता मेट्रिक्स',
    aiRepaymentHistoryTitle: 'ऐतिहासिक ऋण चुकौती बहीखाता',
    aiMatchRationaleTitle: 'एआई मैचमेकर का निर्णय तर्क',
    aiVerifiedCreds: 'सत्यापित साख एवं प्रमाण पत्र',
    portfolioDrawerTitle: 'सक्रिय पूंजी निवेश',
    portfolioActiveLoans: 'सक्रिय सूक्ष्म-ऋण',
    portfolioTotalYield: 'प्राप्त शुद्ध प्रतिफल',
    portfolioAutoCompound: 'ईएमआई आवक का स्वत: पुनर्निवेश',
    footerComplianceNotice: 'क्रेडिट स्काउट आरबीआई पीयर-टू-पीयर लेंडिंग एनबीएफसी दिशानिर्देशों के अनुरूप काम करता है। सभी लेनदेन एन्क्रिप्टेड हैं।',
    punePcmcHubs: 'कोथरूड, हिंजवडी फेज 1, लक्ष्मी रोड, भोसरी एमआईडीसी, चिंचवड, बानेर एवं तळेगांव',
  },
  mr: {
    appName: 'क्रेडिट स्काउट (Credit Scout)',
    appSubtitle: 'स्वयंचलित पी२पी मायक्रो-लेंडिंग मॅचमेकर आणि पोर्टफोलिओ इंजिन',
    tagline: 'पुणे आणि पिंपरी-चिंचवड परिसरातील उद्योजकांसाठी एआय-आधारित भांडवल वाटप',
    capitalSliderTitle: 'एकूण गुंतवणूक भांडवल',
    capitalSliderSubtitle: 'आपली एकूण गुंतवणूक रक्कम निश्चित करा ($2,000 ते $25,000)',
    riskSliderTitle: 'गुंतवणूकदार जोखीम धोरण',
    riskSliderSubtitle: 'भांडवल संरक्षण ते आक्रमक नफा यामधील जोखीम स्तर ठरवा',
    riskUltraSafe: 'अल्ट्रा सेफ / भांडवल संरक्षण',
    riskBalanced: 'संतुलित वाढ / विवेकी परतावा',
    riskAggressive: 'आक्रमक उच्च परतावा',
    riskDefenseNote: '७८०+ सिबिल स्कोअर आणि शाश्वत व्यवसायांना प्राधान्य',
    netRoiHighlight: 'अपेक्षित पोर्टफोलिओ निव्वळ परतावा (Net ROI)',
    netRoiFormulaNote: 'सूत्र: (व्याजदर × (१ - डिफॉल्ट जोखीम)) - (डिफॉल्ट जोखीम × ५०% दंड)',
    smartBasketTitle: 'स्मार्ट बास्केट विविधीकरण इंजिन',
    smartBasketSubtitle: 'जोखीम कमी करण्यासाठी एआय आपले भांडवल सर्वोत्तम ५ पुणे/पिंपरी-चिंचवड व्यावसायिकांमध्ये विभागते',
    diversificationBadge: 'ऑटो-बॅलन्स्ड पोर्टफोलिओ',
    topBorrowersTitle: 'थेट कर्ज मागणीदार (पुणे व पिंपरी-चिंचवड)',
    topBorrowersSubtitle: 'तुमची जोखीम व भांडवल यानुसार रियल-टाइम रँकिंग',
    filterAll: 'सर्व व्यवसाय (८)',
    filterPune: 'पुणे मेट्रो भाग',
    filterPcmc: 'पिंपरी-चिंचवड एमआयडीसी',
    filterHighYield: 'उच्च परतावा (१६%+)',
    filterAgri: 'कृषी व किराणा',
    cibilScoreLabel: 'सिबिल (CIBIL) स्कोअर',
    netRoiLabel: 'अपेक्षित निव्वळ परतावा',
    nominalRateLabel: 'वार्षिक व्याजदर',
    defaultRiskLabel: 'डिफॉल्ट शक्यता',
    matchScoreLabel: 'एआय मॅच',
    viewAiRationale: 'सखोल एआय विश्लेषण (Explainable AI)',
    fundSolo: 'थेट कर्ज द्या',
    deployEscrowBtn: '१-क्लिक एस्क्रो स्मार्ट कॉन्ट्रॅक्ट उपयोजन (Deploy Escrow)',
    viewGrowthGraph: '१२ महिन्यांचा नफा वाढ आलेख (बँक एफडी तुलना)',
    voiceAssistantBtn: 'स्काउट-व्हॉइस एआय (Voice)',
    voiceListening: 'तुमचा आवाज ऐकत आहे...',
    voicePrompt: 'माइक बटण दाबा आणि इंग्रजी, हिंदी किंवा मराठीत बोला',
    voiceHint: 'बोलून पहा: "सेफ मोड", "१० हजार गुंतवा", "आलेख दाखवा", किंवा "एस्क्रो सुरू करा"',
    voiceHelpTitle: 'उपलब्ध आवाज आज्ञा',
    voiceSuggestions: [
      'भांडवल $10,000 सेट करा',
      'सुरक्षित मोड (Safe Mode) करा',
      'आक्रमक मोड (Aggressive) करा',
      '१२ महिन्यांचा आलेख दाखवा',
      'स्मार्ट एस्क्रो कॉन्ट्रॅक्ट कार्यान्वित करा',
    ],
    escrowTitle: 'स्मार्ट कॉन्ट्रॅक्ट एस्क्रो प्रक्रिया',
    escrowSubtitle: 'पॉलीगॉन / आर्बिट्रम ब्लॉकचेनवर सुरक्षित भांडवल वितरण प्रणाली',
    escrowStep1: 'गुंतवणूकदार केवायसी आणि सिबिल पडताळणी पूर्ण',
    escrowStep2: 'ERC-4626 मायक्रो-लेंडिंग व्हॉल्ट शेअर्स निर्मिती',
    escrowStep3: 'मल्टी-सिग एस्क्रो स्मार्ट कॉन्ट्रॅक्टमध्ये रक्कम लॉक',
    escrowStep4: 'पुणे/पिंपरी-चिंचवड व्यावसायिकांच्या युपीआयवर थेट जमा',
    escrowSuccessTitle: 'एस्क्रो स्मार्ट कॉन्ट्रॅक्ट यशस्वीरित्या लॉक झाले!',
    escrowTxHash: 'व्यवहार हॅश (Tx Hash)',
    escrowBlock: 'पुष्टी झालेला ब्लॉक क्रमांक',
    escrowDownloadReceipt: 'प्रमाणित पावती डाउनलोड करा',
    escrowClose: 'डॅशबोर्डवर परत जा',
    profitModalTitle: '१२ महिन्यांचा चक्रवाढ परतावा अंदाज',
    profitModalSubtitle: 'पारंपरिक बँक फिक्स डिपॉझिट (~६.०%) विरुद्ध क्रेडिट स्काउट एआय पोर्टफोलिओ',
    profitAlphaLabel: 'अतिरिक्त नफा (Alpha Return)',
    profitFdRateLabel: 'प्रमाणित बँक एफडी दर',
    profitCompoundedLabel: 'मासिक चक्रवाढ फेरगुंतवणूक',
    profitVsBankFd: 'क्रेडिट स्काउट विरुद्ध ६.०% बँक एफडी',
    aiModalTitle: 'पारदर्शक एआय कर्जदार विश्लेषण',
    aiModalSubtitle: 'तपासलेले आर्थिक आकडे आणि एआय क्रेडिट तर्कसंगती',
    aiCibilTrendTitle: '४ महिन्यांचा सिबिल स्कोअर प्रवास',
    aiCashFlowTitle: 'कॅश फ्लो आणि रोकड सुलभता',
    aiRepaymentHistoryTitle: 'मागील कर्ज परतफेड इतिहास',
    aiMatchRationaleTitle: 'एआय मॅचमेकरचे विश्लेषण',
    aiVerifiedCreds: 'प्रमाणित कागदपत्रे व दाखले',
    portfolioDrawerTitle: 'सक्रिय भांडवल गुंतवणूक',
    portfolioActiveLoans: 'सक्रिय मायक्रो-कर्जे',
    portfolioTotalYield: 'मिळालेला निव्वळ परतावा',
    portfolioAutoCompound: 'ईएमआय रकमेची आपोआप फेरगुंतवणूक',
    footerComplianceNotice: 'क्रेडिट स्काउट आरबीआय पी२पी नियमावलीनुसार कार्य करते. सर्व आर्थिक व्यवहार कूटबद्ध आणि सुरक्षित आहेत.',
    punePcmcHubs: 'कोथरूड, हिंजवडी फेज १, लक्ष्मी रोड, भोसरी एमआयडीसी, चिंचवड, बाणेर व तळेगाव',
  },
};

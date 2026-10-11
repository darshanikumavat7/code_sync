import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  Sparkles, 
  Volume2, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  setCapital: (cap: number) => void;
  setRiskAppetite: (risk: number) => void;
  onOpenProfitModal: () => void;
  onOpenEscrowModal: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  language,
  setLanguage,
  setCapital,
  setRiskAppetite,
  onOpenProfitModal,
  onOpenEscrowModal,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [browserSupported, setBrowserSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setBrowserSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setFeedbackMessage('');
      };

      recognition.onresult = (event: any) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
      };

      recognition.onerror = (event: any) => {
        setIsListening(false);
        if (event.error !== 'no-speech') {
          setFeedbackMessage(`Voice note: ${event.error}. You can also click the quick commands below.`);
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      setBrowserSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [language]);

  // Parse voice commands
  const parseCommand = (input: string) => {
    const text = input.toLowerCase().trim();
    let actionDone = false;

    // 1. Risk Strategies
    if (text.includes('safe') || text.includes('सुरक्षित') || text.includes('कमी') || text.includes('defense') || text.includes('बचाव')) {
      setRiskAppetite(2);
      setFeedbackMessage('✓ Switched Risk Strategy to: Ultra Safe / Capital Defense (Level 2)');
      actionDone = true;
    } else if (text.includes('aggressive') || text.includes('आक्रामक') || text.includes('high yield') || text.includes('जास्त') || text.includes('alpha')) {
      setRiskAppetite(9);
      setFeedbackMessage('✓ Switched Risk Strategy to: Aggressive High Yield (Level 9)');
      actionDone = true;
    } else if (text.includes('balanced') || text.includes('संतुलित') || text.includes('मध्यम')) {
      setRiskAppetite(5);
      setFeedbackMessage('✓ Switched Risk Strategy to: Balanced Growth (Level 5)');
      actionDone = true;
    }

    // 2. Capital Amounts
    if (text.includes('10000') || text.includes('10,000') || text.includes('दहा हजार') || text.includes('दस हजार') || text.includes('ten thousand')) {
      setCapital(10000);
      setFeedbackMessage('✓ Updated Total Investment Capital to: $10,000');
      actionDone = true;
    } else if (text.includes('5000') || text.includes('5,000') || text.includes('पाच हजार') || text.includes('पांच हजार') || text.includes('five thousand')) {
      setCapital(5000);
      setFeedbackMessage('✓ Updated Total Investment Capital to: $5,000');
      actionDone = true;
    } else if (text.includes('15000') || text.includes('15,000') || text.includes('पंद्रह हजार') || text.includes('पंधरा हजार')) {
      setCapital(15000);
      setFeedbackMessage('✓ Updated Total Investment Capital to: $15,000');
      actionDone = true;
    } else if (text.includes('25000') || text.includes('25,000') || text.includes('पच्चीस हजार') || text.includes('पंचवीस हजार')) {
      setCapital(25000);
      setFeedbackMessage('✓ Updated Total Investment Capital to: $25,000');
      actionDone = true;
    }

    // 3. Modals & Actions
    if (text.includes('graph') || text.includes('profit') || text.includes('ग्राफ') || text.includes('आलेख') || text.includes('fd') || text.includes('fixed deposit')) {
      onClose();
      onOpenProfitModal();
      return;
    } else if (text.includes('escrow') || text.includes('deploy') || text.includes('एस्क्रो') || text.includes('स्मार्ट')) {
      onClose();
      onOpenEscrowModal();
      return;
    }

    // 4. Languages
    if (text.includes('hindi') || text.includes('हिंदी')) {
      setLanguage('hi');
      setFeedbackMessage('✓ भाषा बदलकर हिंदी कर दी गई है।');
      actionDone = true;
    } else if (text.includes('marathi') || text.includes('मराठी')) {
      setLanguage('mr');
      setFeedbackMessage('✓ भाषा बदलून मराठी केली आहे.');
      actionDone = true;
    } else if (text.includes('english') || text.includes('अंग्रेजी')) {
      setLanguage('en');
      setFeedbackMessage('✓ Language switched to English.');
      actionDone = true;
    }

    if (!actionDone) {
      setFeedbackMessage(`Recognized: "${input}". Try clicking one of the suggested commands below.`);
    }
  };

  // Start / stop microphone
  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setFeedbackMessage('');
      try {
        recognitionRef.current.start();
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  // Trigger command simulation directly
  const handleQuickCommand = (cmdText: string) => {
    setTranscript(cmdText);
    parseCommand(cmdText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-slate-950/80 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-xl rounded-3xl glass-panel-glow bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Mic className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  ScoutVoice AI
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  WEB SPEECH API
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.voicePrompt}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 text-center">
          
          {/* Central Pulsing Microphone Trigger */}
          <div className="py-4 flex flex-col items-center justify-center">
            <div className="relative">
              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
                  <div className="absolute -inset-4 rounded-full bg-emerald-500/10 animate-pulse" />
                </>
              )}

              <button
                type="button"
                onClick={toggleListening}
                className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl ${
                  isListening
                    ? 'bg-gradient-to-tr from-rose-500 to-amber-500 text-white shadow-rose-500/30 ring-4 ring-rose-400/30 scale-105'
                    : 'bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 shadow-emerald-500/30 hover:scale-105'
                }`}
              >
                {isListening ? (
                  <MicOff className="w-10 h-10 animate-pulse" />
                ) : (
                  <Mic className="w-10 h-10" />
                )}
              </button>
            </div>

            <p className="text-xs font-semibold mt-4 text-slate-300">
              {isListening ? t.voiceListening : 'Tap Microphone to Speak (English / हिंदी / मराठी)'}
            </p>

            {/* Live Audio Visualizer Wave Simulation */}
            {isListening && (
              <div className="flex items-center gap-1.5 mt-3 h-6">
                {[40, 75, 55, 95, 60, 85, 45, 90, 70, 50].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-emerald-400 rounded-full animate-bounce"
                    style={{
                      height: `${h}%`,
                      animationDelay: `${i * 0.08}s`,
                      animationDuration: '0.6s',
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Spoken Transcript Display */}
          <div className="min-h-[60px] p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex flex-col items-center justify-center">
            {transcript ? (
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Recognized Speech</span>
                <p className="text-sm font-medium text-white italic font-mono">
                  "{transcript}"
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                {t.voiceHint}
              </p>
            )}

            {/* Action Feedback Result */}
            {feedbackMessage && (
              <div className="mt-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{feedbackMessage}</span>
              </div>
            )}
          </div>

          {/* Quick Click-to-Speak Suggestion Chips */}
          <div className="text-left space-y-2 pt-2 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t.voiceHelpTitle} (Click any chip to test instantly):</span>
            </span>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickCommand('Switch to Safe Mode')}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-emerald-300 border border-slate-700/60 transition-all"
              >
                🎙️ "Safe Mode"
              </button>

              <button
                type="button"
                onClick={() => handleQuickCommand('Switch to Aggressive Mode')}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-amber-300 border border-slate-700/60 transition-all"
              >
                🎙️ "Aggressive High Yield"
              </button>

              <button
                type="button"
                onClick={() => handleQuickCommand('Set capital to 15000')}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-cyan-300 border border-slate-700/60 transition-all"
              >
                🎙️ "Invest $15,000"
              </button>

              <button
                type="button"
                onClick={() => handleQuickCommand('Show 12-Month Growth Graph')}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-teal-300 border border-slate-700/60 transition-all"
              >
                🎙️ "Show Profit Graph"
              </button>

              <button
                type="button"
                onClick={() => handleQuickCommand('Deploy Smart Escrow Contract')}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-emerald-300 border border-slate-700/60 transition-all"
              >
                🎙️ "Deploy Escrow"
              </button>

              <button
                type="button"
                onClick={() => handleQuickCommand('मराठीत बदला')}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-emerald-300 border border-slate-700/60 transition-all"
              >
                🎙️ "मराठीत बदला"
              </button>

              <button
                type="button"
                onClick={() => handleQuickCommand('हिंदी में बदलो')}
                className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 hover:text-emerald-300 border border-slate-700/60 transition-all"
              >
                🎙️ "हिंदी में बदलो"
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

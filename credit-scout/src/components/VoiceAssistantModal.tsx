import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  HelpCircle,
  Volume2
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface VoiceAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  setCapital: (cap: number) => void;
  setRiskLevel: (level: number) => void;
  onOpenProfitModal: () => void;
  onFundPortfolio: () => void;
}

export const VoiceAssistantModal: React.FC<VoiceAssistantModalProps> = ({
  isOpen,
  onClose,
  language,
  setLanguage,
  setCapital,
  setRiskLevel,
  onOpenProfitModal,
  onFundPortfolio,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [actionFeedback, setActionFeedback] = useState('');
  const recognitionRef = useRef<any>(null);

  // Setup Web Speech API
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
        setActionFeedback('');
      };

      recognition.onresult = (event: any) => {
        const text = event.results[event.resultIndex][0].transcript;
        setTranscript(text);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch {}

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {}
      }
    };
  }, [language]);

  // Command parser
  const executeCommand = (cmd: string) => {
    const text = cmd.toLowerCase().trim();
    let handled = false;

    // Risk / Safety commands
    if (text.includes('safe') || text.includes('सुरक्षित') || text.includes('कमी') || text.includes('low risk') || text.includes('defense')) {
      setRiskLevel(2);
      setActionFeedback('✓ Set to Maximum Safety Level (Level 2)');
      handled = true;
    } else if (text.includes('aggressive') || text.includes('high') || text.includes('जास्त') || text.includes('आक्रामक') || text.includes('मुनाफा')) {
      setRiskLevel(9);
      setActionFeedback('✓ Set to High Return Level (Level 9)');
      handled = true;
    } else if (text.includes('balanced') || text.includes('संतुलित') || text.includes('मध्यम')) {
      setRiskLevel(5);
      setActionFeedback('✓ Set to Balanced Level (Level 5)');
      handled = true;
    }

    // Capital commands
    if (text.includes('10000') || text.includes('10,000') || text.includes('दस हजार') || text.includes('दहा हजार')) {
      setCapital(10000);
      setActionFeedback('✓ Set Investment Amount to $10,000');
      handled = true;
    } else if (text.includes('5000') || text.includes('5,000') || text.includes('पांच हजार') || text.includes('पाच हजार')) {
      setCapital(5000);
      setActionFeedback('✓ Set Investment Amount to $5,000');
      handled = true;
    } else if (text.includes('15000') || text.includes('15,000') || text.includes('पंद्रह हजार') || text.includes('पंधरा हजार')) {
      setCapital(15000);
      setActionFeedback('✓ Set Investment Amount to $15,000');
      handled = true;
    } else if (text.includes('25000') || text.includes('25,000') || text.includes('पच्चीस हजार') || text.includes('पंचवीस हजार')) {
      setCapital(25000);
      setActionFeedback('✓ Set Investment Amount to $25,000');
      handled = true;
    }

    // Actions
    if (text.includes('compare') || text.includes('fd') || text.includes('fixed deposit') || text.includes('तुलना') || text.includes('बँक')) {
      onClose();
      onOpenProfitModal();
      return;
    } else if (text.includes('fund') || text.includes('रसीद') || text.includes('पावती') || text.includes('पैसा') || text.includes('invest')) {
      onClose();
      onFundPortfolio();
      return;
    }

    // Language
    if (text.includes('hindi') || text.includes('हिंदी')) {
      setLanguage('hi');
      setActionFeedback('✓ भाषा हिंदी सेट केली/केली गई');
      handled = true;
    } else if (text.includes('marathi') || text.includes('मराठी')) {
      setLanguage('mr');
      setActionFeedback('✓ भाषा मराठी सेट केली');
      handled = true;
    } else if (text.includes('english')) {
      setLanguage('en');
      setActionFeedback('✓ Switched language to English');
      handled = true;
    }

    if (!handled) {
      setActionFeedback(`Heard: "${cmd}". You can also click any command button below.`);
    }
  };

  const toggleMic = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setActionFeedback('');
      try {
        recognitionRef.current.start();
      } catch {
        setIsListening(false);
      }
    }
  };

  const handleQuickCommand = (sample: string) => {
    setTranscript(sample);
    executeCommand(sample);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-sm bg-slate-900/60 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-white rounded-xl border border-slate-300 shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-blue-900 text-white p-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-800 flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                {t.voiceModalTitle}
              </h3>
              <p className="text-xs text-blue-200">
                {t.voiceModalSubtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 text-center">
          
          {/* Large Microphone Button */}
          <div className="flex flex-col items-center justify-center py-2">
            <button
              type="button"
              onClick={toggleMic}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-md ${
                isListening
                  ? 'bg-rose-600 text-white ring-4 ring-rose-200 scale-105'
                  : 'bg-blue-900 hover:bg-blue-800 text-white hover:scale-105'
              }`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 animate-pulse" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>

            <span className="text-xs font-bold text-slate-800 mt-3 block">
              {isListening ? t.voiceListening : t.voiceTapToSpeak}
            </span>
          </div>

          {/* Spoken Text / Status Box */}
          <div className="min-h-[50px] p-3.5 bg-slate-50 border border-slate-300 rounded-lg text-center flex flex-col items-center justify-center">
            {transcript ? (
              <p className="text-sm font-bold text-slate-900 italic font-mono">
                "{transcript}"
              </p>
            ) : (
              <span className="text-xs text-slate-500">
                Say something like "Safe mode" or "Invest 10000"
              </span>
            )}

            {actionFeedback && (
              <div className="mt-2 text-xs font-bold text-emerald-800 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>{actionFeedback}</span>
              </div>
            )}
          </div>

          {/* Quick-Click Command Buttons */}
          <div className="text-left space-y-2 pt-2 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-700 block">
              Quick Voice Commands (Click to simulate speaking):
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleQuickCommand('Safe mode')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 text-xs font-semibold text-slate-800 transition-colors"
              >
                🎙️ "Safe mode"
              </button>

              <button
                type="button"
                onClick={() => handleQuickCommand('High return')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 text-xs font-semibold text-slate-800 transition-colors"
              >
                🎙️ "High return"
              </button>

              <button
                type="button"
                onClick={() => handleQuickCommand('Invest 10000')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 text-xs font-semibold text-slate-800 transition-colors"
              >
                🎙️ "Invest $10,000"
              </button>

              <button
                type="button"
                onClick={() => handleQuickCommand('Compare with Bank FD')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 text-xs font-semibold text-slate-800 transition-colors"
              >
                🎙️ "Compare with Bank FD"
              </button>

              <button
                type="button"
                onClick={() => handleQuickCommand('Fund portfolio')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 border border-slate-300 hover:border-blue-300 text-xs font-semibold text-slate-800 transition-colors"
              >
                🎙️ "Fund portfolio"
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

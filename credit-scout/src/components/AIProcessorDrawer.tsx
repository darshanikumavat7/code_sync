import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mic, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  ArrowRight, 
  ShieldCheck, 
  Coins, 
  Calendar, 
  TrendingUp, 
  Loader2, 
  Play,
  RotateCcw
} from 'lucide-react';
import { Language, Currency, TargetTimeline } from '../types';
import { formatCurrency } from '../utils/calculator';
import { TRANSLATIONS } from '../data/translations';

interface AIProcessorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setBudgetInr: (budget: number) => void;
  setTargetTimeline: (timeline: TargetTimeline) => void;
  setRiskLevel: (risk: number) => void;
  onProceedToStep: (step: 1 | 2 | 3 | 4) => void;
  onProceedToEscrow?: (amount: number) => void;
}

export const AIProcessorDrawer: React.FC<AIProcessorDrawerProps> = ({
  isOpen,
  onClose,
  language,
  setLanguage,
  currency,
  setBudgetInr,
  setTargetTimeline,
  setRiskLevel,
  onProceedToStep,
  onProceedToEscrow,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];

  // Processing state
  const [activeStep, setActiveStep] = useState<number>(0); // 0 = idle, 1, 2, 3, 4 = done
  const [currentCommand, setCurrentCommand] = useState<string>('Invest ₹5,000 for 6 months with maximum safety');
  const [extractedAmount, setExtractedAmount] = useState<number>(5000);
  const [extractedTenure, setExtractedTenure] = useState<TargetTimeline>(6);
  const [extractedRisk, setExtractedRisk] = useState<number>(3);
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  // Spoken Presets
  const presetCommands = [
    { label: 'Invest ₹5,000 (6 Months)', text: 'Invest 5000 rupees for 6 months with maximum safety' },
    { label: 'Micro-Ticket ₹1,000 (3 Mos)', text: 'Micro invest 1000 rupees for 3 months' },
    { label: 'Prime CIBIL ₹25,000', text: 'Invest 25000 rupees in high CIBIL Prime grade borrowers' },
    { label: 'Switch to हिंदी (Hindi)', text: 'Switch to Hindi language' },
    { label: 'Switch to मराठी (Marathi)', text: 'Switch to Marathi language' },
  ];

  // Automated step-by-step progress simulation
  const runIntentProcessor = (cmd: string) => {
    setCurrentCommand(cmd);
    setIsProcessing(true);
    setActiveStep(1);

    const lower = cmd.toLowerCase();

    // 1. Language intents
    if (lower.includes('marathi') || lower.includes('मराठी')) {
      setLanguage('mr');
      setFeedbackMessage('भाषा मराठीमध्ये बदलण्यात आली आहे.');
    } else if (lower.includes('hindi') || lower.includes('हिंदी')) {
      setLanguage('hi');
      setFeedbackMessage('भाषा हिंदी में सफलतापूर्वक बदल दी गई है।');
    }

    // 2. Budget intents
    let budget = 5000;
    if (lower.includes('500') && !lower.includes('5000')) budget = 500;
    else if (lower.includes('1000') || lower.includes('1,000')) budget = 1000;
    else if (lower.includes('5000') || lower.includes('5,000')) budget = 5000;
    else if (lower.includes('25000') || lower.includes('25,000')) budget = 25000;
    else if (lower.includes('50000') || lower.includes('50,000')) budget = 50000;

    // 3. Timeline intents
    let timeline: TargetTimeline = 6;
    if (lower.includes('1 month') || lower.includes('1 माह') || lower.includes('1 महिना')) timeline = 1;
    else if (lower.includes('3 month') || lower.includes('3 माह') || lower.includes('3 महिने')) timeline = 3;
    else if (lower.includes('6 month') || lower.includes('6 माह') || lower.includes('6 महिने')) timeline = 6;
    else if (lower.includes('12 month') || lower.includes('1 year') || lower.includes('12 माह')) timeline = 12;
    else if (lower.includes('24 month') || lower.includes('2 year') || lower.includes('24 माह')) timeline = 24;

    // 4. Risk intents
    let risk = 3;
    if (lower.includes('safe') || lower.includes('maximum safety') || lower.includes('सुरक्षित')) risk = 2;
    else if (lower.includes('high return') || lower.includes('aggressive')) risk = 8;

    setExtractedAmount(budget);
    setExtractedTenure(timeline);
    setExtractedRisk(risk);

    // Apply values to app state
    setBudgetInr(budget);
    setTargetTimeline(timeline);
    setRiskLevel(risk);

    // Progressive visual steps
    setTimeout(() => {
      setActiveStep(2);
      setTimeout(() => {
        setActiveStep(3);
        setTimeout(() => {
          setActiveStep(4);
          setIsProcessing(false);

          const localizedSuccess = 
            language === 'hi' 
              ? `✓ ₹${budget.toLocaleString('en-IN')} का पोर्टफोलियो ${timeline} माह और प्राइम सिबिल के साथ लॉक किया गया है।`
              : language === 'mr'
              ? `✓ ₹${budget.toLocaleString('en-IN')} चे पोर्टफोलिओ ${timeline} महिन्यांसाठी उच्च सिबिल गुणवत्तेसह लॉक केले आहे.`
              : `✓ Configured portfolio of ₹${budget.toLocaleString('en-IN')} for ${timeline} Months with Prime CIBIL safety.`;

          setFeedbackMessage(localizedSuccess);

          // Audio voice cue
          speakFeedback(localizedSuccess, language);
        }, 500);
      }, 500);
    }, 500);
  };

  const speakFeedback = (text: string, lang: Language) => {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'hi' ? 'hi-IN' : lang === 'mr' ? 'mr-IN' : 'en-IN';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch {}
    }
  };

  // Run automatically on first open
  useEffect(() => {
    if (activeStep === 0) {
      runIntentProcessor(currentCommand);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-2xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-950 px-6 py-4 text-white flex items-center justify-between border-b border-blue-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-800 border border-blue-700 flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight font-sans">
                  Interactive AI Voice Guide & Intent Processor
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold font-mono">
                  Live Engine
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Natural Language Micro-Lending & Escrow Automation
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-blue-800 hover:bg-blue-700 text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Query Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Spoken or Typed Intent:</span>
              <span className="text-[10px] text-slate-500 font-normal">Web Speech API & Semantic Parser</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') runIntentProcessor(currentCommand);
                }}
                className="w-full pl-3 pr-20 py-2.5 text-xs rounded-xl border-2 border-slate-300 focus:border-blue-900 focus:outline-none font-medium shadow-sm"
                placeholder="e.g. Invest 5000 rupees for 6 months..."
              />
              <button
                type="button"
                onClick={() => runIntentProcessor(currentCommand)}
                disabled={isProcessing}
                className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1"
              >
                {isProcessing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
                <span>Process</span>
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-bold text-slate-500">Quick Test Spoken Commands:</span>
            <div className="flex flex-wrap gap-1.5">
              {presetCommands.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => runIntentProcessor(p.text)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-300 border border-slate-300 text-slate-700 font-semibold transition-all"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* VISUAL STEP-BY-STEP PROCESSING PROGRESS DRAWER */}
          <div className="bg-slate-900 rounded-2xl p-5 text-white border border-slate-800 space-y-4 shadow-lg">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Guided Intent Processor
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">
                {activeStep === 4 ? '100% COMPLETE' : `${activeStep * 25}% PROGRESS`}
              </span>
            </div>

            {/* Overall Progress Bar */}
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${activeStep * 25}%` }}
              />
            </div>

            {/* The 4 Progressive Steps Checklist */}
            <div className="space-y-2.5 text-xs">
              
              {/* Step 1 */}
              <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                activeStep >= 1 ? 'bg-slate-800/80 border-blue-500/60 text-white' : 'bg-slate-800/30 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center gap-2.5">
                  {activeStep > 1 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : activeStep === 1 ? (
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-600 text-[10px] flex items-center justify-center font-mono">1</span>
                  )}
                  <span>Step 1: Analyzing Risk Profile & Credit Thresholds</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-blue-300">
                  {activeStep >= 1 ? 'Prime Grade' : 'Pending'}
                </span>
              </div>

              {/* Step 2 */}
              <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                activeStep >= 2 ? 'bg-slate-800/80 border-blue-500/60 text-white' : 'bg-slate-800/30 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center gap-2.5">
                  {activeStep > 2 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : activeStep === 2 ? (
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-600 text-[10px] flex items-center justify-center font-mono">2</span>
                  )}
                  <span>Step 2: Matching Pune/PCMC CIBIL & Timeline Alignment</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-blue-300">
                  {activeStep >= 2 ? `${extractedTenure}M Tenure` : 'Pending'}
                </span>
              </div>

              {/* Step 3 */}
              <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                activeStep >= 3 ? 'bg-slate-800/80 border-blue-500/60 text-white' : 'bg-slate-800/30 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center gap-2.5">
                  {activeStep > 3 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : activeStep === 3 ? (
                    <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-600 text-[10px] flex items-center justify-center font-mono">3</span>
                  )}
                  <span>Step 3: Preparing Escrow Allocation (100% Locked Balance)</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-emerald-400">
                  {activeStep >= 3 ? formatCurrency(extractedAmount, currency) : 'Pending'}
                </span>
              </div>

              {/* Step 4 */}
              <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                activeStep >= 4 ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200' : 'bg-slate-800/30 border-slate-800 text-slate-500'
              }`}>
                <div className="flex items-center gap-2.5">
                  {activeStep >= 4 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-600 text-[10px] flex items-center justify-center font-mono">4</span>
                  )}
                  <span>Step 4: Smart Basket Configured & Escrow Ready</span>
                </div>
                <span className="font-mono text-[11px] font-bold text-emerald-400">
                  {activeStep >= 4 ? '✓ Locked' : 'Pending'}
                </span>
              </div>

            </div>

            {/* Feedback Message Banner */}
            {feedbackMessage && (
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between gap-3 text-xs">
                <span className="text-emerald-300 font-medium">{feedbackMessage}</span>
                <button
                  type="button"
                  onClick={() => speakFeedback(feedbackMessage, language)}
                  className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-emerald-300 shrink-0"
                  title="Play audio cue"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              Close Guide
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToStep(3);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>View Allocations in Wizard (Step 3)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onProceedToEscrow && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onProceedToEscrow(extractedAmount);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Proceed to Escrow ({formatCurrency(extractedAmount, currency)})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

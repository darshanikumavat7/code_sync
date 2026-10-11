import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  Layers,
  ArrowRight,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Language, Currency, EscrowTransaction, MatchResult } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface EscrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  currency: Currency;
  totalCapital: number;
  topMatches: MatchResult[];
  onTransactionSuccess: (tx: EscrowTransaction) => void;
}

type EscrowPhase = 'IDLE' | 'DEPLOYING' | 'SUCCESS';

export const EscrowModal: React.FC<EscrowModalProps> = ({
  isOpen,
  onClose,
  language,
  currency,
  totalCapital,
  topMatches,
  onTransactionSuccess,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const [phase, setPhase] = useState<EscrowPhase>('IDLE');
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [txDetails, setTxDetails] = useState<EscrowTransaction | null>(null);

  const steps = [
    t.escrowStep1,
    t.escrowStep2,
    t.escrowStep3,
    t.escrowStep4,
  ];

  // Execute deployment simulation
  const handleDeploy = () => {
    setPhase('DEPLOYING');
    setCurrentStep(1);

    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 4) {
          return prev + 1;
        } else {
          clearInterval(stepInterval);
          finishDeployment();
          return 4;
        }
      });
    }, 1100);
  };

  const finishDeployment = () => {
    // Generate simulated cryptographic tx
    const mockTx: EscrowTransaction = {
      txHash: '0x' + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      blockNumber: 58941000 + Math.floor(Math.random() * 5000),
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      totalDeployedUsd: totalCapital,
      borrowerCount: Math.min(topMatches.length, 5),
      projectedAnnualYield: 14.2,
      contractAddress: '0x34d399A27F83D4cB055F64E9489110B683Ec49E2',
      status: 'CONFIRMED',
      investorDid: 'did:key:z6Mkq5...pun' + Math.floor(Math.random() * 999),
    };

    setTxDetails(mockTx);
    setPhase('SUCCESS');
    onTransactionSuccess(mockTx);

    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#34d399', '#22d3ee', '#10b981', '#3b82f6'],
      });
    } catch {
      // fallback if confetti fails in headless env
    }
  };

  const handleCopyHash = () => {
    if (txDetails) {
      navigator.clipboard.writeText(txDetails.txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadReceipt = () => {
    if (!txDetails) return;
    const content = `
CREDIT SCOUT - CRYPTOGRAPHIC ESCROW RECEIPT
=================================================
Status: ${txDetails.status}
Transaction Hash: ${txDetails.txHash}
Smart Contract: ${txDetails.contractAddress}
Block Number: #${txDetails.blockNumber}
Timestamp: ${txDetails.timestamp}
Investor DID: ${txDetails.investorDid}
Total Deployed Capital: $${txDetails.totalDeployedUsd}
Verified Pune/PCMC Borrowers Funded: ${txDetails.borrowerCount}
=================================================
Underwritten by Credit Scout Automated P2P Engine
Protected by Non-Custodial Smart Contract Escrow
    `.trim();

    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `credit-scout-receipt-${txDetails.txHash.slice(0, 10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto backdrop-blur-md bg-slate-950/80 animate-in fade-in duration-200">
      
      {/* Container */}
      <div className="relative w-full max-w-2xl rounded-3xl glass-panel-glow bg-slate-900 border border-slate-700/80 shadow-2xl overflow-hidden my-8">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Lock className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">
                  {t.escrowTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                  ERC-4626 VAULT
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.escrowSubtitle}
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
        <div className="p-6 sm:p-8 space-y-6">
          
          {phase === 'IDLE' && (
            <div className="space-y-6">
              
              {/* Capital & Match Basket Summary */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-semibold text-slate-400">Total Capital to Lock in Escrow:</span>
                  <span className="text-2xl font-black font-mono text-emerald-400">
                    {formatCurrency(totalCapital, currency)}
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-semibold text-slate-300 block">
                    Target Pune & PCMC MSME Recipients (Smart Basket):
                  </span>
                  <div className="space-y-1.5 text-xs font-mono">
                    {topMatches.slice(0, 5).map((m, idx) => (
                      <div key={m.borrower.id} className="flex items-center justify-between text-slate-300 bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                        <span className="truncate max-w-[200px]">
                          {idx + 1}. {m.borrower.name} ({m.borrower.businessName})
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-400 font-bold">{formatCurrency(m.allocatedAmountUsd, currency)}</span>
                          <span className="text-slate-500 text-[10px]">({m.allocationPercent}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security guarantees */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Non-Custodial Multi-Sig</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-2 text-slate-300">
                  <Cpu className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Zero Gas Meta-Relayer</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleDeploy}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/25 active:scale-98 flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                <span>Execute & Lock {formatCurrency(totalCapital, currency)} Smart Escrow</span>
              </button>
            </div>
          )}

          {phase === 'DEPLOYING' && (
            <div className="space-y-6 py-4">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center animate-pulse">
                  <Cpu className="w-8 h-8 text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Executing Blockchain Smart Contract Escrow...
                </h4>
                <p className="text-xs text-slate-400">
                  Securing {formatCurrency(totalCapital, currency)} across Polygon PoS / Arbitrum Orbit
                </p>
              </div>

              {/* Animated Progress Pipeline */}
              <div className="space-y-3">
                {steps.map((stepText, idx) => {
                  const stepNum = idx + 1;
                  const isDone = currentStep > stepNum;
                  const isCurrent = currentStep === stepNum;

                  return (
                    <div
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs transition-all ${
                        isDone
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : isCurrent
                          ? 'bg-slate-950 border-emerald-400 text-white font-bold shadow-md shadow-emerald-950'
                          : 'bg-slate-950/40 border-slate-800 text-slate-500'
                      }`}
                    >
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : isCurrent ? (
                          <span className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                        ) : (
                          <span className="text-slate-600 font-bold">{stepNum}</span>
                        )}
                      </div>
                      <span className="flex-1">{stepText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {phase === 'SUCCESS' && txDetails && (
            <div className="space-y-6 animate-in zoom-in-95 duration-300">
              
              {/* Success Badge */}
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                </div>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {t.escrowSuccessTitle}
                </h4>
                <p className="text-xs text-slate-400">
                  Non-custodial smart contract deployed and verified on-chain.
                </p>
              </div>

              {/* Official Receipt Card */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 font-mono text-xs">
                
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-slate-400 font-sans">{t.escrowTxHash}:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-400 font-bold truncate max-w-[200px] sm:max-w-[280px]">
                      {txDetails.txHash}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyHash}
                      className="p-1 hover:text-white text-slate-400"
                      title="Copy Tx Hash"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400 font-sans">{t.escrowBlock}:</span>
                  <span className="text-white font-bold">#{txDetails.blockNumber}</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400 font-sans">Timestamp:</span>
                  <span className="text-slate-300">{txDetails.timestamp} IST</span>
                </div>

                <div className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400 font-sans">Capital Locked:</span>
                  <span className="text-emerald-400 font-bold text-sm">
                    {formatCurrency(txDetails.totalDeployedUsd, currency)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-slate-400 font-sans">Smart Contract Vault:</span>
                  <span className="text-slate-400 truncate max-w-[180px]">
                    {txDetails.contractAddress}
                  </span>
                </div>

              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span>{t.escrowDownloadReceipt}</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
                >
                  {t.escrowClose}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

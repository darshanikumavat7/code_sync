import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Cpu, 
  Lock, 
  ExternalLink,
  Code2,
  Heart
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="mt-20 border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Credit<span className="text-emerald-400">Scout</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {t.footerComplianceNotice}
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{t.punePcmcHubs}</span>
            </div>
          </div>

          {/* Col 2: Algorithmic Architecture */}
          <div className="space-y-2 text-xs">
            <h5 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Matchmaker Engine
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li>• Actuarial Net ROI Discounting</li>
              <li>• 50% Loss-Given-Default Penalty</li>
              <li>• Dynamic Utility Curve Optimization</li>
              <li>• TransUnion CIBIL Trend Analysis</li>
              <li>• Smart Basket Diversification</li>
            </ul>
          </div>

          {/* Col 3: Smart Contract Escrow */}
          <div className="space-y-2 text-xs">
            <h5 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
              Escrow & Security
            </h5>
            <ul className="space-y-1.5 text-slate-400">
              <li>• ERC-4626 Tokenized Vaults</li>
              <li>• Multi-Sig Merchant Disbursal</li>
              <li>• Non-Custodial Capital Pools</li>
              <li>• Web Speech API ScoutVoice</li>
              <li>• Zero Gas Meta-Transactions</li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex items-center gap-1.5">
            <span>© 2026 Credit Scout Platform. Built for Next-Gen Fintech & Micro-Lending.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              All Systems Operational • Pune Mainnet
            </span>
            <span>•</span>
            <span>Version 2.4.0-Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

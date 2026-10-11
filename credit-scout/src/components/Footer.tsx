import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Lock, 
  CheckCircle2, 
  FileText 
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className="mt-16 bg-slate-100 border-t border-slate-300 text-slate-700 text-xs">
      
      {/* Upper Information Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: About Portal */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                PF
              </div>
              <span className="text-lg font-black text-slate-900 tracking-tight font-sans">
                Peer<span className="text-blue-900">Fund</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed max-w-md">
              {t.footerNbfcNotice}
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Empowering local micro-enterprises across Kothrud, Hinjawadi, Bhosari MIDC, Laxmi Road, Ravet & Talegaon.
            </div>
          </div>

          {/* Col 2: Regulatory Compliance */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              Regulatory Standards
            </h5>
            <ul className="space-y-1.5 text-slate-600">
              <li>• RBI Master Directions - NBFC P2P</li>
              <li>• Scheduled Commercial Bank Escrow</li>
              <li>• TransUnion CIBIL Bureau Integration</li>
              <li>• Aadhaar & PAN e-KYC Verification</li>
              <li>• SSL 256-Bit Bank Grade Encryption</li>
            </ul>
          </div>

          {/* Col 3: Grievance & Investor Support */}
          <div className="space-y-2">
            <h5 className="font-bold text-slate-900 uppercase tracking-wider text-xs">
              Helpdesk & Redressal
            </h5>
            <div className="space-y-1.5 text-slate-600">
              <p className="flex items-center gap-1.5 font-semibold text-slate-800">
                <Phone className="w-3.5 h-3.5 text-blue-900" />
                <span>1800-202-7337 (Toll-Free)</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-blue-900" />
                <span>grievance@peerfund.org.in</span>
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Mon - Sat: 9:30 AM to 6:00 PM IST
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 PeerFund National Micro-Lending Portal. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-emerald-800 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>Certified Secure Portal</span>
            </span>
            <span>•</span>
            <span>Accessibility Compliant (WCAG 2.1 AA)</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

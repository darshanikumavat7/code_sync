import React from 'react';
import { 
  ShieldCheck, 
  Target, 
  Zap, 
  HelpCircle, 
  Sparkles, 
  CheckCircle2, 
  Info,
  Sliders,
  DollarSign,
  TrendingUp,
  Percent
} from 'lucide-react';
import { Language, Currency } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { formatCurrency } from '../utils/calculator';

interface RiskSlidersProps {
  language: Language;
  currency: Currency;
  capital: number;
  setCapital: (val: number) => void;
  riskAppetite: number;
  setRiskAppetite: (val: number) => void;
  portfolioNetRoi: number;
  portfolioNominalRoi: number;
  averageDefaultProb: number;
  matchedCount: number;
}

export const RiskSliders: React.FC<RiskSlidersProps> = ({
  language,
  currency,
  capital,
  setCapital,
  riskAppetite,
  setRiskAppetite,
  portfolioNetRoi,
  portfolioNominalRoi,
  averageDefaultProb,
  matchedCount,
}) => {
  const t = TRANSLATIONS[language];

  // Capital presets
  const capitalPresets = [3000, 5000, 10000, 15000, 25000];

  // Get risk tier label and styling
  const getRiskMeta = (risk: number) => {
    if (risk <= 3) {
      return {
        label: t.riskUltraSafe,
        color: 'text-emerald-400',
        bg: 'bg-emerald-500/10 border-emerald-500/30',
        icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
        badgeText: 'Ultra Safe (Level 1-3)',
        gradient: 'from-emerald-500 to-teal-500',
        barColor: '#34d399',
        tagline: 'Capital Preservation • CIBIL 780+ Prime MSMEs',
      };
    } else if (risk <= 7) {
      return {
        label: t.riskBalanced,
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/10 border-cyan-500/30',
        icon: <Target className="w-4 h-4 text-cyan-400" />,
        badgeText: 'Balanced Growth (Level 4-7)',
        gradient: 'from-cyan-500 to-blue-500',
        barColor: '#22d3ee',
        tagline: 'Optimal Risk-Reward • CIBIL 710-775 Growth Ventures',
      };
    } else {
      return {
        label: t.riskAggressive,
        color: 'text-amber-400',
        bg: 'bg-amber-500/10 border-amber-500/30',
        icon: <Zap className="w-4 h-4 text-amber-400" />,
        badgeText: 'High Yield Alpha (Level 8-10)',
        gradient: 'from-amber-500 to-rose-500',
        barColor: '#f59e0b',
        tagline: 'Maximum Yield Alpha • CIBIL 670-715 Expanding Fleets',
      };
    }
  };

  const riskMeta = getRiskMeta(riskAppetite);

  return (
    <div className="relative overflow-hidden rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800/90 shadow-2xl">
      {/* Decorative background glow */}
      <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Tagline */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI MATCHMAKING ENGINE • REAL-TIME RE-RANKING</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t.appName}
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">
            {t.tagline}
          </p>
        </div>

        {/* Real-time Net ROI Callout Badge */}
        <div className="flex items-center gap-4 bg-slate-950/70 border border-emerald-500/30 rounded-xl p-3.5 sm:px-5 shadow-lg shadow-emerald-950/30">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center">
            <Percent className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>{t.netRoiHighlight}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono text-emerald-400 drop-shadow-sm">
                {portfolioNetRoi.toFixed(2)}%
              </span>
              <span className="text-xs text-slate-400 font-medium">
                (vs {(portfolioNominalRoi).toFixed(1)}% Nom.)
              </span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Risk Drag: -{(portfolioNominalRoi - portfolioNetRoi).toFixed(2)}% • Default: {(averageDefaultProb * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Slider 1: Total Investment Capital */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                <label htmlFor="capital-slider" className="text-sm font-semibold text-slate-200">
                  {t.capitalSliderTitle}
                </label>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.capitalSliderSubtitle}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white font-mono text-emerald-300">
                {formatCurrency(capital, currency)}
              </span>
            </div>
          </div>

          {/* Interactive Range Input */}
          <div className="space-y-2">
            <input
              id="capital-slider"
              type="range"
              min="2000"
              max="25000"
              step="500"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
              style={{
                background: `linear-gradient(to right, #34d399 0%, #10b981 ${((capital - 2000) / 23000) * 100}%, #1e293b ${((capital - 2000) / 23000) * 100}%, #1e293b 100%)`
              }}
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>{formatCurrency(2000, currency)}</span>
              <span>{formatCurrency(10000, currency)}</span>
              <span>{formatCurrency(25000, currency)}</span>
            </div>
          </div>

          {/* Capital Preset Quick Buttons */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="text-xs text-slate-400 mr-1">Quick Presets:</span>
            {capitalPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setCapital(preset)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                  capital === preset
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                {formatCurrency(preset, currency)}
              </button>
            ))}
          </div>
        </div>

        {/* Slider 2: Investor Risk Appetite / Strategy (1 to 10) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                {riskMeta.icon}
                <label htmlFor="risk-slider" className="text-sm font-semibold text-slate-200">
                  {t.riskSliderTitle}
                </label>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {riskMeta.tagline}
              </p>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${riskMeta.bg} ${riskMeta.color}`}>
                {riskMeta.icon}
                <span>Level {riskAppetite} / 10</span>
              </span>
            </div>
          </div>

          {/* Interactive Range Input */}
          <div className="space-y-2">
            <input
              id="risk-slider"
              type="range"
              min="1"
              max="10"
              step="1"
              value={riskAppetite}
              onChange={(e) => setRiskAppetite(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
              style={{
                background: `linear-gradient(to right, ${riskMeta.barColor} 0%, ${riskMeta.barColor} ${((riskAppetite - 1) / 9) * 100}%, #1e293b ${((riskAppetite - 1) / 9) * 100}%, #1e293b 100%)`
              }}
            />
            <div className="flex justify-between text-[11px] font-medium text-slate-400">
              <span className={riskAppetite <= 3 ? 'text-emerald-400 font-bold' : ''}>1 (Capital Defense)</span>
              <span className={riskAppetite >= 4 && riskAppetite <= 7 ? 'text-cyan-400 font-bold' : ''}>5 (Balanced)</span>
              <span className={riskAppetite >= 8 ? 'text-amber-400 font-bold' : ''}>10 (Max Yield)</span>
            </div>
          </div>

          {/* Risk Strategy Pills */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => setRiskAppetite(2)}
              className={`p-2 rounded-lg text-center text-xs transition-all border ${
                riskAppetite <= 3
                  ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Ultra Safe</span>
              </div>
              <span className="text-[10px] text-slate-400">1 - 3</span>
            </button>

            <button
              type="button"
              onClick={() => setRiskAppetite(5)}
              className={`p-2 rounded-lg text-center text-xs transition-all border ${
                riskAppetite >= 4 && riskAppetite <= 7
                  ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Target className="w-3 h-3 text-cyan-400" />
                <span>Balanced</span>
              </div>
              <span className="text-[10px] text-slate-400">4 - 7</span>
            </button>

            <button
              type="button"
              onClick={() => setRiskAppetite(9)}
              className={`p-2 rounded-lg text-center text-xs transition-all border ${
                riskAppetite >= 8
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 font-bold'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-center gap-1 mb-0.5">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Aggressive</span>
              </div>
              <span className="text-[10px] text-slate-400">8 - 10</span>
            </button>
          </div>
        </div>

      </div>

      {/* Explanatory Formula Callout (Mandatory Requirement) */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-3 bg-slate-950/40 p-3 rounded-xl">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-300 font-medium">
            {t.netRoiFormulaNote}
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-[11px] font-mono">
          <span className="text-emerald-400">✓ 50% Loss Penalty Modeled</span>
          <span className="text-slate-600">•</span>
          <span className="text-cyan-400">✓ Real-time useMemo Hook</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Briefcase, 
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { MatchResult, Language, Currency, Borrower } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { BorrowerCard } from './BorrowerCard';

interface BorrowerGridProps {
  matches: MatchResult[];
  language: Language;
  currency: Currency;
  onOpenExplainModal: (borrower: Borrower) => void;
  onFundSolo: (borrower: Borrower) => void;
}

type FilterCategory = 'ALL' | 'PUNE' | 'PCMC' | 'HIGH_YIELD' | 'AGRI_RETAIL';

export const BorrowerGrid: React.FC<BorrowerGridProps> = ({
  matches,
  language,
  currency,
  onOpenExplainModal,
  onFundSolo,
}) => {
  const t = TRANSLATIONS[language];
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered matches
  const filteredMatches = useMemo(() => {
    return matches.filter((item) => {
      const b = item.borrower;
      // Search text match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || (
        b.name.toLowerCase().includes(query) ||
        b.businessName.toLowerCase().includes(query) ||
        b.location.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query) ||
        b.loanPurpose.toLowerCase().includes(query)
      );

      if (!matchesSearch) return false;

      // Category tab filter
      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'PUNE') return b.region === 'Pune Metro';
      if (activeFilter === 'PCMC') return b.region === 'PCMC Industrial';
      if (activeFilter === 'HIGH_YIELD') return item.netRoi >= 15.0;
      if (activeFilter === 'AGRI_RETAIL') {
        return b.category === 'Agri & Dairy' || b.category === 'Retail' || b.category === 'Food Processing';
      }
      return true;
    });
  }, [matches, activeFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Title & Filter Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {t.topBorrowersTitle}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 font-mono">
              {filteredMatches.length} Matches
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {t.topBorrowersSubtitle}
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Kothrud, Dairy, Hinjawadi..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/90 border border-slate-800 focus:border-emerald-500 text-xs text-white placeholder-slate-400 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveFilter('ALL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === 'ALL'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          {t.filterAll}
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('PUNE')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === 'PUNE'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          {t.filterPune}
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('PCMC')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === 'PCMC'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          {t.filterPcmc}
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('HIGH_YIELD')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === 'HIGH_YIELD'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          {t.filterHighYield}
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('AGRI_RETAIL')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            activeFilter === 'AGRI_RETAIL'
              ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
              : 'bg-slate-900/80 text-slate-300 hover:text-white border border-slate-800'
          }`}
        >
          {t.filterAgri}
        </button>
      </div>

      {/* Grid of Borrower Cards */}
      {filteredMatches.length === 0 ? (
        <div className="rounded-2xl glass-panel p-12 text-center border border-slate-800 text-slate-400">
          <Briefcase className="w-10 h-10 mx-auto text-slate-600 mb-3" />
          <p className="text-base font-semibold text-slate-300">No matching Pune / PCMC borrowers found</p>
          <p className="text-xs text-slate-500 mt-1">Try relaxing your search terms or selecting another category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredMatches.map((match) => (
            <BorrowerCard
              key={match.borrower.id}
              match={match}
              language={language}
              currency={currency}
              onOpenExplainModal={onOpenExplainModal}
              onFundSolo={onFundSolo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { 
  FileText, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  PlusCircle, 
  ArrowRight,
  MapPin,
  Clock,
  Compass,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { ItemCard } from '../components/ItemCard';
import { findMatchesForReport } from '../utils/matchingEngine';

export const Dashboard = ({ 
  reports = [], 
  claims = [], 
  onSelectTab, 
  onSelectItem, 
  onSelectMatch 
}) => {
  // Dynamically derived summary numbers
  const openReportsCount = reports.filter((r) => r.status === 'Open').length;
  const returnedCount = reports.filter((r) => r.status === 'Returned').length;
  const pendingClaimsCount = claims.filter((c) => c.status === 'Pending Verification').length;

  // Find all candidate matches across all reports
  const allMatches = [];
  const lostReports = reports.filter((r) => r.type === 'lost');
  lostReports.forEach((lost) => {
    const candidateMatches = findMatchesForReport(lost, reports, 40);
    if (candidateMatches.length > 0) {
      allMatches.push(...candidateMatches);
    }
  });

  // De-duplicate matches
  const uniqueMatches = Array.from(
    new Map(allMatches.map((m) => [`${m.targetItem.id}-${m.candidateItem.id}`, m])).values()
  ).slice(0, 3);

  // Recent 4 reports
  const recentReports = [...reports]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 4);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome & Hero Banner */}
      <div className="bg-midnight-950 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-elevated border border-midnight-850">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lime-dim border border-lime-border text-lime text-xs font-mono uppercase font-bold">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
            {(() => {
              const hour = new Date().getHours();
              if (hour < 12) return 'Good Morning, Campus 👋';
              if (hour < 17) return 'Good Afternoon, Campus 👋';
              return 'Good Evening, Campus 👋';
            })()}
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            Lost something on campus? <br />
            <span className="text-lime">We're here to help you get it back.</span>
          </h1>

          <p className="text-sm sm:text-base text-midnight-300 leading-relaxed">
            From misplaced backpacks and water bottles to dorm keys and calculators — Foundly connects students with front desks across campus using smart, transparent matching.
          </p>

          <div className="flex items-center gap-3 pt-2 flex-wrap">
            <button
              onClick={() => onSelectTab('report')}
              className="px-5 py-3 rounded-xl bg-lime hover:bg-lime-hover text-midnight-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lime-glow active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Report an Item Now</span>
            </button>

            <button
              onClick={() => onSelectTab('explore')}
              className="px-5 py-3 rounded-xl bg-midnight-850 hover:bg-midnight-800 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 border border-midnight-700 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Browse All {reports.length} Reports</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary KPI Metrics (Derives numbers dynamically from live state) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Open Reports */}
        <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-midnight-400 mb-2">
            <span className="text-xs font-mono uppercase font-bold">Active Open Reports</span>
            <FileText className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-midnight-950">{openReportsCount}</span>
            <span className="text-xs text-midnight-500 font-medium">awaiting resolution</span>
          </div>
        </div>

        {/* KPI 2: Possible Matches */}
        <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-midnight-400 mb-2">
            <span className="text-xs font-mono uppercase font-bold">Possible Matches</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-midnight-950">{allMatches.length}</span>
            <span className="text-xs text-midnight-500 font-medium">candidate pairs</span>
          </div>
        </div>

        {/* KPI 3: Pending Claims */}
        <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-midnight-400 mb-2">
            <span className="text-xs font-mono uppercase font-bold">Pending Claims</span>
            <ShieldAlert className="w-4 h-4 text-rose-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-midnight-950">{pendingClaimsCount}</span>
            <span className="text-xs text-midnight-500 font-medium">in verification</span>
          </div>
        </div>

        {/* KPI 4: Successfully Returned */}
        <div className="p-5 rounded-2xl bg-white border border-warm-300 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between text-midnight-400 mb-2">
            <span className="text-xs font-mono uppercase font-bold">Items Returned</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-midnight-950">{returnedCount}</span>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> reunited
            </span>
          </div>
        </div>
      </div>

      {/* Suggested Candidate Matches Carousel / Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-midnight-950 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-lime bg-midnight-950 p-1 rounded-md" />
              <span>High-Confidence Match Suggestions</span>
            </h2>
            <p className="text-xs text-midnight-500 mt-0.5">
              Pairs flagged by our explainable rules-based relevance engine.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('explore')}
            className="text-xs font-bold text-midnight-800 hover:text-midnight-950 flex items-center gap-1 group"
          >
            <span>Explore All Items</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {uniqueMatches.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white border border-warm-300 text-center text-xs text-midnight-500">
            No active candidate matches calculated right now. Report a lost or found item to run the matching engine.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {uniqueMatches.map((m, idx) => (
              <div
                key={idx}
                onClick={() => onSelectMatch(m)}
                className="p-5 rounded-2xl bg-white border border-warm-300 hover:border-midnight-900 shadow-subtle hover:shadow-card transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-midnight-950 bg-lime px-2.5 py-1 rounded-lg">
                      {m.score}% Match Score
                    </span>
                    <span className="text-[11px] font-mono text-midnight-500">
                      {m.confidenceLabel}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-lost-badge font-bold block">
                      LOST: {m.targetItem.title}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-emerald-600 font-bold block mt-0.5">
                      FOUND: {m.candidateItem.title}
                    </span>
                  </div>

                  <p className="text-xs text-midnight-600 line-clamp-2">
                    {m.matchedFactors[0]?.detail || 'Strong metadata alignment found.'}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-warm-200 flex items-center justify-between text-xs font-bold text-midnight-950">
                  <span className="text-[11px] font-mono text-midnight-400">
                    {m.matchedFactors.length} matching rules
                  </span>
                  <span className="flex items-center gap-1 text-midnight-800 group-hover:text-midnight-950">
                    Inspect Match <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Campus Reports Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-midnight-950">
              Recent Campus Activity
            </h2>
            <p className="text-xs text-midnight-500 mt-0.5">
              Latest items reported lost or found across campus facilities.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('explore')}
            className="text-xs font-bold text-midnight-800 hover:text-midnight-950 flex items-center gap-1 group"
          >
            <span>View All ({reports.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentReports.map((item) => {
            const matches = findMatchesForReport(item, reports, 40);
            return (
              <ItemCard
                key={item.id}
                item={item}
                onSelect={onSelectItem}
                onFindMatches={() => {
                  if (matches.length > 0) {
                    onSelectMatch(matches[0]);
                  } else {
                    onSelectItem(item);
                  }
                }}
                matchCount={matches.length}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

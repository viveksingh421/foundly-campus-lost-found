import React, { useState } from 'react';
import { 
  FileText, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  PlusCircle,
  ShieldCheck,
  ArrowRight,
  Filter
} from 'lucide-react';
import { findMatchesForReport } from '../utils/matchingEngine';

export const MyReportsPage = ({ 
  reports = [], 
  onSelectItem, 
  onSelectMatch, 
  onInitiateReport,
  onUpdateStatus 
}) => {
  const [filterType, setFilterType] = useState('all'); // 'all' | 'lost' | 'found'

  const filteredReports = reports.filter((r) => {
    if (filterType === 'all') return true;
    return r.type === filterType;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-midnight-950 tracking-tight">
            My Campus Reports
          </h1>
          <p className="text-xs sm:text-sm text-midnight-500 mt-1">
            Track status updates, check automated candidate matches, and manage your reported items.
          </p>
        </div>

        <button
          onClick={onInitiateReport}
          className="px-4 py-2.5 rounded-xl bg-midnight-950 hover:bg-midnight-900 text-lime font-bold text-xs flex items-center gap-2 self-start sm:self-auto shadow-subtle"
        >
          <PlusCircle className="w-4 h-4 stroke-[2.5]" />
          <span>New Report</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-warm-200 rounded-xl w-fit border border-warm-300">
        {[
          { id: 'all', label: `All Reports (${reports.length})` },
          { id: 'lost', label: `Lost (${reports.filter(r => r.type === 'lost').length})` },
          { id: 'found', label: `Found (${reports.filter(r => r.type === 'found').length})` }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setFilterType(t.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterType === t.id
                ? 'bg-midnight-950 text-white shadow-subtle'
                : 'text-midnight-600 hover:text-midnight-950'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-warm-300 space-y-3">
          <FileText className="w-12 h-12 text-midnight-300 mx-auto opacity-50" />
          <h3 className="font-bold text-base text-midnight-950">No reports found in this category</h3>
          <p className="text-xs text-midnight-500 max-w-sm mx-auto">
            You haven't filed any reports in this section yet.
          </p>
          <button
            onClick={onInitiateReport}
            className="px-4 py-2 rounded-xl bg-lime text-midnight-950 font-bold text-xs shadow-subtle"
          >
            Create Your First Report
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReports.map((item) => {
            const matches = findMatchesForReport(item, reports, 35);
            const isLost = item.type === 'lost';

            return (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-white border border-warm-300 shadow-subtle hover:shadow-card transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left Item Details */}
                <div className="flex items-start gap-4">
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-warm-200 border border-warm-300 overflow-hidden shrink-0 flex items-center justify-center">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <FileText className="w-6 h-6 text-midnight-400" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                          isLost ? 'bg-amber-100 text-amber-800' : 'bg-lime text-midnight-950'
                        }`}
                      >
                        {isLost ? 'Lost Item' : 'Found Item'}
                      </span>
                      <span className="text-xs text-midnight-400 font-mono">
                        ID: {item.id}
                      </span>
                      {item.isSample && (
                        <span className="text-[10px] text-midnight-400 border border-warm-300 px-1.5 py-0.2 rounded font-mono">
                          Sample Data
                        </span>
                      )}
                    </div>

                    <h3 
                      onClick={() => onSelectItem(item)}
                      className="font-bold text-base text-midnight-950 hover:text-midnight-800 cursor-pointer"
                    >
                      {item.title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-midnight-500 font-medium">
                      <span>📍 {item.location}</span>
                      <span>• {new Date(item.dateTime).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Right Interactive Status & Matches */}
                <div className="flex items-center gap-3 self-end md:self-auto shrink-0 flex-wrap">
                  {/* Quick Status Select */}
                  <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-midnight-400 font-semibold">Status:</span>
                    <select
                      value={item.status || 'Open'}
                      onChange={(e) => onUpdateStatus(item.id, e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border border-warm-300 bg-warm-50 text-midnight-900 font-bold focus:outline-none"
                    >
                      <option value="Open">Open</option>
                      <option value="Potential Match">Potential Match</option>
                      <option value="Claim Pending">Claim Pending</option>
                      <option value="Returned">Returned</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>

                  {/* Matches Button */}
                  {matches.length > 0 && (
                    <button
                      onClick={() => onSelectMatch(matches[0])}
                      className="px-3 py-1.5 rounded-lg bg-lime-dim text-midnight-950 border border-lime-border text-xs font-bold flex items-center gap-1 hover:bg-lime/25 transition-colors"
                      title="Inspect explainable matching suggestions"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{matches.length} Match {matches.length === 1 ? 'Pair' : 'Pairs'}</span>
                    </button>
                  )}

                  <button
                    onClick={() => onSelectItem(item)}
                    className="px-3.5 py-1.5 rounded-lg border border-warm-300 hover:bg-warm-100 text-midnight-800 text-xs font-bold transition-colors"
                  >
                    View
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Calendar, 
  Tag, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  CheckCircle2,
  Lock,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { findMatchesForReport } from '../utils/matchingEngine';

export const ItemDetailModal = ({ 
  item, 
  allReports = [], 
  onClose, 
  onSelectMatch, 
  onInitiateClaim,
  onUpdateStatus 
}) => {
  const [selectedStatus, setSelectedStatus] = useState(item.status || 'Open');

  if (!item) return null;

  const isLost = item.type === 'lost';
  const matches = findMatchesForReport(item, allReports, 30);

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    if (onUpdateStatus) {
      onUpdateStatus(item.id, newStatus);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'Date not specified';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl border border-warm-300 shadow-elevated w-full max-w-3xl overflow-hidden my-6 animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="p-6 bg-midnight-950 text-white flex items-center justify-between border-b border-midnight-800">
          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                isLost
                  ? 'bg-lost-badge text-white'
                  : 'bg-lime text-midnight-950 font-black'
              }`}
            >
              {isLost ? 'LOST ITEM RECORD' : 'FOUND ITEM RECORD'}
            </span>
            <span className="text-midnight-400 font-mono text-xs">
              ID: {item.id}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-midnight-400 hover:text-white hover:bg-midnight-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Main Visual & Info Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Photo Box */}
            <div className="md:col-span-1 rounded-2xl bg-warm-200 border border-warm-300 h-56 overflow-hidden flex items-center justify-center relative shadow-inner">
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80';
                  }}
                />
              ) : (
                <div className="text-midnight-400 flex flex-col items-center gap-2 p-4 text-center">
                  <Tag className="w-10 h-10 opacity-30" />
                  <span className="text-xs font-mono uppercase">No photo uploaded</span>
                </div>
              )}
            </div>

            {/* Title & Metadata */}
            <div className="md:col-span-2 space-y-3">
              <div>
                <h2 className="text-2xl font-bold text-midnight-950 tracking-tight">
                  {item.title}
                </h2>
                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-warm-200 text-midnight-700 font-semibold capitalize">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-warm-200 text-midnight-700 font-semibold">
                    Color: {item.color}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-midnight-600 border-y border-warm-200 py-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-midnight-400 shrink-0" />
                  <span className="font-semibold text-midnight-900">Campus Location:</span>
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-midnight-400 shrink-0" />
                  <span className="font-semibold text-midnight-900">Date & Approximate Time:</span>
                  <span>{formatDate(item.dateTime)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-midnight-400 shrink-0" />
                  <span className="font-semibold text-midnight-900">Logged By:</span>
                  <span>{item.contactName || 'Campus Community Member'}</span>
                </div>
              </div>

              {/* Status Update Quick Control */}
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-mono uppercase text-midnight-500 font-bold">
                  Report Status:
                </span>
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border border-warm-300 bg-white text-midnight-900 focus:outline-none focus:border-midnight-800"
                >
                  <option value="Open">Open</option>
                  <option value="Potential Match">Potential Match</option>
                  <option value="Claim Pending">Claim Pending</option>
                  <option value="Returned">Returned</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-midnight-400 font-bold">
              Public Description
            </h4>
            <div className="p-4 rounded-xl bg-warm-50 border border-warm-200 text-sm text-midnight-800 leading-relaxed">
              {item.description}
            </div>
          </div>

          {/* Private Distinguishing Evidence Note (Security & Privacy) */}
          <div className="p-4 rounded-xl bg-midnight-950 text-white border border-midnight-850 flex items-start gap-3.5">
            <Lock className="w-5 h-5 text-lime shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-lime tracking-wide block">
                Ownership Verification Protocol
              </span>
              <p className="text-midnight-300 leading-relaxed">
                Distinguishing marks (internal engravings, stickers, exact contents) are kept strictly confidential by Foundly. Claimants must independently describe private proof during the claim process.
              </p>
            </div>
          </div>

          {/* Explainable AI Match Candidates Section */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono uppercase tracking-wider text-midnight-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Explainable Matches in Orbit ({matches.length})</span>
              </h4>
              <span className="text-xs text-midnight-500">
                Ranked by rule-based relevance
              </span>
            </div>

            {matches.length === 0 ? (
              <div className="p-6 rounded-2xl border border-dashed border-warm-300 text-center text-xs text-midnight-500 space-y-1">
                <p className="font-semibold text-midnight-800">No compatible matches found currently.</p>
                <p>We monitor newly reported items continuously and will update this record automatically.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {matches.map((m, idx) => (
                  <div
                    key={idx}
                    onClick={() => onSelectMatch(m)}
                    className="p-3.5 rounded-xl border border-warm-300 hover:border-midnight-950 bg-warm-50 hover:bg-white transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-midnight-950 text-lime font-black text-sm flex items-center justify-center shrink-0">
                        {m.score}%
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-midnight-950 text-xs sm:text-sm group-hover:text-midnight-800">
                            {m.candidateItem.title}
                          </h5>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${m.badgeColor}`}>
                            {m.confidenceLabel}
                          </span>
                        </div>
                        <p className="text-xs text-midnight-500 mt-0.5 line-clamp-1">
                          📍 {m.candidateItem.location} • {m.matchedFactors.length} matching dimensions
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bold text-midnight-800 group-hover:text-midnight-950">
                      <span>Inspect Match</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 border-t border-warm-200 bg-warm-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-midnight-600 hover:text-midnight-950 transition-colors"
          >
            Close Details
          </button>

          {!isLost && (
            <button
              onClick={() => onInitiateClaim(item)}
              className="px-5 py-2.5 rounded-xl bg-midnight-950 hover:bg-midnight-900 text-lime font-bold text-xs flex items-center gap-2 shadow-subtle hover:shadow-card active:scale-95 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Submit Ownership Claim</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

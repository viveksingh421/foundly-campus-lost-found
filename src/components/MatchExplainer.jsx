import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  Tag, 
  ShieldCheck, 
  ArrowRight, 
  Check, 
  AlertCircle,
  HelpCircle,
  FileText,
  X
} from 'lucide-react';

export const MatchExplainer = ({ match, onInitiateClaim, onClose }) => {
  if (!match) return null;

  const {
    score,
    confidenceLabel,
    badgeColor,
    matchedFactors = [],
    unmatchedFactors = [],
    targetItem,
    candidateItem,
    disclaimer
  } = match;

  const isTargetLost = targetItem?.type === 'lost';
  const lostItem = isTargetLost ? targetItem : candidateItem;
  const foundItem = isTargetLost ? candidateItem : targetItem;

  return (
    <div className="bg-white rounded-2xl border border-warm-300 shadow-elevated overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Header with Score and Title */}
      <div className="p-6 bg-midnight-950 text-white flex items-center justify-between border-b border-midnight-800">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-lime flex items-center justify-center text-midnight-950 font-black text-xl shadow-lime-glow shrink-0">
            {score}%
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white">
                Explainable Match Breakdown
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border ${badgeColor}`}>
                {confidenceLabel}
              </span>
            </div>
            <p className="text-xs text-midnight-400 mt-0.5">
              Transparent rules-based relevance score comparing {targetItem.title} with candidate.
            </p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-midnight-400 hover:text-white hover:bg-midnight-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-6 space-y-6">
        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Lost Report Card */}
          <div className="p-4 rounded-xl border border-lost-border bg-lost-bg/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                Lost Report (ID: {lostItem.id})
              </span>
              <span className="text-xs text-midnight-500 font-medium">
                Reported by {lostItem.contactName || 'Student'}
              </span>
            </div>
            <h4 className="font-bold text-midnight-950 text-sm">
              {lostItem.title}
            </h4>
            <p className="text-xs text-midnight-600 leading-relaxed">
              {lostItem.description}
            </p>
            <div className="text-[11px] text-midnight-500 space-y-1 pt-1 font-mono">
              <div>📍 Location: {lostItem.location}</div>
              <div>🎨 Color: {lostItem.color} • Category: {lostItem.category}</div>
              <div>🕒 Date: {new Date(lostItem.dateTime).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Found Report Card */}
          <div className="p-4 rounded-xl border border-lime-border bg-lime-dim/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase font-bold text-midnight-950 bg-lime px-2 py-0.5 rounded">
                Found Report (ID: {foundItem.id})
              </span>
              <span className="text-xs text-midnight-500 font-medium">
                Found by {foundItem.contactName || 'Desk'}
              </span>
            </div>
            <h4 className="font-bold text-midnight-950 text-sm">
              {foundItem.title}
            </h4>
            <p className="text-xs text-midnight-600 leading-relaxed">
              {foundItem.description}
            </p>
            <div className="text-[11px] text-midnight-500 space-y-1 pt-1 font-mono">
              <div>📍 Location: {foundItem.location}</div>
              <div>🎨 Color: {foundItem.color} • Category: {foundItem.category}</div>
              <div>🕒 Date: {new Date(foundItem.dateTime).toLocaleDateString()}</div>
            </div>
          </div>
        </div>

        {/* Explainability Breakdown Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Matched Signals */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-emerald-800">
              <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
              <span>Matching Signals ({matchedFactors.length})</span>
            </div>

            <div className="space-y-2">
              {matchedFactors.map((factor, i) => (
                <div key={i} className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs">
                  <div className="flex items-center justify-between font-bold text-emerald-950">
                    <span>{factor.field}</span>
                    <span className="text-emerald-700 font-mono">+{factor.points} pts</span>
                  </div>
                  <p className="text-emerald-800 mt-0.5 leading-relaxed">
                    {factor.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Gaps / Differences */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold text-midnight-700">
              <AlertCircle className="w-4 h-4 text-midnight-500" />
              <span>Unmatched or Uncertain Details ({unmatchedFactors.length})</span>
            </div>

            <div className="space-y-2">
              {unmatchedFactors.length === 0 ? (
                <div className="p-3 rounded-xl bg-warm-200/50 border border-warm-300 text-xs text-midnight-600 italic">
                  No major conflicting criteria detected between these reports.
                </div>
              ) : (
                unmatchedFactors.map((gap, i) => (
                  <div key={i} className="p-3 rounded-xl bg-warm-100 border border-warm-300 text-xs">
                    <span className="font-bold text-midnight-900 block">{gap.field}</span>
                    <p className="text-midnight-600 mt-0.5 leading-relaxed">
                      {gap.detail}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Academic / Privacy Disclaimer */}
        <div className="p-3.5 rounded-xl bg-midnight-50 border border-midnight-200 flex items-start gap-3">
          <HelpCircle className="w-4 h-4 text-midnight-500 shrink-0 mt-0.5" />
          <p className="text-xs text-midnight-600 leading-relaxed">
            <strong className="text-midnight-950 font-semibold">Verification Notice: </strong>
            {disclaimer} Private distinguishing details (such as engravings, serial numbers, or stickers) remain concealed to prevent false claims.
          </p>
        </div>

        {/* Action Bar */}
        <div className="pt-2 flex items-center justify-end gap-3 border-t border-warm-200">
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-midnight-700 hover:bg-warm-200 transition-colors"
            >
              Close Inspector
            </button>
          )}

          {onInitiateClaim && (
            <button
              onClick={() => onInitiateClaim(foundItem, lostItem)}
              className="px-5 py-2.5 rounded-xl bg-midnight-950 hover:bg-midnight-900 text-lime font-bold text-xs flex items-center gap-2 shadow-subtle hover:shadow-card active:scale-95 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Claim This Item (Verify Ownership)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

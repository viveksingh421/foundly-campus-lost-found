import React from 'react';
import { 
  MapPin, 
  Calendar, 
  Sparkles, 
  Tag, 
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const ItemCard = ({ item, onSelect, onFindMatches, matchCount = 0 }) => {
  const isLost = item.type === 'lost';

  const statusConfig = {
    'Open': { bg: 'bg-blue-50 text-blue-700 border-blue-200', icon: Clock },
    'Potential Match': { bg: 'bg-lime-dim text-midnight-950 border-lime-border font-bold', icon: Sparkles },
    'Claim Pending': { bg: 'bg-amber-50 text-amber-700 border-amber-200', icon: ShieldAlert },
    'Returned': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
    'Closed': { bg: 'bg-midnight-100 text-midnight-600 border-midnight-200', icon: CheckCircle2 }
  }[item.status || 'Open'] || { bg: 'bg-midnight-100 text-midnight-600 border-midnight-200', icon: Clock };

  const StatusIcon = statusConfig.icon;

  const formatDate = (isoString) => {
    if (!isoString) return 'Date not specified';
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', {
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
    <div 
      onClick={() => onSelect(item)}
      className="bg-white rounded-2xl border border-warm-300 hover:border-midnight-800 transition-all duration-200 shadow-subtle hover:shadow-card flex flex-col justify-between overflow-hidden group cursor-pointer"
    >
      <div>
        {/* Image / Thumbnail Container */}
        <div className="relative h-44 w-full bg-warm-200 overflow-hidden flex items-center justify-center">
          {item.imageUrl ? (
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80';
              }}
            />
          ) : (
            <div className="text-midnight-400 flex flex-col items-center gap-1">
              <Tag className="w-8 h-8 opacity-40" />
              <span className="text-xs font-mono uppercase text-midnight-400">Photo Unavailable</span>
            </div>
          )}

          {/* Type Badge: LOST vs FOUND */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span
              className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm flex items-center gap-1 ${
                isLost
                  ? 'bg-lost-badge text-white'
                  : 'bg-midnight-950 text-lime border border-lime/30'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isLost ? 'bg-white' : 'bg-lime'}`} />
              {isLost ? 'LOST REPORT' : 'FOUND REPORT'}
            </span>
          </div>

          {/* Status Badge */}
          <div className="absolute top-3 right-3">
            <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium border flex items-center gap-1 backdrop-blur-md shadow-sm ${statusConfig.bg}`}>
              <StatusIcon className="w-3 h-3" />
              <span>{item.status || 'Open'}</span>
            </span>
          </div>

          {/* Matched Pairs Pill if available */}
          {matchCount > 0 && (
            <div className="absolute bottom-2 left-3 bg-midnight-950/90 text-lime text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-lime/40 backdrop-blur-md flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>{matchCount} Candidate {matchCount === 1 ? 'Match' : 'Matches'}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-midnight-950 text-base leading-snug group-hover:text-midnight-800 transition-colors line-clamp-1">
              {item.title}
            </h3>
          </div>

          <p className="text-xs text-midnight-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>

          {/* Location & Time Pills */}
          <div className="space-y-1.5 pt-1 text-xs text-midnight-500 font-medium">
            <div className="flex items-center gap-1.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-midnight-400 shrink-0" />
              <span className="truncate">{item.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-midnight-400 shrink-0" />
              <span>{formatDate(item.dateTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 pt-3 border-t border-warm-200 bg-warm-50 flex items-center justify-between text-xs font-semibold">
        <span className="text-midnight-400 font-mono text-[11px]">
          ID: {item.id}
        </span>

        <div className="flex items-center gap-2">
          {onFindMatches && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onFindMatches(item);
              }}
              className="text-midnight-800 hover:text-midnight-950 underline flex items-center gap-1 text-[11px] font-mono"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              Check Matches
            </button>
          )}

          <span className="text-midnight-800 group-hover:text-midnight-950 flex items-center gap-1">
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
};

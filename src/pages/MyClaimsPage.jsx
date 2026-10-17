import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Tag, 
  Calendar,
  Lock,
  ArrowRight
} from 'lucide-react';

export const MyClaimsPage = ({ claims = [], onUpdateClaimStatus, onSelectItemById }) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredClaims = claims.filter((c) => {
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-midnight-950 tracking-tight">
          My Verification Claims
        </h1>
        <p className="text-xs sm:text-sm text-midnight-500 mt-1">
          Review ownership claims submitted for found items. Evidence remains confidential between you and the campus desk.
        </p>
      </div>

      {/* Claims List */}
      {filteredClaims.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white border border-warm-300 space-y-3">
          <ShieldCheck className="w-12 h-12 text-midnight-300 mx-auto opacity-50" />
          <h3 className="font-bold text-base text-midnight-950">No claims submitted yet</h3>
          <p className="text-xs text-midnight-500 max-w-sm mx-auto">
            When you identify a found item that matches your lost property, submit a verification claim to begin recovery.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredClaims.map((claim) => (
            <div
              key={claim.id}
              className="p-6 rounded-3xl bg-white border border-warm-300 shadow-subtle space-y-4"
            >
              {/* Claim Top Line */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-warm-200">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center text-midnight-950 font-bold">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-midnight-950">
                      {claim.itemTitle}
                    </h3>
                    <span className="text-[11px] font-mono text-midnight-500">
                      Target Report ID: {claim.reportId} • Claim ID: {claim.id}
                    </span>
                  </div>
                </div>

                {/* Status Badge & Dropdown */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-midnight-500 font-semibold">
                    Verification State:
                  </span>
                  <select
                    value={claim.status}
                    onChange={(e) => onUpdateClaimStatus(claim.id, e.target.value)}
                    className="px-3 py-1.5 text-xs font-bold rounded-xl border border-warm-300 bg-warm-50 text-midnight-900 focus:outline-none"
                  >
                    <option value="Pending Verification">Pending Verification</option>
                    <option value="Approved">Approved for Pickup</option>
                    <option value="Resolved / Returned">Resolved / Returned</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              {/* Claimant Information & Evidence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-warm-50 border border-warm-200 space-y-1.5">
                  <span className="font-mono text-midnight-400 uppercase font-bold text-[10px] block">
                    Claimant Contact
                  </span>
                  <div className="font-bold text-midnight-900 text-sm">
                    {claim.claimantName}
                  </div>
                  <div className="text-midnight-600">
                    📧 {claim.claimantContact}
                  </div>
                  <div className="text-midnight-400 text-[11px]">
                    Submitted: {new Date(claim.submittedAt).toLocaleString()}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-midnight-950 text-white border border-midnight-850 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lime uppercase font-bold text-[10px] flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Confidential Proof Given
                    </span>
                    <span className="text-[10px] text-midnight-400 font-mono">
                      Staff Eye Only
                    </span>
                  </div>
                  <p className="text-midnight-300 leading-relaxed font-sans">
                    "{claim.evidenceDescription}"
                  </p>
                </div>
              </div>

              {/* Demo Action Footer */}
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-midnight-400 text-[11px]">
                  Campus Desk Protocol active.
                </span>

                <button
                  onClick={() => onSelectItemById(claim.reportId)}
                  className="text-xs font-bold text-midnight-800 hover:text-midnight-950 flex items-center gap-1"
                >
                  <span>View Original Found Item Record</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

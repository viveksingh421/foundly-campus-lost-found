import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  Lock,
  ArrowRight
} from 'lucide-react';

export const ClaimModal = ({ item, lostItem, onClose, onSubmitClaim }) => {
  const [claimantName, setClaimantName] = useState('');
  const [claimantContact, setClaimantContact] = useState('');
  const [evidenceDescription, setEvidenceDescription] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!claimantName.trim()) {
      setError('Please provide your full name or student ID.');
      return;
    }
    if (!claimantContact.trim()) {
      setError('Please provide a campus email or contact number.');
      return;
    }
    if (!evidenceDescription.trim() || evidenceDescription.trim().length < 15) {
      setError('Please describe confidential identifying proof (at least 15 characters).');
      return;
    }

    const newClaim = {
      id: 'claim-' + Date.now().toString(36),
      reportId: item.id,
      itemTitle: item.title,
      claimantName: claimantName.trim(),
      claimantContact: claimantContact.trim(),
      evidenceDescription: evidenceDescription.trim(),
      status: 'Pending Verification',
      submittedAt: new Date().toISOString(),
      isSample: false
    };

    onSubmitClaim(newClaim, item.id);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl border border-warm-300 shadow-elevated w-full max-w-lg overflow-hidden my-6 animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="p-6 bg-midnight-950 text-white flex items-center justify-between border-b border-midnight-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center text-midnight-950 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Submit Ownership Claim
              </h3>
              <p className="text-xs text-midnight-400">
                Found Item Verification Protocol
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-midnight-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success State */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-lg text-midnight-950">
                Claim Submitted Successfully!
              </h4>
              <p className="text-xs text-midnight-600 max-w-sm mx-auto leading-relaxed">
                Your identifying proof for <strong className="text-midnight-900">{item.title}</strong> has been logged into your <span className="font-semibold text-midnight-950">My Claims</span> tab.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-warm-100 border border-warm-200 text-xs text-midnight-700 text-left space-y-1">
              <div className="font-mono text-midnight-500 font-bold">DEMO NOTICE</div>
              <p>
                In this frontend hackathon demo, the item's status has automatically transitioned to <strong>Claim Pending</strong>. Campus security or desk admins would match your description before handing over the item.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-midnight-950 text-lime font-bold text-xs shadow-subtle hover:bg-midnight-900 transition-colors"
            >
              Done & View Updated Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Target Item summary badge */}
            <div className="p-3.5 rounded-xl bg-warm-100 border border-warm-200 text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-midnight-500 font-bold block">
                  Claiming Found Item
                </span>
                <span className="font-bold text-midnight-950 text-sm">
                  {item.title}
                </span>
              </div>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-lime-dim text-midnight-950 font-bold">
                ID: {item.id}
              </span>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Claimant Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-mono uppercase font-bold text-midnight-700 block mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={claimantName}
                  onChange={(e) => setClaimantName(e.target.value)}
                  placeholder="e.g. Jordan Smith (Student)"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase font-bold text-midnight-700 block mb-1">
                  Campus Email / Phone *
                </label>
                <input
                  type="text"
                  required
                  value={claimantContact}
                  onChange={(e) => setClaimantContact(e.target.value)}
                  placeholder="jordan.s@university.edu"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800"
                />
              </div>
            </div>

            {/* Distinguishing Evidence Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-mono uppercase font-bold text-midnight-700">
                  Hidden / Distinguishing Evidence *
                </label>
                <span className="text-[10px] text-midnight-400 font-mono">
                  Never made public
                </span>
              </div>
              <textarea
                required
                rows={3}
                value={evidenceDescription}
                onChange={(e) => setEvidenceDescription(e.target.value)}
                placeholder="Describe specific internal scratches, sticker names, custom engravings, passcode hints, or exact contents inside that only the true owner would know."
                className="w-full px-3 py-2 text-xs rounded-xl border border-warm-300 focus:outline-none focus:border-midnight-800 leading-relaxed"
              />
              <p className="text-[11px] text-midnight-500 mt-1">
                This evidence is reviewed strictly by desk staff during pickup.
              </p>
            </div>

            {/* Demo Notice */}
            <div className="p-3 rounded-xl bg-midnight-50 border border-midnight-200 flex items-start gap-2.5 text-xs text-midnight-600">
              <Lock className="w-4 h-4 text-midnight-500 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong className="font-semibold text-midnight-900">Prototype Demo Flow:</strong> Real-world biometric or official student ID verification is handled physically at the campus desk. This interface securely orchestrates the claim request.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-warm-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-bold text-midnight-600 hover:text-midnight-950"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-midnight-950 hover:bg-midnight-900 text-lime font-bold text-xs flex items-center gap-2 shadow-subtle hover:shadow-card active:scale-95 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Submit Verification Claim</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

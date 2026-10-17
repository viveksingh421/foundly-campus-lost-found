import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileNavbar } from './components/MobileNavbar';
import { Dashboard } from './pages/Dashboard';
import { ExplorePage } from './pages/ExplorePage';
import { ReportItemPage } from './pages/ReportItemPage';
import { MyReportsPage } from './pages/MyReportsPage';
import { MyClaimsPage } from './pages/MyClaimsPage';
import { ItemDetailModal } from './components/ItemDetailModal';
import { MatchExplainer } from './components/MatchExplainer';
import { ClaimModal } from './components/ClaimModal';
import { loadReports, saveReports, loadClaims, saveClaims, resetDemoData } from './utils/storage';
import { RotateCcw, AlertTriangle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'explore' | 'report' | 'my-reports' | 'my-claims'
  const [reports, setReports] = useState(() => loadReports());
  const [claims, setClaims] = useState(() => loadClaims());
  
  // Modals & Panels state
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [claimingItem, setClaimingItem] = useState(null);
  const [claimingLostItem, setClaimingLostItem] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Sync state to localStorage whenever changed
  useEffect(() => {
    saveReports(reports);
  }, [reports]);

  useEffect(() => {
    saveClaims(claims);
  }, [claims]);

  // Handle adding new report
  const handleAddReport = (newReport) => {
    setReports((prev) => [newReport, ...prev]);
  };

  // Handle updating report status
  const handleUpdateStatus = (reportId, newStatus) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: newStatus } : r))
    );
    if (selectedItem && selectedItem.id === reportId) {
      setSelectedItem((prev) => ({ ...prev, status: newStatus }));
    }
  };

  // Handle submitting a verification claim
  const handleSubmitClaim = (newClaim, reportId) => {
    setClaims((prev) => [newClaim, ...prev]);
    // Transition target item to 'Claim Pending' automatically
    handleUpdateStatus(reportId, 'Claim Pending');
  };

  // Handle updating claim status
  const handleUpdateClaimStatus = (claimId, newStatus) => {
    setClaims((prev) =>
      prev.map((c) => (c.id === claimId ? { ...c, status: newStatus } : c))
    );
  };

  // Reset Demo Data
  const handlePerformReset = () => {
    const fresh = resetDemoData();
    if (fresh) {
      setReports(fresh.reports);
      setClaims(fresh.claims);
      setShowResetConfirm(false);
      setSelectedItem(null);
      setSelectedMatch(null);
      setClaimingItem(null);
    }
  };

  return (
    <div className="min-h-screen bg-warm-100 flex flex-col md:flex-row text-midnight-900 font-sans selection:bg-lime selection:text-midnight-950">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          onResetData={() => setShowResetConfirm(true)}
          counts={{
            totalItems: reports.length,
            myReports: reports.length,
            myClaims: claims.length
          }}
        />
      </div>

      {/* Mobile Top Navbar & Tab Bar */}
      <MobileNavbar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onResetData={() => setShowResetConfirm(true)}
        counts={{
          totalItems: reports.length,
          myReports: reports.length,
          myClaims: claims.length
        }}
      />

      {/* Main Content Viewport - Expansive responsive layout across all screens */}
      <main className="flex-1 min-w-0 p-5 sm:p-7 lg:p-9 pb-20 md:pb-10 w-full">
        {activeTab === 'dashboard' && (
          <Dashboard
            reports={reports}
            claims={claims}
            onSelectTab={setActiveTab}
            onSelectItem={setSelectedItem}
            onSelectMatch={setSelectedMatch}
          />
        )}

        {activeTab === 'explore' && (
          <ExplorePage
            reports={reports}
            onSelectItem={setSelectedItem}
            onSelectMatch={setSelectedMatch}
            onInitiateReport={() => setActiveTab('report')}
          />
        )}

        {activeTab === 'report' && (
          <ReportItemPage
            onSubmitReport={(report) => {
              handleAddReport(report);
            }}
            onCancel={() => setActiveTab('dashboard')}
          />
        )}

        {activeTab === 'my-reports' && (
          <MyReportsPage
            reports={reports}
            onSelectItem={setSelectedItem}
            onSelectMatch={setSelectedMatch}
            onInitiateReport={() => setActiveTab('report')}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {activeTab === 'my-claims' && (
          <MyClaimsPage
            claims={claims}
            onUpdateClaimStatus={handleUpdateClaimStatus}
            onSelectItemById={(id) => {
              const found = reports.find((r) => r.id === id);
              if (found) setSelectedItem(found);
            }}
          />
        )}
      </main>

      {/* Modals & Overlays */}

      {/* 1. Item Details Modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          allReports={reports}
          onClose={() => setSelectedItem(null)}
          onSelectMatch={(match) => {
            setSelectedItem(null);
            setSelectedMatch(match);
          }}
          onInitiateClaim={(foundObj) => {
            setSelectedItem(null);
            setClaimingItem(foundObj);
          }}
          onUpdateStatus={handleUpdateStatus}
        />
      )}

      {/* 2. Explainable Match Modal / Panel */}
      {selectedMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
          <div className="max-w-3xl w-full my-6">
            <MatchExplainer
              match={selectedMatch}
              onClose={() => setSelectedMatch(null)}
              onInitiateClaim={(foundObj, lostObj) => {
                setSelectedMatch(null);
                setClaimingItem(foundObj);
                setClaimingLostItem(lostObj);
              }}
            />
          </div>
        </div>
      )}

      {/* 3. Submit Claim Modal */}
      {claimingItem && (
        <ClaimModal
          item={claimingItem}
          lostItem={claimingLostItem}
          onClose={() => {
            setClaimingItem(null);
            setClaimingLostItem(null);
          }}
          onSubmitClaim={(claim, targetReportId) => {
            handleSubmitClaim(claim, targetReportId);
          }}
        />
      )}

      {/* 4. Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-elevated space-y-4 border border-warm-300">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-midnight-950">
                Reset Demo Data?
              </h3>
            </div>
            <p className="text-xs text-midnight-600 leading-relaxed">
              This will restore the 11 original campus sample reports and claims, wiping out any custom user additions stored in your browser's local state.
            </p>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-midnight-600 hover:bg-warm-100"
              >
                Cancel
              </button>
              <button
                onClick={handlePerformReset}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-subtle flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Sample Data</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

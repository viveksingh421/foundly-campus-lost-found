import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  PlusCircle, 
  FileText, 
  ShieldCheck,
  Menu,
  X,
  RotateCcw
} from 'lucide-react';

export const MobileNavbar = ({ activeTab, onSelectTab, onResetData, counts = {} }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explore', label: 'Explore', icon: Compass, count: counts.totalItems },
    { id: 'report', label: 'Report Item', icon: PlusCircle, isHighlight: true },
    { id: 'my-reports', label: 'My Reports', icon: FileText, count: counts.myReports },
    { id: 'my-claims', label: 'My Claims', icon: ShieldCheck, count: counts.myClaims },
  ];

  const handleSelect = (tabId) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Mobile Bar */}
      <header className="md:hidden bg-midnight-950 border-b border-midnight-800 px-4 py-3 sticky top-0 z-40 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime flex items-center justify-center text-midnight-950 font-black text-base shadow-lime-glow">
            F
          </div>
          <span className="font-bold text-base text-white tracking-tight">FOUNDLY</span>
          <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-lime-dim text-lime border border-lime-border font-semibold">
            Campus
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectTab('report')}
            className="px-2.5 py-1.5 rounded-lg bg-lime text-midnight-950 text-xs font-bold flex items-center gap-1 active:scale-95 transition-transform"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Report</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-midnight-300 hover:text-white hover:bg-midnight-800 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Slide-out Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-midnight-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-midnight-950 border-b border-midnight-800 p-4 space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-midnight-850">
              <span className="text-xs font-mono uppercase text-midnight-400 font-bold">
                Platform Navigation
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-md text-midnight-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-all ${
                      isActive
                        ? 'bg-lime text-midnight-950 font-black'
                        : 'text-white hover:bg-midnight-850'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-white" />
                      <span className="text-white">{item.label}</span>
                    </div>
                    {item.count !== undefined && item.count !== null && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-midnight-800 text-white font-mono font-bold">
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-midnight-850 flex justify-between items-center">
              <button
                onClick={() => {
                  onResetData();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 py-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Demo Records</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sticky Tab Bar for Fast Mobile Actions */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-midnight-950/95 backdrop-blur-md border-t border-midnight-850 z-40 flex items-center justify-around py-2 px-1">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                isActive
                  ? 'text-lime font-bold'
                  : 'text-midnight-400 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

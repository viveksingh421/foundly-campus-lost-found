import React from 'react';
import { 
  LayoutDashboard, 
  Compass, 
  PlusCircle, 
  FileText, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export const Sidebar = ({ activeTab, onSelectTab, onResetData, counts = {} }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explore', label: 'Explore Items', icon: Compass, count: counts.totalItems },
    { id: 'report', label: 'Report an Item', icon: PlusCircle, isHighlight: true },
    { id: 'my-reports', label: 'My Reports', icon: FileText, count: counts.myReports },
    { id: 'my-claims', label: 'My Claims', icon: ShieldCheck, count: counts.myClaims },
  ];

  return (
    <aside className="w-64 bg-midnight-950 border-r border-midnight-800 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-midnight-850">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime flex items-center justify-center text-midnight-950 font-black text-xl shadow-lime-glow">
              F
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg text-white tracking-tight">FOUNDLY</span>
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-lime-dim text-lime border border-lime-border font-semibold">
                  Campus
                </span>
              </div>
              <p className="text-xs text-midnight-400 font-medium leading-tight">
                Lost something? Bring it back.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-4 space-y-1.5">
          <div className="px-3 pb-2 text-[11px] font-mono uppercase tracking-wider text-midnight-500 font-semibold">
            Platform Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  isActive
                    ? 'bg-lime text-midnight-950 font-bold shadow-subtle'
                    : item.isHighlight
                    ? 'text-white bg-midnight-850/80 hover:bg-midnight-800 border border-midnight-700/60'
                    : 'text-midnight-400 hover:text-white hover:bg-midnight-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive
                        ? 'text-midnight-950 stroke-[2.5]'
                        : item.isHighlight
                        ? 'text-lime'
                        : 'text-midnight-400 group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.count !== undefined && item.count !== null && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-mono font-semibold ${
                      isActive
                        ? 'bg-midnight-950/20 text-midnight-950'
                        : 'bg-midnight-800 text-midnight-400 group-hover:text-white'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info & Reset Demo Data */}
      <div className="p-4 border-t border-midnight-850 space-y-3">
        {/* Campus Status Card */}
        <div className="p-3 rounded-xl bg-midnight-900 border border-midnight-800 text-xs">
          <div className="flex items-center justify-between text-midnight-300 font-medium mb-1">
            <span className="flex items-center gap-1.5 text-lime">
              <span className="w-2 h-2 rounded-full bg-lime animate-ping" />
              Live Campus Desk
            </span>
            <span className="text-midnight-400 text-[11px]">PS 02</span>
          </div>
          <p className="text-midnight-400 text-[11px] leading-relaxed">
            Explainable AI matching active with local browser state.
          </p>
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={onResetData}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-midnight-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
          title="Reset sample reports and claims to factory state"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample Data</span>
        </button>
      </div>
    </aside>
  );
};

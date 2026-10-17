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
    <aside className="w-80 bg-midnight-950 border-r border-midnight-800 flex flex-col justify-between h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div>
        <div className="p-6 border-b border-midnight-850">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-lime flex items-center justify-center text-midnight-950 font-black text-2xl shadow-lime-glow shrink-0">
              F
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-2xl text-white tracking-tight">FOUNDLY</span>
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-md bg-lime-dim text-lime border border-lime-border font-bold">
                  Campus
                </span>
              </div>
              <p className="text-sm text-midnight-300 font-medium leading-tight mt-0.5">
                Lost something? Bring it back.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-4 space-y-2">
          <div className="px-3 pb-1 text-xs font-mono uppercase tracking-wider text-lime font-bold">
            Platform Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-base font-bold transition-all group ${
                  isActive
                    ? 'bg-lime text-midnight-950 font-black shadow-subtle'
                    : item.isHighlight
                    ? 'text-white bg-midnight-800 hover:bg-midnight-750 border border-lime/40 shadow-sm'
                    : 'text-white hover:text-white hover:bg-midnight-850'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      isActive
                        ? 'text-midnight-950 stroke-[2.5]'
                        : item.isHighlight
                        ? 'text-lime stroke-[2.5]'
                        : 'text-white group-hover:text-lime'
                    }`}
                  />
                  <span className="text-white">{item.label}</span>
                </div>

                {item.count !== undefined && item.count !== null && (
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-midnight-950 text-lime font-black'
                        : 'bg-midnight-800 text-white group-hover:bg-midnight-700 border border-midnight-700'
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
      <div className="p-5 border-t border-midnight-850 space-y-3">
        {/* Campus Status Card */}
        <div className="p-3.5 rounded-2xl bg-midnight-900 border border-midnight-800 text-sm">
          <div className="flex items-center justify-between text-white font-bold mb-1">
            <span className="flex items-center gap-2 text-lime font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-lime animate-ping" />
              Campus Help Desk Online
            </span>
            <span className="text-lime text-xs font-mono font-bold">24/7</span>
          </div>
          <p className="text-white/90 text-xs leading-relaxed font-medium">
            Helping students & staff reunite with lost belongings every day.
          </p>
        </div>

        {/* Reset Demo Data Button */}
        <button
          onClick={onResetData}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold text-white hover:text-rose-300 hover:bg-rose-500/15 rounded-xl transition-colors border border-midnight-800 hover:border-rose-500/30"
          title="Reset sample reports and claims to factory state"
        >
          <RotateCcw className="w-4 h-4 text-white" />
          <span>Reset Sample Data</span>
        </button>
      </div>
    </aside>
  );
};

'use client';
import React, { useState } from 'react';
import { flowStore } from '@/lib/store';
import { 
  LayoutDashboard, FileText, Calendar, Building2, ShieldAlert, 
  Settings, Search, Bell, LogOut, ChevronRight, Menu, X, 
  Layers, AlertTriangle, ShieldCheck, Cpu, Download, Sparkles
} from 'lucide-react';
import { User, Role, SystemNotification } from '@/types';

interface ShellProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
  onOpenAppDetail: (appId: string) => void;
}

export default function Shell({ currentTab, onSelectTab, onLogout, children, onOpenAppDetail }: ShellProps) {
  const [storeState, setStoreState] = React.useState(flowStore.getState());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [demoPanelOpen, setDemoPanelOpen] = useState(false);

  React.useEffect(() => {
    const unsub = flowStore.subscribe(() => {
      setStoreState(flowStore.getState());
    });
    return unsub;
  }, []);

  const { currentUser, applications, notifications } = storeState;

  const getNavItems = (role: Role) => {
    const groups = [
      {
        title: 'OVERVIEW',
        items: [
          { id: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard, roles: ['BUREAU_HEAD', 'ADMIN', 'REGIONAL_OFFICER'] },
          { id: 'institution_portal', label: 'Institution Portal', icon: Building2, roles: ['INSTITUTION'] },
        ]
      },
      {
        title: 'APPLICATION OPERATIONS',
        items: [
          { id: 'applications', label: 'All Applications', icon: FileText, roles: ['ADMIN', 'REGIONAL_OFFICER', 'BUREAU_HEAD', 'COMPETENT_AUTHORITY', 'LEGAL_CELL'] },
          { id: 'work_queue', label: 'My Work Queue', icon: Layers, roles: ['REGIONAL_OFFICER'] },
          { id: 'sla_monitoring', label: 'SLA Monitoring', icon: AlertTriangle, roles: ['ADMIN', 'REGIONAL_OFFICER', 'BUREAU_HEAD'] },
        ]
      },
      {
        title: 'EVC OPERATIONS',
        items: [
          { id: 'evc_scheduling', label: 'EVC Scheduling & Map', icon: Calendar, roles: ['ADMIN', 'REGIONAL_OFFICER', 'EVC_MEMBER'] },
        ]
      },
      {
        title: 'INSTITUTIONAL COMPLIANCE',
        items: [
          { id: 'compliance_genome', label: 'Compliance Genome', icon: ShieldCheck, roles: ['ADMIN', 'REGIONAL_OFFICER', 'BUREAU_HEAD', 'INSTITUTION'] },
          { id: 'undertakings', label: 'Time-Bound Undertakings', icon: FileText, roles: ['ADMIN', 'REGIONAL_OFFICER', 'INSTITUTION'] },
          { id: 'documents', label: 'Document Validity & Hash', icon: Layers, roles: ['ADMIN', 'REGIONAL_OFFICER', 'INSTITUTION'] },
        ]
      },
      {
        title: 'INTELLIGENCE',
        items: [
          { id: 'pendency_map', label: 'Regional Pendency Map', icon: LayoutDashboard, roles: ['BUREAU_HEAD', 'ADMIN', 'REGIONAL_OFFICER'] },
          { id: 'delay_cost', label: 'Delay Cost Calculus', icon: Cpu, roles: ['BUREAU_HEAD', 'ADMIN'] },
          { id: 'bottleneck_forecast', label: 'Bottleneck Forecast', icon: AlertTriangle, roles: ['BUREAU_HEAD', 'ADMIN'] },
        ]
      },
      {
        title: 'ACCOUNTABILITY',
        items: [
          { id: 'escalation_center', label: 'Escalation Center', icon: ShieldAlert, roles: ['BUREAU_HEAD', 'REGIONAL_OFFICER', 'COMPETENT_AUTHORITY'] },
          { id: 'risk_registry', label: 'Deemed Approval Risk', icon: AlertTriangle, roles: ['BUREAU_HEAD', 'LEGAL_CELL', 'ADMIN'] },
          { id: 'audit_ledger', label: 'SHA-256 Audit Ledger', icon: ShieldCheck, roles: ['ADMIN', 'BUREAU_HEAD', 'LEGAL_CELL'] },
          { id: 'legal_registry', label: 'Writ Petition Registry', icon: FileText, roles: ['LEGAL_CELL', 'BUREAU_HEAD'] },
        ]
      },
      {
        title: 'ADMINISTRATION',
        items: [
          { id: 'workflow_config', label: 'Workflow Configuration', icon: Settings, roles: ['ADMIN'] },
        ]
      }
    ];

    return groups.map(group => ({
      ...group,
      items: group.items.filter(item => item.roles.includes(role))
    })).filter(group => group.items.length > 0);
  };

  const navGroups = getNavItems(currentUser.role);
  const unreadCount = notifications.filter(n => !n.read).length;

  const searchResults = searchQuery.trim() === '' ? [] : applications.filter(app => 
    app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.assignedOfficer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-[#f8f9ff] text-[#0b1c30]">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-[#0b1c30] text-white transition-all duration-200 flex flex-col z-20 border-r border-[#142b4a] shadow-lg`}>
        <div className="h-14 px-4 flex items-center justify-between border-b border-[#142b4a] bg-[#071322]">
          {sidebarOpen ? (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded bg-[#2563eb] flex items-center justify-center font-bold text-sm">
                AF
              </div>
              <div>
                <span className="font-bold text-sm tracking-tight font-['Space_Grotesk']">AICTE FlowGuard</span>
                <span className="block text-[10px] text-[#b2c7ee] font-mono">SIH 26262 BUREAU</span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 rounded bg-[#2563eb] flex items-center justify-center font-bold text-sm mx-auto">
              AF
            </div>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-[#b2c7ee] hover:text-white p-1 rounded"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
          {navGroups.map(group => (
            <div key={group.title}>
              {sidebarOpen && (
                <h3 className="text-[10px] font-mono uppercase tracking-wider text-[#7d93b7] mb-2 px-2">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => onSelectTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-xs transition-colors ${
                        isActive 
                          ? 'bg-[#2563eb] text-white font-medium shadow-sm' 
                          : 'text-[#d3e4fe] hover:bg-[#142b4a] hover:text-white'
                      }`}
                      title={!sidebarOpen ? item.label : undefined}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {sidebarOpen && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-[#142b4a] bg-[#071322]">
          {sidebarOpen ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 truncate">
                <div className="w-8 h-8 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-bold text-xs">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="truncate">
                  <p className="text-xs font-semibold text-white truncate">{currentUser.name}</p>
                  <p className="text-[10px] text-[#b2c7ee] font-mono truncate">{currentUser.role}</p>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="text-[#b2c7ee] hover:text-red-400 p-1.5 rounded transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={onLogout}
              className="mx-auto block text-[#b2c7ee] hover:text-red-400 p-1.5 rounded transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-[#e2e8f0] px-6 flex items-center justify-between z-10 shadow-xs">
          <div className="flex items-center space-x-4 flex-1 max-w-xl">
            <div className="flex items-center space-x-2 text-xs font-mono text-[#64748B]">
              <span>AICTE BUREAU</span>
              <ChevronRight className="w-3 h-3 text-[#cbd5e1]" />
              <span className="text-[#0b1c30] font-semibold capitalize">{currentTab.replace('_', ' ')}</span>
            </div>

            <div className="relative flex-1 max-w-sm">
              <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#74777e]">
                <Search className="w-3.5 h-3.5" />
              </span>
              <input
                type="text"
                placeholder="Search APP-8892, institution, district..."
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                className="w-full pl-8 pr-3 py-1.5 text-xs border border-[#cbd5e1] rounded-sm bg-[#f8f9ff] focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-[#0b1c30]"
              />

              {searchOpen && searchQuery.trim() !== '' && (
                <div className="absolute left-0 right-0 mt-1 bg-white border border-[#cbd5e1] rounded shadow-lg z-50 max-h-80 overflow-y-auto">
                  <div className="p-2 text-[10px] font-mono uppercase bg-[#f1f5f9] text-[#64748B] border-b">
                    Matching Applications ({searchResults.length})
                  </div>
                  {searchResults.length === 0 ? (
                    <div className="p-3 text-xs text-[#64748B]">No records found matching &ldquo;{searchQuery}&rdquo;</div>
                  ) : (
                    searchResults.map(app => (
                      <button
                        key={app.id}
                        onClick={() => {
                          onOpenAppDetail(app.id);
                          setSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-3 py-2 hover:bg-[#eff4ff] border-b border-[#f1f5f9] flex items-center justify-between text-xs"
                      >
                        <div>
                          <span className="font-mono font-bold text-[#142b4a]">{app.id}</span>
                          <span className="mx-2 text-[#64748B]">—</span>
                          <span className="font-medium text-[#0b1c30]">{app.institutionName}</span>
                        </div>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#e5eeff] text-[#0051d5]">
                          {app.status}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDemoPanelOpen(true)}
              className="bg-[#805ad5]/10 border border-[#805ad5] text-[#6b46c1] hover:bg-[#805ad5]/20 px-3 py-1.5 rounded-sm text-xs font-medium flex items-center space-x-1.5 transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH Demo Mode</span>
            </button>

            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-sm text-[#44474e] hover:bg-[#f1f5f9] transition"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#dc4545]"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-[#cbd5e1] rounded shadow-xl z-50">
                  <div className="p-3 bg-[#142b4a] text-white flex items-center justify-between text-xs font-semibold">
                    <span>System Notifications</span>
                    <span className="bg-[#2563eb] px-1.5 py-0.5 rounded text-[10px] font-mono">{unreadCount} New</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-[#e2e8f0]">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-xs text-center text-[#64748B]">No notifications</div>
                    ) : (
                      notifications.map((n: SystemNotification) => (
                        <div key={n.id} className={`p-3 text-xs ${n.read ? 'bg-white' : 'bg-[#f8f9ff]'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-semibold text-[#0b1c30]">{n.title}</span>
                            <span className="text-[10px] font-mono text-[#74777e]">{n.timestamp}</span>
                          </div>
                          <p className="text-[#44474e] mb-2">{n.message}</p>
                          {n.relatedAppId && (
                            <button
                              onClick={() => {
                                onOpenAppDetail(n.relatedAppId!);
                                setNotificationsOpen(false);
                              }}
                              className="text-[11px] font-medium text-[#2563eb] hover:underline"
                            >
                              Open {n.relatedAppId} →
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-[1px] bg-[#e2e8f0]"></div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-[#0b1c30]">{currentUser.name}</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#d5e3ff] text-[#021c3a] font-bold">
                {currentUser.role}
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-[#f8f9ff]">
          {children}
        </main>
      </div>

      {demoPanelOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
          <div className="w-96 bg-white h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-[#cbd5e1]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#e2e8f0] mb-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-[#805ad5]" />
                  <h3 className="font-bold text-sm text-[#0b1c30]">SIH Jury Demo Control Panel</h3>
                </div>
                <button onClick={() => setDemoPanelOpen(false)} className="text-[#74777e] hover:text-[#0b1c30]">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-[#64748B] mb-4">
                Execute controlled scenarios instantly for your Smart India Hackathon jury presentation without navigating manually.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    flowStore.getState().resetDemoData();
                    alert('Demo environment successfully reset to original seed state.');
                  }}
                  className="w-full text-left p-3 rounded border border-[#cbd5e1] hover:bg-[#eff4ff] text-xs font-medium text-[#142b4a]"
                >
                  <p className="font-bold">1. Reset Demo Environment</p>
                  <p className="text-[11px] text-[#64748B]">Restore all 500 applications and APP-8892 state.</p>
                </button>

                <button
                  onClick={() => {
                    onOpenAppDetail('APP-8892');
                    setDemoPanelOpen(false);
                  }}
                  className="w-full text-left p-3 rounded border border-[#cbd5e1] hover:bg-[#eff4ff] text-xs font-medium text-[#142b4a]"
                >
                  <p className="font-bold">2. Jump to Critical Case (APP-8892)</p>
                  <p className="text-[11px] text-[#64748B]">Sri Venkateswara Eng College, Legal Risk & Escalation.</p>
                </button>

                <button
                  onClick={() => {
                    flowStore.getState().updateApplicationStage('APP-1021', 'stg-102', 'CONDITIONAL_ACTIVE', 'Parallel pre-activated at 75% SLA threshold.');
                    alert('Parallel EVC pre-activation triggered for APP-1021.');
                  }}
                  className="w-full text-left p-3 rounded border border-[#cbd5e1] hover:bg-[#eff4ff] text-xs font-medium text-[#142b4a]"
                >
                  <p className="font-bold">3. Trigger Parallel Pre-Activation</p>
                  <p className="text-[11px] text-[#64748B]">Advance APP-1021 EVC stage to Conditional Active.</p>
                </button>

                <button
                  onClick={() => {
                    flowStore.getState().acknowledgeEscalation('ESC-8892');
                    alert('Escalation ESC-8892 successfully acknowledged with SHA-256 audit log.');
                  }}
                  className="w-full text-left p-3 rounded border border-[#cbd5e1] hover:bg-[#eff4ff] text-xs font-medium text-[#142b4a]"
                >
                  <p className="font-bold">4. Acknowledge Escalation ESC-8892</p>
                  <p className="text-[11px] text-[#64748B]">Simulate biometric/secure officer acknowledgement.</p>
                </button>

                <button
                  onClick={() => {
                    onSelectTab('audit_ledger');
                    setDemoPanelOpen(false);
                  }}
                  className="w-full text-left p-3 rounded border border-[#cbd5e1] hover:bg-[#eff4ff] text-xs font-medium text-[#142b4a]"
                >
                  <p className="font-bold">5. Verify SHA-256 Audit Chain</p>
                  <p className="text-[11px] text-[#64748B]">Inspect append-only cryptographic ledger and hashes.</p>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e2e8f0] text-center">
              <span className="text-[10px] font-mono text-[#74777e]">AICTE FlowGuard v2.4 Enterprise</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

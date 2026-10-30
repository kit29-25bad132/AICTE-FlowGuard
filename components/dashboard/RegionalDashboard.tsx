'import client';
import React from 'react';
import { flowStore } from '@/lib/store';
import { Layers, AlertTriangle, CheckCircle2, Clock, FileText, ArrowRight } from 'lucide-react';

export default function RegionalDashboard({ onNavigate, onOpenAppDetail }: { onNavigate: (tab: string) => void, onOpenAppDetail: (appId: string) => void }) {
  const store = flowStore.getState();
  const { applications, currentUser } = store;

  const assignedApps = applications.filter(a => a.assignedOfficer === currentUser.name || a.region.includes('Southern') || a.region.includes('Western'));

  return (
    <div className="space-y-6">
      <div className="bg-[#142b4a] text-white p-6 rounded-lg shadow-sm border border-[#0f172a] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#316bf3] text-white font-bold">
            REGIONAL OFFICER WORKSPACE
          </span>
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight mt-1">{currentUser.region || 'Southern Region (Chennai)'}</h1>
          <p className="text-xs text-[#b2c7ee] mt-1">
            Operational scrutiny queue, document verification, and stage advancement.
          </p>
        </div>
        <button
          onClick={() => onNavigate('applications')}
          className="mt-4 md:mt-0 bg-white text-[#142b4a] hover:bg-[#f1f5f9] px-4 py-2 rounded-sm text-xs font-semibold flex items-center space-x-1.5 shadow transition"
        >
          <span>View All Regional Queue</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1]">
          <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Assigned Queue</span>
          <p className="text-3xl font-bold font-['Space_Grotesk'] text-[#0b1c30] mt-1">{assignedApps.length}</p>
          <p className="text-[11px] text-[#64748B] mt-1">Active scrutiny files</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1]">
          <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Nearing SLA Deadline</span>
          <p className="text-3xl font-bold font-['Space_Grotesk'] text-[#d18a20] mt-1">
            {assignedApps.filter(a => a.daysRemaining <= 5 && a.daysRemaining >= 0).length}
          </p>
          <p className="text-[11px] text-[#64748B] mt-1">Action required within 5 days</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1]">
          <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">SLA Breaches</span>
          <p className="text-3xl font-bold font-['Space_Grotesk'] text-[#dc4545] mt-1">
            {assignedApps.filter(a => a.daysOverdue > 0).length}
          </p>
          <p className="text-[11px] text-[#64748B] mt-1">Requires immediate escalation review</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#cbd5e1] overflow-hidden">
        <div className="p-4 bg-[#f8f9ff] border-b border-[#cbd5e1] flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#0b1c30]">Regional Scrutiny & Verification Work Queue</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#edf2f7] text-[#44474e] font-mono uppercase text-[10px] border-b border-[#cbd5e1]">
                <th className="p-3">App ID</th>
                <th className="p-3">Institution</th>
                <th className="p-3">Category</th>
                <th className="p-3">Current Stage</th>
                <th className="p-3">SLA Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {assignedApps.map(app => (
                <tr key={app.id} className="hover:bg-[#f8fafc] transition">
                  <td className="p-3 font-mono font-bold text-[#142b4a]">{app.id}</td>
                  <td className="p-3 font-medium text-[#0b1c30]">{app.institutionName}</td>
                  <td className="p-3 text-[#64748B]">{app.category}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#e5eeff] text-[#0051d5]">
                      {app.stages[app.currentStageIndex]?.name || 'In Progress'}
                    </span>
                  </td>
                  <td className="p-3">
                    {app.daysOverdue > 0 ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#fef2f2] text-[#991B1B] border border-[#fecaca] font-bold">
                        +{app.daysOverdue}d Overdue
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ecfdf5] text-[#065F46] border border-[#a7f3d0]">
                        {app.daysRemaining}d Remaining
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onOpenAppDetail(app.id)}
                      className="px-2.5 py-1 bg-[#142b4a] text-white hover:bg-[#0f172a] rounded text-[11px] font-medium transition"
                    >
                      Process Scrutiny
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'import client';
import React from 'react';
import { flowStore } from '@/lib/store';
import { Building2, FileText, ShieldCheck, Upload, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function InstitutionDashboard({ onOpenAppDetail }: { onOpenAppDetail: (appId: string) => void }) {
  const store = flowStore.getState();
  const { applications, currentUser, institutions, undertakings, documents } = store;

  // Find institution associated with current user or default to SVEC (INST-8892)
  const instId = currentUser.institutionId || 'INST-8892';
  const institution = institutions.find(i => i.id === instId) || institutions[0];
  const myApps = applications.filter(a => a.institutionId === institution.id);
  const myUndertakings = undertakings.filter(u => u.institutionId === institution.id);
  const myDocs = documents.filter(d => d.institutionId === institution.id);

  return (
    <div className="space-y-6">
      <div className="bg-[#142b4a] text-white p-6 rounded-lg shadow-sm border border-[#0f172a] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#16a36a] text-white font-bold">
            AUTHORIZED INSTITUTIONAL PORTAL
          </span>
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight mt-1">{institution.name}</h1>
          <p className="text-xs text-[#b2c7ee] mt-1 font-mono">
            AICTE ID: {institution.code} • Principal: {institution.principal}
          </p>
        </div>
        <div className="mt-4 md:mt-0 bg-white/10 px-4 py-3 rounded border border-white/20 text-center">
          <span className="block text-[10px] font-mono text-[#b2c7ee] uppercase">Compliance Health Score</span>
          <span className="text-2xl font-bold font-['Space_Grotesk'] text-[#e9a23b]">{institution.complianceHealthScore}/100</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications card */}
        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1] lg:col-span-2">
          <h3 className="font-bold text-sm text-[#0b1c30] mb-3">Active Approval Applications</h3>
          {myApps.length === 0 ? (
            <p className="text-xs text-[#64748B]">No active applications found.</p>
          ) : (
            <div className="space-y-3">
              {myApps.map(app => (
                <div key={app.id} className="p-4 rounded border border-[#e2e8f0] bg-[#f8f9ff] flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-mono font-bold text-xs text-[#142b4a]">{app.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#e5eeff] text-[#0051d5]">
                        {app.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#44474e]">Category: {app.category} | Intake: {app.intakeSize}</p>
                    <p className="text-[11px] text-[#64748B] mt-1">Current Stage: <span className="font-semibold text-[#0b1c30]">{app.stages[app.currentStageIndex]?.name}</span></p>
                  </div>
                  <button
                    onClick={() => onOpenAppDetail(app.id)}
                    className="mt-3 md:mt-0 px-3 py-1.5 bg-[#142b4a] text-white rounded text-xs font-semibold hover:bg-[#0f172a] transition"
                  >
                    View Application Dossier →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Compliance Genome & Undertakings */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-lg border border-[#cbd5e1]">
            <h3 className="font-bold text-sm text-[#0b1c30] mb-3">Time-Bound Undertakings</h3>
            {myUndertakings.length === 0 ? (
              <p className="text-xs text-[#64748B]">No pending undertakings.</p>
            ) : (
              <div className="space-y-2">
                {myUndertakings.map(u => (
                  <div key={u.id} className="p-3 rounded border border-[#cbd5e1] text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-[#0b1c30]">{u.title}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        u.status === 'FULFILLED' ? 'bg-[#ecfdf5] text-[#065f46]' : 'bg-[#fffbeb] text-[#92400e]'
                      }`}>
                        {u.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#64748B]">Due Date: {u.dueDate}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

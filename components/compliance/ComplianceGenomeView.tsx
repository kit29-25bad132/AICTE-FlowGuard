'import client';
import React from 'react';
import { flowStore } from '@/lib/store';
import { ShieldCheck, AlertTriangle, Building2, CheckCircle2 } from 'lucide-react';

export default function ComplianceGenomeView() {
  const store = flowStore.getState();
  const { institutions } = store;

  return (
    <div className="space-y-6">
      <div className="bg-[#142b4a] text-white p-6 rounded-lg shadow-sm border border-[#0f172a] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#16a36a] text-white font-bold">
            RULE-BASED COMPLIANCE GENOME
          </span>
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight mt-1">Institutional Compliance Genome</h1>
          <p className="text-xs text-[#b2c7ee] mt-1">
            Deterministic health scoring: <code className="bg-black/30 px-1.5 py-0.5 rounded">Score = 100 - (5 × lateSubmissions) - (10 × escalations)</code>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {institutions.map(inst => (
          <div key={inst.id} className="bg-white p-6 rounded-lg border border-[#cbd5e1] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#64748B]">{inst.code}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  inst.complianceHealthScore >= 80 ? 'bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0]' :
                  inst.complianceHealthScore >= 50 ? 'bg-[#fffbeb] text-[#92400e] border border-[#fde68a]' :
                  'bg-[#fef2f2] text-[#991b1b] border border-[#fecaca]'
                }`}>
                  {inst.complianceHealthScore}/100 Score
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#0b1c30] mb-2">{inst.name}</h3>
              <p className="text-xs text-[#64748B] mb-4">{inst.state} • Principal: {inst.principal}</p>

              <div className="space-y-2 text-xs border-t border-[#e2e8f0] pt-3">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Late Submissions:</span>
                  <strong className="text-[#0b1c30]">{inst.lateSubmissions}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Escalation Events:</span>
                  <strong className="text-[#dc4545]">{inst.escalationCount}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Application Cycles:</span>
                  <strong className="text-[#0b1c30]">{inst.applicationCycles}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

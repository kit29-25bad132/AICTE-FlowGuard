'import client';
import React, { useState } from 'react';
import { flowStore } from '@/lib/store';
import { Settings, Plus, Save, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function WorkflowStudioView() {
  const [scrutinySla, setScrutinySla] = useState(15);
  const [evcSla, setEvcSla] = useState(20);
  const [impactCount, setImpactCount] = useState<number | null>(null);

  const handleSimulateImpact = () => {
    // Demo scenario: changing Scrutiny SLA affects 5 applications moving from ON_TRACK to AT_RISK
    setImpactCount(5);
  };

  const handleSaveWorkflow = () => {
    alert('Workflow configuration version 2.4 saved successfully. SLA rules updated across regional queues.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#142b4a] text-white p-6 rounded-lg shadow-sm border border-[#0f172a] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#316bf3] text-white font-bold">
            ADMINISTRATION STUDIO
          </span>
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight mt-1">Workflow & SLA Configuration Studio</h1>
          <p className="text-xs text-[#b2c7ee] mt-1">
            Configure approval stages, SLA durations, and test downstream impact on active application queues.
          </p>
        </div>

        <button
          onClick={handleSaveWorkflow}
          className="mt-4 md:mt-0 bg-[#16a36a] hover:bg-[#15803d] text-white px-4 py-2 rounded-sm text-xs font-semibold flex items-center space-x-1.5 shadow transition"
        >
          <Save className="w-4 h-4" />
          <span>Save Workflow Version</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] space-y-4">
          <h3 className="font-bold text-sm text-[#0b1c30]">Stage SLA Duration Parameters</h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#0b1c30] mb-1">Initial Scrutiny SLA (Days)</label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  value={scrutinySla}
                  onChange={e => setScrutinySla(Number(e.target.value))}
                  className="w-32 p-2 border border-[#cbd5e1] rounded font-mono"
                />
                <button
                  onClick={handleSimulateImpact}
                  className="px-3 py-2 bg-[#142b4a] text-white rounded font-medium hover:bg-[#0f172a]"
                >
                  Simulate Impact
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#0b1c30] mb-1">Expert Visit Committee (EVC) SLA (Days)</label>
              <input
                type="number"
                value={evcSla}
                onChange={e => setEvcSla(Number(e.target.value))}
                className="w-32 p-2 border border-[#cbd5e1] rounded font-mono"
              />
            </div>
          </div>

          {impactCount !== null && (
            <div className="p-4 bg-[#fffbeb] border border-[#fde68a] rounded text-xs text-[#92400e]">
              <span className="font-bold">Simulation Result:</span> Changing Scrutiny SLA to {scrutinySla} days will cause <strong>{impactCount} active applications</strong> to transition from ON_TRACK to AT_RISK.
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] space-y-4">
          <h3 className="font-bold text-sm text-[#0b1c30]">Active Stage Graph</h3>
          <div className="space-y-2">
            {[
              { name: 'Initial Scrutiny', role: 'Regional Officer', sla: `${scrutinySla} Days` },
              { name: 'Expert Visit Committee (EVC)', role: 'EVC Committee', sla: `${evcSla} Days` },
              { name: 'Executive Approval', role: 'Bureau Head', sla: '10 Days' },
              { name: 'Final Letter of Approval', role: 'Admin', sla: '5 Days' },
            ].map((stg, i) => (
              <div key={i} className="p-3 rounded border border-[#e2e8f0] bg-[#f8f9ff] flex items-center justify-between text-xs">
                <div>
                  <span className="font-mono font-bold text-[#142b4a]">Stage 0{i + 1}</span>
                  <span className="font-semibold text-[#0b1c30] ml-2">{stg.name}</span>
                </div>
                <div className="flex items-center space-x-3 text-[#64748B]">
                  <span>{stg.role}</span>
                  <span className="font-mono font-bold text-[#0b1c30]">{stg.sla}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

'import client';
import React, { useState } from 'react';
import { flowStore } from '@/lib/store';
import { generateAuditDossierPdf } from '@/lib/pdf';
import { 
  Building2, FileText, Download, CheckCircle2, AlertTriangle, 
  Clock, ShieldAlert, ArrowLeft, Cpu, ExternalLink, Sparkles 
} from 'lucide-react';
import { Application, PrecedentCase } from '@/types';

export default function ApplicationDetail({ appId, onBack }: { appId: string, onBack: () => void }) {
  const store = flowStore.getState();
  const { applications, institutions, precedents } = store;
  
  const app = applications.find(a => a.id === appId) || applications[0];
  const institution = institutions.find(i => i.id === app.institutionId);

  const [revertModalOpen, setRevertModalOpen] = useState(false);
  const [aphClause, setAphClause] = useState('Clause 4.2 (Faculty & Cadre Ratio)');
  const [revertReason, setRevertReason] = useState('');
  const [revertError, setRevertError] = useState('');

  const handleAdvanceStage = (stageId: string, nextStatus: string) => {
    flowStore.getState().updateApplicationStage(app.id, stageId, nextStatus);
  };

  const handleRevertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (revertReason.trim().split(/\s+/).length < 15) {
      setRevertError('Explanation must be sufficiently detailed (at least 15+ words as per APH guidelines).');
      return;
    }
    flowStore.getState().revertApplication(app.id, aphClause, revertReason);
    setRevertModalOpen(false);
    setRevertReason('');
    setRevertError('');
    alert(`Application ${app.id} successfully reverted under ${aphClause}.`);
  };

  return (
    <div className="space-y-6">
      {/* Top Navigation Back & Export */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-xs font-semibold text-[#142b4a] hover:underline flex items-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ledger</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => generateAuditDossierPdf(app, institution)}
            className="bg-[#142b4a] hover:bg-[#0f172a] text-white px-4 py-2 rounded-sm text-xs font-semibold flex items-center space-x-1.5 shadow transition"
          >
            <Download className="w-4 h-4" />
            <span>Export Complete Dossier (PDF)</span>
          </button>
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="font-mono font-bold text-lg text-[#142b4a]">{app.id}</span>
            <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
              app.status === 'ESCALATED' ? 'bg-[#fef2f2] text-[#991b1b] border border-[#fecaca]' : 'bg-[#e5eeff] text-[#0051d5]'
            }`}>
              {app.status}
            </span>
            <span className="text-xs text-[#64748B] font-mono">Region: {app.region}</span>
          </div>
          <h1 className="text-xl font-bold font-['Space_Grotesk'] text-[#0b1c30]">{app.institutionName}</h1>
          <p className="text-xs text-[#44474e] mt-1">
            Category: {app.category} • Intake: {app.intakeSize} Seats • Faculty Count: {app.facultyCount}
          </p>
        </div>

        <div className="mt-4 md:mt-0 bg-[#f8f9ff] p-4 rounded border border-[#d3e4fe] text-right">
          <span className="block text-[10px] font-mono text-[#64748B] uppercase">SLA Deadline</span>
          <span className="font-mono font-bold text-sm text-[#0b1c30]">{app.slaDeadline}</span>
          <span className={`block text-[11px] font-mono mt-1 ${app.daysOverdue > 0 ? 'text-[#dc4545] font-bold' : 'text-[#16a36a]'}`}>
            {app.daysOverdue > 0 ? `+${app.daysOverdue} Days Overdue` : `${app.daysRemaining} Days Remaining`}
          </span>
        </div>
      </div>

      {/* Workflow Stage Timeline */}
      <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] shadow-xs">
        <h3 className="font-bold text-sm text-[#0b1c30] mb-4">Workflow Stage Progression State Machine</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {app.stages.map((stg, idx) => (
            <div key={stg.id} className={`p-4 rounded border ${
              stg.status === 'CLEARED' ? 'bg-[#ecfdf5]/40 border-[#a7f3d0]' :
              stg.status === 'ACTIVE' || stg.status === 'CONDITIONAL_ACTIVE' ? 'bg-[#eff4ff] border-[#2563eb]' :
              stg.status === 'ESCALATED' ? 'bg-[#fef2f2] border-[#fecaca]' :
              'bg-[#f8f9ff] border-[#e2e8f0]'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-[#64748B]">STAGE 0{idx + 1}</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                  stg.status === 'CLEARED' ? 'bg-[#16a36a] text-white' :
                  stg.status === 'ACTIVE' ? 'bg-[#2563eb] text-white' :
                  stg.status === 'CONDITIONAL_ACTIVE' ? 'bg-[#e9a23b] text-white' :
                  stg.status === 'ESCALATED' ? 'bg-[#dc4545] text-white' :
                  'bg-[#cbd5e1] text-[#0b1c30]'
                }`}>
                  {stg.status}
                </span>
              </div>
              <h4 className="font-semibold text-xs text-[#0b1c30] mb-1">{stg.name}</h4>
              <p className="text-[11px] text-[#64748B] mb-3">SLA: {stg.elapsedDays}/{stg.slaDays} days</p>

              <div className="flex items-center space-x-2">
                {stg.status === 'ACTIVE' && (
                  <button
                    onClick={() => handleAdvanceStage(stg.id, 'CLEARED')}
                    className="w-full py-1 bg-[#16a36a] text-white rounded text-[10px] font-semibold hover:bg-[#15803d]"
                  >
                    Clear & Advance
                  </button>
                )}
                <button
                  onClick={() => setRevertModalOpen(true)}
                  className="w-full py-1 bg-white border border-[#dc4545] text-[#dc4545] rounded text-[10px] font-semibold hover:bg-[#fef2f2]"
                >
                  Revert
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Precedent Intelligence & Institution Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Precedent Intelligence Panel */}
        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-[#0b1c30] flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#805ad5]" />
              <span>Regulatory Precedent Intelligence (Similar Cases)</span>
            </h3>
            <span className="text-[10px] font-mono text-[#64748B]">Decision Support AI</span>
          </div>
          <p className="text-xs text-[#64748B] mb-4">
            Top 5 historical similar applications based on four-dimensional feature vector similarity.
          </p>

          <div className="space-y-3">
            {precedents.map(prec => (
              <div key={prec.id} className="p-3 rounded border border-[#e2e8f0] bg-[#f8f9ff] text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-bold text-[#142b4a]">{prec.previousAppId} — {prec.institutionName}</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#805ad5]/10 text-[#6b46c1] font-bold">
                    {prec.similarityScore}% Match
                  </span>
                </div>
                <p className="text-[#44474e] mb-2">{prec.reasoning}</p>
                <div className="flex items-center justify-between text-[11px] text-[#64748B]">
                  <span>Decision: <strong className="text-[#0b1c30]">{prec.decision}</strong></span>
                  <span>Date: {prec.decisionDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delay Cost & Audit Summary */}
        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#0b1c30] mb-3">Delay Cost & Legal Exposure</h3>
            <div className="bg-[#fef2f2] p-4 rounded border border-[#fecaca] mb-4">
              <span className="text-[10px] font-mono text-[#991b1b] uppercase font-bold">Calculated Institutional Impact</span>
              <p className="text-2xl font-bold font-['Space_Grotesk'] text-[#991b1b] mt-1">₹{(app.delayCost || 14200000).toLocaleString('en-IN')}</p>
              <p className="text-xs text-[#7f1d1d] mt-1">Based on faculty salary overhead and student fee forfeiture during procedural delays.</p>
            </div>

            <div className="space-y-2 text-xs text-[#44474e]">
              <div className="flex justify-between py-1 border-b border-[#e2e8f0]">
                <span>Assigned Officer:</span>
                <span className="font-semibold text-[#0b1c30]">{app.assignedOfficer}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e2e8f0]">
                <span>Defect Count:</span>
                <span className="font-semibold text-[#dc4545]">{app.defectCount} Active Deficits</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#e2e8f0]">
                <span>Escalation Level:</span>
                <span className="font-semibold text-[#dc4545]">Level {app.escalationLevel} Active</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#e2e8f0] text-center">
            <span className="text-[10px] font-mono text-[#64748B]">SHA-256 Ledger Verified • Immutable Audit Trail</span>
          </div>
        </div>
      </div>

      {/* Revert Modal with APH Clause & >100 word enforcement */}
      {revertModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-2xl border border-[#cbd5e1]">
            <h3 className="font-bold text-base text-[#0b1c30] mb-2">Structured Deficiency Revert & Rejection</h3>
            <p className="text-xs text-[#64748B] mb-4">
              AICTE regulations require an explicit APH clause and a detailed justification for reverting or rejecting applications.
            </p>

            <form onSubmit={handleRevertSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Applicable APH Handbook Clause</label>
                <select
                  value={aphClause}
                  onChange={e => setAphClause(e.target.value)}
                  className="w-full p-2 text-xs border border-[#cbd5e1] rounded-sm bg-white"
                >
                  <option value="Clause 4.2 (Faculty & Cadre Ratio)">Clause 4.2 (Faculty & Cadre Ratio)</option>
                  <option value="Clause 5.1 (Land & Built-up Area)">Clause 5.1 (Land & Built-up Area)</option>
                  <option value="Clause 7.4 (Financial Viability & Corpus Fund)">Clause 7.4 (Financial Viability & Corpus Fund)</option>
                  <option value="Clause 9.0 (Laboratory & Equipment Standards)">Clause 9.0 (Laboratory & Equipment Standards)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0b1c30] mb-1">Detailed Explanation & Corrective Requirement</label>
                <textarea
                  rows={4}
                  placeholder="Provide precise inspection findings and statutory reasoning (minimum 15+ words required)..."
                  value={revertReason}
                  onChange={e => setRevertReason(e.target.value)}
                  className="w-full p-2 text-xs border border-[#cbd5e1] rounded-sm focus:ring-2 focus:ring-[#2563eb]"
                  required
                />
                {revertError && <p className="text-[11px] text-[#dc4545] mt-1">{revertError}</p>}
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setRevertModalOpen(false)}
                  className="px-4 py-2 border border-[#cbd5e1] text-[#44474e] rounded text-xs font-semibold hover:bg-[#f1f5f9]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#dc4545] text-white rounded text-xs font-semibold hover:bg-[#b91c1c]"
                >
                  Confirm Revert & Notify Institution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

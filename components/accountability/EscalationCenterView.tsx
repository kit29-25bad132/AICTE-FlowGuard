'import client';
import React from 'react';
import { flowStore } from '@/lib/store';
import { ShieldAlert, CheckCircle2, Clock, AlertTriangle, UserCheck } from 'lucide-react';

export default function EscalationCenterView({ onOpenAppDetail }: { onOpenAppDetail: (appId: string) => void }) {
  const store = flowStore.getState();
  const { escalations } = store;

  const handleAcknowledge = (escId: string) => {
    flowStore.getState().acknowledgeEscalation(escId);
    alert(`Escalation ${escId} successfully acknowledged. Cryptographic audit event logged.`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-[#142b4a] text-white p-6 rounded-lg shadow-sm border border-[#0f172a] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#dc4545] text-white font-bold">
            ACCOUNTABILITY & ESCALATION BUREAU
          </span>
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight mt-1">Multi-Level Escalation Center</h1>
          <p className="text-xs text-[#b2c7ee] mt-1">
            Five-level automated SLA breach promotion and executive intervention tracking.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        {[
          { level: 1, title: '75% SLA', target: 'Assigned Officer', desc: 'In-app warning notification' },
          { level: 2, title: '100% SLA', target: 'Officer & Regional Head', desc: 'SMS / In-app alert' },
          { level: 3, title: 'SLA + 7d', target: 'Bureau Head', desc: 'Executive escalation active' },
          { level: 4, title: 'SLA + 14d', target: 'Competent Authority', desc: 'Formal administrative review' },
          { level: 5, title: 'SLA + 21d', target: 'Chairman Office', desc: 'Apex statutory summary' },
        ].map(lvl => (
          <div key={lvl.level} className="p-4 bg-white rounded border border-[#cbd5e1] shadow-xs">
            <span className="text-[10px] font-mono font-bold text-[#2563eb]">LEVEL 0{lvl.level}</span>
            <h4 className="font-bold text-xs text-[#0b1c30] mt-1">{lvl.title}</h4>
            <p className="text-[11px] font-semibold text-[#44474e] mt-0.5">{lvl.target}</p>
            <p className="text-[10px] text-[#64748B] mt-1">{lvl.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-[#cbd5e1] overflow-hidden shadow-xs">
        <div className="p-4 bg-[#f8f9ff] border-b border-[#cbd5e1]">
          <h3 className="font-bold text-sm text-[#0b1c30]">Active Escalation Queue</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#edf2f7] text-[#44474e] font-mono uppercase text-[10px] border-b border-[#cbd5e1]">
                <th className="p-3">App ID</th>
                <th className="p-3">Institution Name</th>
                <th className="p-3">Escalation Level</th>
                <th className="p-3">Assigned Recipient</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {escalations.map(esc => (
                <tr key={esc.id} className="hover:bg-[#f8fafc] transition">
                  <td className="p-3 font-mono font-bold text-[#142b4a]">{esc.applicationId}</td>
                  <td className="p-3 font-medium text-[#0b1c30]">{esc.institutionName}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] font-bold">
                      Level {esc.currentLevel}
                    </span>
                  </td>
                  <td className="p-3 text-[#64748B]">{esc.recipient}</td>
                  <td className="p-3">
                    {esc.acknowledged ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ecfdf5] text-[#065f46]">
                        Acknowledged ({esc.acknowledgedBy})
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#fffbeb] text-[#92400e]">
                        Pending Acknowledgment
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      onClick={() => onOpenAppDetail(esc.applicationId)}
                      className="px-2.5 py-1 bg-white border border-[#cbd5e1] text-[#142b4a] hover:bg-[#f1f5f9] rounded text-[11px]"
                    >
                      Inspect
                    </button>
                    {!esc.acknowledged && (
                      <button
                        onClick={() => handleAcknowledge(esc.id)}
                        className="px-2.5 py-1 bg-[#16a36a] text-white hover:bg-[#15803d] rounded text-[11px] font-medium"
                      >
                        Acknowledge
                      </button>
                    )}
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

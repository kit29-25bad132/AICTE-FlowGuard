'import client';
import React from 'react';
import { flowStore } from '@/lib/store';
import { AlertTriangle, TrendingUp, Cpu } from 'lucide-react';

export default function BottleneckForecastView() {
  const store = flowStore.getState();
  const { applications } = store;

  return (
    <div className="space-y-6">
      <div className="bg-[#142b4a] text-white p-6 rounded-lg shadow-sm border border-[#0f172a] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#805ad5] text-white font-bold">
            PREDICTIVE INTELLIGENCE
          </span>
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight mt-1">30-Day Bottleneck Forecast</h1>
          <p className="text-xs text-[#b2c7ee] mt-1">
            Calculating clearance velocity and projected queue congestion using rolling 7-day throughput metrics.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Clearance Velocity</span>
          <p className="text-3xl font-bold font-['Space_Grotesk'] text-[#16a36a] mt-2">14.2 apps / day</p>
          <p className="text-xs text-[#64748B] mt-1">Average closed in previous 7 days / 7</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Projected Backlog (30d)</span>
          <p className="text-3xl font-bold font-['Space_Grotesk'] text-[#0b1c30] mt-2">114 applications</p>
          <p className="text-xs text-[#64748B] mt-1">Manageable within current officer capacity</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Bottleneck Risk Flag</span>
          <p className="text-3xl font-bold font-['Space_Grotesk'] text-[#dc4545] mt-2">2 Stages Flagged</p>
          <p className="text-xs text-[#64748B] mt-1">EVC inspection and faculty scrutiny</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#cbd5e1] overflow-hidden shadow-xs">
        <div className="p-4 bg-[#f8f9ff] border-b border-[#cbd5e1]">
          <h3 className="font-bold text-sm text-[#0b1c30]">Stage-Wise Bottleneck Projections</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#edf2f7] text-[#44474e] font-mono uppercase text-[10px] border-b border-[#cbd5e1]">
                <th className="p-3">Processing Stage</th>
                <th className="p-3">Current Queue</th>
                <th className="p-3">Clearance Velocity</th>
                <th className="p-3">Projected Days to Clear</th>
                <th className="p-3">SLA Threshold</th>
                <th className="p-3">Status Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              <tr className="hover:bg-[#f8fafc] transition">
                <td className="p-3 font-semibold text-[#0b1c30]">Initial Scrutiny</td>
                <td className="p-3 font-mono">42</td>
                <td className="p-3 font-mono">6.5 / day</td>
                <td className="p-3 font-mono font-bold text-[#16a36a]">6.4 days</td>
                <td className="p-3 font-mono">15 days</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ecfdf5] text-[#065f46]">ON TRACK</span></td>
              </tr>
              <tr className="hover:bg-[#f8fafc] transition">
                <td className="p-3 font-semibold text-[#0b1c30]">Expert Visit Committee (EVC)</td>
                <td className="p-3 font-mono">88</td>
                <td className="p-3 font-mono">3.2 / day</td>
                <td className="p-3 font-mono font-bold text-[#dc4545]">27.5 days</td>
                <td className="p-3 font-mono">20 days</td>
                <td className="p-3"><span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#fef2f2] text-[#991b1b] border border-[#fecaca]">BOTTLENECK</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

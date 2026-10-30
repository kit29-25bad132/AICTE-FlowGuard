'import client';
import React from 'react';
import { flowStore } from '@/lib/store';
import { IndianRupee, TrendingUp, AlertTriangle } from 'lucide-react';

export default function DelayCostView() {
  const store = flowStore.getState();
  const { applications } = store;

  return (
    <div className="space-y-6">
      <div className="bg-[#142b4a] text-white p-6 rounded-lg shadow-sm border border-[#0f172a] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#dc4545] text-white font-bold">
            FINANCIAL IMPACT CALCULUS
          </span>
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight mt-1">Estimated Institutional Delay Cost</h1>
          <p className="text-xs text-[#b2c7ee] mt-1">
            Quantifying institutional financial loss resulting from procedural approval bottlenecks and delayed intake cycles.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Total Bureau Delay Cost</span>
          <p className="text-4xl font-bold font-['Space_Grotesk'] text-[#dc4545] mt-2">₹1,42,00,000</p>
          <p className="text-xs text-[#64748B] mt-1">Across 77 delayed institutional cycles</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Average Fee per Intake</span>
          <p className="text-4xl font-bold font-['Space_Grotesk'] text-[#0b1c30] mt-2">₹1,20,000</p>
          <p className="text-xs text-[#64748B] mt-1">Standard annual tuition baseline</p>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] shadow-xs">
          <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Faculty Salary Overhead</span>
          <p className="text-4xl font-bold font-['Space_Grotesk'] text-[#0b1c30] mt-2">₹8,00,000</p>
          <p className="text-xs text-[#64748B] mt-1">Annual baseline per faculty member</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#cbd5e1] overflow-hidden shadow-xs">
        <div className="p-4 bg-[#f8f9ff] border-b border-[#cbd5e1]">
          <h3 className="font-bold text-sm text-[#0b1c30]">Highest Cost Delayed Applications</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#edf2f7] text-[#44474e] font-mono uppercase text-[10px] border-b border-[#cbd5e1]">
                <th className="p-3">App ID</th>
                <th className="p-3">Institution Name</th>
                <th className="p-3">Intake Size</th>
                <th className="p-3">Days Overdue</th>
                <th className="p-3 text-right">Calculated Delay Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {applications.filter(a => a.delayCost > 0).map(app => (
                <tr key={app.id} className="hover:bg-[#f8fafc] transition">
                  <td className="p-3 font-mono font-bold text-[#142b4a]">{app.id}</td>
                  <td className="p-3 font-medium text-[#0b1c30]">{app.institutionName}</td>
                  <td className="p-3 text-[#64748B]">{app.intakeSize} Seats</td>
                  <td className="p-3 font-mono text-[#dc4545] font-bold">+{app.daysOverdue} Days</td>
                  <td className="p-3 text-right font-mono font-bold text-[#dc4545]">₹{(app.delayCost || 14200000).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

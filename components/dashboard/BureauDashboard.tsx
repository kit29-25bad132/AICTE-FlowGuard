'import client';
import React from 'react';
import { flowStore } from '@/lib/store';
import { 
  Building2, FileText, AlertTriangle, ShieldAlert, IndianRupee, 
  TrendingUp, ArrowUpRight, CheckCircle2, Clock, ShieldCheck, ExternalLink
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function BureauDashboard({ onNavigate, onOpenAppDetail }: { onNavigate: (tab: string) => void, onOpenAppDetail: (appId: string) => void }) {
  const store = flowStore.getState();
  const { applications, institutions } = store;

  // Key metrics calculation
  const totalApps = 500;
  const totalDelayCost = 14200000; // ₹1.4 Cr
  const escalatedCount = applications.filter(a => a.status === 'ESCALATED').length;
  const breachedCount = applications.filter(a => a.daysOverdue > 0).length;

  const regionalData = [
    { region: 'Southern', pending: 142, breached: 18, delayCost: 4800000 },
    { region: 'Western', pending: 110, breached: 12, delayCost: 3500000 },
    { region: 'Northern', pending: 95, breached: 14, delayCost: 3100000 },
    { region: 'South-Western', pending: 88, breached: 9, delayCost: 1900000 },
    { region: 'Eastern', pending: 65, breached: 7, delayCost: 900000 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome */}
      <div className="bg-[#142b4a] text-white p-6 rounded-lg shadow-sm border border-[#0f172a] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2563eb] text-white font-bold">
              BUREAU EXECUTIVE VIEW
            </span>
            <span className="text-xs text-[#b2c7ee] font-mono">AICTE Regulation Bureau • Session Active</span>
          </div>
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight">Institutional Accountability & Regulatory Dashboard</h1>
          <p className="text-xs text-[#b2c7ee] mt-1">
            Monitoring 500 active institutional applications, regional SLAs, and automated pendency risk registries across India.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button
            onClick={() => onNavigate('risk_registry')}
            className="bg-[#dc4545] hover:bg-[#b91c1c] text-white px-4 py-2 rounded-sm text-xs font-semibold flex items-center space-x-1.5 shadow transition"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>Deemed Approval Risk Registry</span>
          </button>
          <button
            onClick={() => onNavigate('delay_cost')}
            className="bg-white text-[#142b4a] hover:bg-[#f1f5f9] px-4 py-2 rounded-sm text-xs font-semibold flex items-center space-x-1.5 shadow transition"
          >
            <IndianRupee className="w-4 h-4 text-[#2563eb]" />
            <span>Delay Cost Calculus</span>
          </button>
        </div>
      </div>

      {/* Core Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Total Applications</span>
            <FileText className="w-4 h-4 text-[#2563eb]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-['Space_Grotesk'] text-[#0b1c30] tabular-nums">{totalApps}</span>
            <span className="text-xs text-[#16a36a] font-medium flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +4.2% YoY
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">Across 300 affiliated institutions</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Est. Institutional Delay Cost</span>
            <IndianRupee className="w-4 h-4 text-[#dc4545]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-['Space_Grotesk'] text-[#0b1c30] tabular-nums">₹1.4 Cr</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#fef2f2] text-[#991b1b]">
              CRITICAL
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">Based on faculty salary & lost fee revenue</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">Active Escalations</span>
            <ShieldAlert className="w-4 h-4 text-[#e9a23b]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-['Space_Grotesk'] text-[#0b1c30] tabular-nums">{escalatedCount + 48}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#fffbeb] text-[#92400e]">
              Level 3+ Active
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">Requires bureau intervention</p>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">SLA Compliance Rate</span>
            <ShieldCheck className="w-4 h-4 text-[#16a36a]" />
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold font-['Space_Grotesk'] text-[#0b1c30] tabular-nums">84.6%</span>
            <span className="text-xs text-[#16a36a] font-medium">+2.1% this week</span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-1">423 on-track, 77 breached/warning</p>
        </div>
      </div>

      {/* Main Grid: Regional Workload & Critical Applications */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Pendency Chart */}
        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1] shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-sm text-[#0b1c30]">Regional Pendency & Delay Volume</h3>
              <p className="text-xs text-[#64748B]">Active application queue by AICTE administrative region</p>
            </div>
            <button
              onClick={() => onNavigate('pendency_map')}
              className="text-xs font-medium text-[#2563eb] hover:underline flex items-center space-x-1"
            >
              <span>View India Map</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="region" tick={{ fontSize: 11 }} stroke="#64748B" />
                <YAxis tick={{ fontSize: 11 }} stroke="#64748B" />
                <Tooltip />
                <Bar dataKey="pending" name="Pending Apps" fill="#142b4a" radius={[2, 2, 0, 0]} />
                <Bar dataKey="breached" name="SLA Breached" fill="#dc4545" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Work Queue / Critical Cases */}
        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm text-[#0b1c30]">High-Risk Critical Case</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#fef2f2] text-[#991b1b] border border-[#fecaca] font-bold">
                LEGAL RISK
              </span>
            </div>

            <div className="bg-[#f8f9ff] p-4 rounded border border-[#d3e4fe] mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-xs text-[#142b4a]">APP-8892</span>
                <span className="text-[10px] font-mono text-[#dc4545] font-semibold">+1 Day Overdue</span>
              </div>
              <h4 className="font-semibold text-xs text-[#0b1c30] mb-1">Sri Venkateswara Engineering College</h4>
              <p className="text-[11px] text-[#44474e] mb-3">Tamil Nadu • 780 Intake • Faculty Deficit 14%</p>
              
              <div className="flex items-center justify-between pt-2 border-t border-[#dce9ff] text-[11px]">
                <span className="text-[#64748B]">Escalation Level:</span>
                <span className="font-bold text-[#991b1b]">Level 3 (Bureau Head)</span>
              </div>
            </div>

            <p className="text-xs text-[#64748B] mb-4">
              Institution has filed a writ petition in Madras High Court regarding EVC faculty verification standards.
            </p>
          </div>

          <button
            onClick={() => onOpenAppDetail('APP-8892')}
            className="w-full bg-[#142b4a] hover:bg-[#0f172a] text-white py-2 rounded-sm text-xs font-semibold flex items-center justify-center space-x-1.5 transition shadow"
          >
            <span>Open Complete Dossier & Audit History</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-lg border border-[#cbd5e1] shadow-xs overflow-hidden">
        <div className="p-4 bg-[#f8f9ff] border-b border-[#cbd5e1] flex items-center justify-between">
          <h3 className="font-bold text-sm text-[#0b1c30]">Recent Regulatory Applications Queue</h3>
          <button
            onClick={() => onNavigate('applications')}
            className="text-xs font-medium text-[#2563eb] hover:underline"
          >
            View All 500 Applications →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#edf2f7] text-[#44474e] font-mono uppercase text-[10px] border-b border-[#cbd5e1]">
                <th className="p-3">App ID</th>
                <th className="p-3">Institution Name</th>
                <th className="p-3">State / Region</th>
                <th className="p-3">Category</th>
                <th className="p-3">Current Stage</th>
                <th className="p-3">SLA Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {applications.slice(0, 5).map(app => (
                <tr key={app.id} className="hover:bg-[#f8fafc] transition">
                  <td className="p-3 font-mono font-bold text-[#142b4a]">{app.id}</td>
                  <td className="p-3 font-medium text-[#0b1c30]">{app.institutionName}</td>
                  <td className="p-3 text-[#64748B]">{app.state}</td>
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
                      className="px-2.5 py-1 bg-white border border-[#cbd5e1] text-[#142b4a] hover:bg-[#f1f5f9] rounded text-[11px] font-medium transition"
                    >
                      Inspect
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

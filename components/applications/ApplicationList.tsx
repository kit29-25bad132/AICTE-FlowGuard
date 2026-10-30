'import client';
import React, { useState } from 'react';
import { flowStore } from '@/lib/store';
import { Search, Filter, Download, ExternalLink } from 'lucide-react';
import { Application } from '@/types';

export default function ApplicationList({ onOpenAppDetail }: { onOpenAppDetail: (appId: string) => void }) {
  const store = flowStore.getState();
  const { applications } = store;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [regionFilter, setRegionFilter] = useState('ALL');

  const filtered = applications.filter(app => {
    const matchesSearch = app.id.toLowerCase().includes(search.toLowerCase()) || 
                          app.institutionName.toLowerCase().includes(search.toLowerCase()) ||
                          app.state.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesRegion = regionFilter === 'ALL' || app.region === regionFilter;
    return matchesSearch && matchesStatus && matchesRegion;
  });

  return (
    <div className="space-y-6">
      <div className="bg-[#142b4a] text-white p-6 rounded-lg shadow-sm border border-[#0f172a] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2563eb] text-white font-bold">
            MASTER REGULATORY LEDGER
          </span>
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight mt-1">All Approval Applications</h1>
          <p className="text-xs text-[#b2c7ee] mt-1">
            Displaying active institutional applications across all AICTE administrative regions.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-[#cbd5e1] flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 w-full md:w-auto">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#74777e]">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Filter by App ID, institution, state..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-[#cbd5e1] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          />
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-[#cbd5e1] rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          >
            <option value="ALL">All Statuses</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ESCALATED">Escalated</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="APPROVED">Approved</option>
          </select>

          <select
            value={regionFilter}
            onChange={e => setRegionFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-[#cbd5e1] rounded-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
          >
            <option value="ALL">All Regions</option>
            <option value="Southern Region">Southern Region</option>
            <option value="Western Region">Western Region</option>
            <option value="Northern Region">Northern Region</option>
            <option value="South-Western Region">South-Western Region</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#cbd5e1] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#edf2f7] text-[#44474e] font-mono uppercase text-[10px] border-b border-[#cbd5e1]">
                <th className="p-3">App ID</th>
                <th className="p-3">Institution Name</th>
                <th className="p-3">State / Region</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">SLA Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#64748B]">No applications match your filter criteria.</td>
                </tr>
              ) : (
                filtered.map(app => (
                  <tr key={app.id} className="hover:bg-[#f8fafc] transition">
                    <td className="p-3 font-mono font-bold text-[#142b4a]">{app.id}</td>
                    <td className="p-3 font-medium text-[#0b1c30]">{app.institutionName}</td>
                    <td className="p-3 text-[#64748B]">{app.state} ({app.region})</td>
                    <td className="p-3 text-[#64748B]">{app.category}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        app.status === 'ESCALATED' ? 'bg-[#fef2f2] text-[#991b1b] border border-[#fecaca]' : 'bg-[#e5eeff] text-[#0051d5]'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-3">
                      {app.daysOverdue > 0 ? (
                        <span className="font-mono text-[10px] font-bold text-[#dc4545]">+{app.daysOverdue}d overdue</span>
                      ) : (
                        <span className="font-mono text-[10px] text-[#16a36a]">{app.daysRemaining}d remaining</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onOpenAppDetail(app.id)}
                        className="px-2.5 py-1 bg-[#142b4a] text-white hover:bg-[#0f172a] rounded text-[11px] font-medium transition"
                      >
                        Inspect Dossier
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

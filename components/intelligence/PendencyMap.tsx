'import client';
import React from 'react';
import { flowStore } from '@/lib/store';
import { MapPin, TrendingUp, AlertTriangle } from 'lucide-react';

export default function PendencyMap() {
  const store = flowStore.getState();
  const { institutions } = store;

  const regions = [
    { name: 'Southern Region (Chennai)', count: 142, breached: 18, risk: 'HIGH' },
    { name: 'Western Region (Mumbai/Pune)', count: 110, breached: 12, risk: 'MEDIUM' },
    { name: 'Northern Region (Delhi)', count: 95, breached: 14, risk: 'HIGH' },
    { name: 'South-Western Region (Bangalore)', count: 88, breached: 9, risk: 'LOW' },
    { name: 'Eastern Region (Kolkata)', count: 65, breached: 7, risk: 'LOW' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#142b4a] text-white p-6 rounded-lg shadow-sm border border-[#0f172a] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2563eb] text-white font-bold">
            GEOSPATIAL INTELLIGENCE
          </span>
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight mt-1">Regional Pendency & Risk Heatmap</h1>
          <p className="text-xs text-[#b2c7ee] mt-1">
            Real-time telemetry across AICTE regional offices and affiliated institutional nodes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] lg:col-span-2 space-y-4">
          <h3 className="font-bold text-sm text-[#0b1c30]">AICTE Administrative Zones Telemetry</h3>
          <div className="space-y-3">
            {regions.map((reg, idx) => (
              <div key={idx} className="p-4 rounded border border-[#e2e8f0] bg-[#f8f9ff] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#142b4a] text-sm block mb-1">{reg.name}</span>
                  <span className="text-[#64748B]">Active Queue: <strong>{reg.count} applications</strong></span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-right">
                    <strong className="block text-[#dc4545] font-mono">{reg.breached} Breached</strong>
                    <span className="text-[10px] text-[#64748B]">SLA Exceeded</span>
                  </span>
                  <span className={`px-2 py-1 rounded text-[10px] font-mono font-bold ${
                    reg.risk === 'HIGH' ? 'bg-[#fef2f2] text-[#991b1b] border border-[#fecaca]' : 'bg-[#fffbeb] text-[#92400e]'
                  }`}>
                    {reg.risk} RISK
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-[#cbd5e1] flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#0b1c30] mb-3">Geospatial Summary</h3>
            <p className="text-xs text-[#64748B] mb-4">
              Southern and Northern corridors account for 47% of total pendency volume, driven by high engineering intake applications.
            </p>
            <div className="p-4 bg-[#eff4ff] rounded border border-[#d3e4fe] text-xs space-y-2">
              <div className="flex justify-between">
                <span>Total Mapped Nodes:</span>
                <strong className="font-mono">300 Institutions</strong>
              </div>
              <div className="flex justify-between">
                <span>GPS Accuracy:</span>
                <strong className="font-mono text-[#16a36a]">±2.4 meters</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

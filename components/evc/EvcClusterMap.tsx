'import client';
import React from 'react';
import { flowStore } from '@/lib/store';
import { Calendar, MapPin, Users, CheckCircle2, RefreshCw } from 'lucide-react';

export default function EvcClusterMap() {
  const store = flowStore.getState();
  const { clusters, institutions } = store;

  return (
    <div className="space-y-6">
      <div className="bg-[#142b4a] text-white p-6 rounded-lg shadow-sm border border-[#0f172a] flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#316bf3] text-white font-bold">
            EVC TRAVEL OPTIMIZATION & CLUSTERING
          </span>
          <h1 className="text-2xl font-bold font-['Space_Grotesk'] tracking-tight mt-1">Expert Visit Committee (EVC) Intelligence</h1>
          <p className="text-xs text-[#b2c7ee] mt-1">
            Spatial K-Means institutional grouping to optimize committee transit time and inspection schedules.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1] lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-sm text-[#0b1c30]">Active EVC Travel Cluster: CLUSTER-PUNE-01</h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] font-bold">
              CONFIRMED
            </span>
          </div>

          <p className="text-xs text-[#64748B] mb-4">
            Grouped 3 institutions in the Pune corridor within a 35km radius. Estimated travel savings: 4.5 transit hours.
          </p>

          <div className="space-y-3 mb-6">
            {clusters[0]?.institutionNames.map((name, i) => (
              <div key={i} className="p-3 rounded border border-[#e2e8f0] bg-[#f8f9ff] flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-[#2563eb]" />
                  <span className="font-semibold text-[#0b1c30]">{name}</span>
                </div>
                <span className="font-mono text-[11px] text-[#64748B]">Scheduled: 15 Mar 2026</span>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#eff4ff] rounded border border-[#d3e4fe] text-xs">
            <span className="font-bold text-[#142b4a] block mb-1">Assigned Committee Members:</span>
            <p className="text-[#44474e]">{clusters[0]?.committeeMembers.join(', ')}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-[#cbd5e1] flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#0b1c30] mb-3">Cluster Optimization Engine</h3>
            <p className="text-xs text-[#64748B] mb-4">
              Run spatial clustering algorithm across all pending inspection requests in Western and Southern zones.
            </p>

            <div className="p-3 bg-[#f8f9ff] rounded border border-[#cbd5e1] space-y-2 text-xs mb-4">
              <div className="flex justify-between">
                <span>Algorithm:</span>
                <strong className="font-mono text-[#142b4a]">Haversine K-Means</strong>
              </div>
              <div className="flex justify-between">
                <span>Max Radius:</span>
                <strong className="font-mono text-[#142b4a]">50 km</strong>
              </div>
              <div className="flex justify-between">
                <span>Avg Cost Reduction:</span>
                <strong className="font-mono text-[#16a36a]">38.4%</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert('Spatial K-Means re-clustering executed successfully across 42 institutions.')}
            className="w-full bg-[#142b4a] hover:bg-[#0f172a] text-white py-2 rounded-sm text-xs font-semibold flex items-center justify-center space-x-1.5 transition shadow"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate Optimal EVC Clusters</span>
          </button>
        </div>
      </div>
    </div>
  );
}

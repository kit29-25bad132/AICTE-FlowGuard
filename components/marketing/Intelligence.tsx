'use client';

import React, { useState } from 'react';
import { AlertTriangle, ArrowUpRight, Clock3, IndianRupee, MapPin, Radar, TrendingUp } from 'lucide-react';
import { Section, SectionHeading } from '@/components/marketing/SectionHeading';
import { cn } from '@/lib/utils';

const CAPABILITIES = [
  {
    title: 'SLA Breach Prediction',
    description: 'Surface stages approaching their deadline before the window closes.',
    icon: Clock3,
  },
  {
    title: 'Delay Cost Exposure',
    description: 'Estimate the operational cost carried by overdue decisions.',
    icon: IndianRupee,
  },
  {
    title: 'Regional Pendency Visibility',
    description: 'Compare active queue volume across administrative regions.',
    icon: MapPin,
  },
  {
    title: 'Deemed Approval Risk Monitoring',
    description: 'Flag cases where inaction carries regulatory and legal exposure.',
    icon: AlertTriangle,
  },
];

const REGIONS = [
  {
    name: 'Southern Region',
    hub: 'Chennai',
    queue: 142,
    breached: 18,
    risk: 'HIGH',
    exposure: '₹48.0L',
    note: 'Highest queue volume, driven by engineering intake applications and stalled EVC slots.',
  },
  {
    name: 'Western Region',
    hub: 'Mumbai · Pune',
    queue: 110,
    breached: 12,
    risk: 'MEDIUM',
    exposure: '₹35.0L',
    note: 'Cluster scheduling has consolidated three Pune inspections; two files remain in scrutiny.',
  },
  {
    name: 'Northern Region',
    hub: 'Delhi',
    queue: 95,
    breached: 14,
    risk: 'HIGH',
    exposure: '₹31.0L',
    note: 'Escalations concentrated in document validity checks and pending rebuttals.',
  },
  {
    name: 'South-Western Region',
    hub: 'Bengaluru',
    queue: 88,
    breached: 9,
    risk: 'LOW',
    exposure: '₹19.0L',
    note: 'Queue is stable; inspection windows are within the current SLA band.',
  },
  {
    name: 'Eastern Region',
    hub: 'Kolkata',
    queue: 65,
    breached: 7,
    risk: 'LOW',
    exposure: '₹9.0L',
    note: 'Lowest active volume with no stage-level breaches recorded this cycle.',
  },
];

const SLA_BANDS = [
  { label: 'On track', value: 423, tone: 'bg-success' },
  { label: 'Approaching', value: 59, tone: 'bg-warning' },
  { label: 'Breached', value: 18, tone: 'bg-danger' },
];

export default function Intelligence() {
  const [activeIndex, setActiveIndex] = useState(0);
  const region = REGIONS[activeIndex];
  const maxQueue = Math.max(...REGIONS.map(item => item.queue));

  return (
    <Section id="intelligence" tone="canvas">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <SectionHeading
          eyebrow="Operational intelligence"
          title={
            <>
              Move from Reactive Monitoring
              <span className="text-navy-800"> to Proactive Governance.</span>
            </>
          }
        />
        <p className="max-w-xl text-[14px] leading-relaxed text-body lg:pb-1">
          Pendency, SLA position, and escalation exposure shown together so intervention happens
          while a case can still be recovered.
        </p>
      </div>

      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="rounded-lg border border-line bg-white p-4">
              <Icon className="h-4 w-4 text-navy-700" aria-hidden="true" />
              <h3 className="mt-3 text-[12.5px] font-semibold tracking-tight text-ink">{item.title}</h3>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">{item.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid gap-4 rounded-xl border border-line bg-white p-5 lg:grid-cols-[1.05fr_1fr] lg:p-6">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-[13px] font-semibold tracking-tight text-ink">Regional pendency</h3>
            <span className="rounded-[3px] border border-line bg-canvas px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
              Demonstration data
            </span>
          </div>
          <ul className="mt-4 space-y-1.5">
            {REGIONS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={cn(
                      'w-full rounded-md border px-3 py-2.5 text-left transition-colors',
                      isActive
                        ? 'border-navy-800/25 bg-tint'
                        : 'border-transparent hover:border-line hover:bg-canvas',
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex min-w-0 items-center gap-2">
                        <MapPin
                          className={cn('h-3.5 w-3.5 shrink-0', isActive ? 'text-accent' : 'text-faint')}
                          aria-hidden="true"
                        />
                        <span className={cn('truncate text-[12px] font-medium', isActive ? 'text-ink' : 'text-body')}>
                          {item.name}
                        </span>
                        <span className="hidden shrink-0 font-mono text-[9px] uppercase tracking-wider text-faint sm:inline">
                          {item.hub}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-3">
                        <span className="font-mono text-[10px] text-body tabular-nums">{item.queue}</span>
                        <span
                          className={cn(
                            'rounded-[3px] border px-1.5 py-0.5 font-mono text-[8px] font-semibold uppercase tracking-wider',
                            item.risk === 'HIGH'
                              ? 'border-danger/25 bg-[#fef2f2] text-[#991b1b]'
                              : item.risk === 'MEDIUM'
                                ? 'border-warning/30 bg-[#fffbeb] text-[#92400e]'
                                : 'border-success/25 bg-[#ecfdf5] text-[#065f46]',
                          )}
                        >
                          {item.risk}
                        </span>
                      </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                        <span
                          className={cn('block h-full rounded-full', isActive ? 'bg-accent' : 'bg-navy-800/35')}
                          style={{ width: `${(item.queue / maxQueue) * 100}%` }}
                        />
                      </span>
                      <span className="w-[64px] shrink-0 text-right font-mono text-[8.5px] uppercase tracking-wider text-danger">
                        {item.breached} breached
                      </span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div key={region.name} className="fg-enter flex flex-col justify-between rounded-lg border border-line bg-canvas p-4">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Selected region</p>
                <p className="mt-1 text-[15px] font-semibold tracking-tight text-ink">{region.name}</p>
                <p className="text-[10.5px] text-faint">Administrative hub · {region.hub}</p>
              </div>
              <span className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-white ring-1 ring-line">
                <Radar className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="rounded-[4px] border border-line bg-white px-2.5 py-2">
                <p className="font-mono text-[7.5px] uppercase tracking-wider text-muted">Queue</p>
                <p className="mt-1 font-['Space_Grotesk'] text-[15px] font-bold text-ink tabular-nums">{region.queue}</p>
              </div>
              <div className="rounded-[4px] border border-line bg-white px-2.5 py-2">
                <p className="font-mono text-[7.5px] uppercase tracking-wider text-muted">Breached</p>
                <p className="mt-1 font-['Space_Grotesk'] text-[15px] font-bold text-danger tabular-nums">
                  {region.breached}
                </p>
              </div>
              <div className="rounded-[4px] border border-line bg-white px-2.5 py-2">
                <p className="font-mono text-[7.5px] uppercase tracking-wider text-muted">Exposure</p>
                <p className="mt-1 font-['Space_Grotesk'] text-[15px] font-bold text-ink tabular-nums">
                  {region.exposure}
                </p>
              </div>
            </div>

            <p className="mt-3 text-[11.5px] leading-relaxed text-body">{region.note}</p>
          </div>

          <div className="mt-4 border-t border-line pt-3">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted">SLA status · 500 cases</p>
              <span className="flex items-center gap-1 font-mono text-[8.5px] uppercase tracking-wider text-success">
                <TrendingUp className="h-2.5 w-2.5" aria-hidden="true" />
                84.6% on track
              </span>
            </div>
            <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-line" aria-hidden="true">
              {SLA_BANDS.map(band => (
                <span
                  key={band.label}
                  className={band.tone}
                  style={{ width: `${(band.value / 500) * 100}%` }}
                />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
              {SLA_BANDS.map(band => (
                <span key={band.label} className="flex items-center gap-1.5 text-[9.5px] text-muted">
                  <span className={cn('h-1.5 w-1.5 rounded-full', band.tone)} aria-hidden="true" />
                  {band.label}
                  <span className="font-mono text-[9px] text-faint tabular-nums">{band.value}</span>
                </span>
              ))}
            </div>
          </div>

          <a
            href="#impact"
            className="mt-4 inline-flex items-center gap-1 text-[10.5px] font-semibold text-accent-strong hover:underline"
          >
            See what this changes institutionally
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Section>
  );
}

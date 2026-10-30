'use client';

import React, { useState } from 'react';
import { Check, LockKeyhole } from 'lucide-react';
import { Section, SectionHeading } from '@/components/marketing/SectionHeading';
import { cn } from '@/lib/utils';

interface RoleProfile {
  role: string;
  name: string;
  responsibility: string;
  functions: string[];
  dashboard: string;
  metrics: { label: string; value: string }[];
  rows: { primary: string; secondary: string; status: string; tone: 'neutral' | 'success' | 'warning' | 'danger' }[];
}

const ROLES: RoleProfile[] = [
  {
    role: 'ADMIN',
    name: 'Administrator',
    responsibility: 'Platform configuration, workflow governance, and audit oversight.',
    functions: ['Workflow configuration', 'Audit ledger oversight', 'Application operations'],
    dashboard: 'Full operational workspace including workflow configuration and the cryptographic audit ledger.',
    metrics: [
      { label: 'Configured stages', value: '5' },
      { label: 'Audit entries', value: '2' },
      { label: 'Active roles', value: '7' },
    ],
    rows: [
      { primary: 'Workflow Configuration', secondary: 'Stage sequencing & role ownership', status: 'Open', tone: 'neutral' },
      { primary: 'SHA-256 Audit Ledger', secondary: 'Chain verification available', status: 'Verified', tone: 'success' },
    ],
  },
  {
    role: 'REGIONAL_OFFICER',
    name: 'Regional Officer',
    responsibility: 'Regional scrutiny, document verification, and stage advancement.',
    functions: ['Assigned work queue', 'SLA monitoring', 'EVC scheduling'],
    dashboard: 'A regional scrutiny queue ordered by SLA exposure, with dossier actions and inspection scheduling.',
    metrics: [
      { label: 'Assigned queue', value: '4' },
      { label: 'Nearing SLA', value: '1' },
      { label: 'Breaches', value: '2' },
    ],
    rows: [
      { primary: 'APP-1021 · PICT Pune', secondary: 'Initial scrutiny cleared', status: '14d left', tone: 'success' },
      { primary: 'APP-3044 · BMS Bengaluru', secondary: 'EVC stage overdue', status: '+2d', tone: 'danger' },
    ],
  },
  {
    role: 'BUREAU_HEAD',
    name: 'Bureau Head',
    responsibility: 'Executive oversight of pendency, escalations, and approval decisions.',
    functions: ['Executive dashboard', 'Escalation center', 'Bottleneck forecast'],
    dashboard: 'Cross-region pendency, delay cost exposure, and the escalation ladder requiring bureau intervention.',
    metrics: [
      { label: 'Applications', value: '500' },
      { label: 'Escalations', value: '49' },
      { label: 'Delay exposure', value: '₹1.4 Cr' },
    ],
    rows: [
      { primary: 'APP-8892 · SVEC Chennai', secondary: 'Escalated to Level 3', status: 'Critical', tone: 'danger' },
      { primary: 'APP-1022 · VIT Pune', secondary: 'Executive approval active', status: '4d left', tone: 'warning' },
    ],
  },
  {
    role: 'EVC_MEMBER',
    name: 'EVC Committee Member',
    responsibility: 'Inspection execution and committee assignments across regional clusters.',
    functions: ['Inspection schedules', 'Cluster rosters', 'Institution records'],
    dashboard: 'Assigned inspection itinerary with clustered institutions and confirmed visit dates.',
    metrics: [
      { label: 'Clusters', value: '1' },
      { label: 'Institutions', value: '3' },
      { label: 'Visit window', value: '15 Mar' },
    ],
    rows: [
      { primary: 'CLUSTER-PUNE-01', secondary: 'PICT · VIT · AIT', status: 'Confirmed', tone: 'success' },
      { primary: 'APP-8892 · SVEC Chennai', secondary: 'Faculty deficit reported', status: 'Review', tone: 'warning' },
    ],
  },
  {
    role: 'INSTITUTION',
    name: 'Institution',
    responsibility: 'Application submission, undertakings, and supporting evidence.',
    functions: ['Application status', 'Time-bound undertakings', 'Document validity'],
    dashboard: 'Institutional portal showing application progress, compliance health, and evidence obligations.',
    metrics: [
      { label: 'Applications', value: '1' },
      { label: 'Health score', value: '31/100' },
      { label: 'Undertakings', value: '1' },
    ],
    rows: [
      { primary: 'APP-8892 · Engineering', secondary: 'Escalated · Level 3', status: 'Action', tone: 'danger' },
      { primary: 'UND-901 · Faculty pay scale', secondary: 'Due 10 Mar 2026', status: 'Pending', tone: 'warning' },
    ],
  },
  {
    role: 'COMPETENT_AUTHORITY',
    name: 'Competent Authority',
    responsibility: 'Authorized regulatory decisions and escalated case review.',
    functions: ['Application dossiers', 'Escalation reviews', 'Decision records'],
    dashboard: 'Case files escalated for authority review, with precedent context and full decision history.',
    metrics: [
      { label: 'Escalated cases', value: '1' },
      { label: 'Level 4+', value: '0' },
      { label: 'Decision queue', value: '1' },
    ],
    rows: [
      { primary: 'APP-8892 · SVEC Chennai', secondary: 'Legal risk · writ pending', status: 'Level 3', tone: 'danger' },
      { primary: 'Precedent APP-7210', secondary: 'Conditional approval · 97.2% match', status: 'Reference', tone: 'neutral' },
    ],
  },
  {
    role: 'LEGAL_CELL',
    name: 'Legal Cell',
    responsibility: 'Litigation risk, writ petition registry, and audit review.',
    functions: ['Deemed approval risk', 'Writ petition registry', 'Audit ledger'],
    dashboard: 'Risk registry of deemed-approval exposure and writ petitions linked to application records.',
    metrics: [
      { label: 'Writ petitions', value: '1' },
      { label: 'Legal risk', value: '1' },
      { label: 'Ledger entries', value: '2' },
    ],
    rows: [
      { primary: 'WP No. 14202 of 2026', secondary: 'Madras High Court · APP-8892', status: 'Pending', tone: 'danger' },
      { primary: 'Audit chain review', secondary: 'Append-only ledger', status: 'Verified', tone: 'success' },
    ],
  },
];

const TONE_CLASSES: Record<string, string> = {
  neutral: 'border-line-strong bg-white text-body',
  success: 'border-success/25 bg-[#ecfdf5] text-[#065f46]',
  warning: 'border-warning/30 bg-[#fffbeb] text-[#92400e]',
  danger: 'border-danger/25 bg-[#fef2f2] text-[#991b1b]',
};

export default function Roles() {
  const [activeIndex, setActiveIndex] = useState(2);
  const active = ROLES[activeIndex];

  return (
    <Section id="roles">
      <SectionHeading
        eyebrow="Role-based experience"
        title={
          <>
            One Platform.
            <span className="text-navy-800"> Clear Accountability at Every Level.</span>
          </>
        }
        description="Every role sees the records, queues, and decisions it is responsible for — and nothing it is not authorized to act on."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-8">
        <div className="rounded-lg border border-line bg-white p-2">
          <ul className="divide-y divide-line" role="group" aria-label="Platform roles">
            {ROLES.map((profile, index) => {
              const isActive = index === activeIndex;
              return (
                <li key={profile.role}>
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-pressed={isActive}
                    className={cn(
                      'flex w-full items-center justify-between gap-3 rounded-[4px] px-3 py-2.5 text-left transition-colors',
                      isActive ? 'bg-navy-900 text-white' : 'text-ink hover:bg-canvas',
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[12.5px] font-semibold tracking-tight">
                        {profile.name}
                      </span>
                      <span
                        className={cn(
                          'mt-0.5 block font-mono text-[8.5px] uppercase tracking-[0.12em]',
                          isActive ? 'text-navy-100/65' : 'text-faint',
                        )}
                      >
                        {profile.role}
                      </span>
                    </span>
                    <span
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                        isActive ? 'border-white/25 text-white' : 'border-line-strong text-faint',
                      )}
                      aria-hidden="true"
                    >
                      <Check className="h-2.5 w-2.5" />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div key={active.role} className="fg-enter rounded-lg border border-line bg-white">
          <div className="border-b border-line px-5 py-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-accent">{active.role}</p>
                <h3 className="mt-1 text-[17px] font-bold tracking-tight text-ink">{active.name}</h3>
              </div>
              <span className="flex items-center gap-1.5 rounded-[3px] border border-line bg-canvas px-2 py-1 font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted">
                <LockKeyhole className="h-2.5 w-2.5" aria-hidden="true" />
                Scoped workspace
              </span>
            </div>
            <p className="mt-2 max-w-xl text-[12.5px] leading-relaxed text-body">{active.responsibility}</p>
          </div>

          <div className="grid gap-5 px-5 py-4 sm:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h4 className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Platform functionality</h4>
              <ul className="mt-2.5 space-y-1.5">
                {active.functions.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-success" aria-hidden="true" />
                    <span className="text-[11.5px] leading-relaxed text-body">{item}</span>
                  </li>
                ))}
              </ul>
              <h4 className="mt-4 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Dashboard experience</h4>
              <p className="mt-2 text-[11.5px] leading-relaxed text-body">{active.dashboard}</p>
            </div>

            <div className="rounded-md border border-line bg-canvas p-3">
              <div className="flex items-center justify-between border-b border-line pb-2">
                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Workspace preview</span>
                <span className="flex gap-0.5" aria-hidden="true">
                  <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
                  <span className="h-1.5 w-1.5 rounded-full bg-line-strong" />
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
              </div>
              <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                {active.metrics.map(metric => (
                  <div key={metric.label} className="rounded-[3px] border border-line bg-white px-2 py-1.5">
                    <p className="truncate font-mono text-[7px] uppercase tracking-wider text-muted">{metric.label}</p>
                    <p className="mt-0.5 font-['Space_Grotesk'] text-[12px] font-bold leading-none text-ink tabular-nums">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
              <ul className="mt-2.5 divide-y divide-line rounded-[3px] border border-line bg-white">
                {active.rows.map(row => (
                  <li key={row.primary} className="flex items-center justify-between gap-2 px-2 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-[9px] font-medium text-ink">{row.primary}</p>
                      <p className="truncate text-[8px] text-faint">{row.secondary}</p>
                    </div>
                    <span
                      className={cn(
                        'shrink-0 rounded-[2px] border px-1 py-0.5 font-mono text-[7px] font-semibold uppercase tracking-wider',
                        TONE_CLASSES[row.tone],
                      )}
                    >
                      {row.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-2 border-t border-line bg-canvas px-5 py-3">
            <LockKeyhole className="mt-0.5 h-3 w-3 shrink-0 text-muted" aria-hidden="true" />
            <p className="text-[10.5px] leading-relaxed text-muted">
              Role permissions are scoped per workspace. Demo login only opens the workspace of the
              selected demonstration position.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}

import React from 'react';
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Fingerprint,
  IndianRupee,
  MapPin,
  Search,
  ShieldCheck,
  Wallet,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Product-interface previews.
 *
 * These reuse the FlowGuard visual system (navy chrome, hairline borders, mono
 * labels, seeded demonstration values) so the public page previews the real
 * operational workspace instead of a decorative illustration.
 */

function PreviewShell({
  label,
  meta,
  children,
  footer,
  className,
}: {
  label: string;
  meta: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('overflow-hidden rounded-lg border border-line-strong/80 bg-white shadow-sm', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-line bg-canvas px-4 py-2.5">
        <span className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em] text-body">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {label}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-faint">{meta}</span>
      </div>
      <div className="p-4">{children}</div>
      {footer ? (
        <div className="border-t border-line bg-canvas px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
          {footer}
        </div>
      ) : null}
    </div>
  );
}

function StatusChip({
  children,
  tone = 'neutral',
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'accent';
}) {
  const tones: Record<string, string> = {
    neutral: 'border-line-strong bg-white text-body',
    success: 'border-success/25 bg-[#ecfdf5] text-[#065f46]',
    warning: 'border-warning/30 bg-[#fffbeb] text-[#92400e]',
    danger: 'border-danger/25 bg-[#fef2f2] text-[#991b1b]',
    accent: 'border-accent/20 bg-tint text-accent-strong',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-[3px] border px-1.5 py-0.5 font-mono text-[8.5px] font-semibold uppercase tracking-[0.08em]',
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}

function Metric({
  label,
  value,
  note,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  tone: 'navy' | 'danger' | 'warning' | 'accent';
}) {
  const tones: Record<string, string> = {
    navy: 'text-navy-800 bg-navy-900/5',
    danger: 'text-danger bg-[#fef2f2]',
    warning: 'text-[#b7791f] bg-[#fffbeb]',
    accent: 'text-accent bg-tint',
  };
  return (
    <div className="rounded-[5px] border border-line bg-white p-2.5">
      <div className="flex items-center justify-between gap-2">
        <span className="truncate font-mono text-[8px] uppercase tracking-[0.1em] text-muted">{label}</span>
        <span className={cn('flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px]', tones[tone])}>
          <Icon className="h-2.5 w-2.5" aria-hidden />
        </span>
      </div>
      <p className="mt-1.5 font-['Space_Grotesk'] text-[17px] font-bold leading-none tracking-tight text-ink tabular-nums">
        {value}
      </p>
      <p className="mt-1 text-[8.5px] leading-snug text-faint">{note}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ HERO --- */

const STATUS_DISTRIBUTION = [
  { label: 'Submitted', count: 132, tone: 'bg-navy-700' },
  { label: 'In scrutiny', count: 178, tone: 'bg-accent' },
  { label: 'Inspection', count: 96, tone: 'bg-[#6d9bea]' },
  { label: 'Decision', count: 61, tone: 'bg-warning' },
  { label: 'Escalated', count: 33, tone: 'bg-danger' },
];

const SLA_SERIES = [62, 48, 55, 71, 44, 38, 27];

const HERO_ACTIVITY = [
  { title: 'EVC cluster confirmed', meta: 'Pune corridor · 3 institutions', time: '12:40' },
  { title: 'Stage cleared — APP-1021', meta: 'Ananya Sharma · REGIONAL_OFFICER', time: '11:15' },
  { title: 'Escalation L3 — APP-8892', meta: 'Bureau Head notified', time: '09:02' },
];

export function HeroPreview({ today }: { today: string }) {
  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -inset-x-3 -top-4 bottom-6 -z-10 rounded-2xl bg-[linear-gradient(160deg,#e8effc_0%,#f6f9ff_45%,#ffffff_100%)]"
        aria-hidden="true"
      />
      <div className="overflow-hidden rounded-xl border border-line-strong/80 bg-white shadow-[0_24px_70px_-38px_rgba(11,28,48,0.6)]">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-navy-900 px-4 py-3 text-white">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-accent text-[9px] font-bold tracking-tight">
              AF
            </span>
            <div>
              <p className="font-['Space_Grotesk'] text-[12px] font-semibold leading-none tracking-tight">
                Regulatory Overview
              </p>
              <p className="mt-1 font-mono text-[9px] text-navy-100/75">{today}</p>
            </div>
          </div>
          <span className="rounded-[3px] border border-white/20 bg-white/10 px-1.5 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-navy-100/85">
            Demonstration data
          </span>
        </div>

        <div className="space-y-2.5 bg-canvas p-3">
          <div className="grid grid-cols-2 gap-2.5">
            <Metric label="Applications" value="500" note="Active this cycle" icon={FileText} tone="navy" />
            <Metric label="Delay cost exposure" value="₹1.4 Cr" note="Estimated from demo records" icon={IndianRupee} tone="danger" />
            <Metric label="Compliance genome" value="31/100" note="SVEC aggregate score" icon={ShieldCheck} tone="warning" />
            <Metric label="Escalation levels" value="5" note="Structured ladder" icon={AlertTriangle} tone="accent" />
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <div className="rounded-[5px] border border-line bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-ink">Application status</span>
                <span className="font-mono text-[8px] uppercase tracking-wider text-faint">500 total</span>
              </div>
              <ul className="mt-2.5 space-y-1.5">
                {STATUS_DISTRIBUTION.map(item => (
                  <li key={item.label} className="flex items-center gap-2">
                    <span className="w-[62px] shrink-0 text-[8.5px] text-muted">{item.label}</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                      <span
                        className={cn('block h-full rounded-full', item.tone)}
                        style={{ width: `${(item.count / 178) * 100}%` }}
                      />
                    </span>
                    <span className="w-5 shrink-0 text-right font-mono text-[8.5px] text-body tabular-nums">{item.count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[5px] border border-line bg-white p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold text-ink">SLA monitoring</span>
                <span className="font-mono text-[8px] uppercase tracking-wider text-faint">7 days</span>
              </div>
              <div className="mt-3 flex h-[52px] items-end gap-1.5" aria-hidden="true">
                {SLA_SERIES.map((height, index) => (
                  <span
                    key={index}
                    className={cn(
                      'flex-1 rounded-t-[2px]',
                      index > 4 ? 'bg-danger/70' : index === 4 ? 'bg-warning/80' : 'bg-accent/75',
                    )}
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="mt-2.5 flex items-center justify-between border-t border-line pt-2">
                <span className="font-mono text-[8px] uppercase tracking-wider text-muted">77 approaching</span>
                <span className="font-mono text-[8px] uppercase tracking-wider text-danger">18 breached</span>
              </div>
            </div>
          </div>

          <div className="rounded-[5px] border border-danger/25 bg-[#fef2f2]/60 p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] font-bold text-[#991b1b]">APP-8892</span>
                  <StatusChip tone="danger">Level 3 escalated</StatusChip>
                </div>
                <p className="mt-1 truncate text-[10px] font-semibold text-ink">
                  Sri Venkateswara Engineering College
                </p>
                <p className="mt-0.5 text-[8.5px] text-muted">Tamil Nadu · 780 intake · 4 open deficiencies</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="font-mono text-[10px] font-bold text-[#991b1b]">+1d</p>
                <p className="font-mono text-[7.5px] uppercase tracking-wider text-muted">SLA overdue</p>
              </div>
            </div>
          </div>

          <div className="rounded-[5px] border border-line bg-white p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-ink">Recent regulatory activity</span>
              <span className="font-mono text-[8px] uppercase tracking-wider text-faint">Today</span>
            </div>
            <ul className="mt-2 divide-y divide-line">
              {HERO_ACTIVITY.map(item => (
                <li key={item.title} className="flex items-center justify-between gap-3 py-1.5">
                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-medium text-ink">{item.title}</p>
                    <p className="truncate text-[8px] text-faint">{item.meta}</p>
                  </div>
                  <span className="shrink-0 font-mono text-[8px] text-muted">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
        Interface preview · seeded demonstration records
      </p>
    </div>
  );
}

/* ------------------------------------------------------- APPLICATION ----- */

const DOSSIER_STAGES = [
  { name: 'Initial Scrutiny', role: 'Regional Officer', status: 'Cleared', elapsed: '14 / 15 d', tone: 'success' as const },
  { name: 'Expert Visit Committee', role: 'EVC Member', status: 'Active', elapsed: '21 / 20 d', tone: 'warning' as const },
  { name: 'Deficiency Rebuttal', role: 'Regional Officer', status: 'Escalated', elapsed: '11 / 10 d', tone: 'danger' as const },
  { name: 'Executive Approval', role: 'Bureau Head', status: 'Pending', elapsed: '0 / 10 d', tone: 'neutral' as const },
  { name: 'Letter of Approval', role: 'Administrator', status: 'Pending', elapsed: '0 / 5 d', tone: 'neutral' as const },
];

export function WorkflowPreview() {
  return (
    <PreviewShell label="Application dossier" meta="APP-8892" footer="Assigned officer · Ananya Sharma">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold text-ink">Sri Venkateswara Engineering College</p>
          <p className="mt-0.5 text-[9px] text-muted">Engineering &amp; Technology · Tamil Nadu</p>
        </div>
        <StatusChip tone="danger">Legal risk</StatusChip>
      </div>

      <ol className="mt-3 space-y-0">
        {DOSSIER_STAGES.map((stage, index) => {
          const isLast = index === DOSSIER_STAGES.length - 1;
          return (
            <li key={stage.name} className="relative flex gap-2.5 pb-2.5 last:pb-0">
              {!isLast ? (
                <span className="absolute left-[6px] top-3 h-full w-px bg-line" aria-hidden="true" />
              ) : null}
              <span
                className={cn(
                  'relative z-10 mt-1 h-[13px] w-[13px] shrink-0 rounded-full border-2 bg-white',
                  stage.tone === 'success' && 'border-success',
                  stage.tone === 'warning' && 'border-warning',
                  stage.tone === 'danger' && 'border-danger',
                  stage.tone === 'neutral' && 'border-line-strong',
                )}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[10px] font-semibold text-ink">{stage.name}</p>
                  <span className="shrink-0 font-mono text-[8px] text-muted tabular-nums">{stage.elapsed}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-2">
                  <p className="truncate text-[8.5px] text-faint">{stage.role}</p>
                  <StatusChip tone={stage.tone}>{stage.status}</StatusChip>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="mt-3 flex items-center justify-between rounded-[4px] border border-line bg-canvas px-2.5 py-2">
        <span className="flex items-center gap-1.5 text-[9px] text-body">
          <AlertTriangle className="h-3 w-3 text-warning" aria-hidden />
          4 open deficiencies
        </span>
        <span className="font-mono text-[8px] uppercase tracking-wider text-muted">Stage 3 of 5</span>
      </div>
    </PreviewShell>
  );
}

/* --------------------------------------------------------------- SLA ----- */

const ESCALATION_LEVELS = [1, 2, 3, 4, 5];

export function SlaPreview() {
  return (
    <PreviewShell label="SLA intelligence" meta="APP-8892" footer="Escalation evaluated automatically">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted">Stage SLA window</p>
          <p className="mt-1 font-['Space_Grotesk'] text-[22px] font-bold leading-none tracking-tight text-danger tabular-nums">
            01 day
          </p>
          <p className="mt-1 text-[9px] text-body">Overdue on Expert Visit Committee</p>
        </div>
        <StatusChip tone="danger">Breached</StatusChip>
      </div>

      <div className="mt-3">
        <div className="flex gap-1" aria-hidden="true">
          {ESCALATION_LEVELS.map(level => (
            <span
              key={level}
              className={cn(
                'h-1.5 flex-1 rounded-full',
                level <= 3 ? 'bg-danger' : 'bg-line',
              )}
            />
          ))}
        </div>
        <div className="mt-1.5 flex justify-between font-mono text-[7.5px] uppercase tracking-wider text-faint">
          <span>L1 officer</span>
          <span className="font-semibold text-danger">L3 bureau head</span>
          <span>L5 authority</span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-[4px] border border-line bg-canvas p-2">
          <p className="font-mono text-[8px] uppercase tracking-wider text-muted">Delay exposure</p>
          <p className="mt-1 flex items-center gap-1 font-['Space_Grotesk'] text-[13px] font-bold text-ink">
            <IndianRupee className="h-3 w-3 text-danger" aria-hidden />1.42 Cr
          </p>
        </div>
        <div className="rounded-[4px] border border-line bg-canvas p-2">
          <p className="font-mono text-[8px] uppercase tracking-wider text-muted">Elapsed</p>
          <p className="mt-1 font-['Space_Grotesk'] text-[13px] font-bold text-ink">21 of 20 days</p>
        </div>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5 rounded-[4px] border border-warning/30 bg-[#fffbeb] px-2 py-1.5">
        <Clock3 className="h-3 w-3 shrink-0 text-[#b7791f]" aria-hidden />
        <p className="text-[8.5px] leading-snug text-[#92400e]">
          Level 4 promotion in 6 days if unacknowledged.
        </p>
      </div>
    </PreviewShell>
  );
}

/* --------------------------------------------------------------- EVC ----- */

const CLUSTER_SITES = [
  { name: 'PICT, Pune', code: 'INST-1011', x: 36, y: 38 },
  { name: 'VIT, Pune', code: 'INST-1012', x: 52, y: 50 },
  { name: 'AIT, Pune', code: 'INST-1013', x: 44, y: 64 },
];

export function EvcPreview() {
  return (
    <PreviewShell label="EVC coordination" meta="CLUSTER-PUNE-01" footer="3 institutions · 35 km radius">
      <div className="relative h-[118px] overflow-hidden rounded-[4px] border border-line bg-[#f4f7fb]">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute left-1/2 top-1/2 h-[86px] w-[86px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/50 bg-accent/5"
          aria-hidden="true"
        />
        {CLUSTER_SITES.map(site => (
          <span
            key={site.code}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1"
            style={{ left: `${site.x}%`, top: `${site.y}%` }}
          >
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-accent shadow-sm">
              <span className="h-1 w-1 rounded-full bg-white" />
            </span>
            <span className="whitespace-nowrap rounded-[2px] border border-line bg-white/95 px-1 font-mono text-[7px] text-body">
              {site.code}
            </span>
          </span>
        ))}
        <span className="absolute bottom-1.5 left-2 font-mono text-[7px] uppercase tracking-wider text-faint">
          Western region · 18.46°N 73.86°E
        </span>
      </div>

      <ul className="mt-2.5 divide-y divide-line">
        {[
          { name: 'Pune Institute of Computer Technology', date: '15 Mar' },
          { name: 'Vishwakarma Institute of Technology', date: '15 Mar' },
          { name: 'Army Institute of Technology', date: '16 Mar' },
        ].map(site => (
          <li key={site.name} className="flex items-center justify-between gap-2 py-1.5">
            <span className="flex min-w-0 items-center gap-1.5">
              <MapPin className="h-2.5 w-2.5 shrink-0 text-accent" aria-hidden />
              <span className="truncate text-[9px] text-body">{site.name}</span>
            </span>
            <span className="shrink-0 font-mono text-[8px] text-muted">{site.date}</span>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex items-center gap-1.5 rounded-[4px] border border-line bg-canvas px-2 py-1.5">
        <CalendarDays className="h-3 w-3 text-accent" aria-hidden />
        <span className="text-[8.5px] text-body">Committee: 3 members assigned</span>
        <StatusChip tone="success">Confirmed</StatusChip>
      </div>
    </PreviewShell>
  );
}

/* ----------------------------------------------------------- GENOME ----- */

const GENOME_CATEGORIES = [
  { label: 'Faculty & pay scale', value: 42, tone: 'bg-warning' },
  { label: 'Infrastructure', value: 68, tone: 'bg-accent' },
  { label: 'Governance records', value: 55, tone: 'bg-navy-700' },
  { label: 'Document evidence', value: 24, tone: 'bg-danger' },
];

export function GenomePreview() {
  const score = 31;
  const radius = 34;
  const circumference = 2 * Math.PI * radius;

  return (
    <PreviewShell label="Compliance genome" meta="INST-8892" footer="Score = 100 − (5 × late) − (10 × escalations)">
      <div className="flex items-center gap-4">
        <div className="relative h-[86px] w-[86px] shrink-0">
          <svg viewBox="0 0 86 86" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="43" cy="43" r={radius} fill="none" stroke="#e2e8f0" strokeWidth="8" />
            <circle
              cx="43"
              cy="43"
              r={radius}
              fill="none"
              stroke="#e9a23b"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${(score / 100) * circumference} ${circumference}`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-['Space_Grotesk'] text-[19px] font-bold leading-none text-ink tabular-nums">{score}</span>
            <span className="mt-0.5 font-mono text-[7px] uppercase tracking-wider text-faint">of 100</span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] font-semibold text-ink">Sri Venkateswara Engineering College</p>
          <p className="mt-0.5 text-[8.5px] text-muted">Tamil Nadu · AICTE-TN-ENG-441</p>
          <div className="mt-2 flex flex-wrap gap-1">
            <StatusChip tone="warning">Low band</StatusChip>
            <StatusChip tone="danger">8 escalations</StatusChip>
          </div>
        </div>
      </div>

      <ul className="mt-3 space-y-2">
        {GENOME_CATEGORIES.map(category => (
          <li key={category.label}>
            <div className="flex items-center justify-between text-[8.5px]">
              <span className="text-body">{category.label}</span>
              <span className="font-mono text-muted tabular-nums">{category.value}%</span>
            </div>
            <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-line">
              <span className={cn('block h-full rounded-full', category.tone)} style={{ width: `${category.value}%` }} />
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-between rounded-[4px] border border-line bg-canvas px-2 py-1.5">
        <span className="flex items-center gap-1.5 text-[8.5px] text-body">
          <CheckCircle2 className="h-3 w-3 text-success" aria-hidden />
          2 documents verified
        </span>
        <span className="font-mono text-[7.5px] uppercase tracking-wider text-danger">1 overdue undertaking</span>
      </div>
    </PreviewShell>
  );
}

/* -------------------------------------------------------- PRECEDENT ----- */

const PRECEDENTS = [
  {
    id: 'APP-7210',
    institution: 'Kongu Engineering College',
    decision: 'Conditional',
    similarity: '97.2%',
    reason: 'Faculty deficit resolved via 30-day undertaking',
    tone: 'warning' as const,
  },
  {
    id: 'APP-6540',
    institution: 'RMK Engineering College',
    decision: 'Rejected',
    similarity: '94.1%',
    reason: 'Unrectified land conversion discrepancy',
    tone: 'danger' as const,
  },
];

export function PrecedentPreview() {
  return (
    <PreviewShell label="Precedent intelligence" meta="Similarity ranked" footer="Decision support only · authority remains with the competent authority">
      <div className="flex items-center gap-2 rounded-[4px] border border-line bg-canvas px-2.5 py-2">
        <Search className="h-3 w-3 text-muted" aria-hidden />
        <span className="text-[9.5px] text-body">faculty deficit · engineering · 780 intake</span>
        <span className="ml-auto font-mono text-[7.5px] uppercase tracking-wider text-faint">3 matches</span>
      </div>

      <ul className="mt-2.5 space-y-2">
        {PRECEDENTS.map(item => (
          <li key={item.id} className="rounded-[4px] border border-line p-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[9px] font-bold text-navy-800">{item.id}</span>
                <StatusChip tone={item.tone}>{item.decision}</StatusChip>
              </div>
              <span className="font-mono text-[9px] font-semibold text-accent-strong tabular-nums">{item.similarity}</span>
            </div>
            <p className="mt-1 truncate text-[9px] font-medium text-ink">{item.institution}</p>
            <p className="mt-0.5 text-[8.5px] leading-snug text-muted">{item.reason}</p>
          </li>
        ))}
      </ul>

      <div className="mt-2.5 flex items-start gap-1.5 rounded-[4px] border border-accent/20 bg-tint px-2 py-1.5">
        <Fingerprint className="mt-px h-3 w-3 shrink-0 text-accent" aria-hidden />
        <p className="text-[8px] leading-relaxed text-body">
          Matched on intake size, defect pattern, category, and region — recorded reasoning is preserved
          with each case.
        </p>
      </div>
    </PreviewShell>
  );
}

/* ------------------------------------------------------------ AUDIT ----- */

const AUDIT_ENTRIES = [
  {
    time: '09:02',
    actor: 'Dr. Rameshwar Rao',
    role: 'BUREAU_HEAD',
    action: 'ESCALATION_ACKNOWLEDGE',
    entity: 'APP-8892',
    hash: '0x4f8a…c21e7d30f',
  },
  {
    time: '08:47',
    actor: 'Ananya Sharma',
    role: 'REGIONAL_OFFICER',
    action: 'STAGE_PROGRESSION',
    entity: 'APP-1021',
    hash: '0x9b1c…41de8a764',
  },
  {
    time: '08:31',
    actor: 'System',
    role: 'SLA_MONITOR',
    action: 'SLA_BREACH_DETECTED',
    entity: 'APP-8892',
    hash: '0x27e0…9a4b2f10c',
  },
];

export function AuditPreview() {
  return (
    <PreviewShell label="Audit ledger" meta="Append-only" footer="SHA-256 hash chaining · 2 verified entries">
      <div className="flex items-center justify-between rounded-[4px] border border-success/25 bg-[#ecfdf5] px-2.5 py-1.5">
        <span className="flex items-center gap-1.5 text-[9px] font-medium text-[#065f46]">
          <ShieldCheck className="h-3 w-3" aria-hidden />
          Chain integrity verified
        </span>
        <span className="font-mono text-[7.5px] uppercase tracking-wider text-[#065f46]">Intact</span>
      </div>

      <ol className="mt-3 space-y-2.5">
        {AUDIT_ENTRIES.map(entry => (
          <li key={`${entry.time}-${entry.action}`} className="relative border-l border-line pl-3">
            <span className="absolute -left-[3.5px] top-1 h-1.5 w-1.5 rounded-full bg-navy-700" aria-hidden="true" />
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[8.5px] font-semibold text-ink">{entry.action}</span>
              <span className="font-mono text-[7.5px] text-faint">{entry.time}</span>
            </div>
            <p className="mt-0.5 truncate text-[8.5px] text-muted">
              {entry.actor} · {entry.role} · {entry.entity}
            </p>
            <p className="mt-1 truncate font-mono text-[7.5px] text-faint">{entry.hash}</p>
          </li>
        ))}
      </ol>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-2">
        <span className="flex items-center gap-1.5 text-[8.5px] text-body">
          <Wallet className="h-3 w-3 text-accent" aria-hidden />
          Export-ready record view
        </span>
        <span className="font-mono text-[7.5px] uppercase tracking-wider text-muted">Read only</span>
      </div>
    </PreviewShell>
  );
}

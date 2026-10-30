import Link from 'next/link';
import React from 'react';
import {
  ArrowRight,
  Clock3,
  Eye,
  FileText,
  Layers,
  MapPin,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { Section, SectionHeading } from '@/components/marketing/SectionHeading';

const VALUE_ITEMS = [
  {
    title: 'Workflow Visibility',
    description: 'Track regulatory applications through every approval stage.',
    icon: Layers,
  },
  {
    title: 'SLA Intelligence',
    description: 'Identify delays before they become critical.',
    icon: Clock3,
  },
  {
    title: 'Inspection Coordination',
    description: 'Organize regional EVC visits and scheduling.',
    icon: MapPin,
  },
  {
    title: 'Audit Accountability',
    description: 'Maintain traceable records of regulatory decisions.',
    icon: ShieldCheck,
  },
];

export function ValueStrip() {
  return (
    <section id="platform" className="scroll-mt-24 border-y border-line bg-canvas">
      <div className="mx-auto grid w-full max-w-7xl gap-px overflow-hidden bg-line px-5 py-0 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {VALUE_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex gap-3 bg-canvas px-0 py-6 sm:px-5 lg:px-6">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] border border-line-strong/70 bg-white text-navy-800">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[13px] font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-1 text-[11.5px] leading-relaxed text-muted">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

const PROBLEMS = [
  {
    title: 'Fragmented Approval Workflows',
    description:
      'Information and progress become difficult to track across multiple approval stages.',
    icon: Layers,
  },
  {
    title: 'Delayed Regulatory Decisions',
    description:
      'Without proactive SLA monitoring, bottlenecks may remain unnoticed until deadlines are missed.',
    icon: Clock3,
  },
  {
    title: 'Inefficient Inspection Coordination',
    description:
      'Regional inspection planning and college clustering require better coordination.',
    icon: MapPin,
  },
  {
    title: 'Limited Decision Traceability',
    description:
      'Regulatory decisions require consistent documentation, accountability, and audit history.',
    icon: ShieldCheck,
  },
];

export function ProblemSection() {
  return (
    <Section id="problem">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-end">
        <SectionHeading
          eyebrow="Why FlowGuard exists"
          title={
            <>
              Regulatory Complexity Shouldn&apos;t Create
              <span className="text-navy-800"> Operational Blind Spots.</span>
            </>
          }
        />
        <p className="max-w-xl text-[14px] leading-relaxed text-body lg:pb-1">
          Approval ecosystems carry many stages, owners, and evidence trails. When those threads
          live in separate places, delays and accountability gaps are discovered late — usually by
          the institution waiting on a decision, or by the authority reviewing a disputed one.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEMS.map(problem => {
          const Icon = problem.icon;
          return (
            <article
              key={problem.title}
              className="flex flex-col rounded-lg border border-line bg-white p-5 transition-colors hover:border-line-strong"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-canvas text-navy-800 ring-1 ring-line">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-[13.5px] font-semibold leading-snug tracking-tight text-ink">
                {problem.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">{problem.description}</p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

const IMPACT_ITEMS = [
  {
    title: 'Reduced workflow blind spots',
    description: 'Every application carries a visible stage, owner, and recorded action.',
    icon: Eye,
  },
  {
    title: 'Earlier identification of SLA risks',
    description: 'Approaching deadlines surface as attention items rather than post-mortems.',
    icon: Clock3,
  },
  {
    title: 'Better inspection coordination',
    description: 'Regional visits are grouped and scheduled with the committee in one view.',
    icon: MapPin,
  },
  {
    title: 'More consistent regulatory decisions',
    description: 'Documented precedents and reasoning support comparable outcomes.',
    icon: Scale,
  },
  {
    title: 'Improved audit traceability',
    description: 'Critical actions stay in a verifiable, append-only decision history.',
    icon: ShieldCheck,
  },
];

export function ImpactSection() {
  return (
    <Section id="impact" tone="canvas">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <SectionHeading
          eyebrow="Institutional impact"
          title={
            <>
              Better Visibility.
              <span className="text-navy-800"> Stronger Accountability.</span>
            </>
          }
        />
        <p className="max-w-xl text-[14px] leading-relaxed text-body lg:pb-1">
          These are the intended outcomes of the platform&apos;s workflow design. They describe how
          the system is built to operate — not measured production results.
        </p>
      </div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {IMPACT_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="bg-white p-5">
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-navy-700" aria-hidden="true" />
                <h3 className="text-[13px] font-semibold tracking-tight text-ink">{item.title}</h3>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-muted">{item.description}</p>
            </div>
          );
        })}
        <div className="flex flex-col justify-center bg-navy-900 p-5 text-white">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-navy-100/60">Demonstration figures</p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-navy-100/85">
            The workspace is seeded with 500 applications and representative compliance,
            escalation, and cost values for evaluation. No real institutional data is included.
          </p>
        </div>
      </div>
    </Section>
  );
}

const ABOUT_FACTS = [
  { label: 'Product', value: 'Regulatory workflow automation and accountability' },
  { label: 'Scope', value: 'Application workflows, compliance, EVC inspections, SLA, audit' },
  { label: 'Deployment status', value: 'Prototype demonstration — not an official AICTE deployment' },
  { label: 'Data', value: 'Seeded demonstration records; no production data' },
  { label: 'Account access', value: 'Predefined demonstration accounts; public registration disabled' },
];

export function AboutSection() {
  return (
    <Section id="about">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="About the platform"
            title={
              <>
                Built for the AICTE regulatory
                <span className="text-navy-800"> ecosystem.</span>
              </>
            }
            description="AICTE FlowGuard is an independent prototype built for Smart India Hackathon 2026. It models how regulatory bodies can connect approval workflows, institutional evidence, inspection logistics, escalation policy, and audit records into a single accountable operating system."
          />
          <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-body">
            The operational workspace is the product. This public site exists to explain the
            platform, its capabilities, and the roles it supports before a user signs in.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 rounded-sm bg-navy-900 px-4 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-navy-950"
            >
              Sign in to the workspace
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <a
              href="#faq"
              className="inline-flex items-center gap-2 rounded-sm border border-line-strong px-4 py-2.5 text-[12.5px] font-semibold text-ink transition-colors hover:bg-canvas"
            >
              Read the FAQ
            </a>
          </div>
        </div>

        <dl className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
          {ABOUT_FACTS.map(fact => (
            <div key={fact.label} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[150px_1fr] sm:gap-4">
              <dt className="font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted">{fact.label}</dt>
              <dd className="text-[12.5px] leading-relaxed text-ink">{fact.value}</dd>
            </div>
          ))}
          <div className="flex items-start gap-2 bg-canvas px-5 py-3.5">
            <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" aria-hidden="true" />
            <p className="text-[11.5px] leading-relaxed text-body">
              Privacy, terms, and contact channels are not published in this prototype. Nothing on
              this site implies AICTE ownership or endorsement.
            </p>
          </div>
        </dl>
      </div>
    </Section>
  );
}

export function FinalCta() {
  return (
    <section className="border-t border-line bg-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="relative overflow-hidden rounded-xl bg-navy-900 px-6 py-10 text-white sm:px-10 lg:px-12 lg:py-12">
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '72px 100%',
            }}
            aria-hidden="true"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div>
              <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-navy-100/60">
                AICTE FlowGuard
              </p>
              <h2 className="mt-3 max-w-xl text-2xl font-bold leading-[1.15] tracking-tight sm:text-[30px]">
                Bring Clarity to Every Regulatory Decision.
              </h2>
              <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-navy-100/80">
                Connect workflows, monitor deadlines, coordinate inspections, and strengthen
                accountability through one unified regulatory platform.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row lg:justify-end">
              <Link
                href="/signin"
                className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-5 py-3 text-[13px] font-semibold text-navy-900 transition-colors hover:bg-navy-100"
              >
                Access FlowGuard
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a
                href="#capabilities"
                className="inline-flex items-center justify-center rounded-sm border border-white/25 px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                Explore Platform
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

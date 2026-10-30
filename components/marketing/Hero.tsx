import Link from 'next/link';
import React from 'react';
import { ArrowRight, CheckCircle2, LockKeyhole } from 'lucide-react';
import { HeroPreview } from '@/components/marketing/previews';
import { Eyebrow } from '@/components/marketing/SectionHeading';

const CREDIBILITY = [
  'End-to-end workflow visibility',
  'Proactive SLA monitoring',
  'Verifiable audit accountability',
];

export default function Hero({ today }: { today: string }) {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.55]"
        style={{
          backgroundImage: 'linear-gradient(to right, #eef2f8 1px, transparent 1px)',
          backgroundSize: '88px 100%',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.02fr_1.1fr] lg:items-center lg:gap-14 lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <Eyebrow>Regulatory Workflow Intelligence</Eyebrow>

          <h1 className="mt-5 text-[34px] font-bold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[44px] lg:text-[52px]">
            Regulatory Approvals.
            <span className="mt-1 block text-navy-800">Without the Blind Spots.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[16px] font-medium leading-relaxed text-navy-800 sm:text-[17px]">
            One connected system for transparent approvals, proactive compliance, coordinated
            inspections, and accountable regulatory decisions.
          </p>

          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-body">
            AICTE FlowGuard brings regulatory workflows, institutional compliance, inspection
            coordination, SLA monitoring, and audit accountability into one operational platform.
          </p>

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <a
              href="#capabilities"
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy-900 px-5 py-3 text-[13px] font-semibold text-white shadow-sm transition-colors hover:bg-navy-950"
            >
              Explore the Platform
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/signin"
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-line-strong bg-white px-5 py-3 text-[13px] font-semibold text-ink transition-colors hover:border-navy-800 hover:bg-canvas"
            >
              <LockKeyhole className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
              Sign In
            </Link>
          </div>

          <ul className="mt-9 grid gap-2.5 border-t border-line pt-6 sm:grid-cols-3 sm:gap-4">
            {CREDIBILITY.map(item => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 className="mt-px h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                <span className="text-[11.5px] leading-snug text-body">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:pl-2">
          <HeroPreview today={today} />
        </div>
      </div>
    </section>
  );
}

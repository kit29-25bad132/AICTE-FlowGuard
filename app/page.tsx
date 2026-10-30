import type { Metadata } from 'next';
import React from 'react';
import SiteHeader from '@/components/marketing/SiteHeader';
import SiteFooter from '@/components/marketing/SiteFooter';
import Hero from '@/components/marketing/Hero';
import {
  AboutSection,
  FinalCta,
  ImpactSection,
  ProblemSection,
  ValueStrip,
} from '@/components/marketing/Sections';
import Capabilities from '@/components/marketing/Capabilities';
import Workflow from '@/components/marketing/Workflow';
import Intelligence from '@/components/marketing/Intelligence';
import Roles from '@/components/marketing/Roles';
import Faq from '@/components/marketing/Faq';

export const metadata: Metadata = {
  title: 'AICTE FlowGuard — Regulatory Workflow & Accountability Platform',
  description:
    'Making regulatory approvals transparent, accountable, and time-bound. One connected platform for approval workflows, compliance, EVC inspections, SLA intelligence, and audit accountability.',
};

// The hero preview renders the current operating date, so keep this route request-rendered.
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const today = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="min-h-screen bg-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-sm focus:bg-navy-900 focus:px-3 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main-content">
        <Hero today={today} />
        <ValueStrip />
        <ProblemSection />
        <Capabilities />
        <Workflow />
        <Intelligence />
        <Roles />
        <ImpactSection />
        <Faq />
        <AboutSection />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
}

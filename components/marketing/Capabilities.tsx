import React from 'react';
import { Check } from 'lucide-react';
import { Section, SectionHeading } from '@/components/marketing/SectionHeading';
import {
  AuditPreview,
  EvcPreview,
  GenomePreview,
  PrecedentPreview,
  SlaPreview,
  WorkflowPreview,
} from '@/components/marketing/previews';

const FEATURES = [
  {
    index: '01',
    title: 'Application Workflow Management',
    description:
      'Manage regulatory applications across their complete lifecycle with clearly defined stages, responsibilities, and decision records.',
    points: [
      'Stage ownership mapped to the responsible role',
      'Deficiency and rebuttal tracking on the case',
      'Decision records retained with each application',
    ],
    preview: WorkflowPreview,
  },
  {
    index: '02',
    title: 'SLA Intelligence & Escalation',
    description:
      'Identify applications approaching deadlines and trigger structured escalation workflows.',
    points: [
      'Stage-level SLA clocks with elapsed time',
      'Five-level escalation ladder with recipients',
      'Delay cost exposure estimated per case',
    ],
    preview: SlaPreview,
  },
  {
    index: '03',
    title: 'EVC Inspection Coordination',
    description:
      'Coordinate regional inspections using location-aware college clustering and centralized scheduling.',
    points: [
      'Institutions grouped by proximity for one visit',
      'Central scheduling with cluster confirmation',
      'Committee assignment recorded per inspection',
    ],
    preview: EvcPreview,
  },
  {
    index: '04',
    title: 'Compliance Genome',
    description:
      'Build an evidence-based view of institutional compliance using relevant assessment indicators.',
    points: [
      'Deterministic institutional health scoring',
      'Category-level compliance breakdown',
      'Evidence and undertaking status in one view',
    ],
    preview: GenomePreview,
  },
  {
    index: '05',
    title: 'Regulatory Precedent Intelligence',
    description:
      'Support more consistent regulatory decisions through searchable historical cases and documented precedents.',
    points: [
      'Similarity-ranked historical cases',
      'Recorded decision reasoning and outcomes',
      'Consistency support for reviewing officers',
    ],
    preview: PrecedentPreview,
  },
  {
    index: '06',
    title: 'Audit & Accountability',
    description:
      'Maintain traceable records of critical regulatory actions and generate audit-ready documentation.',
    points: [
      'Append-only ledger of critical actions',
      'SHA-256 hash chaining for verification',
      'Actor, role, and entity recorded per entry',
    ],
    preview: AuditPreview,
  },
];

export default function Capabilities() {
  return (
    <Section id="capabilities" tone="canvas">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
        <SectionHeading
          eyebrow="Platform capabilities"
          title={
            <>
              One Platform.
              <span className="text-navy-800"> Connected Regulatory Operations.</span>
            </>
          }
        />
        <p className="max-w-xl text-[14px] leading-relaxed text-body lg:pb-1">
          Each capability below is shown through the platform&apos;s own interface patterns. The
          previews use seeded demonstration records so you can see how the workflow, evidence, and
          audit layers connect.
        </p>
      </div>

      <div className="mt-12 space-y-12 lg:space-y-16">
        {FEATURES.map((feature, index) => {
          const Preview = feature.preview;
          const reversed = index % 2 === 1;
          return (
            <article
              key={feature.index}
              className="grid items-center gap-7 border-t border-line pt-10 first:border-t-0 first:pt-0 lg:grid-cols-2 lg:gap-14"
            >
              <div className={reversed ? 'lg:order-2' : undefined}>
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-faint">
                    {feature.index}
                  </span>
                  <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                </div>
                <h3 className="mt-3 text-[19px] font-bold leading-snug tracking-tight text-ink sm:text-[22px]">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-lg text-[13.5px] leading-relaxed text-body">
                  {feature.description}
                </p>
                <ul className="mt-5 space-y-2.5">
                  {feature.points.map(point => (
                    <li key={point} className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-tint text-accent">
                        <Check className="h-2.5 w-2.5" aria-hidden="true" />
                      </span>
                      <span className="text-[12.5px] leading-relaxed text-body">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={reversed ? 'lg:order-1' : undefined}>
                <Preview />
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

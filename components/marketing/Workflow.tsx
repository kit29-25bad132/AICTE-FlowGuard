'use client';

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Section, SectionHeading } from '@/components/marketing/SectionHeading';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    id: '01',
    title: 'Application Submission',
    actor: 'Institution',
    stage: 'Submitted',
    summary:
      'Institutions submit their application and supporting documents into the regulatory queue.',
    points: [
      'Supporting documents are attached to a single case record.',
      'The case enters the queue with an assigned review sequence.',
      'Submission is the first entry in the decision history.',
    ],
    nextStates: ['DRAFT', 'SUBMITTED'],
  },
  {
    id: '02',
    title: 'Initial Scrutiny',
    actor: 'Regional Officer',
    stage: 'In scrutiny',
    summary:
      'Regulatory officers review the application, evidence, and the compliance requirements that apply to it.',
    points: [
      'Deficiencies are captured as explicit, trackable items.',
      'The stage SLA clock runs from assignment to decision.',
      'Evidence and document validity are checked against the case.',
    ],
    nextStates: ['IN_PROGRESS', 'DEFICIENCY'],
  },
  {
    id: '03',
    title: 'Inspection Coordination',
    actor: 'EVC Member · Regional Officer',
    stage: 'Inspection',
    summary:
      'Eligible applications move through inspection coordination, including EVC scheduling where applicable.',
    points: [
      'Institutions are grouped into location-aware visit clusters.',
      'Committees are assigned and the schedule is confirmed centrally.',
      'Inspection outcomes are recorded against the application.',
    ],
    nextStates: ['IN_PROGRESS', 'CLEARED'],
  },
  {
    id: '04',
    title: 'Regulatory Decision',
    actor: 'Bureau Head · Competent Authority',
    stage: 'Decision',
    summary:
      'The authorized authority reviews the case file and records the regulatory decision.',
    points: [
      'Decisions are recorded with documented reasoning.',
      'Deficiency rebuttals remain attached to the case.',
      'Escalated cases carry their escalation context into review.',
    ],
    nextStates: ['APPROVED', 'REJECTED'],
  },
  {
    id: '05',
    title: 'Audit & Accountability',
    actor: 'Administrator · Legal Cell',
    stage: 'Recorded',
    summary:
      'The platform preserves the relevant decision history and audit records for accountability.',
    points: [
      'Critical actions are appended to the audit ledger.',
      'Entries are hash-linked to the previous record for verification.',
      'The full history remains available for review.',
    ],
    nextStates: ['HASH_VERIFIED'],
  },
];

export default function Workflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = STEPS[activeIndex];

  return (
    <Section id="workflow">
      <SectionHeading
        eyebrow="End-to-end workflow"
        title={
          <>
            From Application Submission
            <span className="text-navy-800"> to Accountable Decision.</span>
          </>
        }
        description="Select a stage to see what the platform records and what moves the case forward."
      />

      <div className="mt-10 rounded-xl border border-line bg-white p-5 sm:p-7">
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-[19px] hidden h-px bg-line lg:block"
            aria-hidden="true"
          />
          <div className="grid gap-2 lg:grid-cols-5 lg:gap-3" role="group" aria-label="Workflow stages">
            {STEPS.map((step, index) => {
              const isActive = index === activeIndex;
              const isComplete = index < activeIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={cn(
                    'group relative flex items-center gap-3 rounded-md border border-transparent px-1 py-2 text-left transition-colors lg:block lg:px-0',
                    isActive ? 'bg-tint/70 lg:bg-transparent' : 'hover:bg-canvas lg:hover:bg-transparent',
                  )}
                >
                  <span
                    className={cn(
                      'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] font-semibold transition-colors',
                      isActive && 'border-navy-900 bg-navy-900 text-white',
                      !isActive && isComplete && 'border-navy-900/25 bg-tint text-navy-800',
                      !isActive && !isComplete && 'border-line-strong bg-white text-muted',
                    )}
                  >
                    {isComplete ? <Check className="h-4 w-4" aria-hidden="true" /> : step.id}
                  </span>
                  <span className="min-w-0 lg:mt-3 lg:block">
                    <span
                      className={cn(
                        'block text-[12.5px] font-semibold leading-snug tracking-tight transition-colors',
                        isActive ? 'text-ink' : 'text-body group-hover:text-ink',
                      )}
                    >
                      {step.title}
                    </span>
                    <span className="mt-0.5 block text-[10.5px] text-faint">{step.actor}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div key={active.id} className="fg-enter mt-7 grid gap-6 border-t border-line pt-6 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-[3px] bg-navy-900 px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-white">
                Step {active.id}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">{active.stage}</span>
            </div>
            <h3 className="mt-3 text-[18px] font-bold tracking-tight text-ink">{active.title}</h3>
            <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-body">{active.summary}</p>

            <ul className="mt-4 space-y-2">
              {active.points.map(point => (
                <li key={point} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" aria-hidden="true" />
                  <span className="text-[12px] leading-relaxed text-body">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-faint">State</span>
              {active.nextStates.map(state => (
                <span
                  key={state}
                  className="rounded-[3px] border border-line bg-canvas px-1.5 py-0.5 font-mono text-[8.5px] uppercase tracking-wider text-body"
                >
                  {state}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-line bg-canvas p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Case progress</span>
              <span className="font-mono text-[9px] text-faint">{activeIndex + 1} / 5</span>
            </div>
            <div className="mt-3 flex gap-1" aria-hidden="true">
              {STEPS.map((step, index) => (
                <span
                  key={step.id}
                  className={cn(
                    'h-1.5 flex-1 rounded-full',
                    index <= activeIndex ? 'bg-navy-900' : 'bg-line-strong/60',
                  )}
                />
              ))}
            </div>
            <ol className="mt-4 space-y-1.5">
              {STEPS.map((step, index) => (
                <li key={step.id} className="flex items-center justify-between gap-2 text-[10.5px]">
                  <span className={index <= activeIndex ? 'text-ink' : 'text-faint'}>{step.title}</span>
                  <span className="font-mono text-[8.5px] uppercase tracking-wider text-faint">
                    {index < activeIndex ? 'Cleared' : index === activeIndex ? 'Current' : 'Pending'}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-4 flex items-center gap-1.5 border-t border-line pt-3 text-[10.5px] text-muted">
              <ArrowRight className="h-3 w-3 shrink-0 text-accent" aria-hidden="true" />
              Every transition is written to the case history.
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

'use client';

import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Section, SectionHeading } from '@/components/marketing/SectionHeading';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    question: 'What is AICTE FlowGuard?',
    answer:
      'AICTE FlowGuard is an integrated regulatory workflow automation and accountability platform for the AICTE approval ecosystem. It connects application workflows, institutional compliance, inspection coordination, SLA monitoring, escalation, and audit records in one operational workspace. This build is a prototype demonstration platform and is not an official AICTE deployment.',
  },
  {
    question: 'Who can use the platform?',
    answer:
      'The workspace supports Administrators, Regional Officers, Bureau Heads, EVC Members, Institutions, the Competent Authority, and the Legal Cell. In this prototype each position is a predefined demonstration account; public registration is disabled.',
  },
  {
    question: 'How does the application workflow operate?',
    answer:
      'An application moves through submission, initial scrutiny, inspection coordination where applicable, a regulatory decision, and record preservation. Each stage carries an owning role, a stage-level SLA, and the actions recorded against the case. Deficiency rebuttals and decision reasoning stay attached to the application.',
  },
  {
    question: 'How does SLA monitoring work?',
    answer:
      'Each workflow stage carries an SLA window. The platform tracks elapsed time per stage, highlights cases approaching or past their deadline, and progresses them through a five-level escalation ladder with a named recipient at each level. Delay cost exposure is estimated from demonstration records in this prototype.',
  },
  {
    question: 'How are EVC inspections coordinated?',
    answer:
      'Eligible applications enter inspection coordination, where institutions are grouped into location-aware clusters for a single committee visit. Scheduling, committee assignment, and confirmation are handled centrally so a regional itinerary is visible in one place.',
  },
  {
    question: 'How does the platform maintain audit accountability?',
    answer:
      'Critical actions such as stage progressions, escalations, and document uploads are appended to an audit ledger. Each entry records the actor, role, action, entity, and timestamp, and carries a SHA-256 hash chained to the previous entry so the record can be verified. The hash helper in this prototype is a demonstration implementation, not a production cryptographic service.',
  },
  {
    question: 'How is institutional data protected?',
    answer:
      'Access is scoped by role: dashboards, queues, and records are filtered to what the signed-in role is responsible for, and the audit ledger retains a trace of actions. This prototype runs entirely on seeded demonstration data in the browser. A production deployment would additionally require signed server-side sessions, encryption at rest, and formal access review.',
  },
  {
    question: 'How can an institution access the platform?',
    answer:
      'Public account creation is not available. Demo access uses the seven predefined accounts published on the sign-in page, and each account opens its existing role-scoped workspace. A production deployment would provision accounts through administrator authorization.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" tone="canvas">
      <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Frequently asked"
            title={
              <>
                Clear answers about
                <span className="text-navy-800"> how FlowGuard works.</span>
              </>
            }
            description="Scope, access, and accountability — stated as implemented in this prototype."
          />
          <div className="mt-6 rounded-lg border border-line bg-white p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">Still need access?</p>
            <p className="mt-2 text-[12px] leading-relaxed text-body">
              Seven demonstration accounts are available. Select a position to open its
              role-scoped workspace.
            </p>
            <a
              href="/signin"
              className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-accent-strong hover:underline"
            >
              Open demo login
            </a>
          </div>
        </div>

        <div className="divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;
            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-canvas"
                  >
                    <span className={cn('text-[13px] font-medium leading-snug', isOpen ? 'text-ink' : 'text-body')}>
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] border transition-colors',
                        isOpen ? 'border-navy-900 bg-navy-900 text-white' : 'border-line-strong text-muted',
                      )}
                      aria-hidden="true"
                    >
                      {isOpen ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-4"
                >
                  <p className="max-w-2xl text-[12.5px] leading-relaxed text-body">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

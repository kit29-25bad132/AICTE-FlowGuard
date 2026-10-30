import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { ArrowRight } from 'lucide-react';
import AuthShell from '@/components/marketing/AuthShell';

export const metadata: Metadata = {
  title: 'Demo Access — AICTE FlowGuard',
  description: 'Demo access uses the predefined AICTE FlowGuard demonstration accounts. Public registration is disabled.',
};

export default function SignUpPage() {
  return (
    <AuthShell>
      <div className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-tint px-2.5 py-1 font-mono text-[8.5px] font-semibold uppercase tracking-[0.14em] text-accent-strong">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          Demo mode
        </span>

        <h1 className="mt-3 text-[22px] font-bold leading-tight tracking-tight text-ink sm:text-[24px]">
          Demo access only
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-body">
          Demo access is available through the predefined demonstration accounts. Public account
          creation is not available in this prototype.
        </p>

        <div className="mt-5 rounded-xl border border-line bg-canvas p-3.5 text-left">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
            Seven demonstration positions
          </p>
          <p className="mt-2 text-[11.5px] leading-relaxed text-body">
            Administrator, Regional Officer, Bureau Head, EVC Member, Institution, Competent
            Authority, and Legal Cell. Each position opens its own existing workspace.
          </p>
        </div>

        <Link
          href="/signin"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-[0_16px_32px_-18px_rgba(11,28,48,0.85)] transition-all hover:-translate-y-px hover:bg-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
        >
          Open Demo Login
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>

        <p className="mt-3 text-[10px] leading-relaxed text-faint">
          Simulated identities only. No real institutional account is created and no regulatory
          permission is granted.
        </p>
      </div>
    </AuthShell>
  );
}

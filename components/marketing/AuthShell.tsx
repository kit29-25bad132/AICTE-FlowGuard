import Link from 'next/link';
import React from 'react';
import { CheckCircle2, Home, ShieldCheck } from 'lucide-react';

/**
 * Branded demo-only authentication surface. Operational dashboards stay outside
 * this shell; it only frames the public sign-in and demo-access routes.
 */
export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-canvas">
      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:px-6 sm:py-12">
        <div className="grid w-full max-w-[1000px] overflow-hidden rounded-2xl border border-line bg-white shadow-[0_32px_80px_-48px_rgba(11,28,48,0.55)] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="hidden bg-navy-900 p-8 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent font-bold">AF</div>
                <div>
                  <p className="text-sm font-bold tracking-tight">AICTE FlowGuard</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-blue-200">SIH 2026 demo</p>
                </div>
              </div>
              <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.16em] text-blue-200">Regulatory approvals</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">Without the blind spots.</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-blue-100">
                Explore the connected workspace for time-bound approvals, accountable decisions, and visible regulatory risk.
              </p>
              <div className="mt-8 space-y-4">
                {['Role-based regulatory workspaces', 'Stage-level SLA monitoring', 'Verifiable audit accountability'].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-blue-50">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-300" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-blue-300/20 bg-white/5 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.12em] text-blue-100">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              SIH 2026 | Interactive Demo Environment
            </div>
          </section>
          <section className="p-5 sm:p-8">
            {children}
          </section>
        </div>
      </main>

      <Link
        href="/"
        aria-label="Return to homepage"
        title="Return to homepage"
        className="fixed bottom-5 right-5 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-navy-800 shadow-[0_12px_24px_-12px_rgba(11,28,48,0.4)] transition-all hover:-translate-y-0.5 hover:border-line-strong hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2"
      >
        <Home className="h-3.5 w-3.5" aria-hidden="true" />
      </Link>
    </div>
  );
}

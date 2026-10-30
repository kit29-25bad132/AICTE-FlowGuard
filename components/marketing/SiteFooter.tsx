import Link from 'next/link';
import React from 'react';

const PLATFORM_LINKS = [
  { label: 'Platform', href: '/#platform' },
  { label: 'Capabilities', href: '/#capabilities' },
  { label: 'Workflow', href: '/#workflow' },
  { label: 'Impact', href: '/#impact' },
  { label: 'FAQ', href: '/#faq' },
];

const ACCOUNT_LINKS = [
  { label: 'Demo Login', href: '/signin' },
  { label: 'Demo Access', href: '/signup' },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-navy-800 bg-navy-900 text-white">
      <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-[5px] bg-white/10 ring-1 ring-white/20">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M4 7.5 12 3.5l8 4-8 4-8-4Z" strokeLinejoin="round" />
                  <path d="M4 12.5l8 4 8-4" strokeLinejoin="round" />
                  <path d="M4 17.5l8 4 8-4" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="font-['Space_Grotesk'] text-[15px] font-bold tracking-tight">AICTE FlowGuard</span>
            </div>
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-navy-100/75">
              An integrated regulatory workflow automation and accountability platform.
            </p>
            <p className="mt-4 max-w-sm text-[11.5px] leading-relaxed text-navy-100/55">
              Making regulatory approvals transparent, accountable, and time-bound across approval
              workflows, inspections, compliance, and audit records.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-sm border border-white/15 bg-white/5 px-2.5 py-1.5 font-mono text-[9.5px] uppercase tracking-[0.14em] text-navy-100/70">
              <span className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
              Prototype Demonstration Platform
            </div>
          </div>

          <nav aria-label="Platform" className="lg:col-span-3">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-navy-100/50">Platform</h2>
            <ul className="mt-4 space-y-2.5">
              {PLATFORM_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-navy-100/80 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Account" className="lg:col-span-2">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-navy-100/50">Account</h2>
            <ul className="mt-4 space-y-2.5">
              {ACCOUNT_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[13px] text-navy-100/80 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.16em] text-navy-100/50">Access</h2>
            <p className="mt-4 text-[12px] leading-relaxed text-navy-100/70">
              Demo access uses seven predefined demonstration accounts. Public registration is
              disabled in this prototype.
            </p>
            <Link
              href="/signin"
              className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
            >
              Open demo login
            </Link>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-3 text-[11px] text-navy-100/55 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} AICTE FlowGuard. Built as a Smart India Hackathon prototype.</p>
            <p className="max-w-xl sm:text-right">
              Independent prototype. Not an official AICTE deployment or endorsement. Privacy, terms,
              and contact channels are not published in this build.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

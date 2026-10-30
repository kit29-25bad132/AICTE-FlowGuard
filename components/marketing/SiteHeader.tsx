'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { ArrowRight, LayoutDashboard, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getSession } from '@/lib/session';

const NAV_ITEMS = [
  { label: 'Platform', href: '#platform', id: 'platform' },
  { label: 'Capabilities', href: '#capabilities', id: 'capabilities' },
  { label: 'Workflow', href: '#workflow', id: 'workflow' },
  { label: 'Impact', href: '#impact', id: 'impact' },
  { label: 'About', href: '#about', id: 'about' },
];

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="AICTE FlowGuard home">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[5px] bg-navy-900 text-white shadow-sm">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M4 7.5 12 3.5l8 4-8 4-8-4Z" strokeLinejoin="round" />
          <path d="M4 12.5l8 4 8-4" strokeLinejoin="round" />
          <path d="M4 17.5l8 4 8-4" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-['Space_Grotesk'] text-[15px] font-bold tracking-tight text-ink">
          AICTE FlowGuard
        </span>
        {!compact ? (
          <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
            Regulatory Intelligence Platform
          </span>
        ) : null}
      </span>
    </Link>
  );
}

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState('platform');
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(Boolean(getSession()));
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(
      (node): node is HTMLElement => Boolean(node),
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0.02, 0.25, 0.6] },
    );

    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow',
        scrolled ? 'border-line shadow-[0_1px_10px_rgba(11,28,48,0.06)]' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <BrandMark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map(item => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative rounded-sm px-3 py-2 text-[13px] font-medium transition-colors',
                      isActive ? 'text-ink' : 'text-body hover:text-ink',
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        'absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-accent transition-opacity',
                        isActive ? 'opacity-100' : 'opacity-0',
                      )}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {signedIn ? (
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-sm bg-navy-900 px-3.5 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-navy-950"
            >
              <LayoutDashboard className="h-3.5 w-3.5" aria-hidden="true" />
              Open Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-sm px-3.5 py-2 text-[12.5px] font-semibold text-navy-900 transition-colors hover:bg-canvas"
              >
                Sign In
              </Link>
              <Link
                href="/signin"
                className="inline-flex items-center gap-1.5 rounded-sm bg-accent px-3.5 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-accent-strong"
              >
                Explore Demo
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(open => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-line-strong text-ink lg:hidden"
        >
          {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </div>

      {mobileOpen ? (
        <div id="mobile-navigation" className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Mobile" className="mx-auto w-full max-w-7xl px-5 py-4 sm:px-6">
            <ul className="divide-y divide-line">
              {NAV_ITEMS.map(item => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between py-3 text-sm font-medium text-ink"
                  >
                    {item.label}
                    <span className="font-mono text-[10px] uppercase tracking-widest text-faint">
                      0{NAV_ITEMS.findIndex(nav => nav.id === item.id) + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 grid gap-2">
              {signedIn ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-navy-900 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
                  Open Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center rounded-sm border border-line-strong px-4 py-2.5 text-sm font-semibold text-ink"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signin"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-accent px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Explore Demo
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

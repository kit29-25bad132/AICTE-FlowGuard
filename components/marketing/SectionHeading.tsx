import React from 'react';
import { cn } from '@/lib/utils';

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.18em] text-accent',
        className,
      )}
    >
      <span className="h-px w-6 bg-accent/40" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-2xl font-bold leading-[1.15] tracking-tight text-ink sm:text-[30px] lg:text-[34px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[15px] leading-relaxed text-body">{description}</p>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  tone = 'white',
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  tone?: 'white' | 'canvas' | 'navy';
}) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 border-t border-line',
        tone === 'white' && 'bg-white',
        tone === 'canvas' && 'bg-canvas',
        tone === 'navy' && 'bg-navy-900 text-white',
        className,
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">{children}</div>
    </section>
  );
}

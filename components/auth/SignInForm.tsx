'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  ClipboardCheck,
  Copy,
  Eye,
  EyeOff,
  FileText,
  LayoutDashboard,
  Loader2,
  Lock,
  Mail,
  MapPin,
  RotateCcw,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import {
  DEMO_ACCOUNTS,
  authenticateDemoAccount,
  getDemoAccount,
} from '@/lib/demo-accounts';
import { DEMO_USERS } from '@/lib/store';
import { startSession } from '@/lib/session';
import type { Role } from '@/types';
import { cn } from '@/lib/utils';

const ROLE_ICONS: Record<Role, LucideIcon> = {
  ADMIN: ShieldCheck,
  REGIONAL_OFFICER: MapPin,
  BUREAU_HEAD: LayoutDashboard,
  EVC_MEMBER: Users,
  INSTITUTION: Building2,
  COMPETENT_AUTHORITY: Scale,
  LEGAL_CELL: FileText,
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
type Errors = { role?: string; email?: string; password?: string; form?: string };

const fieldBase =
  'w-full rounded-lg border bg-white px-3 py-2.5 text-[13px] text-ink placeholder:text-faint transition-colors focus:outline-none focus:ring-2';

function fallbackCopy(value: string) {
  const area = document.createElement('textarea');
  area.value = value;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  document.execCommand('copy');
  document.body.removeChild(area);
}

function CredentialRow({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-2">
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">{label}</p>
        <p className="mt-0.5 truncate font-mono text-[11px] text-ink">{value}</p>
      </div>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${label.toLowerCase()}`}
        className="inline-flex shrink-0 items-center gap-1 rounded-md border border-line px-2 py-1 text-[9.5px] font-semibold text-body transition-colors hover:border-line-strong hover:bg-canvas hover:text-ink"
      >
        {copied ? (
          <ClipboardCheck className="h-3 w-3 text-success" aria-hidden="true" />
        ) : (
          <Copy className="h-3 w-3" aria-hidden="true" />
        )}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export default function SignInForm() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<'email' | 'password' | null>(null);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const submitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const selectedAccount = selectedRole ? getDemoAccount(selectedRole) : undefined;
  const SelectedIcon = selectedRole ? ROLE_ICONS[selectedRole] : null;

  useEffect(() => {
    return () => {
      if (submitTimer.current) clearTimeout(submitTimer.current);
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [dropdownOpen]);

  useEffect(() => {
    if (dropdownOpen) listboxRef.current?.focus();
  }, [dropdownOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const node = listboxRef.current?.querySelector<HTMLElement>(`[data-index="${highlighted}"]`);
    node?.scrollIntoView({ block: 'nearest' });
  }, [highlighted, dropdownOpen]);

  function selectRole(role: Role) {
    const account = getDemoAccount(role);
    setSelectedRole(role);
    setEmail(account?.email ?? '');
    setPassword(account?.password ?? '');
    setErrors({});
    setCopied(null);
    setDropdownOpen(false);
    triggerRef.current?.focus();
  }

  function openDropdown() {
    setDropdownOpen(true);
    const index = selectedRole
      ? DEMO_ACCOUNTS.findIndex(account => account.role === selectedRole)
      : 0;
    setHighlighted(Math.max(index, 0));
  }

  function handleListKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      setDropdownOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlighted(index => Math.min(index + 1, DEMO_ACCOUNTS.length - 1));
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlighted(index => Math.max(index - 1, 0));
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const account = DEMO_ACCOUNTS[highlighted];
      if (account) selectRole(account.role);
    }
  }

  function copyValue(value: string, field: 'email' | 'password') {
    if (!value) return;
    const markCopied = () => {
      setCopied(field);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => {
        setCopied(current => (current === field ? null : current));
      }, 1600);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(value)
        .then(markCopied)
        .catch(() => {
          try {
            fallbackCopy(value);
            markCopied();
          } catch {
            setErrors(previous => ({
              ...previous,
              form: 'Clipboard access was blocked by the browser. Select the value and copy it manually.',
            }));
          }
        });
      return;
    }

    try {
      fallbackCopy(value);
      markCopied();
    } catch {
      setErrors(previous => ({
        ...previous,
        form: 'Clipboard access was blocked by the browser. Select the value and copy it manually.',
      }));
    }
  }

  function handleReset() {
    setErrors({});
    setCopied(null);
    setDropdownOpen(false);
    setShowPassword(false);
    if (selectedRole) {
      const account = getDemoAccount(selectedRole);
      setEmail(account?.email ?? '');
      setPassword(account?.password ?? '');
    } else {
      setEmail('');
      setPassword('');
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    const next: Errors = {};
    if (!selectedRole) next.role = 'Select your position to continue.';
    if (!email.trim()) next.email = 'Enter the demonstration email address.';
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = 'Enter a valid email address.';
    if (!password) next.password = 'Enter the demonstration password.';

    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    setErrors({});
    setLoading(true);

    submitTimer.current = setTimeout(() => {
      const account = authenticateDemoAccount(email, password);

      if (!account) {
        setLoading(false);
        setErrors({
          form: 'Incorrect demonstration credentials. Use the email and password shown in the credentials panel.',
        });
        return;
      }

      if (selectedRole && account.role !== selectedRole) {
        setLoading(false);
        setErrors({
          form: `Those credentials belong to the ${account.label} demo account. Select that position, or use the credentials shown above.`,
        });
        return;
      }

      const user = DEMO_USERS.find(candidate => candidate.id === account.id);
      if (!user) {
        setLoading(false);
        setErrors({ form: 'This demonstration account is not provisioned in the workspace.' });
        return;
      }

      startSession(user);
      // Full document navigation keeps each demo session isolated: the workspace
      // boots from the freshly written session instead of a cached client route.
      window.location.assign('/dashboard');
    }, 600);
  }

  return (
    <div>
      <h1 className="mt-3 text-[22px] font-bold leading-tight tracking-tight text-ink sm:text-[24px] text-center">
        Welcome to FlowGuard Demo
      </h1>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-body text-center">
        Select your position to explore the platform using a demonstration account.
      </p>

      <div className="mt-5">
        <label id="position-label" className="block text-[11.5px] font-semibold text-ink">
          What is your position?
        </label>
        <div ref={dropdownRef} className="relative">
          <button
            ref={triggerRef}
            type="button"
            onClick={() => (dropdownOpen ? setDropdownOpen(false) : openDropdown())}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            aria-controls="position-listbox"
            aria-labelledby="position-label"
            aria-describedby={errors.role ? 'position-error' : undefined}
            className={cn(
              'flex w-full items-center justify-between gap-3 rounded-lg border bg-white px-3 py-2.5 text-left transition-colors focus:outline-none focus:ring-2',
              errors.role
                ? 'border-danger focus:border-danger focus:ring-danger/15'
                : 'border-line-strong focus:border-accent focus:ring-accent/15',
            )}
          >
            {selectedAccount && SelectedIcon ? (
              <span className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-tint text-navy-800">
                  <SelectedIcon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[12.5px] font-semibold text-ink">
                    {selectedAccount.label}
                  </span>
                  <span className="block truncate text-[10px] text-muted">
                    {selectedAccount.responsibility}
                  </span>
                </span>
              </span>
            ) : (
              <span className="text-[12.5px]">Select your position</span>
            )}
            <ChevronDown
              className={cn(
                'h-4 w-4 shrink-0 text-muted transition-transform',
                dropdownOpen && 'rotate-180',
              )}
              aria-hidden="true"
            />
          </button>

          {dropdownOpen ? (
            <ul
              ref={listboxRef}
              id="position-listbox"
              role="listbox"
              aria-labelledby="position-label"
              tabIndex={-1}
              onKeyDown={handleListKeyDown}
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-72 overflow-y-auto rounded-xl border border-line bg-white p-1.5 shadow-[0_24px_60px_-30px_rgba(11,28,48,0.55)] focus:outline-none"
            >
              {DEMO_ACCOUNTS.map((account, index) => {
                const Icon = ROLE_ICONS[account.role];
                const isSelected = selectedRole === account.role;
                return (
                  <li
                    key={account.role}
                    role="option"
                    id={`role-option-${account.role}`}
                    aria-selected={isSelected}
                    data-index={index}
                    onMouseEnter={() => setHighlighted(index)}
                    onClick={() => selectRole(account.role)}
                    className={cn(
                      'flex cursor-pointer items-start gap-2.5 rounded-lg px-2.5 py-2 transition-colors',
                      highlighted === index ? 'bg-tint' : 'bg-white',
                    )}
                  >
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-line bg-white text-navy-800">
                      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[12px] font-semibold text-ink">{account.label}</span>
                        {isSelected ? <Check className="h-3 w-3 text-accent" aria-hidden="true" /> : null}
                      </span>
                      <span className="mt-0.5 block truncate text-[10.5px] text-muted">
                        {account.responsibility}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
        {errors.role ? (
          <p id="position-error" className="mt-1.5 text-[10.5px] text-danger">
            {errors.role}
          </p>
        ) : null}
      </div>

      <div className="mt-3 rounded-2xl border border-line bg-white p-3 flex flex-col items-center">
        <div className="flex items-center justify-between gap-2 w-full">
          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
            Demo Account Credentials
          </p>
          <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-faint">
            Fictional
          </span>
        </div>

        {selectedAccount ? (
          <div className="mt-2 w-full space-y-1.5">
            <CredentialRow
              label="Demo email"
              value={email || selectedAccount.email}
              copied={copied === 'email'}
              onCopy={() => copyValue(email || selectedAccount.email, 'email')}
            />
            <CredentialRow
              label="Demo password"
              value={password || selectedAccount.password}
              copied={copied === 'password'}
              onCopy={() => copyValue(password || selectedAccount.password, 'password')}
            />
          </div>
        ) : (
          <p className="mt-2 text-[11px] leading-relaxed text-center">
            Select your position to load its demonstration account.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-5 w-full space-y-3.5">
        <div className="w-full">
          <label htmlFor="demo-email" className="block text-[11.5px] font-semibold text-ink text-center">
            Email address
          </label>
          <div className="relative mt-1.5 w-full">
            <Mail
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint"
              aria-hidden="true"
            />
            <input
              id="demo-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="username"
              value={email}
              onChange={event => {
                setEmail(event.target.value);
                setErrors(previous => ({ ...previous, email: undefined, form: undefined }));
              }}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'demo-email-error' : undefined}
              placeholder="Select a position or type the demo email"
              disabled={loading}
              className={cn(
                fieldBase,
                'pl-9',
                errors.email
                  ? 'border-danger focus:border-danger focus:ring-danger/15'
                  : 'border-line-strong focus:border-accent focus:ring-accent/15',
              )}
            />
          </div>
          {errors.email ? (
            <p id="demo-email-error" className="mt-1.5 text-[10.5px] text-danger">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="w-full">
          <label htmlFor="demo-password" className="block text-[11.5px] font-semibold text-ink text-center">
            Password
          </label>
          <div className="relative mt-1.5 w-full">
            <Lock
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-faint"
              aria-hidden="true"
            />
            <input
              id="demo-password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={password}
              onChange={event => {
                setPassword(event.target.value);
                setErrors(previous => ({ ...previous, password: undefined, form: undefined }));
              }}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={errors.password ? 'demo-password-error' : undefined}
              placeholder="Select a position or type the demo password"
              disabled={loading}
              className={cn(
                fieldBase,
                'pl-9 pr-10',
                errors.password
                  ? 'border-danger focus:border-danger focus:ring-danger/15'
                  : 'border-line-strong focus:border-accent focus:ring-accent/15',
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(value => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              aria-pressed={showPassword}
              disabled={loading}
              className="absolute right-1.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted transition-colors hover:bg-canvas hover:text-ink disabled:opacity-50"
            >
              {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
          {errors.password ? (
            <p id="demo-password-error" className="mt-1.5 text-[10.5px] text-danger">
              {errors.password}
            </p>
          ) : null}
        </div>

        {errors.form ? (
          <div
            role="alert"
            className="mt-3 w-full rounded-lg border border-danger/25 bg-[#fef2f2] px-3 py-2.5 flex items-start gap-2"
          >
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" aria-hidden="true" />
            <p className="text-[11px] leading-relaxed text-[#991b1b]">
              {errors.form}
            </p>
          </div>
        ) : null}

        <div className="w-full space-y-2 pt-0.5">
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy-900 px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-[0_16px_32px_-18px_rgba(11,28,48,0.85)] transition-all hover:-translate-y-px hover:bg-navy-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Preparing demo workspace…
              </>
            ) : (
              <>
                Sign In to Demo Workspace
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-line-strong bg-white px-4 py-2.5 text-[12px] font-semibold text-ink transition-colors hover:bg-canvas focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 disabled:opacity-60"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset Demo Login
          </button>
        </div>
      </form>

      <div className="mt-5 w-full">
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-center">
          Explore FlowGuard as
        </p>
        <div className="mt-2 grid grid-cols-2 gap-1.5 sm:grid-cols-3 justify-center">
          {DEMO_ACCOUNTS.map(account => {
            const Icon = ROLE_ICONS[account.role];
            const isActive = selectedRole === account.role;
            return (
              <button
                key={account.role}
                type="button"
                onClick={() => selectRole(account.role)}
                aria-pressed={isActive}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-2 py-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30',
                  isActive
                    ? 'border-navy-900 bg-navy-900 text-white'
                    : 'border-line bg-white text-body hover:border-line-strong hover:bg-canvas hover:text-ink',
                )}
              >
                <Icon className="h-3 w-3 shrink-0" aria-hidden="true" />
                <span className="truncate text-[10px] font-medium">{account.label}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-[10px] leading-relaxed text-center text-faint">
          All accounts are simulated demonstration identities. No real institutional account or
          regulatory permission is granted.
        </p>
      </div>
    </div>
  );
}

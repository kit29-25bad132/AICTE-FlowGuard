import { DEMO_USERS } from '@/lib/store';
import type { Role, User } from '@/types';

/**
 * Prototype session layer.
 *
 * The repository does not ship a backend authentication service (no API routes,
 * no NextAuth provider, no database models), so sessions are created from the
 * demonstration account directory. The issued session is a short-lived browser
 * record plus a presence cookie that middleware can read for route gating.
 *
 * It is NOT a security boundary: a production deployment must issue signed,
 * httpOnly sessions and enforce role permissions server-side.
 */

export const SESSION_STORAGE_KEY = 'flowguard.session.v1';
export const SESSION_COOKIE = 'fg_session';
export const SESSION_TTL_MS = 1000 * 60 * 60 * 8;

export interface SessionRecord {
  userId: string;
  name: string;
  email: string;
  role: Role;
  region?: string;
  institutionId?: string;
  issuedAt: number;
  expiresAt: number;
}

function isSessionRecord(value: unknown): value is SessionRecord {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<SessionRecord>;
  return (
    typeof candidate.userId === 'string' &&
    typeof candidate.email === 'string' &&
    typeof candidate.role === 'string' &&
    typeof candidate.expiresAt === 'number'
  );
}

function writeCookie(role: Role) {
  if (typeof document === 'undefined') return;
  const maxAge = Math.floor(SESSION_TTL_MS / 1000);
  document.cookie = `${SESSION_COOKIE}=${encodeURIComponent(role)}; path=/; max-age=${maxAge}; samesite=lax`;
}

function clearCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; samesite=lax`;
}

export function startSession(user: User): SessionRecord {
  const issuedAt = Date.now();
  const session: SessionRecord = {
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    region: user.region,
    institutionId: user.institutionId,
    issuedAt,
    expiresAt: issuedAt + SESSION_TTL_MS,
  };

  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch (error) {
      console.error('Unable to persist the demonstration session', error);
    }
  }

  writeCookie(session.role);
  return session;
}

export function getSession(): SessionRecord | null {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;

    const parsed: unknown = JSON.parse(raw);
    if (!isSessionRecord(parsed) || parsed.expiresAt <= Date.now()) {
      clearSession();
      return null;
    }

    return parsed;
  } catch {
    clearSession();
    return null;
  }
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch {
    /* storage can be unavailable in private modes */
  }
  clearCookie();
}

export function findSessionUser(session: SessionRecord | null): User | null {
  if (!session) return null;
  return DEMO_USERS.find(user => user.id === session.userId) ?? null;
}

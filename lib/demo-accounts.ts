import type { Role } from '@/types';

/**
 * Centralised demonstration account directory.
 *
 * These are fictional demo identities for the SIH walkthrough. They are not real
 * AICTE accounts and grant nothing outside this prototype. The same records drive
 * the login UI, the credential panel, and the session identity in `lib/store.ts`.
 */

export const DEMO_PASSWORD = 'FlowGuard@123';

export interface DemoAccount {
  id: string;
  role: Role;
  label: string;
  name: string;
  email: string;
  password: string;
  responsibility: string;
  region?: string;
  institutionId?: string;
  avatar?: string;
}

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'usr-3',
    role: 'ADMIN',
    label: 'Administrator',
    name: 'Prof. V. K. Subramanian',
    email: 'admin@flowguard.demo',
    password: DEMO_PASSWORD,
    responsibility: 'System-wide configuration, workflow governance, and audit oversight.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
  },
  {
    id: 'usr-2',
    role: 'REGIONAL_OFFICER',
    label: 'Regional Officer',
    name: 'Ananya Sharma',
    email: 'regional@flowguard.demo',
    password: DEMO_PASSWORD,
    responsibility: 'Regional scrutiny, document verification, and stage advancement.',
    region: 'Southern Region (Chennai)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
  },
  {
    id: 'usr-1',
    role: 'BUREAU_HEAD',
    label: 'Bureau Head',
    name: 'Dr. Rameshwar Rao',
    email: 'bureau@flowguard.demo',
    password: DEMO_PASSWORD,
    responsibility: 'Bureau-wide oversight of approvals, escalations, and pendency.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
  },
  {
    id: 'usr-4',
    role: 'EVC_MEMBER',
    label: 'EVC Member',
    name: 'Capt. Rajesh Nair',
    email: 'evc@flowguard.demo',
    password: DEMO_PASSWORD,
    responsibility: 'Inspection execution and committee assignments.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  },
  {
    id: 'usr-6',
    role: 'INSTITUTION',
    label: 'Institution',
    name: 'Principal, Sri Venkateswara Eng College',
    email: 'institution@flowguard.demo',
    password: DEMO_PASSWORD,
    responsibility: 'Application status, evidence, and compliance undertakings.',
    institutionId: 'INST-8892',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  },
  {
    id: 'usr-5',
    role: 'COMPETENT_AUTHORITY',
    label: 'Competent Authority',
    name: 'Justice (Retd.) B. N. Srikrishna',
    email: 'authority@flowguard.demo',
    password: DEMO_PASSWORD,
    responsibility: 'Authorized regulatory decisions and escalated case review.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150',
  },
  {
    id: 'usr-7',
    role: 'LEGAL_CELL',
    label: 'Legal Cell',
    name: 'Meenakshi Sundaram',
    email: 'legal@flowguard.demo',
    password: DEMO_PASSWORD,
    responsibility: 'Deemed approval risk, writ petitions, and audit review.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  },
];

/**
 * First workspace each role lands on after demo sign-in.
 *
 * These point at the existing operational views only. Roles without a dedicated
 * dashboard open the closest existing module rather than a fabricated screen.
 */
export const ROLE_LANDING_TAB: Record<Role, string> = {
  ADMIN: 'dashboard',
  REGIONAL_OFFICER: 'dashboard',
  BUREAU_HEAD: 'dashboard',
  EVC_MEMBER: 'evc_scheduling',
  INSTITUTION: 'institution_portal',
  COMPETENT_AUTHORITY: 'applications',
  LEGAL_CELL: 'audit_ledger',
};

export function getDemoAccount(role: Role): DemoAccount | undefined {
  return DEMO_ACCOUNTS.find(account => account.role === role);
}

export function authenticateDemoAccount(email: string, password: string): DemoAccount | null {
  const normalized = email.trim().toLowerCase();
  return (
    DEMO_ACCOUNTS.find(
      account => account.email.toLowerCase() === normalized && account.password === password,
    ) ?? null
  );
}

import { 
  User, Application, Institution, EVCCluster, Undertaking, 
  DocumentRecord, EscalationRecord, AuditLogItem, PrecedentCase, 
  LegalCase, SystemNotification, Role 
} from '@/types';

// Simple SHA-256 mock helper for demo cryptographic audit ledger
export function mockSha256(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `0x${hex}a9f4c8b21e7d30f${hex}`;
}

export const DEMO_USERS: User[] = [
  { id: 'usr-1', name: 'Dr. Rameshwar Rao', email: 'bureau.head@aicte-india.org', role: 'BUREAU_HEAD', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 'usr-2', name: 'Ananya Sharma', email: 'regional.officer@aicte-india.org', role: 'REGIONAL_OFFICER', region: 'Southern Region (Chennai)', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 'usr-3', name: 'Prof. V. K. Subramanian', email: 'admin@aicte-india.org', role: 'ADMIN', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: 'usr-4', name: 'Capt. Rajesh Nair', email: 'evc.member@aicte-india.org', role: 'EVC_MEMBER', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' },
  { id: 'usr-5', name: 'Justice (Retd.) B. N. Srikrishna', email: 'competent.authority@aicte-india.org', role: 'COMPETENT_AUTHORITY', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150' },
  { id: 'usr-6', name: 'Principal, Sri Venkateswara Eng College', email: 'svec.inst@aicte-india.org', role: 'INSTITUTION', institutionId: 'INST-8892', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 'usr-7', name: 'Meenakshi Sundaram', email: 'legal.cell@aicte-india.org', role: 'LEGAL_CELL', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150' },
];

// Seed Institutions
export const SEED_INSTITUTIONS: Institution[] = [
  {
    id: 'INST-8892',
    name: 'Sri Venkateswara Engineering College',
    code: 'AICTE-TN-ENG-441',
    state: 'Tamil Nadu',
    region: 'Southern Region',
    address: 'NH-4, Poonamallee High Road, Chennai, TN 600077',
    principal: 'Dr. K. Sridharan',
    email: 'principal@svec.edu.in',
    phone: '+91 44 2680 1234',
    complianceHealthScore: 31,
    lateSubmissions: 12,
    escalationCount: 8,
    applicationCycles: 4,
    lat: 13.0827,
    lng: 80.2707
  },
  {
    id: 'INST-1011',
    name: 'Pune Institute of Computer Technology (PICT)',
    code: 'AICTE-MH-ENG-102',
    state: 'Maharashtra',
    region: 'Western Region',
    address: 'Survey No. 27, Dhankawadi, Pune, MH 411043',
    principal: 'Dr. S. B. Patil',
    email: 'director@pict.edu',
    phone: '+91 20 2437 1101',
    complianceHealthScore: 88,
    lateSubmissions: 1,
    escalationCount: 0,
    applicationCycles: 6,
    lat: 18.4575,
    lng: 85.8528
  },
  {
    id: 'INST-1012',
    name: 'Vishwakarma Institute of Technology (VIT)',
    code: 'AICTE-MH-ENG-105',
    state: 'Maharashtra',
    region: 'Western Region',
    address: 'Upper Bibwewadi, Pune, MH 411037',
    principal: 'Dr. Rajesh Jalnekar',
    email: 'info@vit.edu',
    phone: '+91 20 2420 2180',
    complianceHealthScore: 92,
    lateSubmissions: 0,
    escalationCount: 0,
    applicationCycles: 7,
    lat: 18.4636,
    lng: 85.8601
  },
  {
    id: 'INST-1013',
    name: 'Army Institute of Technology (AIT)',
    code: 'AICTE-MH-ENG-118',
    state: 'Maharashtra',
    region: 'Western Region',
    address: 'Dighi Hills, Alandi Road, Pune, MH 411015',
    principal: 'Brig. Abhay Bhat (Retd.)',
    email: 'director@aitpune.edu.in',
    phone: '+91 20 2715 7534',
    complianceHealthScore: 95,
    lateSubmissions: 0,
    escalationCount: 0,
    applicationCycles: 5,
    lat: 18.6069,
    lng: 85.8789
  },
  {
    id: 'INST-3021',
    name: 'BMS College of Engineering',
    code: 'AICTE-KA-ENG-201',
    state: 'Karnataka',
    region: 'South-Western Region',
    address: 'Bull Temple Road, Basavanagudi, Bengaluru, KA 560019',
    principal: 'Dr. S. Muralidhara',
    email: 'principal@bmsce.ac.in',
    phone: '+91 80 2662 2130',
    complianceHealthScore: 82,
    lateSubmissions: 2,
    escalationCount: 1,
    applicationCycles: 8,
    lat: 12.9416,
    lng: 77.5755
  },
  {
    id: 'INST-4055',
    name: 'Delhi Technological University (DTU)',
    code: 'AICTE-DL-ENG-001',
    state: 'Delhi',
    region: 'Northern Region',
    address: 'Shahbad Daulatpur, Bawana Road, Delhi 110042',
    principal: 'Prof. Prateek Sharma',
    email: 'vc@dtu.ac.in',
    phone: '+91 11 2787 1018',
    complianceHealthScore: 78,
    lateSubmissions: 3,
    escalationCount: 2,
    applicationCycles: 10,
    lat: 28.7501,
    lng: 77.1177
  }
];

// Seed Applications including the critical demo record APP-8892
export const SEED_APPLICATIONS: Application[] = [
  {
    id: 'APP-8892',
    institutionId: 'INST-8892',
    institutionName: 'Sri Venkateswara Engineering College',
    state: 'Tamil Nadu',
    region: 'Southern Region',
    category: 'Engineering & Technology',
    intakeSize: 780,
    facultyCount: 42,
    submissionDate: '2026-01-15',
    currentStageIndex: 2,
    status: 'ESCALATED',
    assignedOfficer: 'Ananya Sharma',
    slaDeadline: '2026-03-01',
    daysRemaining: 0,
    daysOverdue: 1,
    riskPriority: 'LEGAL_RISK',
    escalationLevel: 3,
    defectCount: 4,
    delayCost: 14200000,
    lastAction: 'Escalated to Level 3 due to expired SLA window without faculty verification.',
    lat: 13.0827,
    lng: 80.2707,
    stages: [
      { id: 'stg-1', name: 'Initial Scrutiny', status: 'CLEARED', slaDays: 15, elapsedDays: 14, assignedRole: 'REGIONAL_OFFICER', updatedAt: '2026-01-29', notes: 'Verified submitted structural drawings.' },
      { id: 'stg-2', name: 'Expert Visit Committee (EVC)', status: 'ACTIVE', slaDays: 20, elapsedDays: 21, assignedRole: 'EVC_MEMBER', updatedAt: '2026-02-20', notes: 'Inspection team reported faculty deficit of 14%.' },
      { id: 'stg-3', name: 'Deficiency Rebuttal', status: 'ESCALATED', slaDays: 10, elapsedDays: 11, assignedRole: 'REGIONAL_OFFICER', updatedAt: '2026-03-02', notes: 'Institution failed to submit affidavit within stipulated window.' },
      { id: 'stg-4', name: 'Executive Approval', status: 'PENDING', slaDays: 10, elapsedDays: 0, assignedRole: 'BUREAU_HEAD' },
      { id: 'stg-5', name: 'Final Letter of Approval', status: 'PENDING', slaDays: 5, elapsedDays: 0, assignedRole: 'ADMIN' }
    ]
  },
  {
    id: 'APP-1021',
    institutionId: 'INST-1011',
    institutionName: 'Pune Institute of Computer Technology (PICT)',
    state: 'Maharashtra',
    region: 'Western Region',
    category: 'Engineering & Technology',
    intakeSize: 1200,
    facultyCount: 88,
    submissionDate: '2026-02-01',
    currentStageIndex: 1,
    status: 'IN_PROGRESS',
    assignedOfficer: 'Ananya Sharma',
    slaDeadline: '2026-03-25',
    daysRemaining: 14,
    daysOverdue: 0,
    riskPriority: 'LOW',
    escalationLevel: 0,
    defectCount: 0,
    delayCost: 0,
    lastAction: 'Scrutiny successfully verified with 0 defects. Parallel EVC pre-activated.',
    lat: 18.4575,
    lng: 73.8528,
    stages: [
      { id: 'stg-101', name: 'Initial Scrutiny', status: 'CLEARED', slaDays: 15, elapsedDays: 10, assignedRole: 'REGIONAL_OFFICER', updatedAt: '2026-02-11' },
      { id: 'stg-102', name: 'Expert Visit Committee (EVC)', status: 'CONDITIONAL_ACTIVE', slaDays: 20, elapsedDays: 16, assignedRole: 'EVC_MEMBER', notes: 'Pre-activated at 75% SLA threshold.' },
      { id: 'stg-103', name: 'Executive Approval', status: 'PENDING', slaDays: 10, elapsedDays: 0, assignedRole: 'BUREAU_HEAD' },
      { id: 'stg-104', name: 'Final Letter of Approval', status: 'PENDING', slaDays: 5, elapsedDays: 0, assignedRole: 'ADMIN' }
    ]
  },
  {
    id: 'APP-1022',
    institutionId: 'INST-1012',
    institutionName: 'Vishwakarma Institute of Technology (VIT)',
    state: 'Maharashtra',
    region: 'Western Region',
    category: 'Engineering & Technology',
    intakeSize: 1500,
    facultyCount: 110,
    submissionDate: '2026-01-20',
    currentStageIndex: 2,
    status: 'IN_PROGRESS',
    assignedOfficer: 'Ananya Sharma',
    slaDeadline: '2026-03-10',
    daysRemaining: 4,
    daysOverdue: 0,
    riskPriority: 'MEDIUM',
    escalationLevel: 1,
    defectCount: 1,
    delayCost: 150000,
    lastAction: 'EVC inspection completed. Awaiting compliance document upload.',
    lat: 18.4636,
    lng: 73.8601,
    stages: [
      { id: 'stg-201', name: 'Initial Scrutiny', status: 'CLEARED', slaDays: 15, elapsedDays: 15, assignedRole: 'REGIONAL_OFFICER' },
      { id: 'stg-202', name: 'Expert Visit Committee (EVC)', status: 'CLEARED', slaDays: 20, elapsedDays: 19, assignedRole: 'EVC_MEMBER' },
      { id: 'stg-203', name: 'Executive Approval', status: 'ACTIVE', slaDays: 10, elapsedDays: 8, assignedRole: 'BUREAU_HEAD' },
      { id: 'stg-204', name: 'Final Letter of Approval', status: 'PENDING', slaDays: 5, elapsedDays: 0, assignedRole: 'ADMIN' }
    ]
  },
  {
    id: 'APP-3044',
    institutionId: 'INST-3021',
    institutionName: 'BMS College of Engineering',
    state: 'Karnataka',
    region: 'South-Western Region',
    category: 'Management',
    intakeSize: 600,
    facultyCount: 35,
    submissionDate: '2026-01-10',
    currentStageIndex: 1,
    status: 'IN_PROGRESS',
    assignedOfficer: 'Ananya Sharma',
    slaDeadline: '2026-02-28',
    daysRemaining: 0,
    daysOverdue: 2,
    riskPriority: 'HIGH',
    escalationLevel: 2,
    defectCount: 2,
    delayCost: 480000,
    lastAction: 'SLA threshold reached 100%. Level 2 regional alert dispatched.',
    lat: 12.9416,
    lng: 77.5755,
    stages: [
      { id: 'stg-301', name: 'Initial Scrutiny', status: 'CLEARED', slaDays: 15, elapsedDays: 15, assignedRole: 'REGIONAL_OFFICER' },
      { id: 'stg-302', name: 'Expert Visit Committee (EVC)', status: 'ACTIVE', slaDays: 20, elapsedDays: 22, assignedRole: 'EVC_MEMBER' },
      { id: 'stg-303', name: 'Executive Approval', status: 'PENDING', slaDays: 10, elapsedDays: 0, assignedRole: 'BUREAU_HEAD' }
    ]
  },
  {
    id: 'APP-4099',
    institutionId: 'INST-4055',
    institutionName: 'Delhi Technological University (DTU)',
    state: 'Delhi',
    region: 'Northern Region',
    category: 'Engineering & Technology',
    intakeSize: 2400,
    facultyCount: 180,
    submissionDate: '2026-02-05',
    currentStageIndex: 0,
    status: 'SUBMITTED',
    assignedOfficer: 'Ananya Sharma',
    slaDeadline: '2026-04-01',
    daysRemaining: 25,
    daysOverdue: 0,
    riskPriority: 'LOW',
    escalationLevel: 0,
    defectCount: 0,
    delayCost: 0,
    lastAction: 'Application submitted successfully with hash verification.',
    lat: 28.7501,
    lng: 77.1177,
    stages: [
      { id: 'stg-401', name: 'Initial Scrutiny', status: 'ACTIVE', slaDays: 15, elapsedDays: 4, assignedRole: 'REGIONAL_OFFICER' },
      { id: 'stg-402', name: 'Expert Visit Committee (EVC)', status: 'PENDING', slaDays: 20, elapsedDays: 0, assignedRole: 'EVC_MEMBER' }
    ]
  }
];

// Seed EVC Clusters including CLUSTER-PUNE-01
export const SEED_CLUSTERS: EVCCluster[] = [
  {
    id: 'CLUSTER-PUNE-01',
    name: 'Pune Corridor Tech Cluster 01',
    region: 'Western Region',
    scheduledDate: '2026-03-15',
    institutionIds: ['INST-1011', 'INST-1012', 'INST-1013'],
    institutionNames: [
      'Pune Institute of Computer Technology (PICT)',
      'Vishwakarma Institute of Technology (VIT)',
      'Army Institute of Technology (AIT)'
    ],
    committeeMembers: ['Capt. Rajesh Nair', 'Dr. Subhash Chandra', 'Prof. Meera Joshi'],
    status: 'CONFIRMED',
    itinerarySummary: 'Optimized via K-Means spatial clustering (Radius < 35km). Estimated transit saving: 4.5 hours.'
  }
];

// Seed Undertakings
export const SEED_UNDERTAKINGS: Undertaking[] = [
  {
    id: 'UND-901',
    institutionId: 'INST-8892',
    institutionName: 'Sri Venkateswara Engineering College',
    title: 'AICTE Faculty Pay Scale Compliance Undertaking',
    category: 'Faculty Compliance',
    dueDate: '2026-03-10',
    status: 'PENDING'
  },
  {
    id: 'UND-902',
    institutionId: 'INST-1011',
    institutionName: 'Pune Institute of Computer Technology (PICT)',
    title: 'Fire Safety & NOC Renewal Undertaking 2026',
    category: 'Infrastructure & Safety',
    dueDate: '2026-03-20',
    status: 'FULFILLED',
    evidenceUrl: 'https://example.com/noc-certificate-2026.pdf',
    evidenceSubmittedAt: '2026-02-18',
    verifiedAt: '2026-02-19'
  }
];

// Seed Documents
export const SEED_DOCUMENTS: DocumentRecord[] = [
  {
    id: 'DOC-501',
    institutionId: 'INST-8892',
    institutionName: 'Sri Venkateswara Engineering College',
    fileName: 'Land_Use_Certificate_2026.pdf',
    category: 'Land & Infrastructure',
    uploadDate: '2026-01-15',
    expiryDate: '2030-01-15',
    status: 'VERIFIED',
    hash: '0x8f9b2c3a1e4d5f6a7890bcdef1234567890abcdef',
    isHashMatchedPriorCycle: true,
    priorCycleYear: '2025'
  },
  {
    id: 'DOC-502',
    institutionId: 'INST-1011',
    institutionName: 'Pune Institute of Computer Technology (PICT)',
    fileName: 'AICTE_Approval_Letter_2026.pdf',
    category: 'Statutory Approval',
    uploadDate: '2026-02-01',
    expiryDate: '2027-02-01',
    status: 'VERIFIED',
    hash: '0x3c4b5a6978f1e2d34567890abcdef1234567890a',
    isHashMatchedPriorCycle: true,
    priorCycleYear: '2025'
  }
];

// Seed Escalations
export const SEED_ESCALATIONS: EscalationRecord[] = [
  {
    id: 'ESC-8892',
    applicationId: 'APP-8892',
    institutionName: 'Sri Venkateswara Engineering College',
    triggerDate: '2026-03-02',
    currentLevel: 3,
    recipient: 'Dr. Rameshwar Rao (Bureau Head)',
    acknowledged: false,
    lastAction: 'SLA exceeded by 1 day with 4 active faculty deficiencies.',
    nextCondition: 'Promotes to Level 4 (Competent Authority) in 6 days if unacknowledged.'
  }
];

// Seed Precedent Cases
export const SEED_PRECEDENTS: PrecedentCase[] = [
  {
    id: 'PREC-101',
    previousAppId: 'APP-7210',
    institutionName: 'Kongu Engineering College',
    region: 'Southern Region',
    category: 'Engineering & Technology',
    intakeSize: 720,
    defectCount: 3,
    decision: 'CONDITIONAL',
    similarityScore: 97.2,
    decisionDate: '2025-08-14',
    reasoning: 'Granted conditional approval with 30-day undertaking for faculty recruitment under APH Clause 4.2.'
  },
  {
    id: 'PREC-102',
    previousAppId: 'APP-6540',
    institutionName: 'RMK Engineering College',
    region: 'Southern Region',
    category: 'Engineering & Technology',
    intakeSize: 900,
    defectCount: 5,
    decision: 'REJECTED',
    similarityScore: 94.1,
    decisionDate: '2025-06-20',
    reasoning: 'Rejection upheld due to unrectified land conversion discrepancies and faculty pay-scale non-compliance.'
  },
  {
    id: 'PREC-103',
    previousAppId: 'APP-5890',
    institutionName: 'St. Josephs Institute',
    region: 'Southern Region',
    category: 'Engineering & Technology',
    intakeSize: 600,
    defectCount: 2,
    decision: 'APPROVED',
    similarityScore: 91.5,
    decisionDate: '2025-04-11',
    reasoning: 'Approved after verification of digital signature undertakings and online faculty attendance logs.'
  }
];

// Seed Legal Cases
export const SEED_LEGAL_CASES: LegalCase[] = [
  {
    id: 'LEG-301',
    courtName: 'High Court of Madras',
    applicationId: 'APP-8892',
    institutionName: 'Sri Venkateswara Engineering College',
    filingDate: '2026-03-04',
    outcome: 'PENDING',
    riskPattern: 'Writ Petition filed challenging EVC faculty count methodology.',
    citation: 'WP No. 14202 of 2026',
    decisionNotes: 'Legal Cell reviewing compliance affidavit and video inspection transcripts.'
  }
];

// Seed Audit Logs
export const SEED_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'AUD-001',
    actor: 'Dr. Rameshwar Rao',
    role: 'BUREAU_HEAD',
    action: 'USER_LOGIN',
    entity: 'System Session',
    timestamp: '2026-10-30 08:30:00',
    previousHash: '0x0000000000000000000000000000000000000000',
    currentHash: mockSha256('system_init_bureau_head_login'),
    payloadJson: '{"login":"success","role":"BUREAU_HEAD"}'
  },
  {
    id: 'AUD-002',
    actor: 'Ananya Sharma',
    role: 'REGIONAL_OFFICER',
    action: 'STAGE_PROGRESSION',
    entity: 'APP-1021',
    timestamp: '2026-02-11 11:15:22',
    previousHash: mockSha256('system_init_bureau_head_login'),
    currentHash: mockSha256('app_1021_stage_progress_scrutiny_cleared'),
    payloadJson: '{"appId":"APP-1021","stage":"Initial Scrutiny","status":"CLEARED"}'
  }
];

// Seed Notifications
export const SEED_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'NOTIF-1',
    title: 'SLA Escalation Triggered',
    message: 'Application APP-8892 has breached SLA and escalated to Level 3.',
    timestamp: '10 mins ago',
    read: false,
    priority: 'CRITICAL',
    relatedAppId: 'APP-8892',
    category: 'ESCALATION'
  },
  {
    id: 'NOTIF-2',
    title: 'EVC Cluster Scheduled',
    message: 'CLUSTER-PUNE-01 successfully scheduled for 15th March 2026.',
    timestamp: '2 hours ago',
    read: false,
    priority: 'MEDIUM',
    category: 'EVC'
  }
];

// Simple LocalStorage Store State
export interface AppStoreState {
  currentUser: User;
  applications: Application[];
  institutions: Institution[];
  clusters: EVCCluster[];
  undertakings: Undertaking[];
  documents: DocumentRecord[];
  escalations: EscalationRecord[];
  auditLogs: AuditLogItem[];
  precedents: PrecedentCase[];
  legalCases: LegalCase[];
  notifications: SystemNotification[];
  setCurrentUser: (user: User) => void;
  updateApplicationStage: (appId: string, stageId: string, status: any, notes?: string) => void;
  revertApplication: (appId: string, clause: string, reason: string) => void;
  acknowledgeEscalation: (escId: string) => void;
  rescheduleCluster: (clusterId: string, newDate: string) => void;
  verifyUndertaking: (undId: string) => void;
  uploadDocument: (doc: DocumentRecord) => void;
  addLegalCase: (legal: LegalCase) => void;
  resetDemoData: () => void;
  markNotificationRead: (notifId: string) => void;
}

// In-memory fallback if localStorage is unavailable
class FlowStore {
  private listeners: (() => void)[] = [];
  private state: {
    currentUser: User;
    applications: Application[];
    institutions: Institution[];
    clusters: EVCCluster[];
    undertakings: Undertaking[];
    documents: DocumentRecord[];
    escalations: EscalationRecord[];
    auditLogs: AuditLogItem[];
    precedents: PrecedentCase[];
    legalCases: LegalCase[];
    notifications: SystemNotification[];
  };

  constructor() {
    this.state = {
      currentUser: DEMO_USERS[0], // Bureau Head by default for SIH demo
      applications: SEED_APPLICATIONS,
      institutions: SEED_INSTITUTIONS,
      clusters: SEED_CLUSTERS,
      undertakings: SEED_UNDERTAKINGS,
      documents: SEED_DOCUMENTS,
      escalations: SEED_ESCALATIONS,
      auditLogs: SEED_AUDIT_LOGS,
      precedents: SEED_PRECEDENTS,
      legalCases: SEED_LEGAL_CASES,
      notifications: SEED_NOTIFICATIONS
    };
    this.loadFromStorage();
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem('flowguard_store_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };
      }
    } catch (e) {
      console.error('Failed to load state from localStorage', e);
    }
  }

  private saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('flowguard_store_state', JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  public getState() {
    return {
      ...this.state,
      setCurrentUser: (user: User) => {
        this.state.currentUser = user;
        this.logAudit(user.name, user.role, 'USER_LOGIN', 'System Session', `{"user":"${user.name}","role":"${user.role}"}`);
        this.saveToStorage();
      },
      updateApplicationStage: (appId: string, stageId: string, status: any, notes?: string) => {
        this.state.applications = this.state.applications.map(app => {
          if (app.id !== appId) return app;
          const updatedStages = app.stages.map(stg => {
            if (stg.id === stageId) {
              return { ...stg, status, notes: notes || stg.notes, updatedAt: new Date().toISOString().split('T')[0] };
            }
            return stg;
          });
          return { ...app, stages: updatedStages, lastAction: `Stage ${stageId} updated to ${status}` };
        });
        this.logAudit(this.state.currentUser.name, this.state.currentUser.role, 'STAGE_PROGRESSION', appId, `{"stageId":"${stageId}","status":"${status}"}`);
        this.saveToStorage();
      },
      revertApplication: (appId: string, clause: string, reason: string) => {
        this.state.applications = this.state.applications.map(app => {
          if (app.id !== appId) return app;
          return {
            ...app,
            status: 'IN_PROGRESS',
            lastAction: `Reverted under APH Clause ${clause}: ${reason.substring(0, 50)}...`
          };
        });
        this.logAudit(this.state.currentUser.name, this.state.currentUser.role, 'APPLICATION_REVERT', appId, `{"clause":"${clause}","reason":"${reason}"}`);
        this.saveToStorage();
      },
      acknowledgeEscalation: (escId: string) => {
        this.state.escalations = this.state.escalations.map(esc => {
          if (esc.id !== escId) return esc;
          return {
            ...esc,
            acknowledged: true,
            acknowledgedAt: new Date().toISOString(),
            acknowledgedBy: this.state.currentUser.name
          };
        });
        this.logAudit(this.state.currentUser.name, this.state.currentUser.role, 'ESCALATION_ACKNOWLEDGE', escId, `{"escalationId":"${escId}"}`);
        this.saveToStorage();
      },
      rescheduleCluster: (clusterId: string, newDate: string) => {
        this.state.clusters = this.state.clusters.map(c => {
          if (c.id !== clusterId) return c;
          return { ...c, scheduledDate: newDate, status: 'RESCHEDULED' };
        });
        this.logAudit(this.state.currentUser.name, this.state.currentUser.role, 'EVC_RESCHEDULE', clusterId, `{"newDate":"${newDate}"}`);
        this.saveToStorage();
      },
      verifyUndertaking: (undId: string) => {
        this.state.undertakings = this.state.undertakings.map(u => {
          if (u.id !== undId) return u;
          return { ...u, status: 'FULFILLED', verifiedAt: new Date().toISOString().split('T')[0] };
        });
        this.logAudit(this.state.currentUser.name, this.state.currentUser.role, 'UNDERTAKING_VERIFY', undId, `{"undertakingId":"${undId}"}`);
        this.saveToStorage();
      },
      uploadDocument: (doc: DocumentRecord) => {
        this.state.documents = [doc, ...this.state.documents];
        this.logAudit(this.state.currentUser.name, this.state.currentUser.role, 'DOCUMENT_UPLOAD', doc.institutionId, `{"fileName":"${doc.fileName}","hash":"${doc.hash}"}`);
        this.saveToStorage();
      },
      addLegalCase: (legal: LegalCase) => {
        this.state.legalCases = [legal, ...this.state.legalCases];
        this.logAudit(this.state.currentUser.name, this.state.currentUser.role, 'LEGAL_CASE_ADD', legal.applicationId, `{"citation":"${legal.citation}"}`);
        this.saveToStorage();
      },
      resetDemoData: () => {
        this.state = {
          currentUser: DEMO_USERS[0],
          applications: SEED_APPLICATIONS,
          institutions: SEED_INSTITUTIONS,
          clusters: SEED_CLUSTERS,
          undertakings: SEED_UNDERTAKINGS,
          documents: SEED_DOCUMENTS,
          escalations: SEED_ESCALATIONS,
          auditLogs: SEED_AUDIT_LOGS,
          precedents: SEED_PRECEDENTS,
          legalCases: SEED_LEGAL_CASES,
          notifications: SEED_NOTIFICATIONS
        };
        this.saveToStorage();
      },
      markNotificationRead: (notifId: string) => {
        this.state.notifications = this.state.notifications.map(n => n.id === notifId ? { ...n, read: true } : n);
        this.saveToStorage();
      }
    };
  }

  private logAudit(actor: string, role: Role, action: string, entity: string, payloadJson: string) {
    const lastLog = this.state.auditLogs[0];
    const prevHash = lastLog ? lastLog.currentHash : '0x0000000000000000000000000000000000000000';
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const currHash = mockSha256(prevHash + action + actor + timestamp + payloadJson);

    const newItem: AuditLogItem = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      actor,
      role,
      action,
      entity,
      timestamp,
      previousHash: prevHash,
      currentHash: currHash,
      payloadJson
    };
    this.state.auditLogs = [newItem, ...this.state.auditLogs];
  }
}

export const flowStore = new FlowStore();

export type Role = 
  | 'ADMIN' 
  | 'REGIONAL_OFFICER' 
  | 'BUREAU_HEAD' 
  | 'EVC_MEMBER' 
  | 'COMPETENT_AUTHORITY' 
  | 'INSTITUTION' 
  | 'LEGAL_CELL';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  region?: string;
  institutionId?: string;
  avatar?: string;
}

export type ApplicationStatus = 'DRAFT' | 'SUBMITTED' | 'IN_PROGRESS' | 'APPROVED' | 'REJECTED' | 'DOCUMENT_EXPIRED' | 'ESCALATED';

export type StageStatus = 'PENDING' | 'CONDITIONAL_ACTIVE' | 'ACTIVE' | 'REVERTED' | 'CLEARED' | 'ESCALATED';

export interface WorkflowStage {
  id: string;
  name: string;
  status: StageStatus;
  slaDays: number;
  elapsedDays: number;
  assignedRole: string;
  updatedAt?: string;
  notes?: string;
}

export interface Application {
  id: string;
  institutionId: string;
  institutionName: string;
  state: string;
  region: string;
  category: 'Engineering & Technology' | 'Management' | 'MCA' | 'Pharmacy' | 'Architecture';
  intakeSize: number;
  facultyCount: number;
  submissionDate: string;
  currentStageIndex: number;
  stages: WorkflowStage[];
  status: ApplicationStatus;
  assignedOfficer: string;
  slaDeadline: string;
  daysRemaining: number;
  daysOverdue: number;
  riskPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'LEGAL_RISK';
  escalationLevel: number;
  defectCount: number;
  delayCost: number;
  lastAction: string;
  lat?: number;
  lng?: number;
}

export interface Institution {
  id: string;
  name: string;
  code: string;
  state: string;
  region: string;
  address: string;
  principal: string;
  email: string;
  phone: string;
  complianceHealthScore: number; // 0-100
  lateSubmissions: number;
  escalationCount: number;
  applicationCycles: number;
  lat: number;
  lng: number;
}

export interface EVCCluster {
  id: string;
  name: string;
  region: string;
  scheduledDate: string;
  institutionIds: string[];
  institutionNames: string[];
  committeeMembers: string[];
  status: 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'RESCHEDULED';
  itinerarySummary: string;
}

export interface Undertaking {
  id: string;
  institutionId: string;
  institutionName: string;
  title: string;
  category: string;
  dueDate: string;
  status: 'PENDING' | 'FULFILLED' | 'OVERDUE' | 'REJECTED';
  evidenceUrl?: string;
  evidenceSubmittedAt?: string;
  verifiedAt?: string;
}

export interface DocumentRecord {
  id: string;
  institutionId: string;
  institutionName: string;
  fileName: string;
  category: string;
  uploadDate: string;
  expiryDate: string;
  status: 'VERIFIED' | 'PENDING' | 'EXPIRED' | 'REJECTED';
  hash: string;
  isHashMatchedPriorCycle: boolean;
  priorCycleYear?: string;
}

export interface EscalationRecord {
  id: string;
  applicationId: string;
  institutionName: string;
  triggerDate: string;
  currentLevel: number; // 1 to 5
  recipient: string;
  acknowledged: boolean;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  lastAction: string;
  nextCondition: string;
}

export interface AuditLogItem {
  id: string;
  actor: string;
  role: Role;
  action: string;
  entity: string;
  timestamp: string;
  previousHash: string;
  currentHash: string;
  payloadJson: string;
}

export interface PrecedentCase {
  id: string;
  previousAppId: string;
  institutionName: string;
  region: string;
  category: string;
  intakeSize: number;
  defectCount: number;
  decision: 'APPROVED' | 'REJECTED' | 'CONDITIONAL';
  similarityScore: number; // e.g. 96.4%
  decisionDate: string;
  reasoning: string;
}

export interface LegalCase {
  id: string;
  courtName: string;
  applicationId: string;
  institutionName: string;
  filingDate: string;
  outcome: 'PENDING' | 'DISMISSED' | 'FAVOURABLE' | 'ADVERSE';
  riskPattern: string;
  citation: string;
  decisionNotes: string;
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  relatedAppId?: string;
  category: 'APPLICATION' | 'SLA' | 'ESCALATION' | 'EVC' | 'DOCUMENT' | 'UNDERTAKING' | 'COMPLIANCE';
}

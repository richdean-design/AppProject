export interface TenantInfo {
  id: string;
  displayName: string;
  tenantId: string;
  defaultDomainName: string;
  tenantType: string;
}

export interface UserStats {
  total: number;
  members: number;
  guests: number;
  active: number;
  inactive: number;
  licensed: number;
  unlicensed: number;
  disabled: number;
  mfaEnabled: number;
  mfaNotEnabled: number;
}

export interface GroupStats {
  total: number;
  teamsAttached: number;
  mailOnly: number;
  active: number;
  inactive: number;
  hasOwner: number;
  orphaned: number;
  enabled: number;
  softDeleted: number;
}

export interface DeviceStats {
  total: number;
  managed: number;
  unmanaged: number;
  compliant: number;
  nonCompliant: number;
  win11: number;
  win10: number;
  other: number;
  active: number;
  inactive: number;
  corporate: number;
  personal: number;
}

export interface AppStats {
  total: number;
  enterprise: number;
  appRegistrations: number;
  assigned: number;
  unassigned: number;
  enabled: number;
  disabled: number;
}

export interface SecureScoreData {
  currentScore: number;
  maxScore: number;
  percentage: number;
  categories: {
    identity: number;
    data: number;
    device: number;
    apps: number;
  };
  trend: number;
  similarOrgAvg: number;
}

export interface AlertItem {
  id: string;
  title: string;
  tenant: string;
  severity: 'critical' | 'warning' | 'info';
  timestamp: string;
  status: 'new' | 'in-progress' | 'resolved';
}

export interface BackupItem {
  service: string;
  lastBackup: string;
  size: string;
  users: number | null;
  items: number;
}

export interface PrivilegedRole {
  name: string;
  count: number;
  percentage: number;
  icon: string;
}

export interface UpgradeTenant {
  name: string;
  currentPlan: string;
  totalSeats: number;
  eligibleForBP: number;
  secureScore: number;
  lastActivity: string;
}

export interface OpportunityItem {
  id: string;
  priority: 'high' | 'medium' | 'low';
  tenant: string;
  title: string;
  insight: string;
  metrics: { label: string; value: string }[];
  solution: string;
}

export interface Organization {
  id: string;
  name: string;
  domain: string;
  tenantCount: number;
  selected: boolean;
}

export type DashboardView = 'overview' | 'security' | 'backup' | 'compliance' | 'alerts';

export type NavSection =
  | 'monitor'
  | 'manage'
  | 'secure'
  | 'response'
  | 'report'
  | 'automate'
  | 'admin';

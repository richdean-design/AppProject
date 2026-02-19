import { Client } from '@microsoft/microsoft-graph-client';
import { PublicClientApplication } from '@azure/msal-browser';
import { graphScopes } from '../auth/msalConfig';
import type {
  UserStats,
  GroupStats,
  DeviceStats,
  AppStats,
  SecureScoreData,
  AlertItem,
  BackupItem,
  PrivilegedRole,
  UpgradeTenant,
  OpportunityItem,
  Organization,
} from '../types';

let graphClient: Client | null = null;

export function initGraphClient(msalInstance: PublicClientApplication) {
  graphClient = Client.init({
    authProvider: async (done) => {
      try {
        const accounts = msalInstance.getAllAccounts();
        if (accounts.length === 0) {
          done(new Error('No accounts found'), null);
          return;
        }
        const response = await msalInstance.acquireTokenSilent({
          scopes: graphScopes,
          account: accounts[0],
        });
        done(null, response.accessToken);
      } catch (error) {
        done(error as Error, null);
      }
    },
  });
}

// ---- Live Graph API calls ----

export async function fetchUsers(): Promise<UserStats> {
  if (!graphClient) return getDemoUserStats();
  try {
    const users = await graphClient.api('/users').count(true).top(1)
      .header('ConsistencyLevel', 'eventual').get();
    const total = users['@odata.count'] || 0;
    // For a full implementation, you'd make multiple filtered queries
    // This is a simplified version
    return { total, members: 0, guests: 0, active: 0, inactive: 0, licensed: 0, unlicensed: 0, disabled: 0, mfaEnabled: 0, mfaNotEnabled: 0 };
  } catch {
    return getDemoUserStats();
  }
}

export async function fetchGroups(): Promise<GroupStats> {
  if (!graphClient) return getDemoGroupStats();
  try {
    const groups = await graphClient.api('/groups').count(true).top(1)
      .header('ConsistencyLevel', 'eventual').get();
    const total = groups['@odata.count'] || 0;
    return { total, teamsAttached: 0, mailOnly: 0, active: 0, inactive: 0, hasOwner: 0, orphaned: 0, enabled: 0, softDeleted: 0 };
  } catch {
    return getDemoGroupStats();
  }
}

export async function fetchDevices(): Promise<DeviceStats> {
  if (!graphClient) return getDemoDeviceStats();
  try {
    const devices = await graphClient.api('/devices').count(true).top(1)
      .header('ConsistencyLevel', 'eventual').get();
    const total = devices['@odata.count'] || 0;
    return { total, managed: 0, unmanaged: 0, compliant: 0, nonCompliant: 0, win11: 0, win10: 0, other: 0, active: 0, inactive: 0, corporate: 0, personal: 0 };
  } catch {
    return getDemoDeviceStats();
  }
}

export async function fetchApps(): Promise<AppStats> {
  if (!graphClient) return getDemoAppStats();
  try {
    const apps = await graphClient.api('/applications').count(true).top(1)
      .header('ConsistencyLevel', 'eventual').get();
    const total = apps['@odata.count'] || 0;
    return { total, enterprise: 0, appRegistrations: 0, assigned: 0, unassigned: 0, enabled: 0, disabled: 0 };
  } catch {
    return getDemoAppStats();
  }
}

export async function fetchSecureScore(): Promise<SecureScoreData> {
  if (!graphClient) return getDemoSecureScore();
  try {
    const scores = await graphClient.api('/security/secureScores').top(1).get();
    if (scores.value && scores.value.length > 0) {
      const score = scores.value[0];
      return {
        currentScore: score.currentScore || 0,
        maxScore: score.maxScore || 1000,
        percentage: score.maxScore ? Math.round((score.currentScore / score.maxScore) * 1000) / 10 : 0,
        categories: { identity: 0, data: 0, device: 0, apps: 0 },
        trend: 0,
        similarOrgAvg: 0,
      };
    }
    return getDemoSecureScore();
  } catch {
    return getDemoSecureScore();
  }
}

export async function fetchAlerts(): Promise<AlertItem[]> {
  if (!graphClient) return getDemoAlerts();
  try {
    const alerts = await graphClient.api('/security/alerts_v2').top(10).get();
    return (alerts.value || []).map((a: Record<string, unknown>) => ({
      id: a.id as string,
      title: a.title as string,
      tenant: (a.tenantId as string) || 'Current Tenant',
      severity: (a.severity as string)?.toLowerCase() === 'high' ? 'critical' : 'warning',
      timestamp: a.createdDateTime as string,
      status: a.status === 'new' ? 'new' : 'in-progress',
    }));
  } catch {
    return getDemoAlerts();
  }
}

export async function fetchDirectoryRoles(): Promise<PrivilegedRole[]> {
  if (!graphClient) return getDemoRoles();
  try {
    const roles = await graphClient.api('/directoryRoles').expand('members').get();
    return (roles.value || []).slice(0, 5).map((r: Record<string, unknown>) => ({
      name: r.displayName as string,
      count: Array.isArray(r.members) ? (r.members as unknown[]).length : 0,
      percentage: 0,
      icon: 'shield',
    }));
  } catch {
    return getDemoRoles();
  }
}

// ---- Demo data (used when MSAL is not configured) ----

export function getDemoUserStats(): UserStats {
  return {
    total: 12847, members: 11203, guests: 1644,
    active: 11954, inactive: 893, licensed: 12105,
    unlicensed: 742, disabled: 156, mfaEnabled: 10289, mfaNotEnabled: 2558,
  };
}

export function getDemoGroupStats(): GroupStats {
  return {
    total: 1453, teamsAttached: 687, mailOnly: 766,
    active: 1289, inactive: 164, hasOwner: 1321,
    orphaned: 132, enabled: 1398, softDeleted: 55,
  };
}

export function getDemoDeviceStats(): DeviceStats {
  return {
    total: 8932, managed: 7845, unmanaged: 1087,
    compliant: 7203, nonCompliant: 1729, win11: 4521,
    win10: 3124, other: 1287, active: 8456, inactive: 476,
    corporate: 7234, personal: 1698,
  };
}

export function getDemoAppStats(): AppStats {
  return {
    total: 2347, enterprise: 1456, appRegistrations: 891,
    assigned: 1876, unassigned: 471, enabled: 2189, disabled: 158,
  };
}

export function getDemoSecureScore(): SecureScoreData {
  return {
    currentScore: 782, maxScore: 1000, percentage: 78.2,
    categories: { identity: 90.8, data: 96.96, device: 51.16, apps: 40.89 },
    trend: 12, similarOrgAvg: 72.5,
  };
}

export function getDemoAlerts(): AlertItem[] {
  return [
    { id: '1', title: 'License allocation exceeded', tenant: 'Contoso Ltd.', severity: 'critical', timestamp: '25 minutes ago', status: 'new' },
    { id: '2', title: 'Backup job completed with warnings', tenant: 'Fabrikam Inc.', severity: 'warning', timestamp: '1 hour ago', status: 'in-progress' },
    { id: '3', title: 'Secure Score decreased for tenant', tenant: 'Adventure Works', severity: 'warning', timestamp: '2 hours ago', status: 'new' },
  ];
}

export function getDemoRoles(): PrivilegedRole[] {
  return [
    { name: 'Global Administrators', count: 12, percentage: 60, icon: 'shield-check' },
    { name: 'Security Administrators', count: 8, percentage: 40, icon: 'shield' },
    { name: 'User Administrators', count: 15, percentage: 75, icon: 'users' },
    { name: 'Exchange Administrators', count: 6, percentage: 30, icon: 'mail' },
    { name: 'SharePoint Administrators', count: 6, percentage: 30, icon: 'file-text' },
  ];
}

export function getDemoBackupData(): BackupItem[] {
  return [
    { service: 'Mail', lastBackup: '10/04/2025 09:41 AM', size: '909.5 MB', users: 7, items: 6224 },
    { service: 'OneDrive', lastBackup: '10/04/2025 09:41 AM', size: '58.81 GB', users: 7, items: 30497 },
    { service: 'Contacts', lastBackup: '10/04/2025 09:41 AM', size: '7.2 KB', users: 7, items: 2 },
    { service: 'Calendar', lastBackup: '10/04/2025 09:41 AM', size: '3.3 MB', users: 7, items: 307 },
    { service: 'SharePoint & Teams Files', lastBackup: '10/04/2025 09:41 AM', size: '30.83 GB', users: null, items: 11885 },
    { service: 'Teams Chats', lastBackup: '10/04/2025 07:25 AM', size: '34.5 MB', users: 7, items: 18821 },
    { service: 'Planner Plans', lastBackup: '10/04/2025 09:41 AM', size: '0 bytes', users: null, items: 0 },
    { service: 'Entra ID', lastBackup: '10/04/2025 09:41 AM', size: '0 bytes', users: null, items: 441 },
  ];
}

export function getDemoUpgradeTenants(): UpgradeTenant[] {
  return [
    { name: 'Northwind Traders', currentPlan: 'Business Standard', totalSeats: 500, eligibleForBP: 485, secureScore: 72, lastActivity: '2 hours ago' },
    { name: 'Adventure Works', currentPlan: 'Business Basic', totalSeats: 425, eligibleForBP: 405, secureScore: 48, lastActivity: '5 hours ago' },
    { name: 'Fabrikam', currentPlan: 'Business Standard', totalSeats: 520, eligibleForBP: 380, secureScore: 68, lastActivity: '1 day ago' },
    { name: 'Contoso', currentPlan: 'Business Basic', totalSeats: 340, eligibleForBP: 320, secureScore: 65, lastActivity: '3 hours ago' },
  ];
}

export function getDemoOpportunities(): OpportunityItem[] {
  return [
    {
      id: '1', priority: 'high', tenant: 'Northwind Traders',
      title: 'Enable Self-Service Password Reset',
      insight: '247 password reset tickets in last 30 days',
      metrics: [{ label: 'Est. Time Savings', value: '18.5 hrs/month' }, { label: 'Cost Reduction', value: '$925/month' }],
      solution: 'Included with Business Premium upgrade',
    },
    {
      id: '2', priority: 'medium', tenant: 'Adventure Works',
      title: 'Enable Self-Service Group Management',
      insight: '156 group access requests pending admin action',
      metrics: [{ label: 'Est. Time Savings', value: '12 hrs/month' }, { label: 'User Productivity', value: '+15% faster' }],
      solution: 'Included with Business Premium upgrade',
    },
    {
      id: '3', priority: 'medium', tenant: 'Fabrikam',
      title: 'Implement Multi-Factor Authentication',
      insight: 'Only 23% of users have MFA enabled',
      metrics: [{ label: 'Security Improvement', value: '+35 points' }, { label: 'Breach Prevention', value: '99.9% effective' }],
      solution: 'Available now - zero additional cost',
    },
  ];
}

export function getDemoOrganizations(): Organization[] {
  return [
    { id: '1', name: 'Contoso Ltd.', domain: 'contoso.com', tenantCount: 5, selected: true },
    { id: '2', name: 'Fabrikam Inc.', domain: 'fabrikam.com', tenantCount: 3, selected: false },
    { id: '3', name: 'Adventure Works', domain: 'adventureworks.com', tenantCount: 2, selected: false },
    { id: '4', name: 'Northwind Traders', domain: 'northwind.com', tenantCount: 4, selected: false },
    { id: '5', name: 'Woodgrove Bank', domain: 'woodgrove.com', tenantCount: 2, selected: false },
    { id: '6', name: 'Tailspin Toys', domain: 'tailspintoys.com', tenantCount: 1, selected: false },
    { id: '7', name: 'Litware Inc.', domain: 'litware.com', tenantCount: 3, selected: false },
    { id: '8', name: 'Wide World Importers', domain: 'wideworldimporters.com', tenantCount: 2, selected: false },
    { id: '9', name: 'Proseware Inc.', domain: 'proseware.com', tenantCount: 1, selected: false },
    { id: '10', name: 'Graphic Design Institute', domain: 'graphicdesign.edu', tenantCount: 1, selected: false },
    { id: '11', name: 'Consolidated Messenger', domain: 'consolidatedmessenger.com', tenantCount: 2, selected: false },
    { id: '12', name: 'Trey Research', domain: 'treyresearch.net', tenantCount: 1, selected: false },
  ];
}

import { useState, useEffect } from 'react';
import { LayoutGrid, Shield, Cloud, ShieldCheck, Bell, Settings, PlusCircle, Check } from 'lucide-react';
import { UsersKPI, GroupsKPI, DevicesKPI, AppsKPI } from './KPICard';
import { SecureScoreCard, ComplianceCard, BackupCoverageCard, UnifiedAlertsCard } from './HealthCards';
import { AlertsFeed } from './AlertsFeed';
import { QuickActions } from './QuickActions';
import { LicenseChart } from './LicenseChart';
import { PrivilegedRoles } from './PrivilegedRoles';
import { UpgradeTracker } from './UpgradeTracker';
import { CloudBackup } from './CloudBackup';
import { AIOpportunities } from './AIOpportunities';
import {
  fetchUsers,
  fetchGroups,
  fetchDevices,
  fetchApps,
  fetchSecureScore,
  fetchAlerts,
  fetchDirectoryRoles,
  getDemoUserStats,
  getDemoGroupStats,
  getDemoDeviceStats,
  getDemoAppStats,
  getDemoSecureScore,
  getDemoAlerts,
  getDemoRoles,
  getDemoBackupData,
  getDemoUpgradeTenants,
  getDemoOpportunities,
} from '../../services/graphService';
import type { DashboardView, UserStats, GroupStats, DeviceStats, AppStats, SecureScoreData, AlertItem, PrivilegedRole } from '../../types';

const viewButtons: { view: DashboardView; label: string; icon: React.ReactNode }[] = [
  { view: 'overview', label: 'Overview', icon: <LayoutGrid size={14} /> },
  { view: 'security', label: 'Security', icon: <Shield size={14} /> },
  { view: 'backup', label: 'Backup & Recovery', icon: <Cloud size={14} /> },
  { view: 'compliance', label: 'Compliance', icon: <ShieldCheck size={14} /> },
  { view: 'alerts', label: 'Unified Alerts', icon: <Bell size={14} /> },
];

export function DashboardPage() {
  const [activeView, setActiveView] = useState<DashboardView>('overview');

  // State for live data (initialized with demo data as fallback)
  const [userStats, setUserStats] = useState<UserStats>(getDemoUserStats());
  const [groupStats, setGroupStats] = useState<GroupStats>(getDemoGroupStats());
  const [deviceStats, setDeviceStats] = useState<DeviceStats>(getDemoDeviceStats());
  const [appStats, setAppStats] = useState<AppStats>(getDemoAppStats());
  const [secureScore, setSecureScore] = useState<SecureScoreData>(getDemoSecureScore());
  const [alerts, setAlerts] = useState<AlertItem[]>(getDemoAlerts());
  const [roles, setRoles] = useState<PrivilegedRole[]>(getDemoRoles());
  const [backups] = useState(getDemoBackupData());
  const [upgradeTenants] = useState(getDemoUpgradeTenants());
  const [opportunities] = useState(getDemoOpportunities());
  const [lastUpdated, setLastUpdated] = useState('Loading...');

  // Fetch live data from Graph API (falls back to demo data automatically)
  useEffect(() => {
    async function loadData() {
      const [u, g, d, a, s, al, r] = await Promise.all([
        fetchUsers(),
        fetchGroups(),
        fetchDevices(),
        fetchApps(),
        fetchSecureScore(),
        fetchAlerts(),
        fetchDirectoryRoles(),
      ]);
      setUserStats(u);
      setGroupStats(g);
      setDeviceStats(d);
      setAppStats(a);
      setSecureScore(s);
      setAlerts(al);
      setRoles(r);
      setLastUpdated(`Just now`);
    }
    loadData();
  }, []);

  return (
    <>
      <div className="page-header">
        <div className="breadcrumb">Home &gt; Multi-Tenant Dashboard</div>
        <div className="page-title-row">
          <div>
            <h1 className="page-title">Multi-Tenant Dashboard</h1>
            <div className="view-switcher">
              {viewButtons.map(btn => (
                <button
                  key={btn.view}
                  className={`dashboard-view-btn ${activeView === btn.view ? 'active' : ''}`}
                  onClick={() => setActiveView(btn.view)}
                >
                  {btn.icon}
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
          <div className="header-actions">
            <button className="btn btn-secondary">
              <Settings size={16} />
              Customize
            </button>
            <button className="btn btn-primary">
              <PlusCircle size={16} />
              Add Tenant
            </button>
          </div>
        </div>
        <div className="last-updated">
          <Check size={14} />
          Last updated: {lastUpdated}
        </div>
      </div>

      <div className="dashboard-grid">
        {/* KPI Summary Cards */}
        <UsersKPI data={userStats} />
        <GroupsKPI data={groupStats} />
        <DevicesKPI data={deviceStats} />
        <AppsKPI data={appStats} />

        {/* Health Status Cards */}
        <SecureScoreCard data={secureScore} />
        <ComplianceCard />
        <BackupCoverageCard />
        <UnifiedAlertsCard />

        {/* Alerts + Quick Actions */}
        <AlertsFeed alerts={alerts} />
        <QuickActions />

        {/* Charts Row */}
        <LicenseChart />
        <PrivilegedRoles roles={roles} />

        {/* Upgrade Tracker */}
        <UpgradeTracker tenants={upgradeTenants} />

        {/* Backup + Opportunities */}
        <CloudBackup backups={backups} />
        <AIOpportunities opportunities={opportunities} />
      </div>
    </>
  );
}

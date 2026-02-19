import { useState } from 'react';
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
import type { DashboardView } from '../../types';

const viewButtons: { view: DashboardView; label: string; icon: React.ReactNode }[] = [
  { view: 'overview', label: 'Overview', icon: <LayoutGrid size={14} /> },
  { view: 'security', label: 'Security', icon: <Shield size={14} /> },
  { view: 'backup', label: 'Backup & Recovery', icon: <Cloud size={14} /> },
  { view: 'compliance', label: 'Compliance', icon: <ShieldCheck size={14} /> },
  { view: 'alerts', label: 'Unified Alerts', icon: <Bell size={14} /> },
];

export function DashboardPage() {
  const [activeView, setActiveView] = useState<DashboardView>('overview');

  // Use demo data (will switch to live data when MSAL is configured)
  const userStats = getDemoUserStats();
  const groupStats = getDemoGroupStats();
  const deviceStats = getDemoDeviceStats();
  const appStats = getDemoAppStats();
  const secureScore = getDemoSecureScore();
  const alerts = getDemoAlerts();
  const roles = getDemoRoles();
  const backups = getDemoBackupData();
  const upgradeTenants = getDemoUpgradeTenants();
  const opportunities = getDemoOpportunities();

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
          Last updated: 2 minutes ago
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

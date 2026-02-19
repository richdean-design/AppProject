import { Users, UsersRound, Monitor, LayoutGrid } from 'lucide-react';
import type { UserStats, GroupStats, DeviceStats, AppStats } from '../../types';

interface KPIRow {
  label: string;
  value: string | number;
  altLabel?: string;
  altValue?: string | number;
  highlight?: boolean;
  warning?: boolean;
  osRow?: boolean;
  thirdLabel?: string;
  thirdValue?: string | number;
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

function KPIRowItem({ row }: { row: KPIRow }) {
  if (row.osRow) {
    return (
      <div className="kpi-row os-row">
        <span className="kpi-label-sm">{row.label}</span>
        <span className="kpi-value-sm">{typeof row.value === 'number' ? formatNumber(row.value) : row.value}</span>
        {row.altLabel && (
          <>
            <span className="kpi-separator-sm">|</span>
            <span className={`kpi-label-sm ${row.warning ? 'warning' : ''}`}>{row.altLabel}</span>
            <span className={`kpi-value-sm ${row.warning ? 'warning' : ''}`}>
              {typeof row.altValue === 'number' ? formatNumber(row.altValue) : row.altValue}
            </span>
          </>
        )}
        {row.thirdLabel && (
          <>
            <span className="kpi-separator-sm">|</span>
            <span className="kpi-label-sm">{row.thirdLabel}</span>
            <span className="kpi-value-sm">{typeof row.thirdValue === 'number' ? formatNumber(row.thirdValue) : row.thirdValue}</span>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={`kpi-row ${row.highlight ? 'highlight-row' : ''}`}>
      <span className={`kpi-label ${row.highlight && row.warning ? '' : ''}`}>{row.label}</span>
      <span className="kpi-value">{typeof row.value === 'number' ? formatNumber(row.value) : row.value}</span>
      {row.altLabel && (
        <>
          <span className="kpi-separator">|</span>
          <span className={`kpi-label-alt ${row.warning ? 'warning' : ''}`}>{row.altLabel}</span>
          <span className={`kpi-value-alt ${row.warning ? 'warning' : ''}`}>
            {typeof row.altValue === 'number' ? formatNumber(row.altValue) : row.altValue}
          </span>
        </>
      )}
    </div>
  );
}

export function UsersKPI({ data }: { data: UserStats }) {
  const rows: KPIRow[] = [
    { label: 'Members', value: data.members, altLabel: 'Guests', altValue: data.guests },
    { label: 'Active', value: data.active, altLabel: 'Inactive', altValue: data.inactive },
    { label: 'Licensed', value: data.licensed, altLabel: 'Unlicensed', altValue: data.unlicensed },
    { label: 'Disabled', value: data.disabled },
    { label: 'MFA Enabled', value: data.mfaEnabled, altLabel: 'Not Enabled', altValue: data.mfaNotEnabled, highlight: true, warning: true },
  ];

  return (
    <div className="widget col-3 summary-kpi-card" style={{ '--card-color-primary': '#0078D4', '--card-color-secondary': '#00BCF2' } as React.CSSProperties}>
      <div className="kpi-header">
        <Users size={20} stroke="#00BCF2" />
        <span className="kpi-title">Users</span>
      </div>
      <div className="kpi-total">{formatNumber(data.total)}</div>
      <div className="kpi-subtitle">Total Users</div>
      <div className="kpi-breakdown">
        {rows.map((row, i) => <KPIRowItem key={i} row={row} />)}
      </div>
    </div>
  );
}

export function GroupsKPI({ data }: { data: GroupStats }) {
  const rows: KPIRow[] = [
    { label: 'Teams-Attached', value: data.teamsAttached, altLabel: 'Mail-Only', altValue: data.mailOnly },
    { label: 'Active', value: data.active, altLabel: 'Inactive', altValue: data.inactive },
    { label: 'Has Owner', value: data.hasOwner, altLabel: 'Orphaned', altValue: data.orphaned, highlight: true, warning: true },
    { label: 'Enabled', value: data.enabled, altLabel: 'Soft-Deleted', altValue: data.softDeleted },
  ];

  return (
    <div className="widget col-3 summary-kpi-card" style={{ '--card-color-primary': '#0078D4', '--card-color-secondary': '#00BCF2' } as React.CSSProperties}>
      <div className="kpi-header">
        <UsersRound size={20} stroke="#00BCF2" />
        <span className="kpi-title">Groups</span>
      </div>
      <div className="kpi-total">{formatNumber(data.total)}</div>
      <div className="kpi-subtitle">Total Groups</div>
      <div className="kpi-breakdown">
        {rows.map((row, i) => <KPIRowItem key={i} row={row} />)}
      </div>
    </div>
  );
}

export function DevicesKPI({ data }: { data: DeviceStats }) {
  const rows: KPIRow[] = [
    { label: 'Managed', value: data.managed, altLabel: 'Unmanaged', altValue: data.unmanaged },
    { label: 'Compliant', value: data.compliant, altLabel: 'Non-Compliant', altValue: data.nonCompliant, highlight: true, warning: true },
    { label: 'Win 11', value: data.win11, altLabel: 'Win 10', altValue: data.win10, thirdLabel: 'Other', thirdValue: data.other, osRow: true, warning: true },
    { label: 'Active', value: data.active, altLabel: 'Inactive', altValue: data.inactive },
    { label: 'Corporate', value: data.corporate, altLabel: 'Personal', altValue: data.personal },
  ];

  return (
    <div className="widget col-3 summary-kpi-card" style={{ '--card-color-primary': '#107C10', '--card-color-secondary': '#0B6A0B' } as React.CSSProperties}>
      <div className="kpi-header">
        <Monitor size={20} stroke="#10B981" />
        <span className="kpi-title">Devices</span>
      </div>
      <div className="kpi-total">{formatNumber(data.total)}</div>
      <div className="kpi-subtitle">Total Devices</div>
      <div className="kpi-breakdown">
        {rows.map((row, i) => <KPIRowItem key={i} row={row} />)}
      </div>
    </div>
  );
}

export function AppsKPI({ data }: { data: AppStats }) {
  const rows: KPIRow[] = [
    { label: 'Enterprise', value: data.enterprise, altLabel: 'App Reg', altValue: data.appRegistrations },
    { label: 'Assigned', value: data.assigned, altLabel: 'Unassigned', altValue: data.unassigned },
    { label: 'Enabled', value: data.enabled, altLabel: 'Disabled', altValue: data.disabled },
  ];

  return (
    <div className="widget col-3 summary-kpi-card" style={{ '--card-color-primary': '#FFB900', '--card-color-secondary': '#D18700' } as React.CSSProperties}>
      <div className="kpi-header">
        <LayoutGrid size={20} stroke="#FFB900" />
        <span className="kpi-title">Apps</span>
      </div>
      <div className="kpi-total">{formatNumber(data.total)}</div>
      <div className="kpi-subtitle">Total Apps</div>
      <div className="kpi-breakdown">
        {rows.map((row, i) => <KPIRowItem key={i} row={row} />)}
      </div>
    </div>
  );
}

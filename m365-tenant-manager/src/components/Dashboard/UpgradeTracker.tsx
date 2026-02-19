import { Home } from 'lucide-react';
import type { UpgradeTenant } from '../../types';

interface Props {
  tenants: UpgradeTenant[];
}

export function UpgradeTracker({ tenants }: Props) {
  const totalSeats = tenants.reduce((sum, t) => sum + t.eligibleForBP, 0);

  return (
    <div className="widget col-12">
      <div className="widget-header">
        <h3 className="widget-title">Business Premium Upgrade Tracker</h3>
      </div>

      <div style={{ background: 'rgba(255, 185, 0, 0.1)', padding: 16, borderRadius: 6, borderLeft: '3px solid #FFB900', marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#8A8886', fontWeight: 600, marginBottom: 4 }}>TENANTS NEEDING UPGRADE</div>
            <div style={{ fontSize: 32, fontWeight: 600, color: '#FFFFFF' }}>{tenants.length}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: '#8A8886', fontWeight: 600, marginBottom: 4 }}>POTENTIAL SEATS</div>
            <div style={{ fontSize: 24, fontWeight: 600, color: '#FFB900' }}>{totalSeats.toLocaleString()}</div>
          </div>
        </div>
        <div style={{ fontSize: 12, color: '#D1D1D1' }}>
          Standardizing on Business Premium improves security posture
        </div>
      </div>

      <div className="upgrade-table-container">
        <table className="upgrade-table">
          <thead>
            <tr>
              <th>Tenant Name</th>
              <th>Current Plan</th>
              <th>Total Seats</th>
              <th>Eligible for BP</th>
              <th>Secure Score</th>
              <th>Last Activity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tenants.map(tenant => (
              <tr key={tenant.name}>
                <td>
                  <div className="upgrade-tenant-name">
                    <Home size={16} color="#0078D4" />
                    <span>{tenant.name}</span>
                  </div>
                </td>
                <td><span className="plan-badge">{tenant.currentPlan}</span></td>
                <td className="upgrade-seats">{tenant.totalSeats}</td>
                <td className="upgrade-eligible">{tenant.eligibleForBP}</td>
                <td>
                  <div className="secure-score-cell">
                    <span className={tenant.secureScore < 50 ? 'score-warning' : ''}>
                      {tenant.secureScore < 50 && <span className="warning-dot" />}
                      {tenant.secureScore}
                    </span>
                    <div className="score-bar">
                      <div className="score-fill" style={{
                        width: `${tenant.secureScore}%`,
                        background: tenant.secureScore < 50 ? '#D13438' : '#FFB900',
                      }} />
                    </div>
                  </div>
                </td>
                <td className="upgrade-activity">{tenant.lastActivity}</td>
                <td><button className="upgrade-action-btn">Start Upgrade</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

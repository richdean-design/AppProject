import { Shield, ShieldCheck, Users, Mail, FileText, AlertTriangle } from 'lucide-react';
import type { PrivilegedRole } from '../../types';

const iconMap: Record<string, React.ReactNode> = {
  'shield-check': <ShieldCheck size={16} color="#00BCF2" />,
  'shield': <Shield size={16} color="#8A8886" />,
  'users': <Users size={16} color="#8A8886" />,
  'mail': <Mail size={16} color="#8A8886" />,
  'file-text': <FileText size={16} color="#8A8886" />,
};

interface Props {
  roles: PrivilegedRole[];
}

export function PrivilegedRoles({ roles }: Props) {
  return (
    <div className="widget col-6">
      <div className="widget-header">
        <h3 className="widget-title">Privileged Roles Overview</h3>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Left Column - Role Breakdown */}
        <div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: '#8A8886', fontWeight: 600 }}>ROLE DISTRIBUTION</span>
            </div>
            {roles.map(role => (
              <div key={role.name} className="privilege-role-item">
                <div className="privilege-role-header">
                  {iconMap[role.icon] || <Shield size={16} color="#8A8886" />}
                  <span className="privilege-role-name">{role.name}</span>
                  <span className="privilege-role-count">{role.count}</span>
                </div>
                <div className="privilege-role-bar">
                  <div className="privilege-role-fill" style={{ width: `${role.percentage}%`, background: role.icon === 'shield-check' ? '#0078D4' : '#605E5C' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Health Indicators */}
        <div>
          {/* Total Summary */}
          <div style={{ background: 'rgba(0, 120, 212, 0.1)', padding: 16, borderRadius: 6, borderLeft: '3px solid #0078D4', marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: '#8A8886', fontWeight: 600, marginBottom: 6 }}>TOTAL PRIVILEGED ACCOUNTS</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>47</div>
            <div style={{ fontSize: 12, color: '#D1D1D1' }}>Across all selected tenants</div>
          </div>

          {/* Unused Accounts Alert */}
          <div style={{ background: 'rgba(255, 185, 0, 0.1)', padding: 14, borderRadius: 6, borderLeft: '3px solid #FFB900', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <AlertTriangle size={16} color="#FFB900" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#FFB900' }}>Inactive Accounts</span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, color: '#FFFFFF', marginBottom: 4 }}>8 accounts</div>
            <div style={{ fontSize: 11, color: '#D1D1D1' }}>Unused for 90+ days</div>
          </div>

          {/* Break-Glass Accounts */}
          <div style={{ background: 'rgba(16, 124, 16, 0.1)', padding: 14, borderRadius: 6, borderLeft: '3px solid #107C10' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <ShieldCheck size={16} color="#107C10" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#107C10' }}>Break-Glass Accounts</span>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#FFFFFF' }}>2/2</div>
                <div style={{ fontSize: 11, color: '#D1D1D1' }}>Configured</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#107C10' }}>✓</div>
                <div style={{ fontSize: 11, color: '#D1D1D1' }}>Healthy</div>
              </div>
            </div>
            <div style={{ fontSize: 11, color: '#8A8886', marginTop: 8 }}>Last verified: 2 days ago</div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #3F3F3F', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: '#8A8886' }}>
          <span style={{ color: '#FFB900', fontWeight: 600 }}>⚠ Action Required:</span> Review 8 inactive privileged accounts
        </div>
        <a className="action-link">Manage Roles →</a>
      </div>
    </div>
  );
}

import { Shield, ShieldCheck, AlertCircle, Monitor } from 'lucide-react';
import type { SecureScoreData } from '../../types';

export function SecureScoreCard({ data }: { data: SecureScoreData }) {
  return (
    <div className="widget col-3 health-card">
      <div className="health-card-header">
        <div className="health-icon success">
          <Shield size={24} color="#107C10" />
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ flex: '0 0 auto' }}>
          <div style={{ marginBottom: 8 }}>
            <span className="health-metric">{data.percentage}%</span>
          </div>
          <div className="health-label" style={{ marginBottom: 6 }}>Microsoft Secure Score</div>
          <div style={{ fontSize: 11, color: '#8A8886', marginBottom: 16 }}>
            {data.currentScore}/{data.maxScore} points achieved
          </div>
          <div className="health-trend">
            <span>↗</span>
            <span>+{data.trend} pts from last month</span>
          </div>
        </div>

        <div style={{ flex: '0 0 200px', background: 'rgba(0, 120, 212, 0.05)', padding: 10, borderRadius: 6, border: '1px solid rgba(0, 120, 212, 0.15)' }}>
          <div style={{ fontSize: 9, color: '#8A8886', fontWeight: 600, marginBottom: 8, letterSpacing: 0.5 }}>COMPARISON</div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#D1D1D1', fontWeight: 500 }}>Your score</span>
              <span style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 700 }}>{data.percentage}</span>
            </div>
            <div className="progress-bar" style={{ margin: 0, height: 4, background: '#2D2D2D' }}>
              <div className="progress-fill" style={{ width: `${data.percentage}%`, background: 'linear-gradient(90deg, #00BCF2 0%, #0078D4 100%)' }} />
            </div>
          </div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#D1D1D1', fontWeight: 500 }}>Similar size</span>
              <span style={{ fontSize: 11, color: '#8A8886', fontWeight: 700 }}>{data.similarOrgAvg}</span>
            </div>
            <div className="progress-bar" style={{ margin: 0, height: 4, background: '#2D2D2D' }}>
              <div className="progress-fill" style={{ width: `${data.similarOrgAvg}%`, background: '#4A4A4A' }} />
            </div>
          </div>
          <div style={{ fontSize: 9, color: '#107C10', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>+{(data.percentage - data.similarOrgAvg).toFixed(1)} above avg</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #3F3F3F' }}>
        <div style={{ fontSize: 10, color: '#8A8886', fontWeight: 600, marginBottom: 10, letterSpacing: 0.5 }}>SCORE BY CATEGORY</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { name: 'Identity', value: data.categories.identity, color: 'linear-gradient(90deg, #00BCF2, #0078D4)' },
            { name: 'Data', value: data.categories.data, color: 'linear-gradient(90deg, #107C10, #0B6A0B)' },
            { name: 'Device', value: data.categories.device, color: 'linear-gradient(90deg, #FFB900, #D18700)' },
            { name: 'Apps', value: data.categories.apps, color: 'linear-gradient(90deg, #D13438, #A4262C)' },
          ].map(cat => (
            <div key={cat.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: '#D1D1D1', fontWeight: 500 }}>{cat.name}</span>
                <span style={{ fontSize: 11, color: '#FFFFFF', fontWeight: 700 }}>{cat.value}%</span>
              </div>
              <div className="progress-bar" style={{ margin: 0, height: 4 }}>
                <div className="progress-fill" style={{ width: `${cat.value}%`, background: cat.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <a className="action-link" style={{ marginTop: 16 }}>Improve Your Score →</a>
    </div>
  );
}

export function ComplianceCard() {
  return (
    <div className="widget col-3 health-card">
      <div className="health-card-header">
        <div className="health-icon success">
          <ShieldCheck size={24} color="#107C10" />
        </div>
      </div>
      <div style={{ marginBottom: 2 }}>
        <span className="health-metric">94%</span>
      </div>
      <div className="health-label" style={{ marginBottom: 2 }}>Baselines Compliance</div>
      <div style={{ fontSize: 11, color: '#8A8886', marginBottom: 12 }}>
        Best practices assessment across tenants
      </div>
      <div className="health-details">
        <div className="health-detail-item">
          <span className="status-dot green" />
          <span>Compliant: 47 tenants</span>
        </div>
        <div className="health-detail-item">
          <span className="status-dot red" />
          <span>Non-compliant: 3 tenants</span>
        </div>
      </div>

      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #3F3F3F' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={16} color="#00BCF2" />
            <span style={{ fontSize: 11, color: '#8A8886', fontWeight: 600 }}>Microsoft Purview Compliance Score</span>
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#D1D1D1' }}>63%</span>
        </div>
        <div className="progress-bar" style={{ margin: '8px 0', height: 5 }}>
          <div className="progress-fill" style={{ width: '63%', background: 'linear-gradient(90deg, #00BCF2, #0078D4)' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#605E5C', marginBottom: 6 }}>
          <span>Compliance Manager</span>
          <span style={{ fontWeight: 600, color: '#8A8886' }}>783 / 2,363 pts</span>
        </div>
        <div style={{ paddingLeft: 10, borderLeft: '2px solid #3F3F3F', marginTop: 6 }}>
          <div style={{ fontSize: 9, color: '#605E5C', marginBottom: 3 }}>
            <span style={{ color: '#8A8886', fontWeight: 600 }}>Your actions:</span> 1 / 1,527
          </div>
          <div style={{ fontSize: 9, color: '#605E5C' }}>
            <span style={{ color: '#8A8886', fontWeight: 600 }}>MS managed:</span> 782 / 836
          </div>
        </div>
      </div>

      <a className="action-link" style={{ marginTop: 16 }}>View Security Dashboard →</a>
    </div>
  );
}

export function BackupCoverageCard() {
  return (
    <div className="widget col-3 health-card">
      <div className="health-card-header">
        <div className="health-icon primary">
          <span style={{ fontSize: 24 }}>☁️</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ flex: '0 0 auto' }}>
          <div style={{ marginBottom: 8 }}>
            <span className="health-metric">98.7%</span>
          </div>
          <div className="health-label" style={{ marginBottom: 6 }}>Backup Coverage</div>
          <div style={{ fontSize: 11, color: '#8A8886', marginBottom: 16 }}>
            12,105 users &bull; 89.4 TB protected
          </div>
        </div>

        <div style={{ flex: '0 0 200px', background: 'rgba(0, 120, 212, 0.05)', padding: 10, borderRadius: 6, border: '1px solid rgba(0, 120, 212, 0.15)' }}>
          <div style={{ fontSize: 9, color: '#8A8886', fontWeight: 600, marginBottom: 8, letterSpacing: 0.5 }}>BACKUP METRICS</div>
          {[
            { label: 'Total protected', value: '89.4 TB', color: '#FFFFFF' },
            { label: 'Growth (30d)', value: '+4.2 TB', color: '#107C10' },
            { label: 'Backup points', value: '84,735', color: '#FFFFFF' },
            { label: 'Avg recovery', value: '< 15 min', color: '#00BCF2' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, marginBottom: 8 }}>
              <span style={{ color: '#D1D1D1' }}>{item.label}</span>
              <span style={{ color: item.color, fontWeight: 700 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
        <div style={{ flex: 1, background: 'rgba(0, 120, 212, 0.05)', padding: 12, borderRadius: 6, border: '1px solid rgba(0, 120, 212, 0.15)' }}>
          <div style={{ fontSize: 10, color: '#8A8886', fontWeight: 600, marginBottom: 10, letterSpacing: 0.5 }}>COVERAGE BY REGION</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { region: 'US', pct: '99.2%' }, { region: 'UK', pct: '98.8%' },
              { region: 'CA', pct: '97.5%' }, { region: 'AU', pct: '99.1%' },
              { region: 'EU', pct: '98.3%' },
            ].map(r => (
              <div key={r.region} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
                <span style={{ color: '#D1D1D1' }}>{r.region}</span>
                <span style={{ color: '#00BCF2', fontWeight: 600 }}>{r.pct}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '0 0 160px', background: 'rgba(255, 185, 0, 0.1)', padding: 12, borderRadius: 6, borderLeft: '3px solid #FFB900', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <AlertCircle size={14} color="#FFB900" />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#FFB900' }}>158 users unprotected</span>
          </div>
          <div style={{ fontSize: 10, color: '#D1D1D1', lineHeight: 1.4 }}>
            1.3% of total users (12,263) lack protection
          </div>
        </div>
      </div>

      <a className="action-link">View Backup Dashboard →</a>
    </div>
  );
}

export function UnifiedAlertsCard() {
  return (
    <div className="widget col-3 health-card">
      <div className="health-card-header">
        <div className="health-icon error">
          <span style={{ fontSize: 24 }}>🔔</span>
        </div>
      </div>
      <div>
        <span className="health-metric" style={{ color: '#D13438' }}>7</span>
      </div>
      <div className="health-label">Unified Alerts</div>
      <div className="health-details">
        <div className="health-detail-item">
          <span className="status-dot red" />
          <span>Critical: 2</span>
        </div>
        <div className="health-detail-item">
          <span className="status-dot amber" />
          <span>Warning: 5</span>
        </div>
      </div>

      <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #3F3F3F' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Monitor size={16} color="#D13438" />
            <span style={{ fontSize: 12, color: '#D1D1D1', fontWeight: 600 }}>Active Incidents</span>
          </div>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#D13438' }}>3</span>
        </div>
        <div style={{ fontSize: 11, color: '#8A8886', marginBottom: 8 }}>
          Correlated attack scenarios from Defender
        </div>
        <div style={{ paddingLeft: 10, borderLeft: '2px solid rgba(209, 52, 56, 0.3)', marginTop: 8 }}>
          {[
            { label: 'High severity', value: '1', color: '#D13438' },
            { label: 'Medium severity', value: '2', color: '#FFB900' },
            { label: 'Individual alerts', value: '4', color: '#D1D1D1' },
          ].map(item => (
            <div key={item.label} style={{ fontSize: 10, color: '#8A8886', marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
              <span>{item.label}</span>
              <span style={{ color: item.color, fontWeight: 600 }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      <a className="action-link" style={{ marginTop: 16 }}>View Unified Alerts Dashboard →</a>
    </div>
  );
}

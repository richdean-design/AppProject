import { Filter } from 'lucide-react';
import type { AlertItem } from '../../types';

interface Props {
  alerts: AlertItem[];
}

export function AlertsFeed({ alerts }: Props) {
  return (
    <div className="widget col-8">
      <div className="widget-header">
        <h3 className="widget-title">Unified Alerts</h3>
        <span style={{ cursor: 'pointer' }}>
          <Filter size={16} color="#605E5C" />
        </span>
      </div>
      <div className="alerts-feed">
        {alerts.map(alert => (
          <div key={alert.id} className="alert-item">
            <div className={`alert-severity ${alert.severity}`} />
            <div className="alert-content">
              <div className="alert-title">{alert.title}</div>
              <div className="alert-meta">
                <span>{alert.tenant}</span>
                <span>&bull;</span>
                <span>{alert.timestamp}</span>
              </div>
              <span className={`alert-badge-tag ${alert.status === 'new' ? 'new' : 'in-progress'}`}>
                {alert.status === 'new' ? 'New' : 'In Progress'}
              </span>
            </div>
            <button className="btn btn-secondary" style={{ height: 32, padding: '0 16px', fontSize: 12 }}>
              Review
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

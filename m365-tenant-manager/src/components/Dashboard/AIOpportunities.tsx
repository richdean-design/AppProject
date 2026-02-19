import { Layers, AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import type { OpportunityItem } from '../../types';

interface Props {
  opportunities: OpportunityItem[];
}

export function AIOpportunities({ opportunities }: Props) {
  return (
    <div className="widget col-6">
      <div className="widget-header">
        <h3 className="widget-title">
          <Layers size={20} color="#00BCF2" />
          AI-Driven Opportunities
        </h3>
        <span style={{ fontSize: 11, color: '#00BCF2', fontWeight: 600, padding: '4px 8px', background: 'rgba(0, 188, 242, 0.15)', borderRadius: 4 }}>
          {opportunities.length} RECOMMENDATIONS
        </span>
      </div>
      <div className="opportunity-list">
        {opportunities.map(opp => (
          <div key={opp.id} className={`opportunity-card ${opp.priority === 'high' ? 'high-priority' : ''}`}>
            <div className="opportunity-header">
              <div className={`opportunity-priority ${opp.priority === 'medium' ? 'medium' : ''}`}>
                {opp.priority === 'high' ? 'HIGH IMPACT' : 'MEDIUM IMPACT'}
              </div>
              <div className="opportunity-tenant">{opp.tenant}</div>
            </div>
            <div className="opportunity-title">{opp.title}</div>
            <div className="opportunity-insight">
              {opp.priority === 'high'
                ? <AlertCircle size={16} color="#FFB900" />
                : opp.insight.includes('Only')
                  ? <AlertTriangle size={16} color="#D13438" />
                  : <AlertCircle size={16} color="#FFB900" />
              }
              <span>{opp.insight}</span>
            </div>
            <div className="opportunity-metrics">
              {opp.metrics.map(m => (
                <div key={m.label} className="opportunity-metric">
                  <div className="metric-label">{m.label}</div>
                  <div className="metric-value">{m.value}</div>
                </div>
              ))}
            </div>
            <div className="opportunity-solution">
              <CheckCircle size={14} color="#107C10" />
              <span>{opp.solution}</span>
            </div>
            <button className="opportunity-action-btn">Create Project</button>
          </div>
        ))}
      </div>
    </div>
  );
}

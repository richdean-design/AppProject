import { PlusCircle, RefreshCw, FileText, Users, ShieldCheck } from 'lucide-react';

export function QuickActions() {
  return (
    <div className="widget col-4 quick-actions">
      <div className="widget-header" style={{ border: 'none', paddingBottom: 0 }}>
        <h3 className="widget-title">Quick Actions</h3>
      </div>
      <button className="quick-action-btn primary">
        <PlusCircle size={16} />
        Add New Tenant
      </button>
      <button className="quick-action-btn">
        <RefreshCw size={16} />
        Run Security Assessment
      </button>
      <button className="quick-action-btn">
        <FileText size={16} />
        Generate Report
      </button>
      <button className="quick-action-btn">
        <Users size={16} />
        Bulk User Management
      </button>
      <button className="quick-action-btn">
        <ShieldCheck size={16} />
        Regrant Consent
      </button>
    </div>
  );
}

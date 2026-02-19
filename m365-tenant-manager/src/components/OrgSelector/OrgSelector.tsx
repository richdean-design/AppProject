import { useState, useMemo } from 'react';
import { Search, Check } from 'lucide-react';
import type { Organization } from '../../types';

interface Props {
  organizations: Organization[];
  onApply: (selected: Organization[]) => void;
  onClose: () => void;
}

export function OrgSelector({ organizations, onApply, onClose }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selected, setSelected] = useState<Set<string>>(
    new Set(organizations.filter(o => o.selected).map(o => o.id))
  );

  const filteredOrgs = useMemo(() => {
    if (!searchQuery.trim()) return organizations;
    const q = searchQuery.toLowerCase();
    return organizations.filter(
      o => o.name.toLowerCase().includes(q) || o.domain.toLowerCase().includes(q)
    );
  }, [organizations, searchQuery]);

  const toggleOrg = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelected(new Set(organizations.map(o => o.id)));
  };

  const clearAll = () => {
    setSelected(new Set());
  };

  const handleApply = () => {
    const selectedOrgs = organizations.map(o => ({
      ...o,
      selected: selected.has(o.id),
    }));
    onApply(selectedOrgs);
  };

  return (
    <div className="org-selector-overlay" onClick={e => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="org-selector-modal">
        <div className="org-selector-header">
          <div className="org-selector-title">Select Organizations</div>
          <div className="org-selector-subtitle">Choose one or more organizations to view combined data</div>
        </div>

        <div style={{ padding: '16px 24px', borderBottom: '1px solid #3F3F3F' }}>
          <div style={{ position: 'relative' }}>
            <input
              className="org-search-input"
              placeholder="Search organizations..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Search
              size={18}
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#8A8886' }}
            />
          </div>
        </div>

        <div style={{ padding: '8px 16px', display: 'flex', gap: 8, borderBottom: '1px solid #3F3F3F', background: 'rgba(0, 0, 0, 0.2)' }}>
          <button className="org-option-btn" onClick={selectAll}>Select All</button>
          <button className="org-option-btn" onClick={clearAll}>Clear All</button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {filteredOrgs.map(org => (
            <div
              key={org.id}
              className={`org-list-item ${selected.has(org.id) ? 'selected' : ''}`}
              onClick={() => toggleOrg(org.id)}
            >
              <div className="org-checkbox">
                {selected.has(org.id) && <Check size={14} color="white" />}
              </div>
              <div className="org-info">
                <div className="org-name">{org.name}</div>
                <div className="org-details">{org.domain}</div>
              </div>
              <div className="org-tenant-count">{org.tenantCount} tenants</div>
            </div>
          ))}
        </div>

        <div className="org-selector-footer">
          <div style={{ fontSize: 13, color: '#D1D1D1' }}>
            <strong style={{ color: '#00BCF2', fontWeight: 600 }}>{selected.size}</strong> organization{selected.size !== 1 ? 's' : ''} selected
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="org-btn-cancel" onClick={onClose}>Cancel</button>
            <button className="org-btn-apply" onClick={handleApply}>Apply Selection</button>
          </div>
        </div>
      </div>
    </div>
  );
}

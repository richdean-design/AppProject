import { useState, useCallback } from 'react';
import { Layout } from './components/Layout/Layout';
import { DashboardPage } from './components/Dashboard/DashboardPage';
import { CopilotPanel } from './components/CopilotPanel/CopilotPanel';
import { OrgSelector } from './components/OrgSelector/OrgSelector';
import { Layers } from 'lucide-react';
import { getDemoOrganizations } from './services/graphService';
import type { Organization } from './types';

export default function App() {
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [orgSelectorOpen, setOrgSelectorOpen] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>(getDemoOrganizations());

  const selectedOrgs = organizations.filter(o => o.selected);
  const selectedOrgDisplay = selectedOrgs.length === 1
    ? `${selectedOrgs[0].name} (${selectedOrgs[0].tenantCount} tenants)`
    : `${selectedOrgs.length} organizations selected`;

  const handleOrgApply = useCallback((updated: Organization[]) => {
    setOrganizations(updated);
    setOrgSelectorOpen(false);
  }, []);

  return (
    <>
      <Layout
        onOpenOrgSelector={() => setOrgSelectorOpen(true)}
        selectedOrg={selectedOrgDisplay}
        orgCount={selectedOrgs.length}
      >
        <DashboardPage />
      </Layout>

      {/* Copilot FAB */}
      <button
        className="copilot-fab"
        onClick={() => setCopilotOpen(true)}
        title="Open Copilot Assistant"
      >
        <Layers size={32} />
      </button>

      {/* Copilot Panel */}
      <CopilotPanel isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />

      {/* Org Selector Modal */}
      {orgSelectorOpen && (
        <OrgSelector
          organizations={organizations}
          onApply={handleOrgApply}
          onClose={() => setOrgSelectorOpen(false)}
        />
      )}
    </>
  );
}

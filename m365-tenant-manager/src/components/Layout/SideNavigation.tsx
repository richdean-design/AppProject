import { useState } from 'react';
import {
  LayoutDashboard, Shield, Bell, Layers, ChevronDown,
  Users, MonitorSmartphone, FolderKey, Globe, ShieldCheck,
  FileText, Zap, Settings, ExternalLink, UserCog, Mail,
  Smartphone, KeyRound, Cloud, BarChart3, Activity,
  Lock, Eye, AlertTriangle, Workflow, Building2,
} from 'lucide-react';

interface Props {
  onOpenOrgSelector: () => void;
  selectedOrg: string;
  orgCount: number;
}

interface NavSectionState {
  [key: string]: boolean;
}

export function SideNavigation({ onOpenOrgSelector, selectedOrg, orgCount }: Props) {
  const [expandedSections, setExpandedSections] = useState<NavSectionState>({
    monitor: true,
    manage: false,
    secure: false,
    response: false,
    report: false,
    automate: false,
    admin: false,
  });

  const [expandedSubmenus, setExpandedSubmenus] = useState<NavSectionState>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleSubmenu = (menu: string) => {
    setExpandedSubmenus(prev => ({ ...prev, [menu]: !prev[menu] }));
  };

  return (
    <nav className="side-navigation">
      {/* Copilot */}
      <button className="nav-item nav-copilot">
        <Layers size={20} className="nav-icon" color="#00BCF2" />
        <span className="nav-label">Copilot</span>
        <span className="nav-badge copilot-badge">AI</span>
      </button>

      <div className="nav-divider" />

      {/* Dashboard */}
      <button className="nav-item active">
        <LayoutDashboard size={20} className="nav-icon" />
        <span className="nav-label">Dashboard</span>
      </button>

      {/* Alerts */}
      <button className="nav-item">
        <Bell size={20} className="nav-icon" />
        <span className="nav-label">Unified Alerts</span>
        <span className="nav-badge alert-nav-badge">7</span>
      </button>

      <div className="nav-divider" />

      {/* Tenant Slicer */}
      <div className="tenant-slicer" onClick={onOpenOrgSelector}>
        <div className="tenant-slicer-label">CURRENT SELECTION</div>
        <div className="tenant-slicer-value">{selectedOrg}</div>
        <div className="tenant-slicer-count">{orgCount} of 12 organizations</div>
        <div className="tenant-slicer-icon">
          <ChevronDown size={16} />
        </div>
      </div>

      <div className="nav-divider" />

      {/* MONITOR */}
      <button className="nav-category-header" onClick={() => toggleSection('monitor')}>
        <span className="nav-category-label">MONITOR</span>
        <ChevronDown size={14} className={`nav-chevron ${expandedSections.monitor ? 'expanded' : ''}`} />
      </button>
      <div className={`nav-category-content ${expandedSections.monitor ? 'expanded' : ''}`}>
        <button className="nav-item">
          <Shield size={20} className="nav-icon" />
          <span className="nav-label">Security Posture</span>
        </button>
        <button className="nav-item">
          <ShieldCheck size={20} className="nav-icon" />
          <span className="nav-label">Compliance</span>
        </button>
        <button className="nav-item">
          <Cloud size={20} className="nav-icon" />
          <span className="nav-label">Backup Status</span>
        </button>
        <button className="nav-item">
          <Activity size={20} className="nav-icon" />
          <span className="nav-label">Service Health</span>
        </button>
        <button className="nav-item">
          <BarChart3 size={20} className="nav-icon" />
          <span className="nav-label">License Usage</span>
        </button>
      </div>

      <div className="nav-divider" />

      {/* MANAGE */}
      <button className="nav-category-header" onClick={() => toggleSection('manage')}>
        <span className="nav-category-label">MANAGE</span>
        <ChevronDown size={14} className={`nav-chevron ${expandedSections.manage ? 'expanded' : ''}`} />
      </button>
      <div className={`nav-category-content ${expandedSections.manage ? 'expanded' : ''}`}>
        <button className="nav-item" onClick={() => toggleSubmenu('users')}>
          <Users size={20} className="nav-icon" />
          <span className="nav-label">Users</span>
          <ChevronDown size={14} className={`nav-chevron ${expandedSubmenus.users ? 'expanded' : ''}`} />
        </button>
        <div className={`nav-submenu ${expandedSubmenus.users ? 'expanded' : ''}`}>
          <button className="nav-subitem"><UserCog size={16} /><span className="nav-label">Active Users</span></button>
          <button className="nav-subitem"><Users size={16} /><span className="nav-label">Guest Users</span></button>
          <button className="nav-subitem"><ExternalLink size={16} /><span className="nav-label">Entra ID Portal</span></button>
        </div>

        <button className="nav-item" onClick={() => toggleSubmenu('devices')}>
          <MonitorSmartphone size={20} className="nav-icon" />
          <span className="nav-label">Devices</span>
          <ChevronDown size={14} className={`nav-chevron ${expandedSubmenus.devices ? 'expanded' : ''}`} />
        </button>
        <div className={`nav-submenu ${expandedSubmenus.devices ? 'expanded' : ''}`}>
          <button className="nav-subitem"><Smartphone size={16} /><span className="nav-label">All Devices</span></button>
          <button className="nav-subitem"><ExternalLink size={16} /><span className="nav-label">Intune Portal</span></button>
        </div>

        <button className="nav-item" onClick={() => toggleSubmenu('roles')}>
          <FolderKey size={20} className="nav-icon" />
          <span className="nav-label">Roles & Permissions</span>
          <ChevronDown size={14} className={`nav-chevron ${expandedSubmenus.roles ? 'expanded' : ''}`} />
        </button>
        <div className={`nav-submenu ${expandedSubmenus.roles ? 'expanded' : ''}`}>
          <button className="nav-subitem"><KeyRound size={16} /><span className="nav-label">Directory Roles</span></button>
          <button className="nav-subitem"><Shield size={16} /><span className="nav-label">PIM</span></button>
        </div>

        <button className="nav-item">
          <Globe size={20} className="nav-icon" />
          <span className="nav-label">Domains</span>
        </button>
      </div>

      <div className="nav-divider" />

      {/* SECURE */}
      <button className="nav-category-header" onClick={() => toggleSection('secure')}>
        <span className="nav-category-label">SECURE</span>
        <ChevronDown size={14} className={`nav-chevron ${expandedSections.secure ? 'expanded' : ''}`} />
      </button>
      <div className={`nav-category-content ${expandedSections.secure ? 'expanded' : ''}`}>
        <button className="nav-item"><Lock size={20} className="nav-icon" /><span className="nav-label">Conditional Access</span></button>
        <button className="nav-item"><Eye size={20} className="nav-icon" /><span className="nav-label">Identity Protection</span></button>
        <button className="nav-item"><Shield size={20} className="nav-icon" /><span className="nav-label">Secure Score</span></button>
      </div>

      <div className="nav-divider" />

      {/* RESPONSE */}
      <button className="nav-category-header" onClick={() => toggleSection('response')}>
        <span className="nav-category-label">RESPONSE</span>
        <ChevronDown size={14} className={`nav-chevron ${expandedSections.response ? 'expanded' : ''}`} />
      </button>
      <div className={`nav-category-content ${expandedSections.response ? 'expanded' : ''}`}>
        <button className="nav-item"><AlertTriangle size={20} className="nav-icon" /><span className="nav-label">Incidents</span></button>
        <button className="nav-item"><Bell size={20} className="nav-icon" /><span className="nav-label">Alerts</span></button>
      </div>

      <div className="nav-divider" />

      {/* REPORT */}
      <button className="nav-category-header" onClick={() => toggleSection('report')}>
        <span className="nav-category-label">REPORT</span>
        <ChevronDown size={14} className={`nav-chevron ${expandedSections.report ? 'expanded' : ''}`} />
      </button>
      <div className={`nav-category-content ${expandedSections.report ? 'expanded' : ''}`}>
        <button className="nav-item"><FileText size={20} className="nav-icon" /><span className="nav-label">Usage Reports</span></button>
        <button className="nav-item"><BarChart3 size={20} className="nav-icon" /><span className="nav-label">Security Reports</span></button>
      </div>

      <div className="nav-divider" />

      {/* AUTOMATE */}
      <button className="nav-category-header" onClick={() => toggleSection('automate')}>
        <span className="nav-category-label">AUTOMATE</span>
        <ChevronDown size={14} className={`nav-chevron ${expandedSections.automate ? 'expanded' : ''}`} />
      </button>
      <div className={`nav-category-content ${expandedSections.automate ? 'expanded' : ''}`}>
        <button className="nav-item"><Workflow size={20} className="nav-icon" /><span className="nav-label">Workflows</span></button>
        <button className="nav-item"><Zap size={20} className="nav-icon" /><span className="nav-label">Automation Rules</span></button>
      </div>

      <div className="nav-divider" />

      {/* ADMIN */}
      <button className="nav-category-header" onClick={() => toggleSection('admin')}>
        <span className="nav-category-label">ADMIN</span>
        <ChevronDown size={14} className={`nav-chevron ${expandedSections.admin ? 'expanded' : ''}`} />
      </button>
      <div className={`nav-category-content ${expandedSections.admin ? 'expanded' : ''}`}>
        <button className="nav-item"><Settings size={20} className="nav-icon" /><span className="nav-label">Settings</span></button>
        <button className="nav-item"><Building2 size={20} className="nav-icon" /><span className="nav-label">Tenant Management</span></button>
        <button className="nav-item" onClick={() => toggleSubmenu('portals')}>
          <ExternalLink size={20} className="nav-icon" />
          <span className="nav-label">Admin Portals</span>
          <ChevronDown size={14} className={`nav-chevron ${expandedSubmenus.portals ? 'expanded' : ''}`} />
        </button>
        <div className={`nav-submenu ${expandedSubmenus.portals ? 'expanded' : ''}`}>
          <button className="nav-subitem"><Mail size={16} /><span className="nav-label">Exchange Admin</span><ExternalLink size={12} /></button>
          <button className="nav-subitem"><Users size={16} /><span className="nav-label">Teams Admin</span><ExternalLink size={12} /></button>
          <button className="nav-subitem"><Shield size={16} /><span className="nav-label">Security Portal</span><ExternalLink size={12} /></button>
          <button className="nav-subitem"><ShieldCheck size={16} /><span className="nav-label">Compliance Portal</span><ExternalLink size={12} /></button>
          <button className="nav-subitem"><MonitorSmartphone size={16} /><span className="nav-label">Intune Portal</span><ExternalLink size={12} /></button>
        </div>
      </div>

      <div className="nav-divider" style={{ margin: '8px 8px 12px' }} />
    </nav>
  );
}

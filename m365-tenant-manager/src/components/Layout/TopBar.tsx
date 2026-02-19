import { Search, Bell, Settings, HelpCircle } from 'lucide-react';

export function TopBar() {
  return (
    <header className="top-bar">
      <div className="logo-section">
        <div className="logo-icon">M</div>
        <div className="logo-text">M365 Tenant Manager</div>
      </div>
      <div className="search-section">
        <div className="global-search">
          <Search size={16} color="#8A8886" />
          <input placeholder="Search tenants, users, policies..." />
          <span className="search-shortcut">Ctrl+K</span>
        </div>
      </div>
      <div className="user-controls">
        <button className="icon-button" title="Help">
          <HelpCircle size={20} color="#D1D1D1" />
        </button>
        <button className="icon-button" title="Settings">
          <Settings size={20} color="#D1D1D1" />
        </button>
        <button className="icon-button" title="Notifications">
          <Bell size={20} color="#D1D1D1" />
          <span className="notification-badge" />
        </button>
        <div className="user-avatar" title="Admin User">AU</div>
      </div>
    </header>
  );
}

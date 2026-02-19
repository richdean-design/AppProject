import { ReactNode } from 'react';
import { TopBar } from './TopBar';
import { SideNavigation } from './SideNavigation';

interface Props {
  children: ReactNode;
  onOpenOrgSelector: () => void;
  selectedOrg: string;
  orgCount: number;
}

export function Layout({ children, onOpenOrgSelector, selectedOrg, orgCount }: Props) {
  return (
    <>
      <TopBar />
      <div className="main-wrapper">
        <SideNavigation
          onOpenOrgSelector={onOpenOrgSelector}
          selectedOrg={selectedOrg}
          orgCount={orgCount}
        />
        <main className="content-area">
          {children}
        </main>
      </div>
    </>
  );
}

import { ReactNode } from 'react';
import Navigation from './Navigation';
import NotificationPanel from './NotificationPanel';
import CommunityChat from './CommunityChat';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#0A1A2F] text-white">
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
      <div className="fixed bottom-4 right-4 space-y-4">
        <NotificationPanel />
        <CommunityChat />
      </div>
    </div>
  );
};

export default Layout;
import React from 'react';
import Sidebar from './Sidebar';
import Follow_Sidebar from './Follow_Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#080A0B] text-white">
      <Sidebar />
      <main className="flex-1 p-5 overflow-y-auto">
        {children}
      </main>
      <Follow_Sidebar />
    </div>
  );
};

export default Layout;
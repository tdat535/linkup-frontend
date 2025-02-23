import React from 'react';
import Sidebar from './Sidebar';
import Follow_Sidebar from './Follow_Sidebar';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-[#080A0B] text-white">
    <Sidebar />
    <main className="md:ml-64 md:mr-64">
      {children}
    </main>
    <Follow_Sidebar />
  </div>
);

export default Layout;
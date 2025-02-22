import React from 'react';
import { Outlet } from "react-router-dom";
import Sidebar from './Sidebar';
import Follow_Sidebar from './Follow_Sidebar';
<<<<<<< HEAD

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080A0B] text-white flex">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Nội dung chính */}
      <main className="flex-1 md:ml-64 md:mr-64 ">
        <Outlet /> {/* Đây là nơi các trang sẽ hiển thị */}
      </main>

      {/* Sidebar bên phải */}
      <Follow_Sidebar />
    </div>
  );
};
=======


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen bg-[#080A0B] text-white">
    <Sidebar />
    <main className="md:ml-64 md:mr-64 p-4">
      {children}
    </main>
    <Follow_Sidebar />
  </div>
);
>>>>>>> c1fdd3a558b86d4208cbdb6d9d21167914ae4bbf

export default Layout;

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Follow_Sidebar from "./Follow_Sidebar";

const Layout: React.FC = () => {
  const location = useLocation();
  const hideFollowSidebar = location.pathname === "/messages";

  return (
    <div className="min-h-screen bg-[#080A0B] text-white flex">
      {/* Sidebar bên trái */}
      <Sidebar />

      {/* Nội dung chính */}
      <main className={`flex-1 md:ml-64 ${hideFollowSidebar ? "md:mr-0" : "md:mr-64"}`}>
        <Outlet /> {/* Đây là nơi các trang sẽ hiển thị */}
      </main>

      {/* Sidebar bên phải (ẩn khi ở trang /messages) */}
      {!hideFollowSidebar && <Follow_Sidebar />}
    </div>
  );
};

export default Layout;

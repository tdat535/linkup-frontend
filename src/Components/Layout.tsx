import Follow_Sidebar from "./Follow_Sidebar";
import Sidebar from "./Sidebar";
import React from "react";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen  text-white bg-[#080A0B]">
            <Sidebar />
            <main className="lg:ml-64 lg:mr-64 w-full">
                {children}
            </main>
            <Follow_Sidebar />
        </div>
    );
}

export default Layout;
import React from 'react';
import Sidebar from './Sidebar';
import Follow_Sidebar from './Follow_Sidebar';
import Post from './Post';
import NewPost from './New_Post';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#080A0B] text-white">
      <Sidebar />
      <Follow_Sidebar />
      <main className="md:ml-64 md:mr-64 p-4">
        <NewPost />
        <Post />
        <Post />
        <Post />
      </main>
    </div>
  );
};

export default Layout;
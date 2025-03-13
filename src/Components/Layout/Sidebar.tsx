import { useEffect, useState } from "react";
// Removed unnecessary import
import { Link } from "react-router-dom";
import {  Home, Search, MessageSquare, Bell, User, MoreHorizontal, Plus } from "lucide-react";
import { motion } from "framer-motion";
import Post_Button from "../Buttons/Post_Button";
import Post_Modal from "../UI/Post_Modal";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);
  

  const currentUserId = localStorage.getItem("currentUserId") || "default-id";
  console.log("Retrieved from localStorage:", currentUserId);
  const userId = currentUserId;

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    const resetTimer = () => {
      if (window.innerWidth < 768) {
        setIsBottomNavVisible(true);
        clearTimeout(timer);
        timer = setTimeout(() => setIsBottomNavVisible(false), 3000);
      }
    };
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("touchstart", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("resize", resetTimer);
    resetTimer();
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("resize", resetTimer);
    };
  }, []);

  // Don't create profile URL if no real user ID exists
  const profileUrl = currentUserId && currentUserId !== "default-id" 
  ? `/home/profile?userId=${userId}&currentUserId=${currentUserId}`
  : "/login";

  

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-64 bg-[#080A0B] border-r border-gray-600 text-white text-xl p-4 z-50 hidden md:block">
        <h1 className="text-3xl font-bold mb-6">𝓛𝓲𝓷𝓴𝓤𝓹</h1>
        <nav className="space-y-7">
          <Link to="/home" className="flex items-center gap-4 text-white"><Home /> Trang chủ</Link>
          <Link to="/home/search" className="flex items-center gap-4 text-white"><Search /> Khám phá</Link>
          <Link to="/home/messages" className="flex items-center gap-4 text-white"><MessageSquare /> Tin nhắn</Link>
          <Link to="/home/notifications" className="flex items-center gap-4 text-white"><Bell /> Thông báo</Link>
          <Link to={profileUrl} className="flex items-center gap-4 text-white"><User /> Trang cá nhân</Link>
          <Link to="#" className="flex items-center gap-4 text-white"><MoreHorizontal /> Thêm</Link>
          <Post_Button text="Đăng" onClick={() => setIsOpen(true)} variant="primary" size="lg" fullWidth />
        </nav>
      </div>
      
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isBottomNavVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 w-full bg-[#080A0B] border-t border-gray-600 md:hidden flex items-center justify-around z-50"
      >
        <Link to="/home" className="p-3 text-white"><Home /></Link>
        <Link to="/home/search" className="p-3 text-white"><Search /></Link>
        <Link to="/home/messages" className="p-3 text-white"><MessageSquare /></Link>
        <Link to="/home/notifications" className="p-3 text-white"><Bell /></Link>
        <Link to="/home/profile" className="p-3 text-white"><User /></Link>
        <button onClick={() => setIsOpen(true)} className="bg-blue-500 p-2 text-white rounded-full shadow-lg">
          <Plus size={24} />
        </button>
      </motion.div>
      {isOpen && <Post_Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default Sidebar;

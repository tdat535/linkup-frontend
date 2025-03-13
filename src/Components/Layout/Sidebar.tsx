import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Home, Search, MessageSquare, Bell, User, MoreHorizontal, Plus, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import Post_Button from "../Buttons/Post_Button";
import Post_Modal from "../UI/Post_Modal";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBottomNavVisible] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentUserId = localStorage.getItem("currentUserId") || "default-id";
  const userId = currentUserId;
  const profileUrl = currentUserId !== "default-id" ? `/home/profile?userId=${userId}&currentUserId=${currentUserId}` : "/login";

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-64 bg-[#1C1C1D] border-r border-gray-600 text-white text-xl p-4 z-50 hidden md:flex flex-col">
        <h1 className="text-3xl font-bold mb-12">𝓛𝓲𝓷𝓴𝓤𝓹</h1>

        <nav className="flex-1 space-y-7 transition-all duration-300">
          <Link to="/home" className="flex items-center gap-4 text-white"><Home /> Trang chủ</Link>
          <Link to="/home/search" className="flex items-center gap-4 text-white"><Search /> Khám phá</Link>
          <Link to="/home/messages" className="flex items-center gap-4 text-white"><MessageSquare /> Tin nhắn</Link>
          <Link to="/home/notifications" className="flex items-center gap-4 text-white"><Bell /> Thông báo</Link>
          <Link to={profileUrl} className="flex items-center gap-4 text-white"><User /> Trang cá nhân</Link>

          <div className="relative">
            <button
              className="flex items-center gap-4 text-white hover:text-neutral-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <MoreHorizontal /> Thêm
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-48 bg-neutral-800 dark:bg-neutral-700 rounded-lg z-50">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                      className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-neutral-700"
                    >
                      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                      <span className="ml-2">{theme === "light" ? "Chế độ tối" : "Chế độ sáng"}</span>
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className={`transition-all duration-300 ${isDropdownOpen ? "mt-16" : "mt-4"}`}>
            <Post_Button text="Đăng" onClick={() => setIsOpen(true)} variant="primary" size="lg" fullWidth />
          </div>
        </nav>
      </div>

      {/* Mobile bottom navigation */}
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

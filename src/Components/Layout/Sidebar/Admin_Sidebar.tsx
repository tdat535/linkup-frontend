import { useState } from "react";
import { Link } from "react-router-dom";
import { ChartBarBig, Users, Home, Sun, Moon, BookCopy } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext"; // Import useTheme

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme(); // Get theme and toggleTheme from context
  const currentUserId = localStorage.getItem("currentUserId") || "default-id";
  const profileUrl = currentUserId !== "default-id" ? `/home/profile?userId=${currentUserId}` : "/login";
  
  return (
    <div className={`h-full w-full flex flex-col transition-all border-r duration-300 ${theme === "dark" ? "bg-[#1C1C1D] text-white border-gray-700" : "bg-[#f0f2f5] text-black"}`}>
      <h1 className="text-4xl font-bold mb-6 p-4">𝓛𝓲𝓷𝓴𝓤𝓹</h1>

      <nav className="flex-1 space-y-7 p-4">
        <Link to="/admin" className="flex items-center gap-4"><ChartBarBig />Dashboard</Link>
        <Link to="/admin/users-list" className="flex items-center gap-4"><Users />Người dùng</Link>
        <Link to="/admin/posts-list" className="flex items-center gap-4"><BookCopy />Bài đăng</Link>
        <Link to="/home" className="flex items-center gap-4"><Home/>Về trang user</Link>
        <div className="relative">
          <button onClick={toggleTheme} className="flex items-center gap-4">
            {theme === "light" ? <Sun /> : <Moon />}
            {theme === "light" ? "Chế độ sáng" : "Chế độ tối"}
          </button>
          {isDropdownOpen && (
            <div className={`absolute left-0 top-full mt-2 w-48 rounded-lg z-50 ${theme === "dark" ? "bg-neutral-800 text-white" : "bg-neutral-200 text-black"}`}>
              <ul className="py-2">
                <li>
                  <button onClick={toggleTheme} className={`flex items-center w-full px-4 py-2 text-sm  ${theme === "dark" ? "text-white hover:bg-neutral-700" : "text-black hover:bg-neutral-300"}`}>
                    {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
                    <span className="ml-2">{theme === "light" ? "Chế độ sáng" : "Chế độ tối"}</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
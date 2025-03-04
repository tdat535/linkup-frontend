import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import Post_Button from "../Buttons/Post_Button";
import Post_Modal from "../UI/Post_Modal";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Điều khiển modal
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true); // Điều khiển ẩn thanh menu dưới

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetTimer = () => {
      if (window.innerWidth < 768) {
        setIsBottomNavVisible(true); // Hiện lại nếu có thao tác
        clearTimeout(timer);
        timer = setTimeout(() => setIsBottomNavVisible(false), 10000); // Ẩn sau 3 giây
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

  return (
    <>
      {/* Sidebar chính - LUÔN HIỂN THỊ TRÊN DESKTOP */}
      <div className="fixed top-0 left-0 h-screen w-64 bg-[#080A0B] border-r border-gray-600 text-white p-4 z-50 hidden md:block">
        <h1 className="text-3xl font-bold mb-6">𝓛𝓲𝓷𝓴𝓤𝓹</h1>
        <nav className="space-y-4">
          <SidebarLink to="/home" label="Trang chủ" icon="home" />
          <SidebarLink to="/home/search" label="Khám phá" icon="search" />
          <SidebarLink to="/home/messages" label="Tin nhắn" icon="message" />
          <SidebarLink to="/home/notifications" label="Thông báo" icon="bell" />
          <SidebarLink to="/home/profile" label="Trang cá nhân" icon="user" />
          <SidebarLink to="/home/about" label="About Us" icon="info" />
          <SidebarLink to="/home/more" label="Thêm" icon="more" />
          <Post_Button text="Đăng" onClick={() => setIsOpen(true)} variant="primary" size="lg" fullWidth />
        </nav>
      </div>

      {/* Sidebar Mobile (Ẩn mặc định, bấm Menu để mở) */}
      <motion.div
        initial={{ x: -260 }}
        animate={{ x: isMobileMenuOpen ? 0 : -260 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="fixed top-0 left-0 h-screen w-64 bg-[#080A0B] border-r border-gray-600 text-white p-4 z-50 md:hidden"
      >
        <h1 className="text-3xl font-bold mb-6">𝓛𝓲𝓷𝓴𝓤𝓹</h1>
        <nav className="space-y-4">
          <SidebarLink to="/home" label="Trang chủ" icon="home" />
          <SidebarLink to="/home/search" label="Khám phá" icon="search" />
          <SidebarLink to="/home/messages" label="Tin nhắn" icon="message" />
          <SidebarLink to="/home/notifications" label="Thông báo" icon="bell" />
          <SidebarLink to="/home/profile" label="Trang cá nhân" icon="user" />
          <SidebarLink to="/home/about" label="About Us" icon="info" />
          <SidebarLink to="/home/more" label="Thêm" icon="more" />
          <Post_Button text="Đăng" onClick={() => setIsOpen(true)} variant="primary" size="lg" fullWidth />
        </nav>
      </motion.div>

      {/* Nút mở Sidebar trên Mobile */}
      <div className="fixed top-4 left-4 md:hidden">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2 bg-gray-800 rounded-lg">
          <Menu size={24} />
        </button>
      </div>

      {/* Thanh điều hướng Mobile (Tự động ẩn sau 3 giây) */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isBottomNavVisible ? 0 : 100 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 w-full  bg-[#080A0B] border-t border-gray-600 md:hidden md:block flex justify-around  ">
        <SidebarLink to="/home" icon="home" />
        <SidebarLink to="/home/search" icon="search" />
        <SidebarLink to="/home/messages" icon="message" />
        <SidebarLink to="/home/notifications" icon="bell" />
        <SidebarLink to="/home/profile" icon="user" />

      </motion.div>

      {/* Hiển thị modal đăng bài */}
      {isOpen && <Post_Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

// Component tái sử dụng cho các Link Sidebar
const SidebarLink = ({ to, label, icon }: { to: string; label?: string; icon: string }) => {
  const icons: { [key: string]: string } = {
    home: "M11.293 3.293a1 1 0 011.414 0l6 6 2 2a1 1 0 01-1.414 1.414L19 12.414V19a2 2 0 01-2 2h-3a1 1 0 01-1-1v-3h-2v3a1 1 0 01-1 1H7a2 2 0 01-2-2v-6.586l-.293.293a1 1 0 01-1.414-1.414l2-2 6-6Z",
    search: "M10 2a8 8 0 100 16 8 8 0 000-16Z M21.707 21.707a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.414l3.5 3.5a1 1 0 010 1.414Z",
    message: "M4 3a1 1 0 00-1 1v8a1 1 0 001 1h1v2a1 1 0 001.707.707L9.414 13H15a1 1 0 001-1V4a1 1 0 00-1-1H4Z",
    bell: "M17.133 12.632v-1.8a5.406 5.406 0 00-4.154-5.262.955.955 0 00.021-.106V3.1a1 1 0 00-2 0v2.364a.955.955 0 00.021.106 5.406 5.406 0 00-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175Z",
    user: "M12 4a4 4 0 100 8 4 4 0 000-8Zm-2 9a4 4 0 00-4 4v1a2 2 0 002 2h8a2 2 0 002-2v-1a4 4 0 00-4-4h-4Z",
  };

  return (
    <Link to={to} className="flex items-center justify-center md:justify-start py-2 px-4 rounded hover:bg-gray-600">
      <svg className="w-6 h-6 text-gray-300" aria-hidden="true" fill="white" viewBox="0 0 24 24">
        <path fillRule="evenodd" d={icons[icon]} clipRule="evenodd" />
      </svg>
      {label && <p className="ml-2 hidden md:block">{label}</p>}
    </Link>
  );
};

export default Sidebar;

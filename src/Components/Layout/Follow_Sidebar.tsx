import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Buttons/Button';

const Follow_Sidebar = () => {
    const [user, setUser] = useState<{ username: string, email: string, phonenumber: string } | null>(null); // Thông tin người dùng
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [avatar, setAvatar] = useState("https://via.placeholder.com/80");
    const navigate = useNavigate();
    const [followings] = useState([
        // Dữ liệu mẫu, bạn có thể thay bằng dữ liệu thực tế
        { id: 1, name: 'Stark', avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
        { id: 2, name: 'Tony', avatar: 'https://thumbs.dreamstime.com/b/happy-smiling-young-handsome-asian-man-face-white-background-195696321.jpg' },
        { id: 3, name: 'Skibidi', avatar: 'https://steamuserimages-a.akamaihd.net/ugc/2071135896060325080/825F188A141EEF65352B31D8CDBFAF860F5A1E7C/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false' }
    ]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleResize = () => setIsMobile(mediaQuery.matches);

        const storedUser = localStorage.getItem('user');  // Lấy thông tin người dùng từ localStorage
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setAvatar(JSON.parse(storedUser).avatar);
        }

        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);

    }, []);

    if (isMobile) return null;

    const handleLogout = () => {
        localStorage.removeItem('accessToken');  // Xóa Access Token
        localStorage.removeItem('refreshToken'); // Xóa Refresh Token
        navigate('/login');  // Chuyển về trang đăng nhập
        window.location.reload(); // Làm mới trang để cập nhật state
    };
    

    return (
        <aside className="fixed top-0 right-0 h-full w-64 bg-[#080A0B] p-4 text-white border-l border-gray-600 transition-transform duration-300 ease-in-out transform">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <img
                        src={avatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <span className="font-semibold">
                        {user?.username || 'Khách'}
                    </span>
                </div>
                <button onClick={handleLogout} className="text-blue-500 text-sm hover:text-blue-700">Đăng xuất</button>
            </div>
            <h4 className="text-[#676869] mb-3 font-medium">Đã theo dõi</h4>
            <ul>
                {followings.map(user => (
                    <li key={user.id} className="flex items-center gap-3 mb-3 hover:bg-gray-700 p-2 rounded-lg cursor-pointer transition duration-200">
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="rounded-full w-9 h-9"
                        />
                        <span className="text-md">{user.name}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Follow_Sidebar;

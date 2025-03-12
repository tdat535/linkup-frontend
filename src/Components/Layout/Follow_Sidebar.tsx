import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronDown, FiLogOut } from 'react-icons/fi';

const Follow_Sidebar = () => {
    const [user, setUser] = useState<{ username: string, email: string, phonenumber: string } | null>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const [followings] = useState([
        { id: 1, name: 'Stark', avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
        { id: 2, name: 'Tony', avatar: 'https://thumbs.dreamstime.com/b/happy-smiling-young-handsome-asian-man-face-white-background-195696321.jpg' },
        { id: 3, name: 'Skibidi', avatar: 'https://steamuserimages-a.akamaihd.net/ugc/2071135896060325080/825F188A141EEF65352B31D8CDBFAF860F5A1E7C/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false' }
    ]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const handleResize = () => setIsMobile(mediaQuery.matches);

        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        navigate('/login');
        window.location.reload();
    };

    if (isMobile) {
        return (
            <header className="fixed top-0 left-0 w-full bg-[#080A0B]/90 text-white flex items-center p-4 shadow-md z-50 backdrop-blur-lg border-b border-gray-700/50">
                <h1 className="text-lg font-semibold flex-1">𝓛𝓲𝓷𝓴𝓤𝓹</h1>
                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex items-center space-x-2"
                    >
                        <img
                            src="https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif"
                            alt="Avatar"
                            className="w-10 h-10 rounded-full border-2 border-gray-600"
                        />
                        <FiChevronDown className="text-white" />
                    </button>
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg text-sm p-2">
                            <p className="px-4 py-2">{user?.username || 'Khách'}</p>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded"
                            >
                                <FiLogOut className="mr-2" /> Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            </header>
        );
    }
    return (
        <aside className="fixed top-0 right-0 h-full w-64 bg-[#080A0B] p-4 text-white border-l border-gray-600">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                    <img src="https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif" alt="Avatar" className="w-10 h-10 rounded-full mr-3 object-cover" />
                    <span className="font-semibold">{user?.username || 'Khách'}</span>
                </div>
                <button onClick={handleLogout} className="text-blue-500 text-sm hover:text-blue-700">Đăng xuất</button>
            </div>
            <h4 className="text-[#676869] mb-3 font-medium">Đã theo dõi</h4>
            <ul>
                {followings.map(user => (
                    <li key={user.id} className="flex items-center gap-3 mb-3 hover:bg-gray-700 p-2 rounded-lg cursor-pointer transition duration-200">
                        <img src={user.avatar} alt={user.name} className="rounded-full w-9 h-9" />
                        <span className="text-md">{user.name}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Follow_Sidebar;
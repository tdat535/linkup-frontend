import 'flowbite';
import { useNavigate } from 'react-router-dom';
import background from '../assets/pictures/images.jpg';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const url = 'https://api-linkup.id.vn/api/auth/login';
    const [token, setToken] = useState<string | null>(localStorage.getItem('accessToken'));

    useEffect(() => {
        // If token exists, redirect to home
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }

        const handleStorageChange = () => {
            setToken(localStorage.getItem('accessToken'));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Changed to use email instead of username to match API requirements
            const body = { email, password };
            console.log("📤 Sending request to:", url);

            const response = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("📥 API Response:", response.data);

            // Check if API returns data
            if (!response.data || !response.data.data) {
                throw new Error("Invalid API response!");
            }

            // Get data from API - updated to match actual API response structure
            const { AccessToken, RefreshToken, Username, Email, Phonenumber, UserType, UserId, Avatar } = response.data.data;

            // Check received data
            if (AccessToken && RefreshToken) {
                // Save tokens to localStorage
                localStorage.setItem('accessToken', AccessToken);
                localStorage.setItem('refreshToken', RefreshToken);

                // Save user info - updated to match actual response structure
                const userData = { 
                    username: Username, 
                    email: Email, 
                    phonenumber: Phonenumber,
                    userType: UserType,
                    userId: UserId,
                    avatar: Avatar
                };
                localStorage.setItem('user', JSON.stringify(userData));

                console.log("✅ Login successful, redirecting...");
                navigate('/home');
                // Keep this reload as it was in your original code
                window.location.reload();
            } else {
                throw new Error("Incomplete data returned!");
            }
        } catch (err: any) {
            console.error("❌ Login error:", err.response?.data || err.message);
            setError("Login failed. Please check your credentials.");
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
            <div className="flex flex-col md:flex-row w-full bg-opacity-50">
                <div className='div-left flex flex-col justify-center items-center md:w-1/2 w-full md:min-h-screen h-auto p-6'>
                    <div className='text-5xl w-full ps-16 break-words text-white'>𝓛𝓲𝓷𝓴𝓤𝓹</div>
                    <div className="mt-4 w-full text-xl ps-16 break-words text-white hidden md:block">Kết nối với bạn bè và chia sẻ những khoảnh khắc vui vẻ cùng nhau thông qua LinkUp</div>
                </div>
                <div className='div-right flex justify-center items-center p-6 md:w-1/2 w-full md:min-h-screen h-auto'>
                    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 border rounded-2xl border-stone-800 bg-black w-full bg-opacity-75" style={{ maxWidth: "32rem", height: "24rem" }}>
                        <div className="mb-3">
                            {/* Changed to use email input and label */}
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="email@example.com" 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder='•••••••••' 
                                required 
                            />
                        </div>
                        
                        <div className='w-full flex justify-between'>
                            <div className="flex items-start mb-5">
                                <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nhớ tài khoản</label>
                            </div>
                            <a href="/register" className="text-blue-700 hover:underline text-sm">Quên mật khẩu?</a>
                        </div>

                        <button type="submit" className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng nhập</button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        
                        <div className="flex items-center justify-center">
                            <span className="h-px w-16 bg-gray-400 dark:bg-gray-600"></span>
                            <span className="text-gray-400 dark:text-gray-600 mx-2.5">Hoặc</span>
                            <span className="h-px w-16 bg-gray-400 dark:bg-gray-600"></span>
                        </div>

                        <div className="flex items-center justify-center mt-6">
                            <button 
                                className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                                onClick={() => navigate('/register')}
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Đăng ký tài khoản
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;   
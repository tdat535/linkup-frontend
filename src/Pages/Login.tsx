import 'flowbite';
import { useNavigate } from 'react-router-dom';
import background from '../assets/pictures/images.jpg'; // Import the image
import axios from 'axios';
import { useEffect, useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const url = 'https://api-linkup.id.vn/api/auth/login';
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    useEffect(() => {
        const handleStorageChange = () => {
          setToken(localStorage.getItem('token')); // Cập nhật token khi thay đổi
        };
    
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const body = { username, password };
            console.log("📤 Gửi yêu cầu đến:", url);
            
            const response = await axios.post(url, body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const accessToken = response.data.data.AccessToken;
            const refreshToken = response.data.data.RefreshToken;

            if (accessToken && refreshToken) {
                // ✅ Lưu token vào localStorage
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                console.log("✅ Đăng nhập thành công, chuyển hướng...");
                navigate('/home'); // Chuyển hướng sau khi đăng nhập thành công
                window.location.reload(); // Reload lại trang để App.tsx nhận diện token
            } else {
                throw new Error("Token không hợp lệ!");
            }
        } catch (err: any) {
            console.error("❌ Lỗi đăng nhập:", err.response?.data || err.message);
            setError("Đăng nhập thất bại!");
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
                    <form onSubmit={handleLogin} className="max-w-sm mx-auto p-6 border rounded-2xl border-stone-800 w-full bg-black bg-opacity-75" style={{ maxWidth: "32rem", height: "24rem" }}>
                        <div className="mb-3">
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên đăng nhập</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tên đăng nhập" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='•••••••••' required />
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
                                onClick={() => navigate('/signup')}
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
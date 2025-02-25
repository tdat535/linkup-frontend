import 'flowbite';
import { useNavigate } from 'react-router-dom';
import background from './images.jpg'; // Import the image

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
            <div className="flex flex-col md:flex-row w-full bg-opacity-50 bg-black">
                <div className='div-left flex flex-col justify-center items-center md:w-1/2 w-full md:min-h-screen h-auto p-6'>
                    <div className='text-5xl w-full ps-16 break-words text-white'>𝓛𝓲𝓷𝓴𝓤𝓹</div>
                    <div className="mt-4 w-full text-xl ps-16 break-words text-white hidden md:block">Kết nối với bạn bè và chia sẻ những khoảnh khắc vui vẻ cùng nhau thông qua LinkUp</div>
                </div>
                <div className='div-right flex justify-center items-center p-6 md:w-1/2 w-full md:min-h-screen h-auto'>
                    <form className="max-w-sm mx-auto p-6 border rounded-2xl border-stone-800 w-full bg-black bg-opacity-75" style={{ maxWidth: "32rem", height: "24rem" }}>
                        <div className="mb-3">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
                            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='•••••••••' required />
                        </div>
                        
                        
                        <div className='w-full flex justify-between'>
                            <div className="flex items-start mb-5">
                                <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nhớ tài khoản</label>
                            </div>
                            <a href="/register" className="text-blue-700 hover:underline text-sm">Quên mật khẩu?</a>
                        </div>

                        <button type="submit" className="mb-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Đăng nhập</button>

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
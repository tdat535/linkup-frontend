import { useState } from 'react'
import './App.css'

function login () {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="flex flex-col md:flex-row justify-around  items-center ">
        {/* Left Section */}
        <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-4xl font-bold text-white-500">LinkUp</h1>
          <p className="mt-2 text-lg">
            Kết nối với bạn bè và chia sẻ những khoảnh khắc vui vẻ cùng nhau thông qua LinkUp
          </p>
        </div>

        {/* Right Section - Form */}
        <div className="md:w-1/2 bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
          {isRegister ? (
            <>
              <h2 className="text-xl font-semibold text-center mb-4">Đăng ký</h2>
              <input type="text" placeholder="Họ và tên" className="w-full p-2 mb-3 bg-gray-700 rounded" />
              <input type="text" placeholder="Số điện thoại" className="w-full p-2 mb-3 bg-gray-700 rounded" />
              <input type="email" placeholder="Email" className="w-full p-2 mb-3 bg-gray-700 rounded" />
              <input type="password" placeholder="Mật khẩu" className="w-full p-2 mb-3 bg-gray-700 rounded" />
              <input type="password" placeholder="Nhập lại mật khẩu" className="w-full p-2 mb-3 bg-gray-700 rounded" />
              <button className="w-full bg-blue-500 p-2 rounded text-white font-bold  hover:bg-blue-700 transition cursor-pointer">Đăng ký</button>
              <p className="mt-3 text-sm text-center">
                Đã có tài khoản? <span className="text-blue-400 cursor-pointer" onClick={() => setIsRegister(false)}>Đăng nhập</span>
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-center mb-4">Đăng nhập</h2>
              <input type="email" placeholder="Email" className="w-full p-2 mb-3 bg-gray-700 rounded" />
              <input type="password" placeholder="Mật khẩu" className="w-full p-2 mb-3 bg-gray-700 rounded" />
              <button className="w-full bg-blue-500 p-2 rounded text-white font-bold  hover:bg-blue-700 transition cursor-pointer">Đăng nhập</button>
              <p className="text-sm text-center mt-2 text-blue-400 cursor-pointer">Quên mật khẩu?</p>
              <button className="w-full bg-green-500 p-2 mt-3 rounded text-white font-bold hover:bg-green-700 transition cursor-pointer" onClick={() => setIsRegister(true)}>Tạo tài khoản mới</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
  
};
export default login

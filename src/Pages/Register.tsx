import 'flowbite';
import { useNavigate } from 'react-router-dom';
import background from '../assets/pictures/images.jpg';
import { useState } from 'react';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',  
        email: '',
        phonenumber: '', 
        password: '',
        confirmPassword: '',
    });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
    
        if (!formData.username || !formData.email || !formData.phonenumber || !formData.password) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }
    
        if (formData.password !== formData.confirmPassword) {
            setError('Mật khẩu nhập lại không khớp.');
            return;
        }
    
        setLoading(true);
    
        try {
            console.log("Dữ liệu gửi lên API:", JSON.stringify({
                username: formData.username,
                email: formData.email,
                phone: formData.phonenumber,
                password: formData.password,
            }));
    
            const response = await fetch('https://api-linkup.id.vn/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    phonenumber: formData.phonenumber,  
                }),
            });
            
    
            const result = await response.json();
            console.log("Phản hồi API:", result);
    
            if (response.ok) {
                alert('Đăng ký thành công! Chuyển đến trang đăng nhập.');
                navigate('/login');
            } else {
                setError(result.message || 'Đăng ký thất bại.');
            }
        } catch (error) {
            console.error("Lỗi fetch API:", error);
            setError('Lỗi kết nối. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };
    
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${background})` }}>
            <div className="flex-col md:flex-row w-full bg-opacity-50 p-5">
                <div className='text-5xl text-center break-words text-white'>𝓛𝓲𝓷𝓴𝓤𝓹</div>
                <div className="flex justify-center items-center w-full mt-10">
                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 border rounded-2xl border-stone-800 w-full bg-black bg-opacity-75 shadow-[3px_3px_0px_rgba(100,100,100,0.3)]" style={{ maxWidth: '32rem', height: '40rem' }}>
                        {<p className='text-red-500 text-sm mb-3'>{error || "ㅤ"}</p>}
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-white">Tên tài khoản</label>
                            <input type="text" name="username" className="bg-black border border-white text-white placeholder-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:focus:bg-[rgb(232,240,254)] focus:border-black focus:text-black" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-white">Số điện thoại</label>
                            <input type="text" name="phonenumber" className="bg-black border border-white text-white placeholder-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:focus:bg-[rgb(232,240,254)] focus:border-black focus:text-black" value={formData.phonenumber} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-white">Email</label>
                            <input type="email" name="email" className="bg-black border border-white text-white placeholder-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:focus:bg-[rgb(232,240,254)] focus:border-black focus:text-black" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-white">Mật khẩu</label>
                            <input type="password" name="password" className="bg-black border border-white text-white placeholder-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:bg-[rgb(232,240,254)] focus:border-black focus:text-black" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-white">Nhập lại mật khẩu</label>
                            <input type="password" name="confirmPassword" className="bg-black border border-white text-white placeholder-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:focus:bg-[rgb(232,240,254)] focus:border-black focus:text-black" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
                        
                        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" disabled={loading} onKeyDown={(e) => e.key === "Enter" && Register}>
                            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                        </button>

                        <div className="flex items-center justify-center mt-10">
                            <button onClick={() => navigate('/login')} className="btn-back text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                Quay lại trang đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;

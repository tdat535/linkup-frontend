import 'flowbite';
import { useNavigate } from 'react-router-dom';
import background from '../assets/pictures/images.jpg';
import { useState } from 'react';
import Button from '../Components/Buttons/Button';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        realname: '',  
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
    
        if (!formData.username || !formData.realname || !formData.email || !formData.phonenumber || !formData.password) {
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
                realname: formData.realname,
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
                    realname: formData.realname,  
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
            <div className="flex flex-col md:flex-row w-full bg-opacity-50">
                <div className="div-left flex flex-col justify-center items-center md:w-1/2 w-full md:min-h-screen h-auto p-6">
                    <div className="text-5xl w-full ps-16 break-words text-white">𝓛𝓲𝓷𝓴𝓤𝓹</div>
                    <div className="mt-4 w-full text-xl ps-16 break-words text-white hidden md:block">
                        Kết nối với bạn bè và chia sẻ những khoảnh khắc vui vẻ cùng nhau thông qua LinkUp
                    </div>
                </div>
                <div className="div-right flex justify-center items-center p-6 md:w-1/2 w-full md:min-h-screen h-auto">
                    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 border rounded-2xl border-stone-800 w-full bg-black bg-opacity-75" style={{ maxWidth: '32rem', height: '40rem' }}>
                        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-white">Tên tài khoản</label>
                            <input type="text" name="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.username} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-white">Họ và tên</label>
                            <input type="text" name="realname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.realname} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-white">Số điện thoại</label>
                            <input type="text" name="phonenumber" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.phonenumber} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-white">Email</label>
                            <input type="email" name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-white">Mật khẩu</label>
                            <input type="password" name="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.password} onChange={handleChange} required />
                        </div>
                        <div className="mb-3">
                            <label className="block mb-2 text-sm font-medium text-white">Nhập lại mật khẩu</label>
                            <input type="password" name="confirmPassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={formData.confirmPassword} onChange={handleChange} required />
                        </div>
                        
                        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" disabled={loading}>
                            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                        </button>

                        <div className="flex items-center justify-center">
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

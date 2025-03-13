import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import TextareaAutosize from "react-textarea-autosize";
import Post_Button from "../Buttons/Post_Button";
import axios from "axios";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Post_Modal: React.FC<PostModalProps> = ({ isOpen, onClose }) => {
  const [user, setUser] = useState<{ username: string, email: string, phonenumber: string, realname: string } | null>(null); // Thông tin người dùng

  useEffect(() => {
      const storedUser = localStorage.getItem('user');  // Lấy thông tin người dùng từ localStorage
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
  }, []);
  const [content, setContent] =useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const url = 'https://api-linkup.id.vn/api/media/createPost';
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setContent(newValue.length > 250 ? newValue.slice(0, 250) : newValue);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file);  // Kiểm tra file đã được chọn
      setImage(file);  // Lưu file vào state
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);  // Cập nhật preview
        //console.log("Image preview:", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // chỗ này nãy ko lấy dc file nên là thêm vào fỏmdata ko  dc

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleConfirm = async () => {
    const userId = localStorage.getItem("currentUserId");
    console.log("user id:", userId);
    const token = localStorage.getItem("accessToken");
    console.log("token: ", token);
  
    if (!userId) {
      setError("Không tìm thấy ID người dùng.");
      setIsLoading(false);
      return;
    }
    if (!content.trim()) {
      setError("Không tìm thấy nội dung bài viết");
      return;
    }
  
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("content", content);
  
      // Kiểm tra xem có file ảnh và thêm vào FormData
      if (image) {
        formData.append("image", image); // Đảm bảo file thực tế được thêm vào formData
        console.log("hinh anh dc them vao:",image );
      }
  
      // Kiểm tra dữ liệu trong FormData
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value); // In dữ liệu trong FormData
      }
  
      // Gửi yêu cầu API với FormData
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token vào headers
        },
      });
  
      console.log(response.data);
  
      if (response.status === 200) {
        // alert("Đăng bài thành công!");
        setContent(""); // Xóa nội dung sau khi đăng
        setImage(null); // Reset ảnh
        setImagePreview(null); // Xóa ảnh preview
        setError(""); // Reset lỗi
        onClose();
      }
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      setError("Có lỗi xảy ra, vui lòng thử lại.");
    }
    setIsLoading(false);
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tạo bài viết mới"
      content={
        <div>
          <div className="flex items-center">
            <img
              src="https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif"
              alt="Avatar"
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
              <span className="font-semibold">{user?.username}</span>
          </div>
          <div className="mt-2">
            <TextareaAutosize
              minRows={1}
              className="bg-[#181A1B] text-white rounded-lg p-2 w-full outline-none"
              placeholder="Bạn đang nghĩ gì?"
              value={content}
              onChange={handleChange}
            />
          </div>

          <div className="mt-3 flex items-center">
            <label className="block text-gray-400 mb-2">Đính kèm ảnh?</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ms-auto"
            >
              Chọn ảnh
            </label>
          </div>

          {imagePreview && (
            <div className="mt-3 relative rounded border border-[#626466] p-2">
              <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-cover rounded-lg shadow-md" />
              <button
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-red-600 text-white p-2 py-1 text-sm rounded-full hover:bg-red-700"
              >
                X
              </button>
            </div>
          )}
        </div>
      }
      footer={
        <div className="flex justify-end space-x-2">
          <Post_Button text="Đăng bài" 
          onClick={handleConfirm}
           variant="primary" fullWidth />
        </div>
      }
    />
  );
};

export default Post_Modal;

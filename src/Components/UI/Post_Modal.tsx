import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import TextareaAutosize from "react-textarea-autosize";
import Post_Button from "../Buttons/Post_Button";

interface PostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Post_Modal: React.FC<PostModalProps> = ({ isOpen, onClose }) => {
  const [value, setValue] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [user, setUser] = useState<{ username: string, email: string, phonenumber: string, realname: string } | null>(null); // Thông tin người dùng

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleConfirm = () => {
    alert("Đã xác nhận!");
    setTimeout(() => {
      onClose(); // Đóng modal sau khi hiển thị alert
    }, 100);
  };

  useEffect(() => {
      const storedUser = localStorage.getItem('user');  // Lấy thông tin người dùng từ localStorage
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
  }, []);

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
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
          <Post_Button text="Đăng bài" onClick={handleConfirm} variant="primary" fullWidth />
        </div>
      }
    />
  );
};

export default Post_Modal;

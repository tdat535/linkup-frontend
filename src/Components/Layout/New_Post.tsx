import React, { useState } from 'react';
import TextareaAutosize from "react-textarea-autosize";
import Post_Button from '../Buttons/Post_Button';
import Modal from '../UI/Modal';

const NewPost = () => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State của modal
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    alert("Đã xác nhận!");// Alert trước
    setTimeout(() => {
      setIsOpen(false);
        // Đóng sau khi hiển thị alert
    }, 100); // Chờ 100ms để tránh lỗi UI
  };

  return (
    <div className="bg-[#080A0B] text-white shadow-md p-4 mb-4 border-b border-gray-400">
      <div className="flex items-center mb-4"> 
        <img 
          src="https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif" 
          alt="Avatar" 
          className="w-10 h-10 rounded-full mr-2 object-cover" 
        />
        <TextareaAutosize
          minRows={1}
          className="bg-[#181A1B] text-white rounded-lg p-2 w-full outline-none"
          placeholder="Bạn đang nghĩ gì?"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-4 ml-10">

          <label htmlFor="dropzone-file" className=" cursor-pointer">
            <svg className="w-6 h-6 text-blue-500 hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
            </svg>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>

          <label htmlFor="dropzone-file" className="cursor-pointer ">
            <svg className="w-6 h-6 text-blue-500 hover:text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 11-6-2V9l6-2v10Z" />
            </svg>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>

          <button className="text-gray-400 hover:text-white">📍</button>
        </div>

        <Post_Button text="Đăng" onClick={() => setIsOpen(true)} variant='secondary' size="sm" />

        <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Tạo bài viết mới"
        content={
          <div>
            <div className='flex items-center'>
              <img
                  src="https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <span className="font-semibold">Steve Harvey</span>
            </div>
            <div className='mt-2'>
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

            {/* Hiển thị ảnh preview nếu có */}
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
      </div>

    </div>
  );
};
export default NewPost;
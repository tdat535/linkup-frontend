import React, { useEffect, useState } from 'react';
import TextareaAutosize from "react-textarea-autosize";
import Post_Button from '../Buttons/Post_Button';
import Post_Modal from '../UI/Post_Modal'; // Import modal

const NewPost = () => {
  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State để điều khiển modal
  const [user, setUser] = useState<{ username: string, email: string, phonenumber: string, realname: string } | null>(null); // Thông tin người dùng

  useEffect(() => {
    const storedUser = localStorage.getItem('user');  // Lấy thông tin người dùng từ localStorage
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    <>
      <div className="bg-[#080A0B] text-white p-5 shadow-md border-b border-gray-600 ">
        <div className="flex items-center">
          <img
            src="https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif"
            alt="Avatar"
            className="w-10 h-10 rounded-full mr-2 object-cover"
          />
          <TextareaAutosize
            minRows={1}
            className="bg-[#181A1B] text-white rounded-lg p-2 w-full outline-none cursor-pointer  "
            placeholder={user ? `${user.username} ơi, bạn đang nghĩ gì thế?` : "Bạn đang nghĩ gì?"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onClick={() => setIsOpen(true)}
          />
          <svg className="w-10 h-10 ml-2 md:w-10 object-cover text-blue-500 hover:text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" onClick={() => setIsOpen(true)}>
            <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
          </svg>
          <input id="dropzone-file" className="hidden" />
        </div>
      </div>

      {/* Hiển thị Modal khi isOpen = true */}
      {isOpen && <Post_Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default NewPost;

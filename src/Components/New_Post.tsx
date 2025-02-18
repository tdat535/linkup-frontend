import React from 'react';

const NewPost = () => {
  return (
    <div className="bg-[#080A0B] text-white shadow-md p-4 border-b border-gray-400">
      <div className="flex items-center mb-4">
        <img src="https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif" alt="Avatar" className="w-10 h-10 rounded-full mr-2 object-cover" />
        <input type="text" placeholder="Bạn đang nghĩ gì?" className="bg-[#181A1B] text-white rounded-lg p-2 w-full outline-none" />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-4">
          <button className="text-gray-400 hover:text-white">📷</button>
          <button className="text-gray-400 hover:text-white">🎥</button>
          <button className="text-gray-400 hover:text-white">📍</button>
        </div>
        <button className="bg-white text-black rounded-lg px-4 py-2">Đăng</button>
      </div>
    </div>
  );
};

export default NewPost;
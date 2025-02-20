import React, { useState } from 'react';

const NewPost = () => {
  const [postContent, setPostContent] = useState("");

  const handlePost = () => {
    if (postContent.trim() === "") return;
    console.log("Post nội dung:", postContent);
    setPostContent(""); // Xóa nội dung sau khi đăng
  };

  return (
    <div className="bg-[#080A0B] text-white shadow-md p-4 border-b border-gray-400">
      <div className="flex items-center mb-4">
        <img
          src="https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif"
          alt="Avatar"
          className="w-10 h-10 rounded-full mr-2 object-cover"
        />
        <input
          type="text"
          placeholder="Bạn đang nghĩ gì?"
          className="bg-[#222425] text-white rounded-lg p-2 w-full outline-none placeholder-gray-400"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-4">
          {["📷", "🎥", "📍"].map((icon, index) => (
            <button key={index} className="text-gray-400 hover:text-white transition duration-200">
              {icon}
            </button>
          ))}
        </div>
        <button
          onClick={handlePost}
          className="bg-white text-black rounded-lg px-4 py-2 hover:bg-gray-300 transition duration-200"
        >
          Đăng
        </button>
      </div>
    </div>
  );
};

export default NewPost;

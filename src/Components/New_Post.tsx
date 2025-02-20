import React, { useState } from 'react';

const NewPost = () => {
  const newLocal = "dropzone-file";
  return (
    <div className="bg-[#080A0B] text-white rounded-2xl shadow-md p-4 mb-4 border border-white">
      <div className="flex items-center mb-4">
        <img src="https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif" alt="Avatar" className="w-10 h-10 rounded-full mr-2 object-cover" />
        <input type="text" placeholder="Bạn đang nghĩ gì?" className="bg-[#181A1B] text-white rounded-lg p-2 w-full outline-none" />
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="flex space-x-4">

          <label htmlFor="dropzone-file" className="hover:text-white cursor-pointer">
            <svg className="w-6 h-6 text-blue-500 hover:text-blue-700 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" />
            </svg>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>

          <label htmlFor="dropzone-file" className="hover:text-white cursor-pointer">
            <svg className="w-6 h-6 text-blue-500 hover:text-blue-700 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 6H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1Zm7 11-6-2V9l6-2v10Z" />
            </svg>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>

          <button className="text-gray-400 hover:text-white">📍</button>
        </div>
        <button className="bg-white text-black rounded-lg px-4 py-2">Đăng</button>
      </div>
    </div>
  );
};
export default NewPost
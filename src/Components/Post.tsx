import React from 'react';

const Post = () => {
  return (
    <div className="max-w-2xl w-full mx-auto bg-white shadow-lg rounded-lg mb-6">
      {/* Input Post */}
      <div className="p-4 border-b">
        <textarea
          className="w-full h-24 p-4 border rounded-lg resize-none"
          placeholder="Bạn muốn chia sẻ điều gì?"
        />
        <div className="flex justify-between items-center mt-2">
          {/* Chỗ để thêm các icon */}
          <div className="space-x-4">
            {/* Thêm các icon bạn muốn tại đây */}
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <svg className="w-6 h-6 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                {/* Icon ở đây */}
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <svg className="w-6 h-6 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                {/* Icon ở đây */}
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <svg className="w-6 h-6 text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                {/* Icon ở đây */}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        {/* Header: Name, Avatar, Time Posted */}
        <div className="flex items-center mb-4">
          <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Avatar" className="w-10 h-10 rounded-full" />
          <div className="ml-3">
            <p className="font-semibold">Người Dùng</p>
            <p className="text-sm text-gray-500">1 giờ trước</p>
          </div>
        </div>

        {/* Post Image */}
        <div className="mb-4">
          <img src="https://via.placeholder.com/600x400" alt="Post" className="w-full rounded-lg" />
        </div>

        {/* Footer: Like, Comment, Share */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2">
              {/* Thêm icon tim bài viết tại đây */}
              <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                {/* Icon ở đây */}
              </svg>
              <span className="text-sm">Thích</span>
            </button>
            <button className="flex items-center space-x-2">
              {/* Thêm icon bình luận tại đây */}
              <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                {/* Icon ở đây */}
              </svg>
              <span className="text-sm">Bình luận</span>
            </button>
            <button className="flex items-center space-x-2">
              {/* Thêm icon chia sẻ tại đây */}
              <svg className="w-6 h-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                {/* Icon ở đây */}
              </svg>
              <span className="text-sm">Chia sẻ</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

import React, { useEffect, useState } from "react";
import { PostProps } from "./PostProps";
import { HandThumbUpIcon, ChatBubbleOvalLeftIcon, ShareIcon } from "@heroicons/react/24/solid";
import { useTheme } from '../../../context/ThemeContext';
import axios from "axios";
import CommentModal from "../Modal/CommentModal";
const PostItem: React.FC<{ post: PostProps }> = ({ post }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<{ user: string; text: string; time: string; likes: number }[]>([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);
  const handleLike = async (postId) => {
    console.log("postid",post.id);
  
    const token = localStorage.getItem("accessToken");
    // const userId_data = localStorage.getItem("currentUserId");
    const response = await fetch('https://api-linkup.id.vn/api/like/createLike', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` 
      },
      body: JSON.stringify({postId})
  });
    console.log("response",response);
  }


  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([{ user: "You", text: comment, time: "Just now", likes: 0 }, ...comments]);
      setComment("");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.name,
        text: post.caption,
        url: window.location.href,
      });
    } else {
      alert("Trình duyệt không hỗ trợ chia sẻ!");
    }
  };

  return (
    <>
      {/* Bài đăng */}
      <div className={`text-white mt-5 max-w-4xl mx-auto rounded-xl p-4 ${theme === 'dark' ? 'bg-[#252728]' : 'bg-white'}`}>
        <div className="  flex items-center mb-4">
          <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2 object-cover" />
          <div>
            <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{post.name}</span>
            <span className="text-gray-500 text-sm ml-2">{post.time}</span>
          </div>
        </div>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{post.caption}</p>
        {post.image && <img src={post.image} alt="Post" className="w-full h-auto rounded-xl object-contain mb-4" />}

        <div className="flex gap-5 text-gray-400">
          <button onClick={() => handleLike(post.id)} className="flex items-center gap-1 hover:text-red-500">
            <HandThumbUpIcon className="w-5 h-5" /> <span>{likes}</span>
          </button>

          <button onClick={() => setIsOpen(true)} className="hover:text-gray-300 flex items-center gap-1">
            <ChatBubbleOvalLeftIcon className="w-5 h-5" /> <span>{comments.length}</span>
          </button>

          <button onClick={handleShare} className="hover:text-blue-500 flex items-center gap-1">
            <ShareIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sử dụng Modal */}
      <CommentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        post={post}
        comments={comments}
        comment={comment}
        setComment={setComment}
        handleCommentSubmit={handleCommentSubmit}
      />
    </>
  );
};

export default PostItem;

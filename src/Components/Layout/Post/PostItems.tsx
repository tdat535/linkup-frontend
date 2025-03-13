import React, { useEffect, useState } from "react";
import { PostProps } from "./PostProps";
import { HandThumbUpIcon, ChatBubbleOvalLeftIcon, ShareIcon } from "@heroicons/react/24/solid";
import CommentModal from "../../UI/CommentModal";

const PostItem: React.FC<{ post: PostProps }> = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<{ user: string; text: string; time: string; likes: number }[]>([]);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);


  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

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
      <div className="bg-[#252728] text-white mt-5 max-w-4xl mx-auto rounded-xl p-4 ">
        <div className="  flex items-center mb-4">
          <img src={post.avatar} alt="Avatar" className="w-10 h-10 rounded-full mr-2 object-cover" />
          <div>
            <span className="font-bold">{post.name}</span>
            <span className="text-gray-500 text-sm ml-2">{post.time}</span>
          </div>
        </div>
        <p className="text-gray-300 mb-4">{post.caption}</p>
        {post.image && <img src={post.image} alt="Post" className="w-full h-auto rounded-xl object-contain mb-4" />}

        <div className="flex gap-5 text-gray-400">
          <button onClick={handleLike} className="flex items-center gap-1 hover:text-red-500">
            <HandThumbUpIcon className="w-5 h-5" /> <span>{likes}</span>
          </button>

          <button onClick={() => setIsOpen(true)} className="hover:text-white flex items-center gap-1">
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

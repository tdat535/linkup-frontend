import React, { useState, useEffect } from "react";
import axios from "axios";
import { PostProps } from "./PostProps";
import PostItem from "./PostItems";
const PostList: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const userId = localStorage.getItem("currentUserId");

        if (!token || !userId) {
          console.error("Token hoặc UserID không tồn tại trong localStorage");
          return;
        }

        const response = await axios.get("https://api-linkup.id.vn/api/media/getPost", {
          headers: { Authorization: `Bearer ${token}` },
          params: { userId },
        });

        console.log("Dữ liệu bài viết từ API:", response.data);

        // Kiểm tra nếu API trả về object thay vì array
        const postData = Array.isArray(response.data) ? response.data : response.data.data;
        if (Array.isArray(postData)) {
          const formattedPosts: PostProps[] = postData.map((post: any) => ({
            id: post.id || Math.random().toString(), // Nếu id không tồn tại, tạo ID tạm thời
            avatar: post.User.avatar || "https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif",
            name: post.User.username || "Người dùng",
            time: post.createdAt ? new String(post.createdAt).split(".")[0].split("T")[1] + " " + new String(post.createdAt).split(".")[0].split("T")[0].split("-").reverse().join("-") : "Vừa xong",
            caption: post.content || "Không có nội dung",
            image: post.image || null,
          }));
          setPosts(formattedPosts);
          console.log("State posts sau khi cập nhật:", formattedPosts);
        } else {
          console.error("Dữ liệu API không phải là mảng hợp lệ:", response.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy bài viết:", error);
      }
    };

    fetchPosts();
  }, []);

  // Debug: Kiểm tra state posts sau khi cập nhật
  useEffect(() => {
    console.log("State posts thay đổi:", posts);
  }, [posts]);

  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">Không có bài viết nào.</p>
      ) : (
        posts.map((post) => <PostItem key={post.id} post={post} />)
      )}
    </div>
  );
};

export default PostList;
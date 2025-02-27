import React, { useState } from "react";
import { PostProps } from "./PostProps";
import PostItem from "./PostItems";

const initialPosts: PostProps[] = [
  {
    id: 1,
    avatar: "https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif",
    name: "Shrek Harvey",
    time: "2 giờ trước",
    caption: "Caption của bài post sẽ hiển thị ở đây...",
    image: "https://cdn.pixabay.com/photo/2018/05/13/20/21/lake-3397784_1280.jpg",
  },
  {
    id: 2,
    avatar: "https://media.tenor.com/9vTAoKqOXPQAAAAM/shrek-shrek-meme.gif",
    name: "Fiona Smith",
    time: "5 giờ trước",
    caption: "Một ngày tuyệt vời!",
  },
];

const PostList: React.FC = () => {
  const [posts] = useState<PostProps[]>(initialPosts);

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;

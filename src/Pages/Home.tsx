import React, { useState, useEffect, useCallback, useRef } from 'react';
import NewPost from '../Components/Layout/New_Post';
import PostList from '../Components/Layout/Post/PostList';

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const prevIsMobile = useRef<boolean | null>(null); // Lưu trạng thái trước đó

  const handleResize = useCallback(() => {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== prevIsMobile.current) {
      prevIsMobile.current = newIsMobile;
      setIsMobile(newIsMobile);
    }
  }, []);

  useEffect(() => {
    handleResize(); // Cập nhật lần đầu khi component mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  if (isMobile === null) return null; // Tránh render trước khi biết kích thước màn hình

  return (
    <div className={isMobile ? 'mt-20 pl-4 pr-4 pb-15 '  : ' bg-[#1C1C1D]'}>
      <NewPost />
      <PostList />
      <PostList />
      <PostList />
    </div>
  );
};

export default Home;

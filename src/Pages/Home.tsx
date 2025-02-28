import React from 'react';
import NewPost from '../Components/Layout/New_Post';
import PostList from '../Components/Layout/Post/PostList';

const Home: React.FC = () => {
  return (
    <div>
      <NewPost />
      <PostList />
    </div>
  );
};

export default Home;

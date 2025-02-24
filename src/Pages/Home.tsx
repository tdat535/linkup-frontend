import React from 'react';
import NewPost from '../Components/Layout/New_Post';
import Post from '../Components/Layout/Post';

const Home: React.FC = () => {
  return (
    <div>
      <NewPost />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Home;

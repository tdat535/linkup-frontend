import React from 'react';
import NewPost from '../Components/New_Post';
import Post from '../Components/Post';

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

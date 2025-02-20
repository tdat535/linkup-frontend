import React from 'react';
import Post from '../Components/Post';
import NewPost from '../Components/New_Post';

const Home: React.FC = () => {
  return (
    <div className=''>
        <NewPost />
        <Post />
    </div>
  )
};

export default Home;

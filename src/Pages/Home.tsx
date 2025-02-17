import React from 'react';
import Post from '../Components/Post';

const Home: React.FC = () => {
  return (
    <div className='flex flex-col lg:flex-row'>
      <main className="flex-1 p-5">
        <Post />
      </main>
    </div>
  )
};

export default Home;

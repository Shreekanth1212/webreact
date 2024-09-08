import React from 'react';
import Feed from './Feed';
import './com.css';

const Home = ({ post }) => {
  
  return (
    <main className='Home'>
      {post && post.length ? (
        <Feed post={post} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No post</p>
      )}
    </main>
  );
}

export default Home;

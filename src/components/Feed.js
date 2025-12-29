import React from 'react';
import Post from './Post';

function Feed({ posts, onLike }) {
  return (
    <div className="feed">
      {posts.map(post => (
        <Post key={post.id} post={post} onLike={onLike} />
      ))}
    </div>
  );
}

export default Feed;


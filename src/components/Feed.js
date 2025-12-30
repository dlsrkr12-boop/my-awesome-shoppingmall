import React from 'react';
import Post from './Post';

function Feed({ posts, onLike, onComment, onEdit, onDelete, currentUser }) {
  return (
    <div className="feed">
      {posts.map(post => (
        <Post 
          key={post.id} 
          post={post} 
          onLike={onLike}
          onComment={onComment}
          onEdit={onEdit}
          onDelete={onDelete}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}

export default Feed;


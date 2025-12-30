import React, { useState } from 'react';

function Post({ post, onLike, onComment, onEdit, onDelete, currentUser }) {
  const [comment, setComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const isMyPost = currentUser && post.userId === currentUser.id;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      await onComment(post.id, comment);
      setComment('');
    }
  };

  const handleEdit = () => {
    setShowMenu(false);
    onEdit(post);
  };

  const handleDelete = () => {
    if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
      setShowMenu(false);
      onDelete(post.id);
    }
  };

  return (
    <article className="post">
      <div className="post-header">
        <div className="post-user">
          <img src={post.userImage} alt={post.username} className="post-user-image" />
          <span className="post-username">{post.username}</span>
          <span className="post-timestamp">• {post.timestamp}</span>
        </div>
        <div className="post-menu">
          <i className="fas fa-ellipsis-h" onClick={() => setShowMenu(!showMenu)}></i>
          {showMenu && (
            <div className="post-menu-dropdown">
              {isMyPost && (
                <>
                  <button onClick={handleEdit}>수정</button>
                  <button onClick={handleDelete} className="delete">삭제</button>
                </>
              )}
              {!isMyPost && (
                <button>신고</button>
              )}
              <button onClick={() => setShowMenu(false)}>취소</button>
            </div>
          )}
        </div>
      </div>

      <div className="post-image">
        <img src={post.postImage} alt="post" />
      </div>

      <div className="post-actions">
        <div className="post-actions-left">
          <i 
            className={`${post.isLiked ? 'fas' : 'far'} fa-heart ${post.isLiked ? 'liked' : ''}`}
            onClick={() => onLike(post.id)}
          ></i>
          <i className="far fa-comment"></i>
          <i className="far fa-paper-plane"></i>
        </div>
        <i className="far fa-bookmark"></i>
      </div>

      <div className="post-likes">
        좋아요 <strong>{post.likes.toLocaleString()}</strong>개
      </div>

      <div className="post-caption">
        <span className="post-username-bold">{post.username}</span>
        <span className="post-caption-text">{post.caption}</span>
      </div>

      {post.comments.length > 0 && (
        <div className="post-comments">
          {!showAllComments && post.comments.length > 2 && (
            <button 
              className="view-all-comments"
              onClick={() => setShowAllComments(true)}
            >
              댓글 {post.comments.length}개 모두 보기
            </button>
          )}
          {(showAllComments ? post.comments : post.comments.slice(0, 2)).map((comment, index) => (
            <div key={index} className="post-comment">
              <span className="post-username-bold">{comment.username}</span>
              <span>{comment.text}</span>
            </div>
          ))}
        </div>
      )}

      <form className="post-comment-form" onSubmit={handleCommentSubmit}>
        <input 
          type="text" 
          placeholder="댓글 달기..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button 
          type="submit" 
          disabled={!comment.trim()}
          className={comment.trim() ? 'active' : ''}
        >
          게시
        </button>
      </form>
    </article>
  );
}

export default Post;


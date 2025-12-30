import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Stories from './components/Stories';
import Feed from './components/Feed';
import Auth from './components/Auth';
import CreatePostModal from './components/CreatePostModal';
import { authAPI, postAPI } from './api/api';

// 더미 데이터
const postsData = [
  {
    id: 1,
    username: '김철수',
    userImage: './img/man.png',
    postImage: './img/img01.jpg',
    likes: 1234,
    caption: '오늘 날씨가 정말 좋네요! 🌞',
    comments: [
      { username: '이영희', text: '정말 멋진 사진이에요!' },
      { username: '박민수', text: '좋아요 👍' }
    ],
    timestamp: '2시간 전'
  },
  {
    id: 2,
    username: '이영희',
    userImage: './img/woman.png',
    postImage: './img/img02.jpg',
    likes: 856,
    caption: '맛있는 브런치 🥐☕',
    comments: [
      { username: '최수진', text: '어디서 먹었어요?' }
    ],
    timestamp: '4시간 전'
  },
  {
    id: 3,
    username: '박민수',
    userImage: './img/man.png',
    postImage: './img/img03.jpg',
    likes: 2341,
    caption: '주말 등산 🏔️',
    comments: [],
    timestamp: '6시간 전'
  },
  {
    id: 4,
    username: '최수진',
    userImage: './img/woman.png',
    postImage: './img/img04.jpg',
    likes: 1567,
    caption: '새로 산 책 📚',
    comments: [
      { username: '김철수', text: '재밌어 보이네요!' }
    ],
    timestamp: '8시간 전'
  },
  {
    id: 5,
    username: '정우진',
    userImage: './img/man.png',
    postImage: './img/img05.jpg',
    likes: 934,
    caption: '저녁 노을이 아름답네요 🌅',
    comments: [],
    timestamp: '10시간 전'
  },
  {
    id: 6,
    username: '강지은',
    userImage: './img/woman.png',
    postImage: './img/img06.jpg',
    likes: 2156,
    caption: '운동 완료! 💪',
    comments: [
      { username: '박민수', text: '대단해요!' }
    ],
    timestamp: '12시간 전'
  },
  {
    id: 7,
    username: '윤서준',
    userImage: './img/man.png',
    postImage: './img/img07.jpg',
    likes: 1890,
    caption: '카페에서 작업중 ☕💻',
    comments: [],
    timestamp: '14시간 전'
  },
  {
    id: 8,
    username: '한소희',
    userImage: './img/woman.png',
    postImage: './img/img08.jpg',
    likes: 3421,
    caption: '여행의 추억 ✈️',
    comments: [
      { username: '이영희', text: '부러워요!' },
      { username: '정우진', text: '좋은 곳이네요' }
    ],
    timestamp: '16시간 전'
  },
  {
    id: 9,
    username: '조민호',
    userImage: './img/man.png',
    postImage: './img/img09.jpg',
    likes: 1654,
    caption: '반려견과 산책 🐕',
    comments: [],
    timestamp: '18시간 전'
  },
  {
    id: 10,
    username: '송하나',
    userImage: './img/woman.png',
    postImage: './img/img10.jpg',
    likes: 2789,
    caption: '홈카페 ☕🍰',
    comments: [
      { username: '최수진', text: '맛있어 보여요!' }
    ],
    timestamp: '20시간 전'
  }
];

const storiesData = [
  { id: 1, username: '내 스토리', userImage: './img/man.png', isOwn: true },
  { id: 2, username: '김철수', userImage: './img/man.png' },
  { id: 3, username: '이영희', userImage: './img/woman.png' },
  { id: 4, username: '박민수', userImage: './img/man.png' },
  { id: 5, username: '최수진', userImage: './img/woman.png' },
  { id: 6, username: '정우진', userImage: './img/man.png' },
  { id: 7, username: '강지은', userImage: './img/woman.png' },
  { id: 8, username: '윤서준', userImage: './img/man.png' }
];

function App() {
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // 로그인 상태 확인 및 게시물 불러오기
  useEffect(() => {
    const initApp = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('currentUser');
      
      if (token && savedUser) {
        try {
          // 토큰 검증
          const response = await authAPI.verify();
          setCurrentUser(response.user);
          
          // 게시물 불러오기
          await loadPosts();
        } catch (error) {
          console.error('Token verification failed:', error);
          // 토큰이 유효하지 않으면 로그아웃
          handleLogout();
        }
      }
      setLoading(false);
    };

    initApp();
  }, []);

  // 게시물 불러오기
  const loadPosts = async () => {
    try {
      const response = await postAPI.getPosts();
      // API 응답 포맷팅
      const formattedPosts = response.posts.map(post => ({
        id: post.id,
        userId: post.userId,
        username: post.user.username,
        userImage: post.user.profileImage,
        postImage: post.image,
        likes: post.likesCount,
        caption: post.caption || '',
        comments: post.comments.map(c => ({
          username: c.user.username,
          text: c.text
        })),
        timestamp: getTimeAgo(post.createdAt),
        isLiked: post.isLiked
      }));
      setPosts(formattedPosts);
    } catch (error) {
      console.error('Failed to load posts:', error);
      // API 실패 시 더미 데이터 사용
      setPosts(postsData);
    }
  };

  // 시간 포맷팅
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return '방금 전';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
    return `${Math.floor(seconds / 86400)}일 전`;
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    loadPosts(); // 로그인 후 게시물 불러오기
  };

  const handleLogout = () => {
    authAPI.logout();
    setCurrentUser(null);
    setPosts([]);
  };

  const handleLike = async (postId) => {
    try {
      await postAPI.toggleLike(postId);
      // 게시물 목록 새로고침
      await loadPosts();
    } catch (error) {
      console.error('Failed to toggle like:', error);
      // 에러 시 로컬에서만 처리
      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, likes: post.likes + (post.isLiked ? -1 : 1), isLiked: !post.isLiked }
          : post
      ));
    }
  };

  const handleCreatePost = async (postData) => {
    try {
      await postAPI.createPost(postData);
      alert('게시물이 작성되었습니다!');
      await loadPosts();
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowCreateModal(true);
  };

  const handleUpdatePost = async (postData) => {
    try {
      await postAPI.updatePost(editingPost.id, postData);
      alert('게시물이 수정되었습니다!');
      setEditingPost(null);
      await loadPosts();
    } catch (error) {
      console.error('Failed to update post:', error);
      throw error;
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await postAPI.deletePost(postId);
      alert('게시물이 삭제되었습니다!');
      await loadPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('게시물 삭제에 실패했습니다.');
    }
  };

  const handleComment = async (postId, text) => {
    try {
      await postAPI.createComment(postId, text);
      await loadPosts();
    } catch (error) {
      console.error('Failed to create comment:', error);
      alert('댓글 작성에 실패했습니다.');
    }
  };

  const handleOpenCreateModal = () => {
    setEditingPost(null);
    setShowCreateModal(true);
  };

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setEditingPost(null);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.5rem',
        color: '#666'
      }}>
        로딩 중...
      </div>
    );
  }

  // 로그인하지 않은 경우 로그인 화면 표시
  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Header 
        currentUser={currentUser} 
        onLogout={handleLogout}
        onCreatePost={handleOpenCreateModal}
      />
      <div className="main-content">
        <div className="feed-container">
          <Stories stories={storiesData} />
          <Feed 
            posts={posts} 
            onLike={handleLike}
            onComment={handleComment}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            currentUser={currentUser}
          />
        </div>
        <div className="sidebar">
          <div className="profile-widget">
            <img src={currentUser.profileImage} alt="profile" className="profile-pic-small" />
            <div className="profile-info">
              <span className="username-bold">{currentUser.username}</span>
              <span className="name-gray">{currentUser.email}</span>
            </div>
            <button className="switch-btn" onClick={handleLogout}>로그아웃</button>
          </div>
          <div className="suggestions">
            <div className="suggestions-header">
              <span>회원님을 위한 추천</span>
              <a href="#">모두 보기</a>
            </div>
            {storiesData.slice(1, 6).map(story => (
              <div key={story.id} className="suggestion-item">
                <img src={story.userImage} alt={story.username} />
                <div className="suggestion-info">
                  <span className="username">{story.username}</span>
                  <span className="follow-info">회원님을 위한 추천</span>
                </div>
                <button className="follow-btn">팔로우</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreatePostModal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
        editMode={!!editingPost}
        initialData={editingPost ? { image: editingPost.postImage, caption: editingPost.caption } : {}}
      />
    </div>
  );
}

export default App;


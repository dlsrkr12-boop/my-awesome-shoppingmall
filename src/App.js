import React, { useState } from 'react';
import Header from './components/Header';
import Stories from './components/Stories';
import Feed from './components/Feed';

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
  const [posts, setPosts] = useState(postsData);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <div className="feed-container">
          <Stories stories={storiesData} />
          <Feed posts={posts} onLike={handleLike} />
        </div>
        <div className="sidebar">
          <div className="profile-widget">
            <img src="./img/man.png" alt="profile" className="profile-pic-small" />
            <div className="profile-info">
              <span className="username-bold">my_account</span>
              <span className="name-gray">내 이름</span>
            </div>
            <button className="switch-btn">전환</button>
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
    </div>
  );
}

export default App;


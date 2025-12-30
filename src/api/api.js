// API 유틸리티 함수

const API_URL = 'http://localhost:5000/api';

// 토큰 가져오기
const getToken = () => localStorage.getItem('token');

// API 호출 헬퍼
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'API 요청 실패');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// 인증 API
export const authAPI = {
  // 회원가입
  signup: async (userData) => {
    return apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // 로그인
  login: async (credentials) => {
    return apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  // 토큰 검증
  verify: async () => {
    return apiCall('/auth/verify');
  },

  // 로그아웃 (로컬에서만)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  },
};

// 게시물 API
export const postAPI = {
  // 모든 게시물 조회
  getPosts: async () => {
    return apiCall('/posts');
  },

  // 게시물 생성
  createPost: async (postData) => {
    return apiCall('/posts', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },

  // 게시물 수정
  updatePost: async (postId, postData) => {
    return apiCall(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(postData),
    });
  },

  // 게시물 삭제
  deletePost: async (postId) => {
    return apiCall(`/posts/${postId}`, {
      method: 'DELETE',
    });
  },

  // 좋아요 토글
  toggleLike: async (postId) => {
    return apiCall(`/posts/${postId}/like`, {
      method: 'POST',
    });
  },

  // 댓글 작성
  createComment: async (postId, text) => {
    return apiCall(`/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  },
};

// 사용자 API
export const userAPI = {
  // 프로필 조회
  getProfile: async (userId) => {
    return apiCall(`/users/${userId}`);
  },

  // 프로필 수정
  updateProfile: async (profileData) => {
    return apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },

  // 팔로우
  follow: async (userId) => {
    return apiCall(`/users/${userId}/follow`, {
      method: 'POST',
    });
  },

  // 언팔로우
  unfollow: async (userId) => {
    return apiCall(`/users/${userId}/follow`, {
      method: 'DELETE',
    });
  },
};



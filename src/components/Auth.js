import React, { useState } from 'react';
import '../Auth.css';
import { authAPI } from '../api/api';

function Auth({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 유효성 검사
    if (!formData.email || !formData.password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      setLoading(false);
      return;
    }

    if (isSignup) {
      // 회원가입
      if (!formData.username) {
        setError('사용자 이름을 입력해주세요.');
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('비밀번호가 일치하지 않습니다.');
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError('비밀번호는 6자 이상이어야 합니다.');
        setLoading(false);
        return;
      }

      try {
        // API로 회원가입
        const response = await authAPI.signup({
          username: formData.username,
          email: formData.email,
          password: formData.password
        });

        // 토큰 저장
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));

        alert('회원가입이 완료되었습니다!');
        onLogin(response.user);
      } catch (error) {
        setError(error.message || '회원가입에 실패했습니다.');
      } finally {
        setLoading(false);
      }

    } else {
      // 로그인
      try {
        // API로 로그인
        const response = await authAPI.login({
          email: formData.email,
          password: formData.password
        });

        // 토큰 저장
        localStorage.setItem('token', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response.user));

        onLogin(response.user);
      } catch (error) {
        setError(error.message || '로그인에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-logo">Instagram</div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignup && (
            <input
              type="text"
              name="username"
              placeholder="사용자 이름"
              value={formData.username}
              onChange={handleChange}
              className="auth-input"
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
          />
          
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
          />
          
          {isSignup && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="auth-input"
            />
          )}

          {error && <div className="auth-error">{error}</div>}
          
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? '처리 중...' : (isSignup ? '가입하기' : '로그인')}
          </button>
        </form>

        <div className="auth-divider">또는</div>

        <button className="auth-toggle" onClick={() => {
          setIsSignup(!isSignup);
          setError('');
          setFormData({ username: '', email: '', password: '', confirmPassword: '' });
        }}>
          {isSignup ? '이미 계정이 있으신가요? 로그인' : '계정이 없으신가요? 가입하기'}
        </button>
      </div>

      {/* API 연결 안내 */}
      <div className="auth-demo">
        <strong>✅ Prisma DB 연결됨</strong><br />
        백엔드 서버: http://localhost:5000<br />
        회원가입하여 새 계정을 만드세요!
      </div>
    </div>
  );
}

export default Auth;


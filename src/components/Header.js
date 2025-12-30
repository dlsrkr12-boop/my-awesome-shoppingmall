import React from 'react';

function Header({ currentUser, onLogout, onCreatePost }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">Instagram</div>
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="검색" />
        </div>
        <nav className="nav-icons">
          <button className="create-post-btn" onClick={onCreatePost} title="게시물 만들기">
            <i className="far fa-plus-square"></i>
          </button>
          <i className="far fa-heart"></i>
          <i className="far fa-paper-plane"></i>
          <i className="far fa-compass"></i>
          <i className="far fa-user-circle"></i>
          {currentUser && (
            <button className="logout-btn" onClick={onLogout} title="로그아웃">
              <i className="fas fa-sign-out-alt"></i>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;


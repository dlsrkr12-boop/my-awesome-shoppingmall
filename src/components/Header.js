import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">Instagram</div>
        <div className="search-bar">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="검색" />
        </div>
        <nav className="nav-icons">
          <i className="far fa-heart"></i>
          <i className="far fa-paper-plane"></i>
          <i className="far fa-compass"></i>
          <i className="far fa-user-circle"></i>
        </nav>
      </div>
    </header>
  );
}

export default Header;


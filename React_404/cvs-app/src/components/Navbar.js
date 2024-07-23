import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png';  // 로고 이미지 파일 경로

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="nav-links">
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </div>
    </nav>
  );
};

export default Navbar;

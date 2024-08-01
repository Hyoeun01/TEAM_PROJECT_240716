import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo/1st_logo.png';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { isLoggedIn, user, handleLogout } = useAuth();

    return (
        <nav className="navbar">
            <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <div className="nav-links">
                <Link to="/product/list">상품</Link>
                <Link to="/address/list">매장안내</Link>
                <Link to="/notice/list">공지사항</Link>
                <Link to="/api/inquiries">문의사항</Link>
                {isLoggedIn ? (
                    <>
                        {user?.role === 'ADMIN' ? (
                            <Link to="/admin">ADMIN</Link>
                        ) : (
                            <Link to="/update">MyPage</Link>
                        )}
                        <Link to="#" onClick={handleLogout}>로그아웃</Link>
                    </>
                ) : (
                    <>
                        <Link to="/signup">회원가입</Link>
                        <Link to="/login">로그인</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

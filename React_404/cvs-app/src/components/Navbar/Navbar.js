import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../../logo/1st_logo.png'; 
import './Navbar.css'; 

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');
    const [loginMethod, setLoginMethod] = useState('');

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('/members/checkLogin', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setIsLoggedIn(response.data.isLoggedIn);
                setLoginMethod(localStorage.getItem('loginMethod'));
                if (response.data.isLoggedIn) {
                    const userResponse = await axios.get('/members/me', {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    setRole(userResponse.data.role);
                }
            } catch (error) {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.post('/members/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                localStorage.removeItem('token');
                localStorage.removeItem('loginMethod');
                setIsLoggedIn(false);
                setRole('');
                setLoginMethod('');
                window.location.href = '/';
            }
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        }
    };

    return (
        <nav className="navbar">
            <Link to="/">
                <img src={logo} alt="Logo" className="logo" />
            </Link>
            <div className="nav-links">
                <Link to="/product/list">상품</Link>
                <Link to="/address/list">매장안내</Link>
                <Link to="/notice/list">공지사항</Link>
                {isLoggedIn ? (
                    <>
                        {role === 'ADMIN' ? (
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

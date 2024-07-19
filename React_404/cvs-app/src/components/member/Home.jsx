import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // 로그인 상태를 확인하는 API 호출
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get('/members/checkLogin', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200 && response.data.isLoggedIn) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error('로그인 상태 확인 중 오류 발생:', error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogin = () => {
        // 로그인 페이지로 이동
        window.location.href = '/login';
    };

    const handleLogout = async () => {
        try {
            // 로그아웃 API 호출
            const response = await axios.post('/members/logout', {}, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.status === 200) {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
                window.location.href = '/';
            }
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
        }
    };

    return (
        <div className="container">
            <h1>Welcome to the Home Page</h1>
            <p>This is the default home page.</p>
            {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
};

export default Home;

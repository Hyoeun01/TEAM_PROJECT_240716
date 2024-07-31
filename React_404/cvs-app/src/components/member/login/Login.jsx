import React, { useState } from 'react';

const Login = () => {
    const [mid, setMid] = useState('');
    const [mpw, setMpw] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/members/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ mid, mpw }),
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('loginMethod', 'normal'); // 일반 로그인 방법 저장
            window.location.href = '/';
        } else {
            alert('로그인 실패');
        }
    };

    const onKakaoSocialLogin = () => {
        const KAKAO_REST_API_KEY = 'c68596009162b9916a7f9037a72b813c';
        const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/authorize';
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=profile_nickname,talk_message`;
    }

    return (
        <div className="container">
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="mid">ID:</label>
                    <input
                        type="text"
                        id="mid"
                        name="mid"
                        value={mid}
                        onChange={(e) => setMid(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="mpw">비밀번호:</label>
                    <input
                        type="password"
                        id="mpw"
                        name="mpw"
                        value={mpw}
                        onChange={(e) => setMpw(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">Login</button>
                </div>
            </form>
            <button onClick={onKakaoSocialLogin}>카카오톡 로그인</button>
            <p>계정이 없으신가요? <a href="/signup">회원가입</a></p>
        </div>
    );
};

export default Login;

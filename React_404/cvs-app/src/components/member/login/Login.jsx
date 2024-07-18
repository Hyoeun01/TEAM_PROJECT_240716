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
            window.location.href = '/';
        } else {
            alert('로그인 실패');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
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
                    <button type="submit">로그인</button>
                </div>
            </form>
            <p>계정이 없으신가요? <a href="/signup">회원가입</a></p>
        </div>
    );
};

export default Login;

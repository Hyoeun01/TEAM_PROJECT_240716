import React, { useState } from 'react';

const Signup = () => {
    const [mid, setMid] = useState('');
    
    const checkMid = () => {
        fetch(`/members/checkMid?mid=${mid}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert("이미 존재하는 ID입니다.");
                } else {
                    alert("사용 가능한 ID입니다.");
                }
            });
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form action="/members/signup" method="post">
                <div>
                    <label htmlFor="mid">ID:</label>
                    <input 
                        type="text" 
                        id="mid" 
                        name="mid" 
                        required 
                        value={mid}
                        onChange={(e) => setMid(e.target.value)}
                    />
                    <button type="button" onClick={checkMid}>Check ID</button>
                </div>
                <div>
                    <label htmlFor="mpw">비밀번호:</label>
                    <input type="password" id="mpw" name="mpw" required />
                </div>
                <div>
                    <label htmlFor="confirmMpw">비밀번호 확인:</label>
                    <input type="password" id="confirmMpw" name="confirmMpw" required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="nickname">닉네임:</label>
                    <input type="text" id="nickname" name="nickname" required />
                </div>
                <div>
                    <label htmlFor="phone">전화번호:</label>
                    <input type="text" id="phone" name="phone" />
                </div>
                <div>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;

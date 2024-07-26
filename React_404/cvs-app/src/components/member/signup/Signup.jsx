import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [mid, setMid] = useState('');
    const [mpw, setMpw] = useState('');
    const [confirmMpw, setConfirmMpw] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');

    const checkMid = () => {
        fetch(`/members/checkMid?mid=${mid}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert("이미 존재하는 ID입니다.");
                } else {
                    alert("사용 가능한 ID입니다.");
                }
            }).catch(error => {
                console.error("ID 체크 중 오류 발생:", error);
                alert("ID 체크 중 오류가 발생했습니다.");
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (mpw !== confirmMpw) {
            alert("비밀번호를 다르게 입력하셨습니다. '비밀번호 확인'칸에 다시 비밀번호를 입력해주세요");
            return;
        }

        try {
            const response = await axios.post('/members/signup', {
                mid,
                mpw,
                confirmMpw,
                email,
                nickname,
                phone
            });
            console.log(response)
            if (response.status === 200) {
                window.location.href = '/login';
            } else {
                alert('회원가입 실패');
            }
        } catch (error) {
            console.error("회원가입 중 오류 발생:", error);
            alert('회원가입 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
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
                    <input 
                        type="password" 
                        id="mpw" 
                        name="mpw" 
                        required 
                        value={mpw}
                        onChange={(e) => setMpw(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="confirmMpw">비밀번호 확인:</label>
                    <input 
                        type="password" 
                        id="confirmMpw" 
                        name="confirmMpw" 
                        required 
                        value={confirmMpw}
                        onChange={(e) => setConfirmMpw(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="nickname">닉네임:</label>
                    <input 
                        type="text" 
                        id="nickname" 
                        name="nickname" 
                        required 
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="phone">전화번호:</label>
                    <input 
                        type="text" 
                        id="phone" 
                        name="phone" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
};

export default Signup;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Update = () => {
    const [member, setMember] = useState({
        mid: '',
        mpw: '',
        confirmMpw: '',
        email: '',
        nickname: '',
        phone: '',
        point: 0,
    });

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const response = await axios.get('/members/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setMember(response.data);
            } catch (error) {
                console.error('회원 정보 로드 중 오류 발생:', error);
            }
        };

        fetchMemberData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMember((prevMember) => ({
            ...prevMember,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/members/update', member, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                alert('회원 정보가 성공적으로 업데이트되었습니다.');
            } else {
                alert('회원 정보 업데이트 실패');
            }
        } catch (error) {
            console.error('회원 정보 업데이트 중 오류 발생:', error);
            alert('회원 정보 업데이트 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="mid">ID:</label>
                    <input type="text" id="mid" name="mid" value={member.mid} readOnly />
                </div>
                <div>
                    <label htmlFor="mpw">비밀번호:</label>
                    <input type="password" id="mpw" name="mpw" value={member.mpw} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="confirmMpw">비밀번호 확인:</label>
                    <input type="password" id="confirmMpw" name="confirmMpw" value={member.confirmMpw} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={member.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="nickname">닉네임:</label>
                    <input type="text" id="nickname" name="nickname" value={member.nickname} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="phone">전화번호:</label>
                    <input type="text" id="phone" name="phone" value={member.phone} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="point">포인트:</label>
                    <input type="number" id="point" name="point" value={member.point} readOnly />
                </div>
                <div>
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default Update;

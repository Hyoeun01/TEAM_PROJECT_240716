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

    const [showModal, setShowModal] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const loginMethod = localStorage.getItem('loginMethod');

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
        if (member.mpw !== member.confirmMpw) {
            alert("비밀번호를 다르게 입력하셨습니다. '비밀번호 확인'칸에 다시 비밀번호를 입력해주세요");
            return;
        }
        try {
            const response = await axios.post('/members/update', member, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                alert('회원 정보가 성공적으로 업데이트되었습니다.');
                window.location.href = '/'; // 홈 페이지로 리다이렉트
            } else {
                alert('회원 정보 업데이트 실패');
            }
        } catch (error) {
            console.error('회원 정보 업데이트 중 오류 발생:', error);
            alert('회원 정보 업데이트 중 오류가 발생했습니다.');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.post('/members/delete', {
                mid: member.mid,
                mpw: deletePassword,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.status === 200) {
                alert('탈퇴가 완료되었습니다.');
                window.location.href = '/'; // 홈 페이지로 리다이렉트
            } else {
                alert('회원 탈퇴 실패');
            }
        } catch (error) {
            console.error('회원 탈퇴 중 오류 발생:', error);
            alert('회원 탈퇴 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="container">
            <h2>회원정보 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="mid">ID:</label>
                    <input type="text" id="mid" name="mid" value={member.mid} readOnly />
                </div>
                {loginMethod !== 'kakao' && (
                    <>
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
                    </>
                )}
                <div>
                    <label htmlFor="point">포인트:</label>
                    <input type="number" id="point" name="point" value={member.point} readOnly />
                </div>
                <div>
                    <button type="submit">수정완료</button>
                    {loginMethod !== 'kakao' && <button type="button" onClick={() => setShowModal(true)}>회원탈퇴</button>}
                </div>
            </form>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>회원 탈퇴</h2>
                        <p>탈퇴 후 복구가 불가능합니다. 정말로 탈퇴 하시겠습니까?</p>
                        <div>
                            <label htmlFor="deletePassword">비밀번호:</label>
                            <input
                                type="password"
                                id="deletePassword"
                                name="deletePassword"
                                value={deletePassword}
                                onChange={(e) => setDeletePassword(e.target.value)}
                                required
                            />
                        </div>
                        <button onClick={() => setShowModal(false)}>아니오</button>
                        <button onClick={handleDelete}>탈퇴하기</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Update;

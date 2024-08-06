import React, { useState, useEffect } from 'react';
import axios from 'axios';
import kakaoIcon from '../../../assets/images/kakao_icon-removebg.png';
import googleIcon from '../../../assets/images/google_icon-removebg.png';
import logo from '../../../logo/1st_logo.png';
import './Update.css'; 


const Update = () => {
    const [member, setMember] = useState({
        mid: '',
        mpw: '',
        confirmMpw: '',
        email: '',
        nickname: '',
        phone: '',
        address: '', // address 필드 추가
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
        <section className="py-3 py-md-5 py-xl-8">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="mb-5">
                            <h2 className="display-5 fw-bold text-center">회원정보 수정</h2>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-10 col-xl-8">
                        <div className="row gy-5 justify-content-center">
                            <div className="col-12 col-lg-5">
                                <form onSubmit={handleSubmit}>
                                    <div className="row gy-3 overflow-hidden">
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 border-bottom rounded-0"
                                                    id="mid"
                                                    placeholder="ID"
                                                    value={member.mid}
                                                    readOnly
                                                />
                                                <label htmlFor="mid" className="form-label">ID</label>
                                            </div>
                                        </div>
                                        {loginMethod !== 'kakao' && (
                                            <>
                                                <div className="col-12">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="password"
                                                            className="form-control border-0 border-bottom rounded-0"
                                                            id="mpw"
                                                            name="mpw"
                                                            placeholder="Password"
                                                            value={member.mpw}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label htmlFor="mpw" className="form-label">비밀번호</label>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <div className="form-floating mb-3">
                                                        <input
                                                            type="password"
                                                            className="form-control border-0 border-bottom rounded-0"
                                                            id="confirmMpw"
                                                            name="confirmMpw"
                                                            placeholder="Confirm Password"
                                                            value={member.confirmMpw}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <label htmlFor="confirmMpw" className="form-label">비밀번호 확인</label>
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control border-0 border-bottom rounded-0"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    value={member.email}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="email" className="form-label">Email</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 border-bottom rounded-0"
                                                    id="nickname"
                                                    name="nickname"
                                                    placeholder="Nickname"
                                                    value={member.nickname}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="nickname" className="form-label">Nickname</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 border-bottom rounded-0"
                                                    id="phone"
                                                    name="phone"
                                                    placeholder="Phone"
                                                    value={member.phone}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="phone" className="form-label">전화번호</label>
                                            </div>
                                        </div>
                                        <div className="col-12"> {/* Address 입력 필드 추가 */}
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 border-bottom rounded-0"
                                                    id="address"
                                                    name="address"
                                                    placeholder="Address"
                                                    value={member.address}
                                                    onChange={handleChange}
                                                    required
                                                />
                                                <label htmlFor="address" className="form-label">주소</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="number"
                                                    className="form-control border-0 border-bottom rounded-0"
                                                    id="point"
                                                    name="point"
                                                    placeholder="Point"
                                                    value={member.point}
                                                    readOnly
                                                />
                                                <label htmlFor="point" className="form-label">포인트</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn btn-lg btn-dark rounded-0 fs-6" type="submit">수정완료</button>
                                                {loginMethod !== 'kakao' && (
                                                    <button className="btn btn-outline-dark mt-2" type="button" onClick={() => setShowModal(true)}>회원탈퇴</button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center gap-3 flex-lg-column">
                                <div className="bg-dark h-100 d-none d-lg-block" style={{ width: '1px', opacity: 0.1 }}></div>
                                <div className="bg-dark w-100 d-lg-none" style={{ height: '1px', opacity: 0.1 }}></div>
                              
                            </div>
                            <div className="col-12 col-lg-5 d-flex flex-column align-items-center justify-content-center">
                                <div className="col-10 mb-3">
                                    <img src={logo} alt="logo" className="img-fluid mb-3" />
                                </div>
                      
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
        </section>
    );
};

export default Update;

import React, { useState } from 'react';
import axios from 'axios';
import kakaoIcon from '../../../assets/images/kakao_icon-removebg.png';
import googleIcon from '../../../assets/images/google_icon-removebg.png';
import logo from '../../../logo/1st_logo.png';
import './Signup.css'; 

const Signup = () => {
    const [mid, setMid] = useState('');
    const [mpw, setMpw] = useState('');
    const [confirmMpw, setConfirmMpw] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState(''); // address 상태 추가

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
                phone,
                address // address 추가
            });
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

    const onKakaoSocialLogin = () => {
        const KAKAO_REST_API_KEY = 'c68596009162b9916a7f9037a72b813c';
        const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/kakao/callback';
        window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&scope=profile_nickname,talk_message`;
    };

    const [kakaoButtonHovered, setKakaoButtonHovered] = useState(false);
    const [googleButtonHovered, setGoogleButtonHovered] = useState(false);

    const kakaoButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        border: '1px solid transparent',
        backgroundColor: 'transparent',
        color: '#3c1e1e',
        transition: 'background-color 0.3s ease',
    };

    const kakaoButtonHoverStyle = {
        ...kakaoButtonStyle,
        backgroundColor: '#FEE500',
        border: '1px solid #FEE500',
    };

    const googleButtonStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        border: '1px solid transparent',
        backgroundColor: 'transparent',
        color: '#3c1e1e',
        transition: 'background-color 0.3s ease',
    };

    const googleButtonHoverStyle = {
        ...googleButtonStyle,
        backgroundColor: '#4285F4',
        border: '1px solid #4285F4',
    };

    return (
        <section className="py-3 py-md-5 py-xl-8">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="mb-5">
                            <h2 className="display-5 fw-bold text-center">회원가입</h2>
                            <p className="text-center m-0">계정이 이미 있으신가요? <a href="/login" className="link-primary text-decoration-none">로그인</a></p>
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
                                            <div className="form-floating mb-3 d-flex align-items-center">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 border-bottom rounded-0"
                                                    id="mid"
                                                    placeholder="ID"
                                                    required
                                                    value={mid}
                                                    onChange={(e) => setMid(e.target.value)}
                                                    style={{ flex: 1 }}
                                                />
                                                <label htmlFor="mid" className="form-label">ID</label>
                                                <button type="button" onClick={checkMid} className="btn btn-sm btn-secondary ms-2">중복확인</button>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control border-0 border-bottom rounded-0"
                                                    id="mpw"
                                                    placeholder="Password"
                                                    required
                                                    value={mpw}
                                                    onChange={(e) => setMpw(e.target.value)}
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
                                                    placeholder="Confirm Password"
                                                    required
                                                    value={confirmMpw}
                                                    onChange={(e) => setConfirmMpw(e.target.value)}
                                                />
                                                <label htmlFor="confirmMpw" className="form-label">비밀번호 확인</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control border-0 border-bottom rounded-0"
                                                    id="email"
                                                    placeholder="Email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
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
                                                    placeholder="Nickname"
                                                    required
                                                    value={nickname}
                                                    onChange={(e) => setNickname(e.target.value)}
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
                                                    placeholder="Phone"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                                <label htmlFor="phone" className="form-label">전화번호</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control border-0 border-bottom rounded-0"
                                                    id="address"
                                                    placeholder="Address"
                                                    required
                                                    value={address}
                                                    onChange={(e) => setAddress(e.target.value)}
                                                />
                                                <label htmlFor="address" className="form-label">주소</label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-grid">
                                                <button className="btn btn-lg btn-dark rounded-0 fs-6" type="submit">회원가입</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-12 col-lg-2 d-flex align-items-center justify-content-center gap-3 flex-lg-column">
                                <div className="bg-dark h-100 d-none d-lg-block" style={{ width: '1px', opacity: 0.1 }}></div>
                                <div>or</div>
                                <div className="bg-dark h-100 d-none d-lg-block" style={{ width: '1px', opacity: 0.1 }}></div>
                            </div>
                            <div className="col-12 col-lg-5 d-flex flex-column align-items-center justify-content-center"> {/* 중앙 정렬을 위한 클래스 추가 */}
                                <div className="col-10 mb-3"> {/* 여백을 위해 mb-3 추가 */}
                                    <img src={logo} alt="logo" className="img-fluid mb-3" /> {/* 배너 이미지 추가 및 여백 수정 */}
                                </div>
                                <div className="d-flex gap-3 flex-column w-100">
                                    <a
                                        href="#!"
                                        className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center"
                                        style={googleButtonHovered ? googleButtonHoverStyle : googleButtonStyle}
                                        onMouseEnter={() => setGoogleButtonHovered(true)}
                                        onMouseLeave={() => setGoogleButtonHovered(false)}
                                    >
                                        <img src={googleIcon} alt="Google Icon" style={{ width: '20px', marginRight: '10px' }} />
                                        <span className="ms-2 fs-6 flex-grow-1">Continue with Google</span>
                                    </a>
                                    <a
                                        href="#!"
                                        className="btn bsb-btn-2xl btn-outline-dark rounded-0 d-flex align-items-center"
                                        style={kakaoButtonHovered ? kakaoButtonHoverStyle : kakaoButtonStyle}
                                        onMouseEnter={() => setKakaoButtonHovered(true)}
                                        onMouseLeave={() => setKakaoButtonHovered(false)}
                                        onClick={onKakaoSocialLogin}
                                    >
                                        <img src={kakaoIcon} alt="Kakao Icon" style={{ width: '20px', marginRight: '10px' }} />
                                        <span className="ms-2 fs-6 flex-grow-1">Continue with Kakao</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;

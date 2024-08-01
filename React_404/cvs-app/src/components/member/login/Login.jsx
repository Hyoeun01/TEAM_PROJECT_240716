import React, { useState } from 'react';
import logo from '../../../logo/1st_logo.png'; // 로고 이미지 추가
import kakaoIcon from '../../../assets/images/kakao_icon.png'; // 카카오 아이콘 추가
import googleIcon from '../../../assets/images/google_icon.png'; // 구글 아이콘 추가
import banner from '../../../assets/images/login_banner.jpg'; // 배너 이미지 추가
import './Login.css'; // Bootstrap CSS 포함

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
        <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img src={logo} style={{ width: '185px' }} alt="logo" />
                                            <h4 className="mt-1 mb-5 pb-1">Life Style 편의점!</h4>
                                        </div>

                                        <form onSubmit={handleSubmit}>
                                            <div className="form-outline mb-4">
                                                <input
                                                    type="text"
                                                    id="mid"
                                                    className="form-control"
                                                    placeholder="ID를 입력하세요"
                                                    value={mid}
                                                    onChange={(e) => setMid(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input
                                                    type="password"
                                                    id="mpw"
                                                    className="form-control"
                                                    placeholder="password"
                                                    value={mpw}
                                                    onChange={(e) => setMpw(e.target.value)}
                                                    required
                                                />
                                            </div>

                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">로그인</button>
                                                <a className="text-muted" href="#!">비밀번호를 잊으셨나요?</a>
                                            </div>

                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">계정이 없으신가요?</p>
                                                <button type="button" className="btn btn-outline-danger" onClick={() => window.location.href = '/signup'}>회원가입</button>
                                            </div>
                                        </form>

                                        <button
                                            onClick={onKakaoSocialLogin}
                                            className="btn btn-block mb-3"
                                            style={kakaoButtonHovered ? kakaoButtonHoverStyle : kakaoButtonStyle}
                                            onMouseEnter={() => setKakaoButtonHovered(true)}
                                            onMouseLeave={() => setKakaoButtonHovered(false)}
                                        >
                                            <img src={kakaoIcon} alt="Kakao Icon" style={{ width: '20px', marginRight: '10px' }} />
                                            카카오톡 로그인
                                        </button>
                                        <button
                                            onClick={() => window.location.href = '#'}
                                            className="btn btn-outline-secondary btn-block d-flex align-items-center justify-content-center"
                                            style={googleButtonHovered ? googleButtonHoverStyle : googleButtonStyle}
                                            onMouseEnter={() => setGoogleButtonHovered(true)}
                                            onMouseLeave={() => setGoogleButtonHovered(false)}
                                        >
                                            <img src={googleIcon} alt="Google Icon" style={{ width: '20px', marginRight: '10px' }} />
                                            구글 로그인
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2" style={{ backgroundImage: `url(${banner})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;

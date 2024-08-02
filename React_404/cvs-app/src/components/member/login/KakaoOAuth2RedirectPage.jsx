import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KakaoOAuth2RedirectPage = () => {
    const navigate = useNavigate();

    // 1. 인가코드 받기
    const code = new URL(window.location.href).searchParams.get("code");

    // 2. access Token 요청
    const getToken = async (code) => {
        const KAKAO_REST_API_KEY = 'c68596009162b9916a7f9037a72b813c';
        const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauth/authorize';

        const response = await fetch(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
        });
        return response.json();
    }

    useEffect(() => {
        if (code) {
            getToken(code).then((res) => {
                localStorage.setItem('token', res.access_token);
                localStorage.setItem('loginMethod', 'kakao'); // 카카오톡 로그인 방법 저장
                navigate('/');
            });
        }
    }, [code, navigate]);

    return <div>로딩 중...</div>;
}

export default KakaoOAuth2RedirectPage;

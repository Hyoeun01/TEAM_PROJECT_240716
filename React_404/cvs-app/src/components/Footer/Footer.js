import React from 'react';
import logo from '../../logo/1st_logo.png';  // 로고 이미지 파일 경로 수정

const Footer = () => {
  return (
    <footer className="footer">
      <img src={logo} alt="Logo" className="footer-logo" />
      <div className="footer-text">
        <p>편의점 페이지에 오신 것을 환영합니다!</p>
      </div>
    </footer>
  );
};

export default Footer;

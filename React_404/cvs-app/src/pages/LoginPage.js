import React from 'react';

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>로그인</h1>
      <form>
        <label>
          이메일:
          <input type="email" />
        </label>
        <label>
          비밀번호:
          <input type="password" />
        </label>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;

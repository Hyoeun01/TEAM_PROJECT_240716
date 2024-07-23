import React from 'react';

const SignupPage = () => {
  return (
    <div className="signup-page">
      <h1>회원가입</h1>
      <form>
        <label>
          이메일:
          <input type="email" />
        </label>
        <label>
          비밀번호:
          <input type="password" />
        </label>
        <label>
          비밀번호 확인:
          <input type="password" />
        </label>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignupPage;

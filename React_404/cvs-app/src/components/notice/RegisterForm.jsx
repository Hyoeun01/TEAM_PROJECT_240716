import React from 'react';
import './RegisterForm.css'; // CSS 파일 import

const RegisterForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newNotice = {
      title: formData.get('title'),
      content: formData.get('content'),
      writer: formData.get('writer')
    };

    fetch('http://localhost:8080/notice/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newNotice)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('새로운 공지사항:', data);
      window.location.href = '/notice/list';
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="register-form-container">
      <h1>Register Notice</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="Title" name="title" />
        </div>
        <div>
          <textarea placeholder="Content" name="content"></textarea>
        </div>
        <div>
          <input type="text" placeholder="Writer" name="writer" readOnly />
        </div>
        <div className="button-group">
          <button type="button" onClick={() => window.location.href='/notice/list'}>목록</button>
          <input type="submit" value="등록" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

import React, { useEffect, useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/members/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setNickname(data.nickname); // 닉네임을 상태에 저장
        } else {
          throw new Error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newNotice = {
      title: formData.get('title'),
      content: formData.get('content'),
      writer: nickname // 수정된 부분: 닉네임을 writer로 사용
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
      <h1>공지사항 등록</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="제목" name="title" />
        </div>
        <div>
          <textarea placeholder="내용" name="content"></textarea>
        </div>
        <div>
          <p><strong>작성자:</strong> {nickname}</p>
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

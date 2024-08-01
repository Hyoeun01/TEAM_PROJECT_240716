import React from 'react';

const RegisterForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newNotice = {
      title: formData.get('title'),
      content: formData.get('content'),
      writer: formData.get('writer')
    };

    fetch('http://localhost:8080/notice/register', { // 절대 경로로 변경
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
    <div>
      <h1>Notice List</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="text" placeholder="title" name="title" />
        </div>
        <div>
          <textarea placeholder="content" name="content"></textarea>
        </div>
        <div>
          <input type="text" placeholder="writer" name="writer" readOnly />
        </div>
        <div>
          <button type="button" onClick={() => window.location.href='/notice/list'}>목록</button>
          <input type="submit" value="등록" />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;

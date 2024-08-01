import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ModifyForm.css'; // CSS 파일 import

const ModifyForm = () => {
  const { bno } = useParams();
  const navigate = useNavigate();
  const [dto, setDto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    // 공지사항 데이터 가져오기
    fetch(`http://localhost:8080/notice/read/${bno}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          return response.text().then(text => {
            throw new Error(`Response was not JSON: ${text}`);
          });
        }
      })
      .then(data => {
        setDto(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching notice:', error);
        setError(error);
        setLoading(false);
      });

    // 사용자 닉네임 가져오기
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
  }, [bno]);

  const handleSubmitModify = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const modifiedNotice = {
      bno: formData.get('bno'),
      title: formData.get('title'),
      content: formData.get('content'),
      writer: dto.writer
    };

    fetch('http://localhost:8080/notice/modify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(modifiedNotice)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('수정된 공지사항:', data);
      window.location.href = `/notice/read/${bno}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleSubmitRemove = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const noticeToDelete = {
      bno: formData.get('bno'),
      writer: dto.writer
    };

    fetch('http://localhost:8080/notice/remove', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noticeToDelete)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('삭제된 공지사항:', data);
      window.location.href = '/notice/list';
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="modify-form-container">
      <h1>공지사항 수정</h1>
      <form onSubmit={handleSubmitModify}>
        <input type="hidden" name="bno" value={dto.bno} />
        <div>
          <input type="text" placeholder="Title" name="title" defaultValue={dto.title} />
        </div>
        <div>
          <textarea placeholder="Content" name="content" defaultValue={dto.content}></textarea>
        </div>
        <div>
          <p><strong>Writer:</strong> {dto.writer}</p>
        </div>
        <div className="button-group">
          <button type="button" onClick={() => navigate('/notice/list')}>목록</button>
          <input type="submit" value="수정" />
          <form onSubmit={handleSubmitRemove} className="remove-form">
            <input type="hidden" name="bno" value={dto.bno} />
            <input type="hidden" name="writer" value={dto.writer} />
            <input type="submit" value="삭제" />
          </form>
        </div>
      </form>
    </div>
  );
};

export default ModifyForm;

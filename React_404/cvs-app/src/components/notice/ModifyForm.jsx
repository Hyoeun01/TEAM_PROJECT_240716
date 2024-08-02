import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ModifyForm.css'; // CSS 파일 import

const ModifyPage = () => {
  const { bno } = useParams();
  const navigate = useNavigate();
  const [dto, setDto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 공지사항 데이터 가져오기
    fetch(`http://localhost:8080/notice/read/${bno}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
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
  }, [bno]);

  const handleSubmitModify = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const modifiedNotice = {
      bno: formData.get('bno'),
      title: formData.get('title'),
      content: formData.get('content'),
      writer: dto.writer,
      reg_date: dto.reg_date // 작성일 포함
    };

    fetch('http://localhost:8080/notice/modify', {
      method: 'PUT',
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
      navigate(`/notice/read/${bno}`);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleDelete = () => {
    const noticeToDelete = {
      bno: dto.bno,
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
      navigate('/notice/list');
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
          <input type="text" placeholder="제목" name="title" defaultValue={dto.title} />
        </div>
        <div>
          <textarea placeholder="내용" name="content" defaultValue={dto.content}></textarea>
        </div>
        <div>
          <p><strong>작성자:</strong> {dto.writer}</p>
        </div>
        <div className="button-group">
          <button type="button" onClick={() => navigate('/notice/list')}>목록</button>
          <input type="submit" value="수정" />
          <button type="button" onClick={handleDelete}>삭제</button>
        </div>
      </form>
    </div>
  );
};

export default ModifyPage;

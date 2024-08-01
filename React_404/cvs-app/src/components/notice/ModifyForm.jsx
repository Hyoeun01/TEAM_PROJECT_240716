import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ModifyForm = () => {
  const { bno } = useParams();
  const [dto, setDto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/notice/read/${bno}`) // 절대 경로로 변경
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
  }, [bno]);

  const handleSubmitModify = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const modifiedNotice = {
      bno: formData.get('bno'),
      title: formData.get('title'),
      content: formData.get('content'),
      writer: formData.get('writer')
    };

    fetch('http://localhost:8080/notice/modify', { // 절대 경로로 변경
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
      writer: formData.get('writer')
    };

    fetch('http://localhost:8080/notice/remove', { // 절대 경로로 변경
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
    <div>
      <h1>Notice List</h1>
      <form onSubmit={handleSubmitModify}>
        <input type="hidden" name="bno" value={dto.bno} />
        <div>
          <input type="text" placeholder="title" name="title" defaultValue={dto.title} />
        </div>
        <div>
          <textarea placeholder="content" name="content" defaultValue={dto.content}></textarea>
        </div>
        <div>
          <input type="text" placeholder="writer" name="writer" defaultValue={dto.writer} readOnly />
        </div>
        <div>
          <button type="button" onClick={() => window.location.href='/notice/list'}>목록</button>
          <input type="submit" value="수정" />
        </div>
      </form>

      <form onSubmit={handleSubmitRemove}>
        <input type="hidden" name="bno" value={dto.bno} />
        <input type="hidden" name="writer" value={dto.writer} />
        <input type="submit" value="삭제" />
      </form>
    </div>
  );
};

export default ModifyForm;
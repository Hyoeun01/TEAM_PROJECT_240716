import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReadPage.css'; // CSS 파일 import

const ReadPage = () => {
  const { bno } = useParams();
  const navigate = useNavigate();
  const [dto, setDto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (bno) {
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
          setError(error);
          setLoading(false);
        });

      // 사용자 권한 확인하기
      fetch('http://localhost:8080/members/checkAdmin', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}` // 토큰을 헤더에 포함
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(roleData => {
          console.log('Role data:', roleData); // 디버깅용 로그
          setIsAdmin(roleData.isAdmin); // roleData에서 isAdmin 값을 직접 사용
        })
        .catch(error => {
          console.error('Error fetching user role:', error);
        });
    }
  }, [bno]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!dto) return <p>No notice found.</p>;

  return (
    <div className="read-page-container">
      <h1>상세내용</h1>
      <div>
        <input type="hidden" name="bno" value={dto.bno} />
      </div>
      <div>
        <input type="text" name="title" value={dto.title} readOnly />
      </div>
      <div>
        <textarea value={dto.content} readOnly></textarea>
      </div>
      <div>
       
        <p><strong>Writer:</strong> {dto.writer}</p>
      </div>
      <div className="buttons-container">
        <button className="center-button" onClick={() => navigate('/notice/list')}>목록</button> 
        {isAdmin && (
          <button className="right-button" onClick={() => navigate(`/notice/modify/${dto.bno}`)}>수정</button> 
        )}
      </div>
    </div>
  );
};

export default ReadPage;

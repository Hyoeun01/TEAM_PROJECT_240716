import React, { useEffect, useState } from 'react';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    fetch('/notice/list')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched notices:', data); // 데이터 확인
        setNotices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>; // 로딩 상태 표시
  if (error) return <p>Error: {error.message}</p>; // 에러 상태 표시

  return (
    <div>
      <h1>Notice List</h1>
      <ul>
        {notices.length > 0 ? notices.map(notice => (
          <li key={notice.bno}>{notice.title}</li>
        )) : <p>No notices found.</p>}
      </ul>
    </div>
  );
}

export default NoticeList;


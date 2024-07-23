import React, { useEffect, useState } from 'react';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch('http://localhost:8080/notice/list') // 절대 경로로 변경
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched notices:', data); 
        setNotices(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching notices:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error: {error.message}</p>; 

  return (
    <div>
      <h1>Notice List</h1>
      <ul>
        {notices.length > 0 ? notices.map(notice => (
          <li key={notice.bno}>
            <a href={`/notice/read/${notice.bno}`}>{notice.title}</a>
          </li>
        )) : <p>No notices found.</p>}
      </ul>
      <a href="/notice/register"><button>글쓰기</button></a>
    </div>
  );
}

export default NoticeList;

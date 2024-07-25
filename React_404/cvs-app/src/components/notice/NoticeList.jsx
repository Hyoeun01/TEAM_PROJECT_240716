import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const loginResponse = await axios.get('http://localhost:8080/members/checkLogin', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Login response:', loginResponse.data);

        if (loginResponse.data.isLoggedIn) {
          try {
            const userResponse = await axios.get('http://localhost:8080/members/checkAdmin', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            console.log('Admin check response:', userResponse.data);
            setIsAdmin(userResponse.data.isAdmin);
          } catch (adminError) {
            console.error('Error checking admin status:', adminError);
          }
        } else {
          console.log('User is not logged in');
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        setIsAdmin(false);
      }
    };

    const fetchNotices = async () => {
      try {
        const response = await fetch('http://localhost:8080/notice/list');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
    fetchNotices();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Notice List</h1>
      <ul>
        {notices.length > 0 ? notices.map(notice => (
          <li key={notice.bno}>
            <a href={`http://localhost:8080/notice/read/${notice.bno}`}>{notice.title}</a>
          </li>
        )) : <p>No notices found.</p>}
      </ul>
      {isAdmin && (
        <a href="http://localhost:8080/notice/register"><button>글쓰기</button></a>
      )}
    </div>
  );
}

export default NoticeList;

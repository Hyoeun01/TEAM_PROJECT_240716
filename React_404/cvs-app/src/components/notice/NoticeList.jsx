import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoticeList = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [responseDTO, setResponseDTO] = useState({
    page: 1,
    size: 10,
    total: 0,
    start: 1,
    end: 1,
    prev: false,
    next: false
  });

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
        const response = await axios.get('http://localhost:8080/notice/list');
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const data = response.data;
        setNotices(data);
        setResponseDTO(data.responseDTO); // 서버에서 반환된 페이지네이션 데이터 설정
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    checkUserStatus();
    fetchNotices();
  }, []);

  const onChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  const onSearch = () => {
    console.log('Search clicked');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pageDiv = (responseDTO) => {
    let arr = [];
    for (let i = responseDTO.start; i <= responseDTO.end; i++) {
      arr.push(
        <li key={i} className={responseDTO.page === i ? 'page-item active' : 'page-item'}>
          <a className="page-link" data-num={i}>{i}</a>
        </li>
      );
    }
    return arr;
  };

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
      <div className="float-end">
        <ul className="pagination flex-wrap">
          {responseDTO.prev &&
            <li className="page-item">
              <a className="page-link" data-num={responseDTO.start - 1}>Previous</a>
            </li>
          }
          {pageDiv(responseDTO)}
          {responseDTO.next &&
            <li className="page-item">
              <a className="page-link" data-num={responseDTO.end + 1}>Next</a>
            </li>
          }
        </ul>
      </div>
      <div>
        <select name="sk" onChange={onChange}>
          <option value="">-선택-</option>
          <option value="title">제목</option>
          <option value="contents">내용</option>
        </select>
        <input type="text" name="sv" onChange={onChange} />
        <button onClick={onSearch}>검색</button>
      </div>
    </div>
  );
};

export default NoticeList;

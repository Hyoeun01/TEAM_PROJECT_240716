import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './NoticeList.css'; // CSS 파일 import

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
  const [searchKeyword, setSearchKeyword] = useState('');

  const navigate = useNavigate();

  // 날짜를 YYYY-MM-DD 형식으로 포맷팅하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const fetchNotices = async (page = 1, keyword = '') => {
    try {
      const response = await axios.get(`http://localhost:8080/notice/list`, {
        params: { page, size: 10, keyword }
      });
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      const data = response.data;

      setNotices(data.dtoList || []);
      setResponseDTO({
        page: data.page,
        size: data.size,
        total: data.total,
        start: data.start,
        end: data.end,
        prev: data.prev,
        next: data.next
      });
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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

        if (loginResponse.data.isLoggedIn) {
          try {
            const userResponse = await axios.get('http://localhost:8080/members/checkAdmin', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
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

    checkUserStatus();
    fetchNotices();
  }, []);

  const handlePageChange = (page) => {
    setLoading(true);
    fetchNotices(page, searchKeyword);
  };

  const onChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const onSearch = () => {
    setLoading(true);
    fetchNotices(1, searchKeyword);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pageDiv = () => {
    let arr = [];
    for (let i = responseDTO.start; i <= responseDTO.end; i++) {
      arr.push(
        <li key={i} className={`page-item ${responseDTO.page === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }
    return arr;
  };

  return (
    <div className="notice-list-container">
      <h1>공지사항</h1>
      <div className="search-bar">
        <select name="sk" onChange={onChange}>
          <option value="">-선택-</option>
          <option value="title">제목</option>
          <option value="contents">내용</option>
        </select>
        <input type="text" name="sv" onChange={onChange} />
        <button onClick={onSearch}>검색</button>
      </div>
      <table className="notice-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성일</th>
            <th>조회수</th> {/* 조회수 열 추가 */}
          </tr>
        </thead>
        <tbody>
          {notices.length > 0 ? notices.map(notice => (
            <tr key={notice.bno}>
              <td>{notice.bno}</td>
              <td><a href={`http://localhost:3000/notice/read/${notice.bno}`}>{notice.title}</a></td>
              <td>{formatDate(notice.reg_date)}</td> {/* 작성일 포맷팅 */}
              <td>{notice.views || 0}</td> {/* 조회수 표시 */}
            </tr>
          )) : (
            <tr>
              <td colSpan="4">No notices found.</td> {/* 열 수에 맞게 수정 */}
            </tr>
          )}
        </tbody>
      </table>
      {isAdmin && (
        <button className="write-button" onClick={() => navigate('/notice/register')}>글쓰기</button>
      )}
      <nav aria-label="Page navigation example" className="pagination-container">
        <ul className="pagination flex-wrap">
          {responseDTO.prev &&
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageChange(responseDTO.start - 1)} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
          }
          {pageDiv()}
          {responseDTO.next &&
            <li className="page-item">
              <button className="page-link" onClick={() => handlePageChange(responseDTO.end + 1)} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
};

export default NoticeList;

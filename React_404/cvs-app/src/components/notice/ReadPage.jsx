import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReadPage = () => {
  const { bno } = useParams();
  const navigate = useNavigate();
  const [dto, setDto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (bno) {
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
    }
  }, [bno]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!dto) return <p>No notice found.</p>;

  return (
    <div>
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
        <input type="text" placeholder="writer" name="writer" value={dto.writer} readOnly />
      </div>
      <div>
        <button onClick={() => navigate('/notice/list')}>목록</button>
        <a href={`/notice/modify/${dto.bno}`}><button>수정</button></a>
      </div>
    </div>
  );
};

export default ReadPage;

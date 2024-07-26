import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import reviewService from '../../service/review.service';

const Read = () => {
    const { rno } = useParams();
    const [review, setReview] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
  
    useEffect(() => {
        reviewService.getReviewById(rno)
            .then(response => {
                console.log('Review data:', response.data); // 응답 데이터 확인
                setReview(response.data);
            })
            .catch(error => {
                setErrorMessage('리뷰를 불러오는 도중 에러가 발생했습니다.');
                console.error('리뷰 불러오기 실패:', error);
            });
    }, [rno]);
  
    if (!review) {
      return <div>로딩 중...</div>;
    }
  
    return (
      <div className="container">
        {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        <div className='card mt-3'>
          <div className='card-body'>
            <h5 className='card-title'>제목: {review.review_title}</h5>
            <h6 className='card-subtitle mb-2 text-muted'>작성자: {review.nickname}</h6>
            <p className='card-text'>내용: {review.review_exp}</p>
            <button className='btn btn-primary' onClick={() => navigate('/review/list')}>리뷰 목록으로</button>
          </div>
        </div>
      </div>
    );

}

export default Read;
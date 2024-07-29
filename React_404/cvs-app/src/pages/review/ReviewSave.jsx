import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import reviewService from '../../service/review.service';
import Review from '../../models/Review';

const ReviewSave = () => {
  const [review, setReview] = useState(new Review(0, '', '', '', 0, '', ''));
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { p_id } = useParams(); // URL에서 productId를 가져옴

  useEffect(() => {
    console.log("p_id from URL:", p_id);
    if (p_id) {
      setReview(prevState => ({
        ...prevState,
        p_id: parseInt(p_id, 10), // 리뷰에 제품 ID를 설정
      }));
    }
  }, [p_id]);

  const saveReview = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!review.review_title || !review.review_exp || !review.nickname || !review.p_id) {
      return;
    }

    reviewService.saveReview(review, review.p_id)
      .then(response => {
        console.log('리뷰 저장 성공:', response.data);
        navigate(`/productView/${p_id}`); // 저장 후 제품 상세 페이지로 이동
      })
      .catch(error => {
        setErrorMessage('리뷰 작성 중 에러 발생.');
        console.error('리뷰 저장 실패:', error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <form noValidate onSubmit={saveReview} className={submitted ? 'was-validated' : ''}>
        <div className='form-group row'>
          <label htmlFor='review_title' className='col-sm-2 col-form-label'>제목: </label>
          <div className='col-sm-10'>
            <input
              type='text'
              name='review_title'
              placeholder='제목을 입력해주세요.'
              className='form-control'
              value={review.review_title}
              onChange={handleChange}
              required
            />
            <div className='invalid-feedback'>필수 항목입니다.</div>
          </div>
        </div>
        <div className='form-group row'>
          <label htmlFor='review_exp' className='col-sm-2 col-form-label'>내용: </label>
          <div className='col-sm-10'>
            <textarea
              name='review_exp'
              placeholder='내용을 입력해주세요.'
              className='form-control'
              value={review.review_exp}
              onChange={handleChange}
              required
            />
            <div className='invalid-feedback'>필수 항목입니다.</div>
          </div>
        </div>
        <div className='form-group row'>
          <label htmlFor='nickname' className='col-sm-2 col-form-label'>작성자: </label>
          <div className='col-sm-10'>
            <input
              type='text'
              name='nickname'
              className='form-control'
              value={review.nickname}
              onChange={handleChange}
              required
            />
            <div className='invalid-feedback'>유저 정보를 불러올 수 없습니다.</div>
          </div>
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>저장하기</button>
          <button type='button' className='btn btn-secondary' onClick={() => navigate(`/productView/${p_id}`)}>닫기</button>
        </div>
      </form>
      {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
    </div>
  );
};

export default ReviewSave;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Review from '../../models/Review';
import reviewService from '../../service/review.service';

const ReviewSave = () => {
  const [review, setReview] = useState(new Review(0, '', '', '', 0, '', ''));
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const saveReview = (e) => {
    e.preventDefault();
    setSubmitted(true);

    if (!review.review_title || !review.review_exp || !review.nickname || !review.p_id) {
      return;
    }

    // axios.post('/review', review)
    reviewService.saveReview(review)
      .then(response => {
        console.log('리뷰 저장 성공:', response.data);
        navigate('/review/list'); // 저장 후 리뷰 목록 페이지로 이동
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
        <div className='form-group row'>
          <label htmlFor='p_id' className='col-sm-2 col-form-label'>제품 ID: </label>
          <div className='col-sm-10'>
            <input
              type='text'
              name='p_id'
              className='form-control'
              value={review.p_id}
              onChange={handleChange}
              required
            />
            <div className='invalid-feedback'>제품 아이디를 불러올 수 없습니다.</div>
          </div>
        </div>
        <div className='form-group'>
          <button type='submit' className='btn btn-primary'>저장하기</button>
          <button type='button' className='btn btn-secondary' onClick={() => navigate('/review/list')}>닫기</button>
        </div>
      </form>
      {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
    </div>
  );
};

export default ReviewSave;

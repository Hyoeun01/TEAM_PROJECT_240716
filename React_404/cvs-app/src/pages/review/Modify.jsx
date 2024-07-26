import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import reviewService from '../../service/review.service';
import ReviewDelete from '../../components/ReviewDelete';

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

    useEffect(() => {
        reviewService.modifyReview(rno, review)
            .then(response => {
                console.log('리뷰 수정 성공:', response.data);
                navigate('/review/read/' + rno);
            })
            .catch(error => {
                setErrorMessage('리뷰 수정 중 에러 발생.');
                console.error('리뷰 저장 실패:', error);
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
                    <form>
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
                        <button className='btn btn-primary' type='submit'>수정완료</button>
                        <button className='btn btn-secondary' onClick={() => navigate('/review/list')}>목록으로</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Read;

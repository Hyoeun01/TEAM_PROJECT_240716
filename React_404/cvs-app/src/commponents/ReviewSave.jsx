import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Review from '../models/Review';
import {Modal} from 'react-bootstrap';
import reviewService from '../service/review.service';

const ReviewSave = forwardRef((props, ref) => {
    const [review, setReview] = useState(new Review(0, '', '', '', 0, '', ''));
    const [errorMessage, setErrorMessage] = useState('');
    const [show, setShow] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useImperativeHandle(ref, () => ({
        showReviewModal() {
            setTimeout(() => setShow(true), 0);
        }
    }));

    useEffect(() => {
        setReview(props.review);
        console.log(props.review);
    }, [props.review]);

    const saveReview = (e) => {
        e.preventDefault();
        setSubmitted(true);

        if(!review.review_title || !review.review_exp || !review.user_nickname || !review.p_id) {
            return;
        }

        reviewService.saveReview(review)
        .then((response) => {
            props.onSaved(response.data);
            setShow(false);
            setSubmitted(false);
        })
        .catch((err) => {
            setErrorMessage('리뷰 작성 중 에러 발생.');
            console.log(err);
        });
        setReview(new Review(0, '', '', '', 0, '', ''));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setReview((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };

    return(
        <Modal show={show}>
            <form noValidate onSubmit={saveReview} className={submitted ? 'was-validated' : ''}>
                <div className='modal-header'>
                    <h5 className='modal-title'>리뷰 작성</h5>
                    <button type='button' className='btn-close' onClick={() => setShow(false)}></button>
                </div>

                <div className='modal-body'>
                    {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}

                    <div className='form-group'>
                        <label htmlFor='review_title'>제목: </label>
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
                    <div className='form-group'>
                        <label htmlFor='review_exp'>내용: </label>
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
                    <div className='form-group'>
                        <label htmlFor='nickname'>작성자: </label>
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
                    <div className='form-group'>
                        <label htmlFor='p_id'>제품 ID: </label>
                        <input
                            type='number'
                            name='p_id'
                            className='form-control'
                            value={review.p_id}
                            onChange={handleChange}
                            required
                        />
                        <div className='invalid-feedback'>제품 아이디를 불러올 수 없습니다.</div>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type='button' className='btn btn-secondary' onClick={() => setShow(false)}>
                        닫기
                    </button>
                    <button type='submit' className='btn btn-primary'>
                        저장하기
                    </button>
                </div>
            </form> 
        </Modal>
    )
});
export default ReviewSave;
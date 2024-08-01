import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import reviewService from '../../service/review.service';
import ReviewDelete from '../../components/ReviewDelete';

const Read = () => {
    const { rno } = useParams();
    const [review, setReview] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const deleteModalRef = useRef(); // 모달을 참조하기 위한 ref를 생성

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

    const handleDelete = () => {
        reviewService.deleteReview(rno)
            .then(() => {
                navigate(`/productView/${review.product.product_id}`);
            })
            .catch(error => {
                setErrorMessage('리뷰 삭제 도중 에러가 발생했습니다.');
                console.error('리뷰 삭제 실패:', error);
            });
    };

    const formatDate = (dateString) => {
        const formattedDateString = dateString.replace(' ', 'T').replace(/(\.\d+)?$/, ''); // 'T'로 변경하고, 밀리초 제거
        const date = new Date(formattedDateString);

        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }

        return date.toISOString().split('T')[0];
    }

    if (!review) {
        return <div>로딩 중...</div>;
    }

    return (
        <div className="container">
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            <div className='card mt-3'>
                <div className='card-body'>
                    <h5 className='card-title'>제목: {review.review_title}</h5>
                    <p>작성일: {formatDate(review.reg_date)} (마지막 수정일: {formatDate(review.mod_date)})</p>
                    <h6 className='card-subtitle mb-2 text-muted'>작성자: {review.member.nickname}</h6>
                    <p className='card-text'>내용: {review.review_exp}</p>
                    <button className='btn btn-primary' onClick={() => navigate('/review/modify/' + review.rno)}>수정하기</button>
                    <button className='btn btn-secondary' onClick={() => navigate(`/productView/${review.product.product_id}`)}>뒤로가기</button>
                    <button className='btn btn-danger' onClick={() => deleteModalRef.current.showDeleteModal()}>삭제</button>
                </div>
            </div>
            <ReviewDelete ref={deleteModalRef} onConfirmed={handleDelete} />
        </div>
    );
}

export default Read;

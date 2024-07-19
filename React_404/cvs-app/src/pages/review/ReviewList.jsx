import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux';
import reviewService from '../../service/review.service';
import Review from '../../models/Review';

const AddReview=()=>{
    const [reviewList, setReviewList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [quantity, setQuantity] = useState(0);

    useEffect(()=>{
        reviewService.getAllReviews().then((response)=>{
            setReviewList(response.data);
        });
    }, []);

    const handleChange=(e)=>{
        setQuantity(e.target.value);
        console.log(quantity);
    }

    const review = (review) => {

    const review = new Review(review.rno, quantity);
    console.log(review);
    reviewService.saveReview(review)
        .then(()=>{
            setInfoMessage('리뷰 등록 완료.');
        })
        .catch((err)=>{
            setErrorMessage('오류 발생.');
            console.log(err);
        });
    };

    return(
        <div className="mt-3">
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            {infoMessage && <div className='alert alert-success'>{infoMessage}</div>}
            <div>
                {reviewList.map((item))}
            </div>
        </div>
    )
}
export default AddReview;
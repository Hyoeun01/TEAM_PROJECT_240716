import React, {useState, useEffect} from "react";
import reviewService from '../../service/review.service';
import { Link } from "react-router-dom";

const List = () => {
    const [reviewList, setReviewList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');
    const [quantity, setQuantity] = useState(0);

    useEffect(()=>{
        reviewService.getAllReviews().then((response)=>{
            setReviewList(response.data);
        });
    }, []);

    const formatDate = (dateString) => {
        // 원래 형식을 'YYYY-MM-DD HH:MM:SS.ssssss'에서 'YYYY-MM-DDTHH:MM:SS.sssZ' 형식으로 변환
        const formattedDateString = dateString.replace(' ', 'T').replace(/(\.\d+)?$/, ''); // 'T'로 변경하고, 밀리초 제거
        const date = new Date(formattedDateString);

        // 유효한 날짜인지 확인
        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }

        // 날짜를 YYYY-MM-DD 형식으로 변환
        return date.toISOString().split('T')[0];
    }

    return(
        <div className="mt-3">
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            {infoMessage && <div className='alert alert-success'>{infoMessage}</div>}
            <div>
                {reviewList.map((item, ind) => (
                    <div key={item.id} className='card home-card'>
                    <div className='card-body'>
                        <div className='card-title text-uppercase'>
                            <Link to={`/review/read/${item.rno}`} >{item.review_title}</Link>
                            <p>{formatDate(item.reg_date)}(수정일: {formatDate(item.mod_date)})</p>
                        </div>
                        <div className='card-subtitle text-muted'>{item.nickname}</div>
                        <div className='card-subtitle text-muted' style={{
                            overflow:"hidden", 
                            textOverflow:"ellipsis", 
                            whiteSpace:"nowrap",
                            height:"25px", 
                            width:"99%"
                        }}>
                            {item.review_exp}
                        </div>
                    </div>
                    <Link to={`/productView/${item.p_id}`}>제품보기</Link>
                </div>
                ))}
            </div>
        {/* <button className="btn btn-primary">
            <Link to={`/review/add`} style={{textDecoration:'none', color:'white'}}>작성</Link>
        </button> */}
        </div>
    )
}
export default List;
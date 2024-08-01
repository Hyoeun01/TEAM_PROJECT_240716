import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./ProductView.css";
import reviewService from '../../service/review.service';
import { Link } from "react-router-dom";

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${id}`)
      .then((result) => {
        setProduct(result.data);
      })
      .catch((error) => {
        console.error("통신 실패:", error);
        setError(error);
      });
  }, [id]);

  useEffect(()=>{
    reviewService.getAllReviews().then((response)=>{
      const filteredReviews = response.data.filter((review) => review.product.product_id === parseInt(id));
      setReviews(filteredReviews);
    });
}, []);

  const handleDelete = async () => {
    if (window.confirm(`${product.product_name} 을(를) 삭제 하시겠습니까?`)) {
      try {
        await axios.delete(`http://localhost:8080/product/${id}`);
        alert(`${product.product_name} 이(가) 삭제되었습니다.`);
        navigate("/productAdmin");
      } catch (error) {
        console.error("물품 정보 삭제 중 오류가 발생했습니다: ", error);
        alert("물품 정보 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/productEdit/${id}`);
  };

  // const handleBack = () => {
  //   navigate(-1);
  // };

  if (error) {
    return (
      <div>제품 정보를 불러오는 중 오류가 발생했습니다: {error.message}</div>
    );
  }

  if (!product) {
    return <div>제품 정보를 불러오는 중입니다...</div>;
  }

  const formatDate = (dateString) => {
    const formattedDateString = dateString.replace(' ', 'T').replace(/(\.\d+)?$/, '');
    const date = new Date(formattedDateString);

    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      <h1>상품 상세 페이지</h1>
      <div className="product-view">
        <div className="product-view-card">
          <img
            className="product-view-img"
            src={`http://localhost:8080/img/${product.product_img}`}
            alt={product.product_name}
          />
        </div>
        <div className="product-view-contents">
          <span className="product-view-name">{product.product_name}</span>
          <hr />
          <span className="product-view-price">
            <b>가격 : </b> {product.price}원
          </span>
          <span className="product-view-content">
            <b>상품 설명 : </b> {product.content}
          </span>
          <span className="product-view-category">
            <b>분류 : </b> {product.category}
          </span>
          <span className="product-view-quantity">
            <b>수량 :</b> {product.total_quantity}
          </span>
          <div className="product-view-buttons">
            <button className="btn_edit" onClick={handleEdit}>
              수정
            </button>
            <button className="btn_delete" onClick={handleDelete}>
              삭제
            </button>
            <button className="btn_back" onClick={() => navigate(`/product/list`)}>
              뒤로가기
            </button>
            <button className="btn_review" onClick={() => navigate(`/review/add/${id}`)}>
              리뷰 작성
            </button>
          </div>
        </div>
      </div>
      <hr />
      <h2>리뷰 목록</h2>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="card home-card">
            <div className="card-body">
              <div className="card-title text-uppercase">
                <Link to={`/review/read/${review.rno}`}>{review.review_title}</Link>
                <p>{review.member.nickname} ｜ {formatDate(review.reg_date)} (수정일: {formatDate(review.mod_date)})</p>
              </div>
              <div className="card-subtitle text-muted" style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                height: "25px",
                width: "99%"
              }}>
                {review.review_exp}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>리뷰가 없습니다.</p>
      )}
    </div>
  );
}

export default ProductView;

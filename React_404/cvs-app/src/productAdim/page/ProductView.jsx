import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./ProductView.css";
import reviewService from '../../service/review.service';
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProductView({ role }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1); // 수량 상태 추가
  const { user } = useAuth();

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
        console.log(`${product.product_name} 삭제 완료`);
        alert(`${product.product_name} 이(가) 삭제되었습니다.`);
        navigate("/productAdmin"); // 물품 페이지로 리다이렉트
      } catch (error) {
        console.error("물품 정보 삭제 중 오류가 발생했습니다:", error);
        alert("물품 정보 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/productEdit/${id}`);
  };

  // 카트에 담는 핸들
  const handleCartClick = async () => {
    // 카트에 담기 확인
    if (window.confirm("카트에 담으시겠습니까?")) {
      try {
        // 카트에 담기 API 요청 (여기서 실제 API 경로로 수정 필요)
        let formData = new FormData();
        formData.append("product_id", id);
        formData.append("quantity", quantity);
        await axios.post(`http://localhost:8080/cart`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // 카트에 담기 성공 시 장바구니로 이동할지 묻는 확인 대화 상자
        if (window.confirm("카트로 가시겠습니까?")) {
          navigate("/cart"); // 카트 페이지로 리다이렉트
        } else {
          alert("카트 이동이 취소되었습니다.");
        }
      } catch (error) {
        console.error("카트에 담는 중 오류가 발생했습니다:", error);
        alert("카트에 담는 중 오류가 발생했습니다.");
      }
    }
  };

  // 구매 수량 정하기
  const handleQuantityChange = (e) => {
    // 수량을 입력받을 때 숫자만 허용
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

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
          {role === "ADMIN" && (
            <span className="product-view-quantity">
              <b>수량 :</b> {product.total_quantity}
            </span>
          )}

          <div className="product-view-buttons">
            {user?.role === "ADMIN" && (
              <>
                <button className="btn_edit" onClick={handleEdit}>
                  수정
                </button>

                <button className="btn_delete" onClick={handleDelete}>
                  삭제
                </button>

                <button
                  className="btn_back"
                  onClick={() => navigate(`/product/list`)}
                >
                  뒤로가기
                </button>
              </>
            )}
            {user?.role === "USER" && (
              <>
                <div className="product-view-cart wrap">
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="quantity-input"
                  />
                  <button className="btn_back" onClick={handleCartClick}>
                    카트에 담기
                  </button>
                  <button className="btn_review" onClick={() => navigate(`/review/add/${id}`)}>
                    리뷰 작성
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <hr/>
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

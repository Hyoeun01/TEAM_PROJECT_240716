import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./ProductView.css";

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const [modalIsOpen, setModalIsOpen] = useState(false); // 모달 상태 추가

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

  const handleDelete = async () => {
    if (window.confirm(`${product.product_name} 을(를) 삭제 하시겠습니까?`)) {
      try {
        await axios.delete(`http://localhost:8080/product/${id}`);

        console.log(`${product.product_name} 학생 정보 삭제 완료`);

        alert(`${product.product_name} 이(가) 삭제되었습니다.`);

        // 페이지를 새로고침하여 최신 상태 반영
        // window.location.reload();
        navigate("/productAdmin"); // 물품 페이지로 리다이렉트
      } catch (error) {
        console.error("물품 정보 삭제 중 오류가 발생했습니다: ", error);
        alert("물품 정보 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handleEdit = () => {
    navigate(`/productEdit/${id}`);
  };

  // 뒤로가기 버튼 클릭 핸들러
  // const handleBack = () => {
  //   navigate(-1); // 이전 페이지로 돌아가기
  // };

  if (error) {
    return (
      <div>제품 정보를 불러오는 중 오류가 발생했습니다: {error.message}</div>
    );
  }

  if (!product) {
    return <div>제품 정보를 불러오는 중입니다...</div>;
  }

  // 카트 담을시 창 띄우기
  const handleCartClick = async () => {
    if (window.confirm("카트에 담으시겠습니까?")) {
      try {
        // 카트에 담기 API 요청 (여기서 실제 API 경로로 수정 필요)
        await axios.post(`http://localhost:8080/cart`, { productId: id });
        alert("카트에 담았습니다.");
        
        navigate("/productCart"); // 카트 페이지로 리다이렉트
      } catch (error) {
        console.error("카트에 담는 중 오류가 발생했습니다:", error);
        alert("카트에 담는 중 오류가 발생했습니다.");
      }
    }
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
            <button
              className="btn_back"
              onClick={() => navigate(`/productAdmin`)}
            >
              뒤로가기
            </button>
          </div>
        </div>
      </div>

      <button className="btn_back" onClick={handleCartClick}>
        카트에 담기
      </button>
    </div>
  );
}

export default ProductView;

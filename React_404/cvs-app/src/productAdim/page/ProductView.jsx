import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./ProductView.css";
// import { Modal } from "react-bootstrap";

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

  // const handleDelete = () => {
  //   axios
  //     .delete(`http://localhost:8080/product/${id}`) // 삭제 요청
  //     .then(() => {
  //       alert("상품이 삭제되었습니다."); // 알림 메시지
  //       navigate("/productAdmin"); // 물품 페이지로 리다이렉트
  //     })
  //     .catch((error) => {
  //       console.error("삭제 실패:", error);
  //       setError(error);
  //     });
  // };

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

  if (error) {
    return (
      <div>제품 정보를 불러오는 중 오류가 발생했습니다: {error.message}</div>
    );
  }

  if (!product) {
    return <div>제품 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div>
      <h1>상품 상세 페이지</h1>
      <p>상품 ID: {id}</p>
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
            <b>가격</b> {product.price}원
          </span>
          <span className="product-view-content">
            <b>상품 설명</b> {product.content}
          </span>
          <span className="product-view-category">
            <b>분류</b> {product.category}
          </span>
          <span className="product-view-quantity">
            <b>수량</b> : {product.total_quantity}
          </span>
          <button className="btn_edit" onClick={handleEdit}>
            수정
          </button>
          <div className="btn">
            <button className="btn_delete" onClick={handleDelete}>
              삭제
            </button>
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductView;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import "./ProductView.css";

function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

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
            src={`/img/product${product.product_img}`}
            alt={product.product_name}
          />
        </div>
        <div className="product-view-contents">
          <span className="product-name">{product.product_name}</span>
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
        </div>
      </div>
    </div>
  );
}
export default ProductView;

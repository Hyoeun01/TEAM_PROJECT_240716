import React, { useState, useEffect } from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onSelect, isSelected, isSelectionMode }) => {
  const [checked, setChecked] = useState(isSelected);

  const onCheckedBox = (e) => {
    onSelect(product.product_id);
    setChecked(!checked);
    console.log(checked);
  };

  const sum = () => {
    onCheckedBox();
  };

  useEffect(() => {
    if (!isSelectionMode) {
      setChecked(false);
    }
  });

  return (
    <div className={`${checked ? "true product-card" : "ttt product-card"}`}>
      {isSelectionMode ? (
        <div className="product-selectable" onClick={(e) => onCheckedBox()}>
          <input
            type="checkbox"
            checked={checked}
            onChange={() => sum()}
            className="product-checkbox"
            onClick={(e) => e.stopPropagation()} // checkbox 클릭 시 이벤트 전파 중지
          />
          <div className="product-header">
            <img
              className="product-img"
              src={`http://localhost:8080/img/${product.product_img}`}
              alt={product.product_name}
            />
          </div>
          <div className="product-contents">
            <span className="product-name">{product.product_name}</span>
            <span className="product-price">{product.price}원</span>
            <span className="product-category">{product.category}</span>
            <span className="product-quantity">
              수량 : {product.total_quantity}
            </span>
          </div>
        </div>
      ) : (
        <Link
          className="product-link"
          to={`/productView/${product.product_id}`}
        >
          <div className="product-header">
            <img
              className="product-img"
              src={`http://localhost:8080/img/${product.product_img}`}
              alt={product.product_name}
            />
          </div>
          <div className="product-contents">
            <span className="product-name">{product.product_name}</span>
            <span className="product-price">{product.price}원</span>
            <span className="product-category">{product.category}</span>
            <span className="product-quantity">
              수량 : {product.total_quantity}
            </span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default ProductCard;

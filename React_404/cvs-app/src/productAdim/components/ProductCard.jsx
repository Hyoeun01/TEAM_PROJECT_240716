import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onSelect, isSelected, isSelectionMode }) => {
  return (
    <div className="product-card">
      {isSelectionMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(product.product_id)}
          className="product-checkbox"
        />
      )}
      <Link className="product-link" to={`/productView/${product.product_id}`}>
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
    </div>
  );
};

export default ProductCard;

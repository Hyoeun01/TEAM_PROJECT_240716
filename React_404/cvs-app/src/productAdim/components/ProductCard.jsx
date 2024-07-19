import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div>
        <img
          className="product-img"
          src={`/img/product${product.product_img}`}
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
  );
};

export default ProductCard;

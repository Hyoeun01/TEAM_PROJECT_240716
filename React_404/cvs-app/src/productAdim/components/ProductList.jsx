import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/product')
      .then(result => {
        console.log("통신 결과 :", result);
        setProducts(result.data);
      })
      .catch(error => {
        console.error("통신 실패:", error);
        setError(error);
      });
  }, []);

  return (
    <div className="product-list">
      <h1>물품 관리</h1>
      {error && <p>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</p>}
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

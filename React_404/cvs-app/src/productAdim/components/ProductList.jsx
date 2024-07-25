import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]); // 모든 제품
  const [displayedProducts, setDisplayedProducts] = useState([]); // 현재 표시된 제품
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // 더 많은 제품이 있는지 여부
  const [page, setPage] = useState(1); // 현재 페이지

  const pageSize = 20; // 한 페이지에 보여줄 제품 개수

  useEffect(() => {
    // 제품 데이터를 가져오는 함수
    const fetchProducts = async () => {
      try {
        const result = await axios.get("http://localhost:8080/product");
        setProducts(result.data);
        setDisplayedProducts(result.data.slice(0, pageSize)); // 초기 표시 제품 설정
        setHasMore(result.data.length > pageSize); // 더보기 버튼을 보여줄지 여부 설정
      } catch (error) {
        console.error("통신 실패:", error);
        setError(error);
      }
    };
    fetchProducts();
  }, []);

  const loadMoreProducts = () => {
    const nextPage = page + 1;
    const nextProducts = products.slice(0, nextPage * pageSize);
    setDisplayedProducts(nextProducts);
    setPage(nextPage);
    setHasMore(products.length > nextPage * pageSize); // 다음 페이지가 있는지 여부 설정
  };

  return (
    <div>
      <h1>물품 관리</h1>
      <Link to="/productAdd">물품 등록하기</Link>
      <div className="product-list">
        {error ? (
          <p>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</p>
        ) : (
          displayedProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} />
          ))
        )}
      </div>
      {hasMore && (
        <div className="text-center">
          <button className="btn btn-outline-pink" onClick={loadMoreProducts}>
            더보기
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;

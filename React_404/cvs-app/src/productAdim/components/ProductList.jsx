import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import "./ProductList.css";

const categories = ["과자", "라면", "아이스크림", "빵", "도시락", "음료수"]; // 카테고리 목록

const ProductList = () => {
  const [products, setProducts] = useState([]); // 모든 제품
  const [displayedProducts, setDisplayedProducts] = useState([]); // 현재 표시된 제품
  const [selectedProducts, setSelectedProducts] = useState(new Set()); // 선택된 제품
  const [isSelectionMode, setIsSelectionMode] = useState(false); // 선택 모드 상태
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // 더 많은 제품이 있는지 여부
  const [page, setPage] = useState(1); // 현재 페이지
  const [selectedCategory, setSelectedCategory] = useState(""); // 선택된 카테고리
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

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
    const nextProducts = filteredProducts().slice(0, nextPage * pageSize);
    setDisplayedProducts(nextProducts);
    setPage(nextPage);
    setHasMore(filteredProducts().length > nextPage * pageSize); // 다음 페이지가 있는지 여부 설정
  };

  const filteredProducts = () => {
    // 선택된 카테고리와 검색어에 따라 제품 필터링
    return products.filter((product) => {
      const matchesCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchesSearchTerm = product.product_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearchTerm;
    });
  };

  useEffect(() => {
    // 카테고리 또는 검색어가 변경될 때마다 페이지 초기화 및 표시 제품 설정
    setPage(1);
    const filtered = filteredProducts().slice(0, pageSize);
    setDisplayedProducts(filtered);
    setHasMore(filteredProducts().length > pageSize);
  }, [selectedCategory, searchTerm, products]);

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(productId)) {
        newSelected.delete(productId); // 이미 선택된 경우 선택 해제
      } else {
        newSelected.add(productId); // 선택 추가
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = async () => {
    if (window.confirm("선택된 제품을 삭제하시겠습니까?")) {
      try {
        await Promise.all(
          [...selectedProducts].map((productId) =>
            axios.delete(`http://localhost:8080/product/${productId}`)
          )
        );
        alert("선택된 제품이 삭제되었습니다.");

        // 삭제 후 제품 목록 갱신
        const updatedProducts = products.filter(
          (product) => !selectedProducts.has(product.product_id)
        );
        setProducts(updatedProducts);
        setDisplayedProducts(updatedProducts.slice(0, pageSize));
        setSelectedProducts(new Set()); // 선택 상태 초기화
        setIsSelectionMode(false); // 선택 모드 해제
        setHasMore(updatedProducts.length > pageSize);
        window.location.reload();
      } catch (error) {
        console.error("제품 삭제 중 오류가 발생했습니다:", error);
        alert("제품 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div>
      <h1>물품 관리</h1>
      <div className="action-buttons">
        <Link to="/productAdd" className="add-product-button">
          물품 등록하기
        </Link>
        <button
          className="btn btn-primary"
          onClick={() => setIsSelectionMode((prevMode) => !prevMode)}
        >
          {isSelectionMode ? "선택 취소" : "선택"}
        </button>
        {isSelectionMode && (
          <button className="btn btn-danger" onClick={handleDeleteSelected}>
            삭제하기
          </button>
        )}
      </div>
      <div className="search-filter">
        <input
          type="text"
          placeholder="제품 이름으로 검색"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <div className="category-filter">
        <button
          className="btn btn-clear"
          onClick={() => setSelectedCategory("")}
        >
          전체 보기
        </button>
        {categories.map((category) => (
          <button
            key={category}
            className={`btn ${
              selectedCategory === category ? "btn-selected" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-list">
        {error ? (
          <p>데이터를 불러오는 중 오류가 발생했습니다: {error.message}</p>
        ) : (
          displayedProducts.map((product) => (
            <ProductCard
              key={product.product_id}
              product={product}
              onSelect={handleSelectProduct}
              isSelected={selectedProducts.has(product.product_id)}
              isSelectionMode={isSelectionMode}
            />
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

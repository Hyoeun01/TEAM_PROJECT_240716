import React, { useEffect, useState } from "react";
import axios from "axios"; // 서버에서 데이터 가져오기
import Header from "../components/Header/Header";
import ProductCard from "../productAdim/components/ProductCard";
import Footer from "../components/Footer/Footer";
import banner from "../assets/images/banner.png";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]); // 상품 데이터 상태
  const [recentProducts, setRecentProducts] = useState([]); // 최근 상품 상태

  useEffect(() => {
    // 서버에서 상품 데이터를 가져오는 함수
    const fetchProducts = async () => {
      try {
        const result = await axios.get("http://localhost:8080/product"); // 실제 API 엔드포인트로 교체
        const fetchedProducts = result.data;

        // 최신 상품 3개를 선택하여 상태에 저장
        const sortedProducts = result.data.sort((a, b) => b.product_id - a.product_id); // 역순으로 보기
        setProducts(sortedProducts);
        setRecentProducts(sortedProducts.slice(0, 5));
      } catch (error) {
        console.error("상품 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home-page">
      <img src={banner} alt="Banner" className="banner" />
      <Header />
      <div className="product-container">
        {recentProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <div className="button-container">
        <Link to="/product/list" className="view-all-button">
          모두보기
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;

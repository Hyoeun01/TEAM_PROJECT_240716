import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Payment from "../components/Payment";

const ProductPayment = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState([]); // 장바구니에 담은 제품 목록 상태 추가
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate 사용

  // useEffect(() => {
  //   const fetchUserInfo = async () => {
  //     const token = localStorage.getItem("token");
  //     try {
  //       const response = await axios.get("/members/login", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       setUserInfo(response.data);
  //       setName(response.data.name || "");
  //     } catch (error) {
  //       console.error("회원 정보 조회 중 오류 발생:", error);
  //       setError("회원 정보를 불러오는 중 오류가 발생했습니다.");
  //     }
  //   };

  //   const fetchCartProducts = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.get("/cart/products", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       setProducts(response.data);
  //     } catch (error) {
  //       console.error("장바구니 상품 조회 중 오류 발생:", error);
  //       setError("장바구니 상품을 불러오는 중 오류가 발생했습니다.");
  //     }
  //   };

  //   fetchUserInfo();
  //   fetchCartProducts();
  // }, []);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:8080/payment", {
  //       cardNumber,
  //       expirationDate,
  //       cvv,
  //       userInfo, // 사용자 정보 포함
  //     });
  //     alert("결제가 완료되었습니다!");
  //   } catch (error) {
  //     console.error("결제 처리 중 오류 발생:", error);
  //     alert("결제 처리 중 오류가 발생했습니다.");
  //   }
  // };

  const handlePayment = (event) => {
    event.preventDefault();
    navigate("/payment");
  };

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!userInfo) {
  //   return <div>회원 정보를 불러오는 중입니다...</div>;
  // }

  return (
    <div className="checkout-page">
      <h1>결제 페이지</h1>
      
      {products.length === 0 ? (
        <p>장바구니가 비어있습니다.</p>
      ) : (
        <ul>
          {products.map((product, index) => (
            <li key={index}>
              <p>상품명: {product.name}</p>
              <p>가격: {product.price} 원</p>
              <p>수량: {product.quantity}</p>
            </li>
          ))}
        </ul>
      )}

      <div>
        <Payment />
      </div>
    </div>
  );
};

export default ProductPayment;

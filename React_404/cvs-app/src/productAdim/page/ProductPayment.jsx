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
    <div>
      <h1>결제 페이지</h1>

      <div className="order-section">
        <h3>배송지</h3>

        <form>
          <div>
            <label>받는사람*</label>
            <input type="text" name="recipient" />
          </div>
          <div>
            <label>주소*</label>
            <input type="text" name="address" placeholder="우편번호" />
            <button>주소검색</button>
            <br />
            <input type="text" name="address-detail" placeholder="기본주소" />
            <input
              type="text"
              name="address-extra"
              placeholder="나머지 주소(선택 입력 가능)"
            />
          </div>
          <div>
            <label>휴대전화*</label>
            <select name="phone-prefix">
              <option value="010">010</option>
            </select>
            <input type="text" name="phone-number" />
          </div>
          <div>
            <label>이메일*</label>
            <input type="text" name="email" placeholder="이메일" />
            <input type="text" name="email-domain" placeholder="직접입력" />
          </div>
          <div>
            <label>메시지 선택 (선택사항)</label>
            <select name="message">
              <option value="none">선택 안함</option>
              <option value="birthday">생일축하</option>
            </select>
          </div>
          <div>
            <label>비회원 주문조회 비밀번호</label>
            <input
              type="password"
              name="order-password"
              placeholder="비밀번호"
            />
            <input
              type="password"
              name="order-password-confirm"
              placeholder="비밀번호 확인"
            />
          </div>
        </form>

        <div className="order-summary">
          <h3>주문상품</h3>
          <div className="order-item">
            <span>프리미엄 상추 브러쉬 1입 ----- (+5,500원)</span>
            <span>수량: 1개</span>
            <span>5,500원</span>
          </div>
          <div className="order-total">
            <div>배송비: 3,000원</div>
            <div>최종 결제 금액: 8,500원</div>
          </div>
        </div>
        <div className="payment-section">
          <h3>결제수단</h3>

          <form>
            <div>
              <input type="radio" name="payment-method" value="credit-card" />{" "}
              신용카드
              <input
                type="radio"
                name="payment-method"
                value="kakao-pay"
              />{" "}
              카카오페이
              <input type="radio" name="payment-method" value="payco" /> 페이코
              <input type="radio" name="payment-method" value="tos" /> 토스
            </div>
            <div>
              <label>카드선택</label>
              <select name="card-selection">
                <option value="default">선택해 주세요</option>
              </select>
            </div>
            <div>
              <label>할부기간</label>
              <select name="installment-period">
                <option value="one-time">일시불</option>
              </select>
            </div>
            <div className="payment-agreement">
              <input type="checkbox" name="agree-all" /> 모든 약관 동의
              <div>
                <input type="checkbox" name="agree-payment" /> 결제대행서비스
                약관 동의
                <input type="checkbox" name="agree-shopping" /> 쇼핑몰 이용약관
                동의
                <input type="checkbox" name="agree-privacy" /> 개인정보 수집 및
                이용 동의
              </div>
            </div>
          </form>

          <button className="payment-button">8,500원 결제하기</button>
        </div>
      </div>

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

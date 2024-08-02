import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Payment from "../components/Payment";
import DaumPostcode from "react-daum-postcode";
import "./ProductPayment.css";

const ProductPayment = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [postcode, setPostcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [jibunAddress, setJibunAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  const [guide, setGuide] = useState("");
  const [showPostcode, setShowPostcode] = useState(false); // DaumPostcode 모달 표시 여부
  const navigate = useNavigate(); // useNavigate 사용
  // 체크박스 정의
  const [isAgreeAll, setIsAgreeAll] = useState(false);
  const [isAgreePayment, setIsAgreePayment] = useState(false);
  const [isAgreeShopping, setIsAgreeShopping] = useState(false);
  const [isAgreePrivacy, setIsAgreePrivacy] = useState(false);

  // 우편번호 검색 결과 처리 함수
  const handlePostcodeComplete = (data) => {
    const roadAddr = data.roadAddress;
    let extraRoadAddr = "";

    if (data.bname && /[동|로|가]$/g.test(data.bname)) {
      extraRoadAddr += data.bname;
    }
    if (data.buildingName && data.apartment === "Y") {
      extraRoadAddr +=
        extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
    }
    if (extraRoadAddr !== "") {
      extraRoadAddr = " (" + extraRoadAddr + ")";
    }

    setPostcode(data.zonecode);
    setRoadAddress(roadAddr);
    setJibunAddress(data.jibunAddress);
    setExtraAddress(extraRoadAddr);

    if (data.autoRoadAddress) {
      setGuide(
        "(예상 도로명 주소 : " + data.autoRoadAddress + extraRoadAddr + ")"
      );
    } else if (data.autoJibunAddress) {
      setGuide("(예상 지번 주소 : " + data.autoJibunAddress + ")");
    } else {
      setGuide("");
    }

    setShowPostcode(false); // 모달 닫기
  };

  // 결제 처리 함수
  const handlePayment = (event) => {
    event.preventDefault();
    navigate("/payment");
  };

  // 결제 수단 변경 처리 함수
  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  // 모든 약관 동의 체크박스의 상태를 변경하는 함수입니다.
  const handleAgreeAllChange = (e) => {
    const checked = e.target.checked;
    setIsAgreeAll(checked);
    setIsAgreePayment(checked);
    setIsAgreeShopping(checked);
    setIsAgreePrivacy(checked);
  };

  return (
    <div>
      <h1>결제 페이지</h1>

      <div className="order-section">
        <h3>배송지</h3>

        <form>
          <label>받는사람*</label>
          <input type="text" name="recipient" />
          <label>주소*</label>
          <input
            type="text"
            name="address"
            placeholder="우편번호"
            value={postcode}
            readOnly
          />
          <button type="button" onClick={() => setShowPostcode(true)}>
            주소검색
          </button>
          <br />
          <input
            type="text"
            name="address-detail"
            placeholder="기본주소"
            value={roadAddress}
            readOnly
          />
          <input
            type="text"
            name="address-extra"
            placeholder="나머지 주소(선택 입력 가능)"
            value={extraAddress}
            readOnly
          />
          <span>{guide}</span>
          <label>휴대전화*</label>
          <input type="text" name="phone-number" />
          <label>이메일*</label>
          <input type="email" name="email" placeholder="이메일" />
          <select name="message" className="message_ssj">
            <option value="none">-- 메세지 선택 (선택사항) --</option>
            <option value="birthday">배송 전 연락바랍니다.</option>
            <option value="delivery">집 앞에 나둬 주세요.</option>
            <option value="contact">배송 전 연락 바랍니다.</option>
            <option value="bell">벨 누르지 마세요.</option>
          </select>
        </form>
        <div className="order-summary">
          <h3>주문상품</h3>
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
        </div>
        <div className="payment-section">
          <h3>결제수단</h3>

          <form>
            <input
              type="radio"
              name="payment-method"
              value="credit-card"
              checked={selectedPaymentMethod === "credit-card"}
              onChange={handlePaymentMethodChange}
            />
            신용카드
            <input
              type="radio"
              name="payment-method"
              value="non-pay"
              onChange={handlePaymentMethodChange}
            />
            무통장입금
            {selectedPaymentMethod === "non-pay" && (
              <div>부산은행 112-2068-9989-03 서상준</div>
            )}
            <div className="payment-agreement">
              <input
                type="checkbox"
                id="agree-all"
                checked={isAgreeAll}
                onChange={handleAgreeAllChange}
              />
              <label htmlFor="agree-all">모든 약관 동의</label>

              <div className="mini_checkbox">
                <input
                  type="checkbox"
                  id="agree-payment"
                  checked={isAgreePayment}
                  onChange={(e) => setIsAgreePayment(e.target.checked)}
                />
                <label htmlFor="agree-payment">결제대행서비스 약관 동의</label>

                <input
                  type="checkbox"
                  id="agree-shopping"
                  checked={isAgreeShopping}
                  onChange={(e) => setIsAgreeShopping(e.target.checked)}
                />
                <label htmlFor="agree-shopping">쇼핑몰 이용약관 동의</label>

                <input
                  type="checkbox"
                  id="agree-privacy"
                  checked={isAgreePrivacy}
                  onChange={(e) => setIsAgreePrivacy(e.target.checked)}
                />
                <label htmlFor="agree-privacy">
                  개인정보 수집 및 이용 동의
                </label>

              </div>
            </div>
          </form>
        </div>
      </div>

      <Payment />

      {/* 모달창 */}
      {showPostcode && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="modal-close"
              onClick={() => setShowPostcode(false)}
            >
              &times;
            </span>
            <DaumPostcode onComplete={handlePostcodeComplete} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPayment;

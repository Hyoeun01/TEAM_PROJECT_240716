import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Payment from "../components/Payment2";
import CartItem from "../../cart/components/CartItem";

const ProductPayment2 = () => {
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [products, setProducts] = useState([]); // 장바구니에 담은 제품 목록 상태 추가
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // useNavigate 사용
  const [carts, setCarts] = useState([]);
  const [totalPrice, setTotalPrice] = useState([]);
  const [deliveryFee, setDeliveryFee] = useState();
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [payment, setPayment] = useState("");

  useEffect(() => {
    fetchUserInfo();
    fetchCartProducts();
  }, []);
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("/members/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUserInfo(response.data);
      setName(response.data.nickname || "");
    } catch (error) {
      console.error("회원 정보 조회 중 오류 발생:", error);
      setError("회원 정보를 불러오는 중 오류가 발생했습니다.");
    }
  };

  const fetchCartProducts = () => {
    setDeliveryFee(2500);
    axios
      .get(`http://localhost:8080/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setCarts(result.data);
        getTotalPrice(result.data);
      })
      .catch((error) => {
        console.error("통신 실패:", error);
        setError(error);
      });
  };
  const getTotalPrice = (data) => {
    let total = 0;
    data.map((cart) => {
      if (cart.purchaseCheck === true) {
        total += cart.price * cart.quantity;
      }
    });
    setTotalPrice(total);
  };

  const cartsDelete = (cart_id) => {
    setCarts(carts.filter((cart) => cart.cart_id !== cart_id));
    getTotalPrice(carts);
  };
  const quantitysChange = (cart_id, quantity) => {
    carts.map((cart) => {
      if (cart.cart_id === cart_id) {
        cart.quantity = quantity;
      }
    });
    setCarts(carts);
    getTotalPrice(carts);
  };
  const checkedChange = (cart_id) => {
    axios.put(`http://localhost:8080/cart/${cart_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    carts.map((cart) => {
      if (cart.cart_id === cart_id) {
        cart.purchaseCheck = !cart.purchaseCheck;
        console.log(cart_id, cart.purchaseCheck);
      }
    });
    setCarts(carts);
    getTotalPrice(carts);
  };

  const paySubmit = () => {
    let formData = new FormData();
    formData.append("mid", userInfo.mid);
    formData.append("name", userInfo.nickname);
    formData.append("phone", userInfo.phone);
    formData.append("email", userInfo.email);
    formData.append("address", address);
    console.log(address);
    formData.append("message", message);
    formData.append("totalPrice", totalPrice + deliveryFee);
    formData.append("payment", payment);

    axios
      .post(`http://localhost:8080/purchase`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((result) => {
        setCarts(result.data);
        getTotalPrice(result.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("통신 실패:", error);
        setError(error);
      });
  };

  return (
    <div>
      <h1>결제 페이지</h1>

      <div className="order-section">
        <h3>배송지</h3>

        <form>
          <div>
            <label>받는사람*</label>
            <input
              type="text"
              name="recipient"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>주소*</label>
            <input
              type="text"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="우편번호"
            />
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
              <option value="010">011</option>
              <option value="010">016</option>
              <option value="010">017</option>
              <option value="010">018</option>
              <option value="010">019</option>
            </select>
            -
            <input type="phone" name="phone-number" />-
            <input type="phone2" name="phone-number2" />
          </div>
          <div>
            <label>이메일*</label>
            <input type="email" name="email" placeholder="이메일" />@
            <select name="email2">
              <option value="none">직접입력 </option>
              <option value="naver">naver.com</option>
              <option value="google">google.com</option>
              <option value="daum">daum.net</option>
              <option value="nate">nate.com</option>
            </select>
            <span>
              <input type="text" name="none2" placeholder="직접입력"></input>
            </span>
          </div>
          <div>
            <select name="message" onChange={(e) => setMessage(e.target.value)}>
              <option value="none">-- 메세지 선택 (선택사항) --</option>
              <option value="birthday">생일축하.</option>
              <option value="birthday">집 앞에 나둬 주세요.</option>
              <option value="birthday">배송 전 연락 바랍니다.</option>
              <option value="birthday">벨 누르지 마세요.</option>
            </select>
          </div>
        </form>

        <div className="order-summary">
          <h3>주문상품</h3>
          <div className="order-item">
            {carts.length > 0 ? (
              carts.map((cart) => (
                <CartItem
                  key={cart.cart_id}
                  cart={cart}
                  cartsDelete={cartsDelete}
                  quantitysChange={quantitysChange}
                  checkedChange={checkedChange}
                />
              ))
            ) : (
              <p>장바구니가 비어있습니다.</p>
            )}
          </div>
          <div className="order-total">
            <div>총 상품 가격: {totalPrice}원</div>
            <div>배송비: {deliveryFee}원</div>
            <div>최종 결제 금액: {totalPrice + deliveryFee}원</div>
          </div>
        </div>

        <div className="payment-section">
          <h3>결제수단</h3>

          <form>
            <div>
              <input
                type="radio"
                name="payment-method"
                value="credit-card"
                onClick={(e) => setPayment(e.target.value)}
              />{" "}
              신용카드
              <input
                type="radio"
                name="payment-method"
                value="kakao-pay"
                onClick={(e) => setPayment(e.target.value)}
              />{" "}
              무통장입금
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
        </div>
      </div>

      <div>
        <Payment
          userInfo={userInfo}
          totalPrice={totalPrice + deliveryFee}
          cartLength={carts.length}
        />
        <button onClick={paySubmit}>결제 테스트 버튼</button>
      </div>
    </div>
  );
};

export default ProductPayment2;

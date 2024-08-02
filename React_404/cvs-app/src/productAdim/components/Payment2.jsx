import React, { useEffect } from "react";

const Payment2 = ({ userInfo, totalPrice, cartLength }) => {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);

    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    const { IMP } = window;
    if (!IMP) {
      console.error("IMP 객체가 로드되지 않았습니다.");
      return;
    }

    IMP.init("iamport"); // 실제 IAMPORT 가맹점 식별자로 교체

    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      name: "Konbini 상품" + cartLength + "종",
      amount: totalPrice,
      custom_data: {
        name: "부가정보",
        desc: "세부 부가정보",
      },
      buyer_name: userInfo.nickname,
      buyer_tel: userInfo.phone,
      buyer_email: userInfo.email,
      buyer_addr: "구천면로 000-00",
      buyer_postalcode: "01234",
    };

    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const { success, error_msg } = response;

    if (success) {
      alert("결제 성공");
    } else {
      alert(`결제 실패: ${error_msg}`);
    }
  };

  return (
    <div>
      <button onClick={onClickPayment}>결제하기</button>
    </div>
  );
};

export default Payment2;

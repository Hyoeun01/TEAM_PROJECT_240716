import axios from "axios";
import React, { useEffect, useState } from "react";

const ProductPayment = () => {
    const [name, setName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('/members/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setUserInfo(response.data);
                // 자동으로 사용자 정보 입력 필드에 채우기
                setName(response.data.name || '');
            } catch (error) {
                console.error('회원 정보 조회 중 오류 발생:', error);
                setError('회원 정보를 불러오는 중 오류가 발생했습니다.');
            }
        };

        fetchUserInfo();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:8080/checkout", {
                cardNumber,
                expirationDate,
                cvv,
                userInfo // 사용자 정보 포함
            });
            alert("결제가 완료되었습니다!");
        } catch (error) {
            console.error("결제 처리 중 오류 발생:", error);
            alert("결제 처리 중 오류가 발생했습니다.");
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!userInfo) {
        return <div>회원 정보를 불러오는 중입니다...</div>;
    }

    return (
        <div className="checkout-page">
            <h1>결제 페이지</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">이름:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={userInfo.name || ''}
                        readOnly // 사용자 이름은 읽기 전용으로 설정
                    />
                </div>
                <div>
                    <label htmlFor="cardNumber">카드 번호:</label>
                    <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="expirationDate">만료일:</label>
                    <input
                        type="text"
                        id="expirationDate"
                        name="expirationDate"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cvv">CVV:</label>
                    <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <button type="submit">결제</button>
                </div>
            </form>
        </div>
    );
};

export default ProductPayment;
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ProductAdd.css"; // CSS 파일 이름 수정 필요 시 수정
import { useNavigate } from "react-router-dom";

function ProductAdd({ isLoggedIn, role }) {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [productImg, setProductImg] = useState(null); // 이미지 상태
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();

  // 이미지 파일 변경 핸들러
  const handleChangeImg = () => {
    const file = imgRef.current.files[0];
    console.log(file);
    let fileRead = new FileReader();
    fileRead.readAsDataURL(file);
    fileRead.onloadend = () => {
      setImgFile(fileRead.result);
    };
    setProductImg(file);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (event) => {
    event.preventDefault();

    // 유효성 검사
    if (!productName || !price || !content || !category || !totalQuantity) {
      setError("모든 필드를 채워야 합니다.");
      return;
    }

    if (isNaN(price) || isNaN(totalQuantity)) {
      setError("가격과 수량은 숫자여야 합니다.");
      return;
    }

    // 등록 확인
    if (window.confirm("제품을 등록하시겠습니까?")) {
      const formData = new FormData();
      formData.append("product_name", productName);
      formData.append("price", parseInt(price, 10));
      formData.append("content", content);
      formData.append("category", category);
      formData.append("total_quantity", parseInt(totalQuantity, 10));
      if (productImg instanceof File) {
        formData.append("file", productImg);
      }

      try {
        // 서버 요청
        const response = await axios.post(
          "http://localhost:8080/product",
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setSuccess("제품이 성공적으로 등록되었습니다!");
        setError(null);
        navigate("/product/list");
      } catch (error) {
        console.error("등록 실패:", error);
        setError("제품 등록 중 오류가 발생했습니다.");
        setSuccess(null);
      }
    }
  };

  // 뒤로가기 버튼 클릭 핸들러
  const handleBack = (event) => {
    event.preventDefault();
    navigate(-1);
  };

  return (
    <div>
      <h1>제품 등록 페이지</h1>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="product-edit">
          <div className="product-edit-card">
            <img
              className="product-edit-img"
              src={
                imgFile ? imgFile : "http://localhost:8080/img/placeholder.png"
              } // 이미지 URL 설정
              alt={"상품 이미지"}
            />
          </div>
          <div className="product-edit-contents">
            <label className="product-edit-name">
              제품 이름:
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </label>
            <label className="product-edit-price">
              가격:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
            <label className="product-edit-content">
              상품 설명:
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </label>
            <label className="product-edit-category">
              분류:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">분류를 선택하세요</option>
                <option value="과자">과자</option>
                <option value="라면">라면</option>
                <option value="아이스크림">아이스크림</option>
                <option value="빵">빵</option>
                <option value="도시락">도시락</option>
                <option value="음료수">음료수</option>
              </select>
            </label>
            <label className="product-edit-quantity">
              수량:
              <input
                type="number"
                value={totalQuantity}
                onChange={(e) => setTotalQuantity(e.target.value)}
                required
              />
            </label>
            <label className="product-edit-image">
              이미지:
              <input type="file" onChange={handleChangeImg} ref={imgRef} />
            </label>
            <div className="form-buttons">
              <button type="submit">등록하기</button>
              <button type="button" className="btn_back" onClick={handleBack}>
                뒤로가기
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductAdd;

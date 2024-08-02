import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ProductEdit.css";
import { useNavigate, useParams } from "react-router-dom";

function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/product/${id}`)
      .then((result) => {
        const product = result.data;
        setProductName(product.product_name);
        setPrice(product.price);
        setContent(product.content);
        setCategory(product.category);
        setTotalQuantity(product.total_quantity);
        setProductImg(product.product_img); // 기존 이미지 설정
      })
      .catch((error) => {
        console.error("통신 실패:", error);
        setError("제품 정보를 불러오는 중 오류가 발생했습니다.");
      });
  }, [id]);

  const handleChangeImg = (file) => {
    let fileRead = new FileReader();
    fileRead.readAsDataURL(file);
    fileRead.onloadend = () => {
      setImgFile(fileRead.result);
    };
    setProductImg(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("product_name", productName);
    formData.append("price", parseInt(price, 10));
    formData.append("content", content);
    formData.append("category", category);
    formData.append("total_quantity", parseInt(totalQuantity, 10));
    if (productImg instanceof File) {
      formData.append("file", productImg);
    }

    axios
      .put(`http://localhost:8080/product/${id}`, formData)
      .then((response) => {
        setSuccess("제품이 성공적으로 수정되었습니다!");
        setError(null);
        navigate(`/productView/${id}`);
      })
      .catch((error) => {
        console.error("수정 실패:", error);
        setError("제품 수정 중 오류가 발생했습니다.");
        setSuccess(null);
      });
  };

  // 뒤로가기 버튼 클릭 핸들러
  const handleBack = (event) => {
    event.preventDefault(); // 기본 동작 방지 (폼 제출 방지)
    navigate(-1); // 이전 페이지로 돌아가기
  };

  return (
    <div>
      <h1>제품 수정 페이지</h1>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="product-edit">
          <div className="product-edit-card">
            <img
              className="product-edit-img"
              src={
                imgFile ? imgFile : `http://localhost:8080/img/${productImg}`
              } // 이미지 URL 설정
              alt={productName || "상품 이미지"}
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
              <input
                type="file"
                onChange={(e) => handleChangeImg(e.target.files[0])}
                ref={imgRef}
              />
            </label>
            <div className="form-buttons">
              <button type="submit">수정하기</button>
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

export default ProductEdit;

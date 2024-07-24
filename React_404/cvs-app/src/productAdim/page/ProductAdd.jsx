import React, { useState } from "react";
import axios from "axios";
import "./ProductAdd.css";

function ProductAdd() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [productImg, setProductImg] = useState(null); // 이미지 필드 추가
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  //   const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("price", parseInt(price, 10));
    formData.append("content", content);
    formData.append("category", category);
    formData.append("total_quantity", parseInt(totalQuantity, 10));
    formData.append("file", productImg);

    // const newProduct = {
    //   product_name: productName,
    //   price: parseInt(price, 10), // 문자열을 숫자로 변환
    //   content: content,
    //   category: category,
    //   total_quantity: parseInt(totalQuantity, 10), // 문자열을 숫자로 변환
    //   file: productImg, // 이미지 필드 추가
    // };
    console.log(formData);

    axios
      .post("http://localhost:8080/product", formData)
      .then((response) => {
        setSuccess("제품이 성공적으로 등록되었습니다!");
        setError(null);
        // navigate("/product");
      })
      .catch((error) => {
        console.error("등록 실패:", error);
        setError("제품 등록 중 오류가 발생했습니다.");
        setSuccess(null);
      });
  };

  return (
    <div>
      <h1>제품 등록 페이지</h1>
      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="product-add-form">
        <label>
          제품 이름:
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </label>
        <label>
          가격:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
          상품 설명:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </label>
        <label>
          분류:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">분류를 선택하세요</option>
            <option value="snack">과자</option>
            <option value="nudle">라면</option>
            <option value="ice">아이스크림</option>
            <option value="bread">빵</option>
            <option value="runchBox">도시락</option>
            <option value="drink">음료수</option>
          </select>
        </label>
        <label>
          수량:
          <input
            type="number"
            value={totalQuantity}
            onChange={(e) => setTotalQuantity(e.target.value)}
            required
          />
        </label>
        <label>
          이미지:
          <input
            type="file"
            // value={productImg}
            onChange={(e) => setProductImg(e.target.files[0])}
            required
          />
        </label>
        <button type="submit">등록하기</button>
      </form>
    </div>
  );
}

export default ProductAdd;

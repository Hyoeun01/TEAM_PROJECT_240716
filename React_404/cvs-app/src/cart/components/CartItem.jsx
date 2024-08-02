import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./CartItem.css";

const CartItem = ({ cart, cartsDelete, quantitysChange, checkedChange }) => {
  const naviagte = useNavigate();
  const [quantity, setQuantity] = useState(cart.quantity);
  const [check, setCheck] = useState(cart.purchaseCheck);
  // const [cart,setCart] = useState();
  const [error, setError] = useState(null);

  const quantityChange = (cart_id, quantity) => {
    let formData = new FormData();
    formData.append("cart_id", cart_id);
    formData.append("quantity", quantity);
    axios
      .put(`http://localhost:8080/cart`, formData)
      .then(() => {
        quantitysChange(cart_id, quantity);
      })
      .catch((error) => {
        console.error("quantity 통신 실패:", error);
        setError(error);
      });
  };

  const cartDelete = (cart_id) => {
    axios
      .delete(`http://localhost:8080/cart/${cart_id}`)
      .then(() => {
        alert("상품이 삭제되었습니다.");
        cartsDelete(cart_id);
      })
      .catch((error) => {
        console.error("통신 실패:", error);
        setError(error);
      });
  };
  const handleCheck = (cart_id) =>{
    setCheck(!check);
    checkedChange(cart_id);
  }
  return (
    <div class="content">
      <div class="row">
        <div class="col-md-12 col-lg-12">
          <div class="items">
            <div class="product">
              <div class="row">
                <div class="col-md-1 product-check">
                  <div class="product-check">
                    <input type="checkbox" onChange={(e) => handleCheck(cart.cart_id,e)} checked={check}/>
                  </div>
                </div>
                <div class="col-md-2">
                  <img
                    class="img-fluid mx-auto d-block image"
                    src={"http://localhost:8080/img/" + cart.product_img}
                  />
                </div>
                <div class="col-md-9">
                  <div class="info">
                    <div class="row">
                      <div class="col-md-3 product-name">
                        <div class="product-name">
                          <a href={"/productView/" + cart.product_id}>
                            {cart.product_name}
                          </a>
                        </div>
                      </div>
                      <div class="col-md-2 price">
                        <span>{cart.price}원</span>
                      </div>
                      <div class="col-md-3 quantity">
                        <label for="quantity">수량:</label>
                        <input
                          id="quantity"
                          type="number"
                          max="10"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          class="form-control quantity-input"
                        />
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => quantityChange(cart.cart_id, quantity)}
                        >
                          변경
                        </button>
                      </div>
                      <div class="col-md-2 price">
                        <span>{cart.price * quantity}원</span>
                      </div>
                      <div class="col-md-2 delete">
                        <button
                          className="btn btn-danger"
                          onClick={() => cartDelete(cart.cart_id)}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

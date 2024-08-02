import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem"

const CartList = () =>{
  const [carts, setCarts] = useState([]);
  const [totalPrice,setTotalPrice] = useState([]);
  const [selectedCarts, setSelectedCarts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(()=>{
    axios
    .get(`http://localhost:8080/cart`,{
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((result) => {
      setCarts(result.data);
      getTotalPrice(result.data);
      console.log(result.data);
    }).catch((error) => {
      console.error("통신 실패:", error);
      setError(error);
    });
  },[])

  const getTotalPrice = (data) => {
    let total = 0;
    data.map(cart => {
      if(cart.purchaseCheck === true){
        total += cart.price*cart.quantity
      }
    })
    setTotalPrice(total);
  }

  const cartsDelete = (cart_id) => {
    setCarts(carts.filter((cart)=>cart.cart_id !== cart_id))
    getTotalPrice(carts);
  }
  const quantitysChange = (cart_id, quantity) =>{
    carts.map(cart=>{
      if(cart.cart_id === cart_id){
        cart.quantity = quantity;
      }
    })
    setCarts(carts);
    getTotalPrice(carts);
  }
  const checkedChange = (cart_id) => {
    axios
        .put(`http://localhost:8080/cart/${cart_id}`,{
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
          }});
    carts.map(cart=>{
      if(cart.cart_id === cart_id){
        cart.purchaseCheck = !cart.purchaseCheck;
        console.log(cart_id,cart.purchaseCheck);
      }
    })
    setCarts(carts);
    getTotalPrice(carts);
  }

  return (
    <section class="shopping-cart dark">
    <div className="container">
      <div class="block-heading">
          <h2>장바구니</h2>
          <p></p>
      </div>
      <div className="row">
        <div className="cartItem col-md-8">
        {
          carts.map((cart)=>(
            <CartItem key={cart.cart_id} cart={cart} cartsDelete={cartsDelete} quantitysChange={quantitysChange} checkedChange={checkedChange}/>
          ))
        }
        </div>
        <div class="col-md-4">
          <div class="summary">
            <h3>주문 예상 금액</h3>
            <div class="summary-item"><span class="text">총 상품 가격</span><span class="price">{totalPrice}원</span></div>
            <div class="summary-item"><span class="text">총 할인</span><span class="price">0</span></div>
            <div class="summary-item"><span class="text">배송비</span><span class="price">2500원</span></div>
            <div class="summary-item"><span class="text fs-3 fw-bold">총합</span><span class="price fs-3 fw-bold">{totalPrice+2500}원</span></div>
            <Link to="/productPayment" className="add-product-button">
              구매하기
            </Link>
          </div>
        </div>
      </div>
      
    </div>
    
    </section>
  )
}
export default CartList;
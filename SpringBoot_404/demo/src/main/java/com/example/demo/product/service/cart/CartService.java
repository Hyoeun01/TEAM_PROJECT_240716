package com.example.demo.product.service.cart;

import com.example.demo.product.dto.CartDTO;

import java.util.List;

public interface CartService {

    String  register(CartDTO cartDTO);
    List<CartDTO> getCartListByMid(String mid);
    void modify(CartDTO cartDTO);
    void remove(Long cart_id);
    //void addItemToCart(Long cartId, CartItem cartItem);
}

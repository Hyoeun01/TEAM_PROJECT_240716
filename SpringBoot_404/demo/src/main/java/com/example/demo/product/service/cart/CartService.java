package com.example.demo.product.service.cart;

import com.example.demo.product.dto.CartDTO;

public interface CartService {
    Long register(CartDTO cartDTO);
    CartDTO readOne(Long cart_id);
    void modify(CartDTO cartDTO);
    void remove(Long cart_id);

}

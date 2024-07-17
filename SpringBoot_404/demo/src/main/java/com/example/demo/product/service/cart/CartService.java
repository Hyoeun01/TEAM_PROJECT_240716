package com.example.demo.product.service.cart;

import com.example.demo.product.dto.CartDTO;

import java.util.List;

public interface CartService {

    Long register(CartDTO cartDTO);
    List<CartDTO> selectAll();
    void modify(CartDTO cartDTO);
    void remove(Long cart_id);

}

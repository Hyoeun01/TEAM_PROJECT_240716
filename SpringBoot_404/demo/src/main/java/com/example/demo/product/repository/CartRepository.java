package com.example.demo.product.repository;

import com.example.demo.product.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository  extends JpaRepository<Cart, Long> {
    // 카트를 조회해서 카운트가 10이넘으면 더이상 담을 수 없게 만들기

}

package com.example.demo.product.repository;

import com.example.demo.product.domain.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartRepository  extends JpaRepository<Cart, Long> {
    // cart_id를 조회해서 카운트가 10을 초과하면 register가 불가능하게 만들기
    @Query("select count(c) from Cart c where c.user_id =:user_id")
    long countByUserId(@Param("user_id") String user_id);

}

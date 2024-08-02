package com.example.demo.product.repository;

import com.example.demo.product.domain.Cart;
import com.example.demo.pse.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CartRepository  extends JpaRepository<Cart, Long> {
    // cart_id를 조회해서 카운트가 10을 초과하면 register가 불가능하게 만들기
    @Query("select count(c) from Cart c where c.member =:member")
    long countByUserId(Member member);
    @Query("SELECT c FROM Cart c WHERE c.member.mid =:mid")
    List<Cart> findByMid(String mid);
    @Query("SELECT c FROM Cart c WHERE c.member.mid=:mid AND c.product.product_id=:product_id")
    Optional<Cart> findByMidAndProduct_id(String mid, Long product_id);
    @Query("SELECT c FROM Cart c WHERE c.member.mid=:mid AND c.purchaseCheck=true")
    List<Cart> purchaseList(String mid);
}

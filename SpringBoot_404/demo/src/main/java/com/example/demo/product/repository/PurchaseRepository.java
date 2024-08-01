package com.example.demo.product.repository;

import com.example.demo.product.domain.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
  @Query("SELECT p FROM Purchase p WHERE p.member.mid =: mid")
  List<Purchase> findByMid(String mid);

}

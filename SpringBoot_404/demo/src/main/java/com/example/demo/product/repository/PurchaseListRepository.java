package com.example.demo.product.repository;

import com.example.demo.product.domain.PurchaseList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseListRepository extends JpaRepository<PurchaseList, Long> {
}

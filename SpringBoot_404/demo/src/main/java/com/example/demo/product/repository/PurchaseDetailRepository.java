package com.example.demo.product.repository;

import com.example.demo.product.domain.PurchaseDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchaseDetailRepository extends JpaRepository<PurchaseDetail, Long> {
}

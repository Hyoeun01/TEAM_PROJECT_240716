package com.example.demo.productAdmin.repository;

import com.example.demo.productAdmin.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

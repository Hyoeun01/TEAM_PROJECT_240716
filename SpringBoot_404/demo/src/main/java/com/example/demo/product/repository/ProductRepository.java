package com.example.demo.product.repository;

import com.example.demo.product.domain.Product;
import com.example.demo.product.repository.productSearch.ProductSearch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product,Long> , ProductSearch {
}

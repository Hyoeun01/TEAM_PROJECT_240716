package com.example.demo.product.service;

import com.example.demo.product.domain.Product;

import java.util.List;

public interface ProductService {
    Product saveProduct(Product product);

    List<Product> findAllProducts();
}

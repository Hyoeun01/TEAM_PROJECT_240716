package com.example.demo.product.service;

import com.example.demo.product.domain.Product;

import java.util.List;

public interface ProductService {
    List<Product> findAllProducts();
    Product saveProduct(Product product);
    void deleteProduct(Long id);
    Product findProductById(Long id);

}

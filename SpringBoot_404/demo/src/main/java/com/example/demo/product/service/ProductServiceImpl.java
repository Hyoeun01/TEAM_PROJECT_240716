package com.example.demo.product.service;

import com.example.demo.product.domain.Product;
import com.example.demo.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public Product saveProduct(Product product) {
        product.setProduct_name(product.getProduct_name());
        return productRepository.save(product);
    }
}

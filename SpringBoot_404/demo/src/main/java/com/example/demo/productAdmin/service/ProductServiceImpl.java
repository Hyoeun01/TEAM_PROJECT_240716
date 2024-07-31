package com.example.demo.productAdmin.service;

import com.example.demo.productAdmin.domain.Product;
import com.example.demo.productAdmin.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<Product> findAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product saveProduct(Product product) {
//        Product product = new Product();
//        product.setCategory(productDTO.getCategory());
//        product.setContent(productDTO.getContent());
//        product.setPrice(productDTO.getPrice());
//        product.setProduct_img(productDTO.getProduct_img());
//        product.setProduct_name(productDTO.getProduct_name());
//        product.setTotal_quantity(product.getTotal_quantity());
        return productRepository.save(product);
    }

    @Override
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    @Override
    public Product findProductById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.orElse(null);    }
}

package com.example.demo.product.service.product;

import com.example.demo.product.domain.Product;
import com.example.demo.product.dto.ProductDTO;

import java.util.List;

public interface ProductService {

    List<ProductDTO> getAllProducts(); // 전체 조회

    ProductDTO readProduct(Long product_id); // 상품 상세보기
    List<ProductDTO> readCategory(String category); // 카테고리로 조회

    default ProductDTO entityToDTO(Product product) {
        ProductDTO productDTO = ProductDTO.builder()
                .product_id(product.getProduct_id())
                .product_name(product.getProduct_name())
                .price(product.getPrice())
                .category(product.getCategory())
                .content(product.getContent())
                .total_quantity(product.getTotal_quantity())
//                .quantity(product.getTotal_quantity())
                .product_img(product.getProduct_img())
                .build();

        return productDTO;
    }
}

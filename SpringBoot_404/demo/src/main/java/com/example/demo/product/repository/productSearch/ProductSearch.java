package com.example.demo.product.repository.productSearch;

import com.example.demo.product.dto.ProductDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductSearch {
    Page<ProductDTO> searchAll(String[] types, String keyword, Pageable pageable);
}

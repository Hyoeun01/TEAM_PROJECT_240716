package com.example.demo.product.service.product;

import com.example.demo.product.domain.Product;
import com.example.demo.product.dto.ProductDTO;
import com.example.demo.product.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.modelmapper.ModelMapper;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService{

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Override
    public List<ProductDTO> readAllProducts() {
        return productRepository.findAll().stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO readProduct(Long product_id) {
        Optional<Product> result = productRepository.findById(product_id);
        Product product = result.orElseThrow();
        ProductDTO productDTO = entityToDTO(product);
        return productDTO;
    }

    @Override
    public List<ProductDTO> readCategory(String category) {
        List<Product> products = productRepository.findByCategory(category);
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .collect(Collectors.toList());
    }
}

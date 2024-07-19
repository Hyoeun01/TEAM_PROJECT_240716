package com.example.demo.product.controller;

import com.example.demo.product.dto.ProductDTO;
import com.example.demo.product.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/product")
@Log4j2
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/list")
    @ResponseBody
    public List<ProductDTO> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/read")
    public ProductDTO read(@RequestParam Long product_id) {
        return productService.readProduct(product_id);
    }

}

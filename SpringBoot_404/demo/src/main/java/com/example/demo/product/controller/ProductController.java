package com.example.demo.product.controller;

import com.example.demo.product.dto.ProductDTO;
import com.example.demo.product.service.product.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/product")
@Log4j2
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping("/list")
    public void list() {
    }

    @GetMapping("/read")
    public void read(Long product_id) {
        ProductDTO productDTO = productService.readProduct(product_id);
        log.info(productDTO);
    }

    @PostMapping("/read")
    public void readProduct(Long product_id) {

    }

}

package com.example.demo.product.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductDTO {
    private Long product_id;
    private String product_name;
    private int price;
    private int total_quantity;
    private String category;
    private String content;
    private String product_img;
    private String uuid;
}

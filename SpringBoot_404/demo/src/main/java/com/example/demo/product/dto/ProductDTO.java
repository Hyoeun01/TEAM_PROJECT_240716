package com.example.demo.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {
    private Long product_id;
    private String product_name;
    private int price;
    private int total_quantity;
//    private int quantity;
    private String category;
    private String content;
    private String product_img;
}

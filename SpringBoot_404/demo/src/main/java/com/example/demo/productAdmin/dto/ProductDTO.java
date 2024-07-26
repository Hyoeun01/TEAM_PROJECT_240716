package com.example.demo.productAdmin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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

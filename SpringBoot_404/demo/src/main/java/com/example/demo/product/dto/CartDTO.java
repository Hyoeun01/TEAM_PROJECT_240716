package com.example.demo.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {

    private Long cart_id;
    private String mid;
    private Long product_id;
    private String product_name;
    private String product_img;
    private int price;
    private int quantity;
    private boolean purchaseCheck = true;

}

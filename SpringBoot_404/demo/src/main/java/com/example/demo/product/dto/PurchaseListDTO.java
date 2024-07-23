package com.example.demo.product.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PurchaseListDTO {
    private Long purchase_list_id;
    private Long purchase_id;
    private String user_id;
    private String list;


}

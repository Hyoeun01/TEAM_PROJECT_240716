package com.example.demo.product.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseDTO {
    private Long purchase_id;
    private String purchase_status;
    private String name;
    private String address;
    private String phone;
    private String email;
    private String message;
    private String totalPrice;
    private String mid;
    private Long[] cartArray;
    private LocalDateTime regDate;
    private LocalDateTime modDate;
}

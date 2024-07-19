package com.example.demo.product.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseList {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long purchase_list_id;

    @Column
    private Long purchase_id;

    @Column(length = 20, nullable = false)
    private String user_id;

    @Column
    private String list;
}

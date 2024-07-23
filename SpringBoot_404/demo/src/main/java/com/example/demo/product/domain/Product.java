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

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_id;

    @Column(length = 30, nullable = false)
    private String product_name;

    @Column
    private int price;

    @Column
    private int total_quantity;

    @Column(length = 50, nullable = false)
    private String category;

    @Column(length = 100, nullable = false)
    private String content;

    @Column(length = 50, nullable = false)
    private String product_img;
}

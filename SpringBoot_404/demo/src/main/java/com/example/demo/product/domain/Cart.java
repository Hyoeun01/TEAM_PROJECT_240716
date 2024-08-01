package com.example.demo.product.domain;

import com.example.demo.productAdmin.domain.Product;
import com.example.demo.pse.domain.Member;
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
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cart_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="mid")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="product_id")
    private Product product;

    @Column
    private int quantity;

    public void changeQuantity(int quantity) {
        this.quantity = quantity;
    }
}

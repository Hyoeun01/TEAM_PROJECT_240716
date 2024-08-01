package com.example.demo.product.domain;

import com.example.demo.productAdmin.domain.Product;
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
public class PurchaseDetail {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long purchaseDetailId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="purchase_id")
  private Purchase purchase;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name="product_id")
  private Product product;

  @Column
  private int quantity;

  @Column
  private int discount;
}
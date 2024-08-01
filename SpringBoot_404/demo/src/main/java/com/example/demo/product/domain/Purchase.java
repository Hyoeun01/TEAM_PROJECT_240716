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
public class Purchase {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long purchase_id;

  @Column
  private Long cart_id;

  @Column(length = 20, nullable = false)
  private String user_id;

  @Column
  private int total_price;
}
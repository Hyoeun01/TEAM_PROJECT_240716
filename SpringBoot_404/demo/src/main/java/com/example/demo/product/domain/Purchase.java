package com.example.demo.product.domain;

import com.example.demo.product.dto.PurchaseDTO;
import com.example.demo.pse.domain.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

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
  private String purchase_status;
  @Column
  private String name;
  @Column
  private String address;
  @Column
  private String phone;
  @Column
  private String email;
  @Column
  private String message;
  @Column
  private String totalPrice;
  @CreationTimestamp
  private LocalDateTime regDate;
  @UpdateTimestamp
  private LocalDateTime modDate;

  @ManyToOne
  @JoinColumn(name="mid")
  private Member member;

  @OneToMany
  @JoinColumn(name="purchaseDetailId")
  private List<PurchaseDetail> purchaseDetailList;

  public void changePurchase(PurchaseDTO dto){
    this.email = dto.getEmail();
    this.address = dto.getAddress();
    this.phone = dto.getPhone();
    this.message = dto.getMessage();
    this.name = dto.getName();
  }

  public void changeStatus(PurchaseDTO dto){
    this.purchase_status = dto.getPurchase_status();
  }
}
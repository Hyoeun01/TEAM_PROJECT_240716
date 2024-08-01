package com.example.demo.review.domain;

import com.example.demo.productAdmin.domain.Product;
import com.example.demo.pse.domain.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "review")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rno;

    @Column(name = "review_title", nullable = false)
    private String review_title;

    @Column(name = "review_exp", length = 9999, nullable = false)
    private String review_exp;

    @ManyToOne
    @JoinColumn(name = "mid", referencedColumnName = "mid", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "product_id", nullable = false)
    private Product product;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "reg_date")
    private LocalDateTime reg_date;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "mod_date")
    private LocalDateTime mod_date;

}

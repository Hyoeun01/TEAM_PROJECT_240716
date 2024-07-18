package com.example.demo.domain;

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

    @Column(name = "review_title")
    private String review_title;

    @Column(name = "review_exp")
    private String review_exp;

    @Column(name = "user_nickname")
    private String user_nickname;

    @Column(name = "p_id")
    private Long p_id;

    @Column(name = "reg_date")
    private LocalDateTime reg_date;

    @Column(name = "mod_date")
    private LocalDateTime mod_date;

}

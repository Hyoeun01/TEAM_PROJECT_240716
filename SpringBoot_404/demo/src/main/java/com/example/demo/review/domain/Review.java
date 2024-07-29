package com.example.demo.review.domain;

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

    @Column(name = "review_title")
    private String review_title;

    @Column(name = "review_exp")
    private String review_exp;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "p_id")
    private Long p_id;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "reg_date")
    private LocalDateTime reg_date;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "mod_date")
    private LocalDateTime mod_date;

}

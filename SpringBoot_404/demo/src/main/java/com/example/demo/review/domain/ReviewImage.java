package com.example.demo.review.domain;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "reviewImage")
public class ReviewImage {

    @Id
    @Column(name = "uuid")
    private String uuid;

    @Column(name = "image_name", nullable = false)
    private String image_name;

    @Column(name = "ord", nullable = false)
    private int ord;

    @ManyToOne
    @JoinColumn(name = "rno", referencedColumnName = "rno", nullable = false)
    private Review review;

}

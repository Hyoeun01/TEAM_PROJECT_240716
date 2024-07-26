package com.example.demo.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "reviewImage")
public class ReviewImage {

    @Id
    @Column(name = "uuid")
    private String uuid;

    @Column(name = "image_name")
    private String image_name;

    @Column(name = "ord")
    private int ord;

    @Column(name = "rno")
    private int rno;

}

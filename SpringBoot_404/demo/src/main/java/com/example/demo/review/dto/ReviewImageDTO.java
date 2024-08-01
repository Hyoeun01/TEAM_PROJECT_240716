package com.example.demo.review.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewImageDTO {

    private String uuid;
    private String image_name;
    private int ord;
    private int rno;

}

package com.example.demo.review.service;

import com.example.demo.productAdmin.dto.ProductDTO;
import com.example.demo.review.domain.Review;

import java.util.List;

public interface ReviewService {

    Review saveReview(Review review, Long p_id);

    void deleteReview(Long rno);

    List<Review> findAllReviews();

    Review findReviewById(Long rno);

    Review modifyReview(Review review);

}

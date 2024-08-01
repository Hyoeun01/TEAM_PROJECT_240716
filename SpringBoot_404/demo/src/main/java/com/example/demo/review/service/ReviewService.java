package com.example.demo.review.service;

import com.example.demo.productAdmin.dto.ProductDTO;
import com.example.demo.review.domain.Review;
import com.example.demo.review.domain.ReviewImage;
import com.example.demo.review.dto.ReviewDTO;

import java.util.List;

public interface ReviewService {

    ReviewDTO saveReview(ReviewDTO reviewDTO, Long p_id, String mid);

    void deleteReview(Long rno);

    List<Review> findAllReviews();

    Review findReviewById(Long rno);

    Review modifyReview(Review review);

}

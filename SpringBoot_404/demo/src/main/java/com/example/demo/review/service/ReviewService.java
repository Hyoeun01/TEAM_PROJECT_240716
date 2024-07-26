package com.example.demo.review.service;

import com.example.demo.review.domain.Review;

import java.util.List;

public interface ReviewService {

    Review saveReview(Review review);

    void deleteReview(Long rno);

    List<Review> findAllReviews();

    Review findReviewById(Long rno);

}

package com.example.demo.service;

import com.example.demo.domain.Review;

import java.util.List;

public interface ReviewService {

    Review saveReview(Review review);

    void deleteReview(Long rno);

    List<Review> findAllReviews();

}

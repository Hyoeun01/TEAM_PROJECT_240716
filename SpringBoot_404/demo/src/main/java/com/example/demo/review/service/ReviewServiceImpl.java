package com.example.demo.review.service;

import com.example.demo.productAdmin.dto.ProductDTO;
import com.example.demo.review.repository.ReviewRepository;
import com.example.demo.review.domain.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;

    @Override
    public Review saveReview(Review review, Long p_id) {

        review.setP_id(p_id);
        review.setReg_date(LocalDateTime.now());
        review.setMod_date(LocalDateTime.now());

        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long rno) {

        reviewRepository.deleteById(rno);
    }

    @Override
    public List<Review> findAllReviews() {

        return reviewRepository.findAll();
    }

    @Override
    public Review findReviewById(Long rno) {

        return reviewRepository.findById(rno).orElse(null);
    }

    @Override
    public Review modifyReview(Review review) {

        return reviewRepository.save(review);
    }

}

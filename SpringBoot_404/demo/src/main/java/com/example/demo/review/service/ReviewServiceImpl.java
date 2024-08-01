package com.example.demo.review.service;

import com.example.demo.productAdmin.domain.Product;
import com.example.demo.productAdmin.repository.ProductRepository;
import com.example.demo.pse.domain.Member;
import com.example.demo.pse.repository.MemberRepository;
import com.example.demo.review.dto.ReviewDTO;
import com.example.demo.review.repository.ReviewRepository;
import com.example.demo.review.domain.Review;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final MemberRepository memberRepository;

    @Override
    public ReviewDTO saveReview(ReviewDTO reviewDTO, Long p_id, String mid) {
        Review review = new Review();
        review.setReview_title(reviewDTO.getReview_title());
        review.setReview_exp(reviewDTO.getReview_exp());

        Product product = productRepository.findById(p_id).orElseThrow();

        Member member = memberRepository.findById(mid).orElseThrow();

        review.setProduct(product);
        review.setMember(member);
        review.setReg_date(LocalDateTime.now());
        review.setMod_date(LocalDateTime.now());

        Review savedReview = reviewRepository.save(review);

        ReviewDTO savedReviewDTO = new ReviewDTO();
        savedReviewDTO.setRno(savedReview.getRno());
        savedReviewDTO.setReview_title(savedReview.getReview_title());
        savedReviewDTO.setReview_exp(savedReview.getReview_exp());
        savedReviewDTO.setMid(savedReview.getMember().getMid());
        savedReviewDTO.setProduct_id(savedReview.getProduct().getProduct_id());
        savedReviewDTO.setReg_date(savedReview.getReg_date());
        savedReviewDTO.setMod_date(savedReview.getMod_date());

        return savedReviewDTO;
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
        review.setMod_date(LocalDateTime.now());

        return reviewRepository.save(review);
    }

}

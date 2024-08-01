package com.example.demo.review.controller;

import com.example.demo.review.domain.Review;
import com.example.demo.review.dto.ReviewDTO;
import com.example.demo.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/add/{p_id}/{mid}")
    public ResponseEntity<Object> saveReview(@RequestBody ReviewDTO reviewDTO, @PathVariable Long p_id, @PathVariable String mid) {
        System.out.println(p_id);
        System.out.println(reviewDTO);

        return new ResponseEntity<>(reviewService.saveReview(reviewDTO, p_id, mid), HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<Object> getReviews() {

        return new ResponseEntity<>(reviewService.findAllReviews(), HttpStatus.OK);
    }

    @GetMapping({"/read/{rno}", "/modify/{rno}"})
    public ResponseEntity<Object> getReviewById(@PathVariable Long rno) {

        return new ResponseEntity<>(reviewService.findReviewById(rno), HttpStatus.OK);
    }

    @PostMapping("/modify/{rno}")
    public ResponseEntity<Object> modifyReview(@RequestBody Review review) {

        return new ResponseEntity<>(reviewService.modifyReview(review), HttpStatus.OK);
    }

    @DeleteMapping("/{rno}")
    public ResponseEntity<Object> deleteReview(@PathVariable Long rno) {
        reviewService.deleteReview(rno);

        return new ResponseEntity<>(HttpStatus.OK);
    }


}

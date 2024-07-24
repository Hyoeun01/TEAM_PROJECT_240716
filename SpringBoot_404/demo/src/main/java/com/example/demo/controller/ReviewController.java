package com.example.demo.controller;

import com.example.demo.domain.Review;
import com.example.demo.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/review")
//@CrossOrigin(origins = "http://localhost:3000") //내용은 저장되는데 이게 없으면 저장페이지에서 에러 메세지가 발생함
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Object> saveReview(@RequestBody Review review) {

        return new ResponseEntity<>(reviewService.saveReview(review), HttpStatus.CREATED);
    }

    @GetMapping("/list")
    public ResponseEntity<Object> getReviews() {

        return new ResponseEntity<>(reviewService.findAllReviews(), HttpStatus.OK);
    }

    @DeleteMapping("/{rno}")
    public ResponseEntity<Object> deleteReview(@PathVariable Long rno) {
        reviewService.deleteReview(rno);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}

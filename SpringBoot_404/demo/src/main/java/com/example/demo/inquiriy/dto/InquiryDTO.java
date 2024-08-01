package com.example.demo.inquiriy.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InquiryDTO {
    private Long id;
    private String title;
    private String content;
    private String nickname;
    private LocalDateTime createdAt;
    private String reply;
}


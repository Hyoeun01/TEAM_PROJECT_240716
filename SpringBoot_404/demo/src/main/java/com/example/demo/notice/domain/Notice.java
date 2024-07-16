package com.example.demo.notice.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Builder
@NoArgsConstructor
//@AllArgsConstructor
@Getter
@ToString
@Table(name = "notice")
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bno;
    private String title;
    private LocalDate regDate;
    private String writer;
    private String content;

    public Notice(Long bno, String title, LocalDate regDate, String writer, String content) {
        this.bno =  bno; // id를 bno로 설정
        this.title = title;
        this.regDate = regDate;
        this.writer = writer;
        this.content = content;
    }

}

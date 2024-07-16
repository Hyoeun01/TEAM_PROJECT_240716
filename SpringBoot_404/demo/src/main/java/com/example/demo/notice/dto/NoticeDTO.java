package com.example.demo.notice.dto;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
//@AllArgsConstructor
@NoArgsConstructor
public class NoticeDTO {
    private Long bno;
    private String title;
    private String content;
    private String writer;
    private LocalDate regDate;
    public NoticeDTO(Long bno, String title, String content, String writer, LocalDate regDate) {
        this.bno = bno;
        this.title = title;
        this.content = content;
        this.writer = writer;
        this.regDate = regDate;
    }

    public Long getBno() {
        return bno;
    }

    public void setBno(Long bno) {
        this.bno = bno;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getWriter() {
        return writer;
    }

    public void setWriter(String writer) {
        this.writer = writer;
    }

    public LocalDate getRegDate() {
        return regDate;
    }

    public void setRegDate(LocalDate regDate) {
        this.regDate = regDate;
    }
}

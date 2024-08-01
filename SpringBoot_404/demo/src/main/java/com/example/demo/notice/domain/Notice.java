package com.example.demo.notice.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
@Table(name = "notice")
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bno;

    private String title;

    // reg_date 필드에 기본값을 설정하려면 @PrePersist 메서드를 사용합니다.
    @Column(name = "reg_date", columnDefinition = "DATE")
    private LocalDate reg_date;

    private String writer;
    private String content;

    // 엔티티가 저장되기 전에 호출됩니다.
    @PrePersist
    public void prePersist() {
        if (reg_date == null) {
            reg_date = LocalDate.now();
        }
    }
}

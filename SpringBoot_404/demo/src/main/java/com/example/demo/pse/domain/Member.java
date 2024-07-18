package com.example.demo.pse.domain;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="member")
public class Member {
    @Id
    @Column(name = "mid", unique = true, nullable = false, length = 20)
    private String mid;

    @Column(name = "mpw", nullable = false)
    private String mpw;

    @Column(name = "confirm_mpw", nullable = false)
    private String confirmMpw;

    @Column(name = "email", unique = true, nullable = false, length = 255)
    private String email;

    @Column(name = "nickname", unique = true, nullable = false, length = 255)
    private String nickname;

    @Column(name = "phone", length = 15)
    private String phone;

    @Column(name = "point", columnDefinition = "INT DEFAULT 0")
    private int point;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    private Role role;

    @Transient
    public String token;
}

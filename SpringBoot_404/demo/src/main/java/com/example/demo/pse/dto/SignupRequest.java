package com.example.demo.pse.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String mid;
    private String mpw;
    private String confirmMpw;
    private String email;
    private String nickname;
    private String phone;
}

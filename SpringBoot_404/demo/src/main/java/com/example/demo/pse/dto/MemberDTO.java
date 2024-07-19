package com.example.demo.pse.dto;

import com.example.demo.pse.domain.Role;
import lombok.Data;

@Data
public class MemberDTO {
    private String mid;
    private String mpw;
    private String confirmMpw;
    private String email;
    private String nickname;
    private String phone;
    private int point;
    private Role role;
}

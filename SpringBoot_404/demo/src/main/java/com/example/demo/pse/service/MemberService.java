package com.example.demo.pse.service;

import com.example.demo.pse.domain.Member;
import com.example.demo.pse.dto.MemberDTO;
import com.example.demo.pse.domain.Role;

import java.util.Optional;

public interface MemberService {
    Member saveMember(Member member);
    Optional<Member> findByEmail(String email);
    void changeRole(Role newRole, String email);
    void deleteMember(String email);
    Member updateMember(String email, MemberDTO memberDto);
}

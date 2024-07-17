package com.example.demo.pse.service;

import com.example.demo.pse.domain.Member;
import com.example.demo.pse.dto.MemberDTO;
import com.example.demo.pse.domain.Role;

import java.util.Optional;

public interface MemberService {
    Member saveMember(Member member);
    Optional<Member> findByMid(String mid);
    void changeRole(Role newRole, String mid);
    void deleteMember(String mid);
    Member updateMember(String mid, MemberDTO memberDto);
    boolean existsByMid(String mid);
}

package com.example.demo.pse.service;

import com.example.demo.pse.domain.Member;
import com.example.demo.pse.dto.MemberDTO;
import com.example.demo.pse.repository.MemberRepository;
import com.example.demo.pse.domain.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Member saveMember(Member member){
        member.setMpw(passwordEncoder.encode(member.getMpw()));
        member.setRole(Role.USER);
        return memberRepository.save(member);
    }

    @Override
    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    @Override
    @Transactional
    public void changeRole(Role newRole, String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        memberRepository.updateMemberRole(member.getMid(), newRole);
    }

    @Override
    @Transactional
    public void deleteMember(String email) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        memberRepository.deleteByMid(member.getMid());
    }

    @Override
    @Transactional
    public Member updateMember(String email, MemberDTO memberDto) {
        Member member = memberRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
        member.setEmail(memberDto.getEmail());
        member.setNickname(memberDto.getNickname());
        member.setPhone(memberDto.getPhone());
        member.setPoint(memberDto.getPoint());
        return memberRepository.save(member);
    }
}

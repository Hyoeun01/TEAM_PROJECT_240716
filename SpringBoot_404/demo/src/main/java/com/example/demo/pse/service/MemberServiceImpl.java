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
    @Transactional(readOnly = true)
    public Optional<Member> findByMid(String mid) {
        return memberRepository.findByMid(mid);
    }

    @Override
    @Transactional
    public void changeRole(Role newRole, String mid) {
        Member member = memberRepository.findByMid(mid).orElseThrow(() -> new RuntimeException("User not found"));
        memberRepository.updateMemberRole(member.getMid(), newRole);
    }

    @Override
    @Transactional
    public void deleteMember(String mid) {
        Member member = memberRepository.findByMid(mid).orElseThrow(() -> new RuntimeException("User not found"));
        memberRepository.deleteByMid(member.getMid());
    }

    @Override
    @Transactional
    public Member updateMember(String mid, MemberDTO memberDto) {
        Member member = memberRepository.findByMid(mid).orElseThrow(() -> new RuntimeException("User not found"));
        if (!memberDto.getMpw().isEmpty()) {
            member.setMpw(passwordEncoder.encode(memberDto.getMpw()));
        }
        member.setEmail(memberDto.getEmail());
        member.setNickname(memberDto.getNickname());
        member.setPhone(memberDto.getPhone());
        return memberRepository.save(member);
    }

    @Override
    public boolean existsByMid(String mid) {
        return memberRepository.existsByMid(mid);
    }

}

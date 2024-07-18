package com.example.demo.pse.controller;

import com.example.demo.pse.domain.Member;
import com.example.demo.pse.dto.MemberDTO;
import com.example.demo.pse.security.UserPrinciple;
import com.example.demo.pse.security.jwt.JwtTokenProvider;
import com.example.demo.pse.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/members")
@CrossOrigin(origins = "http://localhost:3000")
public class MemberController {

    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public MemberController(MemberService memberService, JwtTokenProvider jwtTokenProvider, AuthenticationManager authenticationManager) {
        this.memberService = memberService;
        this.jwtTokenProvider = jwtTokenProvider;
        this.authenticationManager = authenticationManager;
    }

    // 회원가입 폼 보여주기
    @GetMapping("/signup")
    public String showSignupForm(Model model) {
        model.addAttribute("member", new Member());
        return "redirect:/signup";
    }

    // 회원가입 처리
    @PostMapping("/signup")
    public ResponseEntity<Object> processSignup(@RequestBody MemberDTO memberDTO) {
        Member member = new Member();
        member.setMid(memberDTO.getMid());
        member.setMpw(memberDTO.getMpw());
        member.setConfirmMpw(memberDTO.getConfirmMpw());
        member.setEmail(memberDTO.getEmail());
        member.setNickname(memberDTO.getNickname());
        member.setPhone(memberDTO.getPhone());
        memberService.saveMember(member);
        return ResponseEntity.ok(member);
    }
//    @PostMapping("/signup")
//    public String processSignup(@ModelAttribute Member member) {
//        memberService.saveMember(member);
//        return "redirect:/members/login";
//    }

    // 로그인 폼 보여주기
    @GetMapping("/login")
    public String showLoginForm() {
        return "/login";
    }

    // 로그인 처리
    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity<Object> processLogin(@RequestBody Map<String, String> loginData) {
        try {
            String mid = loginData.get("mid");
            String mpw = loginData.get("mpw");
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(mid, mpw));
            UserPrinciple userDetails = (UserPrinciple) authentication.getPrincipal();
            Member member = userDetails.getMember();
            String token = jwtTokenProvider.createToken(userDetails.getUsername(), userDetails.getAuthorities().iterator().next().getAuthority());
            member.setToken(token);
            return ResponseEntity.ok(member);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(401).build();
        }
    }

    // 회원 정보 업데이트 폼 보여주기
    @GetMapping("/update")
    public String showUpdateForm(Model model, @RequestParam("mid") String mid) {
        Member member = memberService.findByMid(mid)
                .orElseThrow(() -> new IllegalArgumentException("Invalid member mid:" + mid));
        model.addAttribute("member", member);
        return "update"; // 업데이트 폼 템플릿 파일 이름
    }

    // 회원 정보 업데이트 처리
    @PostMapping("/update")
    public String processUpdate(@RequestParam("mid") String mid, @ModelAttribute MemberDTO memberDTO) {
        memberService.updateMember(mid, memberDTO);
        return "redirect:/profile"; // 업데이트 후 리디렉션할 페이지
    }

    // ID중복확인
    @GetMapping("/checkMid")
    @ResponseBody
    public boolean checkMid(@RequestParam String mid) {
        return memberService.existsByMid(mid);
    }
}

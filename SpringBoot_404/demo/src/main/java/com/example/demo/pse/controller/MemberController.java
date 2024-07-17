package com.example.demo.pse.controller;

import com.example.demo.pse.domain.Member;
import com.example.demo.pse.dto.MemberDTO;
import com.example.demo.pse.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    // 회원가입 폼 보여주기
    @GetMapping("/signup")
    public String showSignupForm(Model model) {
        model.addAttribute("member", new Member());
        return "signup"; // 회원가입 폼 템플릿 파일 이름
    }

    // 회원가입 처리
    @PostMapping("/signup")
    public String processSignup(@ModelAttribute Member member) {
        memberService.saveMember(member);
        return "redirect:/members/login";
    }

    // 로그인 폼 보여주기
    @GetMapping("/login")
    public String showLoginForm() {
        return "login"; // 로그인 폼 템플릿 파일 이름
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

    //ID중복확인
    @GetMapping("/checkMid")
    @ResponseBody
    public boolean checkMid(@RequestParam String mid) {
        return memberService.existsByMid(mid);
    }

}

package com.example.demo.notice.controller;


import com.example.demo.notice.dto.NoticeDTO;
import com.example.demo.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;
    @GetMapping("/list")
    public String getAllNotices(Model model) {
        List<NoticeDTO> notices=noticeService.getAllNotices();
        model.addAttribute("notices",notices);
        return "notice/list"; // 공지사항 리스트 페이지
    }
    @GetMapping("/register")
    public String registerNotice() {
        return "notice/register";
    }
    @PostMapping("/register")
    public String register(@ModelAttribute NoticeDTO noticeDTO) {
        noticeService.save(noticeDTO);
        return "redirect:/notice/list";
    }
    @GetMapping({"/read","/modify"})
    public void notice(Long no, Model model){
        NoticeDTO dto=noticeService.readOne(no);
        model.addAttribute("dto",dto);
    }
    @GetMapping("/read/{bno}")
    public String read(@PathVariable("bno") Long bno, Model model) {
        NoticeDTO notice = noticeService.getNotice(bno);
        model.addAttribute("notice", notice);
        return "notice/read";
    }
}

package com.example.demo.notice.controller;

import com.example.demo.notice.dto.NoticeDTO;
import com.example.demo.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



    @RestController
    @RequestMapping("/notice")
    @RequiredArgsConstructor
public class NoticeController {

        private final NoticeService noticeService;

        @GetMapping("/list")
        public ResponseEntity<List<NoticeDTO>> getAllNotices() {
            List<NoticeDTO> notices = noticeService.getAllNotices();
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(notices);

        }

        @PostMapping("/register")
        public ResponseEntity<String> register(@RequestBody NoticeDTO noticeDTO) {
            noticeService.save(noticeDTO);
            return ResponseEntity.ok("Notice registered successfully");
        }

        @GetMapping("/read/{bno}")
        public ResponseEntity<NoticeDTO> read(@PathVariable("bno") Long bno) {
            NoticeDTO dto = noticeService.readOne(bno);
            return ResponseEntity.ok(dto);
        }

        @PostMapping("/modify")
        public ResponseEntity<String> modify(@RequestBody NoticeDTO noticeDTO) {
            noticeService.save(noticeDTO);
            return ResponseEntity.ok("Notice updated successfully");
        }

        @PostMapping("/remove")
        public ResponseEntity<String> remove(@RequestBody NoticeDTO noticeDTO) {
            Long bno = noticeDTO.getBno();
            noticeService.remove(bno);
            return ResponseEntity.ok("Notice removed successfully");
        }
    }



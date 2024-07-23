package com.example.demo.notice.controller;

import com.example.demo.notice.dto.NoticeDTO;
import com.example.demo.notice.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
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
    public ResponseEntity<Map<String, String>> register(@RequestBody NoticeDTO noticeDTO) {
        noticeService.save(noticeDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Notice registered successfully");
        return ResponseEntity.ok(response);
    }

    @GetMapping("/read/{bno}")
    public ResponseEntity<NoticeDTO> read(@PathVariable("bno") Long bno) {
        NoticeDTO dto = noticeService.readOne(bno);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/modify")
    public ResponseEntity<Map<String, String>> modify(@RequestBody NoticeDTO noticeDTO) {
        noticeService.save(noticeDTO);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Notice updated successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/remove")
    public ResponseEntity<Map<String, String>> remove(@RequestBody NoticeDTO noticeDTO) {
        Long bno = noticeDTO.getBno();
        noticeService.remove(bno);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Notice removed successfully");
        return ResponseEntity.ok(response);
    }
}


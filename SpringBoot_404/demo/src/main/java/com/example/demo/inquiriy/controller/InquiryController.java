package com.example.demo.inquiriy.controller;

import com.example.demo.inquiriy.domain.Inquiry;
import com.example.demo.inquiriy.dto.InquiryDTO;
import com.example.demo.inquiriy.repository.InquiryRepository;
import com.example.demo.inquiriy.service.InquiryService;
import com.example.demo.pse.domain.Member;
import com.example.demo.pse.repository.MemberRepository;
import com.example.demo.pse.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/inquiries")
public class InquiryController {

    @Autowired
    private InquiryRepository inquiryRepository;

    @Autowired
    private InquiryService inquiryService;

    @Autowired
    private MemberRepository memberRepository;

    @GetMapping
    public List<InquiryDTO> getInquiries() {
        return inquiryRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public InquiryDTO getInquiry(@PathVariable Long id) {
        return inquiryRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Inquiry not found"));
    }

    @PostMapping
    public InquiryDTO createInquiry(@RequestBody InquiryDTO inquiryDTO, Principal principal) {
        String memberId = principal.getName();
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));

        Inquiry inquiry = new Inquiry();
        inquiry.setTitle(inquiryDTO.getTitle());
        inquiry.setContent(inquiryDTO.getContent());
        inquiry.setCreatedAt(LocalDateTime.now());
        inquiry.setNickname(member.getNickname());

        Inquiry savedInquiry = inquiryRepository.save(inquiry);
        return convertToDTO(savedInquiry);
    }

    @PutMapping("/{id}")
    public InquiryDTO updateInquiry(@PathVariable Long id, @RequestBody InquiryDTO inquiryDTO, Principal principal) {
        String memberId = principal.getName();
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inquiry not found"));

        if (!inquiry.getNickname().equals(memberId)) {
            throw new RuntimeException("You are not authorized to update this inquiry");
        }

        inquiry.setTitle(inquiryDTO.getTitle());
        inquiry.setContent(inquiryDTO.getContent());

        Inquiry updatedInquiry = inquiryRepository.save(inquiry);
        return convertToDTO(updatedInquiry);
    }

    @DeleteMapping("/{id}")
    public void deleteInquiry(@PathVariable Long id, Principal principal) {
        String memberId = principal.getName();
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inquiry not found"));

        if (!inquiry.getNickname().equals(memberId)) {
            throw new RuntimeException("You are not authorized to delete this inquiry");
        }

        inquiryRepository.delete(inquiry);
    }

    private InquiryDTO convertToDTO(Inquiry inquiry) {
        InquiryDTO dto = new InquiryDTO();
        dto.setId(inquiry.getId());
        dto.setTitle(inquiry.getTitle());
        dto.setContent(inquiry.getContent());
        dto.setNickname(inquiry.getNickname());
        dto.setCreatedAt(inquiry.getCreatedAt());
        dto.setReply(inquiry.getReply());
        return dto;
    }

    @PostMapping("/{id}/reply")
    public ResponseEntity<Inquiry> addReply(@PathVariable Long id, @RequestBody InquiryDTO inquiryDTO) {
        Inquiry updatedInquiry = inquiryService.addReply(id, inquiryDTO.getReply());
        if (updatedInquiry != null) {
            return ResponseEntity.ok(updatedInquiry);
        }
        return ResponseEntity.notFound().build();
    }

}
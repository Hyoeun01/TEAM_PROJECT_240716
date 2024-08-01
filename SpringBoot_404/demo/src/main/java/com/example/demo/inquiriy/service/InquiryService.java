package com.example.demo.inquiriy.service;

import com.example.demo.inquiriy.domain.Inquiry;
import com.example.demo.inquiriy.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InquiryService {

    @Autowired
    private InquiryRepository inquiryRepository;

    public List<Inquiry> getAllInquiries() {
        return inquiryRepository.findAll();
    }

    public Inquiry createInquiry(Inquiry inquiry) {
        return inquiryRepository.save(inquiry);
    }

    public Inquiry getInquiryById(Long id) {
        return inquiryRepository.findById(id).orElseThrow(() -> new RuntimeException("Inquiry not found"));
    }

    public Inquiry updateInquiry(Inquiry inquiry) {
        return inquiryRepository.save(inquiry);
    }

    public void deleteInquiry(Long id) {
        inquiryRepository.deleteById(id);
    }

    public Inquiry addReply(Long id, String reply) {
        Inquiry inquiry = inquiryRepository.findById(id).orElse(null);
        if (inquiry != null) {
            inquiry.setReply(reply);
            return inquiryRepository.save(inquiry);
        }
        return null;
    }
}
package com.example.demo.inquiriy.service;

import com.example.demo.inquiriy.domain.Inquiry;
import com.example.demo.inquiriy.repository.InquiryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InquiryService {

    @Autowired
    private InquiryRepository inquiryRepository;

    public Page<Inquiry> getAllInquiries(int page, int size) {
        return inquiryRepository.findAll(PageRequest.of(page, size));
    }

    public Inquiry createInquiry(Inquiry inquiry) {
        return inquiryRepository.save(inquiry);
    }

    public Optional<Inquiry> getInquiryById(Long id) {
        return inquiryRepository.findById(id);
    }

    public Inquiry updateInquiry(Inquiry inquiry) {
        return inquiryRepository.save(inquiry);
    }

    public void deleteInquiry(Long id) {
        inquiryRepository.deleteById(id);
    }

    public Inquiry addReply(Long id, String reply) {
        Optional<Inquiry> inquiryOpt = inquiryRepository.findById(id);
        if (inquiryOpt.isPresent()) {
            Inquiry inquiry = inquiryOpt.get();
            inquiry.setReply(reply);
            return inquiryRepository.save(inquiry);
        }
        return null;
    }
}

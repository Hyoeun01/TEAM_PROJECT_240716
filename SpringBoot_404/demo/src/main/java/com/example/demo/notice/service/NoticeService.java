package com.example.demo.notice.service;

import com.example.demo.notice.domain.Notice;
import com.example.demo.notice.dto.NoticeDTO;
import com.example.demo.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final ModelMapper modelMapper;
    public Optional<Notice> findByTitle(String title) {
        return noticeRepository.findByTitle(title);
    }
    public Notice save(Notice notice) {
        return noticeRepository.save(notice);
    }

    public NoticeDTO readOne(Long no) {
        Optional<Notice> result = noticeRepository.findById(no);
        Notice notice=result.orElseThrow();

        return modelMapper.map(notice, NoticeDTO.class);
    }

    public List<NoticeDTO> getAllNotices() {
        List<Notice> notices=noticeRepository.findAll();

        return notices.stream()
                .map(notice -> modelMapper.map(notice, NoticeDTO.class))
                .collect(Collectors.toList());
    }
}

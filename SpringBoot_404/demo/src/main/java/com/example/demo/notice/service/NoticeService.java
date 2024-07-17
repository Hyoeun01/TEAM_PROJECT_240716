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
    public NoticeDTO save(NoticeDTO noticeDTO) {
        Notice notice = modelMapper.map(noticeDTO, Notice.class); // DTO를 엔티티로 변환
        noticeRepository.save(notice);
        return modelMapper.map(notice, NoticeDTO.class); // 저장된 엔티티를 다시 DTO로 변환
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

//    public NoticeDTO getNotice(Long bno) {
//        return noticeRepository.stream()
//                .filter(notice -> notice.getBno().equals(bno))
//                .findFirst()
//                .orElse(null);
//    }
}

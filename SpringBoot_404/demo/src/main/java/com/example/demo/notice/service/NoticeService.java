package com.example.demo.notice.service;

import com.example.demo.notice.domain.Notice;
import com.example.demo.notice.dto.NoticeDTO;
import com.example.demo.notice.dto.PageRequestDTO;
import com.example.demo.notice.dto.PageResponseDTO;
import com.example.demo.notice.repository.NoticeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    public void remove(Long bno) {

        noticeRepository.deleteById(bno);
    }

    public PageResponseDTO<NoticeDTO> list(PageRequestDTO pageRequestDTO) {
        String keyword = pageRequestDTO.getKeyword();
        Pageable pageable = pageRequestDTO.getPageable("bno");
        Page<Notice> result = noticeRepository.searchAll(keyword,pageable);
        List<NoticeDTO> dtoList = result.getContent().stream()
                .map(notice -> modelMapper.map(notice, NoticeDTO.class))
                .collect(Collectors.toList());
        return PageResponseDTO.<NoticeDTO>withAll()
                .pageRequestDTO(pageRequestDTO)
                .dtoList(dtoList)
                .total((int)result.getTotalElements())
                .build();
    }
    @Transactional
    public NoticeDTO modifyNotice(NoticeDTO noticeDTO) {
        Notice notice = noticeRepository.findById(noticeDTO.getBno())
                .orElseThrow(() -> new RuntimeException("Notice not found"));

        // 수정 요청 시 조회수는 변경하지 않음
        notice.updateDetails(noticeDTO.getTitle(), noticeDTO.getContent());

        noticeRepository.save(notice);

        return modelMapper.map(notice, NoticeDTO.class);
    }

    @Transactional
    public NoticeDTO updateViews(Long bno) {
        Notice notice = noticeRepository.findById(bno)
                .orElseThrow(() -> new RuntimeException("Notice not found"));

        notice.incrementViews(); // 조회수 증가

        noticeRepository.save(notice);

        return modelMapper.map(notice, NoticeDTO.class);
    }


}

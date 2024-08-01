package com.example.demo.notice.repository;

import com.example.demo.notice.domain.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NoticeSearch {
    Page<Notice> searchAll(String keyword, Pageable pageable);
}

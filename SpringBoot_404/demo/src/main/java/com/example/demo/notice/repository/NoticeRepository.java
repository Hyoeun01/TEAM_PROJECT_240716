package com.example.demo.notice.repository;

import com.example.demo.notice.domain.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice,Long>, NoticeSearch{
    Optional<Notice> findByTitle(String title);

}

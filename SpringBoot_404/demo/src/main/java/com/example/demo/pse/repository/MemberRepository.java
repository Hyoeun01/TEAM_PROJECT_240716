package com.example.demo.pse.repository;

import com.example.demo.pse.domain.Member;
import com.example.demo.pse.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.role = :role WHERE m.mid = :mid")
    void updateMemberRole(String mid, Role role);

    @Modifying
    @Transactional
    @Query("DELETE FROM Member m WHERE m.mid = :mid")
    void deleteByMid(String mid);
}

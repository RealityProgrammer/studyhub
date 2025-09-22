package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.PointEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PointRepository extends JpaRepository<PointEntity,Long> {
    @Query(value = "SELECT p FROM PointEntity p WHERE p.deleted=false AND p.examEntity.id=:examId ORDER BY p.score DESC ")
    Page<PointEntity> findAllByDeletedFalse(Long examId,Pageable pageable);
    @Query(value = "SELECT p FROM PointEntity p WHERE  p.accountEntity.email=:email")
    Page<PointEntity> findBytEmail( String email,Pageable pageable);
}

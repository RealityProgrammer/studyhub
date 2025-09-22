package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.ExamEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ExamRepository extends JpaRepository<ExamEntity,Long> {
//    @Query(value = "SELECT e FROM ExamEntity e WHERE e.deleted=false ORDER BY e.id DESC ")
//    Page<ExamEntity> getExams(Pageable pageable);
    @Query(value = " SELECT e FROM ExamEntity e WHERE e.deleted = false AND (:checkBill = true OR e.isFree = true) ORDER BY e.id DESC")
    Page<ExamEntity> getExams(Pageable pageable,@Param("checkBill") boolean checkBill);
    @Query(value = "SELECT e FROM ExamEntity e WHERE e.deleted=false " +
            "AND (:name IS NULL OR e.name LIKE %:name%)" +
            "AND (:code IS NULL OR e.code LIKE %:code%)")
    Page<ExamEntity> getExamsByNameAndCode(String name,String code, Pageable pageable);
    @Query(value = "SELECT e FROM ExamEntity e WHERE e.deleted=false AND e.code=:codeExam")
    ExamEntity findByCode(String codeExam);
}

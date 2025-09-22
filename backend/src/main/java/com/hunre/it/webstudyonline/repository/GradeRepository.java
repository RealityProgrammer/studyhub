package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.GradeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GradeRepository extends JpaRepository<GradeEntity, Long> {
    @Query(value = "select g from GradeEntity g where g.deleted = false ")
    Page<GradeEntity> getGrade (Pageable pageable);
    @Query(value = "select g from GradeEntity g " +
            "inner join g.accounts a " +
            "where g.deleted = false and g.courseEntity.id  =:courseId and a.id =:accId ")
    Optional<GradeEntity> checkGradeEnrolled(Long courseId, Long accId);
    @Query(value = "select g from GradeEntity g where g.deleted = false and g.courseEntity.id =:courseId and g.remainStudent > 0 ")
    List<GradeEntity> findByCourseId(Long courseId);
    @Query(value = "select g from GradeEntity g join g.accounts a where g.deleted = false and g.courseEntity.id =:courseId and a.email =:email ")
    GradeEntity findByCourseIdandEmail(Long courseId, String email);
    @Query(value = "select g from GradeEntity g join g.accounts a where g.deleted = false and a.email =:email ")
    Page<GradeEntity> findByEmail( String email,Pageable pageable);
}

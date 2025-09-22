package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.TimetableEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TimeTableRepository extends JpaRepository<TimetableEntity,Long> {
    @Query(value = "SELECT c FROM TimetableEntity c WHERE c.deleted=false")
    Page<TimetableEntity> getAll(Pageable pageable);
    @Query(value = "SELECT c FROM TimetableEntity c WHERE c.deleted=false AND c.gradeEntity.id=:gradeId")
    Page<TimetableEntity> getByGradeId(Long gradeId, Pageable pageable);

}

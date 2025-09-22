package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.CourseDetailsEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseDetailsRepository extends JpaRepository<CourseDetailsEntity,Long> {
    @Query(value = "SELECT c FROM CourseDetailsEntity c WHERE c.courseEntity.id =:courseId AND c.deleted=false ")
    Page<CourseDetailsEntity> findByCourseId(Long courseId, Pageable pageable);
    @Query(value = "SELECT c FROM CourseDetailsEntity c WHERE c.courseEntity.id =:courseId AND c.deleted=false ")
    List<CourseDetailsEntity> findByCourseId(Long courseId);

    List<CourseDetailsEntity> findBycourseEntityId(Long courseId);

}

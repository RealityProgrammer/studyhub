package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.InforTeacherEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface InforTeacherRepository extends JpaRepository<InforTeacherEntity, Long> {
    @Query(value = "SELECT i FROM InforTeacherEntity i INNER JOIN i.account a WHERE a.id IS NOT NULL")
    Page<InforTeacherEntity> findAllInforTeachers(Pageable pageable);

}

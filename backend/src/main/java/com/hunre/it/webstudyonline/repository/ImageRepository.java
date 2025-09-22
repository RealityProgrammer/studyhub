package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.ImagesEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<ImagesEntity, Long> {
    @Query(value = "SELECT i FROM ImagesEntity i WHERE i.courseEntity.id =:courseId")
    List<ImagesEntity> findByCourseId(Long courseId);

    @Query(value = "SELECT i FROM ImagesEntity i WHERE i.accountEntity.id =:accountId")
    ImagesEntity findByAccountId(Long accountId);

}

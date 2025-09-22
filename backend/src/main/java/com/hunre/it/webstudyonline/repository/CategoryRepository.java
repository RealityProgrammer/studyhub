package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.CategoryEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity,Long> {
    @Query(value = "SELECT c FROM CategoryEntity c WHERE c.deleted = false ")
    Page<CategoryEntity> getAllCategory(Pageable pageable);
    Optional<CategoryEntity> findByName(String name);
    Optional<CategoryEntity> findByCode(String code);
}

package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.RoleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleEntity,Long> {
    @Query("SELECT r FROM RoleEntity r WHERE r.deleted = false")
    Page<RoleEntity> findAll(Pageable pageable);
    RoleEntity findByName(String name);
    Optional<RoleEntity> findByCode(String id);
//    @Query(value = "select r from RoleEntity r join r.users u where u.email=:email")
//    List<RoleEntity> getRoleByUsername(@Param("email") String email);

}

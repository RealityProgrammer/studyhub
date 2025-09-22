package com.hunre.it.webstudyonline.repository;

import com.hunre.it.webstudyonline.entity.AccountEntity;
import com.hunre.it.webstudyonline.entity.GradeEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
    Optional<AccountEntity> findByEmail(String email);

    @Query("SELECT a FROM AccountEntity a JOIN  a.roles r WHERE a.deleted = false")
    Page<AccountEntity> findByDeletedFalseWithRoles(Pageable pageable);


    @Query("select c from AccountEntity c where c.fullname like %:username% and c.email like %:email% and c.deleted = false ")
    Page<AccountEntity> findByCondition(String username, String email, Pageable pageable);

    @Query("select c from AccountEntity c " +
            "join c.roles r " +
            "where c.fullname like %:username% and c.email like %:email% and r.code = :role and c.deleted = false")
    Page<AccountEntity> findByRoleCode(String username, String role, String email, Pageable pageable);

    @Query("select c from AccountEntity c " +
            "join c.roles r " +
            "where c.fullname like %:fullname% and c.email like %:email% and r.code like %:role and c.deleted = false")
    Page<AccountEntity> findAccountByAttributes(String fullname, String email, String role,Pageable pageable);

    @Query(value = "select a.grades from AccountEntity a where a.email =:email")
    List<GradeEntity> findGradesByEmail(@Param("email") String email);
}
